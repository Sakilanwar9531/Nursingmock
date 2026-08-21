"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as fbSignOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  serverTimestamp 
} from "firebase/firestore";
import { auth, googleProvider, db } from "./firebase";

export interface UserProfileData {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: "admin" | "student";
  targetExam?: string;
  totalTestsAttempted: number;
  averageAccuracy: number;
  createdAt?: any;
}

export interface TestAttemptRecord {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  testId: string;
  testTitle: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  accuracy: number;
  timeSpentSeconds: number;
  submittedAt?: any;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfileData | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  saveTestAttempt: (attempt: Omit<TestAttemptRecord, "userId" | "userEmail" | "userName">) => Promise<void>;
  getUserAttempts: () => Promise<TestAttemptRecord[]>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  saveTestAttempt: async () => {},
  getUserAttempts: async () => [],
});

const MASTER_ADMIN_EMAIL = "sakil.net.in@gmail.com";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          
          const isAdminUser = currentUser.email?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase();

          if (docSnap.exists()) {
            const data = docSnap.data() as UserProfileData;
            setProfile(data);
          } else {
            const initialProfile: UserProfileData = {
              id: currentUser.uid,
              email: currentUser.email || "",
              displayName: currentUser.displayName || "Aspirant",
              photoURL: currentUser.photoURL || "",
              role: isAdminUser ? "admin" : "student",
              totalTestsAttempted: 0,
              averageAccuracy: 0,
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, initialProfile);
            setProfile(initialProfile);
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      if (err.code === "auth/popup-closed-by-user" || err.code === "auth/cancelled-popup-request") {
        // User intentionally closed the popup dialog - gracefully ignore
        return;
      }
      if (err.code === "auth/popup-blocked") {
        console.warn("Sign-in popup was blocked by the browser.");
        return;
      }
      console.error("Google sign in error:", err);
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setProfile(null);
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const saveTestAttempt = async (attempt: Omit<TestAttemptRecord, "userId" | "userEmail" | "userName">) => {
    if (!user) return;
    try {
      const fullRecord: TestAttemptRecord = {
        ...attempt,
        userId: user.uid,
        userEmail: user.email || "",
        userName: user.displayName || profile?.displayName || "Aspirant",
        submittedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "test_attempts"), fullRecord);

      // Update user stats
      if (profile) {
        const newTotal = (profile.totalTestsAttempted || 0) + 1;
        const newAvg = Math.round(
          (((profile.averageAccuracy || 0) * (newTotal - 1)) + attempt.accuracy) / newTotal
        );
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, {
          totalTestsAttempted: newTotal,
          averageAccuracy: newAvg,
        }, { merge: true });

        setProfile(prev => prev ? { ...prev, totalTestsAttempted: newTotal, averageAccuracy: newAvg } : null);
      }
    } catch (err) {
      console.error("Failed to save test attempt to Firestore:", err);
    }
  };

  const getUserAttempts = async (): Promise<TestAttemptRecord[]> => {
    if (!user) return [];
    try {
      const q = query(
        collection(db, "test_attempts"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const attempts: TestAttemptRecord[] = [];
      querySnapshot.forEach((doc) => {
        attempts.push({ id: doc.id, ...doc.data() } as TestAttemptRecord);
      });
      return attempts.sort((a, b) => (b.submittedAt > a.submittedAt ? 1 : -1));
    } catch (err) {
      console.error("Error fetching user attempts:", err);
      return [];
    }
  };

  const isAdmin = user?.email?.toLowerCase() === MASTER_ADMIN_EMAIL.toLowerCase() || profile?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        signInWithGoogle,
        signOut,
        saveTestAttempt,
        getUserAttempts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
