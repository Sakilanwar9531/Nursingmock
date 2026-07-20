import { Subject, PyqCard } from "./types";
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
  { id: 'fun-vitals', icon: '🌡️', title: 'Vital Signs & Assessment', desc: 'Temperature, pulse, respiration, BP — measurement, normal values.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'fun-infection', icon: '🦠', title: 'Infection Control', desc: 'Asepsis, sterilization, disinfection, PPE, standard precautions.', questions: 0, mins: 0, ready: false, data: [] },
  { id: 'fun-procedures', icon: '🩺', title: 'Nursing Procedures', desc: 'IV therapy, wound care, catheterization, NG tube, oxygen therapy.', questions: 0, mins: 0, ready: false, data: [] },
   {
     id: 'norcet-7-2024',
     icon: '📋',
     title: 'AIIMS NORCET 7 Prelims 2024',
     desc: 'Official memory-based high-yield question paper from the AIIMS NORCET 7 Prelims exam held in 2024.',
     questions: 20,
     mins: 20,
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

export const PYQ_DATA: PyqCard[] = [
 { exam: 'AIIMS NORCET 7', tag: 'aiims', year: '2024', count: 20, color: 'var(--accent)' },
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
 { exam: 'IGNOU Post B.Sc Nursing', tag: 'rrb', year: '2019', count: 9, color: 'var(--green)' }
];
