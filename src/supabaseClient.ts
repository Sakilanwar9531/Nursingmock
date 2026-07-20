/// <reference types="vite/client" />
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { User, Attempt, StreakData, NursingUpdate } from "./types";

let supabaseInstance: SupabaseClient | null = null;

// Dynamically initialize Supabase client
export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  // 1. Check process/import.meta env variables
  let url = import.meta.env.VITE_SUPABASE_URL;
  let anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // 2. Fallback to localStorage (for easy static setup without rebuilding code)
  if (!url || !anonKey) {
    url = localStorage.getItem("np_supabase_url") || "";
    anonKey = localStorage.getItem("np_supabase_anon_key") || "";
  }

  if (url && anonKey && url !== "YOUR_SUPABASE_URL" && anonKey !== "YOUR_SUPABASE_ANON_KEY") {
    try {
      supabaseInstance = createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      return supabaseInstance;
    } catch (e) {
      console.error("Failed to initialize Supabase client:", e);
    }
  }

  return null;
}

export function isSupabaseConnected(): boolean {
  return getSupabaseClient() !== null;
}

// Helpers to save and load Supabase configuration
export function saveSupabaseConfig(url: string, key: string) {
  if (url && key) {
    localStorage.setItem("np_supabase_url", url);
    localStorage.setItem("np_supabase_anon_key", key);
    supabaseInstance = null; // reset client to re-initialize next time
    return true;
  }
  return false;
}

export function clearSupabaseConfig() {
  localStorage.removeItem("np_supabase_url");
  localStorage.removeItem("np_supabase_anon_key");
  supabaseInstance = null;
}

// ==========================================
// SUPABASE OPERATIONS WITH ROBUST LOCAL FALLBACK
// ==========================================

// Authenticate user via Supabase
export async function supabaseSignUp(email: string, pass: string, name: string, phone?: string): Promise<{ user: User | null; error: string | null }> {
  const client = getSupabaseClient();
  if (!client) {
    return { user: null, error: "Supabase is not configured." };
  }

  try {
    const { data, error } = await client.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          name,
          phone: phone || "",
          is_admin: false,
        }
      }
    });

    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: "Registration failed." };

    // Create entry in public.profiles
    const { error: profileError } = await client
      .from("profiles")
      .upsert({
        id: data.user.id,
        email: email.toLowerCase().trim(),
        name,
        phone: phone || "",
        is_admin: false,
      });

    if (profileError) {
      console.warn("Could not save public profile, but auth was completed:", profileError.message);
    }

    const appUser: User = {
      name,
      email: email.toLowerCase().trim(),
      phone: phone || "",
      isAdmin: false,
      joined: Date.now()
    };

    return { user: appUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || "An unexpected error occurred." };
  }
}

export async function supabaseSignIn(email: string, pass: string): Promise<{ user: User | null; error: string | null }> {
  const client = getSupabaseClient();
  if (!client) {
    return { user: null, error: "Supabase is not configured." };
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password: pass
    });

    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: "Login failed." };

    // Fetch user profile info
    const { data: profile, error: profileError } = await client
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    const appUser: User = {
      name: profile?.name || data.user.user_metadata?.name || "Nursing Colleague",
      email: data.user.email || email,
      phone: profile?.phone || data.user.user_metadata?.phone || "",
      isAdmin: profile?.is_admin || data.user.user_metadata?.is_admin || false,
      joined: new Date(data.user.created_at).getTime()
    };

    return { user: appUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || "An unexpected error occurred." };
  }
}

// Sign out from Supabase Auth
export async function supabaseSignOut() {
  const client = getSupabaseClient();
  if (client) {
    await client.auth.signOut();
  }
}

// Sync attempt scores
export async function saveAttemptToCloud(email: string, attempt: Attempt): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from("attempts")
      .insert({
        email: email.toLowerCase().trim(),
        test_id: attempt.testId,
        test_title: attempt.testTitle,
        correct: attempt.correct,
        total: attempt.total,
        pct: attempt.pct,
        timestamp: new Date(attempt.timestamp).toISOString()
      });

    if (error) {
      console.error("Error saving attempt to Supabase:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Failed to connect to Supabase database:", e);
    return false;
  }
}

// Fetch attempts from Supabase
export async function getAttemptsFromCloud(email: string): Promise<Attempt[]> {
  const client = getSupabaseClient();
  if (!client) return [];

  try {
    const { data, error } = await client
      .from("attempts")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .order("timestamp", { ascending: true });

    if (error) {
      console.error("Error loading attempts from Supabase:", error.message);
      return [];
    }

    return data.map((item: any) => ({
      testId: item.test_id,
      testTitle: item.test_title,
      correct: item.correct,
      total: item.total,
      pct: item.pct,
      timestamp: new Date(item.timestamp).getTime()
    }));
  } catch (e) {
    console.error("Failed to fetch from Supabase:", e);
    return [];
  }
}

// Sync Streak State
export async function saveStreakToCloud(email: string, streakData: StreakData): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from("streaks")
      .upsert({
        email: email.toLowerCase().trim(),
        streak: streakData.streak,
        last: streakData.last,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error("Error saving streak to Supabase:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Failed to sync streak with Supabase:", e);
    return false;
  }
}

// Fetch Streak from Supabase
export async function getStreakFromCloud(email: string): Promise<StreakData | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("streaks")
      .select("*")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error) {
      if (error.code !== "PGRST116") { // PGRST116 is code for 'no rows returned'
        console.error("Error loading streak from Supabase:", error.message);
      }
      return null;
    }

    return {
      streak: data.streak,
      last: data.last
    };
  } catch (e) {
    console.error("Failed to load streak from Supabase:", e);
    return null;
  }
}

// Sync Nursing Updates
export async function getNursingUpdatesFromCloud(): Promise<NursingUpdate[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("nursing_updates")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading nursing updates from Supabase:", error.message);
      return null;
    }

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      badge: item.badge,
      date: item.date,
      summary: item.summary,
      content: item.content,
      image: item.image,
      readTime: item.read_time
    }));
  } catch (e) {
    console.error("Failed to load nursing updates from Supabase:", e);
    return null;
  }
}

// Add/Save Nursing Update
export async function saveNursingUpdateToCloud(update: NursingUpdate): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from("nursing_updates")
      .upsert({
        id: update.id,
        title: update.title,
        category: update.category,
        badge: update.badge,
        date: update.date,
        summary: update.summary,
        content: update.content,
        image: update.image,
        read_time: update.readTime,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error("Error saving nursing update to Supabase:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Failed to save nursing update to Supabase:", e);
    return false;
  }
}

// Delete Nursing Update
export async function deleteNursingUpdateFromCloud(id: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from("nursing_updates")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting update from Supabase:", error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("Failed to delete update from Supabase:", e);
    return false;
  }
}
