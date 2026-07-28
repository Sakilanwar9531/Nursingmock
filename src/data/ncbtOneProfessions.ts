import { ProfessionConfig } from "../components/ProfessionNCBTOnePage";

export const NCBT_ONE_PROFESSIONS: Record<string, ProfessionConfig> = {
  nursing: {
    slug: "nursing",
    label: "Nursing",
    tint: "#388bfd",
    pyq: [
      {
        name: "Central AIIMS & Federal Papers",
        tests: [
          { id: "pyq-aiims-2024", title: "AIIMS NORCET 7.0 Paper 2024", qCount: 80, year: "2024", source: "AIIMS Central" },
          { id: "pyq-aiims-2019", title: "AIIMS Nursing Officer Paper 2019", qCount: 18, year: "2019", source: "AIIMS New Delhi" },
          { id: "pyq-aiims-2018", title: "AIIMS Nursing Officer Paper 2018", qCount: 24, year: "2018", source: "AIIMS Jodhpur" },
          { id: "pyq-jipmer-2017", title: "JIPMER Staff Nurse Paper 2017", qCount: 15, year: "2017", source: "JIPMER Puducherry" }
        ]
      },
      {
        name: "State Health Boards & CHO",
        tests: [
          { id: "pyq-wbhrb-2026", title: "WBHRB Staff Nurse Grade II Paper 2026", qCount: 50, year: "2026", source: "WBHRB" },
          { id: "pyq-wbhrb-2025", title: "WBHRB CHO Exam Paper 2025", qCount: 40, year: "2025", source: "WB Health" },
          { id: "pyq-rpsc-2019", title: "RPSC Rajasthan Staff Nurse Paper 2019", qCount: 12, year: "2019", source: "RPSC Rajasthan" }
        ]
      },
      {
        name: "Railways & ESIC Hospitals",
        tests: [
          { id: "pyq-rrb-2019", title: "RRB Railway Staff Nurse Paper 2019", qCount: 22, year: "2019", source: "Railway Recruitment Board" },
          { id: "pyq-rrb-2015", title: "RRB Railway Staff Nurse Paper 2015", qCount: 19, year: "2015", source: "Railway Recruitment Board" },
          { id: "pyq-esic-2019", title: "ESIC Staff Nurse Paper 2019", qCount: 16, year: "2019", source: "ESIC New Delhi" },
          { id: "pyq-esic-2018", title: "ESIC Staff Nurse Paper 2018", qCount: 14, year: "2018", source: "ESIC Medical" }
        ]
      },
      {
        name: "Delhi Govt & Defense Services",
        tests: [
          { id: "pyq-dsssb-2019", title: "DSSSB Delhi Staff Nurse Paper 2019", qCount: 20, year: "2019", source: "DSSSB Delhi" },
          { id: "pyq-dsssb-2017", title: "DSSSB Delhi Staff Nurse Paper 2017", qCount: 18, year: "2017", source: "DSSSB Delhi" },
          { id: "pyq-bsf-2015", title: "BSF Border Security Force Staff Nurse 2015", qCount: 11, year: "2015", source: "BSF India" },
          { id: "pyq-ignou-2019", title: "IGNOU Post B.Sc Nursing Paper 2019", qCount: 9, year: "2019", source: "IGNOU New Delhi" }
        ]
      }
    ],
    topicWise: [
      {
        name: "Anatomy & Physiology",
        tests: [
          { id: "cell-tissues-1", title: "CELL & TISSUE - 1", qCount: 30, source: "INC Syllabus" },
          { id: "cell-tissues-2", title: "CELL & TISSUE - 2", qCount: 30, source: "INC Syllabus" },
          { id: "cell-tissues-3", title: "CELL & TISSUE - 3", qCount: 10, source: "INC Syllabus" },
          { id: "nervous-system-1", title: "NERVOUS SYSTEM - 1", qCount: 30, source: "AIIMS / ESIC" },
          { id: "nervous-system-2", title: "NERVOUS SYSTEM - 2", qCount: 30, source: "AIIMS / DSSSB" },
          { id: "nervous-system-3", title: "NERVOUS SYSTEM - 3", qCount: 21, source: "High-Yield NORCET" },
          { id: "blood-mock-1", title: "BLOOD & CIRCULATION - 1", qCount: 50, source: "AIIMS / RUHS" },
          { id: "blood-mock-2", title: "BLOOD & CIRCULATION - 2", qCount: 50, source: "AIIMS Patna" },
          { id: "blood-mock-3", title: "BLOOD & CIRCULATION - 3", qCount: 50, source: "AIIMS Jodhpur" },
          { id: "blood-mock-4", title: "BLOOD & CIRCULATION - 4", qCount: 50, source: "AIIMS Raipur" },
          { id: "blood-mock-5", title: "BLOOD & CIRCULATION - 5", qCount: 48, source: "AIIMS Bathinda" }
        ]
      },
      {
        name: "Medical-Surgical Nursing",
        tests: [
          { id: "ms-cardiac", title: "CARDIOVASCULAR SYSTEM - 1", qCount: 30, source: "High-Yield NORCET" },
          { id: "ms-neuro", title: "NEUROLOGICAL NURSING - 1", qCount: 25, source: "AIIMS Officer" },
          { id: "ms-respiratory", title: "RESPIRATORY NURSING - 1", qCount: 25, source: "ESIC Standard" },
          { id: "ms-renal", title: "RENAL NURSING - 1", qCount: 20, source: "RRB Railway" },
          { id: "ms-onco", title: "ONCOLOGY NURSING - 1", qCount: 20, source: "NORCET Target" },
          { id: "ms-gi", title: "GASTROINTESTINAL NURSING - 1", qCount: 20, source: "WBHRB Standard" }
        ]
      },
      {
        name: "Pharmacology in Nursing",
        tests: [
          { id: "pharmacology-autonomic-1", title: "CLINICAL PHARMACOLOGY - 1", qCount: 20, source: "INC Syllabus" },
          { id: "pharma-basics", title: "CLINICAL PHARMACOLOGY - 2", qCount: 15, source: "High-Yield" },
          { id: "pharma-antibiotics", title: "CLINICAL PHARMACOLOGY - 3", qCount: 20, source: "AIIMS Standard" },
          { id: "pharma-calculations", title: "CLINICAL PHARMACOLOGY - 4", qCount: 15, source: "Clinical Practical" }
        ]
      },
      {
        name: "Community Health Nursing",
        tests: [
          { id: "chn-basics", title: "COMMUNITY HEALTH NURSING - 1", qCount: 25, source: "INC Syllabus" },
          { id: "chn-epidemiology", title: "COMMUNITY HEALTH NURSING - 2", qCount: 20, source: "NHM / CHO" },
          { id: "chn-immunization", title: "COMMUNITY HEALTH NURSING - 3", qCount: 25, source: "UIP India" },
          { id: "chn-programs", title: "COMMUNITY HEALTH NURSING - 4", qCount: 20, source: "Health Ministry" }
        ]
      },
      {
        name: "Obstetrical & Midwifery Nursing",
        tests: [
          { id: "maternal-antenatal-1", title: "OBSTETRICS & MIDWIFERY - 1", qCount: 25, source: "INC Syllabus" },
          { id: "obs-labour", title: "OBSTETRICS & MIDWIFERY - 2", qCount: 25, source: "NORCET High-Yield" },
          { id: "obs-postnatal", title: "OBSTETRICS & MIDWIFERY - 3", qCount: 20, source: "AIIMS Nursing" },
          { id: "obs-hrc", title: "OBSTETRICS & MIDWIFERY - 4", qCount: 20, source: "AIIMS Clinical" }
        ]
      },
      {
        name: "Pediatric Nursing",
        tests: [
          { id: "pediatrics-growth-1", title: "PEDIATRIC NURSING - 1", qCount: 20, source: "INC Syllabus" },
          { id: "ped-newborn", title: "PEDIATRIC NURSING - 2", qCount: 20, source: "NICU Standard" },
          { id: "ped-disorders", title: "PEDIATRIC NURSING - 3", qCount: 20, source: "AIIMS / UNICEF" }
        ]
      },
      {
        name: "Mental Health Nursing",
        tests: [
          { id: "mhn-concepts", title: "MENTAL HEALTH NURSING - 1", qCount: 20, source: "INC Syllabus" },
          { id: "mhn-disorders", title: "MENTAL HEALTH NURSING - 2", qCount: 20, source: "NORCET Target" },
          { id: "mhn-drugs", title: "MENTAL HEALTH NURSING - 3", qCount: 20, source: "Clinical Psych" }
        ]
      },
      {
        name: "Fundamentals of Nursing",
        tests: [
          { id: "fun-vitals", title: "FUNDAMENTALS OF NURSING - 1", qCount: 25, source: "INC Syllabus" },
          { id: "fun-infection", title: "FUNDAMENTALS OF NURSING - 2", qCount: 25, source: "CDC / NABH" },
          { id: "fun-procedures", title: "FUNDAMENTALS OF NURSING - 3", qCount: 25, source: "Practical Skills" }
        ]
      }
    ],
    practice: [
      {
        name: "Speed Practice Sprints",
        tests: [
          { id: "sprint-anatomy", title: "Anatomy & Physiology 15-Min Rapid Sprint", qCount: 15 },
          { id: "sprint-pharmacology", title: "Clinical Pharmacology Speed Sprint", qCount: 15 },
          { id: "sprint-community", title: "Community Health Nursing Speed Sprint", qCount: 15 },
          { id: "sprint-medsurg", title: "Med-Surg Emergency Clinical Sprint", qCount: 15 },
          { id: "sprint-maternal", title: "Midwifery & Obstetrical Speed Sprint", qCount: 15 },
          { id: "sprint-pediatric", title: "Pediatric Nursing Speed Sprint", qCount: 15 }
        ]
      }
    ],
    mock: [
      {
        name: "All India Grand Mock Series",
        tests: [
          { id: "norcet-mock-1", title: "AIIMS NORCET Grand CBT Mock 01", qCount: 100, source: "Real CBT Mode" },
          { id: "norcet-mock-2", title: "AIIMS NORCET Grand CBT Mock 02", qCount: 100, source: "Real CBT Mode" },
          { id: "wbhrb-mock-1", title: "WBHRB Staff Nurse Speed Mock Test 01", qCount: 80, source: "Real CBT Mode" },
          { id: "esic-mock-1", title: "ESIC Nursing Officer Grand Mock 01", qCount: 100, source: "Real CBT Mode" },
          { id: "rrb-mock-1", title: "RRB Railway Staff Nurse Grand Mock 01", qCount: 100, source: "Real CBT Mode" }
        ]
      }
    ],
    notes: [
      {
        name: "Clinical Revision Handbooks",
        tests: [
          { id: "note-norcet-values", title: "AIIMS NORCET High-Yield Clinical Normal Reference Values", qCount: 0, source: "PDF Guide" },
          { id: "note-wbhrb-sheet", title: "WBHRB Nursing Procedure & Viva Cheat Sheet", qCount: 0, source: "PDF Guide" },
          { id: "note-abg-guide", title: "Arterial Blood Gas (ABG) Clinical ROME Analysis Guide", qCount: 0, source: "Quick Ref" },
          { id: "note-drug-calc", title: "Emergency Drug Dosage & IV Flow Rate Formula Handbook", qCount: 0, source: "Quick Ref" }
        ]
      }
    ]
  },

  pharma: {
    slug: "pharma",
    label: "Pharmacist",
    tint: "#10b981",
    pyq: [
      {
        name: "Pharmacist Solved Papers",
        tests: [
          { id: "pyq-rrb-pharmacist-2019", title: "RRB Pharmacist Grade III Paper 2019", qCount: 35, year: "2019", source: "RRB" },
          { id: "pyq-esic-pharmacist-2019", title: "ESIC Pharmacist Paper 2019", qCount: 30, year: "2019", source: "ESIC" },
          { id: "pyq-wbhrb-pharmacist-2021", title: "WBHRB Pharmacist Paper 2021", qCount: 25, year: "2021", source: "WBHRB" },
          { id: "pyq-drug-inspector-2020", title: "Drug Inspector Officer Paper 2020", qCount: 20, year: "2020", source: "Central/State DI" }
        ]
      }
    ],
    topicWise: [
      {
        name: "Pharmaceutical Sciences",
        tests: [
          { id: "pharmaceutics-dosage-1", title: "Pharmaceutics: Dosage Forms & Formulations", qCount: 25 },
          { id: "pharmacology-action-1", title: "Pharmacology: Drug Classification & Mechanism", qCount: 30 },
          { id: "pharmacognosy-herbal-1", title: "Pharmacognosy: Alkaloids & Glycosides", qCount: 20 },
          { id: "jurisprudence-acts-1", title: "Pharmaceutical Jurisprudence: Drugs & Cosmetics Act", qCount: 20 }
        ]
      }
    ],
    practice: [
      {
        name: "Speed Practice Drills",
        tests: [
          { id: "sprint-pharma-pharmacology", title: "Pharmacology Rapid Recall Sprint", qCount: 15 },
          { id: "sprint-pharmacist_science", title: "Pharmaceutics Core Sprints", qCount: 15 }
        ]
      }
    ],
    mock: [
      {
        name: "Full Length Mock Series",
        tests: [
          { id: "rrb-pharma-mock-1", title: "RRB Pharmacist Grand Mock Test 01", qCount: 100 },
          { id: "esic-pharma-mock-1", title: "ESIC Pharmacist Full Mock Test 01", qCount: 100 }
        ]
      }
    ],
    notes: [
      {
        name: "Smart Notes & Formulae",
        tests: [
          { id: "rrb-pharma-note-1", title: "Essential Pharmacology Drug Classification Table", qCount: 0 }
        ]
      }
    ]
  },

  "lab-technician": {
    slug: "lab-technician",
    label: "Lab Technician",
    tint: "#8b5cf6",
    pyq: [
      {
        name: "Lab Tech Solved Papers",
        tests: [
          { id: "pyq-aiims-labtech-2022", title: "AIIMS Lab Tech Grade II Paper 2022", qCount: 30, year: "2022", source: "AIIMS" },
          { id: "pyq-rrb-labtech-2019", title: "RRB Lab Superintendent Paper 2019", qCount: 25, year: "2019", source: "RRB" },
          { id: "pyq-dmlt-labtech-2021", title: "DMLT State Pathology Paper 2021", qCount: 30, year: "2021", source: "State Pathology Board" }
        ]
      }
    ],
    topicWise: [
      {
        name: "Pathology & Diagnostics",
        tests: [
          { id: "dmlt-hematology-1", title: "Hematology: Blood Cell Counting & Staining", qCount: 25 },
          { id: "dmlt-biochem-1", title: "Biochemistry: Enzyymology & Clinical Profiles", qCount: 25 },
          { id: "dmlt-microbio-1", title: "Microbiology: Culture Media & Stains", qCount: 20 },
          { id: "dmlt-bloodbank-1", title: "Blood Banking & Cross-matching Protocols", qCount: 20 }
        ]
      }
    ],
    practice: [
      {
        name: "Diagnostic Drills",
        tests: [
          { id: "sprint-lab_tech_dmlt", title: "DMLT Clinical Pathology Sprint", qCount: 15 }
        ]
      }
    ],
    mock: [
      {
        name: "Full Length Mock Series",
        tests: [
          { id: "dmlt-mock-1", title: "AIIMS / RRB Lab Technician Grand Mock 01", qCount: 100 }
        ]
      }
    ],
    notes: [
      {
        name: "Pathology Staining Manuals",
        tests: [
          { id: "dmlt-note-1", title: "Clinical Pathology Normal Reference Ranges", qCount: 0 }
        ]
      }
    ]
  },

  radiographer: {
    slug: "radiographer",
    label: "Radiographer",
    tint: "#06b6d4",
    pyq: [
      {
        name: "Radiography Solved Papers",
        tests: [
          { id: "pyq-radiographer-cbt-2019", title: "RRB Radiographer & X-Ray Paper 2019", qCount: 30, year: "2019", source: "RRB" },
          { id: "pyq-ct-mri-tech-2020", title: "ESIC CT MRI Specialist Paper 2020", qCount: 20, year: "2020", source: "ESIC" }
        ]
      }
    ],
    topicWise: [
      {
        name: "Imaging Technology",
        tests: [
          { id: "radiography-physics-1", title: "Radiation Physics & X-Ray Tube Design", qCount: 25 },
          { id: "radiography-positioning-1", title: "Radiographic Positioning & Techniques", qCount: 25 },
          { id: "radiography-ctmri-1", title: "Computed Tomography (CT) & MRI Physics", qCount: 20 },
          { id: "radiography-protection-1", title: "Radiation Protection & Safety Rules", qCount: 20 }
        ]
      }
    ],
    practice: [
      {
        name: "Imaging Speed Drills",
        tests: [
          { id: "sprint-radiography_xray", title: "X-Ray & Radiographic Positioning Sprint", qCount: 15 }
        ]
      }
    ],
    mock: [
      {
        name: "Full Length Mock Series",
        tests: [
          { id: "radiographer-mock-1", title: "Radiographer & X-Ray Technician Full Mock 01", qCount: 100 }
        ]
      }
    ],
    notes: [
      {
        name: "Radiation Safety Handbooks",
        tests: [
          { id: "radiographer-note-1", title: "AERB Safety Guidelines & Contrast Media Guide", qCount: 0 }
        ]
      }
    ]
  },

  "ot-technician": {
    slug: "ot-technician",
    label: "OT Technician",
    tint: "#f59e0b",
    pyq: [
      {
        name: "Paramedical Solved Papers",
        tests: [
          { id: "pyq-ot-technician-2022", title: "AIIMS Surgical OT Tech Paper 2022", qCount: 25, year: "2022", source: "AIIMS" },
          { id: "pyq-ophthalmic-assistant-2019", title: "RRB Ophthalmic Tech Paper 2019", qCount: 20, year: "2019", source: "RRB" },
          { id: "pyq-dialysis-tech-2020", title: "ESIC Dialysis Tech Paper 2020", qCount: 20, year: "2020", source: "ESIC" }
        ]
      }
    ],
    topicWise: [
      {
        name: "Surgical & OT Procedures",
        tests: [
          { id: "ot-sterilization-1", title: "Autoclaving & Sterilization Protocols", qCount: 25 },
          { id: "ot-anesthesia-1", title: "Anesthesia Workstation & Airway Management", qCount: 25 },
          { id: "ot-instruments-1", title: "Surgical Instrument Identification", qCount: 20 }
        ]
      }
    ],
    practice: [
      {
        name: "Surgical Speed Drills",
        tests: [
          { id: "sprint-paramedical_ot", title: "Surgical OT Practice Sprint", qCount: 15 }
        ]
      }
    ],
    mock: [
      {
        name: "Full Length Mock Series",
        tests: [
          { id: "ot-mock-1", title: "Surgical OT Technician Grand Mock 01", qCount: 100 }
        ]
      }
    ],
    notes: [
      {
        name: "Surgical Protocols",
        tests: [
          { id: "ot-note-1", title: "Sterilization & Disinfection Manual", qCount: 0 }
        ]
      }
    ]
  },

  physiotherapist: {
    slug: "physiotherapist",
    label: "Physiotherapist",
    tint: "#ec4899",
    pyq: [
      {
        name: "Physiotherapy Solved Papers",
        tests: [
          { id: "pyq-aiims-physio-2023", title: "AIIMS Hospital Physiotherapist Paper", qCount: 30, year: "2023", source: "AIIMS" }
        ]
      }
    ],
    topicWise: [
      {
        name: "Rehabilitation & Kinesiology",
        tests: [
          { id: "bpt-biomechanics-1", title: "Biomechanics & Kinesiology Principles", qCount: 25 },
          { id: "bpt-electrotherapy-1", title: "Electrotherapy Modalities & Dosage", qCount: 25 },
          { id: "bpt-neurorehab-1", title: "Neuro-Rehabilitation & Motor Control", qCount: 20 }
        ]
      }
    ],
    practice: [
      {
        name: "Rehab Speed Sprints",
        tests: [
          { id: "sprint-physio-anatomy", title: "Musculoskeletal Anatomy Sprint", qCount: 15 }
        ]
      }
    ],
    mock: [
      {
        name: "Full Length Mock Series",
        tests: [
          { id: "bpt-mock-1", title: "AIIMS & RRB Physiotherapist Grand Mock 01", qCount: 100 }
        ]
      }
    ],
    notes: [
      {
        name: "Kinesiology Guides",
        tests: [
          { id: "bpt-note-1", title: "Muscle Origin, Insertion & Nerve Supply Chart", qCount: 0 }
        ]
      }
    ]
  }
};

// Map short & alternate slug aliases so every profession button works directly
NCBT_ONE_PROFESSIONS["physio"] = NCBT_ONE_PROFESSIONS["physiotherapist"];
NCBT_ONE_PROFESSIONS["labtech"] = NCBT_ONE_PROFESSIONS["lab-technician"];
NCBT_ONE_PROFESSIONS["radiography"] = NCBT_ONE_PROFESSIONS["radiographer"];
NCBT_ONE_PROFESSIONS["ot-icu"] = NCBT_ONE_PROFESSIONS["ot-technician"];
NCBT_ONE_PROFESSIONS["pharmacist"] = NCBT_ONE_PROFESSIONS["pharma"];
NCBT_ONE_PROFESSIONS["lab-tech"] = NCBT_ONE_PROFESSIONS["lab-technician"];

