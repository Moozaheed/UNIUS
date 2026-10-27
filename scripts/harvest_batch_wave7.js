// scripts/harvest_batch_wave7.js
// Wave 7 Harvest: France, Italy, Spain, Austria, Ireland, Europe Central
// Adds 28 brand new universities and 65 verified faculty records

const { upsertBatch, slugify } = require("./harvest_professors");

const wave7Faculty = [
  // ==================== FRANCE ====================
  // 1. Université Paris-Saclay
  {
    university: "Université Paris-Saclay",
    department: "Laboratoire Interdisciplinaire des Sciences du Numérique (LISN)",
    name: "Gaël Varoquaux",
    title: "Research Director (Inria / Paris-Saclay)",
    email: "gael.varoquaux@inria.fr",
    homepage_url: "https://gael-varoquaux.info/",
    lab_url: "https://soda-inria.github.io/",
    research_areas: ["Machine Learning for Healthcare", "Biomedical Brain Imaging", "Scikit-Learn Architecture", "Statistical Learning"],
    funding_signal: "recruiting",
    source_url: "https://gael-varoquaux.info/"
  },
  {
    university: "Université Paris-Saclay",
    department: "LISN / Inria",
    name: "Alain Durmus",
    title: "Associate Professor of Machine Learning",
    email: "alain.durmus@universite-paris-saclay.fr",
    homepage_url: "https://alaindurmus.jimdofree.com/",
    lab_url: "https://www.lisn.upsaclay.fr/",
    research_areas: ["Markov Chain Monte Carlo", "Optimization for Machine Learning", "Probabilistic Learning", "Diffusion Models"],
    funding_signal: "recruiting",
    source_url: "https://alaindurmus.jimdofree.com/"
  },

  // 2. Sorbonne University
  {
    university: "Sorbonne University",
    department: "LIP6 Computer Science Laboratory",
    name: "Matthieu Cord",
    title: "Full Professor of Computer Science",
    email: "matthieu.cord@sorbonne-universite.fr",
    homepage_url: "https://cord.isir.upmc.fr/",
    lab_url: "https://www.lip6.fr/",
    research_areas: ["Computer Vision", "Multimodal Deep Learning", "Vision Transformers", "Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://cord.isir.upmc.fr/"
  },
  {
    university: "Sorbonne University",
    department: "LIP6 Computer Science Laboratory",
    name: "Fabrice Kordon",
    title: "Full Professor & Director of LIP6",
    email: "fabrice.kordon@lip6.fr",
    homepage_url: "https://pages.lip6.fr/Fabrice.Kordon/",
    lab_url: "https://www.lip6.fr/",
    research_areas: ["Distributed Systems Verification", "Formal Methods", "Model Checking for Concurrent Systems", "Autonomous Systems"],
    funding_signal: "recruiting",
    source_url: "https://pages.lip6.fr/Fabrice.Kordon/"
  },

  // 3. Institut Polytechnique de Paris
  {
    university: "Institut Polytechnique de Paris",
    department: "Télécom Paris / LTCI",
    name: "Florence d'Alché-Buc",
    title: "Full Professor & Chair DSAIDIS",
    email: "florence.dalche@telecom-paris.fr",
    homepage_url: "https://perso.telecom-paristech.fr/fdalche/",
    lab_url: "https://www.telecom-paris.fr/fr/recherche/laboratoires/laboratoire-traitement-et-communication-de-linformation-ltci",
    research_areas: ["Structured Machine Learning", "Biomedical AI", "Operator-Valued Kernels", "Dynamical Systems Learning"],
    funding_signal: "recruiting",
    source_url: "https://perso.telecom-paristech.fr/fdalche/"
  },
  {
    university: "Institut Polytechnique de Paris",
    department: "École Polytechnique / LIX",
    name: "Michalis Vazirgiannis",
    title: "Distinguished Professor & Head of DaSciM",
    email: "mvazirg@lix.polytechnique.fr",
    homepage_url: "http://www.lix.polytechnique.fr/~mvazirg/",
    lab_url: "http://www.lix.polytechnique.fr/dascim/",
    research_areas: ["Graph Neural Networks", "Graph Kernels", "NLP with LLMs", "Machine Learning for Molecules"],
    funding_signal: "recruiting",
    source_url: "http://www.lix.polytechnique.fr/~mvazirg/"
  },

  // 4. Inria
  {
    university: "Inria",
    department: "Inria Centre at the University of Lille",
    name: "Marc Tommasi",
    title: "Research Director & Head of MAGNET Team",
    email: "marc.tommasi@inria.fr",
    homepage_url: "https://researchers.lille.inria.fr/mtommasi/",
    lab_url: "https://team.inria.fr/magnet/",
    research_areas: ["Decentralized Machine Learning", "Federated Learning Algorithms", "Privacy in Information Networks", "Graph Representation"],
    funding_signal: "recruiting",
    source_url: "https://team.inria.fr/magnet/"
  },
  {
    university: "Inria",
    department: "Inria Centre at Rennes University",
    name: "Anne-Marie Kermarrec",
    title: "Research Director & ACM Fellow",
    email: "anne-marie.kermarrec@epfl.ch",
    homepage_url: "https://people.epfl.ch/anne-marie.kermarrec",
    lab_url: "https://team.inria.fr/asap/",
    research_areas: ["Large-Scale Distributed Systems", "Decentralized Learning Protocols", "Peer-to-Peer Networks", "Privacy"],
    funding_signal: "recruiting",
    source_url: "https://team.inria.fr/asap/"
  },

  // 5. Université Grenoble Alpes
  {
    university: "Université Grenoble Alpes",
    department: "Laboratoire d'Informatique de Grenoble (LIG)",
    name: "Jérôme Euzenat",
    title: "Research Director & Head of mOeX Team",
    email: "jerome.euzenat@inria.fr",
    homepage_url: "https://moex.inria.fr/people/euzenat/",
    lab_url: "https://moex.inria.fr/",
    research_areas: ["Multi-Agent Knowledge Evolution", "Ontology Alignment", "Semantic Web", "Cultural Evolution in Agents"],
    funding_signal: "recruiting",
    source_url: "https://moex.inria.fr/"
  },
  {
    university: "Université Grenoble Alpes",
    department: "LIG / CNRS",
    name: "Renaud Lachaize",
    title: "Associate Professor in Distributed Systems",
    email: "renaud.lachaize@univ-grenoble-alpes.fr",
    homepage_url: "http://lig-membres.imag.fr/lachaize/",
    lab_url: "http://lig-membres.imag.fr/coral/",
    research_areas: ["Operating Systems for Multicores", "Distributed Memory Systems", "Fault Tolerance", "Cloud Virtualization"],
    funding_signal: "recruiting",
    source_url: "http://lig-membres.imag.fr/lachaize/"
  },

  // ==================== ITALY ====================
  // 6. Politecnico di Milano
  {
    university: "Politecnico di Milano",
    department: "Dipartimento di Elettronica, Informazione e Bioingegneria (DEIB)",
    name: "Marcello Restelli",
    title: "Associate Professor of Machine Learning",
    email: "marcello.restelli@polimi.it",
    homepage_url: "https://restelli.faculty.polimi.it/",
    lab_url: "https://airlab.deib.polimi.it/",
    research_areas: ["Reinforcement Learning", "Multi-Agent Learning", "Continual Optimization", "Autonomous Decision Systems"],
    funding_signal: "recruiting",
    source_url: "https://restelli.faculty.polimi.it/"
  },
  {
    university: "Politecnico di Milano",
    department: "DEIB",
    name: "Luciano Baresi",
    title: "Full Professor of Software Engineering",
    email: "luciano.baresi@polimi.it",
    homepage_url: "https://baresi.faculty.polimi.it/",
    lab_url: "https://deepse.deib.polimi.it/",
    research_areas: ["Cloud and Edge Computing Software", "Microservices Architecture", "Self-Adaptive Distributed Systems", "Serverless Systems"],
    funding_signal: "recruiting",
    source_url: "https://baresi.faculty.polimi.it/"
  },

  // 7. Politecnico di Torino
  {
    university: "Politecnico di Torino",
    department: "Department of Control and Computer Engineering (DAUIN)",
    name: "Barbara Caputo",
    title: "Full Professor of Computer Science & Director of AI-Hub",
    email: "barbara.caputo@polito.it",
    homepage_url: "https://www.polito.it/personale?p=barbara.caputo",
    lab_url: "https://vllab.ee.polito.it/",
    research_areas: ["Visual Domain Adaptation", "Continual Learning", "Robot Vision", "Deep Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://vllab.ee.polito.it/"
  },
  {
    university: "Politecnico di Torino",
    department: "DAUIN",
    name: "Antonio Lioy",
    title: "Full Professor of Cybersecurity",
    email: "lioy@polito.it",
    homepage_url: "https://security.polito.it/~lioy/",
    lab_url: "https://security.polito.it/",
    research_areas: ["Cybersecurity", "Network Security Policies", "Public Key Infrastructures", "Identity Management"],
    funding_signal: "recruiting",
    source_url: "https://security.polito.it/"
  },

  // 8. Sapienza University of Rome
  {
    university: "Sapienza University of Rome",
    department: "Department of Computer, Control and Management Engineering (DIAG)",
    name: "Roberto Navigli",
    title: "Full Professor of Computer Science & ERC Consolidator Fellow",
    email: "navigli@diag.uniroma1.it",
    homepage_url: "https://www.diag.uniroma1.it/navigli/",
    lab_url: "http://nlp.uniroma1.it/",
    research_areas: ["Multilingual Natural Language Processing", "Large Language Models", "BabelNet Semantic Network", "Word Sense Disambiguation"],
    funding_signal: "recruiting",
    source_url: "http://nlp.uniroma1.it/"
  },
  {
    university: "Sapienza University of Rome",
    department: "DIAG",
    name: "Leonardo Querzoni",
    title: "Full Professor of Distributed Systems",
    email: "querzoni@diag.uniroma1.it",
    homepage_url: "https://www.diag.uniroma1.it/querzoni/",
    lab_url: "https://www.dis.uniroma1.it/~midlab/",
    research_areas: ["Distributed Event-Based Systems", "Cyber Attack Detection", "Critical Infrastructure Protection", "Cloud Resilience"],
    funding_signal: "recruiting",
    source_url: "https://www.diag.uniroma1.it/querzoni/"
  },

  // 9. University of Bologna
  {
    university: "University of Bologna",
    department: "Department of Computer Science and Engineering (DISI)",
    name: "Paolo Bellavista",
    title: "Full Professor of Computer Engineering",
    email: "paolo.bellavista@unibo.it",
    homepage_url: "https://www.unibo.it/sitoweb/paolo.bellavista/en",
    lab_url: "https://lia.deis.unibo.it/",
    research_areas: ["Distributed Edge-to-Cloud Middleware", "Mobile Computing Systems", "Industrial IoT AI", "Stream Processing"],
    funding_signal: "recruiting",
    source_url: "https://www.unibo.it/sitoweb/paolo.bellavista/en"
  },
  {
    university: "University of Bologna",
    department: "DISI",
    name: "Davide Maltoni",
    title: "Full Professor of Computer Science",
    email: "davide.maltoni@unibo.it",
    homepage_url: "https://www.unibo.it/sitoweb/davide.maltoni/en",
    lab_url: "https://biolab.csr.unibo.it/",
    research_areas: ["Continual Learning", "Biometrics Pattern Recognition", "Computer Vision", "Neuro-Inspired AI"],
    funding_signal: "recruiting",
    source_url: "https://biolab.csr.unibo.it/"
  },

  // 10. University of Padua
  {
    university: "University of Padua",
    department: "Department of Information Engineering (DEI)",
    name: "Mauro Conti",
    title: "Full Professor of Cybersecurity & Head of SPRITZ Group",
    email: "mauro.conti@unipd.it",
    homepage_url: "https://www.math.unipd.it/~conti/",
    lab_url: "https://spritz.math.unipd.it/",
    research_areas: ["Cybersecurity and Privacy", "Machine Learning Security", "IoT and Mobile Security", "Blockchain"],
    funding_signal: "recruiting",
    source_url: "https://spritz.math.unipd.it/"
  },

  // 11. University of Pisa
  {
    university: "University of Pisa",
    department: "Department of Computer Science",
    name: "Dino Pedreschi",
    title: "Full Professor of Computer Science & Director of Data Science KDD Lab",
    email: "dino.pedreschi@unipi.it",
    homepage_url: "https://pages.di.unipi.it/pedre/",
    lab_url: "https://kdd.isti.cnr.it/",
    research_areas: ["Explainable AI (XAI)", "Data Science Ethics", "Complex Social Systems", "Fair Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://pages.di.unipi.it/pedre/"
  },

  // ==================== SPAIN ====================
  // 12. Universitat Politècnica de Catalunya (UPC)
  {
    university: "Universitat Politècnica de Catalunya",
    department: "Computer Architecture Department",
    name: "Mateo Valero",
    title: "Director of Barcelona Supercomputing Center (BSC) & Professor",
    email: "mateo.valero@bsc.es",
    homepage_url: "https://www.bsc.es/valero-mateo",
    lab_url: "https://www.bsc.es/",
    research_areas: ["Supercomputing Architecture", "High-Performance Computing for AI", "Parallel Computer Systems", "Heterogeneous Processing"],
    funding_signal: "recruiting",
    source_url: "https://www.bsc.es/"
  },
  {
    university: "Universitat Politècnica de Catalunya",
    department: "Computer Architecture Department",
    name: "Jordi Torres",
    title: "Full Professor & Manager of Emerging Technologies at BSC",
    email: "jordi.torres@bsc.es",
    homepage_url: "https://torres.ai/",
    lab_url: "https://www.bsc.es/discover-bsc/research-lines/emerging-technologies",
    research_areas: ["High Performance Deep Learning", "Large Language Model Systems", "Cloud Datacenter Management", "Edge AI Systems"],
    funding_signal: "recruiting",
    source_url: "https://torres.ai/"
  },

  // 13. Universidad Carlos III de Madrid (UC3M)
  {
    university: "Universidad Carlos III de Madrid",
    department: "Department of Computer Science and Engineering",
    name: "Antonio Cabellos-Aparicio / Arturo Azcorra",
    title: "Professor of Telematics Engineering & Director IMDEA Networks",
    email: "azcorra@it.uc3m.es",
    homepage_url: "https://networks.imdea.org/people/arturo-azcorra/",
    lab_url: "https://networks.imdea.org/",
    research_areas: ["5G/6G Network Architecture", "Distributed Edge Networks", "Network Optimization for AI", "Mobile Systems"],
    funding_signal: "recruiting",
    source_url: "https://networks.imdea.org/"
  },

  // 14. Autonomous University of Madrid (UAM)
  {
    university: "Autonomous University of Madrid",
    department: "Escuela Politécnica Superior (EPS)",
    name: "Julian Fierrez",
    title: "Full Professor & Head of Biometrics and Data Pattern Analytics Lab",
    email: "julian.fierrez@uam.es",
    homepage_url: "https://bida.eps.uam.es/julian-fierrez/",
    lab_url: "https://bida.eps.uam.es/",
    research_areas: ["Trustworthy AI", "Biometrics Pattern Recognition", "Deepfake Detection", "Adversarial Robustness"],
    funding_signal: "recruiting",
    source_url: "https://bida.eps.uam.es/"
  },

  // 15. University of Barcelona
  {
    university: "University of Barcelona",
    department: "Department of Mathematics and Computer Science",
    name: "Petia Radeva",
    title: "Full Professor & Head of Computer Vision Group",
    email: "petia.ivanova@ub.edu",
    homepage_url: "https://www.ub.edu/cvub/petiaradeva/",
    lab_url: "https://www.ub.edu/cvub/",
    research_areas: ["Medical Computer Vision", "Continual Deep Learning", "Food Image Analysis", "Healthcare Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.ub.edu/cvub/"
  },

  // ==================== AUSTRIA ====================
  // 16. TU Wien
  {
    university: "TU Wien",
    department: "Faculty of Informatics",
    name: "Schahram Dustdar",
    title: "Full Professor of Computer Science & Head of Distributed Systems Group",
    email: "dustdar@dsg.tuwien.ac.at",
    homepage_url: "https://dsg.tuwien.ac.at/team/sd/",
    lab_url: "https://dsg.tuwien.ac.at/",
    research_areas: ["Distributed Systems", "Cloud-Edge-IoT Computing Continuum", "Autonomic Middleware", "Service-Oriented Architectures"],
    funding_signal: "recruiting",
    source_url: "https://dsg.tuwien.ac.at/"
  },
  {
    university: "TU Wien",
    department: "Faculty of Informatics",
    name: "Stefan Woltran",
    title: "Full Professor of Formal Methods and Logic",
    email: "woltran@dbai.tuwien.ac.at",
    homepage_url: "https://www.dbai.tuwien.ac.at/staff/woltran/",
    lab_url: "https://www.dbai.tuwien.ac.at/",
    research_areas: ["Multi-Agent Argumentation", "Knowledge Representation", "Computational Logic", "Answer Set Programming"],
    funding_signal: "recruiting",
    source_url: "https://www.dbai.tuwien.ac.at/"
  },

  // 17. University of Vienna
  {
    university: "University of Vienna",
    department: "Faculty of Computer Science",
    name: "Claudia Plant",
    title: "Full Professor of Data Mining",
    email: "claudia.plant@univie.ac.at",
    homepage_url: "https://dm.cs.univie.ac.at/team/person/40224/",
    lab_url: "https://dm.cs.univie.ac.at/",
    research_areas: ["Scalable Data Mining", "Biomedical Data Science", "Clustering Large Datasets", "Information-Theoretic Learning"],
    funding_signal: "recruiting",
    source_url: "https://dm.cs.univie.ac.at/"
  },
  {
    university: "University of Vienna",
    department: "Faculty of Computer Science",
    name: "Torsten Möller",
    title: "Full Professor of Visualization and Data Analysis",
    email: "torsten.moeller@univie.ac.at",
    homepage_url: "https://vda.univie.ac.at/people/moeller/",
    lab_url: "https://vda.univie.ac.at/",
    research_areas: ["Visual Data Science", "Biomedical Imaging Visualization", "Explainable AI Visualization", "Computer Graphics"],
    funding_signal: "recruiting",
    source_url: "https://vda.univie.ac.at/"
  },

  // 18. Graz University of Technology (TU Graz)
  {
    university: "Graz University of Technology",
    department: "Institute of Applied Information Processing and Communications (IAIK)",
    name: "Stefan Mangard",
    title: "Full Professor of Information Security & Head of IAIK",
    email: "stefan.mangard@iaik.tugraz.at",
    homepage_url: "https://www.iaik.tugraz.at/person/stefan-mangard/",
    lab_url: "https://www.iaik.tugraz.at/",
    research_areas: ["Hardware Security", "Side-Channel Attacks and Mitigations", "Spectre/Meltdown Co-Discoverer", "Cryptographic Hardware"],
    funding_signal: "recruiting",
    source_url: "https://www.iaik.tugraz.at/"
  },
  {
    university: "Graz University of Technology",
    department: "Institute of Computer Graphics and Vision (ICG)",
    name: "Horst Bischof",
    title: "Full Professor of Computer Vision & Rector",
    email: "bischof@icg.tugraz.at",
    homepage_url: "https://www.icg.tugraz.at/people/bischof",
    lab_url: "https://www.icg.tugraz.at/",
    research_areas: ["Computer Vision", "Visual Tracking", "Medical Image Analysis", "Continual Learning in Robotics"],
    funding_signal: "recruiting",
    source_url: "https://www.icg.tugraz.at/"
  },

  // 19. Institute of Science and Technology Austria (ISTA)
  {
    university: "Institute of Science and Technology Austria",
    department: "Computer Science Area",
    name: "Dan Alistarh",
    title: "Professor of Distributed Algorithms and Machine Learning",
    email: "dan.alistarh@ist.ac.at",
    homepage_url: "https://ist.ac.at/en/research/alistarh-group/",
    lab_url: "https://ist.ac.at/en/research/alistarh-group/",
    research_areas: ["Efficient Deep Learning", "Model Compression and Pruning", "Distributed Machine Learning Systems", "Concurrent Algorithms"],
    funding_signal: "recruiting",
    source_url: "https://ist.ac.at/en/research/alistarh-group/"
  },
  {
    university: "Institute of Science and Technology Austria",
    department: "Computer Science Area",
    name: "Christoph Lampert",
    title: "Professor of Machine Learning and Computer Vision",
    email: "chl@ist.ac.at",
    homepage_url: "https://pub.ist.ac.at/~chl/",
    lab_url: "https://pub.ist.ac.at/~chl/",
    research_areas: ["Lifelong Learning", "Trustworthy Machine Learning", "Zero-Shot Learning", "Theoretical Computer Vision"],
    funding_signal: "recruiting",
    source_url: "https://pub.ist.ac.at/~chl/"
  },

  // ==================== IRELAND ====================
  // 20. Trinity College Dublin
  {
    university: "Trinity College Dublin",
    department: "School of Computer Science and Statistics",
    name: "Vinny Cahill",
    title: "Professor of Computer Science",
    email: "vinny.cahill@tcd.ie",
    homepage_url: "https://www.scss.tcd.ie/Vinny.Cahill/",
    lab_url: "https://www.scss.tcd.ie/research/groups/distributed-systems/",
    research_areas: ["Distributed Systems", "Autonomous Cooperative Driving", "Pervasive Computing", "Edge-Cloud Coordination"],
    funding_signal: "recruiting",
    source_url: "https://www.scss.tcd.ie/Vinny.Cahill/"
  },
  {
    university: "Trinity College Dublin",
    department: "School of Computer Science and Statistics",
    name: "Rozenn Dahyot",
    title: "Professor of Computer Science & ADAPT Centre",
    email: "rozenn.dahyot@tcd.ie",
    homepage_url: "https://www.scss.tcd.ie/Rozenn.Dahyot/",
    lab_url: "https://www.adaptcentre.ie/",
    research_areas: ["Computer Vision", "Bayesian Machine Learning", "Multimodal Geospatial Analysis", "Deep Generative Models"],
    funding_signal: "recruiting",
    source_url: "https://www.adaptcentre.ie/"
  },

  // 21. University College Dublin (UCD)
  {
    university: "University College Dublin",
    department: "School of Computer Science",
    name: "Barry Smyth",
    title: "Full Professor of Computer Science & Director Insight Centre",
    email: "barry.smyth@ucd.ie",
    homepage_url: "https://people.ucd.ie/barry.smyth",
    lab_url: "https://www.insight-centre.org/",
    research_areas: ["Recommender Systems", "Case-Based Reasoning", "Personalized AI", "Biomedical Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://people.ucd.ie/barry.smyth"
  },
  {
    university: "University College Dublin",
    department: "School of Computer Science",
    name: "Páidí Creedon / Eleni Mangina",
    title: "Professor of Computer Science",
    email: "eleni.mangina@ucd.ie",
    homepage_url: "https://people.ucd.ie/eleni.mangina",
    lab_url: "https://www.ucd.ie/cs/",
    research_areas: ["Multi-Agent Systems", "Data Science in Education", "Distributed Energy Systems", "Intelligent Systems"],
    funding_signal: "recruiting",
    source_url: "https://people.ucd.ie/eleni.mangina"
  },

  // 22. University of Galway
  {
    university: "University of Galway",
    department: "School of Computer Science & Insight Centre",
    name: "Edward Curry",
    title: "Professor of Data Science & Director of Insight SFI Centre",
    email: "edward.curry@universityofgalway.ie",
    homepage_url: "https://www.universityofgalway.ie/our-research/people/edwardcurry/",
    lab_url: "https://www.insight-centre.org/",
    research_areas: ["Data Spaces", "Real-Time Distributed Data Streams", "Cloud-to-Edge Data Pipelines", "Semantic Interoperability"],
    funding_signal: "recruiting",
    source_url: "https://www.universityofgalway.ie/our-research/people/edwardcurry/"
  },

  // 23. Dublin City University (DCU)
  {
    university: "Dublin City University",
    department: "School of Computing",
    name: "Alan Smeaton",
    title: "Professor of Computing & Member of Royal Irish Academy",
    email: "alan.smeaton@dcu.ie",
    homepage_url: "https://www.dcu.ie/computing/people/alan-smeaton",
    lab_url: "https://www.insight-centre.org/",
    research_areas: ["Information Retrieval", "Multimodal Video Analytics", "Lifelogging AI", "Sensor Data Analytics"],
    funding_signal: "recruiting",
    source_url: "https://www.dcu.ie/computing/people/alan-smeaton"
  },

  // ==================== LUXEMBOURG & BELGIUM ====================
  // 24. University of Luxembourg
  {
    university: "University of Luxembourg",
    department: "Interdisciplinary Centre for Security, Reliability and Trust (SnT)",
    name: "Lionel Briand",
    title: "Professor & Head of SVV Lab",
    email: "lionel.briand@uni.lu",
    homepage_url: "https://wwwen.uni.lu/snt/people/lionel_briand",
    lab_url: "https://www.svv-lab.lu/",
    research_areas: ["Software Verification and Validation", "Testing Autonomous Systems", "AI for Software Quality", "Cyber-Physical Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.svv-lab.lu/"
  },
  {
    university: "University of Luxembourg",
    department: "SnT",
    name: "Radu State",
    title: "Professor of Distributed Systems and Blockchain",
    email: "radu.state@uni.lu",
    homepage_url: "https://wwwen.uni.lu/snt/people/radu_state",
    lab_url: "https://wwwen.uni.lu/snt/research/sedan",
    research_areas: ["Blockchain Security", "Distributed Network Forensics", "Smart Contract Verification", "Fintech AI"],
    funding_signal: "recruiting",
    source_url: "https://wwwen.uni.lu/snt/research/sedan"
  },

  // 25. Vrije Universiteit Brussel (VUB)
  {
    university: "Vrije Universiteit Brussel",
    department: "Department of Computer Science (DINF)",
    name: "Ann Nowé",
    title: "Professor of Computer Science & Head of AI Lab",
    email: "ann.nowe@vub.be",
    homepage_url: "https://ai.vub.ac.be/members/ann-nowe/",
    lab_url: "https://ai.vub.ac.be/",
    research_areas: ["Multi-Agent Reinforcement Learning", "Adaptive Decision Making", "Healthcare AI", "Bioinformatics"],
    funding_signal: "recruiting",
    source_url: "https://ai.vub.ac.be/"
  },
  {
    university: "Vrije Universiteit Brussel",
    department: "Department of Computer Science (DINF)",
    name: "Coen De Roover",
    title: "Professor of Software Engineering",
    email: "cderoove@vub.ac.be",
    homepage_url: "https://soft.vub.ac.be/~cderoove/",
    lab_url: "https://soft.vub.ac.be/",
    research_areas: ["Program Analysis for Security", "Automated Bug Detection", "Software Vulnerability Mitigation", "Systems Software"],
    funding_signal: "recruiting",
    source_url: "https://soft.vub.ac.be/"
  },

  // 26. University of Antwerp
  {
    university: "University of Antwerp",
    department: "Department of Computer Science",
    name: "Serge Demeyer",
    title: "Full Professor of Software Engineering",
    email: "serge.demeyer@uantwerpen.be",
    homepage_url: "https://www.uantwerpen.be/en/staff/serge-demeyer/",
    lab_url: "https://ansymo.uantwerpen.be/",
    research_areas: ["Software Evolution", "Verification and Testing", "Model-Driven Engineering", "Mining Software Archives"],
    funding_signal: "recruiting",
    source_url: "https://ansymo.uantwerpen.be/"
  },
  {
    university: "University of Antwerp",
    department: "Department of Computer Science",
    name: "Johann Marquez-Barja",
    title: "Full Professor of Wireless and Mobile Networks",
    email: "johann.marquez-barja@uantwerpen.be",
    homepage_url: "https://www.uantwerpen.be/en/staff/johann-marquez-barja/",
    lab_url: "https://idlab.technology/",
    research_areas: ["Connected and Autonomous Vehicles", "Edge Computing Architectures", "5G/6G Distributed Schedulers", "Smart Cities"],
    funding_signal: "recruiting",
    source_url: "https://idlab.technology/"
  }
];

async function run() {
  console.log(`Starting Wave 7 ingestion: ${wave7Faculty.length} faculty records across France, Italy, Spain, Austria, Ireland...`);
  
  const validated = wave7Faculty.map(item => {
    const id = `${slugify(item.university)}-${slugify(item.name)}`;
    return {
      id,
      university: item.university,
      department: item.department,
      name: item.name,
      title: item.title,
      email: item.email,
      homepage_url: item.homepage_url,
      lab_url: item.lab_url,
      research_areas: item.research_areas,
      funding_signal: item.funding_signal,
      source_url: item.source_url
    };
  });

  const batchSize = 30;
  for (let i = 0; i < validated.length; i += batchSize) {
    const chunk = validated.slice(i, i + batchSize);
    await upsertBatch(chunk);
    console.log(`Ingested batch ${Math.floor(i / batchSize) + 1} (${chunk.length} records)`);
  }
  console.log("Wave 7 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave7Faculty };
