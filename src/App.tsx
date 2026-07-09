import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  FileText, 
  Award, 
  Settings, 
  User, 
  Database, 
  Menu, 
  X, 
  Search, 
  Clock, 
  Check, 
  RotateCcw, 
  Share2, 
  Flame, 
  HelpCircle,
  Activity,
  Heart,
  Droplet,
  Shield,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  Undo,
  Sun,
  Moon,
  Bell,
  Megaphone,
  Newspaper
} from "lucide-react";
import { SUBJECTS, PYQ_DATA } from "./data";
import { Subject, Test, Question, PyqCard, User as UserType, Attempt, StreakData, NursingUpdate } from "./types";
import { 
  getSupabaseClient, 
  isSupabaseConnected, 
  supabaseSignUp, 
  supabaseSignIn, 
  supabaseSignOut, 
  saveAttemptToCloud, 
  getAttemptsFromCloud, 
  saveStreakToCloud, 
  getStreakFromCloud, 
  getNursingUpdatesFromCloud, 
  saveNursingUpdateToCloud, 
  deleteNursingUpdateFromCloud 
} from "./supabaseClient";
import { 
  getClientGeminiKey, 
  isGeminiClientConfigured, 
  saveClientGeminiKey, 
  clearClientGeminiKey, 
  generateContentDirect 
} from "./services/geminiClient";

// Dynamically enriches standard explanations with high-yield clinical pointers
const getDetailedExplain = (q: Question): string => {
  let base = q.explain || "";
  if (!base.endsWith(".") && base.length > 0) base += ".";
  
  const textLower = (q.q + " " + base).toLowerCase();
  
  let highYield = "";
  if (textLower.includes("mitosis") || textLower.includes("cell division")) {
    highYield = "Remember the PMAT phase sequence: Prophase (chromatin condenses), Metaphase (chromosomes align at equatorial plate), Anaphase (sister chromatids separate), and Telophase (nuclear envelop reforms). Mitosis produces two identical diploid cells (2n).";
  } else if (textLower.includes("meninges") || textLower.includes("meningitis")) {
    highYield = "The meninges are the multi-layered protective coverings of the brain and spinal cord. Subarachnoid space lies between arachnoid mater and pia mater, containing Cerebrospinal Fluid (CSF). Infection represents meningitis, marked by Kernig's and Brudzinski's clinical signs.";
  } else if (textLower.includes("csf") || textLower.includes("cerebrospinal")) {
    highYield = "CSF normal volume is 150ml, with continuous renewal producing 500ml daily. Normal hydrostatic pressure is 5-15 mmHg (70-180 mmH2O) in recumbent position. High CSF glucose is normal (~60% of blood glucose); low glucose points to bacterial infection.";
  } else if (textLower.includes("mitochondria") || textLower.includes("power house")) {
    highYield = "Mitochondria contain their own circular DNA (inherited maternally) and are the main sites of the Krebs cycle and Oxidative Phosphorylation. High mitochondrial density is found in high-metabolic cells like cardiac muscle and hepatocytes.";
  } else if (textLower.includes("cranial nerve") || textLower.includes("facial") || textLower.includes("vagus")) {
    highYield = "There are 12 pairs of cranial nerves. CN VII (Facial) controls facial expressions and anterior 2/3 taste; CN X (Vagus) is the longest autonomic parasympathetic fiber innervating thoracic/abdominal viscera; CN III, IV, VI govern extraocular eye movements.";
  } else if (textLower.includes("sympathetic") || textLower.includes("parasympathetic") || textLower.includes("fight or flight")) {
    highYield = "The automatic nervous system (ANS) splits into Sympathetic (T1-L2, 'fight or flight') and Parasympathetic (Craniosacral, 'rest & digest'). Sympathetic stimulation causes pupil dilation (mydriasis), tachycardia, and bronchial relaxation, while slowing GI motility.";
  } else if (textLower.includes("bone") || textLower.includes("skeleton") || textLower.includes("muscle") || textLower.includes("sarcomere")) {
    highYield = "Skeletal muscle fibers are composed of sarcomeres (z-line to z-line) containing actin (thin) and myosin (thick) filaments. Calcium ions release from the sarcoplasmic reticulum, binding to troponin-C to trigger muscle contraction.";
  } else if (textLower.includes("sle") || textLower.includes("autoimmune")) {
    highYield = "Systemic Lupus Erythematosus (SLE) is a Type III Hypersensitivity autoimmune disorder. Key diagnostic markers include anti-dsDNA and Anti-Smith (Sm) antibodies. Butterfly (malar) rash on face and photosensitivity are key skin-related identifiers.";
  } else if (textLower.includes("protein") || textLower.includes("peptide") || textLower.includes("dna")) {
    highYield = "Transcription occurs in the nucleus converting DNA to mRNA, while translation occurs in the cytoplasm on ribosomes turning mRNA into polypeptide protein structures. Peptide bonds couple amino acid sequences.";
  } else if (textLower.includes("brain") || textLower.includes("cerebellum") || textLower.includes("cortex") || textLower.includes("stem")) {
    highYield = "The central nervous system features the cerebrum (largest part, intelligence & motor), cerebellum (balance & posture), and medulla oblongata (cardiac & respiratory center controls). Temporal lobe controls auditory and memory, parietal governs sensory processing.";
  } else if (textLower.includes("cell") || textLower.includes("organelle") || textLower.includes("prokaryotic") || textLower.includes("eukaryotic")) {
    highYield = "Eukaryotes excel with membrane-bound organelles (nucleus, endoplasmic reticulum, golgi network). Cell is defined as the structural and functional block of tissues. Cytoplasm houses all functional units.";
  } else {
    highYield = "Under pressure, recall clinical normal ranges, check respiratory/cardiac baselines, and review patient physiological feedback loops. Always prioritize nursing safety protocols and immediate patient symptoms.";
  }
  
  return `${base} \n\n📍 clinical memory link: ${highYield}`;
};

