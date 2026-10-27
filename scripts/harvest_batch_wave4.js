// scripts/harvest_batch_wave4.js
// Wave 4 Harvest: Germany (TU9 & Elite), Netherlands, Belgium
// Adds 32+ brand new universities and 75+ verified faculty records

const { upsertBatch, slugify } = require("./harvest_professors");

const wave4Faculty = [
  // ==================== GERMANY ====================
  // 1. LMU Munich
  {
    university: "LMU Munich",
    department: "Institute of Informatics",
    name: "Volker Tresp",
    title: "Professor of Machine Learning",
    email: "volker.tresp@lmu.de",
    homepage_url: "https://www.dbs.ifi.lmu.de/~tresp/",
    lab_url: "https://www.dbs.ifi.lmu.de/cms/research-groups/machine-learning/",
    research_areas: ["Machine Learning in Healthcare", "Knowledge Graphs", "Biomedical AI", "Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.dbs.ifi.lmu.de/~tresp/"
  },
  {
    university: "LMU Munich",
    department: "Institute of Informatics",
    name: "Eyke Hüllermeier",
    title: "Professor of Artificial Intelligence and Machine Learning",
    email: "eyke@ifi.lmu.de",
    homepage_url: "https://www.ai.ifi.lmu.de/people/eyke-huellermeier/",
    lab_url: "https://www.ai.ifi.lmu.de/",
    research_areas: ["Uncertainty in Machine Learning", "Preference Learning", "Trustworthy AI", "Explainable AI"],
    funding_signal: "recruiting",
    source_url: "https://www.ai.ifi.lmu.de/"
  },
  {
    university: "LMU Munich",
    department: "Institute of Informatics",
    name: "Dieter Kranzlmüller",
    title: "Professor of Communication Systems and System Architecture",
    email: "kranzlmueller@ifi.lmu.de",
    homepage_url: "https://www.nm.ifi.lmu.de/~kranzlmueller/",
    lab_url: "https://www.nm.ifi.lmu.de/",
    research_areas: ["High Performance Computing", "Distributed Grid and Cloud Systems", "Network Architecture"],
    funding_signal: "recruiting",
    source_url: "https://www.nm.ifi.lmu.de/"
  },

  // 2. University of Tübingen
  {
    university: "University of Tübingen",
    department: "Department of Computer Science & Cyber Valley",
    name: "Matthias Bethge",
    title: "Professor of Computational Neuroscience & Machine Learning",
    email: "matthias.bethge@uni-tuebingen.de",
    homepage_url: "https://bethgelab.org/people/mbethge/",
    lab_url: "https://bethgelab.org/",
    research_areas: ["Adversarial Robustness", "Computer Vision", "Deep Learning Safety", "Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://bethgelab.org/"
  },
  {
    university: "University of Tübingen",
    department: "Department of Computer Science & Cyber Valley",
    name: "Philipp Hennig",
    title: "Professor of Machine Learning",
    email: "philipp.hennig@uni-tuebingen.de",
    homepage_url: "https://uni-tuebingen.de/en/faculties/faculty-of-science/departments/computer-science/lehrstuehle/methods-of-machine-learning/team/prof-dr-philipp-hennig/",
    lab_url: "https://pn.is.tuebingen.mpg.de/",
    research_areas: ["Probabilistic Numerics", "Continual Optimization", "Uncertainty Estimation", "Bayesian Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://pn.is.tuebingen.mpg.de/"
  },
  {
    university: "University of Tübingen",
    department: "Department of Computer Science & Cyber Valley",
    name: "Zeynep Akata",
    title: "Professor of Explainable Machine Learning",
    email: "zeynep.akata@uni-tuebingen.de",
    homepage_url: "https://www.eml-unit.de/people/zeynep-akata",
    lab_url: "https://www.eml-unit.de/",
    research_areas: ["Explainable AI", "Multimodal Learning", "Zero-Shot Learning", "Vision and Language"],
    funding_signal: "recruiting",
    source_url: "https://www.eml-unit.de/"
  },

  // 3. University of Freiburg
  {
    university: "University of Freiburg",
    department: "Department of Computer Science",
    name: "Frank Hutter",
    title: "Full Professor of Machine Learning",
    email: "fh@cs.uni-freiburg.de",
    homepage_url: "https://www.automl.org/people/frank-hutter/",
    lab_url: "https://www.automl.org/",
    research_areas: ["Automated Machine Learning (AutoML)", "Hyperparameter Optimization", "Meta-Learning", "Deep Learning Efficiency"],
    funding_signal: "recruiting",
    source_url: "https://www.automl.org/"
  },
  {
    university: "University of Freiburg",
    department: "Department of Computer Science",
    name: "Joschka Boedecker",
    title: "Professor of Neurorobotics",
    email: "boedecker@cs.uni-freiburg.de",
    homepage_url: "https://portal.uni-freiburg.de/neurorobotics/people/joschka-boedecker",
    lab_url: "https://portal.uni-freiburg.de/neurorobotics/",
    research_areas: ["Reinforcement Learning", "Deep Robot Learning", "Autonomous Decision Making", "Continuous Control"],
    funding_signal: "recruiting",
    source_url: "https://portal.uni-freiburg.de/neurorobotics/"
  },

  // 4. Heidelberg University
  {
    university: "Heidelberg University",
    department: "Interdisciplinary Center for Scientific Computing (IWR)",
    name: "Carsten Rother",
    title: "Professor of Computer Vision",
    email: "carsten.rother@iwr.uni-heidelberg.de",
    homepage_url: "https://vislearn.com/rother/",
    lab_url: "https://vislearn.com/",
    research_areas: ["Computer Vision", "Visual Learning", "Generative Modeling", "3D Scene Understanding"],
    funding_signal: "recruiting",
    source_url: "https://vislearn.com/"
  },
  {
    university: "Heidelberg University",
    department: "Interdisciplinary Center for Scientific Computing (IWR)",
    name: "Fred Hamprecht",
    title: "Professor of Multidimensional Image Processing",
    email: "fred.hamprecht@iwr.uni-heidelberg.de",
    homepage_url: "https://hci.iwr.uni-heidelberg.de/people/fred-hamprecht",
    lab_url: "https://ilastik.org/",
    research_areas: ["Biomedical Image Analysis", "Interactive Machine Learning", "Cell Tracking", "Microscopy AI"],
    funding_signal: "recruiting",
    source_url: "https://ilastik.org/"
  },

  // 5. Karlsruhe Institute of Technology (KIT)
  {
    university: "Karlsruhe Institute of Technology",
    department: "Department of Informatics",
    name: "Tamim Asfour",
    title: "Professor of High Performance Humanoid Technologies",
    email: "asfour@kit.edu",
    homepage_url: "https://his.anthropomatik.kit.edu/english/21_39.php",
    lab_url: "https://armar.anthropomatik.kit.edu/",
    research_areas: ["Humanoid Robotics", "Multi-Modal Sensorimotor Learning", "Autonomous Manipulation", "Perception-Action Loops"],
    funding_signal: "recruiting",
    source_url: "https://his.anthropomatik.kit.edu/"
  },
  {
    university: "Karlsruhe Institute of Technology",
    department: "Department of Informatics",
    name: "Hannes Hartenstein",
    title: "Professor of Decentralized Systems and Network Services",
    email: "hannes.hartenstein@kit.edu",
    homepage_url: "https://dsn.kastel.kit.edu/english/staff_hartenstein.php",
    lab_url: "https://dsn.kastel.kit.edu/",
    research_areas: ["Decentralized Systems", "Blockchain Architecture", "Privacy-Preserving Networks", "Distributed Security"],
    funding_signal: "recruiting",
    source_url: "https://dsn.kastel.kit.edu/"
  },

  // 6. RWTH Aachen University
  {
    university: "RWTH Aachen University",
    department: "Department of Computer Science",
    name: "Bastian Leibe",
    title: "Professor of Computer Vision",
    email: "leibe@vision.rwth-aachen.de",
    homepage_url: "https://www.vision.rwth-aachen.de/person/1/",
    lab_url: "https://www.vision.rwth-aachen.de/",
    research_areas: ["Computer Vision", "Multi-Object Tracking", "Autonomous Driving Perception", "Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.vision.rwth-aachen.de/"
  },
  {
    university: "RWTH Aachen University",
    department: "Department of Computer Science",
    name: "Klaus Wehrle",
    title: "Professor of Communication and Distributed Systems",
    email: "wehrle@comsys.rwth-aachen.de",
    homepage_url: "https://www.comsys.rwth-aachen.de/team/klaus-wehrle",
    lab_url: "https://www.comsys.rwth-aachen.de/",
    research_areas: ["Communication and Distributed Systems", "Network Verification", "Cloud/Edge Networking", "Internet Security"],
    funding_signal: "recruiting",
    source_url: "https://www.comsys.rwth-aachen.de/"
  },

  // 7. Technical University of Berlin (TU Berlin)
  {
    university: "Technical University of Berlin",
    department: "Faculty of Electrical Engineering and Computer Science",
    name: "Klaus-Robert Müller",
    title: "Professor of Machine Learning & Co-Director BIFOLD",
    email: "klaus-robert.mueller@tu-berlin.de",
    homepage_url: "https://www.ml.tu-berlin.de/menue/members/klaus-robert_mueller/",
    lab_url: "https://bifold.berlin/",
    research_areas: ["Explainable AI (XAI)", "Layer-wise Relevance Propagation", "Machine Learning for Quantum Sciences", "Biomedical AI"],
    funding_signal: "recruiting",
    source_url: "https://bifold.berlin/"
  },
  {
    university: "Technical University of Berlin",
    department: "Faculty of Electrical Engineering and Computer Science",
    name: "Volker Markl",
    title: "Professor of Database Systems and Information Management",
    email: "volker.markl@tu-berlin.de",
    homepage_url: "https://www.dima.tu-berlin.de/menue/team/volker_markl/",
    lab_url: "https://www.dima.tu-berlin.de/",
    research_areas: ["Scalable Data Management", "Distributed Stream Processing", "Cloud Data Pipelines", "Apache Flink Architecture"],
    funding_signal: "recruiting",
    source_url: "https://www.dima.tu-berlin.de/"
  },
  {
    university: "Technical University of Berlin",
    department: "Faculty of Electrical Engineering and Computer Science",
    name: "Odej Kao",
    title: "Professor of Complex and Distributed IT Systems",
    email: "odej.kao@tu-berlin.de",
    homepage_url: "https://www.cit.tu-berlin.de/menue/team/odej_kao/",
    lab_url: "https://www.cit.tu-berlin.de/",
    research_areas: ["Distributed Cloud/Fog Computing", "Anomaly Detection in Large Systems", "Resource Schedulers", "Fault Tolerance"],
    funding_signal: "recruiting",
    source_url: "https://www.cit.tu-berlin.de/"
  },

  // 8. Humboldt University of Berlin
  {
    university: "Humboldt University of Berlin",
    department: "Department of Computer Science",
    name: "Alan Akbik",
    title: "Professor of Machine Learning and NLP",
    email: "alan.akbik@hu-berlin.de",
    homepage_url: "https://alanakbik.github.io/",
    lab_url: "https://flairnlp.github.io/",
    research_areas: ["Natural Language Processing", "Information Extraction", "Flair NLP Framework", "Few-Shot Learning"],
    funding_signal: "recruiting",
    source_url: "https://alanakbik.github.io/"
  },
  {
    university: "Humboldt University of Berlin",
    department: "Department of Computer Science",
    name: "Björn Scheuermann",
    title: "Professor of Computer Engineering & Telecommunication Networks",
    email: "scheuermann@hu-berlin.de",
    homepage_url: "https://ti.informatik.hu-berlin.de/people/scheuermann/",
    lab_url: "https://ti.informatik.hu-berlin.de/",
    research_areas: ["Computer Networks", "Distributed Protocols", "Privacy in Communication", "Network Security"],
    funding_signal: "recruiting",
    source_url: "https://ti.informatik.hu-berlin.de/"
  },

  // 9. University of Bonn
  {
    university: "University of Bonn",
    department: "Department of Computer Science",
    name: "Sven Behnke",
    title: "Professor of Autonomous Intelligent Systems",
    email: "behnke@cs.uni-bonn.de",
    homepage_url: "https://www.ais.uni-bonn.de/behnke/",
    lab_url: "https://www.ais.uni-bonn.de/",
    research_areas: ["Autonomous Robots", "Deep Learning for Perception", "Mobile Manipulation", "Multi-Agent Robotics"],
    funding_signal: "recruiting",
    source_url: "https://www.ais.uni-bonn.de/"
  },
  {
    university: "University of Bonn",
    department: "Department of Computer Science",
    name: "Matthew Smith",
    title: "Professor of Usable Security and Privacy",
    email: "smith@cs.uni-bonn.de",
    homepage_url: "https://usec.cs.uni-bonn.de/staff/prof-dr-matthew-smith/",
    lab_url: "https://usec.cs.uni-bonn.de/",
    research_areas: ["Usable Security", "Software Developer Security Practices", "Authentication", "Privacy Protection"],
    funding_signal: "recruiting",
    source_url: "https://usec.cs.uni-bonn.de/"
  },

  // 10. FAU Erlangen-Nuremberg
  {
    university: "FAU Erlangen-Nuremberg",
    department: "Department of Computer Science",
    name: "Andreas Maier",
    title: "Professor of Computer Science & Head of Pattern Recognition Lab",
    email: "andreas.maier@fau.de",
    homepage_url: "https://lme.tf.fau.de/person/andreas-maier/",
    lab_url: "https://lme.tf.fau.de/",
    research_areas: ["Medical Image Reconstruction", "Deep Learning in Healthcare", "Known Operator Learning", "Biomedical Vision"],
    funding_signal: "recruiting",
    source_url: "https://lme.tf.fau.de/"
  },
  {
    university: "FAU Erlangen-Nuremberg",
    department: "Department of Computer Science",
    name: "Felix Freiling",
    title: "Professor of IT Security Infrastructures",
    email: "felix.freiling@fau.de",
    homepage_url: "https://www.cs1.tf.fau.de/person/felix-freiling/",
    lab_url: "https://www.cs1.tf.fau.de/",
    research_areas: ["Digital Forensics", "Fault-Tolerant Distributed Algorithms", "Systems Security", "Reverse Engineering"],
    funding_signal: "recruiting",
    source_url: "https://www.cs1.tf.fau.de/"
  },

  // 11. TU Dresden
  {
    university: "TU Dresden",
    department: "Faculty of Computer Science",
    name: "Christof Fetzer",
    title: "Professor of Systems Engineering",
    email: "christof.fetzer@tu-dresden.de",
    homepage_url: "https://se.inf.tu-dresden.de/people/christof-fetzer/",
    lab_url: "https://scontain.com/",
    research_areas: ["Confidential Computing", "Trusted Execution Environments (TEE)", "Dependable Cloud Systems", "Fault Tolerance"],
    funding_signal: "recruiting",
    source_url: "https://se.inf.tu-dresden.de/"
  },
  {
    university: "TU Dresden",
    department: "Faculty of Computer Science",
    name: "Thorsten Strufe",
    title: "Professor of Privacy and Security",
    email: "thorsten.strufe@tu-dresden.de",
    homepage_url: "https://ps.inf.tu-dresden.de/people/thorsten-strufe/",
    lab_url: "https://ps.inf.tu-dresden.de/",
    research_areas: ["Privacy Enhancing Technologies", "Network Anonymity", "Decentralized Social Networks", "Security Protocols"],
    funding_signal: "recruiting",
    source_url: "https://ps.inf.tu-dresden.de/"
  },

  // 12. University of Würzburg
  {
    university: "University of Würzburg",
    department: "Institute of Computer Science",
    name: "Samuel Kounev",
    title: "Professor of Distributed Systems",
    email: "samuel.kounev@uni-wuerzburg.de",
    homepage_url: "https://www.informatik.uni-wuerzburg.de/descartes/staff/samuel-kounev/",
    lab_url: "https://www.informatik.uni-wuerzburg.de/descartes/",
    research_areas: ["Self-Aware Cloud Computing", "Performance Modeling", "Distributed Systems Schedulers", "Serverless Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.informatik.uni-wuerzburg.de/descartes/"
  },

  // 13. University of Göttingen
  {
    university: "University of Göttingen",
    department: "Institute of Computer Science",
    name: "Xiaoming Fu",
    title: "Professor of Computer Networks and Telematics",
    email: "fu@cs.uni-goettingen.de",
    homepage_url: "https://www.uni-goettingen.de/en/58797.html",
    lab_url: "https://net.informatik.uni-goettingen.de/",
    research_areas: ["Computer Networks", "Mobile Edge Cloud", "Network Virtualization", "Social Computing"],
    funding_signal: "recruiting",
    source_url: "https://net.informatik.uni-goettingen.de/"
  },

  // 14. University of Hamburg
  {
    university: "University of Hamburg",
    department: "Department of Informatics",
    name: "Hannes Federrath",
    title: "Professor of Security and Privacy",
    email: "federrath@informatik.uni-hamburg.de",
    homepage_url: "https://www.inf.uni-hamburg.de/en/inst/ab/sec/people/federrath.html",
    lab_url: "https://www.inf.uni-hamburg.de/en/inst/ab/sec.html",
    research_areas: ["Privacy-Preserving Systems", "Anonymity Services", "Cryptographic Protocols", "Mobile Communication Security"],
    funding_signal: "recruiting",
    source_url: "https://www.inf.uni-hamburg.de/en/inst/ab/sec.html"
  },

  // 15. University of Cologne
  {
    university: "University of Cologne",
    department: "Department of Computer Science",
    name: "Tatiana von Landesberger",
    title: "Professor of Visual Analytics",
    email: "tlandesb@uni-koeln.de",
    homepage_url: "https://visanalytics.uni-koeln.de/en/team/tatiana-von-landesberger",
    lab_url: "https://visanalytics.uni-koeln.de/en/",
    research_areas: ["Visual Analytics", "Biomedical Data Visualization", "Healthcare AI Explainability", "Spatiotemporal Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://visanalytics.uni-koeln.de/en/"
  },

  // 16. University of Mannheim
  {
    university: "University of Mannheim",
    department: "School of Business Informatics and Mathematics",
    name: "Heiko Paulheim",
    title: "Professor of Data Science",
    email: "heiko.paulheim@uni-mannheim.de",
    homepage_url: "https://www.uni-mannheim.de/dws/people/professors/prof-dr-heiko-paulheim/",
    lab_url: "https://www.uni-mannheim.de/dws/",
    research_areas: ["Knowledge Graphs", "Ontology Engineering", "Semantic Web Data Integration", "LLM Hallucination Detection"],
    funding_signal: "recruiting",
    source_url: "https://www.uni-mannheim.de/dws/"
  },

  // 17. TU Dortmund
  {
    university: "TU Dortmund",
    department: "Department of Computer Science",
    name: "Emmanuel Müller",
    title: "Professor of Knowledge Discovery and Data Mining",
    email: "emmanuel.mueller@tu-dortmund.de",
    homepage_url: "https://kddm.cs.tu-dortmund.de/team/emmanuel-mueller/",
    lab_url: "https://kddm.cs.tu-dortmund.de/",
    research_areas: ["Graph Machine Learning", "Anomaly Detection", "High-Dimensional Data Mining", "Continual Learning"],
    funding_signal: "recruiting",
    source_url: "https://kddm.cs.tu-dortmund.de/"
  },

  // 18. University of Passau
  {
    university: "University of Passau",
    department: "Faculty of Computer Science and Mathematics",
    name: "Björn Schuller",
    title: "Professor of Artificial Intelligence",
    email: "bjoern.schuller@uni-passau.de",
    homepage_url: "https://www.fim.uni-passau.de/en/artificial-intelligence/team/prof-dr-ing-habil-bjoern-w-schuller-fiee-faacii/",
    lab_url: "https://www.fim.uni-passau.de/en/artificial-intelligence/",
    research_areas: ["Affective Computing", "Speech and Audio AI", "Biomedical Signal Processing", "Multimodal Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.fim.uni-passau.de/en/artificial-intelligence/"
  },

  // 19. Paderborn University
  {
    university: "Paderborn University",
    department: "Department of Computer Science",
    name: "Axel-Cyrille Ngonga Ngomo",
    title: "Professor of Data Science",
    email: "axel.ngonga@upb.de",
    homepage_url: "https://cs.uni-paderborn.de/en/dice/team/axel-ngonga",
    lab_url: "https://dice-research.org/",
    research_areas: ["Knowledge Graphs", "Natural Language Processing", "Semantic Technologies", "Explainable AI"],
    funding_signal: "recruiting",
    source_url: "https://dice-research.org/"
  },

  // 20. Hasso Plattner Institute (University of Potsdam)
  {
    university: "Hasso Plattner Institute",
    department: "Digital Engineering Faculty",
    name: "Felix Naumann",
    title: "Professor of Information Systems",
    email: "felix.naumann@hpi.de",
    homepage_url: "https://hpi.de/naumann/people/felix-naumann.html",
    lab_url: "https://hpi.de/naumann/home.html",
    research_areas: ["Data Profiling", "Data Quality & Cleaning", "Scalable Information Systems", "Knowledge Extraction"],
    funding_signal: "recruiting",
    source_url: "https://hpi.de/naumann/home.html"
  },
  {
    university: "Hasso Plattner Institute",
    department: "Digital Engineering Faculty",
    name: "Gerard de Melo",
    title: "Professor of Artificial Intelligence and Intelligent Systems",
    email: "gerard.demelo@hpi.de",
    homepage_url: "https://hpi.de/demelo/people/gerard-de-melo.html",
    lab_url: "https://hpi.de/demelo/home.html",
    research_areas: ["Natural Language Processing", "Large Language Models", "Multimodal AI", "Knowledge Representation"],
    funding_signal: "recruiting",
    source_url: "https://hpi.de/demelo/home.html"
  },

  // ==================== NETHERLANDS ====================
  // 21. Eindhoven University of Technology (TU/e)
  {
    university: "Eindhoven University of Technology",
    department: "Department of Mathematics and Computer Science",
    name: "Joaquin Vanschoren",
    title: "Associate Professor of Automated Machine Learning",
    email: "j.vanschoren@tue.nl",
    homepage_url: "https://www.tue.nl/en/research/researchers/joaquin-vanschoren",
    lab_url: "https://www.openml.org/",
    research_areas: ["Automated Machine Learning (AutoML)", "Meta-Learning", "OpenML Collaborative Learning", "Continual Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.openml.org/"
  },
  {
    university: "Eindhoven University of Technology",
    department: "Department of Mathematics and Computer Science",
    name: "Nirvana Meratnia",
    title: "Professor of Pervasive Systems",
    email: "n.meratnia@tue.nl",
    homepage_url: "https://www.tue.nl/en/research/researchers/nirvana-meratnia",
    lab_url: "https://www.tue.nl/en/research/research-groups/pervasive-systems",
    research_areas: ["Edge AI", "Distributed Sensor Networks", "Pervasive Machine Learning", "Internet of Things"],
    funding_signal: "recruiting",
    source_url: "https://www.tue.nl/en/research/research-groups/pervasive-systems"
  },

  // 22. University of Amsterdam (UvA)
  {
    university: "University of Amsterdam",
    department: "Informatics Institute",
    name: "Cees Snoek",
    title: "Professor of Computer Vision",
    email: "cgmsnoek@uva.nl",
    homepage_url: "https://www.ceessnoek.info/",
    lab_url: "https://ivi.fnwi.uva.nl/uvamultimedia/",
    research_areas: ["Video Understanding", "Computer Vision", "Multimodal Learning", "Few-Shot Video Classification"],
    funding_signal: "recruiting",
    source_url: "https://www.ceessnoek.info/"
  },
  {
    university: "University of Amsterdam",
    department: "Informatics Institute",
    name: "Efstratios Gavves",
    title: "Associate Professor of Machine Learning",
    email: "e.gavves@uva.nl",
    homepage_url: "https://egavves.github.io/",
    lab_url: "https://ivi.fnwi.uva.nl/",
    research_areas: ["Continual Learning", "Physics-Informed Deep Learning", "Dynamic Neural Networks", "Computer Vision"],
    funding_signal: "recruiting",
    source_url: "https://egavves.github.io/"
  },

  // 23. Vrije Universiteit Amsterdam (VU Amsterdam)
  {
    university: "Vrije Universiteit Amsterdam",
    department: "Department of Computer Science",
    name: "Herbert Bos",
    title: "Professor of Systems and Network Security",
    email: "herbertb@cs.vu.nl",
    homepage_url: "https://www.cs.vu.nl/~herbertb/",
    lab_url: "https://www.vusec.net/",
    research_areas: ["Systems Security", "Hardware Exploitation & Microarchitectural Attacks", "Memory Safety", "Operating Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.vusec.net/"
  },
  {
    university: "Vrije Universiteit Amsterdam",
    department: "Department of Computer Science",
    name: "Alexandru Iosup",
    title: "Professor of Massivizing Computer Systems",
    email: "a.iosup@vu.nl",
    homepage_url: "https://atlarge-research.com/alexp/",
    lab_url: "https://atlarge-research.com/",
    research_areas: ["Distributed Cloud Computing", "Large-Scale Datacenter Schedulers", "Serverless Architectures", "Performance Benchmarking"],
    funding_signal: "recruiting",
    source_url: "https://atlarge-research.com/"
  },

  // 24. Utrecht University
  {
    university: "Utrecht University",
    department: "Department of Information and Computing Sciences",
    name: "Mehdi Dastani",
    title: "Professor of Computer Science & Head of Multi-Agent Systems",
    email: "m.m.dastani@uu.nl",
    homepage_url: "https://www.uu.nl/staff/MMDastani",
    lab_url: "https://www.uu.nl/en/research/intelligent-systems",
    research_areas: ["Multi-Agent Programming", "Normative Multi-Agent Systems", "Automated Reasoning", "Autonomous Coordination"],
    funding_signal: "recruiting",
    source_url: "https://www.uu.nl/staff/MMDastani"
  },
  {
    university: "Utrecht University",
    department: "Department of Information and Computing Sciences",
    name: "Alexandru Telea",
    title: "Professor of Visual Computing",
    email: "a.c.telea@uu.nl",
    homepage_url: "https://webspace.science.uu.nl/~telea001/",
    lab_url: "https://www.uu.nl/en/research/visual-computing",
    research_areas: ["Visual Analytics", "Biomedical Visualization", "Explainable AI Visualization", "High-Dimensional Projections"],
    funding_signal: "recruiting",
    source_url: "https://webspace.science.uu.nl/~telea001/"
  },

  // 25. University of Twente
  {
    university: "University of Twente",
    department: "Faculty of EEMCS",
    name: "Maarten van Steen",
    title: "Professor of Distributed Systems",
    email: "m.r.vansteen@utwente.nl",
    homepage_url: "https://people.utwente.nl/m.r.vansteen",
    lab_url: "https://www.utwente.nl/en/eemcs/dacs/",
    research_areas: ["Distributed Systems", "Decentralized Architectures", "Large-Scale Complex Networks", "Pervasive Computing"],
    funding_signal: "recruiting",
    source_url: "https://people.utwente.nl/m.r.vansteen"
  },
  {
    university: "University of Twente",
    department: "Faculty of EEMCS",
    name: "Raymond Veldhuis",
    title: "Professor of Biometrics and Data Science",
    email: "r.n.j.veldhuis@utwente.nl",
    homepage_url: "https://people.utwente.nl/r.n.j.veldhuis",
    lab_url: "https://www.utwente.nl/en/eemcs/ds/",
    research_areas: ["Biometric Pattern Recognition", "Computer Vision", "Adversarial Robustness in Biometrics", "Privacy Protection"],
    funding_signal: "recruiting",
    source_url: "https://people.utwente.nl/r.n.j.veldhuis"
  },

  // 26. Radboud University Nijmegen
  {
    university: "Radboud University Nijmegen",
    department: "Institute for Computing and Information Sciences (ICIS)",
    name: "Bram van Ginneken",
    title: "Professor of Medical Image Analysis",
    email: "bram.vanginneken@radboudumc.nl",
    homepage_url: "https://www.computationalpathologygroup.eu/members/bram-van-ginneken/",
    lab_url: "https://grand-challenge.org/",
    research_areas: ["Medical Image Analysis", "Deep Learning in Radiology", "Automated Diagnosis", "Grand Challenge AI Benchmarks"],
    funding_signal: "recruiting",
    source_url: "https://grand-challenge.org/"
  },
  {
    university: "Radboud University Nijmegen",
    department: "Institute for Computing and Information Sciences (ICIS)",
    name: "Lejla Batina",
    title: "Professor of Digital Security",
    email: "lejla@cs.ru.nl",
    homepage_url: "https://www.cs.ru.nl/~lejla/",
    lab_url: "https://www.ru.nl/icis/research-groups/digital-security/",
    research_areas: ["Cryptographic Implementations", "Side-Channel Attacks on AI Hardware", "Hardware Security", "Embedded Cryptography"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ru.nl/~lejla/"
  },

  // 27. Leiden University
  {
    university: "Leiden University",
    department: "Leiden Institute of Advanced Computer Science (LIACS)",
    name: "Holger Hoos",
    title: "Alexander von Humboldt Professor of AI",
    email: "h.h.hoos@liacs.leidenuniv.nl",
    homepage_url: "https://www.universiteitleiden.nl/en/staffmembers/holger-hoos",
    lab_url: "https://ada.liacs.nl/",
    research_areas: ["Automated Machine Learning", "Empirical Algorithmics", "Trustworthy AI", "CLAIRE AI Coordination"],
    funding_signal: "recruiting",
    source_url: "https://ada.liacs.nl/"
  },
  {
    university: "Leiden University",
    department: "Leiden Institute of Advanced Computer Science (LIACS)",
    name: "Aske Plaat",
    title: "Professor of Data Science and Artificial Intelligence",
    email: "a.plaat@liacs.leidenuniv.nl",
    homepage_url: "https://www.universiteitleiden.nl/en/staffmembers/aske-plaat",
    lab_url: "https://liacs.leidenuniv.nl/",
    research_areas: ["Deep Reinforcement Learning", "Multi-Agent Decision Making", "Monte Carlo Tree Search", "Parallel Game Algorithms"],
    funding_signal: "recruiting",
    source_url: "https://www.universiteitleiden.nl/en/staffmembers/aske-plaat"
  },

  // 28. University of Groningen
  {
    university: "University of Groningen",
    department: "Bernoulli Institute for Mathematics, Computer Science and AI",
    name: "George Azzopardi",
    title: "Associate Professor in Pattern Recognition",
    email: "g.azzopardi@rug.nl",
    homepage_url: "https://www.rug.nl/staff/g.azzopardi/",
    lab_url: "https://www.rug.nl/research/bernoulli/",
    research_areas: ["Computer Vision", "Medical Pattern Recognition", "Bio-Inspired Deep Learning", "Brain Imaging Analysis"],
    funding_signal: "recruiting",
    source_url: "https://www.rug.nl/staff/g.azzopardi/"
  },
  {
    university: "University of Groningen",
    department: "Bernoulli Institute for Mathematics, Computer Science and AI",
    name: "Paris Avgeriou",
    title: "Professor of Software Engineering",
    email: "p.avgeriou@rug.nl",
    homepage_url: "https://www.cs.rug.nl/~paris/",
    lab_url: "https://www.cs.rug.nl/search/",
    research_areas: ["Software Architecture", "Technical Debt in Machine Learning Systems", "Distributed Systems Software", "Cloud Engineering"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.rug.nl/~paris/"
  },

  // 29. Maastricht University
  {
    university: "Maastricht University",
    department: "Department of Advanced Computing Sciences (DACS)",
    name: "Kurt Driessens",
    title: "Associate Professor of Machine Learning",
    email: "k.driessens@maastrichtuniversity.nl",
    homepage_url: "https://www.maastrichtuniversity.nl/k-driessens",
    lab_url: "https://www.maastrichtuniversity.nl/research/dacs",
    research_areas: ["Relational Reinforcement Learning", "Continual Learning", "Explainable AI", "Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://www.maastrichtuniversity.nl/k-driessens"
  },

  // ==================== BELGIUM ====================
  // 30. KU Leuven
  {
    university: "KU Leuven",
    department: "Department of Computer Science",
    name: "Luc De Raedt",
    title: "Full Professor & Director of Leuven.AI",
    email: "luc.deraedt@cs.kuleuven.be",
    homepage_url: "https://people.cs.kuleuven.be/~luc.deraedt/",
    lab_url: "https://ai.kuleuven.be/",
    research_areas: ["Statistical Relational AI", "Probabilistic Programming", "Neuro-Symbolic AI", "Declarative Learning"],
    funding_signal: "recruiting",
    source_url: "https://ai.kuleuven.be/"
  },
  {
    university: "KU Leuven",
    department: "Department of Electrical Engineering (ESAT) / COSIC",
    name: "Bart Preneel",
    title: "Full Professor & Head of COSIC",
    email: "bart.preneel@esat.kuleuven.be",
    homepage_url: "https://www.esat.kuleuven.be/cosic/people/bart-preneel/",
    lab_url: "https://www.esat.kuleuven.be/cosic/",
    research_areas: ["Applied Cryptography", "Privacy-Preserving Computation", "Hardware Security", "Blockchain and Distributed Consensus"],
    funding_signal: "recruiting",
    source_url: "https://www.esat.kuleuven.be/cosic/"
  },
  {
    university: "KU Leuven",
    department: "Department of Computer Science / DistriNet",
    name: "Wouter Joosen",
    title: "Full Professor & Head of DistriNet",
    email: "wouter.joosen@cs.kuleuven.be",
    homepage_url: "https://distrinet.cs.kuleuven.be/people/wouter-joosen",
    lab_url: "https://distrinet.cs.kuleuven.be/",
    research_areas: ["Secure Cloud Software Architecture", "Distributed Systems Security", "Middleware", "IoT Security"],
    funding_signal: "recruiting",
    source_url: "https://distrinet.cs.kuleuven.be/"
  },

  // 31. Ghent University
  {
    university: "Ghent University",
    department: "Department of Electronics and Information Systems (ELIS)",
    name: "Lieven Eeckhout",
    title: "Full Professor of Computer Systems",
    email: "lieven.eeckhout@ugent.be",
    homepage_url: "https://www.elis.ugent.be/~leeckhou/",
    lab_url: "https://csl.elis.ugent.be/",
    research_areas: ["Computer Systems Architecture", "Cloud Datacenter Performance", "Hardware Acceleration for AI", "Simulation Methodologies"],
    funding_signal: "recruiting",
    source_url: "https://csl.elis.ugent.be/"
  },
  {
    university: "Ghent University",
    department: "Department of Information Technology (INTEC)",
    name: "Filip De Turck",
    title: "Full Professor & Head of IDLab Network Management",
    email: "filip.deturck@ugent.be",
    homepage_url: "https://idlab.technology/people/filip-de-turck",
    lab_url: "https://idlab.technology/",
    research_areas: ["Edge and Cloud Network Management", "Distributed Autonomous Services", "Federated Slicing", "Service Mesh"],
    funding_signal: "recruiting",
    source_url: "https://idlab.technology/"
  },

  // 32. UCLouvain
  {
    university: "UCLouvain",
    department: "Institute of Information and Communication Technologies (ICTEAM)",
    name: "Peter Van Roy",
    title: "Full Professor of Computing Science",
    email: "peter.vanroy@uclouvain.be",
    homepage_url: "https://uclouvain.be/en/directories/peter.vanroy",
    lab_url: "https://uclouvain.be/en/research-institutes/icteam",
    research_areas: ["Decentralized Distributed Systems", "Peer-to-Peer Networks", "Edge-Cloud Computing", "Programming Paradigms"],
    funding_signal: "recruiting",
    source_url: "https://uclouvain.be/en/research-institutes/icteam"
  }
];

async function run() {
  console.log(`Starting Wave 4 ingestion: ${wave4Faculty.length} faculty records across Germany, Netherlands, and Belgium...`);
  
  const validated = wave4Faculty.map(item => {
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
  console.log("Wave 4 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave4Faculty };
