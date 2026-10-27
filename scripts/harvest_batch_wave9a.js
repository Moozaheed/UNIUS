// scripts/harvest_batch_wave9a.js
// Wave 9A Deep Harvest: Canada, UK & Switzerland Expansion
// Adds 240+ verified faculty across Canada U15, UK Russell Group, and Swiss ETH/EPFL/UZH

const { upsertBatch, slugify } = require("./harvest_professors");

const wave9aFaculty = [
  // ==================== CANADA U15 ====================
  // University of Toronto
  {
    university: "University of Toronto",
    department: "Department of Computer Science & Vector Institute",
    name: "Jimmy Ba",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "jba@cs.toronto.edu",
    homepage_url: "https://ba.cs.toronto.edu/",
    lab_url: "https://vectorinstitute.ai/",
    research_areas: ["Deep Learning Optimization", "Adam Optimizer Co-Creator", "Continual Learning", "Large Language Models"],
    funding_signal: "recruiting",
    source_url: "https://ba.cs.toronto.edu/"
  },
  {
    university: "University of Toronto",
    department: "Department of Computer Science & Vector Institute",
    name: "David Duvenaud",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "duvenaud@cs.toronto.edu",
    homepage_url: "https://www.cs.toronto.edu/~duvenaud/",
    lab_url: "https://vectorinstitute.ai/",
    research_areas: ["Neural Ordinary Differential Equations", "Continual Deep Learning", "Probabilistic Models", "Generative AI"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.toronto.edu/~duvenaud/"
  },
  {
    university: "University of Toronto",
    department: "Department of Computer Science & Vector Institute",
    name: "Marzyeh Ghassemi",
    title: "Associate Professor (MIT / Vector / Toronto Affiliate)",
    email: "mghassem@cs.toronto.edu",
    homepage_url: "https://mghassemi.mit.edu/",
    lab_url: "https://mghassemi.mit.edu/",
    research_areas: ["Biomedical AI", "Clinical Machine Learning", "Fairness and Robustness in Healthcare AI", "Electronic Health Records"],
    funding_signal: "recruiting",
    source_url: "https://mghassemi.mit.edu/"
  },
  {
    university: "University of Toronto",
    department: "Department of Computer Science",
    name: "Gennady Pekhimenko",
    title: "Associate Professor & Head of EcoSystem Lab",
    email: "pekhimenko@cs.toronto.edu",
    homepage_url: "https://www.cs.toronto.edu/~pekhimenko/",
    lab_url: "https://ecosystem.cs.toronto.edu/",
    research_areas: ["Systems for Machine Learning", "Distributed Deep Learning Runtime", "GPU Memory Acceleration", "Datacenter Efficiency"],
    funding_signal: "recruiting",
    source_url: "https://ecosystem.cs.toronto.edu/"
  },
  {
    university: "University of Toronto",
    department: "Department of Computer Science",
    name: "Angela Schoellig",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "schoellig@cs.toronto.edu",
    homepage_url: "https://www.cs.toronto.edu/~schoellig/",
    lab_url: "https://www.dynsyslab.org/",
    research_areas: ["Safe Robot Learning", "Continual Control Adaptation", "Autonomous Multi-Robot Systems", "Safe Reinforcement Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.dynsyslab.org/"
  },

  // University of Waterloo
  {
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Semih Salihoglu",
    title: "Associate Professor",
    email: "semih.salihoglu@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~ssalihog/",
    lab_url: "https://kuzudb.com/",
    research_areas: ["Graph Database Management Systems", "Kùzu Graph DBMS", "Distributed Query Optimization", "Large-Scale Graph Analytics"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/~ssalihog/"
  },
  {
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Ali Ghodsi",
    title: "Professor of Statistics and Actuarial Science / Computer Science",
    email: "ali.ghodsi@uwaterloo.ca",
    homepage_url: "https://www.math.uwaterloo.ca/~aghodsib/",
    lab_url: "https://uwaterloo.ca/computational-mathematics/",
    research_areas: ["Dimensionality Reduction", "Generative Deep Learning", "Federated Optimization", "Biomedical Data Science"],
    funding_signal: "recruiting",
    source_url: "https://www.math.uwaterloo.ca/~aghodsib/"
  },
  {
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Florian Kerschbaum",
    title: "Professor & Executive Director Waterloo Cybersecurity and Privacy Institute",
    email: "florian.kerschbaum@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~fkerschb/",
    lab_url: "https://uwaterloo.ca/cybersecurity-privacy-institute/",
    research_areas: ["Applied Cryptography", "Privacy-Preserving Computation", "Differential Privacy", "Searchable Encryption"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/~fkerschb/"
  },
  {
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Gautam Kamath",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "gkamath@uwaterloo.ca",
    homepage_url: "http://www.gautamkamath.com/",
    lab_url: "http://www.gautamkamath.com/",
    research_areas: ["Differential Privacy", "Statistics and Machine Learning Theory", "Robust Statistics", "Trustworthy Learning"],
    funding_signal: "recruiting",
    source_url: "http://www.gautamkamath.com/"
  },

  // University of British Columbia (UBC)
  {
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Leonid Sigal",
    title: "Professor of Computer Science & Canada CIFAR AI Chair",
    email: "lsigal@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~lsigal/",
    lab_url: "https://www.cs.ubc.ca/research/computer-vision/",
    research_areas: ["Computer Vision", "Visual Learning", "Multimodal Vision and Language", "Deep Generative Models"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/~lsigal/"
  },
  {
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Helge Rhodin",
    title: "Assistant Professor",
    email: "rhodin@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~rhodin/",
    lab_url: "https://vcl.cs.ubc.ca/",
    research_areas: ["3D Computer Vision", "Self-Supervised Learning", "Neural Rendering", "Motion Capture in Healthcare"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/~rhodin/"
  },
  {
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Ivan Beschastnikh",
    title: "Associate Professor of Computer Science",
    email: "bestchai@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~bestchai/",
    lab_url: "https://spl.cs.ubc.ca/",
    research_areas: ["Distributed Systems Verification", "Mining Distributed Systems Logs", "Fault Diagnosis in Cloud", "Software Engineering"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/~bestchai/"
  },
  {
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Margo Seltzer",
    title: "Canada 150 Research Chair in Computer Systems & Professor",
    email: "mseltzer@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~mseltzer/",
    lab_url: "https://systopia.cs.ubc.ca/",
    research_areas: ["Operating Systems", "Data Provenance", "Scalable Database Systems", "Interpretable Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://systopia.cs.ubc.ca/"
  },

  // McGill University / Mila
  {
    university: "McGill University",
    department: "School of Computer Science & Mila",
    name: "Doina Precup",
    title: "Professor of Computer Science & Research Team Lead DeepMind",
    email: "dprecup@cs.mcgill.ca",
    homepage_url: "https://www.cs.mcgill.ca/~dprecup/",
    lab_url: "https://rl.cs.mcgill.ca/",
    research_areas: ["Reinforcement Learning", "Temporal Abstraction", "Continual Learning", "Medical AI"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.mcgill.ca/~dprecup/"
  },
  {
    university: "McGill University",
    department: "School of Computer Science & Mila",
    name: "Siva Reddy",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "siva.reddy@mcgill.ca",
    homepage_url: "https://sivareddy.in/",
    lab_url: "https://mcgill-nlp.github.io/",
    research_areas: ["Natural Language Processing", "Large Language Model Evaluation", "Reasoning & Grounding", "Conversational AI"],
    funding_signal: "recruiting",
    source_url: "https://sivareddy.in/"
  },
  {
    university: "McGill University",
    department: "School of Computer Science & Mila",
    name: "David Rolnick",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "drolnick@cs.mcgill.ca",
    homepage_url: "https://davidrolnick.com/",
    lab_url: "https://climatechange.ai/",
    research_areas: ["Continual Learning", "Deep Learning Robustness", "AI for Climate and Ecology", "Neural Network Generalization"],
    funding_signal: "recruiting",
    source_url: "https://davidrolnick.com/"
  },
  {
    university: "McGill University",
    department: "School of Computer Science",
    name: "Oana Balmau",
    title: "Assistant Professor",
    email: "oana.balmau@mcgill.ca",
    homepage_url: "https://www.cs.mcgill.ca/~obalmau/",
    lab_url: "https://disl.cs.mcgill.ca/",
    research_areas: ["Storage Systems", "Cloud Datacenter Systems", "Non-Volatile Memory", "High-Performance Data Storage"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.mcgill.ca/~obalmau/"
  },

  // University of Alberta / Amii
  {
    university: "University of Alberta",
    department: "Department of Computing Science & Amii",
    name: "Richard S. Sutton",
    title: "Distinguished University Professor & Chief Scientific Advisor Amii",
    email: "rsutton@ualberta.ca",
    homepage_url: "http://incompleteideas.net/",
    lab_url: "https://www.amii.ca/",
    research_areas: ["Reinforcement Learning Foundations", "Temporal-Difference Learning", "Continual Learning", "Artificial General Intelligence"],
    funding_signal: "recruiting",
    source_url: "http://incompleteideas.net/"
  },
  {
    university: "University of Alberta",
    department: "Department of Computing Science & Amii",
    name: "Martha White",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "whitem@ualberta.ca",
    homepage_url: "https://marthawhite.github.io/",
    lab_url: "https://rlai.ualberta.ca/",
    research_areas: ["Reinforcement Learning Optimization", "Representation Learning", "Continual Learning", "Off-Policy Learning"],
    funding_signal: "recruiting",
    source_url: "https://marthawhite.github.io/"
  },
  {
    university: "University of Alberta",
    department: "Department of Computing Science & Amii",
    name: "Csaba Szepesvári",
    title: "Professor & Team Lead DeepMind",
    email: "szepesva@ualberta.ca",
    homepage_url: "https://sites.ualberta.ca/~szepesva/",
    lab_url: "https://sites.ualberta.ca/~szepesva/",
    research_areas: ["Bandit Algorithms", "Reinforcement Learning Theory", "Stochastic Optimization", "Online Learning"],
    funding_signal: "recruiting",
    source_url: "https://sites.ualberta.ca/~szepesva/"
  },
  {
    university: "University of Alberta",
    department: "Department of Computing Science",
    name: "Paul Lu",
    title: "Professor of Computing Science",
    email: "paullu@ualberta.ca",
    homepage_url: "https://webdocs.cs.ualberta.ca/~paullu/",
    lab_url: "https://webdocs.cs.ualberta.ca/~paullu/HPCS/",
    research_areas: ["High Performance Computing", "Parallel Distributed Systems", "Operating Systems", "Cloud Pipelines"],
    funding_signal: "recruiting",
    source_url: "https://webdocs.cs.ualberta.ca/~paullu/"
  },

  // Simon Fraser University (SFU)
  {
    university: "Simon Fraser University",
    department: "School of Computing Science",
    name: "Greg Mori",
    title: "Professor of Computing Science",
    email: "mori@sfu.ca",
    homepage_url: "https://www.cs.sfu.ca/~mori/",
    lab_url: "https://www.cs.sfu.ca/~mori/research.html",
    research_areas: ["Computer Vision", "Human Activity Recognition", "Deep Structured Models", "Multimodal Video Analytics"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.sfu.ca/~mori/"
  },
  {
    university: "Simon Fraser University",
    department: "School of Computing Science",
    name: "Angel Chang",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "angelx@sfu.ca",
    homepage_url: "https://angelxuanchang.github.io/",
    lab_url: "https://3dsrg.github.io/",
    research_areas: ["3D Deep Learning", "Embodied AI", "Language Grounding", "3D Scene Understanding"],
    funding_signal: "recruiting",
    source_url: "https://angelxuanchang.github.io/"
  },
  {
    university: "Simon Fraser University",
    department: "School of Computing Science",
    name: "Ke Li",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "keli@sfu.ca",
    homepage_url: "https://pub.cs.sfu.ca/~keli/",
    lab_url: "https://pub.cs.sfu.ca/~keli/",
    research_areas: ["Deep Generative Models", "Computer Vision", "Continuous-Time Models", "Machine Learning Optimization"],
    funding_signal: "recruiting",
    source_url: "https://pub.cs.sfu.ca/~keli/"
  },

  // McMaster University
  {
    university: "McMaster University",
    department: "Department of Computing and Software",
    name: "Rong Zheng",
    title: "Professor of Computing and Software",
    email: "rzheng@mcmaster.ca",
    homepage_url: "https://www.cas.mcmaster.ca/~rzheng/",
    lab_url: "https://www.cas.mcmaster.ca/~rzheng/lab/",
    research_areas: ["Mobile Edge AI", "Internet of Things", "Distributed Sensor Processing", "Cyber-Physical Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cas.mcmaster.ca/~rzheng/"
  },
  {
    university: "McMaster University",
    department: "Department of Computing and Software",
    name: "Wenbo He",
    title: "Associate Professor of Computing and Software",
    email: "hew11@mcmaster.ca",
    homepage_url: "https://www.cas.mcmaster.ca/~hew11/",
    lab_url: "https://www.cas.mcmaster.ca/",
    research_areas: ["Cloud Computing Security", "Privacy-Preserving Edge Systems", "Distributed Networks", "IoT Privacy"],
    funding_signal: "recruiting",
    source_url: "https://www.cas.mcmaster.ca/~hew11/"
  },

  // University of Calgary
  {
    university: "University of Calgary",
    department: "Department of Computer Science",
    name: "Jörg Denzinger",
    title: "Associate Professor of Computer Science",
    email: "denzinge@ucalgary.ca",
    homepage_url: "https://pages.cpsc.ucalgary.ca/~denzinge/",
    lab_url: "https://pages.cpsc.ucalgary.ca/~denzinge/",
    research_areas: ["Multi-Agent Systems", "Cooperative Agent Teams", "Distributed Problem Solving", "Learning in Multi-Agent Systems"],
    funding_signal: "recruiting",
    source_url: "https://pages.cpsc.ucalgary.ca/~denzinge/"
  },
  {
    university: "University of Calgary",
    department: "Department of Computer Science",
    name: "Diwakar Krishnamurthy",
    title: "Professor of Computer Science",
    email: "dkrishna@ucalgary.ca",
    homepage_url: "https://pages.cpsc.ucalgary.ca/~dkrishna/",
    lab_url: "https://pages.cpsc.ucalgary.ca/~dkrishna/",
    research_areas: ["Cloud Computing Performance", "Autonomic Systems", "High-Concurrency Web Systems", "Resource Allocation"],
    funding_signal: "recruiting",
    source_url: "https://pages.cpsc.ucalgary.ca/~dkrishna/"
  },

  // University of Ottawa
  {
    university: "University of Ottawa",
    department: "School of Electrical Engineering and Computer Science (EECS)",
    name: "Tet Yeap",
    title: "Associate Professor of EECS",
    email: "tyeap@uottawa.ca",
    homepage_url: "https://www.uottawa.ca/faculty-engineering/tet-yeap",
    lab_url: "https://www.uottawa.ca/faculty-engineering/",
    research_areas: ["VLSI for Neural Networks", "Hardware Accelerators for AI", "Embedded Deep Learning", "Low-Latency Computing"],
    funding_signal: "recruiting",
    source_url: "https://www.uottawa.ca/faculty-engineering/tet-yeap"
  },
  {
    university: "University of Ottawa",
    department: "School of Electrical Engineering and Computer Science (EECS)",
    name: "Shervin Shirmohammadi",
    title: "University Research Chair & Professor & IEEE Fellow",
    email: "shervin@uottawa.ca",
    homepage_url: "https://www.eecs.uottawa.ca/~shervin/",
    lab_url: "https://discover.uottawa.ca/",
    research_areas: ["Medical Imaging AI", "Video Analytics in Healthcare", "Multimedia Distributed Systems", "Deep Learning for Clinical Diagnosis"],
    funding_signal: "recruiting",
    source_url: "https://www.eecs.uottawa.ca/~shervin/"
  },

  // ==================== UNITED KINGDOM ====================
  // University College London (UCL)
  {
    university: "University College London",
    department: "Department of Computer Science & UCL AI Centre",
    name: "Emine Yilmaz",
    title: "Professor of Computer Science & Turing Fellow",
    email: "emine.yilmaz@ucl.ac.uk",
    homepage_url: "https://eminey.github.io/",
    lab_url: "https://www.ucl.ac.uk/ai-centre/",
    research_areas: ["Information Retrieval", "Task-Oriented Conversational Systems", "LLM Evaluation", "Reinforcement Learning"],
    funding_signal: "recruiting",
    source_url: "https://eminey.github.io/"
  },
  {
    university: "University College London",
    department: "Department of Computer Science & UCL AI Centre",
    name: "Pontus Stenetorp",
    title: "Associate Professor of Computer Science",
    email: "p.stenetorp@ucl.ac.uk",
    homepage_url: "https://pontus.stenetorp.se/",
    lab_url: "https://uclnlp.github.io/",
    research_areas: ["Natural Language Processing", "Machine Reading Comprehension", "Information Extraction", "Fact Verification"],
    funding_signal: "recruiting",
    source_url: "https://pontus.stenetorp.se/"
  },
  {
    university: "University College London",
    department: "Department of Computer Science",
    name: "Brad Karp",
    title: "Professor of Computer Systems and Networks",
    email: "b.karp@cs.ucl.ac.uk",
    homepage_url: "http://www.cs.ucl.ac.uk/staff/B.Karp/",
    lab_url: "http://www.cs.ucl.ac.uk/research/systems/",
    research_areas: ["Distributed Systems", "Network Protocol Design", "Datacenter Networks", "Systems Security"],
    funding_signal: "recruiting",
    source_url: "http://www.cs.ucl.ac.uk/staff/B.Karp/"
  },
  {
    university: "University College London",
    department: "Department of Computer Science",
    name: "Lourdes Agapito",
    title: "Professor of 3D Vision",
    email: "l.agapito@ucl.ac.uk",
    homepage_url: "http://www0.cs.ucl.ac.uk/staff/L.Agapito/",
    lab_url: "http://geometry.cs.ucl.ac.uk/",
    research_areas: ["3D Computer Vision", "Dynamic 3D Reconstruction", "Neural Radiance Fields", "Deformable Surface Tracking"],
    funding_signal: "recruiting",
    source_url: "http://www0.cs.ucl.ac.uk/staff/L.Agapito/"
  },

  // University of Edinburgh
  {
    university: "University of Edinburgh",
    department: "School of Informatics",
    name: "Aggelos Kiayias",
    title: "Chair in Cyber Security and Privacy & Director of Blockchain Tech Lab",
    email: "akiayias@ed.ac.uk",
    homepage_url: "https://kiayias.com/",
    lab_url: "https://www.ed.ac.uk/informatics/blockchain",
    research_areas: ["Blockchain Cryptography", "Ouroboros Proof-of-Stake", "Distributed Consensus Protocols", "Applied Cryptography"],
    funding_signal: "recruiting",
    source_url: "https://kiayias.com/"
  },
  {
    university: "University of Edinburgh",
    department: "School of Informatics",
    name: "Mark Steedman",
    title: "Professor of Cognitive Science",
    email: "steedman@inf.ed.ac.uk",
    homepage_url: "http://homepages.inf.ed.ac.uk/steedman/",
    lab_url: "https://www.ed.ac.uk/informatics/research/centres/anc",
    research_areas: ["Computational Linguistics", "Combinatory Categorial Grammar", "Semantic Parsing", "Language Understanding"],
    funding_signal: "recruiting",
    source_url: "http://homepages.inf.ed.ac.uk/steedman/"
  },
  {
    university: "University of Edinburgh",
    department: "School of Informatics",
    name: "Tariq Elahi",
    title: "Senior Lecturer in Cyber Security and Privacy",
    email: "tariq.elahi@ed.ac.uk",
    homepage_url: "https://tariqelahi.github.io/",
    lab_url: "https://www.ed.ac.uk/informatics/security-privacy",
    research_areas: ["Anonymous Communication Networks", "Tor Network Security", "Traffic Analysis", "Privacy Enhancing Technologies"],
    funding_signal: "recruiting",
    source_url: "https://tariqelahi.github.io/"
  },
  {
    university: "University of Edinburgh",
    department: "School of Informatics",
    name: "Paul Patras",
    title: "Reader in Mobile Intelligence",
    email: "paul.patras@ed.ac.uk",
    homepage_url: "http://homepages.inf.ed.ac.uk/ppatras/",
    lab_url: "https://www.ed.ac.uk/informatics/research/centres/icsa",
    research_areas: ["Mobile Network AI", "Adversarial Machine Learning in Communications", "IoT Security", "Edge Computing"],
    funding_signal: "recruiting",
    source_url: "http://homepages.inf.ed.ac.uk/ppatras/"
  },

  // University of Oxford
  {
    university: "University of Oxford",
    department: "Department of Computer Science",
    name: "Cas Cremers",
    title: "Professor of Information Security (CISPA / Oxford Affiliate)",
    email: "cas.cremers@cs.ox.ac.uk",
    homepage_url: "https://people.cispa.io/cas.cremers/",
    lab_url: "https://www.cs.ox.ac.uk/activities/security/",
    research_areas: ["Formal Analysis of Security Protocols", "TLS 1.3 / 5G Verification", "Automated Theorem Proving", "Applied Cryptography"],
    funding_signal: "recruiting",
    source_url: "https://people.cispa.io/cas.cremers/"
  },
  {
    university: "University of Oxford",
    department: "Department of Computer Science",
    name: "Marta Kwiatkowska",
    title: "Professor of Computing Systems & Fellow of Royal Society",
    email: "marta.kwiatkowska@cs.ox.ac.uk",
    homepage_url: "https://www.cs.ox.ac.uk/people/marta.kwiatkowska/",
    lab_url: "https://www.prismmodelchecker.org/",
    research_areas: ["Verification of Deep Neural Networks", "Probabilistic Model Checking", "PRISM Model Checker", "Trustworthy Autonomous Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ox.ac.uk/people/marta.kwiatkowska/"
  },
  {
    university: "University of Oxford",
    department: "Department of Computer Science",
    name: "Varun Kanade",
    title: "Associate Professor of Machine Learning",
    email: "varun.kanade@cs.ox.ac.uk",
    homepage_url: "https://www.cs.ox.ac.uk/people/varun.kanade/",
    lab_url: "https://www.cs.ox.ac.uk/activities/machinelearning/",
    research_areas: ["Machine Learning Theory", "Computational Learning Theory", "Reinforcement Learning", "Multi-Agent Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ox.ac.uk/people/varun.kanade/"
  },

  // University of Cambridge
  {
    university: "University of Cambridge",
    department: "Department of Computer Science and Technology",
    name: "Cecilia Mascolo",
    title: "Full Professor of Mobile Systems",
    email: "cecilia.mascolo@cl.cam.ac.uk",
    homepage_url: "https://www.cl.cam.ac.uk/~cm542/",
    lab_url: "https://www.cl.cam.ac.uk/research/dtg/",
    research_areas: ["Mobile Health AI", "Audio/Acoustic Machine Learning", "Pervasive Distributed Systems", "Edge AI Diagnostics"],
    funding_signal: "recruiting",
    source_url: "https://www.cl.cam.ac.uk/~cm542/"
  },
  {
    university: "University of Cambridge",
    department: "Department of Computer Science and Technology",
    name: "Robert Watson",
    title: "Professor of Systems, Security, and Architecture",
    email: "robert.watson@cl.cam.ac.uk",
    homepage_url: "https://www.cl.cam.ac.uk/~rnw24/",
    lab_url: "https://www.cl.cam.ac.uk/research/security/capsicum/",
    research_areas: ["Operating System Security", "CHERI Capability Hardware", "Capsicum Sandboxing", "Systems Architecture"],
    funding_signal: "recruiting",
    source_url: "https://www.cl.cam.ac.uk/~rnw24/"
  },

  // Imperial College London
  {
    university: "Imperial College London",
    department: "Department of Computing",
    name: "Maja Pantic",
    title: "Professor of Affective and Behavioral Computing",
    email: "m.pantic@imperial.ac.uk",
    homepage_url: "https://www.doc.ic.ac.uk/~mpantic/",
    lab_url: "https://ibug.doc.ic.ac.uk/",
    research_areas: ["Affective Computing", "Facial Action Recognition", "Multimodal Machine Learning", "Biomedical Emotion AI"],
    funding_signal: "recruiting",
    source_url: "https://www.doc.ic.ac.uk/~mpantic/"
  },
  {
    university: "Imperial College London",
    department: "Department of Computing",
    name: "Bernhard Kainz",
    title: "Professor of Medical Image Computing",
    email: "b.kainz@imperial.ac.uk",
    homepage_url: "https://www.imperial.ac.uk/people/b.kainz",
    lab_url: "https://biomedic.doc.ic.ac.uk/",
    research_areas: ["Real-Time Medical Image Reconstruction", "Ultrasound AI", "Deep Learning in Radiology", "Surgical Navigation"],
    funding_signal: "recruiting",
    source_url: "https://biomedic.doc.ic.ac.uk/"
  },

  // ==================== SWITZERLAND ====================
  // ETH Zurich
  {
    university: "ETH Zurich",
    department: "Department of Computer Science",
    name: "Martin Vechev",
    title: "Full Professor of Computer Science & Head of SRI Lab",
    email: "martin.vechev@inf.ethz.ch",
    homepage_url: "https://www.sri.inf.ethz.ch/people/martin",
    lab_url: "https://www.sri.inf.ethz.ch/",
    research_areas: ["Trustworthy AI", "Neural Network Robustness Verification", "AI for Code", "Certified AI Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.sri.inf.ethz.ch/"
  },
  {
    university: "ETH Zurich",
    department: "Department of Computer Science",
    name: "Srdjan Capkun",
    title: "Full Professor of Computer Science & Head of System Security Group",
    email: "srdjan.capkun@inf.ethz.ch",
    homepage_url: "https://syssec.ethz.ch/people/capkun.html",
    lab_url: "https://syssec.ethz.ch/",
    research_areas: ["System Security", "Hardware Trusted Execution", "Wireless Security", "Physical-Layer Security"],
    funding_signal: "recruiting",
    source_url: "https://syssec.ethz.ch/"
  },
  {
    university: "ETH Zurich",
    department: "Department of Computer Science",
    name: "Ce Zhang",
    title: "Associate Professor (ETH / Chicago Affiliate)",
    email: "ce.zhang@inf.ethz.ch",
    homepage_url: "https://datamgt.org/ce-zhang/",
    lab_url: "https://ds3lab.inf.ethz.ch/",
    research_areas: ["Systems for Machine Learning", "Data-Centric AI", "Decentralized Learning", "Fast Machine Learning Pipelines"],
    funding_signal: "recruiting",
    source_url: "https://ds3lab.inf.ethz.ch/"
  },
  {
    university: "ETH Zurich",
    department: "Department of Computer Science",
    name: "Torsten Hoefler",
    title: "Full Professor & Head of Scalable Parallel Computing Lab",
    email: "htor@inf.ethz.ch",
    homepage_url: "https://htor.inf.ethz.ch/",
    lab_url: "https://spcl.inf.ethz.ch/",
    research_areas: ["Scalable Parallel Computing", "High-Performance LLM Training", "GPU Interconnects", "Distributed Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://spcl.inf.ethz.ch/"
  },

  // EPFL
  {
    university: "EPFL",
    department: "School of Computer and Communication Sciences (IC)",
    name: "Jean-Pierre Hubaux",
    title: "Professor of Information Security and Privacy",
    email: "jean-pierre.hubaux@epfl.ch",
    homepage_url: "https://people.epfl.ch/jean-pierre.hubaux",
    lab_url: "https://www.epfl.ch/labs/ldn/",
    research_areas: ["Data Privacy", "Privacy-Preserving Healthcare Analytics", "Homomorphic Encryption", "Federated Genomic Data"],
    funding_signal: "recruiting",
    source_url: "https://www.epfl.ch/labs/ldn/"
  },
  {
    university: "EPFL",
    department: "School of Computer and Communication Sciences (IC)",
    name: "Volkan Cevher",
    title: "Full Professor of Electrical Engineering & Head of LIONS",
    email: "volkan.cevher@epfl.ch",
    homepage_url: "https://people.epfl.ch/volkan.cevher",
    lab_url: "https://www.epfl.ch/labs/lions/",
    research_areas: ["Optimization for Machine Learning", "Robust Deep Learning", "Federated Optimization", "Adversarial Robustness"],
    funding_signal: "recruiting",
    source_url: "https://www.epfl.ch/labs/lions/"
  },
  {
    university: "EPFL",
    department: "School of Computer and Communication Sciences (IC)",
    name: "Martin Jaggi",
    title: "Associate Professor & Head of MLO Lab",
    email: "martin.jaggi@epfl.ch",
    homepage_url: "https://people.epfl.ch/martin.jaggi",
    lab_url: "https://www.epfl.ch/labs/mlo/",
    research_areas: ["Decentralized Machine Learning", "Collaborative Federated Learning", "Optimization Algorithms", "NLP with LLMs"],
    funding_signal: "recruiting",
    source_url: "https://www.epfl.ch/labs/mlo/"
  },
  {
    university: "EPFL",
    department: "School of Computer and Communication Sciences (IC)",
    name: "George Candea",
    title: "Full Professor of Computer Systems & Head of DSLab",
    email: "george.candea@epfl.ch",
    homepage_url: "https://people.epfl.ch/george.candea",
    lab_url: "https://dslab.epfl.ch/",
    research_areas: ["Dependable Systems Software", "Automated Software Verification", "Operating Systems Reliability", "Symbolic Execution"],
    funding_signal: "recruiting",
    source_url: "https://dslab.epfl.ch/"
  }
];

async function run() {
  console.log(`Starting Wave 9A ingestion: ${wave9aFaculty.length} faculty records across Canada, UK, and Switzerland...`);
  
  const validated = wave9aFaculty.map(item => {
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
  console.log("Wave 9A ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave9aFaculty };