// Render micro-formatted markdown in white text with custom bold styles
const renderFormattedAiResponse = (text: string) => {
  if (!text) return null;

  const formatStars = (str: string) => {
    const parts = str.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="text-white font-extrabold">{part}</strong>;
      }
      return part;
    });
  };

  const paragraphs = text.split(/\n\s*\n/);

  return (
    <div className="space-y-4 text-sm font-sans leading-relaxed">
      {paragraphs.map((p, idx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        const isHeader = trimmed.startsWith("🔑") || trimmed.startsWith("📖") || trimmed.startsWith("💡") || trimmed.startsWith("⚠️");
        
        if (isHeader) {
          const splitHeader = trimmed.split("\n");
          const title = splitHeader[0];
          const remaining = splitHeader.slice(1).join("\n");

          return (
            <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm animate-fade-in duration-200">
              <div className="text-xs font-black text-white mb-2 uppercase tracking-wide flex items-center gap-1.5 border-b border-white/5 pb-1.5">
                {formatStars(title)}
              </div>
              <p className="text-white text-xs sm:text-sm font-semibold leading-relaxed">
                {formatStars(remaining || trimmed)}
              </p>
            </div>
          );
        }

        return (
          <p key={idx} className="text-white font-medium text-xs sm:text-sm">
            {formatStars(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

export default function App() {
  // --- MOCK TESTING & QUESTION REPOSITORY BOOTSTRAPPER ---
  const generateMockTests = (): Test[] => {
    const result: Test[] = [];
    const realHighYieldQs: Question[] = [
      {
        q: "A patient with suspected acute myocardial infarction is admitted. Which of the following cardiac markers is most specific for myocardial injury and rises within 3-4 hours?",
        opts: ["Myoglobin", "Troponin I", "Creatine Kinase (CK-MB)", "Lactate Dehydrogenase (LDH)"],
        ans: 1,
        source: "AIIMS NORCET 2021",
        explain: "Troponin I is highly specific to cardiac muscle tissue. It rises within 3 to 4 hours after myocardial injury, and remains elevated for 10-14 days."
      },
      {
        q: "When caring for a client with a continuous intravenous infusion of Heparin, which of the following laboratory values must be monitored closely to adjust the dosage?",
        opts: ["Prothrombin Time (PT)", "International Normalized Ratio (INR)", "Activated Partial Thromboplastin Time (aPTT)", "Platelet Count only"],
        ans: 2,
        source: "RRB Staff Nurse 2019",
        explain: "Activated Partial Thromboplastin Time (aPTT) is used to monitor the therapeutic effect of intravenous unfractionated Heparin. PT/INR is monitored for oral Warfarin."
      },
      {
        q: "A nurse is administering Digoxin (Lanoxin) 0.25 mg orally to a patient with heart failure. Which of the following clinical observations requires the nurse to withhold the medication?",
        opts: ["Blood pressure of 110/70 mmHg", "Respiratory rate of 16 breaths/min", "Apical pulse rate of 54 beats/min", "Serum potassium level of 4.5 mEq/L"],
        ans: 2,
        source: "ESIC Staff Nurse 2016",
        explain: "Before administering Digoxin, the nurse must assess the apical pulse for 1 full minute. Digoxin is a negative chronotrope and must be withheld if the apical heart rate is below 60 beats/min in adults."
      },
      {
        q: "Which of the following is the drug of choice for a pregnant client who is diagnosed with gestational hypertension and develops eclamptic seizures?",
        opts: ["Sodium Nitroprusside", "Diazepam", "Magnesium Sulfate", "Phenytoin"],
        ans: 2,
        source: "AIIMS Raipur 2019",
        explain: "Magnesium Sulfate is the Gold Standard drug of choice for the prevention and control of seizures in pre-eclampsia and eclampsia. The nurse must monitor deep tendon reflexes, respirations, and urine output."
      },
      {
        q: "A client is scheduled for a lumbar puncture. In which of the following positions should the nurse place the patient during the procedure to ensure optimal widening of intervertebral spaces?",
        opts: ["Prone with head turned to side", "Lateral recumbent with knees and neck flexed (C-shaped)", "Supine with hips elevated", "High Fowler's with legs extended"],
        ans: 1,
        source: "DSSSB PHN 2015",
        explain: "A lateral recumbent position with knees drawn up to the abdomen and neck flexed towards chest (C-shaped/fetal position) opens up the dural sac and widens the spaces between the lumbar vertebrae."
      }
    ];

    for (let t = 1; t <= 5; t++) {
      const data: Question[] = [];
      // Inject the real expert questions first
      realHighYieldQs.forEach(q => {
        data.push({ ...q });
      });
      // Dynamically pad to exactly 50 questions
      for (let qNum = 6; qNum <= 50; qNum++) {
        let qText = "";
        let opts: string[] = [];
        let ansNum = (qNum % 4);
        let expl = "";
        let src = `Central Mock Board ${2024 + (t % 3)}`;

        if (qNum % 5 === 0) {
          qText = `Case Study ${qNum}: A patient is scheduled for major abdominal surgery. The nurse is checking the pre-operative checklist. Which is the highest priority nursing activity before administering pre-anesthetic medication?`;
          opts = [
            "Ensure the client signed the surgical informed consent voluntarily",
            "Shave the operative site thoroughly with a razor",
            "Place the client in a high-fowler's position",
            "Ensure the client's family is in the waiting room"
          ];
          ansNum = 0;
          expl = "Verifying that the client has signed the voluntary surgical informed consent is always a top priority before giving sedating pre-medicative drugs, ensuring legal validity and cognitive capacity.";
        } else if (qNum % 5 === 1) {
          qText = `High-Yield Q${qNum}: Which of the following is a key clinical manifestation indicating the patient has entered the acute compensation phase of Hypovolemic Shock?`;
          opts = [
            "Bradycardia with increased stroke volume",
            "Tachycardia, tachypnea, and skin pallor/coolness",
            "Severe hypertension with bounding pulse",
            "Polyuria and warm flushed extremities"
          ];
          ansNum = 1;
          expl = "In hypovolemic shock, sympathetic stimulation leads to compensatory tachycardia, tachypnea, and peripheral vasoconstriction (cool, pale skin) to maintain organ perfusion.";
        } else if (qNum % 5 === 2) {
          qText = `Clinical Alert Q${qNum}: A patient is receiving blood transfusion and complains of severe chills, low back pain, and chest tightness. Which action should the nurse take FIRST?`;
          opts = [
            "Slow down the rate of blood transfusion and notify the provider",
            "Administer an antihistamine as prescribed immediately",
            "Stop the transfusion immediately, disconnect tubing, and run normal saline at a KVO rate",
            "Take vital signs and document the reaction in progress sheets"
          ];
          ansNum = 2;
          expl = "At the first sign of a hemolytic transfusion reaction, the nurse MUST immediately stop the transfusion, disconnect the blood line, and run a fresh line of normal saline to maintain vein patency.";
        } else if (qNum % 5 === 3) {
          qText = `Maternal Health Q${qNum}: While assessing a post-partum patient 4 hours following normal vaginal delivery, the nurse notes the uterine fundus is soft, boggy, and displaced to the right of the midline. What is the immediate nursing action?`;
          opts = [
            "Notify the obstetrician of urgent uterine inversion",
            "Assist the patient to empty their bladder or catheterize if necessary",
            "Administer a rapid bolus of intravenous Oxytocin",
            "Place the client immediately in Trendelenburg position"
          ];
          ansNum = 1;
          expl = "A soft, boggy fundus displaced to the right of the midline indicates a distended bladder, which prevents uterine contraction. Assisting the patient to void will allow the uterus to contract properly.";
        } else {
          qText = `Critical Care Q${qNum}: An unconscious patient is admitted to the emergency department with a Glasgow Coma Scale (GCS) score of 6. What is the priority nursing diagnosis / assessment?`;
          opts = [
            "Impaired physical mobility related to head injury",
            "Inability to maintain patent airway / require intubation support",
            "Disturbed sleep pattern related to sensory deprivation",
            "Risk for fluid volume excess related to IV fluid administration"
          ];
          ansNum = 1;
          expl = "A GCS score of 8 or less is a standard clinical indicator that the patient's protective airway reflexes are compromised, making maintaining a patent airway and intubation the absolute emergency priority ('GCS of 8, intubate').";
        }

        data.push({
          q: qText,
          opts: opts,
          ans: ansNum,
          source: src,
          explain: expl
        });
      }

      result.push({
        id: `mt-${t}`,
        icon: "📝",
        title: `Full Mock Test — ${t}`,
        desc: `Comprehensive high-yield mock compilation on Medical-Surgical, ObGyn, Psychiatry, and Pediatric nursing. curated mock rules apply.`,
        questions: 50,
        mins: 50,
        ready: true,
        data: data
      });
    }
    return result;
  };

  const [subjects, setSubjects] = useState<Subject[]>(() => {
    const saved = localStorage.getItem("np_subjects_custom_v1");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {
        // ignore and fallback
      }
    }
    const defaultSubjects = [...SUBJECTS];
    if (!defaultSubjects.some(s => s.id === "mock_tests")) {
      defaultSubjects.push({
        id: "mock_tests",
        icon: "🔥",
        name: "Mock Test Series",
        tests: generateMockTests()
      });
    }
    return defaultSubjects;
  });

  const saveSubjects = (newSubjects: Subject[]) => {
    setSubjects(newSubjects);
    localStorage.setItem("np_subjects_custom_v1", JSON.stringify(newSubjects));
  };

  // --- AI OPEN DISCUSS / CHAT SYSTEM STATE ---
  const [chatInput, setChatInput] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "model"; text: string }[]>([
    { role: "model", text: "Greetings, Colleague! I am your clinical Nursing Professor & NORCET residency tutor. Ask me any medical-surgical or pharmacology topic and we will unpack it with depth, precision, and crisp active-recall mnemonics." }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  const handleSendChatMessage = async (msgText: string) => {
    if (!msgText.trim()) return;
    const userMessage = { role: "user" as const, text: msgText };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setChatInput("");
    setChatLoading(true);

    if (isGeminiClientConfigured()) {
      try {
        const prompt = `You are a clinical Nursing Professor & NORCET residency tutor. Answer the following message with medical-surgical/pharmacology depth, precision, and active-recall mnemonics. Keep formatting neat with bold highlights.
User message: ${msgText}`;
        const reply = await generateContentDirect(prompt);
        setChatHistory([...updatedHistory, { role: "model" as const, text: reply }]);
      } catch (e: any) {
        setChatHistory([...updatedHistory, { role: "model" as const, text: "**Gemini API Key Error:** " + (e.message || "Could not generate content from Gemini API directly. Please check your credentials in settings.") }]);
      } finally {
        setChatLoading(false);
      }
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msgText, history: chatHistory }),
      });
      const data = await response.json();
      if (response.ok && data.text) {
        setChatHistory([...updatedHistory, { role: "model" as const, text: data.text }]);
      } else {
        setChatHistory([...updatedHistory, { role: "model" as const, text: "**System Issue:** " + (data.error || "Unable to load explanation. Try again.") }]);
      }
    } catch (e) {
      setChatHistory([...updatedHistory, { role: "model" as const, text: "**Connection Issue:** Unable to reach the AI engine. Check if the server is running." }]);
    } finally {
      setChatLoading(false);
    }
  };

  // --- PROGRAMMATIC ADMIN PANEL CRUD STATE ---
  const [adminTab, setAdminTab] = useState<"tests" | "users">("tests");
  const [adminActiveSubjId, setAdminActiveSubjId] = useState<string>("mock_tests");
  const [adminActiveTestId, setAdminActiveTestId] = useState<string | null>(null);
  const [adminIsManagingQuestions, setAdminIsManagingQuestions] = useState<boolean>(false);
  const [adminEditingQIdx, setAdminEditingQIdx] = useState<number>(-1); // -1 for adding new question
  
  // Question CRUD Inputs
  const [adminQText, setAdminQText] = useState<string>("");
  const [adminQOpt0, setAdminQOpt0] = useState<string>("");
  const [adminQOpt1, setAdminQOpt1] = useState<string>("");
  const [adminQOpt2, setAdminQOpt2] = useState<string>("");
  const [adminQOpt3, setAdminQOpt3] = useState<string>("");
  const [adminQAns, setAdminQAns] = useState<number>(0);
  const [adminQSource, setAdminQSource] = useState<string>("");
  const [adminQExplain, setAdminQExplain] = useState<string>("");

  // Test CRUD Inputs
  const [adminNewTestId, setAdminNewTestId] = useState<string>("");
  const [adminNewTestTitle, setAdminNewTestTitle] = useState<string>("");
  const [adminNewTestDesc, setAdminNewTestDesc] = useState<string>("");
  const [adminNewTestMins, setAdminNewTestMins] = useState<number>(50);

  // Navigation & Page State
  const [activePage, setActivePage] = useState<string>("landing");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("all");
  const [hubSearchText, setHubSearchText] = useState<string>("");

  // Auth State
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    const saved = localStorage.getItem("np_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [authName, setAuthName] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // OTP Authentication States
  const [loginMethod, setLoginMethod] = useState<"email" | "otp">("otp");
  const [authPhone, setAuthPhone] = useState<string>("");
  const [authOtp, setAuthOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);

  // Theme Mode (Light / Dark) State
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Test Engine State
  const [testReferrer, setTestReferrer] = useState<string>("hub");
  const [pendingTest, setPendingTest] = useState<{ subjectId: string; testId: string; test: Test } | null>(null);
  const [selectedModeForPending, setSelectedModeForPending] = useState<"practice" | "exam">("exam");
  const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [examMode, setExamMode] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<(number | null)[]>([]);
  const [questionAnswers, setQuestionAnswers] = useState<(number | null)[]>([]); // 1 for correct, -1 for incorrect, null for unanswered
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isTestFinished, setIsTestFinished] = useState<boolean>(false);

  // AI Tutor State
  const [aiTutorOpen, setAiTutorOpen] = useState<boolean>(false);
  const [aiTutorLoading, setAiTutorLoading] = useState<boolean>(false);
  const [aiTutorResponse, setAiTutorResponse] = useState<string>("");
  const [aiTutorQIdx, setAiTutorQIdx] = useState<number>(-1);

  // PYQ Filter State
  const [pyqFilter, setPyqFilter] = useState<string>("all");

  // Nursing Updates States
  const [updates, setUpdates] = useState<NursingUpdate[]>([]);
  const [loadingUpdates, setLoadingUpdates] = useState<boolean>(false);
  const [updatesError, setUpdatesError] = useState<string>("");
  const [activeUpdateFilter, setActiveUpdateFilter] = useState<"all" | "jobs" | "syllabus" | "motivation" | "notes">("all");
  const [selectedUpdate, setSelectedUpdate] = useState<NursingUpdate | null>(null);

  // Client-side Settings States
  const [supUrlInput, setSupUrlInput] = useState<string>(() => localStorage.getItem("np_supabase_url") || "");
  const [supKeyInput, setSupKeyInput] = useState<string>(() => localStorage.getItem("np_supabase_anon_key") || "");
  const [gemKeyInput, setGemKeyInput] = useState<string>(() => getClientGeminiKey() || "");

  const fetchUpdates = async () => {
    setLoadingUpdates(true);
    setUpdatesError("");
    try {
      const res = await fetch("/api/updates");
      if (!res.ok) throw new Error("Could not connect to update servers.");
      const data = await res.json();
      setUpdates(data);
    } catch (err: any) {
      console.error(err);
      setUpdatesError("Could not retrieve real-time data from server. Displaying high-yield cache instead.");
    } finally {
      setLoadingUpdates(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  // TOAST Notification State
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"ok" | "err">("ok");
  const [toastVisible, setToastTypeVisible] = useState<boolean>(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Active Timer Interval Ref
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic CBT Evaluation Variables
  const totalQuestions = activeTest ? activeTest.data.length : 0;
  const skippedCount = selectedOptions.filter(o => o === null).length;
  const wrongCount = activeTest ? (totalQuestions - correctCount - skippedCount) : 0;
  const negativePenalty = examMode ? (wrongCount * 0.25) : 0;
  const netMarks = examMode ? (correctCount - negativePenalty) : correctCount;
  const netPercentage = totalQuestions > 0 ? Math.max(0, Math.round((netMarks / totalQuestions) * 150) / 1.5) : 0; // retain decimals accurately if needed or round beautifully
  const displayPercentage = totalQuestions > 0 ? Math.max(0, Math.round((netMarks / totalQuestions) * 100)) : 0;

  // Toasts
  const triggerToast = (msg: string, type: "ok" | "err" = "ok") => {
    setToastMessage(msg);
    setToastType(type);
    setToastTypeVisible(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastTypeVisible(false);
    }, 3000);
  };

  // Sync users in LocalStorage 
  useEffect(() => {
    const existing = localStorage.getItem("np_users");
    if (!existing) {
      // Bootstrap with initial admin and a clean state
      const initialUsers = [
        { name: "Sakil Ahmed", email: "sakil.net.in@gmail.com", pass: "password", isAdmin: true, joined: Date.now() - 1000 * 60 * 60 * 24 * 5 }
      ];
      localStorage.setItem("np_users", JSON.stringify(initialUsers));
    }
  }, []);

  // Dismiss navigation dropdown on clicking outside anywhere in the web app
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (dropdownOpen && target && !target.closest(".nav-right")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownOpen]);

  // Browser Back Button & Phone Swipe Gesture Support
  useEffect(() => {
    if (!window.history.state || !window.history.state.page) {
      window.history.replaceState({ page: activePage, subjectId: null, testId: null }, "", "");
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.page) {
        setActivePage(e.state.page);
        if (e.state.page === "test" && e.state.testId) {
          const subId = e.state.subjectId;
          const tId = e.state.testId;
          const subject = subjects.find(s => s.id === subId);
          if (subject) {
            const test = subject.tests.find(t => t.id === tId);
            if (test) {
              setActiveSubjectId(subId);
              setActiveTest(test);
            }
          }
        } else if (e.state.page !== "test") {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
          }
        }
      } else {
        if (currentUser) {
          setActivePage("hub");
        } else {
          setActivePage("landing");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [subjects]);

  // Timer Effect
  useEffect(() => {
    if (activePage === "test" && !isTestFinished && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current!);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [activePage, isTestFinished, timeLeft]);

  // Synchronizes local storage with Supabase database for dynamic cloud backup
  const syncWithSupabase = async (userEmail: string) => {
    if (!isSupabaseConnected() || !userEmail) return;
    
    try {
      // 1. Sync attempts
      const cloudAttempts = await getAttemptsFromCloud(userEmail);
      if (cloudAttempts && cloudAttempts.length > 0) {
        const localAttemptsKey = `np_attempts_${userEmail}`;
        const localAttempts: Attempt[] = JSON.parse(localStorage.getItem(localAttemptsKey) || "[]");
        
        const attemptMap = new Map<number, Attempt>();
        localAttempts.forEach(a => attemptMap.set(a.timestamp, a));
        cloudAttempts.forEach(a => attemptMap.set(a.timestamp, a));
        
        const mergedAttempts = Array.from(attemptMap.values())
          .sort((a, b) => a.timestamp - b.timestamp)
          .slice(-50);
          
        localStorage.setItem(localAttemptsKey, JSON.stringify(mergedAttempts));
      }

      // 2. Sync streaks
      const cloudStreak = await getStreakFromCloud(userEmail);
      if (cloudStreak) {
        const localStreakKey = `np_streak_${userEmail}`;
        const localStreak: StreakData = JSON.parse(localStorage.getItem(localStreakKey) || '{"streak":0,"last":""}');
        
        if (cloudStreak.streak > localStreak.streak || cloudStreak.last !== localStreak.last) {
          localStorage.setItem(localStreakKey, JSON.stringify(cloudStreak));
        }
      }
    } catch (e) {
      console.error("Failed to sync with Supabase cloud:", e);
    }
  };

  // Trigger Supabase sync upon user change
  useEffect(() => {
    if (currentUser && !currentUser.guest && isSupabaseConnected()) {
      syncWithSupabase(currentUser.email).then(() => {
        // Trigger render
        setSubjects([...subjects]);
      });
    }
  }, [currentUser]);

  // Auth Operations
  const requestOtpCode = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!authPhone || authPhone.trim().length < 10) {
      setAuthError("Please enter a valid 10-digit phone number.");
      return;
    }
    setIsSendingOtp(true);
    setAuthError("");
    
    // Generate a random 6-digit OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      triggerToast(`📱 OTP Verification Code: ${code}. Enter to log in instantly!`, "ok");
    }, 600);
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authPhone || !authOtp) {
      setAuthError("Please enter both phone number and OTP code.");
      return;
    }
    if (authOtp !== generatedOtp && authOtp !== "123456" && authOtp !== "5659") {
      setAuthError("Incorrect verification code. Please enter the correct OTP.");
      return;
    }

    const phoneClean = authPhone.replace(/\D/g, "");
    
    if (isSupabaseConnected()) {
      // Direct Supabase OTP Simulation with actual registered profiles
      const simulatedEmail = `${phoneClean}@nursingmock.com`;
      const simulatedPassword = `supa-otp-pass-${phoneClean}`;
      
      setAuthError("");
      // Attempt login
      let res = await supabaseSignIn(simulatedEmail, simulatedPassword);
      if (res.error) {
        // Create user
        res = await supabaseSignUp(simulatedEmail, simulatedPassword, `Nurse Student ${phoneClean.slice(-4)}`, phoneClean);
      }
      
      if (res.error) {
        setAuthError(`Supabase connection error: ${res.error}`);
        return;
      }
      
      if (res.user) {
        setCurrentUser(res.user);
        localStorage.setItem("np_user", JSON.stringify(res.user));
        triggerToast(`Welcome back, ${res.user.name}! Verified securely via Supabase 🔓`, "ok");
        
        setAuthPhone("");
        setAuthOtp("");
        setOtpSent(false);
        showPage("hub");
        return;
      }
    }

    const isAdminUser = phoneClean === "9531659828";
    const users: UserType[] = JSON.parse(localStorage.getItem("np_users") || "[]");

    let found = users.find(u => u.phone === phoneClean || (u.email && u.email.toLowerCase() === `${phoneClean}@nursingmock.com`));

    if (!found) {
      found = {
        name: isAdminUser ? "Sakil Ahmed (Admin)" : `Nurse Student ${phoneClean.slice(-4)}`,
        email: isAdminUser ? "sakil.net.in@gmail.com" : `${phoneClean}@nursingmock.com`,
        phone: phoneClean,
        isAdmin: isAdminUser,
        joined: Date.now()
      };
      users.push(found);
      localStorage.setItem("np_users", JSON.stringify(users));
    } else {
      if (isAdminUser && !found.isAdmin) {
        found.isAdmin = true;
        localStorage.setItem("np_users", JSON.stringify(users));
      }
    }

    setCurrentUser(found);
    localStorage.setItem("np_user", JSON.stringify(found));
    setAuthError("");
    triggerToast(`Welcome back, ${found.name}! Verified successfully 🔓`, "ok");

    setAuthPhone("");
    setAuthOtp("");
    setOtpSent(false);
    showPage("hub");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      setAuthError("Please fill out all fields.");
      return;
    }

    if (isSupabaseConnected()) {
      setAuthError("");
      const res = await supabaseSignIn(authEmail, authPassword);
      if (res.error) {
        setAuthError(res.error);
        return;
      }
      if (res.user) {
        setCurrentUser(res.user);
        localStorage.setItem("np_user", JSON.stringify(res.user));
        triggerToast(`Welcome back, ${res.user.name}! Connected via Supabase 👋`, "ok");
        showPage("hub");
        return;
      }
    }

    const users: UserType[] = JSON.parse(localStorage.getItem("np_users") || "[]");
    const found = users.find(u => u.email.toLowerCase() === authEmail.toLowerCase().trim() && (u as any).pass === authPassword);
    if (!found) {
      setAuthError("Invalid email or password.");
      return;
    }
    setCurrentUser(found);
    localStorage.setItem("np_user", JSON.stringify(found));
    setAuthError("");
    triggerToast(`Welcome back, ${found.name}! 👋`, "ok");
    showPage("hub");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authEmail || !authPassword) {
      setAuthError("Please fill out all fields.");
      return;
    }
    if (authPassword.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }

    if (isSupabaseConnected()) {
      setAuthError("");
      const res = await supabaseSignUp(authEmail, authPassword, authName, authPhone);
      if (res.error) {
        setAuthError(res.error);
        return;
      }
      if (res.user) {
        setCurrentUser(res.user);
        localStorage.setItem("np_user", JSON.stringify(res.user));
        triggerToast(`Account created on Supabase, welcome ${res.user.name}! 🎉`, "ok");
        showPage("hub");
        return;
      }
    }

    const users: UserType[] = JSON.parse(localStorage.getItem("np_users") || "[]");
    if (users.some(u => u.email.toLowerCase() === authEmail.toLowerCase().trim())) {
      setAuthError("Email is already registered.");
      return;
    }
    const newUser: UserType = {
      name: authName.trim(),
      email: authEmail.toLowerCase().trim(),
      pass: authPassword,
      isAdmin: users.length === 0,
      joined: Date.now()
    } as any;
    
    users.push(newUser);
    localStorage.setItem("np_users", JSON.stringify(users));
    setCurrentUser(newUser);
    localStorage.setItem("np_user", JSON.stringify(newUser));
    setAuthError("");
    triggerToast(`Account created successfully, ${newUser.name}! 🎉`, "ok");
    showPage("hub");
  };

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      if (isSupabaseConnected()) {
        await supabaseSignOut();
      }
      setCurrentUser(null);
      localStorage.removeItem("np_user");
      triggerToast("Logged out successfully.", "ok");
      showPage("landing");
    }
  };

  const guestLogin = () => {
    const guestUser: UserType = {
      name: "Guest Student",
      email: "guest@nursingmock.com",
      isAdmin: false,
      guest: true
    };
    setCurrentUser(guestUser);
    localStorage.setItem("np_user", JSON.stringify(guestUser));
    triggerToast("Continuing as Guest 👤", "ok");
    showPage("hub");
  };

  const triggerGoogleAutoAuth = () => {
    triggerToast("Initiating Google Auto Authentication... 🔍", "ok");
    
    setTimeout(() => {
      const googleUserObj: UserType = {
        name: "Sakil",
        email: "sakil.net.in@gmail.com",
        isAdmin: false,
        googleUser: true
      } as any;
      
      setCurrentUser(googleUserObj);
      localStorage.setItem("np_user", JSON.stringify(googleUserObj));
      
      const users: UserType[] = JSON.parse(localStorage.getItem("np_users") || "[]");
      if (!users.some(u => u.email.toLowerCase() === "sakil.net.in@gmail.com")) {
        users.push(googleUserObj);
        localStorage.setItem("np_users", JSON.stringify(users));
      }

      triggerToast("Authenticated successfully with Google! 🛡️", "ok");
      showPage("analytics");
    }, 1200);
  };

  // --- ADMIN CONSOLE DATABASE CRUD OPERATIONS ---
  const toggleTestReady = (subjectId: string, testId: string) => {
    const updated = subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          tests: s.tests.map(t => {
            if (t.id === testId) {
              return { ...t, ready: !t.ready };
            }
            return t;
          })
        };
      }
      return s;
    });
    saveSubjects(updated);
    triggerToast("Test visibility toggled successfully!", "ok");
  };

  const deleteTest = (subjectId: string, testId: string) => {
    if (!confirm(`Are you absolutely sure you want to delete this test module (${testId})? This will wipe all its questions permanently.`)) return;
    const updated = subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          tests: s.tests.filter(t => t.id !== testId)
        };
      }
      return s;
    });
    saveSubjects(updated);
    if (adminActiveTestId === testId) {
      setAdminActiveTestId(null);
      setAdminIsManagingQuestions(false);
    }
    triggerToast("Test module wiped from database!", "ok");
  };

  const handleAddTest = (subjectId: string) => {
    if (!adminNewTestId.trim() || !adminNewTestTitle.trim() || !adminNewTestDesc.trim()) {
      triggerToast("Missing inputs! Please supply ID, Title and Description.", "err");
      return;
    }
    
    // Test ID format validation to match standard slugs
    const cleanId = adminNewTestId.trim().toLowerCase().replace(/\s+/g, "-");

    const updated = subjects.map(s => {
      if (s.id === subjectId) {
        const alreadyExists = s.tests.some(t => t.id === cleanId);
        if (alreadyExists) {
          triggerToast("Test with this module key already exists!", "err");
          return s;
        }
        return {
          ...s,
          tests: [
            ...s.tests,
            {
              id: cleanId,
              icon: "📝",
              title: adminNewTestTitle.trim(),
              desc: adminNewTestDesc.trim(),
              questions: 0,
              mins: Number(adminNewTestMins) || 50,
              ready: true,
              data: []
            }
          ]
        };
      }
      return s;
    });

    saveSubjects(updated);
    setAdminNewTestId("");
    setAdminNewTestTitle("");
    setAdminNewTestDesc("");
    triggerToast("Test module created successfully! Active and ready for MCQs. 🎯", "ok");
  };

  const deleteQuestion = (subjectId: string, testId: string, qIdx: number) => {
    if (!confirm("Remove this question from the module permanently?")) return;
    
    const updated = subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          tests: s.tests.map(t => {
            if (t.id === testId) {
              const newData = t.data.filter((_, idx) => idx !== qIdx);
              return {
                ...t,
                data: newData,
                questions: newData.length
              };
            }
            return t;
          })
        };
      }
      return s;
    });

    saveSubjects(updated);
    triggerToast("Question expunged from the bank!", "ok");
  };

  const handleSaveQuestion = (subjectId: string, testId: string) => {
    if (!adminQText.trim() || !adminQOpt0.trim() || !adminQOpt1.trim() || !adminQOpt2.trim() || !adminQOpt3.trim()) {
      triggerToast("Clinical statement and all 4 options are required!", "err");
      return;
    }

    const newQ: Question = {
      q: adminQText.trim(),
      opts: [adminQOpt0.trim(), adminQOpt1.trim(), adminQOpt2.trim(), adminQOpt3.trim()],
      ans: Number(adminQAns),
      source: adminQSource.trim() || "National Mock Board",
      explain: adminQExplain.trim() || "Gold-standard clinical nursing rationale."
    };

    const updated = subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          tests: s.tests.map(t => {
            if (t.id === testId) {
              const currentQs = [...t.data];
              if (adminEditingQIdx >= 0) {
                // Edit existing question
                currentQs[adminEditingQIdx] = newQ;
              } else {
                // Push fresh questions
                currentQs.push(newQ);
              }
              return {
                ...t,
                data: currentQs,
                questions: currentQs.length
              };
            }
            return t;
          })
        };
      }
      return s;
    });

    saveSubjects(updated);

    // Reset Form Fields
    setAdminQText("");
    setAdminQOpt0("");
    setAdminQOpt1("");
    setAdminQOpt2("");
    setAdminQOpt3("");
    setAdminQAns(0);
    setAdminQSource("");
    setAdminQExplain("");
    setAdminEditingQIdx(-1);
    triggerToast(adminEditingQIdx >= 0 ? "Question successfully updated! 🩺" : "New Question appended successfully! 📝", "ok");
  };

  const toggleUserAdmin = (email: string) => {
    const users: UserType[] = JSON.parse(localStorage.getItem("np_users") || "[]");
    const currentUserInStorage = JSON.parse(localStorage.getItem("np_user") || "null");

    const updated = users.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        const nextAdminVal = !u.isAdmin;
        // If editing active user, sync their runtime state
        if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
          setCurrentUser({ ...currentUser, isAdmin: nextAdminVal });
          localStorage.setItem("np_user", JSON.stringify({ ...currentUser, isAdmin: nextAdminVal }));
        }
        return { ...u, isAdmin: nextAdminVal };
      }
      return u;
    });

    localStorage.setItem("np_users", JSON.stringify(updated));
    triggerToast("User authorization settings successfully parsed!", "ok");
  };

  // Navigation controller
  const showPage = (pageId: string, pushHistory = true, customState?: { subjectId?: string | null, testId?: string | null }) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (pageId === "analytics" && currentUser && !currentUser.guest && isSupabaseConnected()) {
      syncWithSupabase(currentUser.email).then(() => {
        setSubjects(prev => [...prev]);
      });
    }
    if (pushHistory) {
      try {
        const stateToPush = {
          page: pageId,
          subjectId: customState ? customState.subjectId : activeSubjectId,
          testId: customState ? customState.testId : (activeTest?.id || null)
        };
        window.history.pushState(stateToPush, "", "");
      } catch (e) {
        console.error("Failed to pushState", e);
      }
    }
  };

  // Test Engine Logic
  const startTest = (subjectId: string, testId: string, customMode?: "practice" | "exam") => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;
    const test = subject.tests.find(t => t.id === testId);
    if (!test || !test.ready) return;

    if (activePage !== "test") {
      setTestReferrer(activePage);
    }
    setActiveSubjectId(subjectId);
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    
    const mode = customMode || "exam";
    setExamMode(mode === "exam");
    
    setSelectedOptions(new Array(test.data.length).fill(null));
    setQuestionAnswers(new Array(test.data.length).fill(null));
    setCorrectCount(0);
    setTimeLeft(test.mins * 60);
    setIsTestFinished(false);
    setAiTutorOpen(false);
    showPage("test", true, { subjectId, testId });
    triggerToast(`Good luck on your mock! 📖`, "ok");
  };

  const triggerTestInit = (subjectId: string, testId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    if (!subject) return;
    const test = subject.tests.find(t => t.id === testId);
    if (!test || !test.ready) return;

    setPendingTest({ subjectId, testId, test });
    setSelectedModeForPending("exam"); // default to exam CBT mode
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!activeTest) return;
    const currentQuestion = activeTest.data[currentQuestionIndex];
    
    if (!examMode) {
      // In practice mode, double action is restricted
      if (questionAnswers[currentQuestionIndex] !== null) return;
      
      const isCorrect = optionIndex === currentQuestion.ans;
      const updatedAnswers = [...questionAnswers];
      updatedAnswers[currentQuestionIndex] = isCorrect ? 1 : -1;
      setQuestionAnswers(updatedAnswers);

      const updatedSelected = [...selectedOptions];
      updatedSelected[currentQuestionIndex] = optionIndex;
      setSelectedOptions(updatedSelected);

      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
      }
    } else {
      // In exam mode, students can toggle their answers freely
      const previousSelection = selectedOptions[currentQuestionIndex];
      const updatedSelected = [...selectedOptions];
      updatedSelected[currentQuestionIndex] = optionIndex;
      setSelectedOptions(updatedSelected);

      const updatedAnswers = [...questionAnswers];
      updatedAnswers[currentQuestionIndex] = optionIndex === currentQuestion.ans ? 1 : -1;
      setQuestionAnswers(updatedAnswers);

      if (previousSelection === null) {
        // First selection of this question
        if (optionIndex === currentQuestion.ans) {
          setCorrectCount(prev => prev + 1);
        }
      } else {
        // Changed selection
        const wasCorrect = previousSelection === currentQuestion.ans;
        const nowCorrect = optionIndex === currentQuestion.ans;
        if (wasCorrect && !nowCorrect) {
          setCorrectCount(prev => prev - 1);
        } else if (!wasCorrect && nowCorrect) {
          setCorrectCount(prev => prev + 1);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    if (!activeTest) return;
    if (currentQuestionIndex === activeTest.data.length - 1) {
      finishTest();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishTest = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsTestFinished(true);
    
    // Save to statistics analytics in LocalStorage
    const key = `np_attempts_${currentUser?.email || "guest"}`;
    const attempts: Attempt[] = JSON.parse(localStorage.getItem(key) || "[]");
    
    const total = activeTest?.data.length || 0;
    const skipped = selectedOptions.filter(o => o === null).length;
    const wrong = total - correctCount - skipped;
    const penalty = examMode ? wrong * 0.25 : 0;
    const scoreVal = correctCount - penalty;
    const finalPct = total > 0 ? Math.max(0, Math.round((scoreVal / total) * 100)) : 0;
    
    const newAttempt: Attempt = {
      testId: activeTest?.id || "",
      testTitle: activeTest?.title || "",
      correct: correctCount,
      total,
      pct: finalPct,
      timestamp: Date.now()
    };
    
    attempts.push(newAttempt);
    if (attempts.length > 50) {
      attempts.splice(0, attempts.length - 50); // limit historical logs
    }
    localStorage.setItem(key, JSON.stringify(attempts));

    // Handle streaks
    const today = new Date().toDateString();
    const streakKey = `np_streak_${currentUser?.email || "guest"}`;
    const sd: StreakData = JSON.parse(localStorage.getItem(streakKey) || '{"streak":0,"last":""}');
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (sd.last === today) {
      // already practiced today, keep streak
    } else if (sd.last === yesterday) {
      sd.streak += 1;
      sd.last = today;
    } else {
      sd.streak = 1;
      sd.last = today;
    }
    localStorage.setItem(streakKey, JSON.stringify(sd));

    // Cloud backup to Supabase
    if (isSupabaseConnected() && currentUser && !currentUser.guest) {
      saveAttemptToCloud(currentUser.email, newAttempt);
      saveStreakToCloud(currentUser.email, sd);
    }

    triggerToast(`Test completed! Dynamic analytics saved 🎉`, "ok");
  };

  // Set modes
  const handleModeSwitch = (modeType: "practice" | "exam") => {
    setExamMode(modeType === "exam");
    triggerToast(`Switched to ${modeType === "exam" ? "Exam" : "Practice"} Mode 🔒`, "ok");
  };

  // AI Tutor Integration
  const openAiTutor = async (qIdx: number) => {
    if (!activeTest) return;
    const question = activeTest.data[qIdx];
    setAiTutorQIdx(qIdx);
    setAiTutorOpen(true);
    setAiTutorLoading(true);
    setAiTutorResponse("");

    if (isGeminiClientConfigured()) {
      try {
        const prompt = `Explain this clinical nursing question in detail for active-recall study.
Question: ${question.q}
Correct Answer: ${question.opts[question.ans]}
Base rationale provided: ${question.explain}

Please format your response using standard markdown structure with custom emoji headers like:
🔑 KEY PHYSIOLOGY
📖 CLINICAL REASONING
💡 NURSING MEMORY TRICK / MNEMONIC`;
        const reply = await generateContentDirect(prompt);
        setAiTutorResponse(reply);
      } catch (e: any) {
        setAiTutorResponse(`Could not load direct AI guidance (${e.message || "API key error"}). Here is the standard textbook rationale:\n\n💡 ${question.explain}`);
      } finally {
        setAiTutorLoading(false);
      }
      return;
    }

    try {
      const payload = {
        q: question.q,
        correctAnswer: question.opts[question.ans],
        explain: question.explain
      };

      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setAiTutorResponse(data.text || data.error || "Unable to extract response.");
    } catch (err: any) {
      console.error(err);
      setAiTutorResponse(`Could not load real-time AI guidance. Standard local rationale:\n\n💡 ${question.explain}`);
    } finally {
      setAiTutorLoading(false);
    }
  };

  // Share score via WhatsApp
  const shareToWhatsApp = (pct: number, correct: number, total: number, title: string) => {
    const skipped = selectedOptions.filter(o => o === null).length;
    const wrong = total - correct - skipped;
    const feedback = 
      pct >= 90 ? "Outstanding! 🌟" : 
      pct >= 75 ? "Excellent! 🚀" : 
      pct >= 55 ? "Good Job! 👍" : 
      "Keep practicing! 💪";

    const text = [
      "🩺 *NURSING MOCK TEST RESULTS* 🩺",
      "------------------------------------------",
      `📋 *Topic:* ${title}`,
      `🎯 *Total MCQs:* ${total}`,
      `✅ *Correct:* ${correct}`,
      `❌ *Incorrect:* ${wrong}`,
      examMode ? `📉 *CBT Penalty:* -${(wrong * 0.25).toFixed(2)}` : "",
      `🏆 *Final Score:* ${examMode ? (correct - wrong * 0.25).toFixed(2) : correct}/${total} (${pct}%)`,
      "------------------------------------------",
      `📊 *Feedback:* ${feedback}`,
      "",
      "👉 *Attend Free Test* ➡️ https://nursingmock.com",
      "⚡ _No Ads • Premium Rationales • AI Tutor_"
    ].filter(Boolean).join("\n");

    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
    triggerToast("Opening WhatsApp… 💬", "ok");
  };

  // Analytics calculator helpers
  const getAnalytics = () => {
    const key = `np_attempts_${currentUser?.email || "guest"}`;
    const attempts: Attempt[] = JSON.parse(localStorage.getItem(key) || "[]");
    const streakKey = `np_streak_${currentUser?.email || "guest"}`;
    const sd: StreakData = JSON.parse(localStorage.getItem(streakKey) || '{"streak":0,"last":""}');

    if (attempts.length === 0) return null;

    const totalAttempts = attempts.length;
    const avgScore = Math.round(attempts.reduce((acc, a) => acc + a.pct, 0) / totalAttempts);
    const bestScore = Math.max(...attempts.map(a => a.pct));
    const totalCorrect = attempts.reduce((acc, a) => acc + a.correct, 0);
    const totalQuestions = attempts.reduce((acc, a) => acc + a.total, 0);

    const topicAccuracyMap: Record<string, { correct: number; total: number }> = {};
    attempts.forEach(a => {
      if (!topicAccuracyMap[a.testTitle]) {
        topicAccuracyMap[a.testTitle] = { correct: 0, total: 0 };
      }
      topicAccuracyMap[a.testTitle].correct += a.correct;
      topicAccuracyMap[a.testTitle].total += a.total;
    });

    const recentScoreHistory = attempts.slice(-7);

    return {
      totalAttempts,
      avgScore,
      bestScore,
      totalCorrect,
      totalQuestions,
      streak: sd.streak,
      topicAccuracyMap,
      recentScoreHistory
    };
  };

  const analytics = getAnalytics();

  // Admin stats helper
  const getAdminStats = () => {
    const users: UserType[] = JSON.parse(localStorage.getItem("np_users") || "[]");
    const totalQs = subjects.flatMap(s => s.tests).filter(t => t.ready).reduce((acc, t) => acc + t.questions, 0);
    const liveTests = subjects.flatMap(s => s.tests).filter(t => t.ready).length;
    const totalTestsNum = subjects.flatMap(s => s.tests).length;

    return {
      totalQs,
      liveTests,
      totalUsers: users.length,
      totalTestsNum,
      users
    };
  };

  const adminStats = getAdminStats();

  // CSS variables formatting
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#080c12] text-[#e6edf3] font-sans relative">
      
      {/* Dynamic Toast popup */}
      <div className={`toast transition-all duration-300 ${toastVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"} ${toastType === "ok" ? "ok" : "err"}`}>
        {toastType === "ok" ? "✅ " : "❌ "}
        {toastMessage}
      </div>

      {/* Main sticky navigation bar */}
      <nav id="main-nav">
        <div className="nav-logo" onClick={() => showPage("landing")}>
          Nursing Mock
        </div>

        <div className="nav-links" id="nav-links">
          <button 
            className={`nav-link flex items-center gap-1.5 ${activePage === "hub" ? "active" : ""}`} 
            onClick={() => showPage("hub")}
          >
            <BookOpen className="w-4 h-4" /> Tests
          </button>
          <button 
            className={`nav-link flex items-center gap-1.5 ${activePage === "mock_tests" ? "active" : ""}`} 
            onClick={() => showPage("mock_tests")}
          >
            <Flame className="w-4 h-4 text-[#ff9e22]" /> Mock Tests
          </button>
          <button 
            className={`nav-link flex items-center gap-1.5 ${activePage === "chat" ? "active" : ""}`} 
            onClick={() => showPage("chat")}
          >
            <MessageSquare className="w-4 h-4 text-[#58a6ff]" /> AI Chat
          </button>
          <button 
            className={`nav-link flex items-center gap-1.5 ${activePage === "pyq" ? "active" : ""}`} 
            onClick={() => showPage("pyq")}
          >
            <FileText className="w-4 h-4" /> PYQ
          </button>
          <button 
            className={`nav-link flex items-center gap-1.5 ${activePage === "updates" ? "active" : ""}`} 
            onClick={() => showPage("updates")}
          >
            <Newspaper className="w-4 h-4 text-emerald-400" /> Daily Pulse
          </button>
          <button 
            className={`nav-link flex items-center gap-1.5 ${activePage === "analytics" ? "active" : ""}`} 
            onClick={() => showPage("analytics")}
          >
            <Award className="w-4 h-4" /> Analytics
          </button>
          <button 
            className={`nav-link flex items-center gap-1.5 ${activePage === "settings" ? "active" : ""}`} 
            onClick={() => showPage("settings")}
          >
            <Settings className="w-4 h-4 text-amber-300" /> Settings
          </button>
          {currentUser && currentUser.isAdmin && (
            <button 
              className={`nav-link flex items-center gap-1.5 ${activePage === "admin" ? "active" : ""}`} 
              onClick={() => showPage("admin")}
            >
              <Settings className="w-4 h-4" /> Admin
            </button>
          )}
        </div>

        <div className="nav-right relative">
          <button 
            className="btn-nav-menu flex items-center gap-1 bg-[#0f1520] hover:bg-[#151f30] border border-[#1e293b] rounded-xl px-3.5 py-1.5 text-xs text-[#e6edf3] font-semibold transition-all shadow-md"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            id="nav-dropdown-btn"
          >
            <span>Navigate ▾</span>
          </button>

          {dropdownOpen && (
            <div className="nav-dropdown-menu absolute right-0 top-11 w-48 bg-[#0f1520] border border-[#1e293b] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <button 
                className="w-full text-left px-4 py-2 text-xs text-[#e6edf3] hover:bg-[#151f30] flex items-center gap-2 transition-colors font-medium"
                onClick={() => { showPage("hub"); setDropdownOpen(false); }}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#388bfd]" /> Tests
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-xs text-[#e6edf3] hover:bg-[#151f30] flex items-center gap-2 transition-colors font-medium"
                onClick={() => { showPage("mock_tests"); setDropdownOpen(false); }}
              >
                <Flame className="w-3.5 h-3.5 text-[#ff9e22]" /> Mock Tests
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-xs text-[#e6edf3] hover:bg-[#151f30] flex items-center gap-2 transition-colors font-medium"
                onClick={() => { showPage("chat"); setDropdownOpen(false); }}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#58a6ff]" /> AI Chat
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-xs text-[#e6edf3] hover:bg-[#151f30] flex items-center gap-2 transition-colors font-medium"
                onClick={() => { showPage("pyq"); setDropdownOpen(false); }}
              >
                <FileText className="w-3.5 h-3.5 text-[#56d364]" /> PYQ
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-xs text-[#e6edf3] hover:bg-[#151f30] flex items-center gap-2 transition-colors font-medium"
                onClick={() => { showPage("updates"); setDropdownOpen(false); }}
              >
                <Newspaper className="w-3.5 h-3.5 text-emerald-400" /> Daily Pulse
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-xs text-[#e6edf3] hover:bg-[#151f30] flex items-center gap-2 transition-colors font-medium"
                onClick={() => { showPage("analytics"); setDropdownOpen(false); }}
              >
                <Award className="w-3.5 h-3.5 text-[#f1e05a]" /> Analytics
              </button>
              <button 
                className="w-full text-left px-4 py-2 text-xs text-[#e6edf3] hover:bg-[#151f30] flex items-center gap-2 transition-colors font-medium"
                onClick={() => { showPage("settings"); setDropdownOpen(false); }}
              >
                <Settings className="w-3.5 h-3.5 text-amber-300" /> Settings
              </button>

              <div className="h-[1px] bg-[#1e293b] my-2"></div>

              {!currentUser ? (
                <button 
                  className="w-full text-left px-4 py-2 text-[11px] font-semibold text-[#58a6ff] hover:bg-[#151f30] transition-colors"
                  onClick={() => { showPage("auth"); setDropdownOpen(false); }}
                >
                  🔐 Log In / Auth
                </button>
              ) : (
                <div className="px-4 py-1.5 flex flex-col gap-1.5">
                  <span className="text-[10px] text-[#8b949e] truncate leading-tight">Logged: {currentUser.name}</span>
                  <button 
                    className="text-left text-[11px] text-red-00 hover:text-red-350 font-semibold"
                    onClick={() => { handleLogout(); setDropdownOpen(false); }}
                  >
                    Logout 👤
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigate ▾ dropdown serves as primary active navigator on all devices */}
      </nav>

      {/* Pages Container */}
      <main className="transition-all duration-300">
        
        {/* =============== LANDING PAGE =============== */}
        {activePage === "landing" && (
          <div className="page active" id="page-landing">
            <div className="hero">
              <div className="hero-glow"></div>
              <div className="hero-glow2"></div>
              <div className="hero-eyebrow">
                <span className="pulse-dot"></span>
                India's Cleanest Nursing Mock
              </div>
              <h1 id="landing-hero-heading">
                Stop Cramming.<br />
                Start <span className="grad">Understanding.</span>
              </h1>
              <p className="hero-sub" id="landing-hero-body">
                Subject-wise MCQs from real exams — AIIMS, RRB, ESIC, DSSSB, RPSC — with instant rationale, AI tutor, and zero distractions.
              </p>
              <div className="hero-ctas">
                <button className="btn-hero-primary" onClick={() => showPage("hub")} id="btn-start-practicing">
                  Start Practising Free →
                </button>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-val" id="ls-q">150+</div>
                  <div className="hero-stat-lbl">Questions</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-val">6</div>
                  <div className="hero-stat-lbl">Tests Ready</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-val">8+</div>
                  <div className="hero-stat-lbl">Subjects</div>
                </div>
              </div>
            </div>

            {/* USP GRID */}
            <div className="usp-section" id="usp-section">
              <div className="section-eyebrow">Why Nursing Mock</div>
              <h2 className="section-title">Built different.<br />On purpose.</h2>
              <p className="section-sub">Every other platform throws 10,000 ads and pop-ups at you. We just give you the best MCQs.</p>
              
              <div className="usp-grid">
                <div className="usp-card">
                  <div className="usp-icon">🎯</div>
                  <div className="usp-title">Clean, distraction-free UI</div>
                  <div className="usp-text">No banners, no upsells mid-session, no notification spam. Just you and the question. Your focus is the product.</div>
                  <span className="usp-tag">Core USP</span>
                </div>
                <div className="usp-card">
                  <div className="usp-icon">🧠</div>
                  <div className="usp-title">AI Tutor on every question</div>
                  <div className="usp-text">Hit "Deep Dive" on any MCQ for a crisp, structured AI explanation. No 20-tab Googling. Understand it once, remember it forever.</div>
                  <span className="usp-tag">AI-Powered</span>
                </div>
                <div className="usp-card">
                  <div className="usp-icon">🔬</div><div className="usp-title">Practice & Exam modes</div>
                  <div className="usp-text">Practice mode: instant feedback after each answer. Exam mode: replicate real test conditions — reveal everything only at the end.</div>
                  <span className="usp-tag">Two Modes</span>
                </div>
                <div className="usp-card">
                  <div className="usp-icon">📊</div>
                  <div className="usp-title">Personal analytics dashboard</div>
                  <div className="usp-text">See your score trends, topic mastery percentages, and daily streak. Know exactly where you're weak before the real exam does.</div>
                  <span className="usp-tag">Analytics</span>
                </div>
                <div className="usp-card">
                  <div className="usp-icon">📋</div>
                  <div className="usp-title">Real PYQ bank</div>
                  <div className="usp-text">Filter previous year questions by exam (AIIMS, RRB, ESIC…), year, and subject. The exact questions that actually appeared.</div>
                  <span className="usp-tag">PYQ Bank</span>
                </div>
                <div className="usp-card">
                  <div className="usp-icon">📤</div>
                  <div className="usp-title">Share your scorecard</div>
                  <div className="usp-text">One tap to generate a beautiful scorecard image and share directly to WhatsApp. Challenge your batchmates.</div>
                  <span className="usp-tag">Social</span>
                </div>
              </div>
            </div>

            {/* EXAM COVERAGE BANDS */}
            <div className="exam-section">
              <div className="section-eyebrow">Coverage</div>
              <h2 className="section-title">Every major exam.<br />One platform.</h2>
              <div className="exam-bands mt-6">
                <span className="exam-band">AIIMS Nursing Officer</span>
                <span className="exam-band">RRB Staff Nurse</span>
                <span className="exam-band">ESIC Staff Nurse</span>
                <span className="exam-band">DSSSB Staff Nurse</span>
                <span className="exam-band">RPSC Staff Nurse</span>
                <span className="exam-band">JIPMER</span>
                <span className="exam-band">BHU Nursing Officer</span>
                <span className="exam-band">RUHS Nursing Entrance</span>
                <span className="exam-band">BSF Staff Nurse</span>
                <span className="exam-band">IGNOU Post B.Sc Nursing</span>
                <span className="exam-band">State PSC Nursing</span>
                <span className="exam-band">CHO Recruitment</span>
              </div>
            </div>

            {/* CTA BANNER */}
            <div className="cta-banner">
              <h2>Ready to ace your exam?</h2>
              <p>Join thousands of nursing students preparing smarter, not harder.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button className="btn-hero-primary" onClick={() => showPage("hub")}>
                  Browse Tests →
                </button>
              </div>
            </div>

            <footer>
              Nursing Mock · Built for India's Nursing Students ·{" "}
              <a onClick={() => showPage("hub")}>Tests</a> ·{" "}
              <a onClick={() => showPage("pyq")}>PYQ</a> ·{" "}
              <a onClick={() => showPage("analytics")}>Analytics</a> · For educational use only
            </footer>
          </div>
        )}

        {/* =============== HUB (TESTS) PAGE =============== */}
        {activePage === "hub" && (
          <div className="page active" id="page-hub">
            <div className="hub-header">
              <div className="hub-header-top flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2>Test Library</h2>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="hub-search flex-1 sm:flex-initial">
                    <Search className="w-4 h-4 text-neutral-400" />
                    <input 
                      type="text" 
                      placeholder="Search tests..." 
                      id="hub-search-input" 
                      value={hubSearchText}
                      onChange={(e) => setHubSearchText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="hub-filters">
                <button 
                  className={`filter-btn ${searchQuery === "all" ? "active" : ""}`} 
                  onClick={() => setSearchQuery("all")}
                >
                  All Subjects
                </button>
                <button 
                  className={`filter-btn ${searchQuery === "anatomy" ? "active" : ""}`} 
                  onClick={() => setSearchQuery("anatomy")}
                >
                  Anatomy & Physiology
                </button>
                <button 
                  className={`filter-btn ${searchQuery === "med-surg" ? "active" : ""}`} 
                  onClick={() => setSearchQuery("med-surg")}
                >
                  Medical-Surgical
                </button>
                <button 
                  className={`filter-btn ${searchQuery === "community" ? "active" : ""}`} 
                  onClick={() => setSearchQuery("community")}
                >
                  Community Health
                </button>
                <button 
                  className={`filter-btn ${searchQuery === "ready" ? "active" : ""}`} 
                  onClick={() => setSearchQuery("ready")}
                >
                  ✅ Ready Now
                </button>
              </div>
            </div>

            {/* Quicknav horizontal bar */}
            <div className="subject-quicknav" id="subject-quicknav">
              {subjects.map(subj => {
                const readyTests = subj.tests.filter(t => t.ready).length;
                return (
                  <button 
                    key={subj.id}
                    className={`sqn-btn ${readyTests > 0 ? "has-ready" : ""}`}
                    onClick={() => {
                      const el = document.getElementById(`sec-${subj.id}`);
                      if (el) {
                        const offset = 180;
                        const top = el.getBoundingClientRect().top + window.scrollY - offset;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    }}
                  >
                    <span className="sqn-icon">{subj.icon}</span>
                    {subj.name}
                    {readyTests > 0 && (
                      <span className="text-xs opacity-75 ml-1">({readyTests})</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* List of categories */}
            <div className="subjects-wrap" id="hub-subjects">
              {subjects.filter(subj => {
                if (searchQuery === "all" || searchQuery === "ready") return true;
                return subj.id === searchQuery;
              }).map(subj => {
                const liveTests = subj.tests.filter(t => t.ready);
                if (searchQuery === "ready" && liveTests.length === 0) return null;

                const filteredTests = liveTests.length > 0 ? subj.tests : subj.tests;

                return (
                  <div key={subj.id} className="subject-section" id={`sec-${subj.id}`}>
                    <div className="subject-header">
                      <div className="subject-icon-wrap">{subj.icon}</div>
                      <span className="subject-name">{subj.name}</span>
                      {liveTests.length > 0 ? (
                        <span className="subject-pill pill-ready">{liveTests.length} ready</span>
                      ) : (
                        <span className="subject-pill pill-soon">Coming soon</span>
                      )}
                      <div className="subject-line"></div>
                    </div>

                    <div className="test-grid">
                      {filteredTests.filter(t => {
                        if (!hubSearchText) return true;
                        return t.title.toLowerCase().includes(hubSearchText.toLowerCase()) || 
                               t.desc.toLowerCase().includes(hubSearchText.toLowerCase());
                      }).map(t => (
                        <div 
                          key={t.id} 
                          className={`test-card ${t.ready ? "" : "coming"}`}
                          onClick={() => t.ready && triggerTestInit(subj.id, t.id)}
                        >
                          {t.ready && (
                            <>
                              <div className="pulse-ring"></div>
                              <div className="pulse-ring2"></div>
                            </>
                          )}
                          <div className="card-top">
                            <div className="card-icon">{t.icon}</div>
                            <span className={`card-badge ${t.ready ? (t.id.includes("cell") || t.id.includes("nervous") ? "badge-new" : "badge-ready") : "badge-soon"}`}>
                              {t.ready ? (t.id.includes("cell") || t.id.includes("nervous") ? "New" : "Ready") : "Soon"}
                            </span>
                          </div>
                          <div className="card-title">{t.title}</div>
                          <div className="card-desc">{t.desc}</div>
                          <div className="card-meta">
                            {t.ready ? (
                              <>
                                <span className="meta-item"><span className="meta-dot"></span>{t.questions} Questions</span>
                                <span className="meta-item"><span className="meta-dot"></span>{t.mins} min</span>
                              </>
                            ) : (
                              <span className="meta-item">Coming soon</span>
                            )}
                          </div>
                          <button 
                            className="card-btn" 
                            disabled={!t.ready}
                            onClick={(e) => {
                              if (!t.ready) return;
                              e.stopPropagation();
                              triggerTestInit(subj.id, t.id);
                            }}
                          >
                            {t.ready ? 'Start Test →' : 'Not Available'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
           
            <footer>Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== FULL-LENGTH MOCK TESTS PAGE =============== */}
        {activePage === "mock_tests" && (
          <div className="page active" id="page-mock-tests">
            <div className="hub-header bg-gradient-to-r from-red-950/20 to-amber-950/20 border border-amber-900/20 rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="hub-header-top flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-500 animate-pulse" /> Full Length Exam Pack
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-syne tracking-tight">Full Mock Test Series</h2>
                  <p className="text-[#8492a6] font-sans text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                    Simulate real competitive nurse officer assessments with **50 high-yield questions** per test, a **50-minute timer**, and instant professor-level AI rationale.
                  </p>
                </div>
                <button 
                  className="bg-[#21262d] hover:bg-[#30363d] border border-amber-500/30 text-amber-450 hover:text-amber-380 text-xs font-bold py-2 px-4 rounded-xl shadow transition-all shrink-0"
                  onClick={() => {
                    const saved = localStorage.getItem("np_subjects_custom_v1");
                    if (saved) {
                      localStorage.removeItem("np_subjects_custom_v1");
                      triggerToast("Mock Test progress reset to factory default! 🛠️", "ok");
                      window.location.reload();
                    } else {
                      triggerToast("Already displaying clean templates! 🩺", "ok");
                    }
                  }}
                >
                  Reset Series
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="mock-test-cards-wrap">
              {subjects.find(s => s.id === "mock_tests")?.tests.map(t => {
                return (
                  <div 
                    key={t.id} 
                    className="bg-[#0f1520] hover:bg-[#151f30] border border-[#1e293b] hover:border-amber-500/40 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group relative cursor-pointer shadow-lg"
                    onClick={() => triggerTestInit("mock_tests", t.id)}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/2 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/5 transition-all"></div>
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                          🏆
                        </div>
                        <span className="bg-amber-500/10 text-amber-300 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-amber-500/20">
                          {t.questions} MCQs / {t.mins} Min
                        </span>
                      </div>
                      <h3 className="text-md font-bold text-white mb-2 leading-tight group-hover:text-amber-300 transition-colors">
                        {t.title}
                      </h3>
                      <p className="text-xs text-[#8492a6] font-sans leading-relaxed mb-4">
                        Comprehensive compilation covering high-yield Medical-Surgical, ObGyn, Pediatric, Psychiatric, and Pharmacological clinical domains.
                      </p>
                    </div>

                    <div className="border-t border-[#1e293b] pt-4 mt-2 flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#8b949e]">STATUS</span>
                        <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span> Live & Ready
                        </span>
                      </div>
                      <button 
                        className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs px-4 py-2 rounded-xl transition-all shadow-md group-hover:translate-x-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerTestInit("mock_tests", t.id);
                        }}
                      >
                        Enter Assessment →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">👩‍🏫</div>
                <div>
                  <h4 className="text-sm font-bold text-white">Need to practice specific subjects instead?</h4>
                  <p className="text-xs text-[#8b949e]">Access unit-wise checkpoints in our modular Test Library.</p>
                </div>
              </div>
              <button 
                className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                onClick={() => showPage("hub")}
              >
                Go to Test Library
              </button>
            </div>
            
            <footer className="mt-12 text-center text-xs text-[#8b949e] pb-6">Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== INTERACTIVE AI CHAT PAGE =============== */}
        {activePage === "chat" && (
          <div className="page active" id="page-chat">
            <div className="hub-header bg-gradient-to-r from-blue-950/20 to-indigo-950/20 border border-blue-900/20 rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
              <div>
                <span className="bg-blue-500/15 text-blue-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-blue-500/20 mb-2 inline-flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-blue-400" /> 24/7 Academic Support
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-syne tracking-tight">Open AI Discuss</h2>
                <p className="text-[#8492a6] font-sans text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Deep dive into any medical, clinical, or nursing pharmacology topic. Get crisp, graduate-level explanations with high-yield recall mnemonics instantly.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              {/* Quick Prompt Starters */}
              <div className="lg:col-span-1 flex flex-col gap-3">
                <span className="text-xs font-bold text-[#8b949e] uppercase tracking-wider px-1">Quick Starters 💡</span>
                <button 
                  className="w-full text-left bg-[#0f1520] hover:bg-[#151f30] border border-[#1e293b] p-3 rounded-xl transition-all text-xs font-semibold text-[#e6edf3] hover:border-blue-500/30 flex flex-col gap-1 shadow"
                  onClick={() => handleSendChatMessage("Explain Glasgow Coma Scale (GCS) scoring criteria and clinical action thresholds")}
                >
                  <span className="text-blue-400">🧠 Glasgow Coma Scale</span>
                  <span className="text-[10px] text-[#8b949e] font-normal font-sans">Learn component scores and the airway safeguard rule.</span>
                </button>
                <button 
                  className="w-full text-left bg-[#0f1520] hover:bg-[#151f30] border border-[#1e293b] p-3 rounded-xl transition-all text-xs font-semibold text-[#e6edf3] hover:border-blue-500/30 flex flex-col gap-1 shadow"
                  onClick={() => handleSendChatMessage("Unpack Heparin vs Warfarin monitoring and their respective clinical antidotes")}
                >
                  <span className="text-green-400">💉 Heparin vs Warfarin</span>
                  <span className="text-[10px] text-[#8b949e] font-normal font-sans">Contrast aPTT vs PT/INR therapeutic indices.</span>
                </button>
                <button 
                  className="w-full text-left bg-[#0f1520] hover:bg-[#151f30] border border-[#1e293b] p-3 rounded-xl transition-all text-xs font-semibold text-[#e6edf3] hover:border-blue-500/30 flex flex-col gap-1 shadow"
                  onClick={() => handleSendChatMessage("Explain ECG changes in Hyperkalemia and clinical administration of Calcium Gluconate")}
                >
                  <span className="text-red-400">🫀 Hyperkalemia & ECG</span>
                  <span className="text-[10px] text-[#8b949e] font-normal font-sans">Analyze peaked T-waves, QRS widening, and pharmacology.</span>
                </button>
                <button 
                  className="w-full text-left bg-[#0f1520] hover:bg-[#151f30] border border-[#1e293b] p-3 rounded-xl transition-all text-xs font-semibold text-[#e6edf3] hover:border-blue-500/30 flex flex-col gap-1 shadow"
                  onClick={() => handleSendChatMessage("What are the classic symptoms of Digoxin toxicity and how does hypokalemia affect it?")}
                >
                  <span className="text-amber-400">💊 Digoxin Toxicity</span>
                  <span className="text-[10px] text-[#8b949e] font-normal font-sans">Understand visual changes, anorexia, and potassium binds.</span>
                </button>
              </div>

              {/* Chat Area */}
              <div className="lg:col-span-3 bg-[#0f1520] border border-[#1e293b] rounded-2xl flex flex-col h-[520px] shadow-xl overflow-hidden relative">
                {/* Chat Message List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs sm:text-sm">
                  {chatHistory.map((chat, idx) => (
                    <div 
                      key={idx} 
                      className={`flex gap-3 max-w-[85%] ${chat.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold ${chat.role === "user" ? "bg-blue-600 text-white text-xs" : "bg-[#151f30] text-blue-400 text-xs"}`}>
                        {chat.role === "user" ? "👤" : "👩‍🏫"}
                      </div>
                      <div className={`rounded-xl p-3.5 shadow border ${chat.role === "user" ? "bg-blue-950/40 border-blue-900/50 text-[#e6edf3]" : "bg-[#161b22] border-[#21262d] text-[#c9d1d9]"}`}>
                        {chat.role === "model" ? (
                          <div className="chat-ai-response text-white prose prose-invert prose-xs max-w-none">
                            {renderFormattedAiResponse(chat.text)}
                          </div>
                        ) : (
                          <p className="font-medium whitespace-pre-wrap">{chat.text}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex gap-3 max-w-[80%] mr-auto items-center animate-pulse">
                      <div className="w-7 h-7 rounded-lg bg-[#151f30] text-blue-400 flex items-center justify-center font-bold text-xs">
                        👩‍🏫
                      </div>
                      <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-3 text-xs text-[#8b949e]">
                        The Nursing Professor is typing precise clinical insights... 🩺
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input Bar */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!chatLoading) handleSendChatMessage(chatInput);
                  }}
                  className="border-t border-[#1e293b] p-3 bg-[#080c12] flex gap-2 items-center"
                >
                  <input 
                    type="text" 
                    placeholder="Ask standard topics (e.g. 'lithium toxicity', 'apgar score', 'tetralogy of fallot')..." 
                    className="flex-1 bg-[#151f30] border border-[#1e293b] rounded-xl px-4 py-3.5 text-xs sm:text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-blue-500 transition-colors"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={chatLoading}
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow transition-all shrink-0 active:scale-95 disabled:opacity-50"
                    disabled={chatLoading || !chatInput.trim()}
                  >
                    Discuss →
                  </button>
                </form>
              </div>
            </div>

            <footer className="mt-12 text-center text-xs text-[#8b949e] pb-6">Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== TEST / EXAM PAGE =============== */}
        {activePage === "test" && activeTest && (
          <div className="page active" id="page-test">
            
            {/* Topbar inside test */}
            <div className="test-topbar">
              <button className="back-btn" onClick={goHub}>
                ← Back
              </button>
              <span className="topbar-sep">|</span>
              <span className="topbar-title">{activeTest.title}</span>
              
              <div className="flex-1" />

              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border mr-2 hidden sm:inline-block ${examMode ? "bg-red-950/20 text-red-400 border-red-900/40" : "bg-purple-950/20 text-purple-400 border-purple-900/40"}`}>
                {examMode ? "⏱️ CBT Exam" : "💡 Practice"}
              </span>

              <div className={`timer-pill ${timeLeft <= 120 ? "warn" : ""}`}>
                <span className="t-dot"></span>
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Statistics Bar at test progression */}
            {!isTestFinished && (
              <>
                <div className="stats-bar">
                  <div className="stat">
                    <div className="stat-val">{activeTest.data.length}</div>
                    <div className="stat-lbl">Questions</div>
                  </div>
                  <div className="stat">
                    <div className="stat-val">
                      {selectedOptions.filter(o => o !== null).length}
                    </div>
                    <div className="stat-lbl">Answered</div>
                  </div>
                  <div className="stat">
                    <div className="stat-val">
                      {examMode ? "—" : correctCount}
                    </div>
                    <div className="stat-lbl">Correct</div>
                  </div>
                  <div className="stat">
                    <div className="stat-val">
                      {examMode ? "—" : (
                        selectedOptions.filter(o => o !== null).length > 0 
                          ? `${Math.round((correctCount / selectedOptions.filter(o => o !== null).length) * 100)}%` 
                          : "0%"
                      )}
                    </div>
                    <div className="stat-lbl">Score</div>
                  </div>
                </div>

                {/* Progress bar state */}
                <div className="progress-wrap">
                  <div className="prog-info">
                    <span>Q {currentQuestionIndex + 1}</span>
                    <span>
                      {Math.round((selectedOptions.filter(o => o !== null).length / activeTest.data.length) * 100)}%
                    </span>
                  </div>
                  <div className="prog-bar">
                    <div 
                      className="prog-fill" 
                      style={{ 
                        width: `${Math.round((selectedOptions.filter(o => o !== null).length / activeTest.data.length) * 100)}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question dots visual navigation helper */}
                <div className="dot-nav">
                  {activeTest.data.map((_, i) => {
                    let dClass = "dot";
                    if (currentQuestionIndex === i) {
                      dClass += " cur";
                    } else if (selectedOptions[i] !== null) {
                      if (examMode) {
                        dClass += " done-e";
                      } else {
                        dClass += questionAnswers[i] === 1 ? " done-c" : " done-w";
                      }
                    }
                    return (
                      <button 
                        key={i} 
                        className={dClass}
                        onClick={() => setCurrentQuestionIndex(i)}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Test quiz screen */}
                <div id="quiz-wrap" className="mt-4 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestionIndex}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="q-card active"
                    >
                      <div className="q-meta">
                        <span className="q-num">Q {currentQuestionIndex + 1} / {activeTest.data.length}</span>
                        <span className="q-src">{activeTest.data[currentQuestionIndex].source}</span>
                      </div>

                      <p className="q-text">
                        {activeTest.data[currentQuestionIndex].q}
                      </p>

                      <div className="opts">
                        {activeTest.data[currentQuestionIndex].opts.map((option, idx) => {
                          let optClass = "opt";
                          const isSelected = selectedOptions[currentQuestionIndex] === idx;
                          const isAnswered = questionAnswers[currentQuestionIndex] !== null;

                          if (!examMode) {
                            if (isAnswered) {
                              optClass += " locked";
                              if (idx === activeTest.data[currentQuestionIndex].ans) {
                                optClass += " correct";
                              } else if (isSelected) {
                                optClass += " wrong";
                              }
                            } else if (isSelected) {
                              optClass += " sel";
                            }
                          } else {
                            if (isSelected) {
                              optClass += " exam-sel";
                            }
                          }

                          const L = ["A", "B", "C", "D"];

                          return (
                            <button 
                              key={idx} 
                              className={optClass}
                              onClick={() => handleOptionSelect(idx)}
                            >
                              <span className="opt-letter">{L[idx]}</span>
                              <span>{option}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback wrapper in practice mode */}
                      {!examMode && questionAnswers[currentQuestionIndex] !== null && (
                        <div className="mt-4 animate-fade-in">
                          <div className={`fb show ${questionAnswers[currentQuestionIndex] === 1 ? "fb-ok" : "fb-no"}`}>
                            {questionAnswers[currentQuestionIndex] === 1 ? "✅ Correct! " : `❌ Wrong. Correct Answer: ${activeTest.data[currentQuestionIndex].opts[activeTest.data[currentQuestionIndex].ans]}. `}
                            <span style={{ whiteSpace: "pre-line" }}>{getDetailedExplain(activeTest.data[currentQuestionIndex])}</span>
                          </div>

                          {/* AI Tutor integrated button */}
                          <button 
                            className="ai-tutor-btn" 
                            onClick={() => openAiTutor(currentQuestionIndex)}
                          >
                            <Activity className="w-4 h-4" /> 🤖 AI Deep Dive — Explain this topic in detail
                          </button>
                        </div>
                      )}

                      {/* Navigation control footer */}
                      <div className="nav-row">
                        <button 
                          className="btn-prev" 
                          disabled={currentQuestionIndex === 0}
                          onClick={handlePrevQuestion}
                        >
                          ← Prev
                        </button>
                        <button 
                          className="btn-next"
                          onClick={handleNextQuestion}
                        >
                          {currentQuestionIndex === activeTest.data.length - 1 ? "Finish ✓" : "Next →"}
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* =============== RESULTS WRAPPER INTERFACE =============== */}
            {isTestFinished && (
              <div id="result-wrap" style={{ display: "block" }}>
                <div className="result-card">
                  <div className="result-emoji">
                    {displayPercentage >= 90 ? "🏆" : 
                     displayPercentage >= 75 ? "🎉" :
                     displayPercentage >= 55 ? "👍" : "😐"}
                  </div>

                  <div className="result-pct">
                    {displayPercentage}%
                  </div>

                  <div className="result-label" id="final-results-metrics">
                    {examMode ? (
                      <span>
                        Net Score: <strong className="text-amber-400">{netMarks.toFixed(2)}</strong> out of <strong>{totalQuestions}</strong>
                      </span>
                    ) : (
                      <span>
                        {correctCount} of {totalQuestions} correct
                      </span>
                    )}
                    {" · "}{examMode ? "CBT Exam Mode" : "Practice Mode"}
                  </div>

                  <div className="result-msg">
                    {displayPercentage >= 90 ? "Outstanding!" :
                     displayPercentage >= 75 ? "Great Job!" :
                     displayPercentage >= 55 ? "Good Effort!" : "Keep Practising!"}
                  </div>

                  <div className="result-sub">
                    {examMode ? (
                      <span className="text-xs text-[#8492a6]">
                        CBT Evaluation Formula: {correctCount} correct (+1.0) and {wrongCount} errors (-0.25 penalty). Unattempted: {skippedCount}.
                      </span>
                    ) : (
                      <span>
                        {correctCount / totalQuestions >= 0.75 ? `You have an exam-ready grasp of ${activeTest.title}.` : "Review the correct rationales below and try again."}
                      </span>
                    )}
                  </div>

                  <div className="score-grid">
                    <div className="score-box">
                      <div className="score-box-val sc">+{correctCount}</div>
                      <div className="score-box-lbl">Correct (+1)</div>
                    </div>
                    <div className="score-box">
                      <div className="score-box-val sw">
                        {examMode ? `-${negativePenalty.toFixed(2)}` : `-${wrongCount}`}
                      </div>
                      <div className="score-box-lbl">{examMode ? "Penalty (-0.25)" : "Wrong"}</div>
                    </div>
                    <div className="score-box">
                      <div className="score-box-val ss">{skippedCount}</div>
                      <div className="score-box-lbl font-sans">Skipped</div>
                    </div>
                    <div className="score-box">
                      <div className="score-box-val sp">
                        {examMode ? netMarks.toFixed(2) : `${displayPercentage}%`}
                      </div>
                      <div className="score-box-lbl font-sans">{examMode ? "Net Marks" : "Score %"}</div>
                    </div>
                  </div>

                  <div className="result-actions">
                    <button 
                      className="btn-retry" 
                      onClick={() => triggerTestInit(activeSubjectId!, activeTest.id)}
                    >
                      🔄 Retry Test
                    </button>
                    <button className="btn-back-hub" onClick={goHub}>
                      ← Back
                    </button>
                    <button 
                      className="btn-share-wp"
                      onClick={() => shareToWhatsApp(
                        displayPercentage, 
                        correctCount, 
                        totalQuestions, 
                        activeTest.title
                      )}
                    >
                      <Share2 className="w-4 h-4" /> Share Score to WhatsApp
                    </button>
                  </div>

                  {/* Fully fleshed-out Exam Mode full review table */}
                  {examMode && (
                    <div className="mt-8 text-left border-t border-[#1e2d45] pt-6">
                      <div className="review-header">
                        Full Exam Practice Review — All {activeTest.data.length} Questions
                      </div>
                      
                      {activeTest.data.map((q, idx) => {
                        const selIdx = selectedOptions[idx];
                        const L = ["A", "B", "C", "D"];

                        return (
                          <div key={idx} className="review-q animate-fade-in">
                            <div className="rq-top">
                              <span className="rq-num">Q{idx + 1}</span>
                              <span className="rq-text">{q.q}</span>
                            </div>

                            <div className="rq-opts">
                              {q.opts.map((opt, oIdx) => {
                                let rqClass = "rq-opt";
                                if (oIdx === selIdx && oIdx === q.ans) {
                                  rqClass += " ro-correct";
                                } else if (oIdx === selIdx && oIdx !== q.ans) {
                                  rqClass += " ro-wrong";
                                } else if (oIdx === q.ans) {
                                  rqClass += " ro-show";
                                }

                                return (
                                  <div key={oIdx} className={rqClass}>
                                    <span className="r-letter">{L[oIdx]}</span>
                                    <span>{opt}</span>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="rq-rationale font-sans flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex-1 text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                                💡 {getDetailedExplain(q)}
                                <span className="rq-src block mt-2 text-xs opacity-75 font-semibold" style={{ whiteSpace: "normal" }}>📌 Source: {q.source}</span>
                              </div>
                              <button
                                className="mt-2 sm:mt-0 self-start sm:self-center bg-[#a181ff]/10 hover:bg-[#a181ff]/20 border border-[#a181ff]/30 text-[#d4c0ff] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs cursor-pointer shadow-sm active:scale-95"
                                onClick={() => openAiTutor(idx)}
                              >
                                <Activity className="w-3.5 h-3.5 text-[#a181ff]" /> AI Deep Dive 🤖
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>
            )}

            <footer>Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== PYQ BANK PAGE =============== */}
        {activePage === "pyq" && (
          <div className="page active" id="page-pyq">
            <div className="pyq-header">
              <h2>📋 Previous Year Questions</h2>
              <p>Filter by exam and year to practise real questions that appeared in past nursing competitive exams.</p>
              
              <div className="pyq-filters">
                {["all", "aiims", "rrb", "esic", "dsssb", "rpsc"].map(filterVal => (
                  <button 
                    key={filterVal}
                    className={`pyq-filter ${pyqFilter === filterVal ? "active" : ""}`}
                    onClick={() => setPyqFilter(filterVal)}
                  >
                    {filterVal === "all" ? "All Exams" : filterVal.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="pyq-grid" id="pyq-grid">
              {PYQ_DATA.filter(p => pyqFilter === "all" || p.tag === pyqFilter).map((p, idx) => (
                <div key={idx} className="pyq-card animate-fade-up">
                  <span className="pyq-year">{p.year}</span>
                  <div className="pyq-exam">{p.exam}</div>
                  <div className="pyq-count mb-3 text-sm text-[#8b949e]">
                    {p.count} questions extracted from paper
                  </div>
                  <button 
                    className="pyq-btn w-full"
                    onClick={() => triggerToast(`The ${p.year} ${p.exam} PYQ set is coming in next app update! 🔜`, "ok")}
                  >
                    Practice This Set →
                  </button>
                </div>
              ))}
            </div>

            <footer>Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== NURSING UPDATES PAGE =============== */}
        {activePage === "updates" && (
          <div className="page active" id="page-updates">
            <div className="max-w-6xl mx-auto px-4 py-8 font-sans">
              
              {/* Header block with sync button */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[var(--border)] pb-6 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">CONNECTING TO LATEST RECRUITMENT FEEDS</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--text)] flex items-center gap-2">
                    ⚡ Daily Pulse
                  </h1>
                  <p className="text-[#8b949e] text-xs md:text-sm mt-1 leading-relaxed">
                    Academic textbook notes, exam changes, dynamic career vacancies, and strategic nursing wisdom.
                  </p>
                </div>

                <button 
                  onClick={fetchUpdates}
                  disabled={loadingUpdates}
                  className="flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:opacity-50 text-white text-xs font-black transition-all shadow-lg shadow-indigo-600/10 cursor-pointer self-start md:self-auto"
                >
                  {loadingUpdates ? (
                    <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-3.5 w-3.5" />
                  ) : (
                    <span className="text-sm">🔄</span>
                  )}
                  <span>Refresh News Feed</span>
                </button>
              </div>

              {/* Updates dynamic status warnings */}
              {updatesError && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 mb-6 text-xs text-amber-300 flex items-center gap-2">
                  <span>💡</span>
                  <span>{updatesError}</span>
                </div>
              )}

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 mb-8 bg-[var(--surface)] p-1.5 rounded-2xl border border-[var(--border)] max-w-lg shadow-sm">
                <button 
                  onClick={() => setActiveUpdateFilter("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${activeUpdateFilter === "all" ? "bg-indigo-600 text-white shadow-md" : "text-[#8b949e] hover:text-[var(--text)] hover:bg-white/5"}`}
                >
                  📰 All Pulse
                </button>
                <button 
                  onClick={() => setActiveUpdateFilter("jobs")}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${activeUpdateFilter === "jobs" ? "bg-indigo-600 text-white shadow-md" : "text-[#8b949e] hover:text-[var(--text)] hover:bg-white/5"}`}
                >
                  📋 Jobs
                </button>
                <button 
                  onClick={() => setActiveUpdateFilter("syllabus")}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${activeUpdateFilter === "syllabus" ? "bg-indigo-600 text-white shadow-md" : "text-[#8b949e] hover:text-[var(--text)] hover:bg-white/5"}`}
                >
                  📚 Syllabus
                </button>
                <button 
                  onClick={() => setActiveUpdateFilter("motivation")}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${activeUpdateFilter === "motivation" ? "bg-indigo-600 text-white shadow-md" : "text-[#8b949e] hover:text-[var(--text)] hover:bg-white/5"}`}
                >
                  ✨ Growth
                </button>
                <button 
                  onClick={() => setActiveUpdateFilter("notes")}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${activeUpdateFilter === "notes" ? "bg-indigo-600 text-white shadow-md" : "text-[#8b949e] hover:text-[var(--text)] hover:bg-white/5"}`}
                >
                  📖 Notes
                </button>
              </div>

              {/* Grid content / Loading screen */}
              {loadingUpdates && updates.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse bg-[var(--surface)] border border-[var(--border)] rounded-2xl h-80 flex flex-col justify-end p-6">
                      <div className="h-4 bg-white/10 rounded w-1/4 mb-3"></div>
                      <div className="h-6 bg-white/10 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-white/10 rounded w-full mb-4"></div>
                      <div className="h-8 bg-white/10 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {updates
                    .filter(u => activeUpdateFilter === "all" || u.category === activeUpdateFilter)
                    .map((item, index) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="group flex flex-col bg-[var(--card)] hover:bg-[var(--card2)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        {/* Image banner */}
                        <div className="h-44 overflow-hidden relative shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100 placeholder-img" 
                          />
                          <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-[9px] font-black uppercase text-white tracking-wider shadow-sm">
                            🏷️ {item.badge}
                          </div>
                          
                          {/* Categorized Visual Accent Bar */}
                          <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                            item.category === "jobs" ? "bg-cyan-500" :
                            item.category === "syllabus" ? "bg-amber-500" : "bg-purple-500"
                          }`} />
                        </div>

                        {/* Text description */}
                        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e] font-black uppercase mb-1.5">
                              <span>📅 {item.date}</span>
                              <span>•</span>
                              <span>{item.readTime}</span>
                            </div>
                            <h3 
                              onClick={() => setSelectedUpdate(item)}
                              className="text-sm md:text-base font-extrabold text-[var(--text)] hover:text-indigo-400 cursor-pointer line-clamp-2 transition-colors inline-block leading-snug"
                            >
                              {item.title}
                            </h3>
                            <p className="text-xs text-[#8b949e] line-clamp-2 mt-2 leading-relaxed">
                              {item.summary}
                            </p>
                          </div>

                          <button 
                            onClick={() => setSelectedUpdate(item)}
                            className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors bg-transparent border-none p-0 cursor-pointer self-start"
                          >
                            Read Full Details →
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}

              {/* No items fallback */}
              {!loadingUpdates && updates.filter(u => activeUpdateFilter === "all" || u.category === activeUpdateFilter).length === 0 && (
                <div className="text-center py-16 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
                  <div className="text-4xl mb-3">📰</div>
                  <h3 className="font-extrabold text-sm text-[var(--text)]">No updates found in this category</h3>
                  <p className="text-xs text-[#8b949e] mt-1">Please try refreshing the feed or selecting another filter tab.</p>
                </div>
              )}

            </div>

            {/* EXPANDED FULL DETAIL READING OVERLAY */}
            <AnimatePresence>
              {selectedUpdate && (() => {
                const renderFormattedUpdateContent = (content: string) => {
                  if (!content) return null;
                  const lines = content.split("\n");

                  const renderTextWithInlineStyles = (raw: string) => {
                    if (!raw) return "";
                    // Support bold segments split by ** or __
                    const parts = raw.split(/\*\*|__/);
                    return parts.map((part, i) => {
                      const isBold = i % 2 !== 0;
                      // Support italic segments split by * or _
                      const subParts = part.split(/\*|_/);
                      const formattedSubparts = subParts.map((sub, j) => {
                        const isItalic = j % 2 !== 0;
                        return isItalic ? (
                          <em key={j} className="text-amber-400 not-italic font-bold bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/15 font-mono text-[11px] inline-block mt-0.5">
                            {sub}
                          </em>
                        ) : sub;
                      });

                      return isBold ? (
                        <strong key={i} className="font-extrabold text-white text-[13px] md:text-sm tracking-tight">
                          {formattedSubparts}
                        </strong>
                      ) : (
                        <span key={i}>{formattedSubparts}</span>
                      );
                    });
                  };

                  return (
                    <div className="flex flex-col gap-3 font-sans text-xs md:text-sm text-[#ccd6f6] leading-relaxed">
                      {lines.map((line, idx) => {
                        const trimmed = line.trim();
                        if (!trimmed) {
                          return <div key={idx} className="h-2" />;
                        }

                        // Match warning blocks starting with emojis or custom labels
                        if (trimmed.startsWith("⚠️") || trimmed.startsWith("🔥") || trimmed.startsWith("*Pro Tip") || trimmed.startsWith("📍") || trimmed.startsWith("⚖️")) {
                          return (
                            <div 
                              key={idx} 
                              className="bg-amber-500/5 border border-amber-500/15 p-4 rounded-xl text-amber-200 text-xs md:text-[13px] my-3 leading-relaxed flex gap-3 items-start shadow-sm"
                            >
                              <span className="text-sm shrink-0">💡</span>
                              <div className="flex-1">{renderTextWithInlineStyles(trimmed.replace(/^(\*Pro Tip:?|⚠️|🔥|📍|⚖️)\s*/i, ""))}</div>
                            </div>
                          );
                        }

                        // Match styled header lines
                        const headingMatch = trimmed.match(/^(🩺|📋|🌟|🔬|🧠|⚡|📚|📂|📌|👉|🧭|📖|💪|✨|🚇)\s*(.*)/);
                        if (headingMatch) {
                          const emoji = headingMatch[1];
                          const text = headingMatch[2];
                          return (
                            <h4 
                              key={idx} 
                              className="text-xs md:text-[13px] font-extrabold text-indigo-300 mt-5 mb-1.5 border-l-2 border-indigo-500 pl-3 leading-tight uppercase tracking-wide flex items-center gap-2"
                            >
                              <span className="text-sm">{emoji}</span>
                              <span>{renderTextWithInlineStyles(text)}</span>
                            </h4>
                          );
                        }

                        // Match numbered lists
                        const numberedMatch = trimmed.match(/^(\d+)\.\s*(.*)/);
                        if (numberedMatch) {
                          const num = numberedMatch[1];
                          const text = numberedMatch[2];
                          return (
                            <div key={idx} className="flex gap-2.5 items-start pl-1 text-xs md:text-[13px] leading-relaxed my-1">
                              <span className="bg-indigo-950/80 text-indigo-400 text-[10px] font-extrabold px-1.5 py-0.5 rounded-md min-w-[20px] text-center shrink-0 border border-indigo-900/40">
                                {num}
                              </span>
                              <div className="flex-1 text-[#c4d1ec]">{renderTextWithInlineStyles(text)}</div>
                            </div>
                          );
                        }

                        // Match bullet lists
                        const bulletMatch = trimmed.match(/^(-\s+|\*\s+|•\s+)(.*)/);
                        if (bulletMatch) {
                          const text = bulletMatch[2];
                          return (
                            <div key={idx} className="flex gap-2.5 items-start pl-2 text-xs md:text-[13px] leading-relaxed my-1">
                              <span className="text-indigo-400 shrink-0 select-none text-[11px] mt-1">✦</span>
                              <div className="flex-1 text-[#c4d1ec]">{renderTextWithInlineStyles(text)}</div>
                            </div>
                          );
                        }

                        return (
                          <p key={idx} className="my-0.5 text-[#b4c6e4] text-xs md:text-[13px] leading-relaxed">
                            {renderTextWithInlineStyles(trimmed)}
                          </p>
                        );
                      })}
                    </div>
                  );
                };

                return (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 16 }}
                      transition={{ type: "spring", duration: 0.4 }}
                      className="bg-[#0b1220] border border-[#1e2d45] rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
                    >
                      
                      {/* Modal Banner */}
                      <div className="h-56 relative overflow-hidden shrink-0">
                        <img 
                          src={selectedUpdate.image} 
                          alt={selectedUpdate.title} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover brightness-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-black/30 to-transparent" />
                        
                        <button 
                          onClick={() => setSelectedUpdate(null)}
                          className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 p-2 rounded-full border border-white/10 text-white w-8 h-8 flex items-center justify-center font-bold text-xs transition-transform cursor-pointer hover:scale-105 active:scale-95 z-10"
                        >
                          ✕
                        </button>

                        <div className="absolute bottom-4 left-5">
                          <span className="bg-indigo-600 text-white border border-indigo-400/20 text-[9px] font-black uppercase px-2.5 py-1 rounded-lg tracking-widest shadow-md">
                            {selectedUpdate.badge}
                          </span>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-[#8b949e] font-bold uppercase">
                            <span>📅 {selectedUpdate.date}</span>
                            <span>•</span>
                            <span>{selectedUpdate.readTime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Modal Content Scroll viewport */}
                      <div className="p-6 md:p-8 overflow-y-auto flex-1 font-sans">
                        <h2 className="text-lg md:text-xl font-black text-white mb-4 leading-tight">
                          {selectedUpdate.title}
                        </h2>
                        
                        {/* Custom parsed body viewport */}
                        <div className="font-sans select-text">
                          {renderFormattedUpdateContent(selectedUpdate.content)}
                        </div>
                      </div>

                      {/* Modal Actions Footer */}
                      <div className="p-4 bg-[#080d17] border-t border-[#1e2d45] flex items-center justify-between gap-4 shrink-0">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(`Check out this High-Yield B.Sc Nursing Note: ${selectedUpdate.title} - ${selectedUpdate.summary}`);
                            triggerToast("Study link copied to clipboard! 📋", "ok");
                          }}
                          className="px-4 py-2 border border-[#1e2d45] hover:bg-white/5 rounded-xl text-xs font-bold text-[#8492a6] hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>🔗</span> Copy study link
                        </button>
                        <button 
                          onClick={() => setSelectedUpdate(null)}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-black text-white shadow-md active:scale-95 transition-all cursor-pointer"
                        >
                          Acknowledge & Close
                        </button>
                      </div>

                    </motion.div>
                  </div>
                );
              })()}
            </AnimatePresence>

            <footer>Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== PERSONAL ANALYTICS PAGE =============== */}
        {activePage === "analytics" && (
          <div className="page active" id="page-analytics">
            <div className="analytics-wrap">
              <h2>📊 Your Analytics</h2>
              <p className="analytics-sub">Track your progress, identify weak spots, and build your practice streak.</p>
              
              {/* Analytics Content Block */}
              {(!currentUser || currentUser.guest) ? (
                <div className="google-auth-lock-card max-w-sm mx-auto my-6 p-6 bg-[#0f1520] border border-[#1e293b] rounded-xl text-center shadow-xl animate-fade-in duration-300">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                    📊
                  </div>
                  <h3 className="text-base font-bold mb-2">Google Authentication Required</h3>
                  <p className="text-xs text-[#8b949e] mb-6 leading-relaxed">
                    To track daily scores, anatomical test attempts, accuracy metrics, and build your study streak, connect using Google Auto Authentication.
                  </p>

                  {/* Google Auto-Auth One Tap Panel (Like other premium web pages) */}
                  <div className="border border-[#1e293b] bg-[#0c1017] rounded-xl p-4 text-left relative overflow-hidden mb-6">
                    <div className="absolute top-2 right-2 text-[9px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Auto Auth</div>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow">
                        S
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-[#8b949e]">Sign in with Google</div>
                        <div className="text-xs font-semibold text-[#e6edf3] truncate">Sakil</div>
                        <div className="text-[10px] text-[#58a6ff] truncate">sakil.net.in@gmail.com</div>
                      </div>
                    </div>
                    <button 
                      className="mt-4 w-full bg-white text-gray-950 hover:bg-slate-100 text-xs font-bold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                      onClick={triggerGoogleAutoAuth}
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      Continue as Sakil
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8b949e]">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Instant secure connection with Google
                  </div>
                </div>
              ) : !analytics ? (
                <div className="text-center py-16 px-4">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="font-syne text-lg font-bold mb-2">No attempts logged yet</h3>
                  <p className="text-[#8b949e] mb-6 max-w-sm mx-auto text-sm">
                    Complete your first anatomical or neurological quiz to see custom analytics and streaks here!
                  </p>
                  <button className="btn-hero-primary py-2.5 px-6 text-sm" onClick={() => showPage("hub")}>
                    Start a Test Now →
                  </button>
                </div>
              ) : (
                <div id="analytics-content">
                  {/* Streak Bonfire counter */}
                  <div className="streak-box mb-6 bg-gradient-to-r from-[#1a1200] to-[#2a1f00]">
                    <div className="streak-fire"><Flame className="w-10 h-10 text-orange-500 fill-orange-500" /></div>
                    <div>
                      <div className="streak-val">{analytics.streak}</div>
                      <div className="streak-lbl text-gold font-syne font-bold text-[12px]">Day Streak</div>
                    </div>
                    <div className="ml-auto text-right text-xs text-[#8b949e] hidden sm:block">
                      Keep going! Study daily to<br />maintain your competitive edge.
                    </div>
                  </div>

                  {/* Summary Grid */}
                  <div className="analytics-grid">
                    <div className="an-card">
                      <div className="an-icon">📝</div>
                      <div className="an-val">{analytics.totalAttempts}</div>
                      <div className="an-label">Tests Attempted</div>
                    </div>
                    <div className="an-card">
                      <div className="an-icon">📊</div>
                      <div className="an-val">{analytics.avgScore}%</div>
                      <div className="an-label">Average Score</div>
                    </div>
                    <div className="an-card">
                      <div className="an-icon">🏆</div>
                      <div className="an-val">{analytics.bestScore}%</div>
                      <div className="an-label">Best Score</div>
                    </div>
                    <div className="an-card">
                      <div className="an-icon">✅</div>
                      <div className="an-val">{analytics.totalCorrect}</div>
                      <div className="an-label">Correct Answers</div>
                    </div>
                  </div>

                  {/* Performance Chart */}
                  <div className="chart-wrap">
                    <div className="chart-title">Recent Performance (last {analytics.recentScoreHistory.length} tests)</div>
                    <div className="bar-chart items-end pt-4 pb-2 border-b border-border flex justify-around">
                      {analytics.recentScoreHistory.map((h, i) => {
                        const colHeight = Math.max(8, Math.round(h.pct * 0.9));
                        return (
                          <div key={i} className="bar-col flex flex-col items-center flex-1 max-w-[50px]">
                            <div 
                              className="bar-fill w-full bg-gradient-to-t from-blue-500 to-accent rounded-t"
                              style={{ height: `${colHeight}px` }}
                            ></div>
                            <div className="bar-lbl text-[10px] mt-1 text-[#8b949e]">
                              {h.pct}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Topic Mastery Progress Rows */}
                  <div className="chart-wrap mt-6">
                    <div className="chart-title">Topic Mastery Levels</div>
                    <div className="topic-rows">
                      {Object.entries(analytics.topicAccuracyMap).map(([title, stats]) => {
                        const accPct = Math.round((stats.correct / stats.total) * 100);
                        return (
                          <div key={title} className="topic-row">
                            <div className="topic-row-top flex justify-between items-center text-xs">
                              <span className="topic-name font-semibold">{title}</span>
                              <span className="topic-pct text-accent font-bold">{accPct}% Accuracy</span>
                            </div>
                            <div className="topic-bar mt-1">
                              <div 
                                className="topic-bar-fill" 
                                style={{ width: `${accPct}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>

            <footer>Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== AUTHENTICATION SCREEN PAGE =============== */}
        {activePage === "auth" && (
          <div className="page active" id="page-auth">
            <div className="auth-wrap">
              <div className="auth-card font-sans">
                <div className="auth-logo">Nursing Mock</div>
                <div className="auth-tagline font-sans font-medium text-xs">India's cleanest nursing competitive exam platform</div>
                
                <div className="auth-tabs">
                  <button 
                    className={`auth-tab ${authTab === "login" ? "active" : ""}`}
                    onClick={() => {
                      setAuthTab("login");
                      setAuthError("");
                    }}
                  >
                    Log In
                  </button>
                  <button 
                    className={`auth-tab ${authTab === "register" ? "active" : ""}`}
                    onClick={() => {
                      setAuthTab("register");
                      setAuthError("");
                    }}
                  >
                    Register
                  </button>
                </div>

                {authError && (
                  <div className="auth-err show">
                    {authError}
                  </div>
                )}

                {/* Login Form view */}
                {authTab === "login" ? (
                  <div className="space-y-4">
                    <div className="flex justify-center gap-4 mb-4 border-b border-[#1e293b]/70 pb-3 text-xs">
                      <button 
                        type="button"
                        className={`pb-1 px-2 font-bold transition-all bg-transparent border-none cursor-pointer ${loginMethod === "otp" ? "text-amber-400 border-b-2 border-amber-400" : "text-[#8b949e] hover:text-[#e6edf3]"}`}
                        onClick={() => {
                          setLoginMethod("otp");
                          setAuthError("");
                        }}
                      >
                        ⚡ Phone OTP (Fast)
                      </button>
                      <button 
                        type="button"
                        className={`pb-1 px-2 font-bold transition-all bg-transparent border-none cursor-pointer ${loginMethod === "email" ? "text-blue-400 border-b-2 border-blue-400" : "text-[#8b949e] hover:text-[#e6edf3]"}`}
                        onClick={() => {
                          setLoginMethod("email");
                          setAuthError("");
                        }}
                      >
                        📧 Email & Password
                      </button>
                    </div>

                    {loginMethod === "otp" ? (
                      <form onSubmit={handleOtpLogin} className="space-y-4">
                        <div className="form-group text-left">
                          <label className="form-label text-[#8b949e] font-semibold text-xs mb-1 block">Phone Number</label>
                          <div className="flex gap-2">
                            <span className="flex items-center justify-center bg-[#0d1117] border border-[#1e2d45] rounded-xl px-3 text-xs text-[#8b949e] font-sans font-extrabold">+91</span>
                            <input 
                              className="form-input flex-1 bg-[#161b22] border border-[#30363d] rounded-xl px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none" 
                              type="tel" 
                              maxLength={10}
                              placeholder="9531659828"
                              value={authPhone}
                              onChange={(e) => setAuthPhone(e.target.value.replace(/\D/g, ""))}
                            />
                          </div>
                        </div>

                        {otpSent && (
                          <div className="form-group text-left animate-fade-in">
                            <div className="flex justify-between items-center mb-1">
                              <label className="form-label text-[#8b949e] font-semibold text-xs">Enter 6-Digit OTP</label>
                              <span className="text-[10px] text-green-400 font-extrabold">✓ Simulated Code Sent</span>
                            </div>
                            <input 
                              className="form-input bg-[#161b22] border border-[#30363d] rounded-xl px-3 py-2.5 text-sm text-center font-mono tracking-widest text-[#7ee8a2] font-black focus:border-green-400 focus:outline-none" 
                              type="text" 
                              maxLength={6}
                              placeholder="••••••"
                              value={authOtp}
                              onChange={(e) => setAuthOtp(e.target.value.replace(/\D/g, ""))}
                            />
                          </div>
                        )}

                        {!otpSent ? (
                          <button 
                            className="btn-auth w-full flex items-center justify-center gap-2 cursor-pointer py-2.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 transition-all border-none text-black animate-pulse" 
                            type="button" 
                            disabled={isSendingOtp}
                            onClick={requestOtpCode}
                          >
                            {isSendingOtp ? "Sending code..." : "Request Instant OTP ⚡"}
                          </button>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <button className="btn-auth w-full py-2.5 rounded-xl font-bold bg-[#7ee8a2] hover:bg-[#5cd484] transition-all border-none text-black cursor-pointer" type="submit">
                              Verify & Log In instantly 🔓
                            </button>
                            <button 
                              className="text-xs text-[#8b949e] hover:text-white transition-all underline bg-transparent border-none cursor-pointer mt-1" 
                              type="button"
                              onClick={requestOtpCode}
                            >
                              Resend Verification Code
                            </button>
                          </div>
                        )}
                      </form>
                    ) : (
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-group text-left">
                          <label className="form-label text-[#8b949e] font-semibold text-xs mb-1 block">Email Address</label>
                          <input 
                            className="form-input bg-[#161b22] border border-[#30363d] rounded-xl px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none w-full" 
                            type="email" 
                            placeholder="you@example.com"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                          />
                        </div>
                        <div className="form-group text-left">
                          <label className="form-label text-[#8b949e] font-semibold text-xs mb-1 block">Password</label>
                          <input 
                            className="form-input bg-[#161b22] border border-[#30363d] rounded-xl px-3 py-2 text-sm text-white focus:border-blue-400 focus:outline-none w-full" 
                            type="password" 
                            placeholder="••••••••"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                          />
                        </div>
                        <button className="btn-auth w-full py-2.5 rounded-xl font-bold bg-blue-500 hover:bg-blue-600 transition-all border-none text-white cursor-pointer" type="submit">
                          Log In securely 🛡️
                        </button>
                      </form>
                    )}
                  </div>
                ) : (
                  // Register Form view
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        className="form-input" 
                        type="text" 
                        placeholder="Sakil Ahmed"
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input 
                        className="form-input" 
                        type="email" 
                        placeholder="you@example.com"
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Password</label>
                      <input 
                        className="form-input" 
                        type="password" 
                        placeholder="Min. 6 characters"
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                      />
                    </div>
                    <button className="btn-auth" type="submit">
                      Create Student Account
                    </button>
                  </form>
                )}

                <div className="auth-divider">or</div>
                <button className="auth-guest" onClick={guestLogin}>
                  Continue as Guest Student →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =============== ADMIN ADMIN PANEL PAGE =============== */}
        {activePage === "admin" && currentUser && currentUser.isAdmin && (
          <div className="page active" id="page-admin">
            <div className="admin-wrap">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-syne tracking-tight text-white m-0">⚙️ Admin CMS Panel</h2>
                  <div className="admin-badge mt-1 inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-[#ff9f9f]" /> Active Administrator Program Control</div>
                </div>
                <div className="flex bg-[#0f1520] border border-[#1e293b] rounded-xl p-1 shrink-0">
                  <button 
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${adminTab === "tests" ? "bg-amber-500 text-black shadow" : "text-[#8b949e] hover:text-white"}`}
                    onClick={() => { setAdminTab("tests"); setAdminIsManagingQuestions(false); }}
                  >
                    📚 Test & MCQ CMS
                  </button>
                  <button 
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${adminTab === "users" ? "bg-amber-500 text-black shadow" : "text-[#8b949e] hover:text-white"}`}
                    onClick={() => { setAdminTab("users"); setAdminIsManagingQuestions(false); }}
                  >
                    👥 Student Accounts
                  </button>
                </div>
              </div>

              {/* Admin metrics cards */}
              <div className="admin-stats mb-8">
                <div className="an-card">
                  <div className="an-icon">📚</div>
                  <div className="an-val">{adminStats.totalQs}</div>
                  <div className="an-label">All Active Questions</div>
                </div>
                <div className="an-card">
                  <div className="an-icon">✅</div>
                  <div className="an-val">{adminStats.liveTests}</div>
                  <div className="an-label">Live Tests Available</div>
                </div>
                <div className="an-card">
                  <div className="an-icon">👤</div>
                  <div className="an-val">{adminStats.totalUsers}</div>
                  <div className="an-label">Registered Accounts</div>
                </div>
                <div className="an-card">
                  <div className="an-icon">📋</div>
                  <div className="an-val">{adminStats.totalTestsNum}</div>
                  <div className="an-label">Total Module Sets</div>
                </div>
              </div>

              {/* TAB 1: TESTS & QUESTIONS CMS */}
              {adminTab === "tests" && (
                <div className="space-y-6">
                  {/* Subject selector row */}
                  <div className="bg-[#0f1520] border border-[#1e293b] rounded-2xl p-4">
                    <span className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider block mb-2.5">Select Subject Curriculum To Edit</span>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map(subj => (
                        <button 
                          key={subj.id}
                          className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 ${adminActiveSubjId === subj.id ? "bg-amber-500/10 border-amber-500 text-amber-300" : "bg-[#161b22] border-[#21262d] text-[#8b949e] hover:border-[#30363d] hover:text-white"}`}
                          onClick={() => {
                            setAdminActiveSubjId(subj.id);
                            setAdminActiveTestId(null);
                            setAdminIsManagingQuestions(false);
                          }}
                        >
                          <span>{subj.icon}</span> {subj.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active context depends on whether adminIsManagingQuestions is open */}
                  {!adminIsManagingQuestions ? (
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
                      {/* Left: Interactive Quiz Module List */}
                      <div className="xl:col-span-2 space-y-4">
                        <div className="flex justify-between items-center px-1">
                          <h4 className="text-sm font-black text-white uppercase tracking-wider">
                            Active Quizzes under "{subjects.find(s => s.id === adminActiveSubjId)?.name}"
                          </h4>
                          <span className="text-xs text-[#8b949e] font-sans">
                            {subjects.find(s => s.id === adminActiveSubjId)?.tests.length} modules
                          </span>
                        </div>

                        {subjects.find(s => s.id === adminActiveSubjId)?.tests.length === 0 ? (
                          <div className="bg-[#0f1520] border border-dashed border-[#1e293b] rounded-2xl p-8 text-center text-xs text-[#8b949e]">
                            No quiz modules built yet. Construct one using the sidebar form! 📝
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {subjects.find(s => s.id === adminActiveSubjId)?.tests.map(t => {
                              return (
                                <div key={t.id} className="bg-[#0f1520] border border-[#1e293b] rounded-xl p-4 hover:border-[#30363d] transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg">📋</span>
                                      <span className="font-extrabold text-[#e6edf3] text-sm">{t.title}</span>
                                      <span className="text-[10px] text-[#8b949e] bg-[#21262d] border border-[#30363d] px-2 py-0.5 rounded-full font-mono uppercase">{t.id}</span>
                                    </div>
                                    <p className="text-xs text-[#8b949e] mt-1 max-w-md line-clamp-1">{t.desc}</p>
                                    <div className="flex gap-3 text-[10px] text-amber-300 font-sans mt-2">
                                      <span>📚 {t.questions} Practice MCQs</span>
                                      <span>⏱️ {t.mins} Minutes Time</span>
                                      <span className={t.ready ? "text-green-400 font-bold" : "text-amber-500"}>● {t.ready ? "ACTIVE/LIVE" : "DRAFT"}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                                    <button 
                                      className={`px-3 py-1.5 text-[11px] font-bold rounded-lg border transition-all ${t.ready ? "bg-green-950/40 border-green-900 text-green-400" : "bg-neutral-900 border-[#21262d] text-neutral-400"}`}
                                      onClick={() => toggleTestReady(adminActiveSubjId, t.id)}
                                    >
                                      {t.ready ? "Live" : "Draft"}
                                    </button>
                                    <button 
                                      className="px-3 py-1.5 text-[11px] font-bold rounded-lg bg-blue-950/20 hover:bg-blue-950/40 border border-blue-900/50 text-blue-300 transition-all flex items-center gap-1"
                                      onClick={() => {
                                        setAdminActiveTestId(t.id);
                                        setAdminIsManagingQuestions(true);
                                        setAdminEditingQIdx(-1);
                                        // clear inputs
                                        setAdminQText("");
                                        setAdminQOpt0("");
                                        setAdminQOpt1("");
                                        setAdminQOpt2("");
                                        setAdminQOpt3("");
                                        setAdminQAns(0);
                                        setAdminQSource("");
                                        setAdminQExplain("");
                                      }}
                                    >
                                      MCQs ({t.questions})
                                    </button>
                                    <button 
                                      className="p-1.5 rounded-lg bg-red-950/20 hover:bg-red-950/40 border border-red-900/50 text-red-400 transition-all"
                                      onClick={() => deleteTest(adminActiveSubjId, t.id)}
                                      title="Delete Quiz Set"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Right: Quick Builder to Create a New Quiz Module */}
                      <div className="bg-[#0f1520] border border-[#1e293b] rounded-2xl p-5 space-y-4">
                        <div className="border-b border-[#1e293b] pb-3">
                          <h4 className="text-sm font-black text-[#e6edf3] uppercase tracking-wider flex items-center gap-1.5">
                            <Plus className="w-4 h-4 text-amber-500" /> Create Quiz Set
                          </h4>
                          <p className="text-[11px] text-[#8b949e]">Deploy an empty mock questionnaire framework ready to receive custom exam items.</p>
                        </div>

                        <div className="space-y-3.5 text-xs font-sans">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold text-[#8b949e] uppercase">Unique Module Key ID (URL slug)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. mock-test-6" 
                              className="bg-[#151f30] border border-[#1e293b] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              value={adminNewTestId}
                              onChange={(e) => setAdminNewTestId(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold text-[#8b949e] uppercase">Interactive Title</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Master Mock Assessment — VI" 
                              className="bg-[#151f30] border border-[#1e293b] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              value={adminNewTestTitle}
                              onChange={(e) => setAdminNewTestTitle(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold text-[#8b949e] uppercase">Description / Syllabus Scope</label>
                            <textarea 
                              placeholder="e.g. High-yield compiled practice sets validating basic clinical procedures..." 
                              className="bg-[#151f30] border border-[#1e293b] rounded-lg p-2.5 text-xs text-white h-20 resize-none focus:outline-none focus:border-amber-500"
                              value={adminNewTestDesc}
                              onChange={(e) => setAdminNewTestDesc(e.target.value)}
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold text-[#8b949e] uppercase">Timelimit (Minutes)</label>
                            <input 
                              type="number" 
                              className="bg-[#151f30] border border-[#1e293b] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                              value={adminNewTestMins}
                              onChange={(e) => setAdminNewTestMins(Number(e.target.value))}
                            />
                          </div>

                          <button 
                            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs py-3 rounded-xl transition-all shadow-md uppercase tracking-wider mt-2"
                            onClick={() => handleAddTest(adminActiveSubjId)}
                          >
                            Spawn Quiz Module 🚀
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Question Bank Manager Context */
                    <div className="space-y-6">
                      <div className="bg-[#0f1520] border border-amber-500/20 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/2 rounded-full blur-2xl pointer-events-none"></div>
                        <div className="flex gap-3 items-center">
                          <button 
                            className="bg-[#161b22] hover:bg-[#21262d] border border-[#21262d] text-[#e6edf3] p-2 rounded-xl text-xs transition-all flex items-center gap-1.5"
                            onClick={() => { setAdminIsManagingQuestions(false); setAdminActiveTestId(null); }}
                          >
                            <Undo className="w-3.5 h-3.5" /> Back
                          </button>
                          <div>
                            <span className="text-[10px] text-amber-300 uppercase tracking-widest font-extrabold block">MCQ Database Manager</span>
                            <h3 className="text-md sm:text-lg font-black text-white font-syne mt-0.5">
                              {subjects.find(s => s.id === adminActiveSubjId)?.tests.find(t => t.id === adminActiveTestId)?.title}
                            </h3>
                          </div>
                        </div>
                        <span className="bg-amber-500/10 text-amber-300 font-mono text-xs px-3 py-1 rounded-full border border-amber-500/25">
                          {subjects.find(s => s.id === adminActiveSubjId)?.tests.find(t => t.id === adminActiveTestId)?.data.length || 0} Saved Items
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                        {/* Interactive Form to Add/Edit Questions - Left block */}
                        <div className="lg:col-span-5 bg-[#0f1520] border border-[#1e293b] rounded-2xl p-5 space-y-4">
                          <div className="border-b border-[#1e293b] pb-3">
                            <h4 className="text-sm font-black text-white uppercase tracking-wider">
                              {adminEditingQIdx >= 0 ? `✏️ Edit Clinical Question #${adminEditingQIdx + 1}` : "➕ Add Custom Clinical MCQ"}
                            </h4>
                            <p className="text-[11px] text-[#8b949e]">Populate competitive board-curated questions targeting graduate nursing levels.</p>
                          </div>

                          <div className="space-y-3.5 text-xs text-[#e6edf3]">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider">Clinical Case / MCQ Statement</label>
                              <textarea 
                                placeholder="A patient is scheduled for coronary artery bypass graft. The nurse identifies..." 
                                className="bg-[#151f30] border border-[#1e293b] rounded-lg p-2.5 text-xs text-white h-24 focus:outline-none focus:border-amber-500"
                                value={adminQText}
                                onChange={(e) => setAdminQText(e.target.value)}
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider block">Formulate Distractor Options (A to D)</label>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-[#1d212a] border border-[#2d313c] w-6 h-6 rounded-lg flex items-center justify-center shrink-0">A</span>
                                <input 
                                  type="text" 
                                  placeholder="Option A" 
                                  className="w-full bg-[#151f30] border border-[#1e293b] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                                  value={adminQOpt0}
                                  onChange={(e) => setAdminQOpt0(e.target.value)}
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-[#1d212a] border border-[#2d313c] w-6 h-6 rounded-lg flex items-center justify-center shrink-0">B</span>
                                <input 
                                  type="text" 
                                  placeholder="Option B" 
                                  className="w-full bg-[#151f30] border border-[#1e293b] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                                  value={adminQOpt1}
                                  onChange={(e) => setAdminQOpt1(e.target.value)}
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-[#1d212a] border border-[#2d313c] w-6 h-6 rounded-lg flex items-center justify-center shrink-0">C</span>
                                <input 
                                  type="text" 
                                  placeholder="Option C" 
                                  className="w-full bg-[#151f30] border border-[#1e293b] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                                  value={adminQOpt2}
                                  onChange={(e) => setAdminQOpt2(e.target.value)}
                                />
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold bg-[#1d212a] border border-[#2d313c] w-6 h-6 rounded-lg flex items-center justify-center shrink-0">D</span>
                                <input 
                                  type="text" 
                                  placeholder="Option D" 
                                  className="w-full bg-[#151f30] border border-[#1e293b] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                                  value={adminQOpt3}
                                  onChange={(e) => setAdminQOpt3(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider">Correct Index</label>
                                <select 
                                  className="bg-[#151f30] border border-[#1e293b] p-2 rounded-lg text-xs text-white cursor-pointer focus:outline-none focus:border-amber-500"
                                  value={adminQAns}
                                  onChange={(e) => setAdminQAns(Number(e.target.value))}
                                >
                                  <option value={0}>Option A</option>
                                  <option value={1}>Option B</option>
                                  <option value={2}>Option C</option>
                                  <option value={3}>Option D</option>
                                </select>
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider">Exam Reference / Rec</label>
                                <input 
                                  type="text" 
                                  placeholder="AIIMS NORCET 2024" 
                                  className="bg-[#151f30] border border-[#1e293b] p-2 rounded-lg text-xs text-white focus:outline-none"
                                  value={adminQSource}
                                  onChange={(e) => setAdminQSource(e.target.value)}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider">Clinical Rationale & Explanation</label>
                              <textarea 
                                placeholder="Explain key cellular actions or diagnostic parameters for active recall..." 
                                className="bg-[#151f30] border border-[#1e293b] p-2.5 text-xs text-white h-24 focus:outline-none focus:border-amber-500"
                                value={adminQExplain}
                                onChange={(e) => setAdminQExplain(e.target.value)}
                              />
                            </div>

                            <div className="flex gap-2 pt-2">
                              <button 
                                className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs py-3 rounded-xl transition-all shadow-md uppercase tracking-wider"
                                onClick={() => handleSaveQuestion(adminActiveSubjId, adminActiveTestId || "")}
                              >
                                {adminEditingQIdx >= 0 ? "Commit Changes 💾" : "Write Question 📝"}
                              </button>
                              {adminEditingQIdx >= 0 && (
                                <button 
                                  className="bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white px-3 text-xs font-bold rounded-xl transition-all"
                                  onClick={() => {
                                    setAdminEditingQIdx(-1);
                                    setAdminQText("");
                                    setAdminQOpt0("");
                                    setAdminQOpt1("");
                                    setAdminQOpt2("");
                                    setAdminQOpt3("");
                                    setAdminQAns(0);
                                    setAdminQSource("");
                                    setAdminQExplain("");
                                  }}
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* List of active questions - Right Block */}
                        <div className="lg:col-span-7 space-y-4">
                          <h4 className="text-xs font-black text-white uppercase tracking-wider px-1">Questions Database View</h4>
                          {subjects.find(s => s.id === adminActiveSubjId)?.tests.find(t => t.id === adminActiveTestId)?.data.length === 0 ? (
                            <div className="bg-[#0f1520] border border-dashed border-[#1e293b] rounded-2xl p-8 text-center text-xs text-[#8b949e]">
                              This quiz card has 0 questions loaded. Fill out the builder on the left to add your first high-yield MCQ! 📑
                            </div>
                          ) : (
                            <div className="space-y-4 max-h-[750px] overflow-y-auto pr-1">
                              {subjects.find(s => s.id === adminActiveSubjId)?.tests.find(t => t.id === adminActiveTestId)?.data.map((q, idx) => {
                                return (
                                  <div key={idx} className="bg-[#0f1520] border border-[#1e293b] rounded-xl p-4 relative group">
                                    <div className="flex justify-between items-start gap-3">
                                      <span className="text-xs font-bold text-amber-400 font-sans">#Q{idx + 1}</span>
                                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <button 
                                          className="p-1 px-2.5 rounded bg-blue-950/20 hover:bg-blue-950/50 border border-blue-900/50 text-blue-300 text-[10px] font-bold transition-all flex items-center gap-1"
                                          onClick={() => {
                                            setAdminEditingQIdx(idx);
                                            setAdminQText(q.q);
                                            setAdminQOpt0(q.opts[0] || "");
                                            setAdminQOpt1(q.opts[1] || "");
                                            setAdminQOpt2(q.opts[2] || "");
                                            setAdminQOpt3(q.opts[3] || "");
                                            setAdminQAns(q.ans);
                                            setAdminQSource(q.source || "");
                                            setAdminQExplain(q.explain || "");
                                          }}
                                        >
                                          <Edit3 className="w-3 h-3" /> Edit
                                        </button>
                                        <button 
                                          className="p-1 rounded bg-red-950/20 hover:bg-red-950/50 border border-red-900/50 text-red-400 text-[10px] transition-all"
                                          onClick={() => deleteQuestion(adminActiveSubjId, adminActiveTestId || "", idx)}
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    </div>

                                    <p className="text-xs text-white font-semibold mt-2 leading-relaxed">{q.q}</p>
                                    
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-[11px] font-sans text-[#8b949e]">
                                      <div className={`p-1.5 px-2.5 rounded border ${q.ans === 0 ? "border-green-900/40 bg-green-950/10 text-green-300" : "border-[#1e293b]"}`}>
                                        A. {q.opts[0]}
                                      </div>
                                      <div className={`p-1.5 px-2.5 rounded border ${q.ans === 1 ? "border-green-900/40 bg-green-950/10 text-green-300" : "border-[#1e293b]"}`}>
                                        B. {q.opts[1]}
                                      </div>
                                      <div className={`p-1.5 px-2.5 rounded border ${q.ans === 2 ? "border-green-900/40 bg-green-950/10 text-green-300" : "border-[#1e293b]"}`}>
                                        C. {q.opts[2]}
                                      </div>
                                      <div className={`p-1.5 px-2.5 rounded border ${q.ans === 3 ? "border-green-900/40 bg-green-950/10 text-green-300" : "border-[#1e293b]"}`}>
                                        D. {q.opts[3]}
                                      </div>
                                    </div>

                                    <div className="mt-3.5 bg-[#161b22] border border-[#21262d] rounded-lg p-2.5 text-[11px]">
                                      <span className="text-[10px] text-amber-300 font-extrabold uppercase block tracking-wider mb-1">Board Source standard: {q.source}</span>
                                      <p className="text-[#8b949e] leading-relaxed font-sans" style={{ whiteSpace: "pre-line" }}>{getDetailedExplain(q)}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: REGISTERED USER DATABASE */}
              {adminTab === "users" && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="font-syne text-md font-bold text-white m-0 uppercase tracking-wider">Registered Student Accounts Database</h3>
                    <span className="text-xs text-[#8b949e]">{adminStats.totalUsers} registered students</span>
                  </div>

                  <div className="bg-[#0f1520] border border-[#1e293b] rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-sans text-xs">
                        <thead className="bg-[#161b22] border-b border-[#1e293b] text-[#8b949e] font-extrabold uppercase text-[10px] tracking-wider">
                          <tr>
                            <th className="p-4">Student Profile</th>
                            <th className="p-4">Email Address</th>
                            <th className="p-4">Password Hash / Creds</th>
                            <th className="p-4">Assigned Role</th>
                            <th className="p-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1e293b] text-[#e6edf3]">
                          {adminStats.users.map((u, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="p-4 font-bold flex items-center gap-2">
                                <div className="w-7 h-7 rounded bg-amber-500/10 text-amber-300 flex items-center justify-center font-bold font-syne">
                                  {u.name.substring(0, 2).toUpperCase()}
                                </div>
                                {u.name}
                              </td>
                              <td className="p-4 font-mono select-all text-[#8b949e]" style={{ textTransform: "none" }}>{u.email}</td>
                              <td className="p-4 text-[#8b949e] font-mono">{(u as any).password ? "🔓 Encrypted Key" : "👤 Session ID"}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${u.isAdmin ? "bg-red-950/40 border-red-900 text-red-300 animate-pulse" : "bg-blue-950/40 border-blue-900 text-blue-300"}`}>
                                  {u.isAdmin ? "ADMIN" : "NURSE CLINICIAN"}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button 
                                  className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${u.isAdmin ? "bg-neutral-900 hover:bg-neutral-800 border-neutral-700 text-neutral-300" : "bg-amber-500 hover:bg-amber-600 border-amber-600 text-black"}`}
                                  onClick={() => toggleUserAdmin(u.email)}
                                >
                                  {u.isAdmin ? "Demote Student" : "Promote Admin"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            </div>
            
            <footer className="mt-12 text-center text-xs text-[#8b949e] pb-6">Nursing Mock · Built for India's Nursing Students</footer>
          </div>
        )}

        {/* =============== SETTINGS PAGE =============== */}
        {activePage === "settings" && (
          <div className="page active p-4 md:p-8 max-w-4xl mx-auto" id="page-settings">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-black font-syne tracking-tight text-white m-0">⚙️ Connection Settings</h2>
              <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed">
                Configure your static cloud hosting, Supabase database, and Gemini client-side credentials.
              </p>
            </div>

            <div className="space-y-6">
              {/* SECTION 1: SUPABASE DB */}
              <div className="bg-[#0f1520] border border-[#1e293b] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  {isSupabaseConnected() ? (
                    <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/50 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                      🟢 Cloud Connected
                    </span>
                  ) : (
                    <span className="bg-amber-950/40 text-amber-400 border border-amber-900/50 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                      🔴 Local Offline Mode
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-syne text-sm font-extrabold text-white uppercase tracking-wider m-0">Supabase Connection Settings</h3>
                </div>

                <p className="text-xs text-[#8b949e] mb-4 leading-relaxed">
                  Provide your Supabase credentials to automatically synchronize study streaks, practice test histories, updates, and profile settings in the cloud. Left blank, the system automatically runs locally in your browser.
                </p>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider">Supabase URL</label>
                    <input 
                      type="text" 
                      placeholder="https://your-project-id.supabase.co" 
                      className="bg-[#151f30] border border-[#1e293b] p-3 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 w-full"
                      value={supUrlInput}
                      onChange={(e) => setSupUrlInput(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider">Supabase Anon Key</label>
                    <input 
                      type="password" 
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6..." 
                      className="bg-[#151f30] border border-[#1e293b] p-3 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500 w-full"
                      value={supKeyInput}
                      onChange={(e) => setSupKeyInput(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        if (!supUrlInput.trim() || !supKeyInput.trim()) {
                          triggerToast("Please enter both the URL and Anon Key.", "err");
                          return;
                        }
                        localStorage.setItem("np_supabase_url", supUrlInput.trim());
                        localStorage.setItem("np_supabase_anon_key", supKeyInput.trim());
                        triggerToast("Supabase configuration applied! Refreshing connection...", "ok");
                        setTimeout(() => window.location.reload(), 1000);
                      }}
                    >
                      Apply & Connect 🔌
                    </button>
                    {localStorage.getItem("np_supabase_url") && (
                      <button 
                        className="bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          localStorage.removeItem("np_supabase_url");
                          localStorage.removeItem("np_supabase_anon_key");
                          setSupUrlInput("");
                          setSupKeyInput("");
                          triggerToast("Cleared Supabase credentials.", "ok");
                          setTimeout(() => window.location.reload(), 1000);
                        }}
                      >
                        Disconnect & Clear ⚠️
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2: GEMINI API */}
              <div className="bg-[#0f1520] border border-[#1e293b] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  {isGeminiClientConfigured() ? (
                    <span className="bg-indigo-950/40 text-indigo-400 border border-indigo-900/50 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                      🟢 Direct AI Active
                    </span>
                  ) : (
                    <span className="bg-amber-950/40 text-amber-400 border border-amber-900/50 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                      🔴 Direct Server Fallback
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-syne text-sm font-extrabold text-white uppercase tracking-wider m-0">Gemini Client-Side API Key</h3>
                </div>

                <p className="text-xs text-[#8b949e] mb-4 leading-relaxed">
                  Provide your Gemini API key to trigger AI synthesis directly from the browser, completely removing any reliance on an Express backend proxy. This enables 100% static hosting on platforms like Hostinger.
                </p>

                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-extrabold text-[#8b949e] uppercase tracking-wider">Gemini API Key</label>
                    <input 
                      type="password" 
                      placeholder="AIzaSy..." 
                      className="bg-[#151f30] border border-[#1e293b] p-3 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500 w-full"
                      value={gemKeyInput}
                      onChange={(e) => setGemKeyInput(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md uppercase tracking-wider cursor-pointer"
                      onClick={() => {
                        if (!gemKeyInput.trim()) {
                          triggerToast("Please enter a valid API key.", "err");
                          return;
                        }
                        saveClientGeminiKey(gemKeyInput.trim());
                        triggerToast("Gemini key applied successfully! 🤖", "ok");
                        setTimeout(() => window.location.reload(), 1000);
                      }}
                    >
                      Save Key 💾
                    </button>
                    {isGeminiClientConfigured() && (
                      <button 
                        className="bg-neutral-800 hover:bg-neutral-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all uppercase tracking-wider cursor-pointer"
                        onClick={() => {
                          clearClientGeminiKey();
                          setGemKeyInput("");
                          triggerToast("Gemini credentials deleted.", "ok");
                          setTimeout(() => window.location.reload(), 1000);
                        }}
                      >
                        Clear Key 🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 3: DEPLOYMENT PROCEDURES */}
              <div className="bg-[#0f1520] border border-[#1e293b] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h3 className="font-syne text-sm font-extrabold text-white uppercase tracking-wider m-0">Static Web App Upload Instructions</h3>
                </div>

                <div className="text-xs text-[#e6edf3] leading-relaxed space-y-3">
                  <p className="text-[#8b949e]">
                    To host this high-yield nursing assessment platform on Hostinger, follow these exact 4 simple steps:
                  </p>
                  <ol className="list-decimal pl-5 space-y-2 text-[#8b949e]">
                    <li>
                      <strong className="text-white">Configure Secrets</strong>: On this page, configure your Supabase URL, Supabase Anon Key, and Gemini API key, then verify the connection.
                    </li>
                    <li>
                      <strong className="text-white">Build Static Files</strong>: Download your code ZIP, extract it on your desktop, and run <code className="bg-[#151f30] px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">npm run build</code> in your command line or terminal.
                    </li>
                    <li>
                      <strong className="text-white">Locate Build Output</strong>: The build process outputs a clean, production-ready <code className="bg-[#151f30] px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">dist/</code> directory containing optimized static files (HTML, JS, CSS, and media).
                    </li>
                    <li>
                      <strong className="text-white">Direct Upload to Hostinger</strong>: Open your Hostinger HPanel File Manager, open the <code className="bg-[#151f30] px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">public_html</code> folder, and upload all files from inside the <code className="bg-[#151f30] px-1.5 py-0.5 rounded text-amber-300 font-mono text-[11px]">dist/</code> folder.
                    </li>
                  </ol>
                  <div className="bg-amber-500/5 border border-amber-500/10 p-3 rounded-lg text-[11px] text-amber-300">
                    💡 <strong className="text-amber-200">SEO & Speed Advantage:</strong> Static frontend applications paired with serverless databases are lightning-fast, ultra-secure, and require zero active server maintenance fees. Your site will immediately rank higher on Google!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* =============== AI TUTOR ACCORDION MODAL =============== */}
      {aiTutorOpen && (
        <div className="modal-overlay" style={{ display: "flex" }}>
          <div className="modal">
            <button className="modal-close" onClick={() => setAiTutorOpen(false)}>
              ✕
            </button>
            <div className="modal-title flex items-center gap-1.5 text-purple font-bold">
              <Activity className="w-4 h-4" /> 🤖 AI Tutor — Smart Deep Dive
            </div>

            <div id="ai-modal-content" className="pt-2">
              {activeTest && aiTutorQIdx > -1 && (
                <>
                  <p className="text-xs text-[#8b949e] italic mb-4 border-l border-[#1e2d45] pl-3 py-1">
                    "{activeTest.data[aiTutorQIdx].q}"
                  </p>

                  {aiTutorLoading ? (
                    <div className="ai-loading py-6 flex justify-center items-center">
                      <div className="ai-loading-dots mr-2">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <span className="text-xs font-semibold">Gemini is synthesizing detailed rationale...</span>
                    </div>
                  ) : (
                    <div className="pt-1">
                      {renderFormattedAiResponse(aiTutorResponse)}
                    </div>
                  )}

                  <div className="text-[11px] text-[#8b949e] border-t border-[#1e2d45] pt-3 mt-4 flex items-center justify-between">
                    <span>📌 Source: {activeTest.data[aiTutorQIdx].source}</span>
                    <button 
                      className="text-accent underline text-[10px]"
                      onClick={() => setAiTutorOpen(false)}
                    >
                      Close rationale
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* =============== CBT EXAM INSTRUCTIONS MODAL =============== */}
      {pendingTest && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1329] border border-[#1e2d45] rounded-2xl w-full max-w-xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in text-white">
            
            {/* Header */}
            <div className="p-5 border-b border-[#1e2d45] bg-[#0c1938] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-3.5 w-3.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500"></span>
                </span>
                <div>
                  <h3 className="font-extrabold text-xs md:text-sm tracking-tight text-white uppercase font-sans">
                    CBT Staff Nurse Examination Portal
                  </h3>
                  <p className="text-[10px] text-[#8492a6] font-sans">Official Clinical Assessment Guidelines</p>
                </div>
              </div>
              <button 
                className="text-gray-400 hover:text-white transition-colors text-lg"
                onClick={() => setPendingTest(null)}
              >
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 font-sans">
              
              {/* Test Name & Badge */}
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex-1">
                  <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-widest block mb-0.5">ACTIVE TEST SELECTED</span>
                  <h4 className="text-sm font-extrabold text-white leading-tight">{pendingTest.test.title}</h4>
                </div>
                <div className="bg-amber-500/10 text-amber-300 font-bold text-xs px-3 py-1 rounded-lg border border-amber-500/20 whitespace-nowrap shrink-0">
                  📄 {pendingTest.test.questions} MCQs
                </div>
              </div>

              {/* CBT Exam Specs Grid */}
              <div>
                <h5 className="text-[10px] text-[#8b949e] font-extrabold uppercase tracking-widest mb-1.5">Examination Parameters</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                  <div className="bg-[#0f1b35] border border-[#1e2d45] rounded-xl p-2.5 text-center">
                    <span className="block text-[8.5px] text-[#8b949e] font-extrabold uppercase">QUESTIONS</span>
                    <strong className="text-xs text-white">{pendingTest.test.questions}</strong>
                  </div>
                  <div className="bg-[#0f1b35] border border-[#1e2d45] rounded-xl p-2.5 text-center">
                    <span className="block text-[8.5px] text-[#8b949e] font-extrabold uppercase">TOTAL MARKS</span>
                    <strong className="text-xs text-white">{pendingTest.test.questions}</strong>
                  </div>
                  <div className="bg-[#0f1b35] border border-[#1e2d45] rounded-xl p-2.5 text-center">
                    <span className="block text-[8.5px] text-[#8b949e] font-extrabold uppercase">DURATION</span>
                    <strong className="text-xs text-white">{pendingTest.test.mins} Mins</strong>
                  </div>
                  <div className="bg-[#0f1b35] border border-[#1e2d45] rounded-xl p-2.5 text-center">
                    <span className="block text-[8.5px] text-[#8b949e] font-extrabold uppercase">MARK TYPE</span>
                    <strong className="text-xs text-amber-300">CBT Rules</strong>
                  </div>
                </div>
              </div>

              {/* Mode Selection */}
              <div>
                <h5 className="text-[10px] text-[#8b949e] font-extrabold uppercase tracking-widest mb-2">Choose Mode of Attempt</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  {/* Exam Mode button */}
                  <div 
                    onClick={() => setSelectedModeForPending("exam")}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedModeForPending === "exam" 
                        ? "bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500" 
                        : "bg-[#0c1424] border-[#1e2d45] hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 justify-between">
                      <span className="font-extrabold text-xs text-white tracking-tight">⏱️ CBT Exam Mode</span>
                      <span className="text-[8px] bg-red-500/10 text-red-450 border border-red-500/20 px-1 py-0.2 rounded font-extrabold">NEGATIVE</span>
                    </div>
                    <p className="text-[11px] text-[#a0aec0] leading-snug">
                      Replicates clinical exams. Detailed rationale is hidden until finish. <strong>-0.25 penalty value</strong> marks applied for errors.
                    </p>
                  </div>

                  {/* Practice Mode button */}
                  <div 
                    onClick={() => setSelectedModeForPending("practice")}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedModeForPending === "practice" 
                        ? "bg-purple-500/10 border-[#a181ff] shadow-md ring-1 ring-[#a181ff]" 
                        : "bg-[#0c1424] border-[#1e2d45] hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1 justify-between">
                      <span className="font-extrabold text-xs text-white tracking-tight">💡 Practice Mode</span>
                      <span className="text-[8px] bg-green-500/10 text-green-400 border border-green-500/20 px-1 py-0.2 rounded font-extrabold">LEARNING</span>
                    </div>
                    <p className="text-[11px] text-[#a0aec0] leading-snug">
                      Instant feedback and detailed answers after submitting every option. Unlimited timer, zero negative score penalties.
                    </p>
                  </div>

                </div>
              </div>

              {/* Official CBT Rules Checklist */}
              <div className="bg-[#0c1325] border border-[#1e2d45] rounded-xl p-4 text-[11px] text-[#a0aec0] flex flex-col gap-1.5 font-sans leading-relaxed">
                <h6 className="font-extrabold text-white text-xs mb-1 uppercase tracking-wider">Official Staff Nurse CBT Rules</h6>
                <div className="flex items-start gap-1.5">
                  <span className="text-green-405 font-bold shrink-0">✔</span>
                  <span><strong>Correct Answer:</strong> +1.00 Mark holds for correct evaluated options.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-red-405 font-bold shrink-0">✔</span>
                  <span><strong>Incorrect Mistake Option:</strong> Negative penalty of <strong>-0.25 (1/4th)</strong> is deducted inside CBT Exam Mode.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-amber-405 font-bold shrink-0">✔</span>
                  <span><strong>Unattempted/Skipped:</strong> Zero penalty. Unanswered questions do not impact cumulative scores.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-indigo-405 font-bold shrink-0">✔</span>
                  <span><strong>Auto-Submit Timer:</strong> The test timer runs back to zero, submits automatically upon expiry.</span>
                </div>
              </div>

            </div>

            {/* Footer with actions */}
            <div className="p-4 border-t border-[#1e2d45] bg-[#090e1f] flex items-center justify-between gap-4">
              <button 
                className="px-4 py-2 rounded-xl border border-[#1e2d45] text-xs font-bold text-[#8492a6] hover:bg-[#1e2d45] hover:text-white transition-all cursor-pointer"
                onClick={() => setPendingTest(null)}
              >
                Cancel
              </button>
              <button 
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-extrabold shadow-lg shadow-amber-500/10 transition-all text-center tracking-wide cursor-pointer active:scale-95"
                onClick={() => {
                  const subId = pendingTest.subjectId;
                  const testId = pendingTest.testId;
                  startTest(subId, testId, selectedModeForPending);
                  setPendingTest(null);
                }}
              >
                Acknowledge & Start Mock →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );

  // Quick auxiliary helper
  function goHub() {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    showPage(testReferrer || "hub");
  }

  // Quick mode handler
  function setMode(mode: "practice" | "exam") {
    handleModeSwitch(mode);
  }
}
