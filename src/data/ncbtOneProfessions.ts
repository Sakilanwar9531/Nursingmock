import { ProfessionConfig } from "../components/ProfessionNCBTOnePage";

export const NCBT_ONE_PROFESSIONS: Record<string, ProfessionConfig> = {
  nursing: {
    slug: "nursing",
    label: "Nursing",
    tint: "#388bfd",
    pyq: [
      {
        name: "Central & State Solved Papers",
        tests: [
          { id: "pyq-aiims-2024", title: "AIIMS NORCET 7.0 Paper 2024", qCount: 80, year: "2024", source: "AIIMS Central" },
          { id: "pyq-wbhrb-2026", title: "WBHRB Staff Nurse Grade II Paper 2026", qCount: 50, year: "2026", source: "WBHRB" },
          { id: "pyq-esic-2019", title: "ESIC Staff Nurse Paper 2019", qCount: 16, year: "2019", source: "ESIC New Delhi" },
          { id: "pyq-rrb-2019", title: "RRB Railway Staff Nurse Paper 2019", qCount: 22, year: "2019", source: "Railway Recruitment Board" },
          { id: "pyq-dsssb-2019", title: "DSSSB Staff Nurse Paper 2019", qCount: 20, year: "2019", source: "DSSSB Delhi" }
        ]
      }
    ],
    topicWise: [
      {
        name: "Core Clinical Specialties",
        tests: [
          { id: "anatomy-cell-drill", title: "Anatomy & Physiology: Cell & Tissues", qCount: 25, source: "INC Syllabus" },
          { id: "pharmacology-autonomic-1", title: "Pharmacology: ANS & Cardiovascular Drugs", qCount: 20, source: "INC Syllabus" },
          { id: "medsurg-cardio-1", title: "Medical-Surgical: Cardiovascular Disorders", qCount: 30, source: "High-Yield NORCET" },
          { id: "pediatrics-growth-1", title: "Pediatric Nursing: Growth & Milestones", qCount: 20, source: "INC Syllabus" },
          { id: "maternal-antenatal-1", title: "Maternal Nursing: Antenatal Assessment", qCount: 25, source: "INC Syllabus" }
        ]
      }
    ],
    practice: [
      {
        name: "High-Yield Sprints",
        tests: [
          { id: "sprint-anatomy", title: "Anatomy & Physiology 15-Min Sprint", qCount: 15 },
          { id: "sprint-pharmacology", title: "Clinical Pharmacology Speed Sprint", qCount: 15 },
          { id: "sprint-community", title: "Community Health Nursing Speed Sprint", qCount: 15 }
        ]
      }
    ],
    mock: [
      {
        name: "Full Length Mock Series",
        tests: [
          { id: "norcet-mock-1", title: "AIIMS NORCET Grand Mock Test 01", qCount: 100, source: "Real CBT Mode" },
          { id: "wbhrb-mock-1", title: "WBHRB Staff Nurse Speed Mock Test 01", qCount: 80, source: "Real CBT Mode" },
          { id: "esic-mock-1", title: "ESIC Nursing Officer Grand Mock 01", qCount: 100, source: "Real CBT Mode" }
        ]
      }
    ],
    notes: [
      {
        name: "Clinical Revision Guides",
        tests: [
          { id: "norcet-mock-1", title: "AIIMS NORCET High-Yield Clinical Values Handbook", qCount: 0, source: "PDF Guide" },
          { id: "wbhrb-mock-1", title: "WBHRB Nursing Procedure Cheat Sheet", qCount: 0, source: "PDF Guide" }
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
          { id: "sprint-pharmacology", title: "Pharmacology Rapid Recall Sprint", qCount: 15 },
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
          { id: "rrb-pharma-mock-1", title: "Essential Pharmacology Drug Classification Table", qCount: 0 }
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
          { id: "dmlt-mock-1", title: "Clinical Pathology Normal Reference Ranges", qCount: 0 }
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
          { id: "radiographer-mock-1", title: "AERB Safety Guidelines & Contrast Media Guide", qCount: 0 }
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
          { id: "ot-mock-1", title: "Sterilization & Disinfection Manual", qCount: 0 }
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
          { id: "pyq-aiims-2024", title: "AIIMS Hospital Physiotherapist Paper", qCount: 30, year: "2023", source: "AIIMS" }
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
          { id: "sprint-anatomy", title: "Musculoskeletal Anatomy Sprint", qCount: 15 }
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
          { id: "bpt-mock-1", title: "Muscle Origin, Insertion & Nerve Supply Chart", qCount: 0 }
        ]
      }
    ]
  }
};
