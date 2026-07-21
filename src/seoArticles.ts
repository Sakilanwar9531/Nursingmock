export interface SeoArticle {
  title: string;
  subtitle: string;
  keywords: string[];
  contentHtml: string;
}

export const SEO_ARTICLES: Record<string, SeoArticle> = {
  homepage: {
    title: "About NCBT — India's Trusted Platform for Nursing, Pharmacist & Paramedical Government Exam Preparation",
    subtitle: "What is NCBT, how it works, its immense benefits, and how it prepares you to top competitive examinations",
    keywords: ["what is NCBT", "National CBT", "nursing exam preparation", "pharmacist exam practice", "paramedical exam mock test", "free CBT mock test", "government exam practice papers"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. What is NCBT.in & What Does It Do?
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            <strong>NCBT.in (National CBT)</strong> is a cutting-edge, comprehensive exam preparation portal designed specifically for Nursing, Pharmacist, and Paramedical recruitment aspirants in India. We bridge the gap between academic theory and practical exam execution. Our platform simulates the <strong>actual Computer Based Test (CBT) environment</strong> used by major recruitment boards including AIIMS, ESIC, RRB, NHM, and State health departments.
          </p>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            By providing an authentic testing engine, structured subject tests, exam-wise practice sets, and real previous year solved papers (PYQs), NCBT empowers aspirants to transform their knowledge into rapid, accurate decision-making on exam day.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. How Does It Work?
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Preparing on NCBT.in is simple, structured, and highly effective. You can begin practicing in just three steps:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h4 class="text-xs font-black text-white flex items-center gap-1.5">
                <span class="text-accent">1️⃣</span> Select Your Target Exam
              </h4>
              <p class="text-[11px] text-[#8b949e] leading-relaxed">
                Choose your specific target exam (e.g., AIIMS NORCET, WBHRB, ESIC, RRB, or CHO) to immediately align your dashboard with the correct syllabus, pattern, and mock criteria.
              </p>
            </div>
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h4 class="text-xs font-black text-white flex items-center gap-1.5">
                <span class="text-emerald-400">2️⃣</span> Choose Your Practice Format
              </h4>
              <p class="text-[11px] text-[#8b949e] leading-relaxed">
                Toggle between <strong>CBT Exam Mode</strong> (with strict timers and negative marking penalties) or <strong>Practice Mode</strong> (with instant answers and logical clinical explanations).
              </p>
            </div>
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h4 class="text-xs font-black text-white flex items-center gap-1.5">
                <span class="text-purple-400">3️⃣</span> Review Detailed Analytics
              </h4>
              <p class="text-[11px] text-[#8b949e] leading-relaxed">
                After submission, deep-dive into your performance metrics. See your speed statistics, category accuracy levels, percentile projections, and step-by-step rationales.
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            3. Immense Benefits of Practicing on NCBT
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Candidates who incorporate NCBT.in daily into their study regime enjoy key advantages:
          </p>
          <ul class="list-disc list-inside text-sm text-[#8b949e] pl-2 space-y-2.5">
            <li>
              <strong class="text-white">Eliminate Test Anxiety:</strong> Our test window recreates the precise color coding, font layout, question navigation panel, and timer placement of official CBT interfaces. This makes the real exam feel like just another practice set.
            </li>
            <li>
              <strong class="text-white">Tackle Negative Markings:</strong> With a 1/3rd or 1/4th penalty on incorrect answers, guessing is lethal. NCBT trains your intuition, helping you eliminate options and skip questions when confidence is low.
            </li>
            <li>
              <strong class="text-white">Active Recall & High-Yield Content:</strong> Rather than passive reading, our questions utilize active recall spanning scenario-based, clinical safety, drug pharmacology, and anatomy questions.
            </li>
            <li>
              <strong class="text-white">100% Free with No Hidden Paywalls:</strong> Gain complete access to standard full-length mocks, previous year solved banks, and subject-wise chapter tests without premium subscriptions.
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            4. Who is This Platform For?
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            NCBT is carefully calibrated to suit the needs of a wide range of nursing professionals and students:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4">
              <h4 class="text-xs font-bold text-[#388bfd] mb-1">🎓 Nursing Freshers & Undergrads</h4>
              <p class="text-[11px] text-[#8b949e] leading-relaxed">
                B.Sc. Nursing and GNM diploma students looking to build their clinical foundation, revise core systems (Anatomy, Physiology, Pharmacology), and start early preparations.
              </p>
            </div>
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4">
              <h4 class="text-xs font-bold text-[#10b981] mb-1">💼 Experienced Staff Nurses</h4>
              <p class="text-[11px] text-[#8b949e] leading-relaxed">
                Working clinicians who want to fast-track their revision, practice high-yield previous year questions, and secure high-pay Level 7 positions in central institutions like AIIMS, ESIC, and RRB.
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            5. Frequently Asked Questions (FAQ)
          </h2>
          <div class="space-y-4 text-sm">
            <div class="space-y-1">
              <strong class="text-white block">Q1: Can I practice past year papers on NCBT for free?</strong>
              <p class="text-[#8b949e]">Yes, all actual previous year papers (PYQs) from AIIMS NORCET, ESIC, and State Recruitments are available completely free on our CBT platform with real-time analytics.</p>
            </div>
            <div class="space-y-1">
              <strong class="text-white block">Q2: How does practice mode differ from exam mode?</strong>
              <p class="text-[#8b949e]">Practice mode provides instant rationales and answers upon selection with an unlimited timer. Exam mode simulates the real recruitment interface, hiding explanations until you submit the entire paper and applying strict negative marks.</p>
            </div>
          </div>
        </section>
      </div>
    `
  },
  wbhrb: {
    title: "WBHRB Staff Nurse Grade II & CHO Exam Preparation Guide",
    subtitle: "Complete Syllabus Analysis, Selection Process, Previous Year Questions, and High-Yield Preparation Tips for West Bengal Health Recruitment Board Examinations",
    keywords: ["WBHRB Staff Nurse preparation", "West Bengal Grade II Nursing syllabus", "WB CHO previous year papers", "West Bengal nursing jobs model papers", "WBHRB CBT practice test"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Understanding the WBHRB Staff Nurse Selection Process
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The <strong>West Bengal Health Recruitment Board (WBHRB)</strong> is responsible for recruiting Staff Nurse Grade II and Community Health Officers (CHOs) across state clinics and medical colleges. Unlike central exams that rely solely on a single written tier, WBHRB implements a composite evaluation structure:
          </p>
          <ul class="list-disc list-inside text-sm text-[#8b949e] pl-2 space-y-2">
            <li><strong class="text-white">Academic Marks (Up to 85 Marks):</strong> Weighted percentage derived from your secondary (Madhyamik), higher secondary, and GNM/B.Sc Nursing transcripts.</li>
            <li><strong class="text-white">Written Examination / CBT Mock Tests (Varies by notification):</strong> Multiple-choice questions assessing core clinical aptitude and diagnostic guidelines.</li>
            <li><strong class="text-white">Professional Interview (15 Marks):</strong> Clinical oral evaluation regarding direct nursing care, emergency procedures, and communication skills.</li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. Core West Bengal Nursing Exam Syllabus
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            If you are aiming to top the WBHRB list, your preparation must emphasize the state-recommended textbooks and standard protocols. The syllabus focuses extensively on:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h3 class="text-xs font-bold text-[#58a6ff] uppercase tracking-wide">Midwifery & Gynaecology</h3>
              <p class="text-xs text-[#8b949e] leading-relaxed">
                Antenatal counseling, assessment of fetal growth (fundal height milestones), management of secondary stage of labor, post-partum hemorrhage (PPH) active management.
              </p>
            </div>
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h3 class="text-xs font-bold text-[#58a6ff] uppercase tracking-wide">Community Health Practice</h3>
              <p class="text-xs text-[#8b949e] leading-relaxed">
                Primary health care delivery system (sub-centres, PHCs, CHCs), West Bengal local endemic diseases (malaria, dengue, filariasis control), and national health programs.
              </p>
            </div>
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h3 class="text-xs font-bold text-[#58a6ff] uppercase tracking-wide">Pediatric & Child Health</h3>
              <p class="text-xs text-[#8b949e] leading-relaxed">
                Neonatal resuscitation algorithms, Kangaroo Mother Care (KMC) indications, immunization schedules (pentavalent, rota, measles-rubella), and developmental milestones.
              </p>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            3. Essential Preparation Strategy for WBHRB Staff Nurse Grade II 2026
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The official <strong>WBHRB Staff Nurse Grade II 2026</strong> paper contains questions directly addressing fundamental nursing procedures, clinical guidelines, and maternal-child health indicators. To excel in this assessment:
          </p>
          <ol class="list-decimal list-inside text-sm text-[#8b949e] pl-2 space-y-2">
            <li>
              <strong class="text-white">Revise Regional and National Guidelines:</strong> Memorize state indicators, maternal mortality rates (MMR), infant mortality rates (IMR) from NFHS-5, and key health programs.
            </li>
            <li>
              <strong class="text-white">Focus on Basic Concepts:</strong> Many questions are conceptual, such as the exact location of the prostate gland, gaseous exchange mechanisms in the alveoli, and mean arterial pressure calculation formulas.
            </li>
            <li>
              <strong class="text-white">Practice Official PYQs:</strong> Practice real past papers to understand question complexity. Use NCBT's simulated portal to build speed and accurate decision-making.
            </li>
          </ol>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            4. Frequently Asked Questions (FAQ)
          </h2>
          <div class="space-y-4 text-sm">
            <div class="space-y-1">
              <strong class="text-white block">Q1: What is the age limit for the WBHRB Staff Nurse Exam?</strong>
              <p class="text-[#8b949e]">Candidates must typically be between 18 and 39 years of age, with standard relaxations applicable for reserved categories as per West Bengal state rules.</p>
            </div>
            <div class="space-y-1">
              <strong class="text-white block">Q2: Is registration under the West Bengal Nursing Council (WBNC) mandatory?</strong>
              <p class="text-[#8b949e]">Yes, possessing a valid registration certificate under WBNC is a vital eligibility criteria for applying and verification during the interview phase.</p>
            </div>
          </div>
        </section>
      </div>
    `
  },
  aiims: {
    title: "AIIMS NORCET Staff Nurse CBT Preparation & Syllabus Analysis",
    subtitle: "The Definitive Study Guide, Clinical Case Scenario Patterns, Core Syllabus Breakdown, and Mock Series for India's Hardest Nursing Officer Exam",
    keywords: ["AIIMS NORCET mock test", "NORCET syllabus 2026", "nursing officer clinical questions", "AIIMS solved past papers", "nursing computer based test practice"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Why AIIMS NORCET Demands a Specific Preparation Strategy
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The <strong>Nursing Officer Recruitment Common Eligibility Test (NORCET)</strong> conducted by <strong>AIIMS Delhi</strong> is highly regarded as one of the most rigorous clinical nursing assessments worldwide. Unlike traditional staff nurse exams that test memory-based definitions, NORCET questions focus on **clinical application and critical scenarios**.
          </p>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            As a candidate, you are placed in simulated intensive care units, emergency departments, and labor suites. You are asked: <em>"What is your immediate priority nursing action when a patient on a mechanical ventilator displays high-pressure alarm spikes?"</em> or <em>"Identify the anatomical structure highlighted in this ultrasound image."</em>
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. NORCET Exam Pattern and Marking Structure
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The examination is conducted in two progressive tiers: <strong>NORCET Prelims</strong> (focusing on qualifying core concepts) and <strong>NORCET Mains</strong> (focusing purely on critical scenario-based clinical problems).
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h3 class="text-xs font-bold text-white uppercase tracking-wider">NORCET Prelims Format</h3>
              <ul class="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Total Questions: 100 MCQs</li>
                <li>Duration: 90 Minutes</li>
                <li>80 Nursing MCQs + 20 General Aptitude & GK MCQs</li>
                <li>Negative Marking: 1/3rd (0.33 per wrong option)</li>
              </ul>
            </div>
            <div class="bg-[#0f1524] border border-[#1e293b] rounded-xl p-4 space-y-2">
              <h3 class="text-xs font-bold text-white uppercase tracking-wider">NORCET Mains Format</h3>
              <ul class="list-disc list-inside text-xs text-[#8b949e] space-y-1">
                <li>Total Questions: 100 MCQs</li>
                <li>Duration: 90 Minutes</li>
                <li>100% Core Nursing clinical case studies and scenario problems</li>
                <li>Negative Marking: 1/3rd (0.33 per wrong option)</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            3. High-Yield Clinical Focus Areas
          </h2>
          <ul class="list-disc list-inside text-sm text-[#8b949e] pl-2 space-y-2">
            <li>
              <strong class="text-white">Emergency & ICU Nursing:</strong> Airway management, arterial blood gas (ABG) interpretations, cardiac arrest algorithms (ACLS guidelines), and vasoactive drug infusions (Dopamine, Dobutamine calculations).
            </li>
            <li>
              <strong class="text-white">Maternal & Child Health:</strong> Assessment of APGAR score, stages of labor, gestational diabetes insulin protocols, pediatric medication dosage by body weight, and congenital heart diseases.
            </li>
            <li>
              <strong class="text-white">Image-Based and Skill-Based Questions:</strong> Be familiar with clinical equipment interfaces (infusion pumps, ventilators, tracheostomy kits, chest tubes) and medical diagnostic images.
            </li>
          </ul>
        </section>
      </div>
    `
  },
  rrb: {
    title: "Railway Recruitment Board (RRB) Staff Nurse Preparation Hub",
    subtitle: "Syllabus Breakdown, General Science Weights, Solved Previous Year Papers, and Computer-Based Testing Strategy for RRB Staff Nurse Vacancies",
    keywords: ["RRB Staff Nurse syllabus", "Railway nursing solved papers", "general science for RRB nursing", "railway staff nurse recruitment test", "RRB mock exam"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Why RRB Staff Nurse Recruitment is Unique
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The <strong>Railway Recruitment Board (RRB)</strong> Staff Nurse exam is highly popular due to the excellent allowances, residential medical colonies, and security offered by the Indian Railways. Unlike standard medical board exams that restrict themselves solely to nursing sciences, RRB tests a <strong>broader cognitive profile</strong>.
          </p>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Out of the total marks, a significant portion is dedicated to <strong>General Science, Arithmetic Aptitude, Logical Reasoning, and General Awareness</strong>. Thus, a candidate who is highly skilled in nursing but weak in basic sciences or aptitude may fall short of the cut-off percentile.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. Official RRB Staff Nurse Syllabus & Question Blueprint
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The typical RRB Staff Nurse Computer-Based Test consists of 100 questions to be solved in 90 minutes. The division of marks is structured as follows:
          </p>
          <div class="overflow-x-auto rounded-xl border border-[#1e293b] bg-[#0c1322]">
            <table class="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr class="bg-[#111827] text-white border-b border-[#1e293b]">
                  <th class="p-3 font-extrabold">Section Name</th>
                  <th class="p-3 font-extrabold">Questions Count</th>
                  <th class="p-3 font-extrabold">Marks Allocated</th>
                  <th class="p-3 font-extrabold">Target Topics</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1e293b]">
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">Professional Ability</td>
                  <td class="p-3 text-[#c9d1d9]">70 Questions</td>
                  <td class="p-3 text-white">70 Marks</td>
                  <td class="p-3 text-[#8b949e]">Anatomy, Physiology, Fundamentals, Med-Surg, Community, Midwifery, Pediatrics.</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">General Science</td>
                  <td class="p-3 text-[#c9d1d9]">10 Questions</td>
                  <td class="p-3 text-white">10 Marks</td>
                  <td class="p-3 text-[#8b949e]">Basic Physics, Chemistry, and Life Sciences up to 10th standard CBSE level.</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">General Analytical Aptitude</td>
                  <td class="p-3 text-[#c9d1d9]">10 Questions</td>
                  <td class="p-3 text-white">10 Marks</td>
                  <td class="p-3 text-[#8b949e]">Number systems, percentage, ratio, time and work, interest, calendar, clock problems.</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">General Awareness</td>
                  <td class="p-3 text-[#c9d1d9]">10 Questions</td>
                  <td class="p-3 text-white">10 Marks</td>
                  <td class="p-3 text-[#8b949e]">Current affairs, history, geography, constitution of India, sports, and general knowledge.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `
  },
  esic: {
    title: "ESIC Nursing Officer Recruitment Syllabus & Practice Handbook",
    subtitle: "Preparation Strategies, Key Subject Distribution, Antidotes Cheat-Sheet, and Mock Tests for Employees' State Insurance Corporation Exams",
    keywords: ["ESIC nursing officer preparation", "ESIC staff nurse syllabus", "ESIC past papers solved", "employees state insurance corporation exam model", "nursing mock series free"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Employees' State Insurance Corporation (ESIC) Nursing Officer Exam Overview
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The <strong>Employees' State Insurance Corporation (ESIC)</strong> is a statutory body under the Ministry of Labour and Employment, Government of India. ESIC hospitals offer high-standard healthcare services to industrial employees and their dependents. Becoming a Nursing Officer in ESIC guarantees a highly respected career with a stable work environment.
          </p>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            ESIC Nursing Officer exams historically balance core nursing sciences (80% weightage) and general aptitude/English language skills (20% weightage). The difficulty level is intermediate to high, requiring excellent analytical skills and rapid clinical judgment.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. Key Syllabus Areas to Focus on for ESIC
          </h2>
          <ul class="list-disc list-inside text-sm text-[#8b949e] pl-2 space-y-2">
            <li>
              <strong class="text-white">Primary Fundamentals of Nursing:</strong> Patient hygiene, body mechanics, position during surgeries/procedures, decubitus ulcer staging, medical ethics.
            </li>
            <li>
              <strong class="text-white">Pharmacology and Nursing Management:</strong> Medication calculation (drops per minute), therapeutic serum levels of critical drugs (Digoxin, Lithium, Phenytoin), and clinical antidotes (such as Protamine Sulfate for Heparin overdose, Vitamin K for Warfarin).
            </li>
            <li>
              <strong class="text-white">Maternal and Infant Nursing:</strong> Normal fetal development milestones, prenatal screening tests, postnatal care of the infant, breastfeeding indicators, and managing high-risk pregnancies.
            </li>
          </ul>
        </section>
      </div>
    `
  },
  anatomy: {
    title: "High-Yield Anatomy & Physiology Study Guide for Nursing Officers",
    subtitle: "A Comprehensive Review of Cells, Tissues, Organ Systems, and Physiological Milestones for Competitive Recruitment Exams",
    keywords: ["anatomy physiology nursing MCQ", "nursing exam cell tissues notes", "cardiovascular system high yield nursing", "renal system anatomy study guide", "human anatomy competitive exam nursing"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Cells and Tissues: The Foundation of Clinical Science
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Every physiological process starts at the cellular level. For competitive nursing exams like AIIMS NORCET, understanding cell structure, membrane transport systems, and tissue types is vital. Here are the core cellular checkpoints you must remember:
          </p>
          <ul class="list-disc list-inside text-sm text-[#8b949e] pl-2 space-y-2">
            <li>
              <strong class="text-white">Mitochondria:</strong> The power house of the cell, responsible for ATP synthesis via aerobic cellular respiration. Essential for highly metabolic organs (skeletal muscle, cardiac muscle).
            </li>
            <li>
              <strong class="text-white">Endoplasmic Reticulum (ER):</strong> Rough ER (studded with ribosomes) is responsible for protein synthesis. Smooth ER is responsible for lipid and steroid hormone synthesis and drug detoxification in the liver.
            </li>
            <li>
              <strong class="text-white">Membrane Transport:</strong> Passive simple diffusion (gaseous exchange in alveoli), osmosis (movement of water molecules across a semi-permeable membrane), and active transport (requiring ATP, such as the Sodium-Potassium ATPase pump).
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. Epithelial and Connective Tissue Classification
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Understanding tissue histology is crucial. Questions frequently test tissue locations in the human body:
          </p>
          <div class="overflow-x-auto rounded-xl border border-[#1e293b] bg-[#0c1322]">
            <table class="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr class="bg-[#111827] text-white border-b border-[#1e293b]">
                  <th class="p-3 font-extrabold">Tissue Type</th>
                  <th class="p-3 font-extrabold">Anatomical Location</th>
                  <th class="p-3 font-extrabold">Functional Role</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1e293b]">
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">Simple Squamous Epithelium</td>
                  <td class="p-3 text-[#8b949e]">Alveoli of lungs, lining of blood vessels (endothelium)</td>
                  <td class="p-3 text-[#c9d1d9]">Rapid passive simple diffusion and filtration</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">Simple Columnar Epithelium</td>
                  <td class="p-3 text-[#8b949e]">Stomach, small intestine, large intestine lining</td>
                  <td class="p-3 text-[#c9d1d9]">Absorption of nutrients and secretion of mucus</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">Transitional Epithelium</td>
                  <td class="p-3 text-[#8b949e]">Urinary bladder, ureters</td>
                  <td class="p-3 text-[#c9d1d9]">Allows extreme stretching without tearing</td>
                </tr>
                <tr>
                  <td class="p-3 font-bold text-[#58a6ff]">Ciliated Columnar Epithelium</td>
                  <td class="p-3 text-[#8b949e]">Trachea, fallopian tubes</td>
                  <td class="p-3 text-[#c9d1d9]">Movement of particles, egg propulsion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `
  },
  blood: {
    title: "High-Yield Hematology and Blood Physiology Study Guide",
    subtitle: "A Masterclass on Hemoglobin Indices, Clotting Cascades, Transfusion Protocols, and Hematological Pathophysiology for Nursing Officer Exams",
    keywords: ["blood physiology nursing study", "anemia indices MCQs", "clotting cascade nursing notes", "blood transfusion reaction protocol", "hematology high yield notes"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Blood Composition and Erythropoiesis
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Blood constitutes approximately 8% of total body weight, with a normal volume of 5-6 liters in an adult male. It is divided into <strong>plasma (55%)</strong> and <strong>formed elements (45%)</strong>, which include Red Blood Cells (Erythrocytes), White Blood Cells (Leukocytes), and Platelets (Thrombocytes).
          </p>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            <strong>Erythropoiesis</strong> (RBC formation) is stimulated by the hormone <strong>erythropoietin</strong>, which is synthesized and secreted primarily by the peritubular capillary cells of the kidneys in response to tissue hypoxia.
          </p>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. Clotting Cascade: Coagulation Pathways
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The coagulation cascade is a highly regulated series of enzymatic reactions that convert blood from liquid to solid gel. It is divided into:
          </p>
          <ul class="list-disc list-inside text-sm text-[#8b949e] pl-2 space-y-2">
            <li>
              <strong class="text-white">Intrinsic Pathway:</strong> Triggered by internal vascular wall injury (exposure of collagen fibers). Monitored clinically using the <strong>Activated Partial Thromboplastin Time (aPTT)</strong>, which is vital for monitoring intravenous <strong>Heparin</strong> therapy.
            </li>
            <li>
              <strong class="text-white">Extrinsic Pathway:</strong> Triggered by external trauma that releases tissue factor (thromboplastin). Monitored clinically using <strong>Prothrombin Time (PT)</strong> and <strong>International Normalized Ratio (INR)</strong>, essential for monitoring oral <strong>Warfarin</strong> therapy.
            </li>
            <li>
              <strong class="text-white">Common Pathway:</strong> Both pathways merge at <strong>Factor X activation</strong>, which converts Prothrombin (Factor II) to Thrombin (Factor IIa), which then converts Fibrinogen (Factor I) to insoluble Fibrin (Factor Ia).
            </li>
          </ul>
        </section>

        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            3. Blood Transfusion Reaction Protocols for Nurses
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Transfusion reactions represent a critical medical emergency. If a patient displays spikes in temperature, chills, low back pain, tachycardia, or severe dyspnea:
          </p>
          <ol class="list-decimal list-inside text-sm text-[#8b949e] pl-2 space-y-1.5">
            <li><strong class="text-white">Immediate Action:</strong> Stop the transfusion immediately. Do not discard the transfusion line or blood bag.</li>
            <li><strong class="text-white">Maintain Access:</strong> Disconnect the blood tube and hang a new bag of <strong>0.9% Normal Saline</strong> with clean tubing to maintain intravenous line patency. Do not flush the remaining blood left in the catheter.</li>
            <li><strong class="text-white">Notify:</strong> Alert the supervising physician and the hospital blood bank immediately.</li>
            <li><strong class="text-white">Document and Lab Check:</strong> Save the blood bag and tubing, collect patient blood/urine samples, and dispatch them to the laboratory for compatibility screening and hemolytic checks.</li>
          </ol>
        </section>
      </div>
    `
  },
  cho: {
    title: "Community Health Officer (CHO) Exam Syllabus & Local Health Policy Guide",
    subtitle: "Complete Guide to NHM CHO Recruitment, Rural Healthcare Deliveries, and Maternal Care Guidelines",
    keywords: ["CHO recruitment exam model", "NHM community health officer practice", "maternal child health indicators CHO", "rural health schemes India", "CHO past paper solutions"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Role of a Community Health Officer (CHO) under National Health Mission
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The <strong>Community Health Officer (CHO)</strong> plays a fundamental role at the sub-center level under the <strong>Ayushman Bharat</strong> initiative (Health and Wellness Centers). CHOs are key primary care providers who lead team efforts, evaluate rural health parameters, manage outpatient consultations, and implement national programs directly in local communities.
          </p>
        </section>
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. High-Yield CHO Syllabus Structure
          </h2>
          <ul class="list-disc list-inside text-sm text-[#8b949e] space-y-2">
            <li><strong>Public Health Concepts (30% weightage):</strong> Demographic indexes, immunization schedules, sanitation, disease control.</li>
            <li><strong>Maternal & Child Health (30% weightage):</strong> Prenatal care, nutrition during pregnancy, newborn care, breastfeeding methods, oral rehydration therapy.</li>
            <li><strong>Non-communicable Diseases (20% weightage):</strong> Screening for hypertension, diabetes, cervical and breast cancer at the grassroots level.</li>
          </ul>
        </section>
      </div>
    `
  },
  dsssb: {
    title: "DSSSB Staff Nurse Complete Selection Blueprint & Exam Pattern",
    subtitle: "High-Yield Study Syllabus, General Awareness Weights, and Mock Series for Delhi Government Hospital Recruitments",
    keywords: ["DSSSB staff nurse exam model", "Delhi nursing officer recruitment preparation", "DSSSB past solved papers", "nursing exam reasoning mathematics section", "DSSSB computer based test free"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Overview of Delhi Subordinate Services Selection Board (DSSSB) Nursing Recruitment
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Recruitment for Staff Nurses in Delhi Government Hospitals (such as LNJP, GTB, and GB Pant) is conducted by the <strong>DSSSB</strong>. These posts offer excellent urban benefits and a highly sought-after Delhi-NCR living experience.
          </p>
        </section>
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            2. DSSSB Double-Section Exam Scheme
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            The DSSSB exam comprises 200 questions (200 marks) divided into two separate sections:
          </p>
          <ul class="list-disc list-inside text-sm text-[#8b949e] space-y-2">
            <li><strong>Section A (100 Marks):</strong> General Awareness, General Intelligence & Reasoning Ability, Arithmetical & Numerical Ability, Test of Hindi Language, and Test of English Language (20 Marks each).</li>
            <li><strong>Section B (100 Marks):</strong> Professional Nursing Subject-Specific Questions.</li>
          </ul>
        </section>
      </div>
    `
  },
  subject_default: {
    title: "High-Yield Subject-Wise Nursing Officer Mock Exam Series",
    subtitle: "Sharpen Your Clinical Knowledge with Unit-Level Simulated Assessments Designed Specially for Central Government Staff Nurse Recruitments",
    keywords: ["nursing officer subject mock test", "medical surgical nursing MCQs", "fundamentals of nursing online exam", "community health staff nurse prep", "nursing active recall"],
    contentHtml: `
      <div class="prose max-w-none text-[#c9d1d9] font-sans space-y-8">
        <section class="space-y-4">
          <h2 class="text-xl md:text-2xl font-extrabold text-white tracking-tight border-b border-[#1e293b] pb-2">
            1. Why Subject-Wise Assessments Are Critical for Active Recall
          </h2>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            Attempting a massive 200-question full-length exam can be overwhelming, especially in the early phases of your preparation cycle. <strong>Subject-wise mock exams</strong> allow you to isolate individual nursing disciplines (such as Medical-Surgical Nursing, Pharmacology, or Pediatrics) and diagnose specific areas of cognitive weakness.
          </p>
          <p class="text-sm text-[#8b949e] leading-relaxed">
            By focusing on specific systems (like the cardiovascular system or fluid and electrolyte balance), you can link clinical theory with immediate active practice, solidifying your memory.
          </p>
        </section>
      </div>
    `
  }
};

export function getArticleForExam(examId: string): SeoArticle {
  const id = examId.toLowerCase();
  if (id.includes("norcet") || id.includes("aiims")) {
    return SEO_ARTICLES.aiims;
  }
  if (id.includes("wbhrb")) {
    return SEO_ARTICLES.wbhrb;
  }
  if (id.includes("esic")) {
    return SEO_ARTICLES.esic;
  }
  if (id.includes("rrb")) {
    return SEO_ARTICLES.rrb;
  }
  if (id.includes("cho")) {
    return SEO_ARTICLES.cho;
  }
  if (id.includes("dsssb")) {
    return SEO_ARTICLES.dsssb;
  }
  return SEO_ARTICLES.homepage;
}

export function getArticleForTest(subjectId: string, testId: string): SeoArticle {
  const cleanSubId = subjectId.toLowerCase();
  const cleanTestId = testId.toLowerCase();

  if (cleanSubId === "mock_tests" || cleanTestId.includes("mock") || cleanTestId.includes("norcet")) {
    return SEO_ARTICLES.aiims; // Use deep Central AIIMS guide
  }
  if (cleanTestId.includes("wbhrb")) {
    return SEO_ARTICLES.wbhrb;
  }
  if (cleanSubId === "anatomy" || cleanTestId.includes("anatomy") || cleanTestId.includes("cell")) {
    return SEO_ARTICLES.anatomy;
  }
  if (cleanSubId === "blood" || cleanTestId.includes("blood")) {
    return SEO_ARTICLES.blood;
  }
  if (cleanSubId === "med-surg" || cleanSubId === "med_surg") {
    return SEO_ARTICLES.esic;
  }
  if (cleanSubId === "community") {
    return SEO_ARTICLES.wbhrb;
  }

  return SEO_ARTICLES.subject_default;
}

