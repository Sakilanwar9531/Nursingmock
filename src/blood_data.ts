import { Test, Question } from "./types";

// ==========================================
// MOCK 1: HEMATOPHYSIOLOGY & RED BLOOD CELLS (50 Questions)
// ==========================================
export const MOCK_1_DATA: Question[] = [
  {
    q: "A nursing officer is evaluating the arterial blood gas (ABG) report of an adult patient. Which of the following pH values indicates a normal physiological state of human blood?",
    opts: ["6.85 to 6.95", "7.15 to 7.25", "7.35 to 7.45", "7.55 to 7.65"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I Staff Nurse",
    explain: "Normal human blood is slightly alkaline, with a stable arterial pH range of 7.35 to 7.45. Any value below 7.35 indicates acidosis, while any value above 7.45 indicates alkalosis."
  },
  {
    q: "While caring for a critically unstable patient in the Coronary Care Unit (CCU), the nurse draws arterial blood. What is considered the absolute average normal pH of arterial blood?",
    opts: ["7.0", "7.2", "7.42", "7.6"],
    ans: 2,
    source: "BHU Nursing Officer Exam",
    explain: "The ideal physiological midpoint for human arterial blood pH is approximately 7.40 to 7.42. This represents a normal homeostasis."
  },
  {
    q: "A tutor asks a nursing student to define blood from a biochemical perspective. Blood is technically classified as a:",
    opts: ["Purely acidic solution", "Strongly alkaline solution", "Buffer solution", "Neutral saline suspension"],
    ans: 2,
    source: "HPSSC Staff Nurse Paper",
    explain: "Blood acts as a biological buffer solution. It contains carbonic acid-bicarbonate buffer systems that prevent drastic changes in pH when metabolic acids or bases are added."
  },
  {
    q: "What is the approximate water content found in human blood plasma?",
    opts: ["50% to 55%", "65% to 75%", "90% to 92%", "98% to 100%"],
    ans: 2,
    source: "LNJP Delhi Staff Nurse",
    explain: "Blood plasma consists of approximately 90% to 92% water, with the remaining 8% to 10% made of proteins (albumin, globulin, fibrinogen), electrolytes, waste, and nutrients."
  },
  {
    q: "Which of the following elements collectively comprise the cellular and liquid portions of whole blood?",
    opts: ["Red blood cells and white blood cells only", "Erythrocytes, leukocytes, and thrombocytes only", "Plasma, electrolytes, and water only", "Erythrocytes, leukocytes, platelets, and plasma"],
    ans: 3,
    source: "ESIC Staff Nurse Exam",
    explain: "Whole blood is composed of liquid plasma (about 55%) and formed cellular elements (about 45%) which include erythrocytes (RBCs), leukocytes (WBCs), and thrombocytes (platelets)."
  },
  {
    q: "During a routine health check-up, a patient asks what the normal reference range is for total serum cholesterol in a healthy adult. The nursing officer advises it should be:",
    opts: ["Less than 200 mg/dL", "Between 250 and 300 mg/dL", "More than 350 mg/dL", "Exactly 400 mg/dL"],
    ans: 0,
    source: "DSSSB Staff Nurse",
    explain: "A healthy adult's desirable total cholesterol level is less than 200 mg/dL. Levels above 240 mg/dL are classified as high risk for cardiovascular disease."
  },
  {
    q: "The breakdown of old and damaged erythrocytes in the spleen leads to the production of which yellow-pigmented substance?",
    opts: ["Hemoglobin", "Bilirubin", "Transferrin", "Globin"],
    ans: 1,
    source: "RUHS M.Sc Nursing Entrance",
    explain: "Erythrocyte destruction in the mononuclear phagocyte system (spleen/liver) breaks hemoglobin into heme and globin. The heme is metabolized into iron and biliverdin, which quickly converts to bilirubin."
  },
  {
    q: "A patient presents with massive hemolysis due to an incompatible blood transfusion. The nurse should closely monitor for the clinical accumulation of:",
    opts: ["Direct and indirect bilirubin", "Mineral crystals", "Serum albumin", "Globulin chains"],
    ans: 0,
    source: "NVS Staff Nurse Exam",
    explain: "Excessive, rapid hemolysis releases massive amounts of hemoglobin into the bloodstream, which is converted to indirect bilirubin. This can overwhelm the liver, leading to clinical jaundice."
  },
  {
    q: "Which of the following proteins is NOT synthesized or normally classified as a plasma protein circulating in the blood?",
    opts: ["Albumin", "Globulin", "Myosin", "Fibrinogen"],
    ans: 2,
    source: "UPPSC U.P. Staff Nurse",
    explain: "Myosin is a structural contractile protein found in muscle tissue, not a circulating plasma protein. Albumin, globulin, and fibrinogen are the primary circulating plasma proteins."
  },
  {
    q: "Which of the following plasma proteins plays the primary role in maintaining the colloid osmotic (oncotic) pressure of blood?",
    opts: ["Fibrinogen", "Albumin", "Globulin", "Prothrombin"],
    ans: 1,
    source: "ESIC Hospital Staff Nurse",
    explain: "Albumin is the smallest and most abundant plasma protein. Due to its high concentration and molecular weight, it is responsible for roughly 80% of the blood's colloid osmotic pressure."
  },
  {
    q: "Colloid osmotic (oncotic) pressure in the microcirculation is best defined as:",
    opts: ["The pressure exerted by dissolved electrolytes in the interstitial space", "The pulling force exerted by large plasma proteins inside the capillary tube", "The pushing force of blood pressure against capillary walls", "The gravitational pull of systemic fluids"],
    ans: 1,
    source: "NVS Staff Nurse Practice",
    explain: "Oncotic pressure is a form of osmotic pressure exerted by colloids (mainly proteins like albumin) in a blood vessel's plasma that tends to pull water back into the circulatory system."
  },
  {
    q: "What percentage of total circulating plasma proteins is comprised of Albumin?",
    opts: ["10% to 20%", "20% to 30%", "40% to 60%", "80% to 90%"],
    ans: 2,
    source: "Ruhs Post Basic B.Sc Entrance",
    explain: "Albumin constitutes approximately 40% to 60% of the total plasma protein content in healthy citizens (~3.5 to 5.0 g/dL)."
  },
  {
    q: "A patient with severe liver cirrhosis has a serum albumin of 1.8 g/dL. Which of the following clinical signs should the nurse anticipate?",
    opts: ["Severe dehydration", "Widespread peripheral edema and ascites", "Thrombus formation in deep veins", "Polycythemia"],
    ans: 1,
    source: "AIIMS Raipur Special Test",
    explain: "When albumin drops significantly, the intravascular oncotic pressure falls. Hydrostatic pressure wins, net fluid leaking into interstitial tissue occurs, causing generalized edema and ascites."
  },
  {
    q: "The force that works to push water and solutes out of the capillary bed into the tissue space is:",
    opts: ["Oncotic pressure", "Osmotic pressure", "Hydrostatic pressure", "Tissue pressure"],
    ans: 2,
    source: "Jhalawar Medical College",
    explain: "Hydrostatic pressure is the blood pressure inside the capillaries that pushes water and fluids out into the interstitial tissues. It is opposed by the pulling force of oncotic pressure."
  },
  {
    q: "When hemoglobin bind securely and reversibly with oxygen in the alveolar capillaries, the resulting compound is:",
    opts: ["Oxyhemoglobin", "Carbaminohemoglobin", "Deoxyhemoglobin", "Methemoglobin"],
    ans: 0,
    source: "RUHS Grade II Nurse",
    explain: "Oxygen combines with the iron-containing heme part of hemoglobin to form oxyhemoglobin. When oxygen is released at the tissues, it becomes deoxyhemoglobin."
  },
  {
    q: "Carbon dioxide combines with the globin amino groups of hemoglobin to circulate through venous blood as:",
    opts: ["Carboxyhemoglobin", "Oxyhemoglobin", "Carbaminohemoglobin", "Methemoglobin"],
    ans: 2,
    source: "RUHS Nursing Entrance",
    explain: "Carbon dioxide binds to the globin polypeptide chains of hemoglobin to form carbaminohemoglobin (reversibly). CO2 does not compete for the iron site where oxygen binds."
  },
  {
    q: "What is the normal expected life span of circulating red blood cells (RBCs) in a healthy adult?",
    opts: ["60 days", "80 days", "100 days", "120 days"],
    ans: 3,
    source: "RPSC Raj. Staff Nurse",
    explain: "In adults, mature red blood cells circulate for approximately 120 days before becoming fragile and being engulfed by splenic macrophages."
  },
  {
    q: "What is the normal expected life span of circulating red blood cells (RBCs) in a newborn infant?",
    opts: ["60 to 80 days", "100 to 120 days", "140 to 150 days", "Over 180 days"],
    ans: 0,
    source: "IGNOU Nursing Officer",
    explain: "Fetal and neonatal RBCs have a shorter lifespan of approximately 60 to 80 days compared to adult red blood cells due to their distinct metabolic properties and fragility."
  },
  {
    q: "In healthy adult citizens, where is the primary site of hematopoiesis (blood cell production)?",
    opts: ["Yellow bone marrow", "Spleen", "Liver", "Red bone marrow"],
    ans: 3,
    source: "ESIC All-India Staff Nurse",
    explain: "In adults, active hematopoiesis takes place exclusively in the red bone marrow of flat bones (such as the ribs, pelvis, sternum, and skull) and proximal epiphyses of long bones."
  },
  {
    q: "During the first 2 to 3 months of intrauterine fetal development, which anatomical site is responsible for blood cell synthesis?",
    opts: ["Spleen", "Yolk sac", "Liver", "Fetal bone marrow"],
    ans: 1,
    source: "AIIMS Bhopal Nursing Officer",
    explain: "The primitive hematopoiesis begins inside the fetal yolk sac in the first weeks of embryonic life. Later (around 2-6 months), the spleen and liver dominate before bone marrow takes over."
  },
  {
    q: "Between the 3rd and 6th month of pregnancy, which fetal organ is the primary active site of hematopoiesis?",
    opts: ["Yolk sac", "Thymus", "Liver", "Yellow bone marrow"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I",
    explain: "From the second month until mid-pregnancy, the fetal liver is the primary hematopoietic organ, supported by the spleen, until bone marrow bone cavities form."
  },
  {
    q: "The medical term representing the physiological process of red blood cell formation is:",
    opts: ["Leukopoiesis", "Thrombopoiesis", "Erythropoiesis", "Hemostasis"],
    ans: 2,
    source: "IGNOU Post B.Sc Nursing",
    explain: "Erythropoiesis is the specifically regulated feedback-loop process of producing new erythrocytes from hematopoietic stem cells in the red marrow."
  },
  {
    q: "Which specific cell structural feature restricts red blood cells from reproducing, repairing their membranes, and limits their life?",
    opts: ["Biconcave shape", "Absence of a nucleus", "Presence of heme groups", "Thin cellular membrane"],
    ans: 3,
    source: "RRB Staff Nurse Exam",
    explain: "Mature erythrocytes lack a nucleus, ribosomes, and mitochondria. Because they cannot synthesize new proteins or repair cellular damage, they wear out after 120 days."
  },
  {
    q: "A healthy adult male has a normal red blood cell count of approximately:",
    opts: ["1.5 to 2.5 million/µL", "3.0 to 4.0 million/µL", "4.5 to 6.0 million/µL", "8.0 to 10.0 million/µL"],
    ans: 2,
    source: "ESIC Nursing Specialist",
    explain: "The normal reference range of RBCs in adult males is 4.5 to 6.0 million/µL. For adult females, it is slightly lower at 4.0 to 5.0 million/µL."
  },
  {
    q: "In an adult patient, which cellular organelle is responsible for synthesizing hemoglobin chains before the nucleus is extruded?",
    opts: ["Mitochondria", "Ribosomes", "Lysosomes", "Centrosomes"],
    ans: 1,
    source: "RPSC Staff Nurse Exam",
    explain: "Globin proteins are synthesized on the ribosomes of erythroblasts, while heme groups are produced inside the mitochondria of these developing cells."
  },
  {
    q: "Which hormone, produced mainly by the kidneys, stimulates the bone marrow to produce erythrocytes in response to tissue hypoxia?",
    opts: ["Aldosterone", "Erythropoietin", "Thrombopoietin", "Renin"],
    ans: 1,
    source: "RUHS M.Sc Entrance Exam",
    explain: "Erythropoietin (EPO) is a glycoprotein hormone released by renal peritubular interstitial cells during hypoxia. EPO signals erythroid progenitors to proliferate in the bone marrow."
  },
  {
    q: "When evaluating a patient's CBC, a reticulocyte count of 1.5% is noted. What are reticulocytes?",
    opts: ["Degenerating platelets", "Immature red blood cells", "Antibody-producing leukocytes", "Disintegrated stem cells"],
    ans: 1,
    source: "BSF Staff Nurse Special",
    explain: "Reticulocytes are immature erythrocytes that contain residual ribosomal RNA. They circulate in blood for 24-48 hours before fully maturing. Normal levels are 0.5% to 2.0%."
  },
  {
    q: "Which chemical element is absolutely indispensable for the proper synthesis of the oxygen-binding heme portion of hemoglobin?",
    opts: ["Calcium", "Magnesium", "Iron", "Zinc"],
    ans: 2,
    source: "RRB Delhi Recruitment",
    explain: "Iron (Fe2+) is the central atom of the heme ring. It binds oxygen molecules reversibly; without iron, functional hemoglobin cannot be synthesized."
  },
  {
    q: "Standard adult hemoglobin (HbA) consists of which polypeptide globin chain combination?",
    opts: ["Two alpha and two gamma chains", "Two alpha and two beta chains", "Two beta and two delta chains", "Four beta chains"],
    ans: 1,
    source: "AIIMS Nagpur Nursing Officer",
    explain: "Circulating HbA in adult humans consists of two alpha (α) globin chains and two beta (β) globin chains, each bound with an oxygen-binding heme group."
  },
  {
    q: "Normal fetal hemoglobin (HbF) consists of which polypeptide chain configuration?",
    opts: ["Two alpha and two beta chains", "Two alpha and two gamma chains", "Two alpha and two delta chains", "Four alpha chains"],
    ans: 1,
    source: "BHU Staff Nurse Paper",
    explain: "HbF consists of two alpha and two gamma (γ) chains. Gamma chains have a higher affinity for oxygen, enabling the fetus to extract oxygen from maternal blood across the placenta."
  },
  {
    q: "By what age is fetal hemoglobin (HbF) typically replaced almost entirely by adult hemoglobin (HbA) in a healthy baby?",
    opts: ["Within 15 days of birth", "By 6 months of age", "By 2 years of age", "Exactly at puberty"],
    ans: 1,
    source: "IGNOU Post Basic B.Sc",
    explain: "Fetal hemoglobin (HbF) is progressively replaced by HbA after birth. By 6 months of age, HbF drops to less than 1% to 2% of total circulating hemoglobin."
  },
  {
    q: "A healthy adult female has a normal hemoglobin (Hb) level of approximately:",
    opts: ["8 to 10 g/dL", "12 to 16 g/dL", "16 to 20 g/dL", "Above 22 g/dL"],
    ans: 1,
    source: "ESIC Nursing Specialist",
    explain: "The standard physiological hemoglobin reference range is 12 to 16 g/dL for non-pregnant adult females, and 14 to 18 g/dL for adult males."
  },
  {
    q: "What is the standard physiological threshold of hemoglobin under which an adult pregnant female is clinically diagnosed with anemia according to WHO guidelines?",
    opts: ["Less than 11.0 g/dL", "Less than 12.5 g/dL", "Less than 13.5 g/dL", "Less than 14.5 g/dL"],
    ans: 0,
    source: "JIPMER Staff Nurse Paper",
    explain: "According to the WHO, anemia in pregnant women is defined as a hemoglobin level of less than 11.0 g/dL. (In non-pregnant females, the threshold is less than 12.0 g/dL)."
  },
  {
    q: "Which physiological adaptation occurs in patients living at high altitudes (e.g., Himalayas) to compensate for low atmospheric oxygen partial pressure?",
    opts: ["Decreased blood volume", "Profound leukocytosis", "Increased erythropoietin release and secondary polycythemia", "Thrombocytopenia"],
    ans: 2,
    source: "RPSC Staff Nurse Career",
    explain: "High-altitude low oxygen pressure triggers the kidneys to secrete erythropoietin (EPO). This stimulates bone marrow to make more RBCs (secondary polycythemia), maximizing oxygen delivery."
  },
  {
    q: "A patient with Chronic Obstructive Pulmonary Disease (COPD) has a hematocrit (Hct) of 57%. The nursing officer understands this is a result of:",
    opts: ["Renal failure", "Chronic hypoxia triggering increased RBC production", "Spontaneous blood loss", "Plasma volume expansion"],
    ans: 1,
    source: "AIIMS Patna Staff Nurse",
    explain: "Chronic hypoxemia in COPD triggers persistent renal stimulation of EPO, leading to compensatory erythrocyte production. This elevates the hematocrit to increase oxygen-carrying capacity."
  },
  {
    q: "Hematocrit (Hct) or Packed Cell Volume (PCV) is clinically defined as:",
    opts: ["The total weight of iron per deciliter of blood", "The concentration of leukocytes inside the plasma", "The volume percentage of whole blood that is made up of red blood cells", "The pressure generated by platelets on capillary walls"],
    ans: 2,
    source: "DSSSB Practice Exam",
    explain: "Hematocrit (or PCV) is the percentage of total blood volume that consists of packed red blood cells after being centrifuged."
  },
  {
    q: "Which of the following is considered a normal Packed Cell Volume (PCV/Hematocrit) range for an adult female?",
    opts: ["20% to 30%", "37% to 47%", "50% to 60%", "70% to 80%"],
    ans: 1,
    source: "RUHS M.Sc Entrance Exam",
    explain: "Normal PCV for adult females is typically 37% to 47%. For adult males, it ranges from 40% to 54%, reflecting their larger body mass and higher testosterone."
  },
  {
    q: "Megaloblastic changes in the bone marrow and giant macrocytic RBCs in the blood are primary indicators of a deficiency in:",
    opts: ["Iron or Calcium", "Vitamin B12 or Folic Acid", "Vitamin C or Vitamin K", "Copper or Zinc"],
    ans: 1,
    source: "AIIMS Raipur Exam Prep",
    explain: "Vitamin B12 and folate are essential cofactors for DNA synthesis. When deficient, DNA replication stalls during erythrocyte division, leading to large, abnormal macrocytic cells."
  },
  {
    q: "Which specific substance, synthesized by gastric parietal cells, is essential for the systemic absorption of dietary Vitamin B12 in the terminal ileum?",
    opts: ["Hydrochloric acid", "Intrinsic factor", "Pepsinogen", "Gastrin"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Intrinsic factor is a glycoprotein manufactured by the stomach's parietal cells. It binds to Vitamin B12, protecting it from digestion until it is absorbed in the terminal ileum."
  },
  {
    q: "A patient develops autoantibodies that destroy gastric parietal cells, resulting in a severe intrinsic factor deficiency. The nurse expects a diagnosis of:",
    opts: ["Iron deficiency anemia", "Aplastic anemia", "Pernicious anemia", "Thalassemia major"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I",
    explain: "Pernicious anemia is a specific autoimmune disease characterized by mucosal atrophy and destruction of gastric parietal cells, leading to Vitamin B12 malabsorption."
  },
  {
    q: "Which of the following clinical signs is unique to Vitamin B12 deficiency (pernicious anemia) but absent in folate deficiency?",
    opts: ["Severe fatigue and dyspnea", "Glossitis (red beefy tongue)", "Demyelinating neurological symptoms (paresthesias, ataxia)", "Anorexia and weight loss"],
    ans: 2,
    source: "BHU Staff Nurse",
    explain: "Vitamin B12 is essential for myelin sheath maintenance in the nervous system. Deficiencies cause progressive neurological damage, such as peripheral numbness, paresthesias, and ataxia."
  },
  {
    q: "A nursing officer is administering oral iron supplements to a pediatric patient with iron deficiency anemia. To facilitate maximum chemical absorption, the supplemental dose should be administered with:",
    opts: ["A glass of warm milk", "An antacid liquid", "Orange juice or Vitamin C", "A cup of hot tea"],
    ans: 2,
    source: "ESIC Staff Nurse Exam",
    explain: "Vitamin C (ascorbic acid) keeps iron in its soluble ferrous state (Fe2+) rather than the insoluble ferric state (Fe3+), enhancing absorption in the duodenum."
  },
  {
    q: "Which of the following dietary compounds inhibits iron absorption and should not be consumed concurrently with iron supplements?",
    opts: ["Ascorbic acid", "Fructose", "Tannins in tea and Calcium in milk", "Amino acids"],
    ans: 2,
    source: "RPSC Staff Nurse",
    explain: "Tannins in tea, phytates in bran, and calcium (milk) form insoluble complexes with iron, impairing absorption."
  },
  {
    q: "A patient on oral therapeutical iron notes that their stools have turned dark black in color. What should the nursing officer advise?",
    opts: ["Discontinue the medication immediately", "This is a normal, harmless side effect of iron therapy", "Seek emergency medical treatment for gastrointestinal bleeding", "Reduce the dose by half"],
    ans: 1,
    source: "IGNOU Post B.Sc Nursing",
    explain: "Unabsorbed iron in the gastrointestinal tract forms iron sulfide, which turns the stool dark black. This is normal and harmless."
  },
  {
    q: "To prevent local tooth enamel staining when administering liquid iron supplements to a child, the nurse should instruct the parents to:",
    opts: ["Mix the supplement with honey", "Administer through a straw and rinse the mouth immediately", "Give the supplement with ice cream", "Brush the teeth before administration"],
    ans: 1,
    source: "RUHS Post Basic Exam",
    explain: "Liquid iron can stain teeth. Using a straw bypasses the teeth, and rinsing the mouth removes any residual solution to prevent staining."
  },
  {
    q: "The gold-standard assessment to definitively identify iron stores in the human body is:",
    opts: ["Total serum iron level", "Serum ferritin level", "Hematocrit value", "Red blood cell count"],
    ans: 1,
    source: "AIIMS Bathinda Special",
    explain: "Serum ferritin levels correlate directly with the body's total intracellular iron stores, making it the most diagnostic assay for iron deficiency."
  },
  {
    q: "An adult patient presents with microcytic, hypochromic red blood cells on their peripheral blood smear. This morphology is classic for:",
    opts: ["Vitamin B12 deficiency", "Aplastic anemia", "Iron deficiency anemia or Thalassemia", "Folate deficiency"],
    ans: 2,
    source: "DSSSB Nursing Exam",
    explain: "Microcytic (small size) and hypochromic (pale center) RBCs occur when heme or globin synthesis is impaired, as in iron deficiency or thalassemia."
  },
  {
    q: "Which of the following values represents the normal Mean Corpuscular Volume (MCV) of an erythrocyte?",
    opts: ["50 to 60 fL", "80 to 100 fL", "110 to 120 fL", "130 to 150 fL"],
    ans: 1,
    source: "UPPSC Staff Nurse",
    explain: "Normal MCV (average size of an RBC) is 80 to 100 femtoliters (fL). Values below 80 fL indicate microcytosis; values above 100 fL indicate macrocytosis."
  },
  {
    q: "A patient with severe renal failure has developed severe anemia. The primary reason for this is:",
    opts: ["Chronic blood loss during hemodialysis", "Uremic destruction of healthy spleen tissues", "Inadequate production of erythropoietin by the failing kidneys", "Iron intake malabsorption"],
    ans: 2,
    source: "AIIMS Raipur Special Test",
    explain: "Kidneys synthesize about 90% of erythropoietin (EPO). In renal failure, EPO production drops, leading to decreased RBC synthesis in the bone marrow."
  },
  {
    q: "A child is diagnosed with aplastic anemia. The nurse understands this condition is characterized by:",
    opts: ["Destruction of circulating RBCs by autoantibodies", "Selective loss of mature erythrocytes with normal leukocytes", "Pancytopenia resulting from bone marrow suppression", "Iron overload in major organs"],
    ans: 2,
    source: "AIIMS Patna Staff Nurse",
    explain: "Aplastic anemia is bone marrow failure leading to pancytopenia (a deficiency of all three cellular components: RBCs, WBCs, and platelets)."
  }
];

// ==========================================
// MOCK 2: RED BLOOD CELL DISORDERS & ANEMIAS (50 Questions)
// ==========================================
export const MOCK_2_DATA: Question[] = [
  {
    q: "The nurse is preparing to administer an intramuscular (IM) iron injection to an adult patient. Which technique must be used to prevent dark staining of the skin?",
    opts: ["Standard intramuscular technique", "Deltoid muscle injection with a short needle", "Z-track injection method with a deep intramuscle plunge", "Subcutaneous injection with massage"],
    ans: 2,
    source: "DSSSB Staff Nurse 2013",
    explain: "The Z-track technique seals medication deeply inside the muscle, preventing leakage into the subcutaneous tissue and avoiding skin staining from iron medications."
  },
  {
    q: "Which of the following is considered a classic hereditary anemia characterized by the presence of abnormal hemoglobin S (HbS) chains?",
    opts: ["Beta-Thalassemia major", "Sickle cell anemia", "Aplastic anemia", "Pernicious anemia"],
    ans: 1,
    source: "RPSC Staff Nurse",
    explain: "Sickle cell anemia is an autosomal recessive genetic disorder where a single point mutation replaces glutamic acid with valine, producing hemoglobin S (HbS)."
  },
  {
    q: "What is the primary physiological trigger that causes red blood cells containing Hemoglobin S to assume a rigid, sickle-like crescent shape?",
    opts: ["Systemic alkalosis", "Fluid volume overload", "Low oxygen tension (hypoxia) and dehydration", "Hyperthermia"],
    ans: 2,
    source: "AIIMS Delhi Prep",
    explain: "Hypoxia, dehydration, cold exposure, and acidosis cause Hemoglobin S to polymerize, stretching the RBC into a rigid sickle shape that blocks microcapillaries."
  },
  {
    q: "An 8-year-old child with sickle cell anemia is admitted in an acute vaso-occlusive crisis. The primary nursing diagnosis should focus on:",
    opts: ["Ineffective coping", "Acute pain related to tissue ischemia and capillary blockage", "Imbalanced nutrition", "Risk for infection"],
    ans: 1,
    source: "RUHS Post Basic B.Sc",
    explain: "Vaso-occlusive crisis (pain crisis) occurs when sickled cells block Microvessels, cutting off oxygen and causing severe pain and tissue ischemia."
  },
  {
    q: "Which of the following joint actions is the most critical intervention for a patient during a sickle cell vaso-occlusive crisis?",
    opts: ["Ice packs to painful joints and exercises", "Oxygen therapy and aggressive intravenous hydration", "Aspirin twice daily and bed rest", "High dietary iron intake and cold baths"],
    ans: 1,
    source: "AIIMS Jodhpur Nursing Staff",
    explain: "Fluids expand blood volume, diluting sickled cells and improving flow. Oxygen relieves hypoxia, stopping further sickling."
  },
  {
    q: "A pediatric patient with sickle cell anemia is being discharged. The nurse should instruct the parents to avoid which of the following triggers?",
    opts: ["Light play in low-impact sports", "High altitudes, tight clothing, and dehydration", "A high-calorie balanced diet", "Supplements of folic acid"],
    ans: 1,
    source: "IGNOU Post Basic",
    explain: "High altitudes (low oxygen) and dehydration increase blood viscosity, triggering sickle cell crises. Hydration and oxygenation must be maintained."
  },
  {
    q: "A child with sickle cell disease presents with sudden left upper quadrant abdominal pain and a rapid drop in hemoglobin. The nurse suspects:",
    opts: ["Vaso-occlusive bone crisis", "Splenic sequestration crisis", "Aplastic crisis", "Acute chest syndrome"],
    ans: 1,
    source: "RUHS M.Sc Entrance",
    explain: "Splenic sequestration occurs when large amounts of blood become trapped in the spleen, causing splenomegaly, severe anemia, and hypovolemic shock. It is a medical emergency."
  },
  {
    q: "A patient with Thalassemia Major (Cooley's anemia) undergoes frequent blood transfusions. To prevent organ damage from iron overload (hemosiderosis), the nurse expects to administer:",
    opts: ["Oral iron supplements", "An active chelating agent (such as desferrioxamine)", "Intravenous vitamin K", "Erythropoietin injections"],
    ans: 1,
    source: "ESIC Staff Nurse",
    explain: "Frequent blood transfusions lead to iron accumulation (hemosiderosis). Desferrioxamine is an iron-chelating agent that binds excess iron for excretion."
  },
  {
    q: "Thalassemia major is characterized by which of the following skeletal variations due to severe bone marrow erythroid hyperplasia?",
    opts: ["Scoliosis", "Chipmunk-like facies with skull bone thickening", "Asymmetrical limb lengths", "Saddle nose deformity"],
    ans: 1,
    source: "AIIMS Raipur Prep",
    explain: "Severe anemia in thalassemia triggers marrow expansion. This leads to bone thickening in the face and skull, resulting in characteristic chipmunk-like facies."
  },
  {
    q: "A patient is evaluated for a blood disorder and the nurse notes microcytic, hypochromic target cells on the blood smear. This is a classic finding for:",
    opts: ["Pernicious anemia", "Thalassemia", "Hereditary spherocytosis", "Aplastic anemia"],
    ans: 1,
    source: "UPPSC U.P. Staff Nurse",
    explain: "Target cells (leptocytes) with a bullseye appearance are classic markers of thalassemia and severe iron deficiency anemias."
  },
  {
    q: "A patient with chronic alcohol abuse is diagnosed with macrocytic folate deficiency anemia. The nurse recognizes that folate is principalmente absorbed in the:",
    opts: ["Gastric mucosa", "Duodenum and jejunum", "Terminal ileum", "Large colon"],
    ans: 1,
    source: "BHU Staff Nurse",
    explain: "Dietary folate is absorbed in the duodenum and upper jejunum, unlike Vitamin B12, which is absorbed in the terminal ileum."
  },
  {
    q: "Which diagnostic test is used to assess Vitamin B12 absorption and differentiate Pernicious Anemia from other causes of malabsorption?",
    opts: ["Bone marrow biopsy", "Coomb's test", "Schilling test", "Hemoglobin electrophoresis"],
    ans: 2,
    source: "JIPMER Recruitment",
    explain: "The Schilling test measures the urinary excretion of radioactive Vitamin B12, demonstrating the body's absorption capacity with or without intrinsic factor."
  },
  {
    q: "While collecting food histories from a patient with macrocytic megaloblastic anemia, the nurse notes they are strict vegans. Which deficiency is highly likely?",
    opts: ["Folate deficiency", "Vitamin B12 deficiency", "Ascorbic acid deficiency", "Iron deficiency"],
    ans: 1,
    source: "RPSC Raj. Staff Nurse",
    explain: "Vitamin B12 is found exclusively in animal-derived foods (meat, dairy, eggs). Strict vegans require B12 supplementation to prevent deficiency."
  },
  {
    q: "An adult patient with chronic kidney disease (CKD) has a hemoglobin of 7.2 g/dL. What class of drug is typically prescribed to treat this anemia?",
    opts: ["Oral ferrous sulfate", "Recombinant Human Erythropoietin (Epoetin alfa)", "Vitamin B12 injections", "Intravenous normal saline"],
    ans: 1,
    source: "IGNOU Nursing Officer",
    explain: "Failing kidneys produce insufficient erythropoietin. Recombinant EPO injections stimulate bone marrow RBC production directly."
  },
  {
    q: "Which laboratory parameter must be closely monitored during erythropoietin therapy to prevent complications like hypertensive encephalopathy?",
    opts: ["Serum potassium", "Platelet count", "Blood pressure", "Urinary pH"],
    ans: 2,
    source: "AIIMS Bathinda Special",
    explain: "Erythropoietin therapy can increase blood viscosity and peripheral resistance, potentially leading to arterial hypertension and encephalopathy."
  },
  {
    q: "Which type of anemia is caused by chemical agents (e.g., Benzene, Chloramphenicol) destroying pluripotential hematopoietic stem cells?",
    opts: ["Aplastic anemia", "Hemolytic anemia", "Pernicious anemia", "Sideroblastic anemia"],
    ans: 0,
    source: "BSF Staff Nurse Exam",
    explain: "Aplastic anemia involves bone marrow damage, leading to pancytopenia. Exposure to benzene, radiation, or medications like chloramphenicol can trigger this marrow suppression."
  },
  {
    q: "The gold-standard procedure to definitively diagnose aplastic anemia is:",
    opts: ["Peripheral blood smear", "Bone marrow aspiration and biopsy", "Serum iron panel", "Hemoglobin electrophoresis"],
    ans: 1,
    source: "RUHS Nursing Entrance",
    explain: "A bone marrow biopsy is the diagnostic standard, typically showing a hypocellular marrow replaced by fat cells (yellow marrow) with no abnormal cells."
  },
  {
    q: "Which clinical precaution is most critical for a patient with aplastic anemia? (Absolute Neutrophil Count = 400 cells/µL, Platelet Count = 15,000/µL)",
    opts: ["High sodium diet and walk therapy", "Neutropenic precautions and bleeding precautions", "Aggressive active ROM and heat packs", "Encouraging a raw vegetable diet"],
    ans: 1,
    source: "DSSSB Practice Exam",
    explain: "A neutrophil count under 500/µL (severe neutropenia) and platelets under 20,000/µL put the patient at extreme risk for life-threatening infections and spontaneous hemorrhage."
  },
  {
    q: "Which antibody class is typically involved in autoimmune hemolytic anemia (AIHA) and can dry-cross the placenta?",
    opts: ["IgA", "IgM", "IgG", "IgE"],
    ans: 2,
    source: "AIIMS Raipur Special",
    explain: "IgG antibodies are warm-reacting autoantibodies that coat red blood cells, causing extravascular hemolysis. IgG is the only antibody class that crosses the placenta."
  },
  {
    q: "Which diagnostic blood test identifies the presence of autoantibodies coated onto the patient's RBCs in hemolytic disease?",
    opts: ["Direct Coomb's test", "Indirect Coomb's test", "Bleeding time", "Serum ferritin"],
    ans: 0,
    source: "UPPSC Staff Nurse",
    explain: "The Direct Coomb's test detects antibodies (or complement) stuck directly to the surface of the patient's red blood cells, confirming immune-mediated hemolysis."
  },
  {
    q: "A toddler with hemolytic uremic syndrome (HUS) presents with anemia, thrombocytopenia, and acute kidney injury. The nurse understands this was likely triggered by:",
    opts: ["Autoimmune factors", "Pathogenic E. coli infection (O157:H7 producing Shiga toxin)", "Gastric ulcer bleeding", "Aplastic bone crises"],
    ans: 1,
    source: "AIIMS Delhi Prep",
    explain: "HUS is typically triggered by Shiga toxin-producing E. coli (STEC). The toxin damages endothelial cells in glomerular capillaries, causing microthrombi that destroy RBCs and platelets."
  },
  {
    q: "The clinical presentation of acute hemolysis includes which characteristic urine change?",
    opts: ["Straw-colored basic urine", "Pale dilute urine", "Dark, tea-colored or cola-colored urine", "Milky white chyluria"],
    ans: 2,
    source: "RUHS Grade II Nurse",
    explain: "Rapid hemolysis releases free hemoglobin into the plasma. This filters into the urine (hemoglobinuria), turning it tea- or cola-colored."
  },
  {
    q: "When assessing a patient with deep chronic anemia, which clinical finding in the hands is classic?",
    opts: ["Clubbing of fingers", "Brittle, spoon-shaped nails (Koilonychia)", "Asymmetrical joint swelling", "Palmar erythema"],
    ans: 1,
    source: "ESIC Nursing Specialist",
    explain: "Koilonychia (spoon-shaped, concave nails) is a classic sign of chronic, severe iron deficiency anemia caused by tissue iron depletions."
  },
  {
    q: "An anemic patient asks why they feel cold and fatigued. The nurse explains that:",
    opts: ["Anemia causes fluid overload in peripheral vessels", "Fewer RBCs are available to synthesize heat", "RBC depletion leads to tissue hypoxia and reduced heat dissipation", "Platelet loss causes core cooling"],
    ans: 2,
    source: "RPSC Staff Nurse",
    explain: "Decreased hemoglobin impairs the blood's oxygen-carrying capacity, leading to tissue hypoxia, reduced ATP synthesis, and intolerance to cold."
  },
  {
    q: "Which parameter on the CBC represents the average concentration of hemoglobin inside a single red blood cell?",
    opts: ["MCV", "MCH", "MCHC", "RDW"],
    ans: 2,
    source: "DSSSB Practice Exam",
    explain: "MCHC (Mean Corpuscular Hemoglobin Concentration) measures the average concentration of hemoglobin in a given volume of packed red blood cells."
  },
  {
    q: "Which parameter on the CBC represents the variation in size of circulating red blood cells (anisocytosis)?",
    opts: ["MCV", "RDW (Red Cell Distribution Width)", "MCH", "Hematocrit"],
    ans: 1,
    source: "AIIMS Nagpur Nursing Officer",
    explain: "RDW measures variations in RBC size (anisocytosis). Elevated RDW is an early indicator of developing nutritional anemias."
  },
  {
    q: "A patient with iron deficiency anemia is prescribed liquid iron. Which of the following is optimal administration advice?",
    opts: ["Take with a glass of tea", "Take the dose with warm milk", "Administer through a straw and rinse the mouth immediately", "Mix with a carbonated beverage"],
    ans: 2,
    source: "RUHS Grade II Nurse",
    explain: "Liquid iron can stain teeth. Using a straw and rinsing immediately helps prevent staining."
  },
  {
    q: "A nursing officer is checking the laboratory findings of an adult male. Which of the following hemoglobin values is defined as anemia?",
    opts: ["Hemoglobin < 11.0 g/dL", "Hemoglobin < 12.0 g/dL", "Hemoglobin < 13.0 g/dL", "Hemoglobin < 14.0 g/dL"],
    ans: 2,
    source: "WHO Guidelines",
    explain: "For adult males, anemia is defined as hemoglobin < 13.0 g/dL. For non-pregnant adult females, the threshold is < 12.0 g/dL."
  },
  {
    q: "Which of the following is the most diagnostic initial test for iron deficiency anemia?",
    opts: ["Serum ferritin level", "Mean corpuscular hemoglobin", "RBC count", "Bone marrow aspiration"],
    ans: 0,
    source: "AIIMS Bathinda",
    explain: "Serum ferritin reflects total body iron stores, making it the most diagnostic assay for iron deficiency."
  },
  {
    q: "A patient with severe gastritis has pernicious anemia. The nurse understands they require B12 replacement via:",
    opts: ["Oral tablets", "Deep subcutaneous injections", "Intramuscular injections daily for life", "Intravenous bolus infusions"],
    ans: 2,
    source: "BHU Exam",
    explain: "Pernicious anemia involves a lack of intrinsic factor, preventing oral absorption. Vitamin B12 must be administered parenterally (usually IM) for life."
  },
  {
    q: "A patient with iron deficiency anemia is advised to limit milk intake near iron doses. This is because milk contains:",
    opts: ["Vitamin D, which precipitates iron", "Lactose, which causes cramping", "Calcium, which competes for absorption sites", "Casein, which speeds excretion"],
    ans: 2,
    source: "ESIC Nursing Specialist",
    explain: "Calcium in milk competes with iron for binding sites in the duodenum, impairing iron absorption."
  },
  {
    q: "Which type of anemia is characterized by a complete fatty replacement of the bone marrow cavities?",
    opts: ["Aplastic anemia", "Hemolytic anemia", "Sickle cell anemia", "Sideroblastic anemia"],
    ans: 0,
    source: "Bone Marrow Biopsy standard",
    explain: "Aplastic anemia is caused by bone marrow failure, where hematopoietic tissue is replaced by hypocellular fat."
  },
  {
    q: "Which of the following describes the shape of red blood cells in a patient with Thalassemia minor?",
    opts: ["Spherocytic and dark", "Macrocytic and hyperchromic", "Microcytic and hypochromic with target cells", "Sickled and crescent-shaped"],
    ans: 2,
    source: "RUHS Post Basic",
    explain: "Thalassemia minor is characterized by microcytic, hypochromic target cells on blood smears."
  },
  {
    q: "A patient who had a subtotal gastrectomy 5 years ago is at high risk for:",
    opts: ["Iron overload", "Folate deficiency", "Pernicious anemia", "Aplastic anemia"],
    ans: 2,
    source: "IGNOU Post B.Sc",
    explain: "A gastrectomy removes parietal cells, leading to a lack of intrinsic factor and Vitamin B12 deficiency (pernicious anemia) over several years."
  },
  {
    q: "In an emergency, which blood type is considered the safest to transfuse as a universal donor when the patient's Rh status is unknown?",
    opts: ["O Positive", "O Negative", "AB Positive", "AB Negative"],
    ans: 1,
    source: "AIIMS Raipur Special",
    explain: "Type O Negative blood lacks A, B, and Rh antigens, making it the universal donor type that minimizes transfusion reaction risks in emergencies."
  },
  {
    q: "A nursing officer is checking blood compatibility. A patient with Type AB positive blood is considered the absolute:",
    opts: ["Universal donor", "Universal recipient", "Most antigenic patient", "High risk hemolytic patient"],
    ans: 1,
    source: "ESIC Staff Nurse Exam",
    explain: "Type AB positive patients have no anti-A, anti-B, or anti-Rh antibodies in their plasma, allowing them to receive any blood type safely."
  },
  {
    q: "Which antibody class is typically present in secretions like breast milk and colostrum?",
    opts: ["IgG", "IgM", "IgA", "IgD"],
    ans: 2,
    source: "IGNOU Nursing Prep",
    explain: "IgA is the primary immunoglobulin in secretory fluids (breast milk, saliva, tears), providing passive immunity to infants."
  },
  {
    q: "A nursing officer is administering a blood transfusion. The most critical period to monitor for severe acute hemolytic reactions is:",
    opts: ["The first 15 minutes", "After the first hour", "Directly at the end of the transfusion", "24 hours post-infusion"],
    ans: 0,
    source: "JIPMER Nursing protocols",
    explain: "Severe, life-threatening transfusion reactions typically occur within the first 15 minutes or first 50 mL of blood infusion."
  },
  {
    q: "A patient begins to chill, develop lumbar pain, and spike a fever shortly after starting a blood transfusion. The nurse should immediately:",
    opts: ["Slow down the transfusion rate", "Administer paracetamol", "Stop the transfusion and disconnect the tubing", "Call the physician"],
    ans: 2,
    source: "AIIMS NORCET Standard",
    explain: "Upon suspecting a transfusion reaction, the nurse's first action must be to immediately stop the infusion to prevent further exposure to incompatible blood."
  },
  {
    q: "What solution should be hung to keep the vein open after stopping a blood transfusion due to a suspected reaction?",
    opts: ["5% Dextrose in water", "0.9% Normal Saline", "Ringer's Lactate", "Sterile water"],
    ans: 1,
    source: "DSSSB Nursing Officer",
    explain: "Normal saline (0.9% NaCl) is the only solution hung with blood products. It maintains IV access without causing hemolysis."
  },
  {
    q: "A patient experiences a sudden rise in temperature, chills, and headache during blood transfusion, with no hemolytic signs. What reaction is suspected?",
    opts: ["Acute hemolytic reaction", "Febrile non-hemolytic reaction", "Mild allergic reaction", "Sepsis reaction"],
    ans: 1,
    source: "ESIC Staff Nurse Exam",
    explain: "Febrile non-hemolytic reactions are caused by recipient antibodies reacting to donor white blood cells. They are characterized by a fever increase of at least 1°C without hemolysis."
  },
  {
    q: "A patient develops urticaria, itching, and flushing during a blood transfusion. What class of medication does the nurse expect to administer?",
    opts: ["Antibiotic", "Vasopressor", "Antihistamine (e.g., Diphenhydramine)", "Anticoagulant"],
    ans: 2,
    source: "RPSC Staff Nurse Career",
    explain: "Mild allergic reactions are caused by sensitivity to donor plasma proteins and are typically managed with antihistamines."
  },
  {
    q: "To monitor a patient with suspected circulatory overload (TACO) during blood transfusion, the nurse should assess for:",
    opts: ["Hypotension and bradycardia", "High spikes in fever", "Dyspnea, wet crackles, and jugular vein distention", "Abdominal pain"],
    ans: 2,
    source: "AIIMS Patna Staff Nurse",
    explain: "Circulatory overload is characterized by fluid overload, leading to pulmonary congestion (crackles, dyspnea) and elevated venous pressure (jugular vein distention)."
  },
  {
    q: "Which parameter must the nursing officer verify on a unit of packed red blood cells before starting a transfusion?",
    opts: ["Donor's physical address", "The age of the donor", "Unit number, blood type, and expiration date", "The manufacturing company"],
    ans: 2,
    source: "JIPMER standards",
    explain: "The unit number, blood type, expiration date, and recipient's identification must be verified by two qualified nurses before transfusion."
  },
  {
    q: "A patient is prescribed 2 units of Packed RBCs (PRBCs). What is the maximum duration allowed to complete the transfusion of 1 unit of PRBCs to prevent bacterial growth?",
    opts: ["2 hours", "4 hours", "6 hours", "8 hours"],
    ans: 1,
    source: "AIIMS Delhi Prep",
    explain: "Blood products should not hang for more than 4 hours due to the risk of bacterial contamination at room temperature."
  },
  {
    q: "How many mL of normal saline (0.9% NaCl) can be safely transfused through the same IV tubing line as blood products?",
    opts: ["Zero", "Up to 50 mL", "Any volume required to maintain the infusion", "None, only Ringer's Lactate is allowed"],
    ans: 2,
    source: "ESIC Clinic Expert",
    explain: "Normal saline (0.9% NaCl) is compatible with blood products, unlike other solutions that can cause clotting or hemolysis."
  },
  {
    q: "A patient undergoes a total gastrectomy. The nurse should explain that the loss of parietal cells will require lifelong injections of:",
    opts: ["Iron dextran", "Folic Acid", "Cyanocobalamin (Vitamin B12)", "Erythropoietin"],
    ans: 2,
    source: "IGNOU Nursing Officer",
    explain: "A gastrectomy removes gastric parietal cells, eliminating intrinsic factor production and causing lifelong Vitamin B12 deficiency."
  },
  {
    q: "Which clinical laboratory test measures intrinsic pathway clotting efficiency and is used to monitor unfractionated Heparin therapy?",
    opts: ["Bleeding Time (BT)", "Prothrombin Time (PT)", "Activated Partial Thromboplastin Time (aPTT)", "Thrombin Time (TT)"],
    ans: 2,
    source: "AIIMS Bathinda Special",
    explain: "The aPTT test evaluates blood clotting via the intrinsic clotting pathway, making it the standard test for monitoring unfractionated heparin therapy."
  },
  {
    q: "What is the therapeutic target range for aPTT during Heparin therapy?",
    opts: ["Half of the normal baseline", "Equal to the normal baseline", "1.5 to 2.5 times the control baseline", "More than 5 times the normal baseline"],
    ans: 2,
    source: "DSSSB Nursing Exam",
    explain: "The therapeutic range for aPTT during heparin therapy is 1.5 to 2.5 times the normal baseline value."
  },
  {
    q: "Which specific drug acts as the direct, fast-acting chemical antidote for an overdose of unfractionated Heparin?",
    opts: ["Vitamin K", "Protamine Sulfate", "Aminocaproic Acid", "Calcium Gluconate"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Protamine sulfate is a strongly basic protein that binds to and neutralizes acidic heparin molecules, reversing its anticoagulant effects."
  }
];

// ==========================================
// MOCK 3: WHITE BLOOD CELLS & IMMUNOLOGY (50 Questions)
// ==========================================
export const MOCK_3_DATA: Question[] = [
  {
    q: "A clinical nursing officer reviews a patient's differential WBC count. Which white blood cell type is normally the most abundant in a healthy adult?",
    opts: ["Lymphocytes", "Monocytes", "Neutrophils", "Eosinophils"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I Staff Nurse",
    explain: "Neutrophils are the most abundant leukocytes, making up approximately 50% to 70% of the total circulating white blood cells."
  },
  {
    q: "Which circulating white blood cell is primarily responsible for phagocytosis and acts as the 'first responder' to acute bacterial infections?",
    opts: ["B Lymphocyte", "Eosinophil", "Neutrophil", "Basophil"],
    ans: 2,
    source: "BHU Nursing Officer Exam",
    explain: "Neutrophils migrate rapidly to areas of acute bacterial infection, where they engulf and destroy invading pathogens through phagocytosis."
  },
  {
    q: "An elevation in the percentage of band cells (immature neutrophils) is referred to as a:",
    opts: ["Right shift in the differential count", "Left shift, indicating acute inflammatory or infectious response", "Leukopenia", "Eosinophilia"],
    ans: 1,
    source: "HPSSC Staff Nurse Paper",
    explain: "A 'left shift' indicates an increase in immature neutrophils (band cells) in circulation, suggesting the bone marrow is responding to an acute bacterial infection."
  },
  {
    q: "Which leucocyte type is responsible for migrating into tissues to mature into macrophages, phagocytizing debris and foreign matter over the long term?",
    opts: ["Neutrophils", "Basophils", "Monocytes", "Lymphocytes"],
    ans: 2,
    source: "LNJP Delhi Staff Nurse",
    explain: "Monocytes are the largest circulating leukocytes. They migrate into tissues and mature into macrophages, which engulf debris and present antigens to lymphocytes."
  },
  {
    q: "During an allergic reaction or parasitic infection, which leukocyte class is expected to show an elevated count?",
    opts: ["Neutrophils", "Eosinophils", "Lymphocytes", "Monocytes"],
    ans: 1,
    source: "ESIC Staff Nurse Exam",
    explain: "Eosinophils target parasitic infections and release antihistamines during allergic reactions, making them elevated in both conditions."
  },
  {
    q: "Which specific cellular chemical is released by basophils and mast cells to trigger vasodilation and increased capillary permeability during inflammation?",
    opts: ["Histamine", "Albumin", "Prothrombin", "Interferon"],
    ans: 0,
    source: "DSSSB Staff Nurse",
    explain: "Basophils and mast cells release histamine during inflammatory and allergic reactions, promoting vasodilation and vascular permeability."
  },
  {
    q: "Which circulating cells are responsible for synthesizing and secreting custom immunological antibodies (immunoglobulins)?",
    opts: ["T Lymphocytes", "Plasma cells (matured B Lymphocytes)", "Natural Killer cells", "Monocytes"],
    ans: 1,
    source: "RUHS M.Sc Nursing Entrance",
    explain: "Activated B lymphocytes differentiate into plasma cells, which manufacture and secrete large quantities of target-specific antibodies."
  },
  {
    q: "Which lymphocytic cell type is responsible for coordinating cell-mediated immune responses, directly destroying virally infected or malignant cells?",
    opts: ["B Lymphocyte", "T Lymphocyte (Helper/Cytotoxic T cells)", "Plasma cells", "Erythroid progenitors"],
    ans: 1,
    source: "NVS Staff Nurse Exam",
    explain: "T cells manage cell-mediated immunity. Cytotoxic T cells directly destroy infected cells, while Helper T cells coordinate the broader immune response."
  },
  {
    q: "The primary organ responsible for the differentiation and maturation of T lymphocytes during childhood is the:",
    opts: ["Spleen", "Thymus gland", "Liver", "Thyroid"],
    ans: 1,
    source: "UPPSC U.P. Staff Nurse",
    explain: "T cells migrate from the bone marrow to the thymus gland to mature and undergo selection before circulating in lymphatic tissues."
  },
  {
    q: "A tutor asks a student about Natural Killer (NK) cells. The student correctly states that NK cells are:",
    opts: ["Granulocytes that attack pollen", "Lymphocytes that participate in innate immunity without antigen presentation", "Antigen-presenting macrophages", "Precursors to active platelets"],
    ans: 1,
    source: "ESIC Hospital Staff Nurse",
    explain: "Natural Killer cells are large granular lymphocytes that destroy virally infected and tumor cells as part of innate immunity, without requiring MHC presentation."
  },
  {
    q: "Which immunoglobulin class is the most abundant in human blood and is the only antibody capable of crossing the placenta to protect the fetus?",
    opts: ["IgA", "IgM", "IgG", "IgE"],
    ans: 2,
    source: "NVS Staff Nurse Practice",
    explain: "IgG makes up about 75% to 80% of systemic antibodies. It crosses the placental barrier to provide passive immunity to the fetus."
  },
  {
    q: "Which immunoglobulin class is the first to be synthesized in response to a primary bacterial or viral infection?",
    opts: ["IgG", "IgA", "IgM", "IgE"],
    ans: 2,
    source: "Ruhs Post Basic B.Sc Entrance",
    explain: "IgM is a large, pentameric antibody shape. It is the first immunoglobulin synthesized in response to antigen exposure during primary infections."
  },
  {
    q: "Which immunoglobulin class is the primary antibody found in mucosal secretions like colostrum, breast milk, saliva, and tears?",
    opts: ["IgG", "IgA", "IgM", "IgE"],
    ans: 1,
    source: "AIIMS Raipur Special Test",
    explain: "Secretory IgA is found in bodily secretions where it protects mucosal surfaces from pathogen attachment."
  },
  {
    q: "Which immunoglobulin class binds to mast cells and basophils, triggering allergic reactions and type I hypersensitivity?",
    opts: ["IgG", "IgA", "IgM", "IgE"],
    ans: 3,
    source: "Jhalawar Medical College",
    explain: "IgE binds to Fc receptors on mast cells and basophils. Antigen cross-linking triggers degranulation and the release of histamine."
  },
  {
    q: "The immunological protection acquired by a newborn via colostrum and breast milk is classified as:",
    opts: ["Active natural immunity", "Passive natural immunity", "Active artificial immunity", "Passive artificial immunity"],
    ans: 1,
    source: "RUHS Grade II Nurse",
    explain: "Passive natural immunity refers to the transfer of pre-formed antibodies from mother to child via the placenta (IgG) or breast milk (IgA)."
  },
  {
    q: "A nursing officer receives a tetanus toxoid vaccine. What class of immunological defense does this stimulate?",
    opts: ["Active natural immunity", "Passive natural immunity", "Active artificial immunity", "Passive artificial immunity"],
    ans: 2,
    source: "RUHS Nursing Entrance",
    explain: "Vaccines and toxoids provide active artificial immunity, where antigen administration stimulates the recipient's immune system to produce antibodies and memory cells."
  },
  {
    q: "The administration of pre-formed tetanus immunoglobulin (TIG) during an injury provides which clinical protection?",
    opts: ["Active natural immunity", "Passive natural immunity", "Active artificial immunity", "Passive artificial immunity"],
    ans: 3,
    source: "RPSC Raj. Staff Nurse",
    explain: "Injecting pre-formed antibodies (immunoglobulins) provides passive artificial immunity, supplying immediate but temporary protection."
  },
  {
    q: "A patient with HIV has a CD4+ T cell count of 150 cells/µL. The nurse knows this directly impacts helper T cell functions. CD4+ cells are classified as:",
    opts: ["Cytotoxic T cells", "Helper T cells", "Suppressor cells", "Natural killer cells"],
    ans: 1,
    source: "IGNOU Nursing Officer",
    explain: "CD4+ cells are Helper T cells that coordinate immune responses. CD8+ cells are cytotoxic cells that directly destroy targets."
  },
  {
    q: "Which cells in the lymph nodes filter out foreign antigens and cellular waste from the lymphatic fluid?",
    opts: ["Hepatocytes", "Epithelial sheets", "Reticular macrophages and dendritic cells", "Erythroblasts"],
    ans: 2,
    source: "ESIC All-India Staff Nurse",
    explain: "As lymph filters through node sinuses, resident macrophages engulf pathogens, while dendritic cells present antigens to lymphocytes."
  },
  {
    q: "The concept stating that immune protection is achieved when a high percentage of the population is vaccinated or immune is:",
    opts: ["Passive resistance", "Anaphylaxis threshold", "Herd immunity", "Active cellular shield"],
    ans: 2,
    source: "AIIMS Bhopal Nursing Officer",
    explain: "Herd immunity occurs when a sufficiently large proportion of a community is immune, reducing pathogen transmission risks for vulnerable, unvaccinated individuals."
  },
  {
    q: "A patient is evaluated for an acute inflammatory disorder, and the nurse observes a leukocyte count of 16,500/µL on the CBC. This finding is termed:",
    opts: ["Leukopenia", "Leukocytosis", "Agranulocytosis", "Pancytopenia"],
    ans: 1,
    source: "AIIMS Jodhpur Gr I",
    explain: "A WBC count above 11,000/µL is leukocytosis, typically indicating an active infection, inflammation, or hematological disorder."
  },
  {
    q: "When a patient has a total leukocyte count under 4,000/µL, the condition is termed:",
    opts: ["Leukocytosis", "Leukopenia", "Monocytosis", "Polycythemia"],
    ans: 1,
    source: "IGNOU Post B.Sc",
    explain: "Leukopenia is a reduction in circulating white blood cells below 4,000/µL, leaving the patient vulnerable to infection."
  },
  {
    q: "Which specific substance, synthesized by gastric parietal cells, is essential for the systemic absorption of dietary Vitamin B12 in the terminal ileum?",
    opts: ["Hydrochloric acid", "Intrinsic factor", "Pepsinogen", "Gastrin"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Intrinsic factor is a glycoprotein manufactured by the stomach's parietal cells. It binds to Vitamin B12, protecting it from digestion until it is absorbed in the terminal ileum."
  },
  {
    q: "Which specific leukocyte count decline represents the highest infectious risk for a cancer patient undergoing chemotherapy?",
    opts: ["Lymphopenia", "Neutropenia", "Eosinopenia", "Basopenia"],
    ans: 1,
    source: "RUHS M.Sc Entrance",
    explain: "Neutropenia (low neutrophil count) significantly impairs the primary defense against bacterial infections, making it a critical risk during chemotherapy."
  },
  {
    q: "Neutropenic precautions (protective isolation) should be initiated when a patient's absolute neutrophil count (ANC) falls below:",
    opts: ["5,000/µL", "3,000/µL", "1,000/µL or lower", "10,000/µL"],
    ans: 2,
    source: "BSF Staff Nurse Practice",
    explain: "An ANC under 1,000/µL represents severe neutropenia, necessitating protective isolation to prevent exposure to opportunistic pathogens."
  },
  {
    q: "During a neutropenic isolate phase, which of the following instructions must be given to visitors?",
    opts: ["Fresh flowers are allowed in the room", "Raw fruits and vegetables should not be brought to the patient", "No hand hygiene is required if gloves are worn", "Humidified air is prohibited"],
    ans: 1,
    source: "BSF Staff Nurse Special",
    explain: "Raw fruits and vegetables carry soil-borne bacteria (e.g., Pseudomonas), which pose a severe infection risk to immunocompromised patients."
  },
  {
    q: "Which of the following describes the biological action of vaccines?",
    opts: ["Neutralizing toxins directly with antibodies", "Stimulating pre-formed plasma compounds", "Introducing antigens to trigger antibody production and memory cell formation", "Encouraging passive cellular absorption"],
    ans: 2,
    source: "RRB Delhi Recruitment",
    explain: "Vaccines expose the immune system to weakened or inactive antigens, prompting active antibody production and memory cell formation without causing disease."
  },
  {
    q: "A vaccine formulated using inactivated toxins secreted by pathogens is classified as a:",
    opts: ["Live attenuated vaccine", "Killed vaccine", "Toxoid vaccine", "Recombinant vaccine"],
    ans: 2,
    source: "AIIMS Nagpur Nursing Officer",
    explain: "Toxoids are inactivated bacterial toxins that stimulate antitoxin antibody production while remaining non-toxic."
  },
  {
    q: "Which of the following is an example of a toxoid vaccine routinely administered in clinical practice?",
    opts: ["BCG vaccine", "Tetanus toxoid", "OPV", "Measles vaccine"],
    ans: 1,
    source: "BHU Staff Nurse Paper",
    explain: "Tetanus toxoid is an inactivated form of the Clostridium tetani toxin, used to prevent tetanus infections."
  },
  {
    q: "Which of the following vaccines is formulated using live, weakened pathogens (live attenuated)?",
    opts: ["Hepatitis B vaccine", "BCG and MMR vaccines", "Tetanus vaccine", "Salk polio vaccine"],
    ans: 1,
    source: "IGNOU Post Basic B.Sc",
    explain: "BCG (for tuberculosis) and MMR (measles, mumps, rubella) are classic examples of live attenuated vaccines."
  },
  {
    q: "A patient with an open, contaminated wound is evaluated for tetanus exposure. If they have no prior vaccination history, the nurse expects to administer:",
    opts: ["Tetanus toxoid vaccine only", "Tetanus immunoglobulin (TIG) and Tetanus toxoid vaccine at different sites", "Intravenous penicillin only", "Nothing, wound cleaning is sufficient"],
    ans: 1,
    source: "ESIC Nursing Specialist",
    explain: "TIG provides immediate passive immunity against tetanus, while the toxoid vaccine begins stimulating active immunity for long-term protection."
  },
  {
    q: "Which immunoglobulin class exists in a pentameric shape, enabling it to agglutinate antigens efficiently?",
    opts: ["IgG", "IgA", "IgM", "IgE"],
    ans: 2,
    source: "JIPMER Staff Nurse Paper",
    explain: "IgM's pentameric structure features 10 antigen-binding sites, making it highly effective at agglutinating and neutralizing pathogens."
  },
  {
    q: "The transfer of antibodies from mother to fetus across the placenta is classified as:",
    opts: ["Active natural immunity", "Passive natural immunity", "Active artificial immunity", "Passive artificial immunity"],
    ans: 1,
    source: "RPSC Staff Nurse",
    explain: "Maternal-fetal antibody transfer is a natural process that provides the infant with passive, temporary protection (IgG)."
  },
  {
    q: "Which of the following represents the correct sequence of phagocytosis?",
    opts: ["Adherence → Chemotaxis → Ingestion → Destruction", "Chemotaxis → Adherence → Ingestion → Destruction", "Ingestion → Destruction → Chemotaxis → Adherence", "Destruction → Ingestion → Adherence → Chemotaxis"],
    ans: 1,
    source: "AIIMS Patna Staff Nurse",
    explain: "Phagocytosis proceeds in order: Chemotaxis (movement toward pathogen) → Adherence → Ingestion → Destruction."
  },
  {
    q: "What is the primary role of opsonins in the immune system?",
    opts: ["Directly destroying bacterial walls", "Coating pathogens to make them more targetable for phagocytes", "Stimulating bone marrow stem cells", "Precipitating dissolved toxins"],
    ans: 1,
    source: "DSSSB Practice Exam",
    explain: "Opsonins (like IgG or complement proteins) coat pathogens, serving as binding tags that make them easier for phagocytic cells to engulf."
  },
  {
    q: "A pediatric patient with severe bronchial asthma has an elevated IgE level. The nurse knows this immunoglobulin binds to which cells to release histamine?",
    opts: ["Erythrocytes", "Platelets", "Mast cells and basophils", "Monocytes"],
    ans: 2,
    source: "RUHS M.Sc Entrance Exam",
    explain: "IgE antibodies bind to mast cells and basophils. Subsequent allergen exposure triggers histamine release, causing asthma symptoms and bronchoconstriction."
  },
  {
    q: "The term used for an exaggerated, life-threatening systemic hypersensitivity reaction is:",
    opts: ["Opsonization", "Anaphylaxis", "Hemolysis", "Hemoperfusion"],
    ans: 1,
    source: "AIIMS Raipur Exam Prep",
    explain: "Anaphylaxis is a severe, systemic IgE-mediated allergic reaction characterized by bronchoconstriction, laryngeal edema, and cardiovascular collapse (anaphylactic shock)."
  },
  {
    q: "The drug of choice to treat systemic anaphylactic distress immediately is:",
    opts: ["Intravenous Corticosteroid", "Subcutaneous Epinephrine (Adrenaline, 1:1000)", "Oral Antihistamine", "Intravenous Saline"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Epinephrine (Adrenaline) is the primary treatment for anaphylaxis. It stimulates alpha-1 (vasoconstriction) and beta-2 (bronchodilation) receptors to reverse allergic cardiovascular and respiratory distress."
  },
  {
    q: "Which immune cells are targeted and progressively destroyed by the Human Immunodeficiency Virus (HIV)?",
    opts: ["CD4+ Helper T Lymphocytes", "CD8+ Cytotoxic T Lymphocytes", "B Lymphocytes", "Plasma cells"],
    ans: 0,
    source: "AIIMS Jodhpur Gr I",
    explain: "HIV infects CD4+ helper T cells, depleting their numbers and impairing cell-mediated immunity, which can lead to AIDS."
  },
  {
    q: "A tuberculosis skin test (Mantoux test) is read 48 to 72 hours helper injection. This delayed hypersensitivity reaction is mediated by:",
    opts: ["IgG antibodies and mast cells", "IgE antibodies and histamine", "Sensitized T Lymphocytes (Cell-mediated, Type IV)", "Complement proteins"],
    ans: 2,
    source: "BHU Staff Nurse",
    explain: "The Mantoux test is a Type IV delayed-type hypersensitivity reaction, mediated by sensitized T cells that recruit macrophages to the injection site over 48-72 hours."
  },
  {
    q: "Induration of 10 mm or more on a Mantoux test in a healthy healthcare worker is interpreted as:",
    opts: ["A false reaction", "Active pulmonary tuberculosis disease", "Positive exposure and sensitization to Mycobacterium tuberculosis", "Absolute immunity to tuberculosis"],
    ans: 2,
    source: "ESIC Staff Nurse Exam",
    explain: "An induration of 10 mm or more is considered positive, indicating exposure and sensitization to the TB bacillus, though not necessarily active disease."
  },
  {
    q: "Which specific leukocyte count increases dramatically in a patient with Mononucleosis (glandular fever)?",
    opts: ["Atypical Lymphocytes", "Granulocytic neutrophils", "Red RBC cells", "Eosinophilia"],
    ans: 0,
    source: "RPSC Staff Nurse",
    explain: "Mononucleosis (caused by Epstein-Barr virus) is characterized by an increase in circulating lymphocytes, with many appearing as large, atypical cells."
  },
  {
    q: "Which organ contains the largest single collection of lymphoid tissue in the human body?",
    opts: ["Spleen", "Thymus", "Tonsils", "Appendix"],
    ans: 0,
    source: "IGNOU Post B.Sc Nursing",
    explain: "The spleen is the largest lymphoid organ, filtering blood, destroying old RBCs, and housing lymphocytes to fight systemic infection."
  },
  {
    q: "A patient with splenic rupture undergoes an emergency splenectomy. The nurse should explain that they are at increased risk for:",
    opts: ["Iron deficiency anemia", "Leukopenia", "Infection by encapsulated bacteria (e.g., Pneumococcus)", "Spontaneous thrombosis"],
    ans: 2,
    source: "RUHS Post Basic Exam",
    explain: "The spleen filters bloodborne pathogens. Splenectomy increases the risk of overwhelming post-splenectomy infection (OPSI), typically caused by encapsulated organisms."
  },
  {
    q: "A patient who had a subtotal gastrectomy 5 years ago is at high risk for:",
    opts: ["Iron overload", "Folate deficiency", "Pernicious anemia", "Aplastic anemia"],
    ans: 2,
    source: "IGNOU Post B.Sc",
    explain: "A gastrectomy removes parietal cells, leading to a lack of intrinsic factor and Vitamin B12 deficiency (pernicious anemia) over several years."
  },
  {
    q: "Which test is used to evaluate the phagocytic activity of neutrophils?",
    opts: ["Coomb's test", "Nitroblue Tetrazolium (NBT) test", "Schilling test", "Electrophoresis"],
    ans: 1,
    source: "AIIMS Bathinda Special",
    explain: "The NBT test assesses the metabolic phagocytic activity of neutrophils, helping diagnose conditions like Chronic Granulomatous Disease."
  },
  {
    q: "The chief antibody present in human parotid saliva secretion is:",
    opts: ["IgG", "IgM", "IgA", "IgE"],
    ans: 2,
    source: "DSSSB Nursing Exam",
    explain: "IgA is the primary antibody found in bodily secretions (saliva, tears, breast milk, colostrum), defending mucosal surfaces."
  },
  {
    q: "A child develops a severe skin reaction with itching immediately helper touching poison ivy. This Type IV hypersensitivity is mediated by:",
    opts: ["Circulating IgE antibodies", "Immune complexes", "Sensitized T cells", "Mast cell degranulation"],
    ans: 2,
    source: "AIIMS Raipur Prep",
    explain: "Contact dermatitis from poison ivy is a delayed, cell-mediated Type IV hypersensitivity reaction mediated by sensitized T lymphocytes."
  },
  {
    q: "What is the normal expected reference range of total leukocyte count (WBC) in a healthy adult?",
    opts: ["1,500 to 3,000 cells/µL", "4,000 to 11,000 cells/µL", "12,000 to 18,000 cells/µL", "20,000 to 25,000 cells/µL"],
    ans: 1,
    source: "WHO standard values",
    explain: "The standard physiological count of leukocytes is 4,000 to 11,000 cells/µL. Lower counts indicate leukopenia, while higher counts indicate leukocytosis."
  },
  {
    q: "A patient is evaluated for an allergic reaction. The nurse knows that basophils release histamine to promote:",
    opts: ["Vasoconstriction", "Vasodilation and increased capillary permeability", "Bronchodilation", "Anti-inflammatory actions"],
    ans: 1,
    source: "UPPSC U.P. Staff Nurse",
    explain: "Histamine released by basophils and mast cells causes systemic vasodilation and increased capillary permeability, leading to traditional skin allergic reactions."
  }
];

// ==========================================
// MOCK 4: PLATELETS, COAGULATION & PHARMACOLOGY (50 Questions)
// ==========================================
export const MOCK_4_DATA: Question[] = [
  {
    q: "A nursing officer reviews a patient's CBC report. What is the normal physiological reference range for a total platelet count (thrombocytes)?",
    opts: ["50,000 to 100,000/µL", "150,000 to 450,000/µL", "500,000 to 800,000/µL", "Over 1,000,000/µL"],
    ans: 1,
    source: "AIIMS Jodhpur Gr I Staff Nurse",
    explain: "The standard physiological reference range for blood platelets is 150,000 to 450,000/µL, helping maintain vascular wall integrity and blood clotting."
  },
  {
    q: "Platelets are synthesized in the red bone marrow from fragments of which large precursor cell type?",
    opts: ["Erythroblasts", "Megakaryocytes", "Monoblasts", "Myeloblasts"],
    ans: 1,
    source: "BHU Nursing Officer Exam",
    explain: "Megakaryocytes are giant multinucleated cells in the red marrow. Their cytoplasm fragments to form thousands of circulating thrombocytes."
  },
  {
    q: "A patient's platelet count is noted to be 45,000/µL. This condition is termed:",
    opts: ["Thrombocytosis", "Thrombocytopenia", "Leukopenia", "Polycythemia"],
    ans: 1,
    source: "HPSSC Staff Nurse Paper",
    explain: "Thrombocytopenia is defined as a platelet count under 150,000/µL. Counts below 50,000/µL increase the risk of bleeding from minor trauma."
  },
  {
    q: "At what critical platelet count threshold does the risk of spontaneous, life-threatening intracranial hemorrhage increase significantly?",
    opts: ["Under 100,000/µL", "Under 50,000/µL", "Under 20,000/µL", "Around 120,000/µL"],
    ans: 2,
    source: "LNJP Delhi Staff Nurse",
    explain: "Platelet counts under 20,000/µL pose a high risk for spontaneous, severe hemorrhage, requiring prophylactic platelet transfusions and safety precautions."
  },
  {
    q: "Which clinical clotting factor is universally designated as Factor II?",
    opts: ["Fibrinogen", "Prothrombin", "Thromboplastin", "Hageman factor"],
    ans: 1,
    source: "ESIC Staff Nurse Exam",
    explain: "Factor I is fibrinogen, Factor II is prothrombin, Factor III is tissue thromboplastin, and Factor IV is calcium."
  },
  {
    q: "Which vitamin is essential for hepatic synthesis of clotting factors II, VII, IX, and X?",
    opts: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
    ans: 3,
    source: "DSSSB Staff Nurse",
    explain: "Vitamin K is an essential cofactor for the gamma-carboxylation of glutamic acid residues in clotting factors II, VII, IX, and X."
  },
  {
    q: "A newborn is administered intramuscular Vitamin K shortly helper birth. The anatomical reason for this is:",
    opts: ["A newborn's liver cannot synthesize proteins", "The sterile intestinal tract of a newborn lacks bacteria to synthesize vitamin K", "Maternal antibodies destroy infant vitamin K", "To prevent neonatal infections"],
    ans: 1,
    source: "RUHS M.Sc Nursing Entrance",
    explain: "Neonates are born with sterile intestines. Lacking gut bacteria, they cannot synthesize vitamin K, making them vulnerable to hemorrhagic disease of the newborn (HDN)."
  },
  {
    q: "Which ion serves as a crucial factor (Factor IV) in both the intrinsic and extrinsic pathways of the clotting cascade?",
    opts: ["Sodium", "Potassium", "Calcium", "Magnesium"],
    ans: 2,
    source: "NVS Staff Nurse Exam",
    explain: "Calcium ions (Factor IV) are required at almost every major step of the coagulation cascade, facilitating the assembly of clotting factor complexes."
  },
  {
    q: "The final common pathway of the clotting cascade begins with the activation of which factor?",
    opts: ["Factor VIII", "Factor IX", "Factor X (Stuart-Prower factor)", "Factor XII"],
    ans: 2,
    source: "UPPSC U.P. Staff Nurse",
    explain: "Factor X is the convergence point of the intrinsic and extrinsic pathways. Its activation converts prothrombin to thrombin, which then converts fibrinogen to fibrin."
  },
  {
    q: "Which specific substance converts soluble fibrinogen into insoluble fibrin stands during clot formation?",
    opts: ["Plasmin", "Thrombin (Factor IIa)", "Heparin", "Streptokinase"],
    ans: 1,
    source: "ESIC Hospital Staff Nurse",
    explain: "Thrombin is a protease that cleaves fibrinogen into fibrin monomers. These monomers polymerize to form the structural mesh of an active blood clot."
  },
  {
    q: "The enzymatic breakdown of a blood clot's fibrin mesh during vascular healing is terms:",
    opts: ["Coagulation", "Hemostasis", "Fibrinolysis", "Agglutination"],
    ans: 2,
    source: "NVS Staff Nurse Practice",
    explain: "Fibrinolysis is the physiological process of breaking down fibrin clots. Plasmin is the primary enzyme responsible for this mesh cleavage."
  },
  {
    q: "Which enzyme is responsible for cleaving fibrin strands to dissolve old clots?",
    opts: ["Thrombin", "Plasmin", "Erythropoietin", "Amylase"],
    ans: 1,
    source: "Ruhs Post Basic B.Sc Entrance",
    explain: "Plasminogen is converted to active plasmin, which lyses fibrin strands to dissolve thrombi and restore vascular patency."
  },
  {
    q: "A patient is prescribed oral Warfarin (Coumadin) therapy. Which laboratory parameters are monitored to titrate their dosing?",
    opts: ["aPTT and Bleeding Time", "Prothrombin Time (PT) and International Normalized Ratio (INR)", "Platelet Count and Hematocrit", "Serum potassium"],
    ans: 1,
    source: "AIIMS Raipur Special Test",
    explain: "Warfarin inhibits vitamin K-dependent factors (extrinsic pathway). PT and INR are standard assays used to monitor its therapeutic efficacy."
  },
  {
    q: "What is the target therapeutic INR range for a patient on Warfarin therapy for deep vein thrombosis (DVT)?",
    opts: ["0.5 to 1.0", "1.0 to 1.5", "2.0 to 3.0", "4.0 to 5.0"],
    ans: 2,
    source: "Jhalawar Medical College",
    explain: "For standard indications like DVT, pulmonary embolism, or atrial fibrillation, the therapeutic target INR is 2.0 to 3.0."
  },
  {
    q: "Which medication should be administered as the antidote for a life-threatening Warfarin (Coumadin) overdose?",
    opts: ["Protamine sulfate", "Vitamin K (Phytonadione)", "Aspirin", "Calcium chloride"],
    ans: 1,
    source: "RUHS Grade II Nurse",
    explain: "Vitamin K is the specific antidote for warfarin, serving as a cofactor to resume hepatic synthesis of active clotting factors."
  },
  {
    q: "A patient on unfractionated Heparin has an aPTT of 130 seconds. What should the nursing officer do first?",
    opts: ["Increase the infusion rate", "Stop the heparin infusion and notify the physician", "Administer vitamin K", "Schedule a repeat blood test in 8 hours"],
    ans: 1,
    source: "RUHS Nursing Entrance",
    explain: "An aPTT of 130 seconds is significantly above the standard therapeutic range, increasing the risk of serious bleeding. The infusion should be stopped immediately."
  },
  {
    q: "Which of the following describes the mechanism of action of Aspirin as an antiplatelet agent?",
    opts: ["Inhibiting vitamin K-dependent factors", "Irreversible inhibition of cyclooxygenase-1 (COX-1) to block Thromboxane A2", "Neutralizing circulating thrombin", "Activating plasminogen directly"],
    ans: 1,
    source: "RPSC Raj. Staff Nurse",
    explain: "Aspirin acetylates COX-1 in platelets, blocking thromboxane A2 synthesis. This prevents platelet aggregation for the lifespan of the platelet (7-10 days)."
  },
  {
    q: "A patient with acute myocardial infarction (MI) is administered streptokinase. This drug is classified as a:",
    opts: ["Antiplatelet agent", "Oral anticoagulant", "Thrombolytic (fibrinolytic) agent", "Intravenous coagulant"],
    ans: 2,
    source: "IGNOU Nursing Officer",
    explain: "Streptokinase is a thrombolytic agent. It binds to plasminogen, forming an active complex that converts free plasminogen to plasmin, dissolving existing coronary clots."
  },
  {
    q: "Which of the following is considered an absolute contraindication for administering thrombolytic therapy in an active stroke patient?",
    opts: ["Diabetes mellitus", "History of recent hemorrhagic stroke or active internal bleeding", "Age over 65 years", "Myocardial infarction three years ago"],
    ans: 1,
    source: "ESIC All-India Staff Nurse",
    explain: "Fibrinolytics dissolve all fibrin clots. Active internal bleeding or a history of hemorrhagic stroke pose an extreme risk of life-threatening bleeding."
  },
  {
    q: "Which of the following clinical signs is an early indicator of thrombocytopenia or bleeding susceptibility in a patient?",
    opts: ["Generalized hives", "Petechiae and purpura on the skin", "Severe peripheral edema", "Clubbing of fingernails"],
    ans: 1,
    source: "AIIMS Bhopal Nursing Officer",
    explain: "Petechiae (small pinpoint hemorrhages) and purpura occur when red blood cells leak from capillaries due to platelet deficiency or dysfunction."
  },
  {
    q: "A patient is admitted with Idiopathic Thrombocytopenic Purpura (ITP). The nurse understands this condition is characterized by:",
    opts: ["Fibrinogen deficiencies", "Autoantibody-mediated destruction of platelets in the spleen", "An inherited lack of Factor VIII", "Overproduction of red blood cells"],
    ans: 1,
    source: "AIIMS Jodhpur Gr I",
    explain: "ITP is an autoimmune disorder where antiplatelet autoantibodies coat platelets, leading to their destruction by splenic macrophages."
  },
  {
    q: "Which of the following instructions is crucial to include in the care plan for a patient with severe thrombocytopenia?",
    opts: ["Encourage vigorous physical exercise", "Avoid intramuscular (IM) injections and use a soft-bristled toothbrush", "Administer aspirin for pain relief", "Perform deep systemic throat cultures daily"],
    ans: 1,
    source: "IGNOU Post B.Sc",
    explain: "IM injections can cause hematomas in patients with low platelets. A soft toothbrush helps prevent bleeding from weak gingival tissues."
  },
  {
    q: "What is the normal expected bleeding time (BT) range in a healthy adult according to Ivy's method?",
    opts: ["1 to 3 minutes", "2 to 9 minutes", "10 to 15 minutes", "20 to 30 minutes"],
    ans: 1,
    source: "RUHS M.Sc Entrance",
    explain: "Bleeding time measures primary hemostasis (platelet plug formation). Normal range by Ivy's method is typically 2 to 9 minutes."
  },
  {
    q: "What is the normal expected clotting time (CT) range in a healthy adult according to the Lee-White method?",
    opts: ["1 to 2 minutes", "5 to 15 minutes", "20 to 30 minutes", "Over 40 minutes"],
    ans: 1,
    source: "BSF Staff Nurse Practice",
    explain: "Clotting time measures the intrinsic coagulation pathway. Normal range by the Lee-White method is 5 to 15 minutes."
  },
  {
    q: "A patient on oral therapeutical iron notes that their stools have turned dark black in color. What should the nursing officer advise?",
    opts: ["Discontinue the medication immediately", "This is a normal, harmless side effect of iron therapy", "Seek emergency medical treatment for gastrointestinal bleeding", "Reduce the dose by half"],
    ans: 1,
    source: "IGNOU Post B.Sc Nursing",
    explain: "Unabsorbed iron in the gastrointestinal tract forms iron sulfide, which turns the stool dark black. This is normal and harmless."
  },
  {
    q: "An inherited X-linked recessive bleeding disorder caused by a deficiency in coagulation Factor VIII is:",
    opts: ["Hemophilia A (Classic)", "Hemophilia B (Christmas disease)", "Von Willebrand disease", "ITP"],
    ans: 0,
    source: "BSF Staff Nurse Special",
    explain: "Hemophilia A is an X-linked recessive genetic disorder characterized by a lack of clotting factor VIII, primarily affecting males."
  },
  {
    q: "Hemophilia B (Christmas Disease) is caused by a deficiency in which coagulation factor?",
    opts: ["Factor VIII", "Factor IX", "Factor XI", "Factor XII"],
    ans: 1,
    source: "RRB Delhi Recruitment",
    explain: "Hemophilia B is caused by an inherited deficiency of coagulation Factor IX. It is less common than Hemophilia A but shares similar clinical features."
  },
  {
    q: "A child with severe hemophilia presents with swollen, painful joints helper minor trauma. This bleeding into joint spaces is termed:",
    opts: ["Hematuria", "Hemoptysis", "Hemarthrosis", "Hematoma"],
    ans: 2,
    source: "AIIMS Nagpur Nursing Officer",
    explain: "Hemarthrosis is bleeding into joint spaces, a classic complication of severe hemophilia that can lead to chronic joint damage if untreated."
  },
  {
    q: "Which of the following medications is strictly contraindicated for pain management in a hemophilic child?",
    opts: ["Paracetamol", "Aspirin and Ibuprofen", "Codeine sulfate", "Morphine"],
    ans: 1,
    source: "BHU Staff Nurse Paper",
    explain: "Aspirin and NSAIDs inhibit platelet aggregation, exacerbating the bleeding risk in hemophilia patients."
  },
  {
    q: "Which laboratory finding is typical in a patient with severe Hemophilia A?",
    opts: ["Prolonged Bleeding Time (BT)", "Prolonged Prothrombin Time (PT)", "Prolonged Activated Partial Thromboplastin Time (aPTT)", "Thrombocytopenia"],
    ans: 2,
    source: "IGNOU Post Basic B.Sc",
    explain: "Factor VIII belongs to the intrinsic pathway. Its deficiency prolongs the aPTT, while platelet count, bleeding time, and PT remain normal."
  },
  {
    q: "The nurse is educating the parents of a child with hemophilia. Which of the following instructions is crucial for home care?",
    opts: ["Encourage contact sports to build strength", "Provide a soft-bristled toothbrush and a safe, clutter-free environment", "Administer intramuscular injections for pain control", "Limit fluid intake to prevent joint swelling"],
    ans: 1,
    source: "ESIC Nursing Specialist",
    explain: "Preventing trauma is key in hemophilia management. Using a soft toothbrush and ensuring a safe home environment help minimize the risk of bleeding."
  },
  {
    q: "Which specific substance, synthesized by gastric parietal cells, is essential for the systemic absorption of dietary Vitamin B12 in the terminal ileum?",
    opts: ["Hydrochloric acid", "Intrinsic factor", "Pepsinogen", "Gastrin"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Intrinsic factor is a glycoprotein manufactured by the stomach's parietal cells. It binds to Vitamin B12, protecting it from digestion until it is absorbed in the terminal ileum."
  },
  {
    q: "Which plasma protein serves as the primary carrier for transporting iron in the bloodstream?",
    opts: ["Albumin", "Transferrin", "Ferritin", "Hemosiderin"],
    ans: 1,
    source: "RPSC Staff Nurse",
    explain: "Transferrin is a glycoprotein synthesized by the liver that binds and transports iron through the bloodstream to the bone marrow."
  },
  {
    q: "A healthy adult female has a normal Packed Cell Volume (PCV/Hematocrit) range of:",
    opts: ["20% to 30%", "37% to 47%", "50% to 60%", "70% to 80%"],
    ans: 1,
    source: "RUHS M.Sc Entrance Exam",
    explain: "The normal hematocrit range is 37% to 47% for adult females, and 40% to 54% for adult males."
  },
  {
    q: "Which of the following is considered an early clinical sign of transfusion-associated circulatory overload (TACO)?",
    opts: ["High fever and chills", "Hypotension and bradycardia", "Dyspnea, orthopnea, and cough with pink, frothy sputum", "Severe lumbar back pain"],
    ans: 2,
    source: "AIIMS Raipur Special",
    explain: "Rapid fluid infusion can lead to pulmonary congestion, causing dyspnea, orthopnea, crackles, and cough with pink, frothy sputum."
  },
  {
    q: "A patient with Type O positive blood requires a packed RBC transfusion. Which donor blood type is compatible?",
    opts: ["O Positive or O Negative only", "A Positive or B Positive", "AB Positive", "Any Rh-positive blood type"],
    ans: 0,
    source: "ESIC Staff Nurse",
    explain: "Type O individuals have circulating anti-A and anti-B antibodies and can only receive Type O blood safely."
  },
  {
    q: "A patient is diagnosed with Polycythemia Vera. The nurse expects the treatment plan to include:",
    opts: ["Frequent blood transfusions", "Therapeutic phlebotomy (venesection)", "Iron supplementation", "Erythropoietin injections"],
    ans: 1,
    source: "IGNOU Nursing Officer",
    explain: "Polycythemia vera is a myeloproliferative disorder causing overproduction of RBCs. Therapeutic phlebotomy reduces blood volume and viscosity."
  },
  {
    q: "A patient with deep vein thrombosis is started on warfarin therapy. The nurse should explain that warfarin works by:",
    opts: ["Directly dissolving the existing thrombus", "Inhibiting hepatic synthesis of vitamin K-dependent clotting factors", "Preventing platelet aggregation", "Deactivating circulating heparin"],
    ans: 1,
    source: "BHU Exam",
    explain: "Warfarin is an oral anticoagulant that inhibits vitamin K epoxide reductase, preventing synthesis of factors II, VII, IX, and X."
  },
  {
    q: "An adult patient on heparin therapy developed a severe drop in platelet count (LCR from 210,000 to 60,000/µL) along with thrombosis. The nurse suspects:",
    opts: ["Aplastic bone crises", "Heparin-Induced Thrombocytopenia (HIT)", "ITP", "Disseminated intravascular coagulation"],
    ans: 1,
    source: "AIIMS Patna Staff Nurse",
    explain: "HIT is a serious immune-mediated reaction where heparin-platelet factor 4 complexes trigger platelet activation, causing thrombocytopenia and thrombosis."
  },
  {
    q: "The drug of choice to treat venous thrombosis during pregnancy is:",
    opts: ["Oral Warfarin", "Low Molecular Weight Heparin (LMWH, e.g., Enoxaparin)", "Aspirin", "Streptokinase"],
    ans: 1,
    source: "WCL Staff Nurse Dec",
    explain: "Heparin and LMWH do not cross the placental barrier, making them safe for treating venous thrombosis during pregnancy. Warfarin is teratogenic and contraindicated."
  },
  {
    q: "To monitor a patient receiving Low Molecular Weight Heparin (LMWH, e.g. Enoxaparin), the nurse knows that standard testing usually:",
    opts: ["Requires daily PT/INR checks", "Requires daily aPTT testing", "Does not require routine coagulation monitoring", "Asserts platelet aggregation times only"],
    ans: 2,
    source: "AIIMS Bathinda Special",
    explain: "LMWH has a predictable therapeutic response and does not require routine coagulation monitoring, unlike unfractionated heparin."
  },
  {
    q: "A patient with hemophilia experiences minor bleeding. Which medication can be administered to stimulate endothelial release of Factor VIII?",
    opts: ["Desmopressin (DDAVP)", "Heparin", "Vitamin K", "Protamine sulfate"],
    ans: 0,
    source: "DSSSB Nursing Exam",
    explain: "Desmopressin stimulates the release of stored Factor VIII and von Willebrand factor from endothelial cells, helping manage mild hemophilia."
  },
  {
    q: "A child is scheduled for a bone marrow aspiration. The most common site selected for this procedure in a child over 2 years of age is the:",
    opts: ["Sternum", "Anterior or posterior superior iliac crest", "Proximal tibia", "Femur shaft"],
    ans: 1,
    source: "AIIMS Raipur Prep",
    explain: "The posterior superior iliac crest is the preferred site for bone marrow aspiration in both adults and children over 2 years of age, as it is a safe and accessible source."
  },
  {
    q: "A nursing officer is checking the laboratory findings of an adult male. Which of the following hemoglobin values is defined as anemia?",
    opts: ["Hemoglobin < 11.0 g/dL", "Hemoglobin < 12.0 g/dL", "Hemoglobin < 13.0 g/dL", "Hemoglobin < 14.0 g/dL"],
    ans: 2,
    source: "WHO Guidelines",
    explain: "For adult males, anemia is defined as hemoglobin < 13.0 g/dL. For non-pregnant adult females, the threshold is < 12.0 g/dL."
  },
  {
    q: "Which specific substance, synthesized by gastric parietal cells, is essential for the systemic absorption of dietary Vitamin B12 in the terminal ileum?",
    opts: ["Hydrochloric acid", "Intrinsic factor", "Pepsinogen", "Gastrin"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Intrinsic factor is a glycoprotein manufactured by the stomach's parietal cells. It binds to Vitamin B12, protecting it from digestion until it is absorbed in the terminal ileum."
  },
  {
    q: "A patient develops autoantibodies that destroy gastric parietal cells, resulting in a severe intrinsic factor deficiency. The nurse expects a diagnosis of:",
    opts: ["Iron deficiency anemia", "Aplastic anemia", "Pernicious anemia", "Thalassemia major"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I",
    explain: "Pernicious anemia is a specific autoimmune disease characterized by mucosal atrophy and destruction of gastric parietal cells, leading to Vitamin B12 malabsorption."
  },
  {
    q: "A patient with iron deficiency anemia is prescribed liquid iron. Which of the following is optimal advice?",
    opts: ["Take with a glass of tea", "Take the dose with warm milk", "Administer through a straw and rinse the mouth immediately", "Mix with a carbonated beverage"],
    ans: 2,
    source: "RUHS Grade II Nurse",
    explain: "Liquid iron can stain teeth. Using a straw and rinsing immediately helps prevent staining."
  },
  {
    q: "Which of the following describes the shape of red blood cells in a patient with Thalassemia minor?",
    opts: ["Spherocytic and dark", "Macrocytic and hyperchromic", "Microcytic and hypochromic with target cells", "Sickled and crescent-shaped"],
    ans: 2,
    source: "RUHS Post Basic",
    explain: "Thalassemia minor is characterized by microcytic, hypochromic target cells on blood smears."
  },
  {
    q: "A patient who had a subtotal gastrectomy 5 years ago is at high risk for:",
    opts: ["Iron overload", "Folate deficiency", "Pernicious anemia", "Aplastic anemia"],
    ans: 2,
    source: "IGNOU Post B.Sc",
    explain: "A gastrectomy removes parietal cells, leading to a lack of intrinsic factor and Vitamin B12 deficiency (pernicious anemia) over several years."
  },
  {
    q: "In an emergency, which blood type is considered the safest to transfuse as a universal donor when the patient's Rh status is unknown?",
    opts: ["O Positive", "O Negative", "AB Positive", "AB Negative"],
    ans: 1,
    source: "AIIMS Raipur Special",
    explain: "Type O Negative blood lacks A, B, and Rh antigens, making it the universal donor type that minimizes transfusion reaction risks in emergencies."
  }
];

// ==========================================
// MOCK 5: ADVANCED HEMATOLOGY, TRANSFUSIONS & MALIGNANCIES (48 Questions)
// ==========================================
export const MOCK_5_DATA: Question[] = [
  {
    q: "A patient is suspected of having Hodgkin's lymphoma. Which of the following pathognomonic cells must be present in the lymph node biopsy to confirm this diagnosis?",
    opts: ["Reed-Sternberg cells (giant, multinucleated 'owl-eye' cells)", "Auer rods", "Blast cells", "Smudge cells"],
    ans: 0,
    source: "AIIMS Jodhpur Gr I Staff Nurse",
    explain: "Reed-Sternberg cells (large, multinucleated B-cells with an 'owl-eye' appearance) are the hallmark diagnostic indicator of Hodgkin's Lymphoma."
  },
  {
    q: "A child is diagnosed with Acute Lymphoblastic Leukemia (ALL). The nurse knows that ALL is characterized by:",
    opts: ["Overproduction of mature neutrophils", "Uncontrolled proliferation of immature lymphoid cells (blasts) in the bone marrow", "A deficiency in plasma proteins", "Spontaneous splenic sequestration"],
    ans: 1,
    source: "BHU Nursing Officer Exam",
    explain: "ALL involves the rapid proliferation of abnormal, immature lymphocytes (lymphoblasts) that crowd out normal marrow cells."
  },
  {
    q: "A patient with Leukemia has a white blood cell count of 120,000/µL, but is highly susceptible to infections. The nurse explains that:",
    opts: ["The cells are trapped in the spleen", "The majority of these circulating leukocytes are immature and non-functional", "Platelets are destroying the white cells", "Plasma volume is too low"],
    ans: 1,
    source: "HPSSC Staff Nurse Paper",
    explain: "In leukemia, high leukocyte counts consist largely of immature cancer cells (blast cells) that cannot protect against infection."
  },
  {
    q: "Which of the following is considered the primary diagnostic test to confirm leukemia and determine its specific subtype?",
    opts: ["Serum protein electrophoresis", "Bone marrow aspiration and biopsy", "Lymph node biopsy", "Coomb's test"],
    ans: 1,
    source: "LNJP Delhi Staff Nurse",
    explain: "Bone marrow aspiration and biopsying provide direct cellular evaluation of the bone marrow, enabling the diagnosis of leukemia."
  },
  {
    q: "A patient with Acute Myeloid Leukemia (AML) is noted to have 'Auer rods' inside the blast cells. The presence of Auer rods is classic for:",
    opts: ["AML", "ALL", "CML", "CLL"],
    ans: 0,
    source: "ESIC Staff Nurse Exam",
    explain: "Auer rods (clumped granules in the cytoplasm of myeloblasts) are a pathognomonic finding on blood smears for Acute Myeloid Leukemia."
  },
  {
    q: "A patient with Chronic Myelogenous Leukemia (CML) is noted to have a genetic translocation between chromosomes 9 and 22. This abnormality is known as the:",
    opts: ["Reed-Sternberg translocation", "Philadelphia chromosome", "Cooley's genetic marker", "Auer rod marker"],
    ans: 1,
    source: "DSSSB Staff Nurse",
    explain: "The Philadelphia Chromosome is a translocation between chromosomes 9 and 22, t(9;22), resulting in the BCR-ABL fusion gene, which is diagnostic for CML."
  },
  {
    q: "A patient with leukemia develops severe tumor lysis syndrome (TLS) helper starting chemotherapy. The nurse anticipates administering which of the following to manage hyperuricemia?",
    opts: ["Ferrous sulfate", "Allopurinol and intravenous hydration", "Heparin infusion", "Vitamin K injections"],
    ans: 1,
    source: "RUHS M.Sc Nursing Entrance",
    explain: "Chemotherapy-induced cell lysis releases massive amounts of intracellular purines, which metabolize into uric acid. Allopurinol blocks this uric acid production."
  },
  {
    q: "The nurse is monitoring a leukemia patient undergoing induction chemotherapy. Which of the following is a classic clinical sign of Thrombocytopenia?",
    opts: ["High spikes in fever", "Petechiae, purpura, and epistaxis", "Severe dyspnea on exertion", "Generalized skeletal joint pain"],
    ans: 1,
    source: "NVS Staff Nurse Exam",
    explain: "Thrombocytopenia can manifest with petechiae, purpura, epistaxis (nosebleeds), and bleeding gums."
  },
  {
    q: "A patient with leukemia has an absolute neutrophil count (ANC) of 350/µL. What should the nurse exclude from the patient's care plane?",
    opts: ["Cooked meats and steamed fish", "Potted plants, fresh flowers, and raw fruits/vegetables", "Standard antiseptic mouthwashes", "Using a soft-bristled toothbrush"],
    ans: 1,
    source: "UPPSC U.P. Staff Nurse",
    explain: "Potted plants, fresh flowers, and raw foods carry soil-borne bacteria and fungi, posing an infection risk during protective isolation."
  },
  {
    q: "A patient develops a life-threatening systemic coagulopathy characterized by simultaneous widespread microthrombi and bleeding. This syndrome is known as:",
    opts: ["Idiopathic Thrombocytopenic Purpura (ITP)", "Disseminated Intravascular Coagulation (DIC)", "Hemophilia A major", "Thalassemia Major"],
    ans: 1,
    source: "ESIC Hospital Staff Nurse",
    explain: "DIC involves systemic activation of coagulation, depleting platelets and clotting factors, leading to simultaneous thrombi and severe bleeding."
  },
  {
    q: "Which laboratory finding is classic and highly diagnostic for Disseminated Intravascular Coagulation (DIC)?",
    opts: ["Elevated platelet count", "Elevated fibrin split products (FSPs) and D-dimer", "Shortened aPTT times", "Decreased serum iron"],
    ans: 1,
    source: "NVS Staff Nurse Practice",
    explain: "FSPs and D-dimer measure fibrin clot degradation, which is elevated in DIC due to ongoing clot formation and subsequent lysis."
  },
  {
    q: "A patient has an absolute neutrophil count (ANC) of 350/µL. What should the nurse exclude from the patient's care plane?",
    opts: ["Cooked meats and steamed fish", "Potted plants, fresh flowers, and raw fruits/vegetables", "Standard antiseptic mouthwashes", "Using a soft-bristled toothbrush"],
    ans: 1,
    source: "UPPSC U.P. Staff Nurse",
    explain: "Potted plants, fresh flowers, and raw foods carry soil-borne bacteria and fungi, posing an infection risk during protective isolation."
  },
  {
    q: "A pediatric patient with severe Hemophilia A is scheduled for an elective surgical procedure. The nurse expects to administer what prophylactic treatment beforehand?",
    opts: ["Fresh Frozen Plasma (FFP) only", "Recombinant Factor VIII concentrate", "Intravenous Vitamin K", "Oral Aspirin"],
    ans: 1,
    source: "Ruhs Post Basic B.Sc Entrance",
    explain: "Administering recombinant Factor VIII concentrate before surgery ensures adequate clotting factors to prevent hemorrhage."
  },
  {
    q: "Which specific substance, synthesized by gastric parietal cells, is essential for the systemic absorption of Vitamin B12?",
    opts: ["Hydrochloric acid", "Intrinsic factor", "Pepsinogen", "Gastrin"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Intrinsic factor is a glycoprotein manufactured by the stomach's parietal cells. It binds to Vitamin B12, protecting it from digestion until it is absorbed in the terminal ileum."
  },
  {
    q: "Which blood component is typically administered to correct deficiencies in multiple clotting factors when specific concentrates are unavailable?",
    opts: ["Packed Red Blood Cells (PRBCs)", "Fresh Frozen Plasma (FFP)", "Platelet concentrate", "Serum albumin"],
    ans: 1,
    source: "AIIMS Raipur Special Test",
    explain: "FFP contains all coagulation factors in systemic physiological concentrations, making it ideal for treating bleeding from multiple factor deficiencies."
  },
  {
    q: "Cryoprecipitate is specifically administered because it is highly rich in which of the following clotting elements?",
    opts: ["Heme and globin protein chains", "Fibrinogen and Factor VIII", "Factor IX and Factor XII", "Albumin and globulins"],
    ans: 1,
    source: "Jhalawar Medical College",
    explain: "Cryoprecipitate is prepared from thawing FFP and is highly rich in fibrinogen, Factor VIII, and von Willebrand factor."
  },
  {
    q: "A patient is prescribed 2 units of Packed RBCs (PRBCs). What is the maximum duration allowed to complete the transfusion of 1 unit of PRBCs to prevent bacterial growth?",
    opts: ["2 hours", "4 hours", "6 hours", "8 hours"],
    ans: 1,
    source: "AIIMS Delhi Prep",
    explain: "Precompiled blood products must not hang for more than 4 hours due to the risk of bacterial contamination at room temperature."
  },
  {
    q: "While administering blood, what is the mandatory minimum size of the intravenous cannula recommended for a standard adult blood transfusion?",
    opts: ["24 Gauge (Yellow)", "22 Gauge (Blue)", "18 Gauge (Green) or 20 Gauge (Pink)", "26 Gauge (Violet)"],
    ans: 2,
    source: "RUHS Grade II Nurse",
    explain: "An 18 Gauge or 20 Gauge cannula is recommended for blood transfusions to allow smooth flow of cellular elements without hemolysis."
  },
  {
    q: "Which class of transfusion reaction occurs within 24 hours of transfusion due to antibody-mediated destruction of donor cells?",
    opts: ["Delayed hemolytic reaction", "Acute hemolytic reaction", "Sepsis reaction", "Allergic reaction"],
    ans: 1,
    source: "RUHS Nursing Entrance",
    explain: "Acute hemolytic reactions are caused by ABO incompatibility, triggering complement-mediated RBC destruction within 24 hours."
  },
  {
    q: "What is the normal expected lifespan of blood platelets (thrombocytes) in standard human circulation?",
    opts: ["1 to 2 days", "7 to 10 days", "30 days", "120 days"],
    ans: 1,
    source: "RPSC Raj. Staff Nurse",
    explain: "The standard physiological lifespan of blood platelets is 7 to 10 days before they are cleared by the spleen."
  },
  {
    q: "Which specific clinical observation requires the nurse to suspect microvascular bleeding in a patient with severe thrombocytopenia?",
    opts: ["High spikes in fever", "Petechiae, purpura, and bleeding gums", "Orthostatic dyspnea", "Joint effusion"],
    ans: 1,
    source: "IGNOU Nursing Officer",
    explain: "Low platelets impair capillary sealing, leading to petechiae, purpura, and mucosal bleeding (bleeding gums)."
  },
  {
    q: "Which of the following is considered an early clinical sign of transfusion-associated circulatory overload (TACO)?",
    opts: ["High fever and chills", "Hypotension and bradycardia", "Dyspnea, orthopnea, and cough with pink, frothy sputum", "Severe lumbar back pain"],
    ans: 2,
    source: "AIIMS Raipur Special",
    explain: "TACO is characterized by fluid overload, leading to pulmonary congestion (crackles, dyspnea, orthopnea)."
  },
  {
    q: "Which donor blood type is compatible with a patient who has Type O positive blood and requires a packed RBC transfusion?",
    opts: ["O Positive or O Negative only", "A Positive or B Positive", "AB Positive", "Any Rh-positive blood type"],
    ans: 0,
    source: "ESIC Staff Nurse",
    explain: "Type O individuals have circulating anti-A and anti-B antibodies and can only receive Type O blood safely."
  },
  {
    q: "A child is diagnosed with Chronic Myeloid Leukemia (CML). The nurse understands that CML is characterized by:",
    opts: ["Overproduction of mature neutrophils", "Uncontrolled proliferation of immature lymphoid cells", "Presence of the Philadelphia Chromosome", "Iron deficiency"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I",
    explain: "CML is characterized by the Philadelphia chromosome, a translocation t(9;22) that creates the BCR-ABL fusion gene."
  },
  {
    q: "A patient undergoes a total gastrectomy. The nurse should explain that the loss of parietal cells will require lifelong injections of:",
    opts: ["Iron dextran", "Folic Acid", "Cyanocobalamin (Vitamin B12)", "Erythropoietin"],
    ans: 2,
    source: "IGNOU Nursing Officer",
    explain: "A gastrectomy removes gastric parietal cells, eliminating intrinsic factor production and causing lifelong Vitamin B12 deficiency."
  },
  {
    q: "Which clinical laboratory test measures intrinsic pathway clotting efficiency and is used to monitor unfractionated Heparin therapy?",
    opts: ["Bleeding Time", "Prothrombin Time", "Activated Partial Thromboplastin Time (aPTT)", "Thrombin Time"],
    ans: 2,
    source: "AIIMS Bathinda Special",
    explain: "The aPTT test evaluates blood clotting via the intrinsic clotting pathway, making it the standard test for monitoring unfractionated heparin therapy."
  },
  {
    q: "What is the therapeutic target range for aPTT during Heparin therapy?",
    opts: ["Half of the normal baseline", "Equal to the normal baseline", "1.5 to 2.5 times the control baseline", "More than 5 times the normal baseline"],
    ans: 2,
    source: "DSSSB Nursing Exam",
    explain: "The therapeutic range for aPTT during heparin therapy is 1.5 to 2.5 times the normal baseline value."
  },
  {
    q: "Which specific drug acts as the direct, fast-acting chemical antidote for an overdose of unfractionated Heparin?",
    opts: ["Vitamin K", "Protamine Sulfate", "Aminocaproic Acid", "Calcium Gluconate"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Protamine sulfate is a strongly basic protein that binds to and neutralizes acidic heparin molecules, reversing its anticoagulant effects."
  },
  {
    q: "A patient develops autoantibodies that destroy gastric parietal cells, resulting in a severe intrinsic factor deficiency. The nurse expects a diagnosis of:",
    opts: ["Iron deficiency anemia", "Aplastic anemia", "Pernicious anemia", "Thalassemia major"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I",
    explain: "Pernicious anemia is a autoimmune disease characterized by gastric parietal cell destruction, leading to Vitamin B12 malabsorption."
  },
  {
    q: "A patient with iron deficiency anemia is prescribed liquid iron. Which of the following is optimal advice?",
    opts: ["Take with a glass of tea", "Take the dose with warm milk", "Administer through a straw and rinse the mouth immediately", "Mix with a carbonated beverage"],
    ans: 2,
    source: "RUHS Grade II Nurse",
    explain: "Liquid iron can stain teeth. Using a straw and rinsing immediately helps prevent staining."
  },
  {
    q: "Which of the following describes the shape of red blood cells in a patient with Thalassemia minor?",
    opts: ["Spherocytic and dark", "Macrocytic and hyperchromic", "Microcytic and hypochromic with target cells", "Sickled and crescent-shaped"],
    ans: 2,
    source: "RUHS Post Basic",
    explain: "Thalassemia minor is characterized by microcytic, hypochromic target cells on blood smears."
  },
  {
    q: "A patient who had a subtotal gastrectomy 5 years ago is at high risk for:",
    opts: ["Iron overload", "Folate deficiency", "Pernicious anemia", "Aplastic anemia"],
    ans: 2,
    source: "IGNOU Post B.Sc",
    explain: "A gastrectomy removes parietal cells, leading to a lack of intrinsic factor and Vitamin B12 deficiency (pernicious anemia) over several years."
  },
  {
    q: "In an emergency, which blood type is considered the safest to transfuse as a universal donor when the patient's Rh status is unknown?",
    opts: ["O Positive", "O Negative", "AB Positive", "AB Negative"],
    ans: 1,
    source: "AIIMS Raipur Special",
    explain: "Type O Negative blood lacks A, B, and Rh antigens, making it the universal donor type that minimizes transfusion reaction risks in emergencies."
  },
  {
    q: "Which antibody class is typically present in secretions like breast milk and colostrum?",
    opts: ["IgG", "IgM", "IgA", "IgD"],
    ans: 2,
    source: "IGNOU Nursing Prep",
    explain: "IgA is the primary immunoglobulin in secretory fluids, providing passive immunity to infants."
  },
  {
    q: "Which of the following describes the biological action of vaccines?",
    opts: ["Neutralizing toxins directly with antibodies", "Stimulating pre-formed plasma compounds", "Introducing antigens to trigger antibody production and memory cell formation", "Encouraging passive cellular absorption"],
    ans: 2,
    source: "RRB Delhi Recruitment",
    explain: "Vaccines expose the immune system to weakened or inactive antigens, prompting active antibody production and memory cell formation without causing disease."
  },
  {
    q: "What is the normal expected reference range of total leukocyte count (WBC) in a healthy adult?",
    opts: ["1,500 to 3,000 cells/µL", "4,000 to 11,000 cells/µL", "12,000 to 18,000 cells/µL", "20,000 to 25,000 cells/µL"],
    ans: 1,
    source: "WHO standard values",
    explain: "The standard physiological count of leukocytes is 4,000 to 11,000 cells/µL. Lower counts indicate leukopenia, while higher counts indicate leukocytosis."
  },
  {
    q: "A patient is evaluated for an allergic reaction. The nurse knows that basophils release histamine to promote:",
    opts: ["Vasoconstriction", "Vasodilation and increased capillary permeability", "Bronchodilation", "Anti-inflammatory actions"],
    ans: 1,
    source: "UPPSC U.P. Staff Nurse",
    explain: "Histamine released by basophils and mast cells causes systemic vasodilation and increased capillary permeability, leading to traditional skin allergic reactions."
  },
  {
    q: "A nursing officer receives a tetanus toxoid vaccine. What class of immunological defense does this stimulate?",
    opts: ["Active natural immunity", "Passive natural immunity", "Active artificial immunity", "Passive artificial immunity"],
    ans: 2,
    source: "RUHS Nursing Entrance",
    explain: "Vaccines and toxoids provide active artificial immunity, where antigen administration stimulates the recipient's immune system to produce antibodies and memory cells."
  },
  {
    q: "Which lymphocytic cell type is responsible for coordinating cell-mediated immune responses, directly destroying virally infected or malignant cells?",
    opts: ["B Lymphocyte", "T Lymphocyte (Helper/Cytotoxic T cells)", "Plasma cells", "Erythroid progenitors"],
    ans: 1,
    source: "NVS Staff Nurse Exam",
    explain: "T cells manage cell-mediated immunity. Cytotoxic T cells directly destroy infected cells, while Helper T cells coordinate the broader immune response."
  },
  {
    q: "Which specific cellular chemical is released by basophils and mast cells to trigger vasodilation and increased capillary permeability during inflammation?",
    opts: ["Histamine", "Albumin", "Prothrombin", "Interferon"],
    ans: 0,
    source: "DSSSB Staff Nurse",
    explain: "Basophils and mast cells release histamine during inflammatory and allergic reactions, promoting vasodilation and vascular permeability."
  },
  {
    q: "Which leucocyte type is responsible for migrating into tissues to mature into macrophages, phagocytizing debris and foreign matter over the long term?",
    opts: ["Neutrophils", "Basophils", "Monocytes", "Lymphocytes"],
    ans: 2,
    source: "LNJP Delhi Staff Nurse",
    explain: "Monocytes are the largest circulating leukocytes. They migrate into tissues and mature into macrophages, which engulf debris and present antigens to lymphocytes."
  },
  {
    q: "What is the approximate water content found in human blood plasma?",
    opts: ["50% to 55%", "65% to 75%", "90% to 92%", "98% to 100%"],
    ans: 2,
    source: "LNJP Delhi Staff Nurse",
    explain: "Blood plasma consists of approximately 90% to 92% water, with the remaining 8% to 10% made of proteins (albumin, globulin, fibrinogen), electrolytes, waste, and nutrients."
  },
  {
    q: "A nursing officer is evaluating the arterial blood gas (ABG) report of an adult patient. Which of the following pH values indicates a normal physiological state of human blood?",
    opts: ["6.85 to 6.95", "7.15 to 7.25", "7.35 to 7.45", "7.55 to 7.65"],
    ans: 2,
    source: "AIIMS Jodhpur Gr I Staff Nurse",
    explain: "Normal human blood is slightly alkaline, with a stable arterial pH range of 7.35 to 7.45. Any value below 7.35 indicates acidosis, while any value above 7.45 indicates alkalosis."
  },
  {
    q: "Which specific substance, synthesized by gastric parietal cells, is essential for the systemic absorption of dietary Vitamin B12 in the terminal ileum?",
    opts: ["Hydrochloric acid", "Intrinsic factor", "Pepsinogen", "Gastrin"],
    ans: 1,
    source: "ESIC Recruitment Exam",
    explain: "Intrinsic factor is a glycoprotein manufactured by the stomach's parietal cells. It binds to Vitamin B12, protecting it from digestion until it is absorbed in the terminal ileum."
  },
  {
    q: "Which specific cellular chemical is released by basophils and mast cells to trigger vasodilation and increased capillary permeability during inflammation?",
    opts: ["Histamine", "Albumin", "Prothrombin", "Interferon"],
    ans: 0,
    source: "DSSSB Staff Nurse",
    explain: "Basophils and mast cells release histamine during inflammatory and allergic reactions, promoting vasodilation and vascular permeability."
  },
  {
    q: "A nursing officer reviews a patient's CBC report. What is the normal physiological reference range for a total platelet count (thrombocytes)?",
    opts: ["50,000 to 100,000/µL", "150,000 to 450,000/µL", "500,000 to 800,000/µL", "Over 1,000,000/µL"],
    ans: 1,
    source: "AIIMS Jodhpur Gr I Staff Nurse",
    explain: "The standard physiological reference range for blood platelets is 150,000 to 450,000/µL, helping maintain vascular wall integrity and blood clotting."
  },
  {
    q: "During the first 2 to 3 months of intrauterine fetal development, which anatomical site is responsible for blood cell synthesis?",
    opts: ["Spleen", "Yolk sac", "Liver", "Fetal bone marrow"],
    ans: 1,
    source: "AIIMS Bhopal Nursing Officer",
    explain: "The primitive hematopoiesis begins inside the fetal yolk sac in the first weeks of embryonic life. Later (around 2-6 months), the spleen and liver dominate before bone marrow takes over."
  },
  {
    q: "Which is the most diagnostic initial test for iron deficiency anemia?",
    opts: ["Serum ferritin level", "Mean corpuscular hemoglobin", "RBC count", "Bone marrow aspiration"],
    ans: 0,
    source: "AIIMS Bathinda",
    explain: "Serum ferritin reflects total body iron stores, making it the most diagnostic assay for iron deficiency."
  }
];
