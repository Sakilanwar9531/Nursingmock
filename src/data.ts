import { Subject, PyqCard, ExamDef } from "./types";
import { MOCK_1_DATA, MOCK_2_DATA, MOCK_3_DATA, MOCK_4_DATA, MOCK_5_DATA } from "./blood_data";

export const SUBJECTS: Subject[] = [
 { id: 'anatomy', icon: '🫀', name: 'Anatomy & Physiology', tests: [
  { id: 'cell-tissues-1', icon: '🔬', title: 'Cell & Tissues — Set 1', desc: 'Cell organelles, DNA structure, cytoplasm, membrane transport — first 30 questions.', questions: 30, mins: 30, ready: true, data: [
   { q: 'The "basic unit of life" is:', opts: ['Atom', 'Water', 'Cell', 'Chemical level of organization'], ans: 2, source: 'RUHS M.Sc Nursing Entrance 2013', explain: 'Cell is the basic structural and functional unit of life — also called \'structural unit of body\' or \'physical basis of life\'.' },
   { q: 'These are the basic units or building blocks of living organisms:', opts: ['Enzyme', 'Proton', 'Cells', 'Neutron'], ans: 2, source: 'AIIMS Raipur Staff Nurse Aug 2019', explain: 'Cells are the basic building blocks of all living organisms.' },
   { q: 'Physical basis of life is:', opts: ['Nucleus', 'Protoplasm', 'Cell', 'DNA'], ans: 1, source: 'RML Delhi Staff Nurse 2011', explain: 'Protoplasm is called the physical basis of life as it contains all the living matter of the cell.' },
   { q: 'The main difference between a prokaryotic cell and a eukaryotic cell is the absence of:', opts: ['Plasma membrane', 'Mitochondria', 'True nucleus', 'Flagella'], ans: 2, source: 'AIIMS Jodhpur Nursing Staff Gr I Aug 2018', explain: 'Prokaryotic cells lack a true membrane-bound nucleus. Their genetic material is not enclosed within a nuclear membrane.' },
   { q: 'Which of the following is NOT assimilated by eukaryotic cells?', opts: ['Lactate', 'Sulfate', 'Nitrogen', 'Glucose'], ans: 1, source: 'ESIC Staff Nurse Feb 2019', explain: 'Sulfate is not directly assimilated by eukaryotic cells. Lactate, nitrogen and glucose are all assimilated.' },
   { q: 'Which organelle is called \'power house of cell\'?', opts: ['Nucleus', 'Golgi bodies', 'Mitochondria', 'Ribosome'], ans: 2, source: 'RPSC Raj. Staff Nurse 2007', explain: 'Mitochondria contain enzymes for aerobic respiration and ATP synthesis; hence called the power house of the cell.' },
   { q: 'Which cellular component is responsible for oxidative metabolism?', opts: ['Mitochondria', 'Receptors', 'Lysosome', 'HLA molecules'], ans: 0, source: 'RRB Staff Nurse 2015', explain: 'Mitochondria are the sites of oxidative phosphorylation and ATP synthesis.' },
   { q: 'Aerobic respiration is performed by:', opts: ['Glyoxisomes', 'Ribosomes', 'Lysosomes', 'Mitochondria'], ans: 3, source: 'UPPSC U.P Staff Nurse 2017', explain: 'Mitochondria carry out aerobic oxygen-dependent respiration to produce ATP.' },
   { q: '........is a protein involved in forming the cytoskeleton.', opts: ['Fibronectin', 'Actin', 'Fibrin', 'Albumin'], ans: 1, source: 'AIIMS Bhopal Nursing Officer May 2018', explain: 'Actin is a key structural protein of the cytoskeleton consisting of microfilaments, microtubules and intermediate filaments.' },
   { q: 'Steroid synthesis occurs within which of the following structures?', opts: ['Peroxisome', 'Mitochondrion', 'Golgi apparatus', 'None of these'], ans: 1, source: 'RRB Staff Nurse 2015', explain: 'Steroid synthesis occurs in the cytoplasm and mitochondria, with the smooth endoplasmic reticulum also playing a role.' },
   { q: 'The aqueous component of the cell, within which various organelles and particles are suspended, is:', opts: ['Cytosol', 'Cytoplasm', 'Nucleus', 'Cytoblast'], ans: 0, source: 'AIIMS Raipur (P3) Staff Nurse 2017', explain: 'Cytosol is the fluid portion of cytoplasm. Cytoplasm = cytosol + organelles.' },
   { q: 'The organelles concerned with the metabolic processes are present inside the:', opts: ['Ribosome', 'Mitochondria', 'Cytoplasm', 'Endoplasmic reticulum'], ans: 2, source: 'RRB Staff Nurse 2019', explain: 'The cytoplasm houses all the metabolic organelles including mitochondria, ribosomes and endoplasmic reticulum.' },
   { q: 'Proteins that are to be used outside the cell are synthesized:', opts: ['In the mitochondria', 'On the rough endoplasmic reticulum', 'On the smooth endoplasmic reticulum', 'On free ribosomes'], ans: 1, source: 'RML Delhi Staff Nurse 2011', explain: 'Ribosomes attached to rough ER synthesize proteins for secretion outside the cell. Free ribosomes make proteins for internal use.' },
   { q: 'Protein synthesis is a function of:', opts: ['Smooth endoplasmic reticulum', 'Rough endoplasmic reticulum', 'Golgi apparatus', 'Mitochondria'], ans: 1, source: 'AIIMS Bhopal Nursing Officer May 2018', explain: 'Rough ER, studded with ribosomes, is the primary site of protein synthesis for secretory and membrane proteins.' },
   { q: 'Which medium is suitable for cellular activity?', opts: ['Acidic', 'Neutral', 'Basic', 'All of above'], ans: 2, source: 'Jhalawar Med. Coll. Staff Nurse 2010', explain: 'Normal cytoplasmic pH is ~7.2 slightly basic, optimal for enzyme activity. Acidic pH ~6.95 can cause coma.' },
   { q: 'How much water is there in the form of liquid in cells of our body?', opts: ['25%', '50%', '70%', '80%'], ans: 1, source: 'BSF Staff Nurse 2014', explain: 'About 50% of cell volume is intracellular fluid. Cytosol consists of 90% water and 10% dissolved substances.' },
   { q: 'Aquaporins are:', opts: ['Sodium channels', 'Potassium channels', 'Water channels', 'Chloride channels'], ans: 2, source: 'NVS Staff Nurse Jan 2018', explain: 'Aquaporins are transmembrane protein channels that facilitate rapid transport of water molecules across the cell membrane.' },
   { q: 'The number of chromosomes in a normal human cell is:', opts: ['46', '48', '50', '52'], ans: 0, source: 'RRB Staff Nurse 2015', explain: 'Normal human somatic cells are diploid, containing 46 chromosomes (23 pairs).' },
   { q: 'The process of copying the DNA sequence of a gene into messenger RNA is called:', opts: ['Transference', 'Transcription', 'Translocation', 'Translation'], ans: 1, source: 'RUHS M.Sc Nursing Entrance 2016', explain: 'Transcription is the first step in protein synthesis — a DNA gene is copied into mRNA. Translation is the second step.' },
   { q: 'Blackened, decomposing tissue devoid of blood circulation is known as:', opts: ['Contraction', 'Atrophy', 'Gangrene', 'Erythema'], ans: 2, source: 'UPPSC U.P Staff Nurse 2017', explain: 'Gangrene is necrosis or death of tissue resulting from deficient or absent blood supply.' },
   { q: 'Chromosomes contain:', opts: ['DNA', 'RNA', 'Both', 'None'], ans: 0, source: 'ESI Staff Nurse Jaipur 2009', explain: 'Chromosomes in nucleus of eukaryotic cells are linear long strand of DNA and some associated proteins that carries genetic information.' },
   { q: 'The genetic material, deoxyribonucleic acid (DNA) is contained in:', opts: ['Chromatin', 'Nucleoli', 'Chromosome', 'Nucleus'], ans: 2, source: 'AIIMS Nagpur Nursing Officer Feb 2020', explain: 'DNA is present in chromosomes of cells, is the chemical basis of heredity and the carrier of genetic information.' },
   { q: 'Which of the following is a long continuous strand of DNA that carries genetic information?', opts: ['Ribosome', 'Nucleus', 'Chromosome', 'Mitochondria'], ans: 2, source: 'AIIMS Jodhpur Nursing Staff Gr I Aug 2018', explain: 'Chromosomes are long continuous strands of DNA carrying genetic information from one generation to another.' },
   { q: 'The number of chromosomes in normal human cell is:', opts: ['46', '48', '50', '52'], ans: 0, source: 'RRB Staff Nurse 2015 Red', explain: 'Normal human somatic cells contain 46 chromosomes — 23 pairs, one from each parent.' },
   { q: 'Human cell contains how many genes?', opts: ['1,000', '10,000', '100,000', '10,00,000'], ans: 2, source: 'BSF Staff Nurse 2015', explain: 'Initial predictions of human genes were 100,000; now it is revised and estimated 20,000 to 25,000 protein-coding genes.' },
   { q: 'DNA double helix is maintained by:', opts: ['Hydrogen bond', 'Covalent bond', 'Phosphodiester bond', 'Vanderwaal forces'], ans: 0, source: 'RUHS M.Sc Nursing Entrance 2017', explain: 'DNA double helix is held together by hydrogen bonds between the complementary base pairs A-T and C-G.' },
   { q: 'Two strands of DNA are held together by:', opts: ['Covalent bonds', 'Electrostatic force', 'Hydrogen bonds', 'Vander Waals force'], ans: 2, source: 'AIIMS Patna Staff Nurse 2015', explain: 'Hydrogen bonds connect the two complementary strands of the DNA double helix.' },
   { q: 'The base present in DNA but absent in RNA is:', opts: ['Guanine', 'Thymine', 'Uracil', 'Cytosine'], ans: 1, source: 'RRB Staff Nurse 2015 Red (Set II)', explain: 'Thymine is a pyrimidine base present in DNA but not in RNA. Uracil is present in RNA in place of Thymine.' },
   { q: 'Adenine in DNA structure pairs with:', opts: ['Thymines', 'Cytosine', 'Guanines', 'Pyrimidine'], ans: 0, source: 'RUHS M.Sc Nursing Entrance 2016', explain: 'Adenine pairs with Thymine in DNA via two hydrogen bonds. In RNA, Adenine pairs with Uracil.' },
   { q: 'The process of copying the DNA sequence of a gene into mRNA is called:', opts: ['Transference', 'Transcription', 'Translocation', 'Translation'], ans: 1, source: 'RUHS M.Sc Nursing Entrance 2016', explain: 'Transcription is the 1st step in protein synthesis; the DNA gene is copied into mRNA inside the nucleus.' }
  ]},
  { id: 'cell-tissues-2', icon: '🔬', title: 'Cell & Tissues — Set 2', desc: 'Tissue types, SLE, mitosis, muscle tissue, sarcomere — middle 30 questions.', questions: 30, mins: 30, ready: true, data: [
   { q: 'Which of following is an example of tissue?', opts: ['Brain', 'Blood', 'Liver', 'Stomach'], ans: 1, source: 'RUHS M.Sc Nursing Entrance 2014', explain: 'Blood is an example of a liquid connective tissue. Brain, liver and stomach are organs not tissues.' },
   { q: 'Which of the following is not an autoimmune disease?', opts: ['SLE', 'Rheumatoid arthritis', 'Syphilis', 'Sclerosis'], ans: 2, source: 'RIMS & R SAIFAI U.P. 2013', explain: 'Syphilis is an infectious disease caused by bacteria Treponema pallidum, not an autoimmune disease.' },
   { q: 'A patient admitted with an autoimmune disease asks the nurse what it means. The appropriate response by the nurse:', opts: ['Immune cells produce so many antibodies', 'Immune cells grow and multiply too rapidly', 'Immune cells are not produced in sufficient amounts', 'Immune cells are unable to distinguish between self and not self'], ans: 3, source: 'RUHS Post Basic B.Sc NSG Entrance 2019', explain: 'Autoimmune disease occurs when immune cells cannot distinguish between self and not-self antigens, attacking the body\'s own tissues.' },
   { q: 'Main features of SLE:', opts: ['Red rashes over cheeks', 'Small vesicles', 'Pustule', 'Psoriasis'], ans: 0, source: 'ESIC Staff Nurse Bhiwari 2010', explain: 'SLE (systemic lupus erythematosus) is characterized by a butterfly red rash over the nose and cheeks.' },
   { q: 'SLE is a disease of:', opts: ['Bones', 'Erythrocytes', 'Connective tissue', 'Joints'], ans: 2, source: 'HPSSC Staff Nurse 2016', explain: 'SLE is a chronic autoimmune disease of connective tissue involving multiple organ and systems.' },
   { q: 'Which of the following is a classic symptom of systemic lupus erythematosus (SLE)?', opts: ['Fatigue and fever', 'Weight loss', 'Shortness of breath', 'Superficial lesions over the cheeks and nose'], ans: 3, source: 'RUHS Post B.Sc Nursing Entrance 2017', explain: 'The classic symptom of SLE is a butterfly-shaped rash over cheeks and nose (malar rash), along with systemic features.' },
   { q: 'Marfan syndrome is a disorder of:', opts: ['Nerve tissue', 'Epithelial tissue', 'Connective tissue', 'CNS'], ans: 2, source: 'AIIMS Bhopal Staff Nurse 2016', explain: 'Marfan syndrome is an incurable hereditary degenerative disorder of connective tissue affecting bones, muscles and ligaments due to defect in fibrillin-1 gene.' },
   { q: 'A structure composed of two or more tissues is termed:', opts: ['Organ', 'Serous membrane', 'Complex tissue', 'Organ system'], ans: 0, source: 'RUHS M.Sc Nursing Entrance 2013', explain: 'An organ is a body structure made up by two or more tissues that all contribute to perform some specific functions.' },
   { q: 'Name of the tissue which is widely and abundantly distributed in human body?', opts: ['Connective Tissue', 'Cartilaginous', 'Lymph', 'Muscular Tissue'], ans: 0, source: 'AIIMS Raipur (P3) Staff Nurse 2017', explain: 'Connective tissue is the most widely and abundantly distributed tissue in the human body.' },
   { q: 'Which of these are the most abundant tissue in the human body?', opts: ['Epithelial', 'Connective', 'Muscle', 'Nervous'], ans: 1, source: 'IGNOU Post B.Sc. Nursing 2016', explain: 'Connective tissue is the most abundant tissue in the human body, supporting, connecting and separating different types of tissues.' },
   { q: 'Which type of epithelial tissue is composed of several layers of cells?', opts: ['Simple', 'Squamous', 'Stratified', 'Columnar'], ans: 2, source: 'RIMS & R SAIFAI U.P. 2013', explain: 'Epithelium with multiple layers of cells is called stratified epithelium or laminated epithelium.' },
   { q: 'Which of the following statement is true?', opts: ['Squamous epithelia cells are cube shaped', 'Stratified epithelium consist of single layer of cells', 'Stratified cuboidal epithelium has many layers of cells', 'Simple columnar epithelium has flat scale like cells'], ans: 2, source: 'IGNOU Post B.Sc. Nursing 2015', explain: 'Stratified cuboidal epithelium has many layers of cube-shaped cells. Simple epithelia are single-layered.' },
   { q: 'The contractile protein in skeleton muscles is:', opts: ['Troponin', 'Titin', 'Tropomyosin', 'Actin'], ans: 3, source: 'ESIC Staff Nurse 2016 (March, Second Shift)', explain: 'Actin and myosin are the main contractile proteins in skeletal muscle. Tropomyosin and troponin are regulatory proteins.' },
   { q: 'Tropomyosin in the muscle fiber is a ......protein.', opts: ['Contractile', 'Anchoring', 'Structural', 'Regulatory'], ans: 3, source: 'ESIC Staff Nurse Feb 2019 (1st Shift)', explain: 'Tropomyosin is a regulatory protein that controls the interaction between actin and myosin during muscle contraction.' },
   { q: 'Skeletal muscles under microscope have cross-striation formed by dark and light bands. The dark bands are formed by the protein.......', opts: ['Actin', 'Mysium', 'Coronin', 'Myosin'], ans: 3, source: 'ESIC Staff Nurse 2016 (May, First Shift)', explain: 'Dark bands (A bands) in skeletal muscle are formed by thick myosin filaments. Light bands (I bands) contain thin actin filaments.' },
   { q: 'Immediate source of energy for the muscle contraction is:', opts: ['Actinomyosin', 'Adenosine triphosphate', 'Troponin', 'Phosphocreatinine'], ans: 1, source: 'BSF Staff Nurse 2015 (SI)', explain: 'ATP (Adenosine triphosphate) is the immediate source of energy for muscle contraction.' },
   { q: 'Sarcomere refer to that portion of the myofibril between:', opts: ['A and H band', 'A and Z band', 'A and I band', 'Two Z band'], ans: 3, source: 'BSF Staff Nurse 2015 (SI)', explain: 'Sarcomere is the unit of contraction of the myofibrils of a muscle cell, made of protein filaments arranged between two Z disks.' },
   { q: 'What is the main source of energy for cardiac muscle?', opts: ['Glucose', 'Fat', 'Protein', 'Lactic acid'], ans: 1, source: 'RRB Staff Nurse 2015 Yellow', explain: 'Fatty acids are the heart\'s main source of fuel. Ketone bodies and lactate can also serve as fuel for heart muscles.' },
   { q: 'When a muscle relaxes which of the following occurs:', opts: ['All the ATP is used up', 'The actin binding sites are saturated', 'The nerve stimulus is forceful', 'The nerve stimulus is removed'], ans: 3, source: 'IGNOU Post B.Sc. Nursing 2016', explain: 'Muscle relaxation occurs when the nerve stimulus is removed, causing calcium to be pumped back into the sarcoplasmic reticulum.' },
   { q: 'Type of muscles:', opts: ['Striated', 'Non-Striated', 'Cardiac', 'All'], ans: 3, source: 'ESI Staff Nurse Jaipur 2009', explain: 'On the basis of histological structure, muscle tissue in the human body is divided into three types: smooth (non-striated), skeletal (striated) and cardiac.' },
   { q: 'The type of muscle found in the visceral organs and blood vessels is called:', opts: ['Voluntary', 'Cardiac', 'Myocardium', 'Involuntary'], ans: 3, source: 'RUHS Post B.Sc. NSG Entrance 2015', explain: 'Involuntary (smooth) muscle is found in visceral organs like stomach, intestine, urinary bladder, uterus and blood vessels.' },
   { q: 'The function of smooth muscle is to:', opts: ['Create heat', 'Propel blood into circulatory system', 'Propel food through the GIT', 'Cushion organs'], ans: 2, source: 'RRB Staff Nurse 2015 Red (Set II)', explain: 'Smooth muscle in the GIT propels food through the digestive tract via peristalsis.' },
   { q: 'Which of the following is \'NOT\' a feature of life?', opts: ['Growth', 'Responsiveness', 'Reproduction', 'Organ System'], ans: 3, source: 'BSF Staff Nurse 2014 (SI)', explain: 'Organ system is a structural element of living organisms, not itself a feature of life. Features of life include growth, responsiveness, reproduction, metabolism, movement and differentiation.' },
   { q: 'What is the correct sequence of mitosis?', opts: ['Telophase, Anaphase, Prophase, Telophase', 'Metaphase, Anaphase, Prophase, Telophase', 'Prophase, Metaphase, Anaphase, Telophase', 'Anaphase, Prophase, Metaphase, Telophase'], ans: 2, source: 'AIIMS Patna Nursing Officer Feb 2020', explain: 'Mitosis follows the sequence: Prophase → Metaphase → Anaphase → Telophase (PMAT).' },
   { q: 'Number of chromatids at metaphase is:', opts: ['One in mitosis and two in meiosis', 'Two in both mitosis and meiosis', 'One in both mitosis and meiosis', 'Two in mitosis and four in meiosis'], ans: 3, source: 'BHU Nursing Officer Sep 2019', explain: 'At metaphase, each chromosome consists of two sister chromatids joined at the centromere, giving 2 chromatids in mitosis and 4 in meiosis.' },
   { q: 'Out of the \'chemical forces\' or bonds listed below, the strongest one is:', opts: ['Vander waal\'s', 'Dipole', 'Covalent', 'Hydrophobic'], ans: 2, source: 'RRB Staff Nurse 2015 Green & Red (Set II)', explain: 'Covalent bonds are the strongest chemical bonds. Ionic bonds are also strong, while Van der Waals, dipole and hydrogen bonds are weaker.' },
   { q: 'An energy consuming process by which cells of the human body absorb molecules by engulfing them is called:', opts: ['Lipid diffusion', 'Aqueous diffusion', 'Exocytosis', 'Endocytosis'], ans: 3, source: 'RRB Staff Nurse 2015 Green & Red (Set II)', explain: 'Endocytosis is a method of ingestion of a foreign substance by a cell. Phagocytosis is a form of endocytosis.' },
   { q: 'Which plane divides the brain into unequal right and left portions?', opts: ['Frontal plane', 'Transverse plane', 'Mid-sagittal plane', 'Para-sagittal plane'], ans: 3, source: 'SCTIMST Thiruvananthapuram S.N 2010', explain: 'Para-sagittal plane does not pass through midline, dividing the body unequally into right and left. Mid-sagittal passes through midline dividing equally.' },
   { q: 'What is \'the observation of tissues with the naked eye to study disease\' called?', opts: ['Molecular pathology', 'Experimental pathology', 'Clinical pathology', 'Gross pathology'], ans: 3, source: 'RRB Staff Nurse 2015 Red (Set II)', explain: 'Gross pathology means macroscopic manifestation of disease in organ and tissue that can be seen by naked eye, for example a malignant tumour.' },
   { q: 'Biological Barriers include all EXCEPT:', opts: ['Renal tubules', 'Cell membrane', 'Capillary walls', 'Placenta'], ans: 0, source: 'RRB Staff Nurse 2015 Yellow', explain: 'Renal tubules are not a biological barrier. Cell membrane, capillary walls and placenta are biological barriers controlling substance passage.' }
  ]},
  { id: 'cell-tissues-3', icon: '🔬', title: 'Cell & Tissues — Set 3', desc: 'Biochemistry, cell division, proteins, gene therapy — final 30 questions.', questions: 10, mins: 10, ready: true, data: [
   { q: 'What kind of substance cannot permeate membrane by passive diffusion?', opts: ['Lipid-Soluble', 'Non-ionised substances', 'Hydrophobic substances', 'Hydrophilic substances'], ans: 3, source: 'RRB Staff Nurse 2015 Yellow', explain: 'Hydrophilic substances cannot pass through cell membrane by simple diffusion; they may require transport proteins (carrier proteins).' },
   { q: 'Which proteins are classified based on their functions?', opts: ['Fibrous proteins', 'Protective proteins', 'Globular proteins', 'Simple proteins'], ans: 1, source: 'RRB Staff Nurse 2019 (20/7/19, 12.3 to 2)', explain: 'Protective proteins (antibodies, complement proteins, clotting factors) are classified based on their protective function.' },
   { q: 'Primary structure of proteins represents:', opts: ['Linear structure of protein joined by peptide bonds', '3-dimensional structure of proteins', 'Helical structure of proteins', 'Sub unit structure of proteins'], ans: 0, source: 'Safdarjung Hos. Delhi Nursing Officer 2018', explain: 'Primary structure of a protein is the linear sequence of amino acids joined by peptide bonds (polypeptide chain).' },
   { q: '......are atoms having the same mass number but different atomic numbers:', opts: ['Isobars', 'Isotopes', 'Isohyets', 'Isotherms'], ans: 0, source: 'RRB Staff Nurse 2019 (20/7/19, 12.3 to 2)', explain: 'Isobars are two or more chemical bodies having the same atomic weight or mass but different atomic numbers.' },
   { q: 'Germ-line gene therapy is:', opts: ['Not heritable', 'Sometimes heritable', 'Heritable', 'Unrelated to heritability'], ans: 2, source: 'RRB Staff Nurse 2019 (21/7/19, 12.3 to 2)', explain: 'Germ-line gene therapy involves modifying genes in sperm and egg cells, so changes are heritable and passed to offspring.' },
   { q: 'Which of the following are called nucleons?', opts: ['Valence electrons', 'Nucleus and Protons', 'Protons and Neutrons', 'Electrons alone'], ans: 2, source: 'RRB Staff Nurse 2019 (20/7/19, 4 to 5.3)', explain: 'Protons and neutrons present in the nucleus are collectively called nucleons.' },
   { q: 'Tissues in histopathology are carried out in:', opts: ['10% buffered formation', 'Normal saline', '2% glutaraldehyde', 'Camay\'s fixative'], ans: 0, source: 'RUHS M.Sc Nursing Entrance 2018', explain: 'Tissues in histopathology are carried out in 10% buffered formalin which is the standard fixative for tissue preservation.' },
   { q: 'The genetic exchange process in which donor DNA is introduced to the recipient by a virus is:', opts: ['Transfection', 'Transformation', 'Conjugation', 'Transduction'], ans: 3, source: 'ESIC Staff Nurse Feb 2019 (1st Shift)', explain: 'Transduction is a genetic recombination in bacteria in which DNA is carried from one bacterium to another by a bacteriophage (a virus).' },
   { q: 'The activation of caspases is likely to lead to:', opts: ['Apoptotic cell death', 'Blood coagulation', 'Mitotic cell division', 'G1 and S phase of cell cycle'], ans: 0, source: 'Safdarjung Hos. Delhi Nursing Officer 2018', explain: 'Caspase is a protein that regulates programmed cellular death (apoptosis). Activation of caspases triggers apoptotic cell death.' },
   { q: 'Pyknosis is characterized by:', opts: ['Nuclear basophilia', 'Nuclear shrinkage', 'Nucleus disintegration', 'Nucleolus disintegration'], ans: 1, source: 'Safdarjung Hos. Delhi Nursing Officer 2018', explain: 'Pyknosis is the degeneration of a cell in which the nucleus shrinks in size and the chromatin condenses to a solid structure.' }
  ]},
  { id: 'nervous-system-1', icon: '🧠', title: 'Nervous System — Set 1', desc: 'Neurons, glial cells, neurotransmitters, meninges, CSF, brain anatomy.', questions: 30, mins: 30, ready: true, data: [
   { q: 'Body system that controls and coordinates all body activities:', opts: ['Endocrine', 'Musculoskeletal', 'Nervous', 'Reproductive'], ans: 2, source: 'Nursing Orderly ESI 2012', explain: 'The nervous system controls and co-ordinates all activities of the body. It is made up of a network of billions of neurons.' },
   { q: 'The supportive cells of nervous system are:', opts: ['T cells', 'Stem cells', 'Glial cells', 'Astrocytes'], ans: 2, source: 'SCTIMST Thiruvananthapuram 2010', explain: 'Glial cells (neuroglia) are the supporting cells of the nervous system including astrocytes, oligodendrocytes, microglia and Schwann cells.' },
   { q: 'Macrophage cells in CNS are:', opts: ['Microglia', 'Astrocytes', 'Neuroglia', 'Oligodendroglia'], ans: 0, source: 'BSF Staff Nurse 2015', explain: 'Microglia function as macrophages (phagocytosis) when they migrate to damaged CNS tissue.' },
   { q: 'In spinal cord myelin sheath is formed by:', opts: ['Schwann cells', 'Oligodendrocytes', 'Osteocytes', 'Microglia'], ans: 1, source: 'DSSSB Clinical Instructor 2017', explain: 'In the CNS, myelin sheath is formed by oligodendrocytes. In the PNS, it is formed by Schwann cells.' },
   { q: 'The body system that collects, processes and responds to information using electrical signals is:', opts: ['Endocrine', 'Nervous', 'Lymphatic', 'Respiratory'], ans: 1, source: 'IGNOU Post B.Sc Nursing Nov 2019', explain: 'The nervous system uses electrical signals (nerve impulses) to collect, process and respond to information rapidly.' },
   { q: 'Memory traces are present in the mind in the form of:', opts: ['Engrams', 'Picture', 'Signals', 'Diagram'], ans: 0, source: 'RRB Staff Nurse 2019', explain: 'Engrams are units of cognitive information — the physiological basis of a memory trace in the CNS.' },
   { q: 'Central Nervous System consists of:', opts: ['Brain', 'Spinal cord', 'Brain and spinal cord', 'Spine only'], ans: 2, source: 'RPSC Raj. Nursing tutor 2012', explain: 'The CNS consists of the brain and the spinal cord. The PNS consists of cranial and spinal nerves.' },
   { q: 'Depolarisation in a nerve action potential is due to:', opts: ['Closing of sodium channels', 'Opening of sodium channels', 'Opening of potassium channels', 'Opening of calcium channels'], ans: 1, source: 'ESIC Staff Nurse Feb 2019', explain: 'Depolarization is caused by rapid inflow of Na+ ions through opening of sodium channels, making inside of cell more positive.' },
   { q: 'Basic structural and functional unit of the nervous system is:', opts: ['Nephron', 'Cytoplasm', 'Proton', 'Neuron'], ans: 3, source: 'IGNOU Post B.Sc Nursing 2014', explain: 'Neurons are the specialized nerve cells serving as the structural and functional unit of the nervous system.' },
   { q: 'Specialized cells found throughout the nervous system that transmit signals using electrochemical processes are:', opts: ['Soma', 'Dendrites', 'Neurons', 'Axons'], ans: 2, source: 'RUHS Post Basic Nursing Entrance 2019', explain: 'Neurons initiate and conduct impulses, transmitting them to other neurons or cells via neurotransmitters at synapses.' },
   { q: 'Nervous tissue is made of _________ that receive and conduct impulses:', opts: ['Nephron', 'Mucus', 'Enzymes', 'Neurons'], ans: 3, source: 'RRB Staff Nurse 2019', explain: 'Neurons are the structural units of nervous tissue, specialized for receiving and conducting electrical impulses.' },
   { q: 'Which structures act as wires of a telephone in the body?', opts: ['Veins', 'Arteries', 'Muscles', 'Nerves'], ans: 3, source: 'RRB Staff Nurse 2019', explain: 'Nerves act like telephone wires transmitting electrical signals between different parts of the body.' },
   { q: 'Branched process of neurons are:', opts: ['Axon', 'Myelin sheath', 'Dendrites', 'Synapses'], ans: 2, source: 'IGNOU Post B.Sc Nursing 2015', explain: 'Dendrites are branched short processes that receive input signals. Axons are long processes that transmit output signals.' },
   { q: 'Point at which nerve impulse is transmitted from one neuron to another is called:', opts: ['Nodes of Ranvier', 'Myeline', 'Glia', 'Synapse'], ans: 3, source: 'AIIMS Nagpur Nursing Officer Feb 2020', explain: 'Synapse is the junction between two neurons where impulse transmission occurs using neurotransmitters.' },
   { q: 'Which one of the following does not act as a neurotransmitter?', opts: ['Cortisone', 'Acetylcholine', 'Epinephrine', 'Norepinephrine'], ans: 0, source: 'RAK M.Sc Nursing Entrance 2016', explain: 'Cortisone is a hormone, not a neurotransmitter. Acetylcholine, epinephrine, norepinephrine, dopamine, GABA and serotonin are neurotransmitters.' },
   { q: 'Which of these is an example of a neurotransmitter?', opts: ['Only dopamine', 'Only norepinephrine', 'Only acetylcholine', 'All of these'], ans: 3, source: 'RRB Staff Nurse 2015', explain: 'Dopamine, norepinephrine, and acetylcholine are all neurotransmitters used at different synapses.' },
   { q: 'All of following are neurotransmitters except:', opts: ['Dopamine', 'GABA', 'Serotonin', 'Troponin'], ans: 3, source: 'AIIMS Raipur (P3) Staff Nurse 2017', explain: 'Troponin is a cardiac protein, not a neurotransmitter. Dopamine, GABA and serotonin are neurotransmitters.' },
   { q: 'Neurons that release acetylcholine are referred to as:', opts: ['Adrenergic', 'Cholinergic', 'Pre-ganglionic', 'None of the above'], ans: 1, source: 'RML Delhi Staff Nurse 2011', explain: 'Cholinergic neurons release acetylcholine at synapses. Adrenergic neurons release norepinephrine.' },
   { q: 'Meninges are the coverings of:', opts: ['Brain and spinal cord', 'Lungs', 'Kidneys', 'Heart'], ans: 0, source: 'RPSC Raj. Nursing tutor 2012', explain: 'Meninges are three protective membranes (dura mater, arachnoid, pia mater) covering the brain and spinal cord.' },
   { q: 'Which is the protective membrane covering the brain and spinal cord?', opts: ['Peritoneum', 'Meninges', 'Pleura', 'Pericardium'], ans: 1, source: 'RRB Staff Nurse 2019', explain: 'Meninges cover and protect the brain and spinal cord: dura mater (external), arachnoid, pia mater (internal).' },
   { q: 'What is correct order of meninges from inside towards outside?', opts: ['Dura matter, arachnoid, pia matter', 'Pia matter, arachnoid, dura matter', 'Arachnoid, dura matter, pia matter', 'Arachnoid, pia matter, dura matter'], ans: 1, source: 'BSF Staff Nurse 2014', explain: 'From inside out: Pia mater → Arachnoid mater → Dura mater.' },
   { q: 'The middle layer of meninges is:', opts: ['Dura mater', 'Pia mater', 'Arachnoid mater', 'Choroid Plexus'], ans: 2, source: 'DSSSB PHN 2015', explain: 'The arachnoid mater is the middle layer of the meninges, between dura mater and pia mater.' },
   { q: 'CSF (Cerebral Spinal Fluid) is produced in:', opts: ['Choroid Plexuses', 'Arachnoid Villi', 'Medulla oblongata', 'Optic Disc'], ans: 0, source: 'BSF Staff Nurse 2014', explain: 'CSF is mainly produced in the choroid plexuses of the lateral ventricles of the brain.' },
   { q: 'From which part of brain cerebrospinal fluid is secreted?', opts: ['Choroid plexus of brain', 'Venous sinus of brain', 'Sub arachnoid space', 'None of above'], ans: 0, source: 'ESIC Staff Nurse Feb 2019', explain: 'CSF is secreted by the choroid plexus of the brain ventricles.' },
   { q: 'The brain region responsible for coordination of voluntary muscular movement, posture and balance:', opts: ['Cerebellum', 'Cerebral cortex', 'Spinal cord', 'Medulla Oblongata'], ans: 0, source: 'ESIC Staff Nurse Feb 2019', explain: 'The cerebellum (hind brain) controls and coordinates movements, maintains posture, balance and equilibrium.' },
   { q: 'Loss of muscle co-ordination results from damage to:', opts: ['Hypothalamus', 'Cerebrum', 'Midbrain', 'Cerebellum'], ans: 3, source: 'UPPSC U.P Staff Nurse 2017', explain: 'Loss of muscle coordination (ataxia) results from damage to the cerebellum.' },
   { q: 'Respiratory centre is situated at which part of brain:', opts: ['Medulla', 'Pons', 'Cerebellum', 'Thalamus'], ans: 0, source: 'Jhalawar Med. Coll. Staff Nurse 2010', explain: 'The respiratory centre is located in the medulla oblongata of the brainstem.' },
   { q: 'Which part of brain controls and integrates activities of the autonomic nervous system?', opts: ['Midbrain', 'Thalamus', 'Hypothalamus', 'Epithalamus'], ans: 2, source: 'LNJP Staff Nurse Delhi 2013', explain: 'The hypothalamus is the major integrating center for the ANS, regulating temperature, hunger, thirst and hormones.' },
   { q: 'Eating behavior regulated/controlled by:', opts: ['Hypothalamus', 'Adrenal gland', 'Pancreas', 'Thyroid gland'], ans: 0, source: 'RPSC Raj. Staff Nurse 2010', explain: 'The hypothalamus regulates eating and drinking behavior via its feeding and thirst center.' },
   { q: 'Temperature/heat regulating centre is present in which part of the brain?', opts: ['Thalamus', 'Hypothalamus', 'Medulla Oblongata', 'Cerebellum'], ans: 1, source: 'AIIMS Patna Nursing Officer Feb 2020', explain: 'The hypothalamus is the temperature regulating center. Injury to hypothalamus causes increase in body temperature.' }
  ]},
  { id: 'nervous-system-2', icon: '🧠', title: 'Nervous System — Set 2', desc: 'Brain lobes, speech centres, autonomic nervous system, fight or flight.', questions: 30, mins: 30, ready: true, data: [
   { q: 'Which is the largest part of brain?', opts: ['Cerebellum', 'Cerebrum', 'Pons', 'None of the above'], ans: 1, source: 'BPS Govt. M. Coll. Khanpur Haryana', explain: 'Cerebrum (forebrain) is the largest part of the brain, also called the seat of intelligence.' },
   { q: 'Forebrain consists of:', opts: ['Cerebrum only', 'Diencephalon only', 'Cerebrum & diencephalon', 'Crus cerebri'], ans: 2, source: 'RUHS Post Basic Nursing Entrance 2013', explain: 'Forebrain consists of cerebrum and diencephalon (thalamus, hypothalamus, metathalamus, epithalamus).' },
   { q: 'The parts of brain stem are:', opts: ['Mid brain, pons and medulla', 'Pons and Medulla', 'Midbrain and Medulla', 'Pons, cerebellum and medulla'], ans: 0, source: 'Safdarjung Hos. Delhi Nursing Officer 2018', explain: 'Brainstem consists of the midbrain, pons, and medulla oblongata.' },
   { q: 'Betz cells in the brain are found in:', opts: ['Thalamus', 'Secondary motor cortex', 'Sensory cortex', 'Primary motor cortex'], ans: 3, source: 'BSF Staff Nurse 2015', explain: 'Betz cells are giant pyramidal neurons in the fifth layer of the primary motor cortex, axons form pyramidal tract.' },
   { q: 'Which of the following is used to assess the function of brain stem?', opts: ['Cold caloric test', 'Glasgow coma scale', 'Braden scale', 'Intracranial pressure'], ans: 0, source: 'DSSSB Staff Nurse 2013', explain: 'Cold caloric test provides information about the vestibular portion of cranial nerve 8 and helps diagnose brain stem lesion.' },
   { q: 'Vestibular function is tested by:', opts: ['Rinne\'s test', 'Caloric test', 'Acoustic reflex', 'Audiometry'], ans: 1, source: 'RUHS M.Sc Nursing Entrance 2017', explain: 'Caloric test (water infusion into ear) tests vestibular function. Normal result causes nystagmus.' },
   { q: 'What is the normal Intracranial pressure?', opts: ['20-30mm Hg', '30-40mm Hg', '5-15mm Hg', '0-10mm Hg'], ans: 2, source: 'AIIMS Raipur Staff Nurse Aug 2019', explain: 'Normal ICP is between 0 and 15 mm Hg. Pressures higher than 20 mm Hg increase risk of brain herniation.' },
   { q: 'Which called \'gateway of pain\' according to principal of pain sensation?', opts: ['Spinal cord', 'Brain stem', 'Hypothalamus', 'Cranial nerve'], ans: 0, source: 'ESIC Staff Nurse Bhiwari 2010', explain: 'According to gate control theory, pain signals must pass through gates at the spinal cord level before reaching the brain.' },
   { q: 'The primary visual area is situated in the:', opts: ['Temporal lobe', 'Occipital lobe', 'Frontal lobe', 'Parietal lobe'], ans: 1, source: 'ESIC Staff Nurse 2016', explain: 'The primary visual cortex is in the occipital lobe. Lesion of occipital lobe affects vision.' },
   { q: 'Broca\'s area controls:', opts: ['Sensory functions', 'Speech', 'Emotions', 'Motor functions'], ans: 1, source: 'SCTIMST Thiruvananthapuram 2010', explain: 'Broca\'s area in the left frontal lobe controls speech production. Damage causes expressive aphasia.' },
   { q: 'Broca\'s area is in the:', opts: ['Frontal lobe', 'Parietal lobe', 'Occipital lobe', 'Temporal lobe'], ans: 0, source: 'DSSSB Clinical Instructor 2017', explain: 'Broca\'s area is in the frontal lobe left hemisphere, responsible for speech formulation.' },
   { q: 'Inability to speak or understand the spoken words is called as:', opts: ['Insomnia', 'Apraxia', 'Agnosia', 'Aphasia'], ans: 3, source: 'DSSSB Staff Nurse 2013', explain: 'Aphasia is inability to speak or understand spoken words. Expressive: cannot speak; Receptive: cannot understand.' },
   { q: 'A complete loss of language comprehension or production is called:', opts: ['Dysfluency', 'Aphasia', 'Dyspraxia', 'Dysphasia'], ans: 1, source: 'JIPMER Staff Nurse 2017', explain: 'Aphasia is complete loss of language ability. Dysphasia is partial impairment.' },
   { q: 'Inability to carryout normal activities despite intact motor function is:', opts: ['Anhedonia', 'Apraxia', 'Apathy', 'Amnesia'], ans: 1, source: 'AIIMS Raipur (P2) Staff Nurse 2017', explain: 'Apraxia is inability to perform a purposive movement although there is no sensory or motor impairment.' },
   { q: 'Loss of ability to recognize objects is called:', opts: ['Agnosia', 'Ataxia', 'Dysarthria', 'Alexia'], ans: 0, source: 'AIIMS Patna Nursing Officer Feb 2020', explain: 'Agnosia is inability to recognize sights, sounds, words or other sensory information despite intact sensory pathways.' },
   { q: 'Which division of the nervous system initiates a response known as fight or flight?', opts: ['The parasympathetic nervous system', 'The sympathetic nervous system', 'The somatic nervous system', 'None of these'], ans: 1, source: 'RRB Staff Nurse 2015', explain: 'Fight-or-flight reaction is initiated by the sympathetic nervous system and adrenal medulla during emergencies.' },
   { q: 'The emergency control branch of human nervous system is which of the following?', opts: ['Sympathetic', 'Parasympathetic', 'Cerebrospinal', 'Ventromedial'], ans: 0, source: 'IGNOU Post B.Sc Nursing 2016', explain: 'The sympathetic nervous system is the emergency control branch, activated during stress for fight or flight.' },
   { q: 'Which part of the body releases catecholamines in response to stress?', opts: ['Adrenal medulla', 'Cerebral cortex', 'Hypothalamus', 'Adrenal cortex'], ans: 0, source: 'DSSSB Nursing Officer Aug 2019', explain: 'The adrenal medulla releases catecholamines (epinephrine and norepinephrine) during stress.' },
   { q: 'The \'fight or flight\' response includes all the following EXCEPT:', opts: ['Increase in blood pressure', 'Increase in salivary secretion', 'Glycogenolysis', 'Cessation of bladder and bowel activity'], ans: 1, source: 'JIPMER Staff Nurse 2017', explain: 'During fight-or-flight, salivary secretion decreases not increases. All other options are correct sympathetic responses.' },
   { q: 'Which of the following is NOT a function of sympathetic nervous system?', opts: ['Dilation of pupils', 'Rest and digest', 'Fight and flight', 'Tachycardia'], ans: 1, source: 'JSSHS Delhi Nursing Officer Dec 2019', explain: 'Rest and digest is the function of the parasympathetic nervous system. Sympathetic functions: fight/flight, tachycardia, pupil dilation.' },
   { q: 'The cylindrical part of the nervous system located within the vertebral canal is called:', opts: ['Cerebellum', 'Corpus callosum', 'Medulla oblongata', 'Spinal cord'], ans: 3, source: 'IGNOU Post B.Sc. Nursing 2012', explain: 'Spinal cord is a 40 to 50cm long cylindrical part of the central nervous system located within the vertebral canal.' },
   { q: 'The length of spinal cord in an adult male is:', opts: ['18 cm', '45 cm', '50 cm', '36 cm'], ans: 1, source: 'SCTIMST Thiruvananthapuram S.N 2010', explain: 'Spinal cord is approximately 45 cm long in an adult male, extending from the medulla oblongata to the first lumbar vertebra.' },
   { q: 'The spinal cord is made up of:', opts: ['Neurons', 'Cardiac muscles', 'Smooth muscle', 'Striated muscle'], ans: 0, source: 'RRB Staff Nurse 2015 Yellow (Set II)', explain: 'Spinal cord is a part of the central nervous system which contains about 100 billion neurons.' },
   { q: 'The number of pairs of spinal nerves in human body are:', opts: ['28 pairs', '29 Pairs', '30 pairs', '31 pairs'], ans: 3, source: 'IGNOU Post B.Sc. Nursing 2016', explain: 'Spinal cord consists of total 31 pairs: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral and 1 coccygeal nerve.' },
   { q: 'How many cervical nerves are there in the spinal cord?', opts: ['9', '8', '12', '5'], ans: 1, source: 'AIIMS Patna Nursing Officer Feb 2020', explain: 'There are 8 pairs of cervical spinal nerves (C1-C8) in the spinal cord.' },
   { q: 'Total pairs of cranial nerves are:', opts: ['122', '20', '12', '14'], ans: 2, source: 'RML Staff Nurse Delhi 2011', explain: 'There are 12 pairs of cranial nerves (CN I to CN XII) originating in the brainstem, mainly controlling activities of the face and head.' },
   { q: 'While assessing a patient\'s cranial nerves, the nurse asks the patient to raise the eyebrows, smile and show the teeth to assess which cranial nerve:', opts: ['Vagus', 'Facial', 'Olfactory', 'Optic'], ans: 1, source: 'AIIMS Jodhpur & Rishikesh S.N 2017', explain: 'Assessment of cranial nerve VII (facial nerve) includes checking ability to raise eyebrows, smile and close eyes.' },
   { q: 'When neurologist asks a patient to smile which cranial nerve is being tested?', opts: ['Optic', 'Facial', 'Vagus', 'Accessary'], ans: 1, source: 'Ruhs Post Basic B.Sc Nursing Entrance 2016', explain: 'Cranial nerve VII (facial nerve) controls facial expression muscles. Damage causes Bell\'s palsy (facial paralysis).' },
   { q: 'The movement of the head and shoulders is controlled by the:', opts: ['Abducens nerve', 'Glossopharyngeal nerve', 'Accessory nerve', 'Hypoglossal nerve'], ans: 2, source: 'AIIMS Jodhpur Nursing Staff Gr I Aug 2018', explain: 'Cranial nerve XI (spinal accessory nerve) controls movement of head and shoulders by innervating trapezius and sternomastoid muscles.' },
   { q: 'Which of the following is IV cranial nerve?', opts: ['Facial', 'Abducens', 'Trochlear', 'Trigeminal'], ans: 2, source: 'AIIMS Bhopal Staff Nurse 2016', explain: 'Cranial nerve IV is the Trochlear nerve. It innervates the superior oblique muscle, responsible for rotation of eyeball downward and outward.' }
  ]},
  { id: 'nervous-system-3', icon: '🧠', title: 'Nervous System — Set 3', desc: 'Spinal cord, cranial nerves, nerve functions, plexuses and reflexes.', questions: 21, mins: 21, ready: true, data: [
   { q: 'The 10th cranial nerve is:', opts: ['Abducent', 'Vagus', 'Facial', 'Hypoglossal'], ans: 1, source: 'DSSSB PHN 2015', explain: 'Cranial nerve X is the vagus nerve. It is the longest cranial nerve supplying organs in head, neck, thoracic and abdominal cavity.' },
   { q: 'Which of the following is not a cranial nerve?', opts: ['Accessory', 'Abducent', 'Trochlear', 'Coccygeal'], ans: 3, source: 'Ruhs Post Basic B.Sc Nursing Entrance 2016', explain: 'Coccygeal nerve is a spinal nerve, not a cranial nerve. There are 12 pairs of cranial nerves and 31 pairs of spinal nerves.' },
   { q: 'Which nerve is responsible to detect smell-', opts: ['Optic', 'Oculomotor', 'Olfactory', 'Facial'], ans: 2, source: 'BSF Staff Nurse 2014 (SI)', explain: 'Cranial nerve I (olfactory nerve) is responsible for detecting smell. Damage causes anosmia (loss of sense of smell).' },
   { q: 'Nerves which conveys special sensory information related to smell:', opts: ['Occulomotor nerve', 'Optic nerve', 'Olfactory nerve', 'Trochlear nerve'], ans: 2, source: 'AIIMS Raipur (Set 2) Staff Nurse Aug 2019', explain: 'Olfactory nerve (CN I) conveys special sensory information related to smell from the olfactory mucosa to the brain.' },
   { q: 'Which are the main functions of the hypoglossal nerve?', opts: ['vision & sensation', 'swallowing & speech', 'hearing & smell', 'sensation & hearing'], ans: 1, source: 'RRB Staff Nurse 2019', explain: 'Cranial nerve XII (hypoglossal nerve) controls tongue movements essential for swallowing and speech. Damage causes paralysis of one side of tongue.' },
   { q: '\'8th\' cranial nerve affects-', opts: ['Taste', 'Touch', 'Smell', 'Equilibrium'], ans: 3, source: 'Ruhs Post Basic B.Sc NSG Entrance 2018', explain: 'Cranial nerve VIII (vestibulocochlear nerve) affects hearing and equilibrium/balance. Damage causes deafness, tinnitus, nausea and vomiting.' },
   { q: 'This nerve maintains hearing and balance:', opts: ['Vestibulocochlear', 'Vagus', 'Facial', 'Trochlear'], ans: 0, source: 'AIIMS Raipur (Set 2) Staff Nurse Aug 2019', explain: 'Cranial nerve VIII (vestibulocochlear nerve) has two divisions — cochlear for hearing and vestibular for balance and equilibrium.' },
   { q: 'The nerve which is responsible for vision is:', opts: ['Olfactory', 'Facial', 'Optic', 'Acoustic'], ans: 2, source: 'RPSC Raj. Nursing tutor 2012', explain: 'Cranial nerve II (optic nerve) is responsible for vision. Damage causes blindness.' },
   { q: 'Which one of the following is the third cranial nerve?', opts: ['Oculomotor nerve', 'Optic nerve', 'Abducens nerve', 'Trochlear nerve'], ans: 0, source: 'AIIMS Raipur (Set 1) Staff Nurse Aug 2019', explain: 'Cranial nerve III is the oculomotor nerve. It controls most eye movements, pupillary constriction, and upper eyelid elevation.' },
   { q: 'Select the cranial nerve paired with its name correctly:', opts: ['The 12th cranial nerve: Hypoglossal nerve', 'The fifth cranial nerve: The auditory nerve', 'The second cranial nerve: Olfactory nerve', 'The 10th cranial nerve: Trigemminal nerve'], ans: 0, source: 'GMCH Chandigarh Staff Nurse 2019', explain: 'CN XII is the Hypoglossal nerve (tongue movement). CN V is trigeminal (face sensation). CN II is optic (vision). CN X is vagus.' },
   { q: 'All are motor nerves except:', opts: ['Accessory', 'Abducent', 'Trochlear', 'Trigeminal'], ans: 3, source: 'DSSSB Clinical Instructor 2017', explain: 'Trigeminal nerve (CN V) is a mixed nerve (both sensory and motor). Except trigeminal, all other options are motor (efferent) nerves.' },
   { q: 'Which of the following is the largest cranial nerve?', opts: ['Cranial nerve V', 'Cranial nerve VI', 'Cranial nerve X', 'Cranial nerve VII'], ans: 0, source: 'AIIMS Patna Nursing Officer Feb 2020', explain: 'Trigeminal nerve (CN V) is the largest, mixed cranial nerve with three branches: ophthalmic, maxillary and mandibular.' },
   { q: 'Which of the following nerve helps in raising the upper eyelids?', opts: ['Optic nerve', 'Oculomotor nerve', 'Facial nerve', 'Trigeminal nerve'], ans: 1, source: 'Ruhs Post Basic B.Sc NSG Entrance 2019', explain: 'Oculomotor nerve (CN III) innervates the levator palpebrae superioris muscle which raises the upper eyelid. Damage causes ptosis.' },
   { q: 'Which of the following is the cranial nerve responsible for pupillary constriction?', opts: ['Olfactory nerve', 'Optic nerve', 'Oculomotor nerve', 'Vagus nerve'], ans: 2, source: 'Ruhs Post Basic B.Sc NSG Entrance 2019', explain: 'Cranial nerve III (oculomotor) is responsible for pupillary constriction via the ciliary muscle (parasympathetic fibers).' },
   { q: 'Which cranial nerve has the highest number of branches-', opts: ['Vagus nerve', 'Facial nerve', 'Trigeminal nerve', 'None of these'], ans: 0, source: 'BSF Staff Nurse 2014 (SI)', explain: 'Vagus nerve (CN X) has the highest number of branches, providing nerve supply to organs in head, neck, thoracic cavity, abdominal cavity and pelvic cavity.' },
   { q: 'Nerve supply to jaw occurs by which nerve-', opts: ['Temporal nerve', 'Maxillary nerve', 'Ophthalmic nerve', 'Zygomatic nerve'], ans: 1, source: 'ESIC Staff Nurse Delhi 2009', explain: 'Maxillary nerve (a branch of trigeminal nerve) provides sensory perception from the gums and teeth of the upper jaw and orbit.' },
   { q: 'Which of this nerves passes through the foramen magnum:', opts: ['Spinal nerve', 'Vagus', 'Accessory', 'Hypoglosal'], ans: 2, source: 'RUHS M.Sc Nursing Entrance 2019', explain: 'Accessory nerve (XI CN) passes through foramen magnum, an opening in the occipital bone, before supplying trapezius and sternomastoid.' },
   { q: 'The response to hyper-stimulation of vagus nerve is-', opts: ['Skeletal muscle relaxation', 'Skeletal muscle contraction', 'Tachyarrhythmia', 'Bradyarrythmia'], ans: 3, source: 'Ruhs Post Basic B.Sc NSG Entrance 2018', explain: 'Vagal nerve stimulation (vagal maneuver) increases parasympathetic tone, decreasing heart electrical conduction causing bradyarrythmia.' },
   { q: 'The action of the sympathetic system in the walls of airways is called as:', opts: ['increase gas exchange', 'broncho-dilation', 'broncho-constriction', 'increase secretion'], ans: 1, source: 'ESIC Staff Nurse Feb 2019 (1st Shift)', explain: 'Sympathetic stimulation causes bronchodilation (widening of airways) to increase air flow during fight-or-flight response.' },
   { q: 'Which is the neurotransmitter responsible for sympathetic vasoconstriction?', opts: ['Angiotensin', 'Serotonin', 'Epinephrine', 'Norepinephrine'], ans: 3, source: 'RRB Staff Nurse 2019', explain: 'Norepinephrine (noradrenaline) is the primary neurotransmitter released by sympathetic postganglionic neurons causing vasoconstriction.' },
   { q: 'One function of parasympathetic nervous system is:', opts: ['Stimulating of sweat gland', 'Constriction of pupil', 'Contraction of hair muscles', 'Acceleration of heart beat'], ans: 1, source: 'AIIMS Nagpur Nursing Officer Feb 2020', explain: 'Parasympathetic nervous system causes constriction of pupil (miosis). Sympathetic nervous system causes pupil dilation (mydriasis).' }
  ]},
  { id: 'blood-mock-1', icon: '🩸', title: 'Blood — Mock 1', desc: 'Basic blood pH, physiology, plasma proteins, osmotic pressure, and hematopoiesis.', questions: 50, mins: 50, ready: true, data: MOCK_1_DATA },
   { id: 'blood-mock-2', icon: '🩸', title: 'Blood — Mock 2', desc: 'RBC disorders, anemic indices, sickle cell crisis, thalassemia, and B12 deficiency.', questions: 50, mins: 50, ready: true, data: MOCK_2_DATA },
   { id: 'blood-mock-3', icon: '🩸', title: 'Blood — Mock 3', desc: 'White blood cells, inflammatory cascade, immunology, vaccines, and CD4+ counts.', questions: 50, mins: 50, ready: true, data: MOCK_3_DATA },
   { id: 'blood-mock-4', icon: '🩸', title: 'Blood — Mock 4', desc: 'Platelets, clotting cascade, coagulation pathways, heparin vs warfarin, and bleeding protocols.', questions: 50, mins: 50, ready: true, data: MOCK_4_DATA },
   { id: 'blood-mock-5', icon: '🩸', title: 'Blood — Mock 5', desc: 'Transfusion reactions, blood typing compatibility, malignancies like Hodgkins and Leukemia, and advanced DIC.', questions: 48, mins: 48, ready: true, data: MOCK_5_DATA },
  { id: 'heart', icon: '❤️', title: 'Heart', desc: 'Cardiac anatomy, conduction system, cardiac cycle, heart diseases.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'respiratory', icon: '🫁', title: 'Respiratory System', desc: 'Lungs, breathing mechanics, gas exchange, respiratory disorders.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'digestive', icon: '🫃', title: 'Digestive System', desc: 'GI tract, enzymes, absorption, liver and digestive disorders.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'renal', icon: '🫘', title: 'Renal System', desc: 'Kidneys, nephron, urine formation, fluid and electrolyte balance.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'endocrine', icon: '⚗️', title: 'Endocrine System', desc: 'Hormones, glands, feedback mechanisms, endocrine disorders.', questions: 0, mins: 0, ready: false, data: [] }
 ]},
 { id: 'med-surg', icon: '🏥', name: 'Medical-Surgical Nursing', tests: [
  { id: 'ms-cardiac', icon: '💓', title: 'Cardiac Nursing', desc: 'MI, heart failure, dysrhythmias, cardiac monitoring, CABG care.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'ms-neuro', icon: '🧠', title: 'Neurological Nursing', desc: 'Stroke, seizures, ICP monitoring, spinal cord injury, neurological assessment.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'ms-respiratory', icon: '🫁', title: 'Respiratory Nursing', desc: 'COPD, pneumonia, asthma, mechanical ventilation, chest physiotherapy.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'ms-renal', icon: '🫘', title: 'Renal Nursing', desc: 'CKD, AKI, dialysis, nephrotic syndrome, UTI management.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'ms-onco', icon: '🎗️', title: 'Oncology Nursing', desc: 'Cancer staging, chemotherapy, radiation, palliative care.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'ms-gi', icon: '🫃', title: 'GI Nursing', desc: 'Peptic ulcer, liver cirrhosis, colostomy care, inflammatory bowel disease.', questions: 0, mins: 0, ready: false, data: [] }
 ]},
 { id: 'community', icon: '🌍', name: 'Community Health Nursing', tests: [
  { id: 'chn-basics', icon: '🏘️', title: 'CHN Concepts & Principles', desc: 'Levels of prevention, health promotion, CHN roles, Alma Ata declaration.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'chn-epidemiology', icon: '📊', title: 'Epidemiology & Biostatistics', desc: 'Disease burden, epidemiological triad, study designs, vital statistics.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'chn-immunization', icon: '💉', title: 'National Immunization Programme', desc: 'UIP, vaccine schedule, cold chain, adverse events.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'chn-programs', icon: '📋', title: 'National Health Programmes', desc: 'RNTCP, NVBDCP, NPCB, NRHM, Ayushman Bharat and more.', questions: 0, mins: 0, ready: false, data: [] }
 ]},
 { id: 'maternal', icon: '🤰', name: 'Obstetrical & Midwifery Nursing', tests: [
  { id: 'obs-antenatal', icon: '🤰', title: 'Antenatal Care', desc: 'ANC schedule, danger signs, nutrition in pregnancy, minor disorders.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'obs-labour', icon: '🏥', title: 'Labour & Delivery', desc: 'Stages of labour, mechanisms, partograph, assisted deliveries.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'obs-postnatal', icon: '👶', title: 'Postnatal Care', desc: 'Puerperium, postpartum complications, breastfeeding, lochia.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'obs-hrc', icon: '⚠️', title: 'High-Risk Obstetrics', desc: 'PIH, antepartum haemorrhage, ectopic pregnancy, PROM.', questions: 0, mins: 0, ready: false, data: [] }
 ]},
 { id: 'pediatric', icon: '👶', name: 'Pediatric Nursing', tests: [
  { id: 'ped-growth', icon: '📏', title: 'Growth & Development', desc: 'Milestones, Erikson, Piaget, immunization, nutritional requirements.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'ped-newborn', icon: '🍼', title: 'Neonatal Nursing', desc: 'Newborn assessment, APGAR, neonatal jaundice, LBW, NICU care.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'ped-disorders', icon: '🏥', title: 'Common Paediatric Disorders', desc: 'Diarrhoea, ARI, malnutrition, febrile seizures, CHD.', questions: 0, mins: 0, ready: false, data: [] }
 ]},
 { id: 'mhn', icon: '🧩', name: 'Mental Health Nursing', tests: [
  { id: 'mhn-concepts', icon: '🧠', title: 'MHN Concepts & Theories', desc: 'Mental health definition, Maslow, therapeutic relationship, MH Act 2017.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'mhn-disorders', icon: '📋', title: 'Psychiatric Disorders', desc: 'Schizophrenia, bipolar, depression, anxiety disorders, OCD.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'mhn-drugs', icon: '💊', title: 'Psychopharmacology', desc: 'Antipsychotics, antidepressants, anxiolytics, mood stabilizers.', questions: 0, mins: 0, ready: false, data: [] }
 ]},
 { id: 'fundamentals', icon: '📚', name: 'Fundamentals of Nursing', tests: [
    {
      id: 'wbhrb-2026',
      icon: '📋',
      title: 'WBHRB Staff Nurse Grade II 2026',
      desc: 'Official previous year question paper from the West Bengal Health Recruitment Board (WBHRB) Staff Nurse Grade II Exam.',
      questions: 50,
      mins: 60,
      ready: true,
      data: [
        {
          q: "What is the location of the prostate gland?",
          opts: ["Just below the epididymis", "Just below the seminal vesicles", "Just below the urinary bladder", "Just below the bulbourethral glands"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "The prostate gland is situated immediately below the bladder neck and surrounds the prostatic portion of the urethra."
        },
        {
          q: "Which of the following hormone levels is the highest during the follicular phase of the menstrual cycle?",
          opts: ["Progesterone", "Testosterone", "Estradiol", "Luteinizing hormone"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "During the follicular phase, estrogen (specifically estradiol) is the dominant hormone, peaking just prior to the LH surge."
        },
        {
          q: "Which process is responsible for the exchange of gases between the alveoli and pulmonary capillaries?",
          opts: ["Active transport", "Osmosis", "Diffusion", "Ultrafiltration"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Passive simple diffusion across the thin respiratory membrane allows rapid exchange of oxygen and carbon dioxide gases between alveoli and capillaries."
        },
        {
          q: "What is the mean arterial pressure if blood pressure is 110/70 mmHg?",
          opts: ["180.3 mmHg", "90 mmHg", "40 mmHg", "83.3 mmHg"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "MAP = Diastolic BP + 1/3 (Systolic BP - Diastolic BP). Here, 70 + (110-70)/3 = 70 + 13.3 = 83.3 mmHg."
        },
        {
          q: "Which of the following bones is classified as woven bone?",
          opts: ["Newly formed bones", "Mature bones", "Lamellar bones", "Canaliculi bones"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Woven bone is immature, temporary bone tissue with randomly arranged collagen fibers. It is typical of newly formed bone (embryonic skeleton or early fracture callus)."
        },
        {
          q: "Which of the following microorganisms cause whooping cough?",
          opts: ["Pseudomonas Aeruginosa", "Bacillus Anthracis", "Brucella Abortus", "Bordetella Pertussis"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Whooping cough (pertussis) is a highly infectious respiratory infection caused by the Gram-negative bacterium Bordetella pertussis."
        },
        {
          q: "According to the Biomedical Waste Management (BMW) rules, a nurse should discard the removed urinary catheter and the urine bag in which of the following colour-coded bags?",
          opts: ["Red bag", "Green bag", "Yellow bag", "Blue bag"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Under BMW rules, recyclable plastic waste such as catheters, tubings, and urine bags should be disposed of in Red bags for autoclaving or microwaving."
        },
        {
          q: "What is the standard recommended site and route for administering the Pentavalent vaccine in an infant aged 6 weeks to 6 months?",
          opts: ["Intramuscular injection into the dorsogluteal muscle", "Intradermal injection into the skin of the forearm", "Subcutaneous injection into the posterior deltoid muscle", "Intramuscular injection into the vastus lateralis muscle"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "In infants under 1 year, the anterolateral aspect of the mid-thigh (vastus lateralis) is the standard recommended site for intramuscular (IM) injections to prevent damage to the sciatic nerve."
        },
        {
          q: "Which of the following vitamins is also known as Pantothenic acid?",
          opts: ["Vitamin C", "Vitamin B5", "Vitamin B12", "Vitamin K"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Vitamin B5 is pantothenic acid, an essential nutrient needed to synthesize coenzyme A."
        },
        {
          q: "What is the recommended percentage range for daily calorie intake derived from Protein in a balanced diet for most healthy, non-athletic adults?",
          opts: ["10-35%", "45-55%", "60-75%", "75-80%"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "The Acceptable Macronutrient Distribution Range (AMDR) for protein is 10% to 35% of total daily energy intake."
        },
        {
          q: "Which vitamin deficiency is MOST commonly seen among strict vegetarians (vegans) due to the absence of natural sources in plant-based foods?",
          opts: ["Vitamin A", "Vitamin C", "Vitamin B12", "Vitamin K"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Vitamin B12 is produced exclusively by microbes and is found almost solely in animal-source foods. Strict vegans require daily supplements or fortified products to prevent deficiency."
        },
        {
          q: "In a person with a suspected fracture of the right leg, which action by the first aider specifically indicates that circulation is being checked?",
          opts: ["Observe for swelling and compare limb size with uninjured leg", "Palpate the injured area to check for localised tenderness", "Assess skin colour and feel for numbness/tingling beyond the break", "Ask the person to move toes distal to the injury of the affected leg"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Circulation is evaluated by checking color, temperature, distal pulses, capillary refill, and assessing for distal sensations such as numbness or tingling."
        },
        {
          q: "A nurse is preparing a small first aid kit. According to the Indian Red Cross recommendations in the Indian First Aid Manual, which of the following items should NOT be included in a small first aid box?",
          opts: ["Oral Rehydration Solution sachets", "Package of sterilized absorbent cotton", "Inflatable arm and leg splints", "Tube of silver sulfadiazine skin ointment"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Inflatable splints are advanced immobilizing equipment. Small, basic first aid boxes should contain basic bandages, sterilised cotton, ORS, and ointments for immediate minor injury care."
        },
        {
          q: "Which of the following structures is mainly involved in the Golfer's Elbow?",
          opts: ["The lateral epicondyle of the humerus", "The olecranon process of the ulna", "The medial epicondyle of the humerus", "The glenoid process of the shoulder joint"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Golfer's elbow is medial epicondylitis, which involves inflammation of the flexor tendon insertion on the medial epicondyle of the humerus."
        },
        {
          q: "Which is the MOST important role a nurse performs when helping a hesitant patient voice their rights and concerns to the surgical team?",
          opts: ["Caregiver", "Administrator", "Coordinator", "Advocate"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "The nurse acts as an advocate to ensure that the patient's rights, concerns, and choices are heard, respected, and addressed by the healthcare team."
        },
        {
          q: "Which nursing intervention BEST promotes normal bowel elimination in a hospitalized patient?",
          opts: ["Encouraging high-fiber diet and adequate fluids", "Limiting oral intake", "Administering antidiarrheal drugs routinely", "Keeping patient in supine position after meals"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "A diet rich in high-fiber foods along with sufficient hydration is the most effective natural intervention to promote gut motility and prevent constipation."
        },
        {
          q: "Which of the following category of drugs is used to reduce fever?",
          opts: ["Analgesics", "Antibiotics", "Diuretics", "Antipyretics"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Antipyretics are medications specifically designed to reduce fever by lowering body temperature back to the normal hypothalamic setpoint."
        },
        {
          q: "Read the given assertion (A) and reason (R) and select the correct option based on the analysis of these statements.\nAssertion (A): Weakly acidic drugs, like aspirin, are primarily absorbed from the stomach, which has a low pH environment.\nReason (R): At the stomach's low pH, a larger fraction of the acidic drug exists in its non-ionised (uncharged), lipid-soluble form, which can easily cross the lipid cell membranes via passive diffusion.",
          opts: ["Both A and R are true, and R is the correct explanation of A.", "Both A and R are true, but R is not the correct explanation of A.", "A is true, but R is false.", "A is false, but R is true."],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Weak acids remain un-ionized in an acidic environment (like the stomach), which increases their lipid solubility and allows rapid passive absorption across the gastric mucosa."
        },
        {
          q: "Which of the following normal breath sounds is described as soft and low-pitched, like the rustling of leaves?",
          opts: ["Bronchial", "Vesicular", "Bronchovesicular", "Tracheal"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Vesicular breath sounds are soft, low-pitched, rustling sounds heard over the peripheral lung fields, with a longer inspiratory phase."
        },
        {
          q: "Which nursing action is the most important before applying a topical drug?",
          opts: ["Massage vigorously for absorption", "Apply over soiled skin", "Clean and dry the area thoroughly", "Mix with lotion for smooth application"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "To prevent contamination and ensure standard absorption, the target skin area must be cleaned and dried thoroughly before any topical drug application."
        },
        {
          q: "When should sterile equipment be opened before surgery to maintain asepsis?",
          opts: ["Long before surgery", "Just before surgery using sterile technique", "After surgery starts", "During patient preparation"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Sterile supplies must be opened immediately prior to the surgical procedure using careful sterile technique to minimize exposure to potential airborne contaminants."
        },
        {
          q: "A patient was brought to the emergency department by relatives. During the examination, following abnormalities were detected. BP - Not recordable, Pulse - Not palpable, ECG - Shows ventricular fibrillation. What is the most appropriate triage category for this patient?",
          opts: ["Yellow", "Green", "Red", "Black"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Ventricular fibrillation is a cardiac arrest rhythm requiring immediate, life-saving resuscitation (CPR/defibrillation). This falls under the Red/Immediate triage classification."
        },
        {
          q: "Which of the following cellular adaptations occurs in chronic smokers, where the normal ciliated columnar epithelium of the respiratory tract is replaced by stratified squamous epithelium to better resist smoke exposure?",
          opts: ["Atrophy", "Hyperplasia", "Dysplasia", "Metaplasia"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Metaplasia is a reversible cellular adaptation where one mature cell type is replaced by another. In smokers, ciliated columnar airway cells are replaced by tougher stratified squamous cells."
        },
        {
          q: "Which blood test is used to measure the number of different types of white blood cells?",
          opts: ["Hemoglobin test", "Complete blood count (CBC) with differential", "ESR test", "Blood glucose test"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "A CBC with differential calculates the total concentration of white blood cells and identifies the percentage/count of individual cell types."
        },
        {
          q: "Which of the following is the primary extracellular electrolyte?",
          opts: ["Potassium", "Sodium", "Calcium", "Magnesium"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Sodium is the primary extracellular cation, while potassium is the primary intracellular cation."
        },
        {
          q: "Which device is most useful for maintaining airway patency in an unconscious patient without a gag reflex?",
          opts: ["Nasal cannula", "Oropharyngeal airway", "Simple face mask", "Endotracheal tube"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "An oropharyngeal airway keeps the tongue forward in an unconscious patient. It is only used when the gag reflex is absent to avoid vomiting."
        },
        {
          q: "What is the precise anatomical location of Erb's Point used during cardiac auscultation?",
          opts: ["Third intercostal space, at the left sternal border", "Fifth intercostal space, mid-clavicular line", "Fourth intercostal space, right sternal border", "Second intercostal space, right sternal border"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Erb's point is situated at the left third intercostal space at the sternal border, where S2 and specific murmurs are clearly heard."
        },
        {
          q: "Which type of infection mainly causes a significant increase in procalcitonin levels?",
          opts: ["Viral infections", "Fungal infections", "Autoimmune disorders", "Bacterial infections"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Procalcitonin levels rise rapidly in response to systemic bacterial infections and sepsis, helping differentiate them from viral or non-infectious inflammation."
        },
        {
          q: "What is the main purpose of the Bispectral Index (BIS) monitor in an operating theatre?",
          opts: ["To measure a patient's blood pressure during surgery", "To assess the depth of anaesthesia and sedation", "To monitor the patient's heart rate during surgery", "To detect pain in verbal patients after surgery"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "BIS monitoring processes EEG waves to quantify brain activity, assessing the depth of general anesthesia to prevent awareness."
        },
        {
          q: "What is the primary goal of atraumatic care in pediatric nursing?",
          opts: ["To quickly administer medical treatments and perform surgical interventions without any delay", "To minimise psychological and physical distress for children and families during healthcare", "To make the hospital environment more like a sterile laboratory and avoid visitors as far as possible", "To ensure parents stay outside the room during procedures and enforce strict isolation practices"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Atraumatic care focuses on minimizing physical and emotional pain for children and families using child-friendly healthcare practices."
        },
        {
          q: "According to NFHS-5 (2019-21), which of the following statements is correct?",
          opts: ["The under-five mortality rate (U5MR) in India is lower than the infant mortality rate (IMR).", "Both IMR and U5MR are higher in urban areas than rural areas.", "IMR is 35 per 1,000 live births, and U5MR is 42 per 1,000 live births.", "NFHS-5 does not report state-wise variations in IMR."],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "According to India's National Family Health Survey 5 (NFHS-5), the Infant Mortality Rate is 35 per 1,000 live births and the Under-Five Mortality Rate is 42 per 1,000 live births."
        },
        {
          q: "Which test is used primarily to confirm the definitive diagnosis of Mpox (Monkeypox) in a paediatric patient?",
          opts: ["Viral culture of whole blood in a specialised laboratory", "Negative Tzanck smear test for herpes simplex virus", "A complete blood count (CBC) showing a marked lymphocytosis", "PCR testing of lesion material (swab from fluid or crust)"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Definitive diagnosis of Mpox is confirmed through real-time polymerase chain reaction (PCR) of lesion fluids, crusts, or tissue."
        },
        {
          q: "What is the primary characteristic behaviour that defines Rumination Disorder of Infancy?",
          opts: ["Ingestion of non-food items or non-edible items for a period of at least one month", "A persistent aversion to all solid food textures and a refusal to eat solid foods", "Self-induced vomiting immediately following every meal for at least one month", "Repeated regurgitation, re-chewing or re-swallowing of previously eaten food"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Rumination disorder is the voluntary, repeated regurgitation of food that is re-chewed, re-swallowed, or spit out, persisting for at least 1 month."
        },
        {
          q: "When a nurse uses psychotherapeutic and behavioural approaches to manage patients in the community as per the National Mental Health Programme, she is primarily functioning in which of the following roles?",
          opts: ["Consultative role", "Researcher role", "Educator role", "Therapeutic role"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Providing counseling, behavioral therapies, and psychological management constitutes the nurse's therapeutic or clinical role."
        },
        {
          q: "Which of the following is NOT one of the primary cognitive domains assessed by the Mini-Mental State Examination (MMSE)?",
          opts: ["Orientation to time and place", "Attention and Calculation", "Remote Memory (e.g., historical events)", "Language and Visual-spatial skills"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "The MMSE evaluates immediate recall and short-term memory, but does not test remote memory of historical events."
        },
        {
          q: "What is the ICD-11 code for a patient diagnosed with Schizophrenia, Multiple Episodes, currently in full remission?",
          opts: ["6A20.12", "5A24.31", "7B40.02", "8B40.21"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Under ICD-11, 6A20 is Schizophrenia, and 6A20.12 represents multiple episodes in full remission."
        },
        {
          q: "Emil Kraepelin is best known for:",
          opts: ["Establishing psychoanalysis", "Classifying mental disorders", "Advocating for deinstitutionalization", "Introducing electroconvulsive therapy"],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Emil Kraepelin is famed for establishing modern scientific psychiatry and classifying major mental disorders."
        },
        {
          q: "Which of the following is NOT an essential quality needed by a community health nurse to effectively address the dynamic and often unpredictable needs of individuals and families in their homes and community settings?",
          opts: ["Resourcefulness", "Collaboration", "Autocratism", "Flexibility"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Community nursing relies on therapeutic partnership and flexible care. Autocratic control (autocratism) is counterproductive and harmful."
        },
        {
          q: "Which of the following drugs is mainly contraindicated in pregnant women and infants for malaria treatment under the National antimalaria program (NAMP) due to the risk of hemolysis in G6PD-deficient individuals?",
          opts: ["Chloroquine", "Quinine", "Primaquine", "Artemether"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Primaquine is contraindicated in pregnant women and infants because it can cross the placenta or enter milk and trigger severe hemolytic crises."
        },
        {
          q: "Which action is strictly prohibited during proper bag technique?",
          opts: ["Placing the bag on a clean, dry surface", "Removing required supplies and placing them on a clean barrier", "Cleaning equipment that had direct patient contact", "Re-entering the bag while wearing gloves"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "To prevent introducing pathogens into the clean bag, re-entering the bag with gloved hands after patient care has begun is strictly forbidden."
        },
        {
          q: "Which of the following constitutes a standard clinical recommendation for the management of minor disorder, heartburn during pregnancy?",
          opts: ["Advise to avoid eating spicy, fatty, or acidic foods", "Encourage to lie down in the bed for 30 minutes after eating", "Start Intravenous Ringer lactate solution of 500 ml", "Refer woman to the 24 hour Primary Health Centre"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Gestational heartburn is best managed by dietary modifications, such as avoiding fatty, spicy, or acidic foods, and eating small frequent meals."
        },
        {
          q: "A nurse in a postnatal care unit is counselling a mother. She asks how often she should breastfeed her 5-day-old newborn. What is the most appropriate response by the nurse?",
          opts: ["Every 4 hours on a strict schedule, to allow her breasts time to refill, typically 6 times in 24 hours", "Every 5 hours on a strict schedule to allow her breasts time to refill, typically 5 times in 24 hours", "On demand, whenever the baby shows early feeding cues, typically 8 to 12 times in 24 hours", "Only when the baby cries vigorously, as crying is the primary sign of hunger, 4 to 6 times in 24 hours"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Breastfeeding should be on-demand, typically 8-12 times in 24 hours, triggered by early signs of hunger (rooting, lip smacking) rather than scheduled hours."
        },
        {
          q: "The ductus arteriosus serve as a shunt between which two major vessels in the fetal circulation?",
          opts: ["The pulmonary artery and the aorta", "The pulmonary artery and the left atrium", "The superior vena cava and the inferior vena cava", "The right atrium and the left atrium"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "The ductus arteriosus bypasses the non-inflated fetal lungs by shunting blood from the pulmonary trunk directly to the aorta."
        },
        {
          q: "Which of the following infant's reflexes help the infant to locate the nipple when the cheek or mouth is touched during breastfeeding?",
          opts: ["Moro reflex", "Grasp reflex", "Gag reflex", "Rooting reflex"],
          ans: 3,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "The rooting reflex causes an infant to turn their head towards a cheek stimulus, facilitating latching."
        },
        {
          q: "Where is the umbilical cord inserted in a battledore placenta?",
          opts: ["In the centre of the placenta", "Into the fetal membranes, away from the placental edge", "At the margin or edge of the placenta", "Into an accessory lobe"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "A battledore placenta is characterized by the insertion of the umbilical cord at the marginal border of the placenta."
        },
        {
          q: "How is the Homan's Sign performed during a physical examination for a mother during puerperium?",
          opts: ["By applying pressure to the calf while the knee is flexed at 90 degrees at the patella level.", "By passively and abruptly dorsiflexing the patient's foot while the knee is extended.", "By measuring the circumference difference between both calves of the lower extremity.", "By asking the patient to walk and observing their gait while closing their eyes with a shawl."],
          ans: 1,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Homan's sign is checked by maintaining the knee in extension while passively and firmly dorsiflexing the foot, checking for pain in the calf."
        },
        {
          q: "The optimal time for inserting an intrauterine device (IUD) to ensure both effectiveness and minimal complications is:",
          opts: ["2 weeks before menstruation", "1 week before menstruation", "During menstruation", "2 weeks after menstruation"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Insertion during menstruation ensures easy dilatation, less pain, and guarantees the absence of an active pregnancy."
        },
        {
          q: "Which of the following is a contraindication for conducting a trial of labour in a patient with cephalopelvic disproportion (CPD)?",
          opts: ["Minor degree of inlet contraction", "Moderate degree of cephalopelvic disproportion (CPD)", "Associated mid-pelvic and outlet contraction", "Borderline degree of cephalopelvic disproportion (CPD)"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Trial of labor is contraindicated if both mid-pelvic and outlet contractions are present, making spontaneous delivery impossible."
        },
        {
          q: "Which economic model, emphasising the relationship between investment and national income, formed the basis of India’s First Five-Year Plan?",
          opts: ["Nehru-Gandhi Model", "Mahalanobis Model", "Harrod-Domar Model", "Solow Growth Model"],
          ans: 2,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "The Harrod-Domar formulation formed the basis of India's First Five-Year Plan (1951-1956)."
        },
        {
          q: "Within the hospital equipment management cycle, commissioning of new equipment primarily involves which of the following activities?",
          opts: ["Installation, testing, and validation before clinical use", "Disposal of obsolete equipment", "Procurement and tendering of equipment", "Routine preventive maintenance of equipment"],
          ans: 0,
          source: "WBHRB Staff Nurse Grade II 2026",
          explain: "Commissioning represents the installation, rigorous testing, and validation of new equipment to ensure quality and clinical compliance prior to deployment."
        }
      ]
    },
  { id: 'fun-vitals', icon: '🌡️', title: 'Vital Signs & Assessment', desc: 'Temperature, pulse, respiration, BP — measurement, normal values.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'fun-infection', icon: '🦠', title: 'Infection Control', desc: 'Asepsis, sterilization, disinfection, PPE, standard precautions.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'fun-procedures', icon: '🩺', title: 'Nursing Procedures', desc: 'IV therapy, wound care, catheterization, NG tube, oxygen therapy.', questions: 0, mins: 0, ready: false, data: [] },
  {
    id: 'rrb-pharmacist-cbt-mock',
    icon: '💊',
    title: 'RRB Pharmacist Grade III Full CBT Mock 2026',
    desc: 'Full length railway pharmacist mock test based on Pharmaceutics, Pharmacology, Clinical Jurisprudence, Hospital Pharmacy & Aptitude.',
    questions: 10,
    mins: 15,
    ready: true,
    data: [
      { q: "Which equation governs the rate of drug dissolution from a solid dosage form?", opts: ["Noyes-Whitney Equation", "Henderson-Hasselbalch Equation", "Arrhenius Equation", "Michaelis-Menten Equation"], ans: 0, source: "RRB Pharmacist 2019", explain: "The Noyes-Whitney equation describes the rate of dissolution (dC/dt = k*A*(Cs - C)) of solid particles in a liquid medium." },
      { q: "Which test is performed to measure the mechanical strength and resistance to chipping of compressed tablets?", opts: ["Disintegration Test", "Friability Test", "Dissolution Test", "Hardness Test"], ans: 1, source: "ESIC Pharmacist 2019", explain: "The Roche friabilator is used to evaluate friability (weight loss should be less than 1% after 100 rotations)." }
    ]
  },
   {
     id: 'norcet-7-2024',
     icon: '📋',
     title: 'AIIMS NORCET 7 Prelims 2024',
     desc: 'Official memory-based previous year question paper from the AIIMS NORCET 7 Prelims exam held in September 2024.',
     questions: 80,
     mins: 80,
     ready: true,
     data: [
       {
         q: "A patient with kidney failure has been found to have 4+ protein in their urine. The nurse recognizes this finding as indicating:",
         opts: ["Mild proteinuria", "Severe proteinuria", "Nephrotic syndrome", "Chronic kidney disease"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Nephrotic syndrome is characterized by heavy proteinuria (typically 3+ or 4+ on a dipstick, or >3.5 g/day), hypoalbuminemia, hyperlipidemia, and generalized edema."
       },
       {
         q: "Which of the following is a true statement regarding breast milk?",
         opts: ["It is not nutritionally adequate for the first 6 months.", "It can be replaced by formula at any time.", "It increases the risk of gastrointestinal infections.", "It contains all the essential nutrients for the infant's first 6 months."],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Breast milk is the gold standard for infant nutrition. It contains all essential nutrients, vitamins, and maternal antibodies (like IgA) required for healthy growth during the first 6 months of life."
       },
       {
         q: "Based on the anatomical landmarks for ECG electrode placement, where should the V1 lead be positioned?",
         opts: ["4th intercostal space, right sternal edge", "5th intercostal space, mid-clavicular line", "Mid-axillary line in a straight line with V4 and V5", "4th intercostal space, left sternal edge"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The V1 chest lead is placed in the fourth intercostal space at the right sternal border (sternal edge). V2 is placed at the 4th intercostal space left sternal border."
       },
       {
         q: "Which of the following hematological conditions is most likely associated with macrocytic/macroblastic red blood cells (RBCs)?",
         opts: ["Iron deficiency anemia", "Pernicious anemia", "Megaloblastic anemia", "Sickle cell anemia"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Megaloblastic anemia is characterized by abnormally large, immature red blood cells (macroblastic/macrocytic RBCs) in the bone marrow, primarily caused by Vitamin B12 (cobalamin) or Folate (Vitamin B9) deficiency."
       },
       {
         q: "A nurse is caring for a patient with Chronic Obstructive Pulmonary Disease (COPD) who is utilizing a CPAP machine. The nurse understands that the primary function of CPAP in this clinical scenario is to:",
         opts: ["Deliver positive pressure to keep the airways open", "Treat acute hypovolemic shock", "Provide pure supplemental oxygen during sleep", "Prevent pneumonia in stable COPD patients"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Continuous Positive Airway Pressure (CPAP) delivers a constant level of positive airway pressure throughout the respiratory cycle, keeping alveoli and upper airways open and reducing the work of breathing."
       },
       {
         q: "If a patient's tracheostomy tube becomes accidentally dislodged in the immediate post-operative period, what is the nurse's priority action?",
         opts: ["Immediately suction the stoma line", "Reinsert the dislodged tube and secure it tightly", "Call for emergency assistance and prepare for reintubation", "Apply a sterile dressing directly over the wound"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Accidental dislodgement of a fresh tracheostomy tube is an airway emergency. The nurse must immediately call for help (and anesthesia/ENT) and prepare for reintubation or bag-valve-mask ventilation."
       },
       {
         q: "During rapid sequence endotracheal intubation, a nurse is instructed to apply downward pressure on the cricoid cartilage. This clinical technique is known as:",
         opts: ["Sellick maneuver", "Valsalva maneuver", "Trendelenburg position", "Heimlich maneuver"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The Sellick maneuver (cricoid pressure) involves applying downward pressure on the cricoid cartilage to temporarily occlude the esophagus, thereby preventing the regurgitation and aspiration of gastric contents."
       },
       {
         q: "Which of the following vaccines is typically administered to an infant during the standard 6-week immunization visit?",
         opts: ["Hepatitis B booster alone", "Rotavirus vaccine alone", "MMR vaccine", "DTaP (Diphtheria, Tetanus, Pertussis) combination"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "At 6 weeks of age, infants receive their first dose of DTaP or Pentavalent (DPT + HepB + Hib) vaccine, oral polio vaccine (OPV/IPV), rotavirus vaccine, and pneumococcal conjugate vaccine (PCV)."
       },
       {
         q: "A nurse is administering high-flow oxygen via a non-rebreather mask, but notices that the reservoir bag is not inflating. What is the most appropriate next action?",
         opts: ["Check for physical kinks along the oxygen tubing", "Increase the oxygen flow rate on the flowmeter", "Switch the oxygen delivery device to a nasal cannula", "Remove the mask and assess the patient's respiratory rate"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The flow rate for a non-rebreather mask must be kept at a minimum of 10 to 15 liters per minute to keep the reservoir bag at least one-third to one-half full. If it is deflated, increasing the oxygen flow rate is the immediate action."
       },
       {
         q: "A patient taking monoamine oxidase inhibitors (MAOIs) is advised to strictly avoid consuming aged cheese. This restriction is necessary to prevent a life-threatening reaction caused by:",
         opts: ["Caffeine toxicity", "Tyramine-induced hypertensive crisis", "Serotonin syndrome", "Acetylcholine accumulation"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Aged cheeses contain high amounts of Tyramine. MAOIs block the breakdown of tyramine, leading to severe vasoconstriction and a life-threatening hypertensive crisis."
       },
       {
         q: "A postpartum client in the OPD requests an effective contraceptive method that would also help manage her symptoms of hirsutism. Which option is most appropriate?",
         opts: ["Depo-Provera injection", "Combined Oral Contraceptive Pill (COCP)", "Male condom barrier", "Intrauterine Device (IUD)"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Combined Oral Contraceptive Pills (COCPs) containing estrogen and progestin suppress ovarian androgen production and increase sex hormone-binding globulin (SHBG), thereby reducing free circulating testosterone."
       },
       {
         q: "Under the POSHAN Abhiyaan initiative in India, which month is celebrated annually as Rashtriya Poshan Maah (National Nutrition Month)?",
         opts: ["November", "January", "February", "September"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Rashtriya Poshan Maah is celebrated every year in September across India to raise awareness about prenatal, maternal, and infant nutrition."
       },
       {
         q: "Which of the following is a widely used non-hormonal, non-steroidal once-a-week oral contraceptive pill available in India's public health program?",
         opts: ["Combined Oral Contraceptive (COC)", "Progestin-Only Pill (POP)", "Chhaya & Saheli (Ormeloxifene)", "Levonorgestrel Emergency Contraceptive Pill"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Chhaya (Saheli) contains Ormeloxifene, a selective estrogen receptor modulator (SERM). It is highly effective, completely non-hormonal, and non-steroidal once-a-week oral contraceptive pill."
       },
       {
         q: "When a central venous catheter (CVC) is not actively being used for infusions, how frequently should the catheter line be flushed to maintain patency and prevent thrombus formation?",
         opts: ["Every 12 hours", "Every 24 hours", "Every 36 hours", "Every 48 hours"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "To ensure patency and prevent fibrin or blood clot formation inside an unused CVC line, standard nursing protocols recommend flushing the line with normal saline or heparinized saline every 24 hours."
       },
       {
         q: "Which of the following surgical techniques for tubal ligation involves tying a loop of the fallopian tube, cutting the loop, and allowing the ends to separate (depicted as the Pomeroy method in family planning)?",
         opts: ["Vasectomy", "Pomeroy method of sterilization", "Laparoscopic banding", "Tubal ligation using Filshie clips"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The Pomeroy method is a popular female sterilization technique. It involves looping a segment of the fallopian tube, ligating the base of the loop with absorbable suture, and resecting the loop."
       },
       {
         q: "A nurse is monitoring a patient diagnosed with severe hyperkalemia. The nurse should closely assess for which life-threatening complication?",
         opts: ["Cardiac dysrhythmias and tall, tented T waves", "Severe systemic hypertension", "Marked decrease in daily urine output", "Acute kidney injury with severe flank pain"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Hyperkalemia affects cardiac electrical conduction. The classic early ECG changes are tall, peaked/tented T waves, which can progress to lethal ventricular fibrillation or asystole."
       },
       {
         q: "The nurse reviews a patient's arterial blood gas (ABG) panel: pH is 7.30, PaCO2 is 50 mmHg, and HCO3 is 24 mEq/L. The nurse interprets this as:",
         opts: ["Uncompensated Metabolic Acidosis", "Uncompensated Respiratory Acidosis", "Fully Compensated Respiratory Alkalosis", "Partial Metabolic Alkalosis"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "A pH of 7.30 is acidotic (<7.35). The PaCO2 is elevated (>45 mmHg), matching the respiratory acidosis, while HCO3 is normal, meaning it is uncompensated respiratory acidosis."
       },
       {
         q: "Which of the following vaccines is recommended to be administered to a newborn immediately after birth as a birth dose?",
         opts: ["Hepatitis B vaccine", "MMR vaccine", "Varicella vaccine", "Inactivated Influenza vaccine"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Immediately after birth, newborns should receive the Hepatitis B birth dose, Oral Polio Vaccine (OPV-0), and BCG vaccine to provide early immunity."
       },
       {
         q: "Match the following maneuvers with their respective clinical indications:\n(A) McRoberts Maneuver — (III) Shoulder Dystocia\n(B) Heimlich Maneuver — (V) Relief of Choking\n(C) Leopold's Maneuver — (II) Assess Fetal Presentation\n(D) Jaw-Thrust Maneuver — (I) Maintain Airway in Spinal Injury\n(E) Valsalva Maneuver — (IV) Increase Intrathoracic Pressure",
         opts: ["A-III, B-V, C-IV, D-I, E-II", "A-II, B-IV, C-III, D-V, E-I", "A-III, B-V, C-II, D-I, E-IV", "A-III, B-V, C-I, D-II, E-IV"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Matches: McRoberts -> Shoulder Dystocia; Heimlich -> Choking relief; Leopold's -> Fetal presentation; Jaw-thrust -> Airway in spinal injury; Valsalva -> Intrathoracic pressure increase."
       },
       {
         q: "A nurse is preparing to administer a unit of platelets to a thrombocytopenic patient. Over what period should this blood product be infused?",
         opts: ["15 to 30 minutes", "1 to 2 hours", "30 minutes to 1 hour", "3 to 4 hours"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Platelets should be administered rapidly to prevent aggregation and maintain platelet viability. Standard guidelines state that each unit of platelets should be infused over 15 to 30 minutes."
       },
       {
         q: "A nurse is caring for a patient with a central venous catheter and notices the flush port has not been used in the last 24 hours. What is the most appropriate nursing action?",
         opts: ["Flush the line with normal saline immediately", "Document the finding and inform the physician", "Change the dressing on the central line", "Remove the central line and insert a new peripheral line"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "To maintain patency and prevent the formation of a blood clot or fibrin sheath, standard protocol dictates flushing the unused lumen of a CVC with normal saline or heparinized solution at least every 24 hours."
       },
       {
         q: "A nurse notices swelling and a hematoma forming during the insertion of a jugular vein catheter. What is the most appropriate initial action?",
         opts: ["Continue the procedure and apply direct pressure to the area", "Document the complication and notify the physician in charge", "Apply ice to the site and monitor the patient's vital signs", "Remove the catheter and stop the procedure immediately"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "If a hematoma or severe swelling occurs during central venous catheterization, the procedure must be immediately aborted, the catheter removed, and pressure applied to prevent further bleeding into surrounding neck tissues."
       },
       {
         q: "A nurse observes mottling on a newborn's skin, characterized by a bluish or pale, blotchy appearance with a marbled pattern (cutis marmorata). What could be the most likely cause of this condition?",
         opts: ["Acute respiratory distress syndrome", "Elevated blood glucose levels", "Congenital gastrointestinal complications", "Normal physiological response to cold temperatures"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Cutis marmorata (mottling) is a transient, lace-like bluish-red skin discoloration in newborns. It represents a normal, benign physiological vascular response to cold exposure and resolves with warming."
       },
       {
         q: "When collecting sputum samples for Directly Observed Treatment, Short-course (DOTS) diagnosis under National Tuberculosis Elimination Program, how many samples are typically required for baseline testing?",
         opts: ["1 sample", "2 samples", "3 samples", "4 samples"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Traditionally, baseline diagnosis of pulmonary tuberculosis under DOTS guidelines involved collecting three consecutive sputum specimens (including early morning samples) to maximize detection of acid-fast bacilli (AFB)."
       },
       {
         q: "How many resuscitation staff should be present when a newborn is anticipated to require extensive resuscitation at birth?",
         opts: ["1 dedicated staff", "2 dedicated staff", "3 dedicated staff", "4 dedicated staff"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "According to Neonatal Resuscitation Program (NRP) guidelines, if extensive resuscitation is anticipated, at least two trained professionals should be dedicated solely to the resuscitation and stabilization of the newborn."
       },
       {
         q: "A patient exhibits no pulse and is in a pulseless rhythm (Pulseless Ventricular Tachycardia or Ventricular Fibrillation). What is the nurse's immediate next step?",
         opts: ["Administer rapid IV saline fluids", "Perform chest compressions and apply the defibrillator", "Provide high-flow oxygen via non-rebreather mask", "Administer a dose of IV epinephrine"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "For cardiac arrest with shockable pulseless rhythms, the critical immediate actions are high-quality cardiopulmonary resuscitation (CPR/chest compressions) and immediate defibrillation."
       },
       {
         q: "A nurse is setting up a three-way urinary catheter for a patient post-prostatectomy. What is the primary clinical purpose of this catheter?",
         opts: ["To facilitate high-pressure blood drainage", "To irrigate the bladder continuously and prevent blood clot formation", "To monitor urine output hourly during pelvic surgery", "To administer intravesical chemotherapy"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "A three-way Foley catheter allows for continuous bladder irrigation (CBI). Normal saline is infused through the irrigation port to flush out blood and prevent clot retention/obstruction after prostate or bladder surgery."
       },
       {
         q: "The nurse is educating a patient with hypercalcemia. Which endocrine gland is primarily responsible for regulating calcium levels in the human body?",
         opts: ["Thyroid gland", "Adrenal glands", "Parathyroid glands", "Pancreas"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The parathyroid glands secrete parathyroid hormone (PTH), which increases blood calcium levels by stimulating bone resorption, increasing renal calcium reabsorption, and activating Vitamin D."
       },
       {
         q: "A patient presents with sharp flank pain, high fever, and chills. Pyelonephritis is diagnosed. The nurse understands that this condition is most commonly caused by:",
         opts: ["An ascending urinary tract infection extending to the renal pelvis", "Chronic kidney disease progress", "Direct trauma to the lower abdomen", "Dehydration and electrolyte imbalances"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Acute pyelonephritis is an infectious inflammatory disease of the kidney pelvis. It is most commonly caused by bacteria (like E. coli) ascending from the lower urinary tract up the ureters into the kidneys."
       },
       {
         q: "A nurse is assessing the fetal position of a pregnant woman in labor. The fetal heart tones are best heard in the left lower quadrant of the maternal abdomen. What is the most likely fetal position?",
         opts: ["Right Occiput Anterior (ROA)", "Left Occiput Anterior (LOA)", "Right Occiput Posterior (ROP)", "Left Occiput Posterior (LOP)"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Fetal heart tones are heard loudest through the fetal back. In a cephalic presentation, if the back is on the left side of the maternal pelvis and anterior (LOA), the heart tones are best heard in the left lower maternal quadrant."
       },
       {
         q: "A patient presents with bilateral eye redness, watery discharge, mild photophobia, and itching. The nurse suspects conjunctivitis. Which type of conjunctivitis is most consistent with these clinical findings?",
         opts: ["Viral conjunctivitis", "Allergic conjunctivitis", "Bacterial conjunctivitis", "Chronic conjunctivitis"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Viral conjunctivitis typically presents with bilateral, watery/serous discharge, conjunctival injection (redness), and itching, often preceded by a viral upper respiratory infection."
       },
       {
         q: "A nurse is counseling a family whose child has been diagnosed with Down syndrome. Which of the following is a classic clinical feature of Down syndrome?",
         opts: ["Short stature, single palmar crease, and cognitive delays", "Long limbs, thin stature, and hyperactive reflexes", "Superior spatial IQ and lack of physical differences", "Tall stature with arachnodactyly"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Down syndrome (Trisomy 21) is characterized by cognitive impairment, flat facial profile, upward-slanting palpebral fissures, single palmar (simian) crease, low muscle tone, and short stature."
       },
       {
         q: "A nurse observes that a patient is repeatedly denying the diagnosis of terminal cancer despite viewing biopsy reports. Which defense mechanism is this patient utilizing?",
         opts: ["Repression", "Displacement", "Rationalization", "Denial"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Denial is a primitive ego defense mechanism in which the person refuses to acknowledge a painful or anxiety-producing reality, thereby protecting themselves from immediate distress."
       },
       {
         q: "A psychiatric patient believes they are a royal figure with absolute power and can control global weather. This false fixed belief is known as:",
         opts: ["Delusion of persecution", "Delusion of grandeur", "Delusion of reference", "Hallucination of control"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Delusions of grandeur involve a false, fixed belief of possessing inflated worth, power, knowledge, identity, or a special relationship to a deity or famous person."
       },
       {
         q: "A patient claims that neighbors are transmitting electronic signals through the walls to poison their food. The nurse identifies this as which type of delusion?",
         opts: ["Delusion of reference", "Delusion of grandeur", "Delusion of persecution", "Delusion of control"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Delusions of persecution (paranoid delusions) involve the central theme that the individual is being conspired against, cheated, spied on, followed, poisoned, or harassed."
       },
       {
         q: "A hospitalized patient with acute delirium exhibits severe agitation and confusion. What is the priority nursing intervention to manage this patient's environment?",
         opts: ["Apply bilateral soft wrist restraints", "Provide a calm, quiet, well-lit environment with frequent re-orientation", "Increase environmental stimulation to keep them awake", "Restrict family visits to minimize external anxiety"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Delirium management includes non-pharmacological strategies like reducing noise, maintaining gentle lighting (to prevent shadows/hallucinations), and using calendars or familiar family members for orientation."
       },
       {
         q: "During Electroconvulsive Therapy (ECT), 100% supplemental oxygen is administered throughout the procedure. What is the primary physiological purpose of this intervention?",
         opts: ["To prevent post-ictal pain", "To facilitate complete skeletal muscle relaxation", "To maintain cerebral oxygenation and reduce post-seizure confusion", "To increase the seizure duration significantly"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The patient is hyperoxygenated with 100% oxygen during ECT because the induced seizure increases cerebral oxygen consumption. Succinylcholine (muscle relaxant) also paralyzes respiratory muscles, making mechanical ventilation necessary."
       },
       {
         q: "A nurse is assisting with a surgical sterilization procedure involving the Pomeroy method. What is a notable clinical feature of this tubal ligation technique?",
         opts: ["It is highly reversible compared to other ligation methods", "It completely prevents ectopic pregnancies entirely", "It involves insertion of metal clips on the tubes", "It is utilized to treat underlying uterine fibroids"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "While intended as a permanent female sterilization technique, the Pomeroy method causes minimal tissue destruction, making it one of the most successfully reversible tubal ligation methods if a reversal is later requested."
       },
       {
         q: "A nurse is performing Leopold's maneuvers on a pregnant client. She uses one hand to grasp the lower uterine segment just above the symphysis pubis to determine the presenting part. Which maneuver is being performed?",
         opts: ["First Maneuver (Fundal Grip)", "Second Maneuver (Umbilical Grip)", "Third Maneuver (Pawlik's Grip)", "Fourth Maneuver (Pelvic Grip)"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The Third Maneuver (Pawlik's Grip) involves using one hand to grasp the lower abdomen to determine if the fetal presenting part is engaged in the pelvis."
       },
       {
         q: "A client experiences a second-degree perineal tear during vaginal delivery. The nurse understands that this tear involves:",
         opts: ["Vaginal mucosa and superficial skin only", "Vaginal mucosa, perineal skin, and anal sphincter muscles", "Vaginal mucosa, perineal skin, and muscles of the perineal body"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "A second-degree laceration extends through the vaginal mucosa, perineal skin, and into the fascial and muscular structures of the perineal body, but does not involve the anal sphincter."
       },
       {
         q: "A nurse is administering Carboprost (15-methyl prostaglandin F2-alpha) to a patient experiencing postpartum hemorrhage (PPH). What is the primary action of this drug?",
         opts: ["Stimulating uterine smooth muscle contractions to promote hemostasis", "Lowering systemic blood pressure to reduce active pelvic bleeding", "Directly replacing clotting factors in the uterine sinuses", "Relaxing the cervix to facilitate the manual removal of clots"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Carboprost is an oxytocic agent that directly stimulates uterine contractions. It is used to manage postpartum hemorrhage caused by uterine atony when other measures (like Oxytocin) fail."
       },
       {
         q: "During a vaginal examination, the nurse determines that the fetal presenting part is at '-1 station'. How does the nurse interpret this finding?",
         opts: ["The fetal head is engaged at the level of the ischial spines", "The fetal head is 1 cm above the pelvic inlet", "The fetal head is 1 cm below the level of the ischial spines", "The fetal head is 1 cm above the level of the ischial spines"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Fetal station is measured in centimeters relative to the maternal ischial spines (the zero point). Negative numbers indicate the presenting part is above the spines; '-1 station' means 1 cm above the ischial spines."
       },
       {
         q: "Which obstetrical forceps are characterized by a sliding lock and are specifically designed to correct deep transverse arrest or asynclitism during rotation?",
         opts: ["Simpson Forceps", "Wrigley's Forceps", "Kielland Forceps", "Piper Forceps"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Kielland forceps have a sliding lock and minimal pelvic curve, making them the standard choice for rotating a fetus in an occiput-transverse position (deep transverse arrest)."
       },
       {
         q: "A nurse is educating a client about Saheli (Centchroman), a weekly oral contraceptive. What is the primary pharmacodynamic advantage of this method?",
         opts: ["It inhibits ovulation like combined hormonal pills", "It is a completely non-hormonal, non-steroidal SERM with fewer metabolic side effects", "It provides 5 years of continuous contraceptive protection", "It must be taken daily at the exact same hour"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Saheli (Centchroman/Ormeloxifene) is a Selective Estrogen Receptor Modulator (SERM). It prevents implantation by altering the endometrium, is non-hormonal, has no steroidal side effects, and is taken once a week."
       },
       {
         q: "Which of the following contraceptive methods is most closely associated with androgenic side effects such as hirsutism or acne due to its hormonal composition?",
         opts: ["Progesterone-only formulations (mini-pill or injections)", "Copper-T Intrauterine Device (IUD)", "Hormone-free barrier methods", "Combined estrogen-progestin pills containing cyproterone"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Progestins (especially older generations like medroxyprogesterone acetate or levonorgestrel in progesterone-only formulations) can have androgenic properties, occasionally leading to acne, hirsutism, or weight gain."
       },
       {
         q: "A client complains of a profuse, frothy, green-colored vaginal discharge accompanied by vaginal itching and burning. The nurse suspects which condition?",
         opts: ["Bacterial vaginosis", "Candidiasis (Yeast infection)", "Trichomoniasis", "Chlamydia trachomatis infection"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Trichomoniasis, caused by the protozoan Trichomonas vaginalis, classically presents with a foul-smelling, frothy, yellow-green vaginal discharge, vulvar irritation, dysuria, and a 'strawberry cervix'."
       },
       {
         q: "A nurse is assessing a child with a high fever and suspecting measles (Rubeola). Which of the following is a pathognomonic sign of measles?",
         opts: ["Koplik's spots on the buccal mucosa", "A diffuse sandpaper-like maculopapular rash", "A bright red strawberry tongue", "Red, swollen tonsils with exams"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Koplik's spots (small, irregular red spots with blue-white centers on the mucosal lining of the cheek) are a pathognomonic early sign of measles, appearing 1-2 days before the generalized rash."
       },
       {
         q: "Who was the first Indian athlete to win a gold medal in the history of the Paralympic Games?",
         opts: ["Deepa Malik", "Devendra Jhajharia", "Mary Kom", "Murlikant Petkar"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Murlikant Petkar won India's first-ever Paralympic gold medal at the 1972 Heidelberg Games in the 50m freestyle swimming event, setting a world record."
       },
       {
         q: "In which competition did Mary Kom win her first-ever international gold medal, paving the way for her historic career?",
         opts: ["Asian Games", "AIBA World Boxing Championships", "London Olympic Games", "Commonwealth Games"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Mary Kom won her first international gold medal at the 2nd AIBA World Women's Boxing Championship held in Antalya, Turkey in 2002 (under the 45 kg category)."
       },
       {
         q: "A nurse is caring for a client with gestational hypertension. The nurse understands that a major risk of severe untreated preeclampsia is:",
         opts: ["Placental abruption (Abruptio Placentae)", "Gestational diabetes development", "Maternal urinary tract infection", "Maternal thyroid storm"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Severe preeclampsia causes vasospasms and endothelial damage. This can lead to placental hypoperfusion and increases the risk of premature separation of the placenta (placental abruption)."
       },
       {
         q: "What is considered the gold standard laboratory method for checking exact hemoglobin levels in prospective blood donors at a blood bank?",
         opts: ["Copper sulfate specific gravity test", "Complete Blood Count (CBC) using an automated hematology analyzer", "Hemoglobin electrophoresis", "Serum ferritin level assay"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "While the copper sulfate method is a common screening test for blood donors, the gold standard for measuring hemoglobin concentration is an automated cell counter (CBC)."
       },
       {
         q: "Which of the following describes the 'General Fertility Rate' (GFR)?",
         opts: ["The annual number of live births per 1,000 women of childbearing age (15-49 years)", "The total number of live births per 1,000 population in a year", "The average number of children born to a woman during her entire lifetime", "The ratio of total live births to maternal deaths in a year"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The General Fertility Rate (GFR) is defined as the number of live births per 1,000 women of reproductive age (typically defined as 15 to 44 or 15 to 49 years) in a given year."
       },
       {
         q: "A newborn delivered via a prolonged, difficult vacuum extraction is found to have an absent Moro reflex on the right side. What is the most likely cause?",
         opts: ["Fractured clavicle or brachial plexus injury", "Congenital hip dysplasia", "Mild neonatal hypoglycemia", "Symmetric intracranial hemorrhage"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "An asymmetrical Moro reflex (absent on one side) in a newborn after a difficult delivery is a classic sign of a fractured clavicle or brachial plexus injury (Erb-Duchenne paralysis)."
       },
       {
         q: "A nurse is presenting research data showing a relationship between patient weight and the cost of care. Which graphical representation is best to display individual coordinate data points?",
         opts: ["Scatter Plot", "Pie Chart", "Bar Diagram", "Line Graph"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "A scatter plot is used to display values for two variables for a set of data. It is ideal for showing the relationship or correlation between two continuous variables (e.g., weight vs. cost)."
       },
       {
         q: "A patient's lab results show a serum potassium level of 6.8 mEq/L. Which electrocardiogram (ECG) changes should the nurse immediately look for?",
         opts: ["Tall, peaked T waves, prolonged PR interval, and widened QRS", "ST-segment elevation with flat T waves", "Shortened QT interval with prominent U waves", "Inverted P waves and ventricular bigeminy"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The earliest ECG changes in hyperkalemia (potassium > 5.5 mEq/L) are tall, peaked (tented) T waves. As potassium levels rise, PR interval prolongs, P waves flatten/disappear, and the QRS complex widens."
       },
       {
         q: "Which of the following blood group profiles correctly identifies the agglutinogens (antigens) on red cells and agglutinins (antibodies) in plasma?",
         opts: ["Blood group A: Antigen A on RBCs, Anti-B antibodies in plasma", "Blood group B: Antigen A & B on RBCs, Anti-A antibodies in plasma", "Blood group AB: No antigens on RBCs, Anti-A & Anti-B in plasma", "Blood group O: Antigen A & B on RBCs, no antibodies in plasma"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "ABO blood grouping is based on inherited antigens on RBC surfaces. Group A has Antigen A on RBCs and Anti-B antibodies in plasma. Group O has no antigens on RBCs but both Anti-A and Anti-B antibodies in plasma."
       },
       {
         q: "A 5-year-old child presents with severe fatigue, pallor, and developmental delays. Labs reveal macrocytic anemia. This finding is most likely associated with a deficiency of which nutrient?",
         opts: ["Riboflavin (Vitamin B2)", "Cobalamin (Vitamin B12)", "Niacin (Vitamin B3)", "Elemental Iron"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Macrocytic (megaloblastic) anemia is caused by impaired DNA synthesis, leading to large, immature RBCs. The most common nutritional causes are deficiencies in Cobalamin (B12) or Folate (B9)."
       },
       {
         q: "A patient's temperature chart shows a pattern where the daily body temperature is highest in the morning and lowest in the evening. This abnormal thermoregulatory pattern is termed:",
         opts: ["Intermittent fever", "Inverted fever", "Continuous fever", "Remittent fever"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "In inverted fever (typus inversus), the daily temperature curve is reversed — the highest temperature is recorded in the morning and the lowest in the evening, sometimes seen in miliary tuberculosis."
       },
       {
         q: "A patient with a spinal cord injury at T6 experiences Autonomic Dysreflexia. The nurse understands that this life-threatening emergency presents with which classic signs?",
         opts: ["Severe paroxysmal hypertension and bradycardia", "Severe hypertension and tachycardia", "Marked hypotension and tachycardia", "Hypotension and bradycardia"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Autonomic dysreflexia is triggered by noxious stimuli below the level of injury. It causes uncontrolled vasoconstriction below the lesion (severe hypertension) and compensatory vagal slowing of the heart (bradycardia)."
       },
       {
         q: "A 50-year-old patient experiences complete paralysis of all four limbs, along with paralysis of the neck and facial muscles. The nurse documents this condition as:",
         opts: ["Hemiplegia", "Quadriplegia / Tetraplegia", "Paraplegia", "Pentaplegia"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Pentaplegia refers to the complete paralysis of all four limbs (quadriplegia) plus paralysis of the neck muscles and cranial nerves, typically resulting from high cervical spine injury or brainstem lesions."
       },
       {
         q: "A client reports experiencing persistent, intrusive, unwanted thoughts and feels driven to perform repetitive hand washing rituals to relieve anxiety. The nurse recognizes this as indicating:",
         opts: ["Generalized Anxiety Disorder", "Post-Traumatic Stress Disorder", "Obsessive-Compulsive Disorder", "Panic Disorder with Agoraphobia"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "OCD is characterized by obsessions (intrusive, distressful thoughts or images) and compulsions (repetitive behaviors or mental acts performed to neutralize the anxiety caused by the obsessions)."
       },
       {
         q: "Aversion therapy, a behavior modification technique that pairs a maladaptive behavior with an unpleasant stimulus, is most commonly used in the clinical management of:",
         opts: ["Severe clinical depression", "Smoking or alcohol addiction", "Acute panic attacks", "Phobic avoidance of heights"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Aversion therapy utilizes classical conditioning principles. For example, pairing alcohol consumption with disulfiram (Antabuse) to cause severe physical distress, thereby discouraging alcohol intake."
       },
       {
         q: "Systemic desensitization, a technique where a patient is gradually exposed to a fear-inducing stimulus while practicing relaxation, is highly effective for:",
         opts: ["Acute panic attacks", "Specific phobias", "Schizophrenic hallucinations", "Post-traumatic flashbacks"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Systemic desensitization is a behavior therapy technique developed by Joseph Wolpe. It is the gold standard for treating specific phobias and anxiety disorders by replacing fear with a relaxation response."
       },
       {
         q: "A patient is prescribed Disulfiram (Antabuse) for alcohol rehabilitation. The nurse should instruct the patient that consuming alcohol while on this medication will cause:",
         opts: ["Mild dizziness and fatigue", "Severe headache, flushing, nausea, and vomiting", "Extreme physical hyperactivity", "Rapid, uncontrolled weight gain"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Disulfiram blocks acetaldehyde dehydrogenase. Consuming even small amounts of alcohol leads to an accumulation of acetaldehyde, causing severe physical distress (flushing, throbbing headache, dyspnea, nausea, vomiting)."
       },
       {
         q: "A nurse collects an arterial blood gas (ABG) sample, but the transfer to the lab is delayed by 45 minutes at room temperature. What is the most likely error in the results?",
         opts: ["Pseudohyperkalemia and elevated pH", "Falsely low PaCO2", "Inaccurately low PaO2 and elevated PaCO2", "Falsely elevated pH and low lactate"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "If an ABG sample is not processed promptly or kept on ice, cellular respiration continues in the syringe. RBCs consume oxygen (lowering PaO2) and produce carbon dioxide (raising PaCO2 and lowering pH)."
       },
       {
         q: "A nurse is preparing to administer Vitamin K intramuscularly to a newborn. Which syringe/needle selection and site are most appropriate?",
         opts: ["1 mL syringe with a 26G needle, administered in the vastus lateralis muscle", "2 mL syringe with a 21G needle, administered in the gluteus maximus", "Insulin syringe, administered subcutaneously in the upper arm", "1 mL syringe with a 26G needle, administered intradermally in the forearm"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Vitamin K is administered to newborns intramuscularly (IM) to prevent hemorrhagic disease of the newborn. The standard site is the vastus lateralis (anterolateral thigh) using a 25G or 26G needle."
       },
       {
         q: "A pediatric nurse administers 50,000 IU of Vitamin A orally to a 7-month-old infant. This supplementation is primarily indicated to:",
         opts: ["Prevent Vitamin D resistant rickets", "Treat underlying iron deficiency anemia", "Prevent xerophthalmia, night blindness, and support childhood immunity", "Treat scurvy and skin lesions"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Under the National Prophylaxis Programme against Blindness, infants aged 6-11 months receive a single oral dose of 100,000 IU (or 50,000 IU depending on guidelines/health status) of Vitamin A to prevent xerophthalmia and boost immunity."
       },
       {
         q: "When measuring manual blood pressure using the auscultatory method, the nurse should place the diaphragm of the stethoscope over which arterial landmark?",
         opts: ["Carotid artery", "Radial artery", "Brachial artery", "Femoral artery"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The brachial artery, located in the antecubital fossa medial to the biceps tendon, is the standard auscultation site for measuring manual blood pressure in the upper extremity."
       },
       {
         q: "A nurse is reviewing an ECG showing Ventricular Tachycardia (VT). Which of the following is the defining electrocardiographic feature of VT?",
         opts: ["Slow, irregular ventricular complexes with missing P waves", "Classic saw-tooth flutter waves", "Complete dissociation between normal P waves and narrow QRS", "A rapid ventricular rate (usually 100-250 bpm) with wide, bizarre QRS complexes"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Ventricular Tachycardia is defined by three or more consecutive premature ventricular complexes at a rate >100 bpm, presenting with wide, bizarre QRS complexes (>0.12 seconds) and no visible P waves."
       },
       {
         q: "During rapid sequence intubation, why is cricoid pressure (Sellick's maneuver) applied?",
         opts: ["To stabilize the cervical spine during direct laryngoscopy", "To facilitate better visualization of the adenoid tissue", "To compress the esophagus against the vertebrae and prevent gastric regurgitation and aspiration", "To open up the epiglottic fold for easier tube passage"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Cricoid pressure compresses the esophagus against the cervical vertebrae, preventing passive regurgitation of gastric contents into the pharynx and subsequent pulmonary aspiration during endotracheal intubation."
       },
       {
         q: "In computer science and web development, what is the complete expansion of the term HTML?",
         opts: ["High Text Markup Language", "Higher Text Machine Language", "Hyper Text Machine Language", "Hyper Text Markup Language"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "HTML stands for Hyper Text Markup Language. It is the standard markup language used to create and design the structural layout of documents displayed in web browsers."
       },
       {
         q: "The abbreviation GPS, used widely for navigation and location tracking, stands for:",
         opts: ["Global Pole Structure", "Global Positioning System", "Global PolySiliconium Store", "Global Poles System"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "GPS stands for Global Positioning System. It is a satellite-based radionavigation system owned by the United States government and operated by the United States Space Force."
       },
       {
         q: "How many total medals did India win at the Tokyo 2020 Olympic Games (often referred to as their historic best performance)?",
         opts: ["10 medals", "5 medals", "7 medals (1 Gold, 2 Silver, 4 Bronze)", "12 medals"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "India won a total of 7 medals at the Tokyo 2020 Olympics, marking their most successful Olympic campaign. Neeraj Chopra won India's historic gold in Javelin throw."
       },
       {
         q: "A medical device is shown with an inflation balloon port, an irrigation fluid inlet, and a urinary drainage outlet. What is this device called?",
         opts: ["Standard two-way Foley catheter", "Three-way urinary catheter (triple-lumen catheter)", "Levine nasogastric tube", "Endotracheal tube with subglottic suctioning"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "A triple-lumen (three-way) urinary catheter has three channels: one for balloon inflation, one for continuous bladder irrigation (CBI) fluid instillation, and one for draining urine/fluid."
       },
       {
         q: "A nurse is teaching a client who has a new prescription for Phenelzine (an MAOI). The nurse instructs the client to avoid which of the following food categories?",
         opts: ["High-protein lean poultry and fresh fish", "Complex carbohydrates like oatmeal and whole grain bread", "Low-cholesterol skimmed milk and low-sodium vegetables", "Foods high in tyramine such as aged cheeses, red wine, and cured meats"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "MAOIs inhibit the breakdown of tyramine in the gastrointestinal tract. Consuming tyramine-rich foods can cause an acute release of norepinephrine, leading to a hypertensive crisis."
       },
       {
         q: "A client who started an antidepressant (Tricyclic Antidepressant) one week ago reports mild constipation and dry mouth, but says their mood has not improved. What is the nurse's best response?",
         opts: ["These side effects are common, and it typically takes 3 to 4 weeks for the therapeutic effects on mood to become noticeable.", "Stop taking the medication immediately and go to the nearest emergency room.", "You should call your prescriber immediately to switch to another class of medication.", "These are signs of severe drug toxicity; you need an urgent blood level check."],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Antidepressants (TCAs and SSRIs) typically require 2 to 4 weeks (sometimes up to 6-8 weeks) of therapeutic dosing to demonstrate full clinical efficacy. Anticholinergic side effects often resolve or lessen over time."
       },
       {
         q: "During a vaginal delivery utilizing forceps, the newborn suffers a birth injury presenting with a flaccid right arm and an asymmetrical Moro reflex. Which injury is indicated?",
         opts: ["Symmetric cerebral palsy", "Sacral nerve root compression", "Cervical spinal cord transection", "Brachial plexus injury (Erb's Palsy)"],
         ans: 3,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Erb's Palsy is caused by injury to the C5-C6 nerve roots of the brachial plexus during a difficult traction delivery. It presents with an asymmetrical Moro reflex and the arm hanging in the 'waiter's tip' position."
       },
       {
         q: "Which of the following seizure types in a neonate is most commonly characterized by rhythmic, localized jerking of a single limb or facial muscles?",
         opts: ["Generalized tonic seizure", "Focal clonic seizure", "Subtle neonatal seizure", "Typical absence seizure"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Clonic seizures in newborns are characterized by rhythmic, slow jerking movements (usually 1-3 times per second) of a limb or muscle group, which do not stop when the limb is held or repositioned."
       },
       {
         q: "During electronic fetal monitoring, the nurse notes variable decelerations in the fetal heart rate. The nurse understands that this pattern is typically caused by:",
         opts: ["Umbilical cord compression", "Uteroplacental insufficiency", "Fetal head compression during contractions", "Transient maternal pyrexia"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Variable decelerations are abrupt decreases in fetal heart rate below the baseline that vary in onset, depth, and duration, classically caused by umbilical cord compression."
       },
       {
         q: "Which of the following describes the secondary level of prevention in healthcare?",
         opts: ["Immunization against infectious diseases", "Early diagnosis and prompt treatment", "Rehabilitation and physical therapy", "Health education and lifestyle modifications"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Secondary prevention focuses on early detection (screening, diagnostic tests) and prompt intervention to limit the severity of a disease and prevent complications."
       },
       {
         q: "A patient presents to the emergency department with a deep, penetrating abdominal wound. What is the nurse's immediate priority action?",
         opts: ["Apply a tight abdominal binder", "Administer high-dose oral analgesics", "Assess airway, breathing, circulation and monitor for shock", "Gently probe the wound to check its depth"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "In any trauma patient, the initial priority is always the primary survey (ABCDEs) to stabilize life-threatening issues before addressing specific localized injuries."
       },
       {
         q: "Which of the following terms describes the complete, permanent cessation of menstrual cycles in a woman?",
         opts: ["Menarche", "Dysmenorrhea", "Menopause", "Oligomenorrhea"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Menopause is defined retrospectively as the permanent cessation of menstruation for 12 consecutive months due to the loss of ovarian follicular activity."
       },
       {
         q: "A nurse is caring for a patient who has been on bed rest for 5 days. The nurse should actively assess for which musculoskeletal complication?",
         opts: ["Deep vein thrombosis (DVT) and muscle atrophy", "Increased joint flexibility", "Scoliosis development", "Rapid bone density increase"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Prolonged immobility/bed rest leads to venous stasis, predisposing to DVT, and lack of weight-bearing leading to progressive muscle atrophy and osteoporosis."
       },
       {
         q: "Which of the following standard precautions is essential when handling any patient's bodily fluids, regardless of their infectious status?",
         opts: ["Wearing personal protective equipment (PPE) like gloves and eye protection if splashing is anticipated", "Isolating the patient in a negative-pressure room", "Administering prophylactic antibiotics to the staff", "Restricting the patient's visitor access"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Standard precautions are based on the principle that all blood, body fluids, secretions, and excretions may contain transmissible infectious agents, requiring PPE use based on the exposure risk."
       },
       {
         q: "What is the primary clinical purpose of an incentive spirometer for a post-operative patient?",
         opts: ["To measure the patient's oxygen saturation levels", "To promote deep breathing, alveolar expansion, and prevent atelectasis", "To deliver aerosolized bronchodilators", "To assess the patient's vital capacity for discharge planning"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Incentive spirometry encourages visual feedback for voluntary deep, slow inhalation, which promotes maximum lung expansion and prevents atelectasis (collapsed alveoli) post-surgery."
       },
       {
         q: "A nurse is preparing to perform a sterile dressing change. Which action would compromise the sterility of the surgical field?",
         opts: ["Opening sterile packages away from the body", "Placing non-sterile items within the 1-inch border of the sterile drape", "Keeping the sterile field continuously within the line of vision", "Pouring sterile saline into a sterile cup without splashing"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The 1-inch outer margin of a sterile field/drape is considered contaminated. Placing any items there or touching it with sterile gloves violates aseptic technique."
       },
       {
         q: "Which of the following is the standard site for assessing a pulse during adult cardiopulmonary resuscitation (CPR)?",
         opts: ["Radial artery", "Femoral artery", "Carotid artery", "Brachial artery"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The carotid artery in the neck is the preferred site for checking a pulse in an unresponsive adult because it is centrally located, easily accessible, and remains palpable at lower blood pressures."
       },
       {
         q: "When a patient has a chest tube connected to a water-seal drainage system, the nurse notices gentle, rhythmic bubbling in the water-seal chamber during inhalation and exhalation. What does this indicate?",
         opts: ["The system has an active air leak and must be replaced", "This is a normal finding (tidaling) indicating system patency and pleural pressure changes", "The suction control regulator is set too high", "The chest tube is completely occluded by a blood clot"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Fluctuation/tidaling in the water-seal chamber with respiration is normal. Rhythmic, mild bubbling may be seen with expiration or coughing as air leaves the pleural space. (Continuous bubbling, however, suggests a system leak)."
       },
       {
         q: "A patient with a history of heart failure is prescribed furosemide. The nurse should closely monitor which laboratory value?",
         opts: ["Serum potassium level", "Blood urea nitrogen (BUN) only", "Complete blood count (CBC)", "Serum calcium level only"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Furosemide is a loop diuretic that causes excretion of water, sodium, and potassium. Hypokalemia (low potassium) is a major side effect that can precipitate lethal arrhythmias."
       },
       {
         q: "Which of the following clinical findings is a classic hallmark of acute compartment syndrome in an extremity?",
         opts: ["Warm, flushed skin with strong palpable pulses", "Severe, disproportionate pain not relieved by analgesics, along with paresthesia", "Decreased pain upon raising the affected limb above heart level", "Rapidly resolving edema with zero pressure elevation"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "The '6 Ps' of compartment syndrome include Pain (unrelieved and out of proportion), Paresthesia (early sign of nerve compression), Pulselessness, Pallor, Paralysis, and Poikilothermia."
       },
       {
         q: "A nurse is administering a blood transfusion when the patient suddenly complains of chills, lower back pain, and dyspnea. What is the nurse's priority action?",
         opts: ["Slow down the transfusion rate and notify the doctor", "Administer intravenous diphenhydramine immediately", "Stop the blood transfusion immediately and disconnect the tubing from the cannula", "Check the patient's temperature and document the baseline"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "These symptoms indicate an acute hemolytic transfusion reaction. The transfusion must be stopped immediately to limit exposure, and the line flushed with normal saline using new tubing."
       },
       {
         q: "A patient with a head injury exhibits a Glasgow Coma Scale (GCS) score of 6. How does the nurse interpret this level of consciousness?",
         opts: ["Mild head injury with minor cognitive impairment", "Moderate head injury with stable neurological prognosis", "Severe head injury (comatose state) requiring airway protection", "Brain death state requiring immediate life support withdrawal"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "A GCS score of 8 or less is the standard definition of a severe head injury/coma, indicating a high risk of airway compromise and the necessity for endotracheal intubation."
       },
       {
         q: "Which of the following positions is most appropriate for a patient in the immediate recovery phase following a supratentorial craniotomy?",
         opts: ["Flat supine to prevent spinal headache", "Semi-Fowler's (head of bed elevated 30 to 45 degrees) with neck in neutral alignment", "Trendelenburg position to maximize cerebral blood flow", "Prone position with head rotated to the side"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Elevating the HOB to 30-45 degrees facilitates venous drainage from the brain, thereby reducing intracranial pressure (ICP), which is critical post-craniotomy."
       },
       {
         q: "During assessment of a patient with a history of cirrhosis, the nurse notes flapping tremors of the hands (asterixis). What does this finding indicate?",
         opts: ["Alcohol withdrawal tremors", "Advanced hepatic encephalopathy due to elevated ammonia levels", "Peripheral nerve damage from severe vitamin deficiency", "Acute cerebellar dysfunction"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Asterixis (liver flap) is a classic sign of hepatic encephalopathy, caused by accumulation of nitrogenous wastes (like ammonia) that cross the blood-brain barrier."
       },
       {
         q: "A patient with suspected meningitis undergoes a lumbar puncture. The cerebrospinal fluid (CSF) analysis reveals high protein, low glucose, and increased neutrophils. These findings are most consistent with:",
         opts: ["Viral meningitis", "Bacterial meningitis", "Fungal meningitis", "Tuberculous meningitis only"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Bacterial meningitis CSF is characterized by turbid appearance, elevated PMNs (neutrophils), elevated protein, and significantly decreased glucose (as bacteria consume glucose)."
       },
       {
         q: "Which of the following is the primary mechanism of action of nitroglycerin when administered to a patient with angina?",
         opts: ["Increasing systemic vascular resistance to raise coronary perfusion pressure", "Promoting generalized vasodilation, reducing preload and myocardial oxygen demand", "Directly dissolving coronary artery thrombi", "Decreasing the heart rate to prolong diastole"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Nitroglycerin is a potent vasodilator. It relaxes vascular smooth muscle, primarily venules, leading to venous pooling, which decreases venous return (preload) and workload on the heart."
       },
       {
         q: "A nurse is caring for a patient who has a chest tube connected to a wet-suction control chamber. The nurse notices constant bubbling in the suction control chamber. What does this indicate?",
         opts: ["There is a serious air leak in the patient's pleural space", "This is a normal and expected finding indicating that suction is active", "The water level in the chamber is dangerously low", "The suction tubing is completely blocked"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "In a wet-suction system, continuous gentle bubbling in the suction control chamber indicates that the prescribed suction is being applied. Bubbling in the water-seal chamber, however, indicates an air leak."
       },
       {
         q: "What is the primary action of the medication spironolactone?",
         opts: ["Excreting potassium and retaining sodium in the distal tubule", "Antagonizing aldosterone, causing sodium and water excretion while conserving potassium", "Inhibiting loop of Henle sodium reabsorption", "Directly dilating renal blood vessels to increase GFR"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Spironolactone is a potassium-sparing diuretic that blocks aldosterone receptors in the distal renal tubules, leading to sodium/water excretion and potassium retention."
       },
       {
         q: "A patient with type 1 diabetes is found unresponsive with a blood glucose level of 42 mg/dL. What is the nurse's priority action?",
         opts: ["Administer 10 units of regular insulin subcutaneously", "Give the patient 8 ounces of orange juice to drink", "Administer 50% dextrose (D50) intravenously or glucagon IM", "Start a high-flow oxygen mask and monitor vital signs"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "For an unconscious or unresponsive patient with severe hypoglycemia, oral intake is contraindicated due to aspiration risk. IV D50 or IM glucagon is the immediate treatment."
       },
       {
         q: "Which of the following clinical signs is considered an early indicator of hypovolemic shock?",
         opts: ["Severe hypotension with a bounding pulse", "Tachycardia, tachypnea, and cool, clammy skin", "Decreased respiratory rate with warm, flushed extremities", "Marked increase in urine output"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "As blood volume drops, the sympathetic nervous system compensates by increasing heart rate (tachycardia) and constricting peripheral blood vessels (producing cool, clammy skin) to maintain perfusion to vital organs."
       },
       {
         q: "A patient is scheduled for an intravenous pyelogram (IVP). Which assessment is a priority before the procedure?",
         opts: ["Assessing for allergies to iodine or shellfish and checking renal function", "Measuring the patient's abdominal girth", "Determining the patient's blood type and crossmatch status", "Evaluating the patient's range of motion in the lower limbs"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "An IVP uses iodine-based contrast dye. The nurse must assess for allergies to iodine/contrast and verify renal function (BUN/creatinine) because contrast media is nephrotoxic."
       },
       {
         q: "A nurse is teaching a patient about a low-sodium diet. Which food choice indicates the patient understands the teaching?",
         opts: ["Canned soup and crackers", "Fresh chicken breast and steamed vegetables", "Deli ham and cheese sandwich", "Pickled vegetables and soy sauce"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Processed foods, canned soups, deli meats, and condiments (like soy sauce) are extremely high in sodium. Fresh meats and fresh/steamed vegetables are naturally low in sodium."
       },
       {
         q: "Which of the following is a classic clinical manifestation of a patient experiencing a thyroid storm (thyrotoxic crisis)?",
         opts: ["Severe hypothermia, bradycardia, and lethargy", "Hyperpyrexia (extreme fever), marked tachycardia, agitation, and delirium", "Marked hypotension with generalized muscle flaccidity", "Rapid weight gain with severe generalized edema"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Thyroid storm is a hypermetabolic emergency. Classic signs include severe hyperthermia (>104F), extreme tachycardia, cardiac arrhythmias, tremors, severe agitation, delirium, or coma."
       },
       {
         q: "A patient with chronic kidney disease (CKD) has a serum creatinine level of 6.2 mg/dL. The nurse understands that this finding represents:",
         opts: ["Normal renal clearance", "Mild renal insufficiency", "Severe reduction in glomerular filtration rate (GFR)", "Acute kidney injury with fluid retention"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Creatinine is a waste product excreted by the kidneys. An elevation of this level (normal is ~0.6 to 1.2 mg/dL) directly correlates with a significant decrease in nephron function and GFR."
       },
       {
         q: "Which of the following standard precautions is recommended when caring for a patient diagnosed with Pulmonary Tuberculosis?",
         opts: ["Standard precautions only", "Droplet precautions (surgical mask for staff)", "Airborne precautions (N95 respirator and negative-pressure room)", "Contact precautions (gown and gloves for all entries)"],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Tuberculosis is transmitted via tiny droplet nuclei that remain suspended in the air. Airborne precautions (N95 mask, private negative-airflow isolation room) are required."
       },
       {
         q: "What is the primary therapeutic effect of administering lactulose to a patient with advanced hepatic cirrhosis?",
         opts: ["To promote bowel movements to reduce abdominal ascites", "To bind with systemic ammonia and promote its excretion through stool", "To lower portal vein hypertension directly", "To provide carbohydrate energy to combat hepatic cachexia"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Lactulose is broken down in the colon into acids that draw ammonia (NH3) from the blood, converting it into ammonium (NH4+), which is trapped in the gut and excreted via laxative action."
       },
       {
         q: "A patient is diagnosed with systemic lupus erythematosus (SLE). The nurse should educate the patient on which key self-care measure?",
         opts: ["Increasing direct sun exposure to boost Vitamin D", "Avoiding ultraviolet (UV) light and using high-SPF sunscreen", "Adhering to a high-protein, zero-carbohydrate diet", "Engaging in high-impact aerobic exercises daily"],
         ans: 1,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Photosensitivity is a classic feature of SLE. Exposure to sunlight/UV radiation can trigger both cutaneous lesions and severe systemic disease flares."
       },
       {
         q: "Which of the following parameters is the most sensitive and reliable indicator of a patient's fluid volume status in an acute care setting?",
         opts: ["Daily body weights measured at the same time every morning", "Hourly monitoring of skin turgor", "Measuring intake and output records", "Assessing for peripheral edema"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Daily weight is the gold standard for tracking fluid shifts. One liter of fluid weighs exactly 1 kg (2.2 lbs). Intake/output records are often inaccurate and skin turgor is highly subjective."
       },
       {
         q: "During CPR, the nurse performs chest compressions on an adult patient. What is the recommended compression depth and rate according to AHA guidelines?",
         opts: ["At least 2 inches (5 cm) deep at a rate of 100 to 120 compressions per minute", "No more than 1.5 inches deep at a rate of 80 compressions per minute", "Exactly 3 inches deep at a rate of 140 compressions per minute", "At least 1 inch deep at a rate of 100 compressions per minute"],
         ans: 0,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "AHA guidelines recommend chest compressions of at least 2 inches (5 cm) but not exceeding 2.4 inches (6 cm) for adults, at a rate of 100 to 120 per minute, allowing complete chest recoil."
       },
       {
         q: "A nurse is caring for a patient with a permanent cardiac pacemaker. Which patient statement indicates a need for further discharge teaching?",
         opts: ["I will carry my pacemaker identification card with me at all times.", "I can safely stand directly in front of an active microwave oven.", "I can continue to undergo routine MRI scans whenever needed.", "I will monitor my pulse rate daily and report any significant changes."],
         ans: 2,
         source: "AIIMS NORCET 7 Prelims 2024",
         explain: "Most pacemakers are not MRI-safe or require specific reprogramming (MRI-conditional). Strong magnetic fields can disrupt, damage, or dislodge pacemaker components. Modern microwaves are safe to use."
       }
     ]
   }
 ]},
 { id: 'pharmacology', icon: '💊', name: 'Pharmacology', tests: [
  { id: 'pharma-basics', icon: '🧪', title: 'Drug Basics & Pharmacokinetics', desc: 'ADME, routes of administration, dose-response, drug interactions.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'pharma-antibiotics', icon: '🔬', title: 'Antibiotics & Antimicrobials', desc: 'Penicillins, cephalosporins, aminoglycosides, resistance.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'pharma-calculations', icon: '🔢', title: 'Drug Calculations', desc: 'Dosage calculations, IV drip rates, paediatric doses, unit conversions.', questions: 0, mins: 0, ready: false, data: [] }
 ]}
];

SUBJECTS.push(
  { id: 'pharmacist_science', icon: '💊', name: 'Pharmacist Sciences', tests: [
   { id: 'pharmaceutics-mastery', icon: '🧪', title: 'Pharmaceutics & Dispensing', desc: 'Dosage forms, tablet evaluation, liquid oral preparations, and sterile dispensing.', questions: 10, mins: 10, ready: true, data: [
      { q: "Which equation governs the rate of drug dissolution from a solid dosage form?", opts: ["Noyes-Whitney Equation", "Henderson-Hasselbalch Equation", "Arrhenius Equation", "Michaelis-Menten Equation"], ans: 0, source: "RRB Pharmacist 2019", explain: "The Noyes-Whitney equation describes the rate of dissolution (dC/dt = k*A*(Cs - C)) of solid particles in a liquid medium." },
      { q: "Which test is performed to measure the mechanical strength and resistance to chipping of compressed tablets?", opts: ["Disintegration Test", "Friability Test", "Dissolution Test", "Hardness Test"], ans: 1, source: "ESIC Pharmacist 2019", explain: "The Roche friabilator is used to evaluate friability (weight loss should be less than 1% after 100 rotations)." }
    ]}
  ]},
  { id: 'paramedical_ot', icon: '✂️', name: 'Paramedical & OT Tech', tests: [
   { id: 'ot-sterilization-drills', icon: '🧼', title: 'Sterilization & Surgical Protocols', desc: 'Autoclaving parameters, disinfection levels, and OR sterile field management.', questions: 10, mins: 10, ready: true, data: [
      { q: "What is the standard temperature and hold time required for steam sterilization in a gravity-displacement autoclave?", opts: ["121°C for 15-20 minutes at 15 psi", "160°C for 2 hours at 0 psi", "100°C for 30 minutes at 10 psi", "134°C for 3 minutes at 30 psi"], ans: 0, source: "AIIMS Paramedical 2023", explain: "Standard moist heat autoclaving requires saturated steam under pressure at 121°C (250°F) for 15-20 minutes at 15 psi." }
    ]}
  ]},
  { id: 'lab_tech_dmlt', icon: '🧪', name: 'Lab Technology (DMLT)', tests: [
   { id: 'hematology-biochem', icon: '🔬', title: 'Clinical Hematology & Biochemistry', desc: 'Complete Blood Count (CBC) interpretation, staining, and automated analyzer quality controls.', questions: 10, mins: 10, ready: true, data: [
      { q: "Which anticoagulant is used as the choice reagent for Complete Blood Count (CBC) and blood cell morphology?", opts: ["K2-EDTA", "Sodium Citrate (3.2%)", "Heparin", "Sodium Fluoride"], ans: 0, source: "DSSSB Lab Technician 2021", explain: "K2-EDTA chelates calcium ions and preserves blood cell morphology without altering cell size or staining characteristics." }
    ]}
  ]},
  { id: 'radiography_xray', icon: '📸', name: 'Radiography & X-Ray Tech', tests: [
   { id: 'radiation-physics', icon: '⚛️', title: 'Radiation Protection & Physics', desc: 'ALARA principles, lead apron shielding, inverse square law, and exposure factor calculations.', questions: 10, mins: 10, ready: true, data: [
      { q: "According to ALARA principles, which three fundamental parameters minimize occupational radiation dose?", opts: ["Time, Distance, Shielding", "Voltage, Amperage, Filtration", "Collimation, Grid, Exposure", "Density, Contrast, Detail"], ans: 0, source: "RRB Radiographer 2019", explain: "The three cardinal safety rules of radiation protection under ALARA are: minimize Time, maximize Distance, and use effective Shielding." }
    ]}
  ]}
);

export const PYQ_DATA: PyqCard[] = [
 { exam: 'WBHRB Staff Nurse Grade II', tag: 'wbhrb', year: '2026', count: 50, color: 'var(--red)' },
 { exam: 'WBHRB CHO', tag: 'wbhrb', year: '2025', count: 40, color: 'var(--red)' },
 { exam: 'AIIMS NORCET 7', tag: 'aiims', year: '2024', count: 80, color: 'var(--accent)' },
 { exam: 'AIIMS Nursing Officer', tag: 'aiims', year: '2019', count: 18, color: 'var(--accent)' },
 { exam: 'AIIMS Nursing Officer', tag: 'aiims', year: '2018', count: 24, color: 'var(--accent)' },
 { exam: 'RRB Staff Nurse', tag: 'rrb', year: '2019', count: 22, color: 'var(--green)' },
 { exam: 'RRB Staff Nurse', tag: 'rrb', year: '2015', count: 19, color: 'var(--green)' },
 { exam: 'ESIC Staff Nurse', tag: 'esic', year: '2019', count: 16, color: 'var(--purple)' },
 { exam: 'ESIC Staff Nurse', tag: 'esic', year: '2018', count: 14, color: 'var(--purple)' },
 { exam: 'DSSSB Staff Nurse', tag: 'dsssb', year: '2019', count: 20, color: 'var(--gold)' },
 { exam: 'DSSSB Staff Nurse', tag: 'dsssb', year: '2017', count: 18, color: 'var(--gold)' },
 { exam: 'RPSC Staff Nurse', tag: 'rpsc', year: '2019', count: 12, color: 'var(--red)' },
 { exam: 'JIPMER', tag: 'aiims', year: '2017', count: 15, color: 'var(--accent)' },
 { exam: 'BSF Staff Nurse', tag: 'esic', year: '2015', count: 11, color: 'var(--purple)' },
 { exam: 'IGNOU Post B.Sc Nursing', tag: 'rrb', year: '2019', count: 9, color: 'var(--green)' },

 // PHARMACIST PYQs
 { exam: 'RRB Pharmacist Grade III', tag: 'rrb-pharmacist', year: '2019', count: 35, color: '#10b981' },
 { exam: 'ESIC Pharmacist Paper', tag: 'esic-pharmacist', year: '2019', count: 30, color: '#06b6d4' },
 { exam: 'WBHRB Pharmacist', tag: 'wbhrb-pharmacist', year: '2021', count: 25, color: '#3b82f6' },
 { exam: 'Drug Inspector Officer', tag: 'drug-inspector', year: '2020', count: 20, color: '#a855f7' },

 // PARAMEDICAL & OT TECH PYQs
 { exam: 'AIIMS Surgical OT Tech', tag: 'ot-technician', year: '2022', count: 25, color: '#f59e0b' },
 { exam: 'RRB Ophthalmic Tech', tag: 'ophthalmic-assistant', year: '2019', count: 20, color: '#3b82f6' },
 { exam: 'ESIC Dialysis Tech', tag: 'dialysis-tech', year: '2020', count: 20, color: '#ef4444' },

 // LAB TECH PYQs
 { exam: 'AIIMS Lab Tech Grade II', tag: 'aiims-labtech', year: '2022', count: 30, color: '#8b5cf6' },
 { exam: 'RRB Lab Superintendent', tag: 'rrb-labtech', year: '2019', count: 25, color: '#f59e0b' },
 { exam: 'DMLT State Pathology', tag: 'dmlt-labtech', year: '2021', count: 30, color: '#10b981' },

 // RADIOGRAPHER PYQs
 { exam: 'RRB Radiographer & X-Ray', tag: 'radiographer-cbt', year: '2019', count: 30, color: '#06b6d4' },
 { exam: 'ESIC CT MRI Specialist', tag: 'ct-mri-tech', year: '2020', count: 20, color: '#6366f1' },

 // MEDICAL OFFICER PYQs
 { exam: 'NHM Medical Officer', tag: 'medical-officer-cho', year: '2022', count: 40, color: '#10b981' }
];

export const TARGET_EXAMS: ExamDef[] = [
  // NURSING EXAMS
  {
    id: "aiims-norcet",
    name: "AIIMS NORCET",
    fullName: "AIIMS NORCET Complete Course",
    badge: "HOT",
    category: "Nursing",
    desc: "Prepare for AIIMS Nursing Officer Recruitment Common Eligibility Test with full syllabus CBT mocks, clinical scenario drills & PYQs.",
    icon: "🏥",
    color: "#388bfd"
  },
  {
    id: "wbhrb-grade2",
    name: "WBHRB Staff Nurse",
    fullName: "WBHRB Staff Nurse Grade II Series",
    badge: "TRENDING",
    category: "Nursing",
    desc: "Targeted West Bengal Health Recruitment Board Grade II exam preparation with localized state syllabus and viva-voce practice.",
    icon: "🩺",
    color: "#10b981"
  },
  {
    id: "esic-officer",
    name: "ESIC Nursing Officer",
    fullName: "ESIC Nursing Officer Complete Package",
    badge: "HOT",
    category: "Nursing",
    desc: "Employees' State Insurance Corporation nursing officer mocks balancing clinical nursing subjects and general aptitude.",
    icon: "💊",
    color: "#8b5cf6"
  },
  {
    id: "rrb-officer",
    name: "RRB Staff Nurse",
    fullName: "RRB Staff Nurse Complete (CBT 1 + CBT 2)",
    badge: "POPULAR",
    category: "Nursing",
    desc: "Railway Recruitment Board nursing practice with arithmetic, general science, technical nursing, and speed drills.",
    icon: "🚆",
    color: "#f59e0b"
  },
  {
    id: "cho-recruitment",
    name: "CHO Recruitment",
    fullName: "CHO Community Health Officer Series",
    badge: "POPULAR",
    category: "Nursing",
    desc: "State NHM Community Health Officer exams covering maternal & child care, public health policies, and primary healthcare.",
    icon: "🏘️",
    color: "#ec4899"
  },
  {
    id: "dsssb-officer",
    name: "DSSSB Staff Nurse",
    fullName: "DSSSB Selection POST Complete Course",
    badge: "HOT",
    category: "Nursing",
    desc: "Delhi Subordinate Services Selection Board nursing officer prep papers following actual question weightage and timing.",
    icon: "🏛️",
    color: "#06b6d4"
  },
  {
    id: "sgpgi-jipmer",
    name: "SGPGI & JIPMER Nursing",
    fullName: "SGPGI & JIPMER Nursing Officer Exam",
    badge: "NEW",
    category: "Nursing",
    desc: "Sanjay Gandhi PGI and JIPMER Nursing Officer specialized question bank and high-intensity speed sprints.",
    icon: "💉",
    color: "#6366f1"
  },

  // PHARMACIST EXAMS
  {
    id: "rrb-pharmacist",
    name: "RRB Pharmacist",
    fullName: "RRB Pharmacist Grade III Complete Course",
    badge: "HOT",
    category: "Pharmacist",
    desc: "Complete CBT preparation for Railway Pharmacist exams including Pharmaceutics, Pharmacology, Pharmacognosy & Aptitude.",
    icon: "💊",
    color: "#10b981"
  },
  {
    id: "esic-pharmacist",
    name: "ESIC Pharmacist",
    fullName: "ESIC Pharmacist Recruitment Package",
    badge: "POPULAR",
    category: "Pharmacist",
    desc: "ESIC Pharmacist CBT mock test series covering hospital pharmacy, drug store management, and clinical jurisprudence.",
    icon: "🧪",
    color: "#06b6d4"
  },
  {
    id: "wbhrb-pharmacist",
    name: "WBHRB Pharmacist",
    fullName: "WBHRB Pharmacist Grade III Series",
    badge: "TRENDING",
    category: "Pharmacist",
    desc: "West Bengal Health Recruitment Board Pharmacist exams with state drug guidelines and pharmacy council practice.",
    icon: "🩺",
    color: "#3b82f6"
  },
  {
    id: "drug-inspector",
    name: "Drug Inspector Exam",
    fullName: "Drug Inspector Officer Complete Suite",
    badge: "GOVT POST",
    category: "Pharmacist",
    desc: "Central & State Drug Inspector Officer exam suite focusing on Drugs & Cosmetics Act, quality control, and analysis.",
    icon: "🔬",
    color: "#a855f7"
  },
  {
    id: "cghs-pharmacist",
    name: "CGHS Pharmacist",
    fullName: "CGHS & Central Govt Pharmacist Exam",
    badge: "NEW",
    category: "Pharmacist",
    desc: "Central Government Health Scheme Pharmacist mock test series for all central dispensary recruitment tests.",
    icon: "🏥",
    color: "#ec4899"
  },

  // PARAMEDICAL EXAMS
  {
    id: "ot-technician",
    name: "Surgical OT Tech",
    fullName: "Surgical OT Technician Complete Course",
    badge: "HOT",
    category: "Paramedical",
    desc: "Operation Theatre Assistant & Technician exam papers covering sterilization, surgical instruments, and anesthesia basics.",
    icon: "✂️",
    color: "#f59e0b"
  },
  {
    id: "ophthalmic-assistant",
    name: "Ophthalmic Assistant",
    fullName: "Ophthalmic Technician & Optometry Prep",
    badge: "POPULAR",
    category: "Paramedical",
    desc: "Eye care technician, refractionist, and ophthalmic assistant recruitment mocks for government health departments.",
    icon: "👁️",
    color: "#3b82f6"
  },
  {
    id: "dialysis-tech",
    name: "Dialysis Technician",
    fullName: "Dialysis Technician Specialist Series",
    badge: "NEW",
    category: "Paramedical",
    desc: "Renal care & hemodialysis technician exam preparation covering dialyzer operation, vascular access, and fluid management.",
    icon: "🩸",
    color: "#ef4444"
  },

  // LAB TECHNICIAN EXAMS
  {
    id: "dmlt-labtech",
    name: "DMLT Pathology Tech",
    fullName: "DMLT & Clinical Pathology Complete Prep",
    badge: "HOT",
    category: "Lab Tech",
    desc: "Comprehensive lab technician exam prep covering Hematology, Microbiology, Biochemistry, and Histopathology.",
    icon: "🧪",
    color: "#10b981"
  },
  {
    id: "aiims-labtech",
    name: "AIIMS Lab Technician",
    fullName: "AIIMS Lab Technician Grade II Course",
    badge: "POPULAR",
    category: "Lab Tech",
    desc: "AIIMS hospital laboratory technician CBT drills with clinical case studies and automated analyzer MCQs.",
    icon: "🔬",
    color: "#8b5cf6"
  },
  {
    id: "rrb-labtech",
    name: "RRB Pathology Assistant",
    fullName: "RRB Lab Superintendent & Technician",
    badge: "TRENDING",
    category: "Lab Tech",
    desc: "Railway recruitment board laboratory assistant exams with general science, technical pathology, and reasoning.",
    icon: "🚆",
    color: "#f59e0b"
  },

  // RADIOGRAPHER EXAMS
  {
    id: "radiographer-cbt",
    name: "Radiographer & X-Ray",
    fullName: "Radiographer & X-Ray Tech Complete Course",
    badge: "HOT",
    category: "Radiographer",
    desc: "Radiation physics, darkroom techniques, radiographic positioning, and safety procedures exam suite.",
    icon: "📸",
    color: "#06b6d4"
  },
  {
    id: "ct-mri-tech",
    name: "CT & MRI Specialist",
    fullName: "CT Scan & MRI Specialist Technician",
    badge: "NEW",
    category: "Radiographer",
    desc: "Advanced cross-sectional imaging, contrast media, and cross-sectional anatomy for senior diagnostic radiographers.",
    icon: "🦴",
    color: "#6366f1"
  },

  // MEDICAL OFFICER & GOVT
  {
    id: "medical-officer-cho",
    name: "Medical Officer (MO)",
    fullName: "Medical Officer & District Health Series",
    badge: "GOVT POST",
    category: "Medical Officer",
    desc: "State Health Dept & NHM Medical Officer exams covering clinical medicine, surgery, pediatrics, and preventive health.",
    icon: "👨‍⚕️",
    color: "#10b981"
  }
];

