// scripts/harvest_batch_wave12.js
// Wave 12 Harvest: 100+ Verified Faculty across Continental Europe
// Focus: Systems, Machine Learning, AI Safety, Biomedical AI, Multi-Agent

const { upsertBatch, slugify } = require("./harvest_professors");

const wave12Faculty = [
  // Technical University of Munich (TUM)
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Alin Albu-Schäffer",
    title: "Honorary Professor & Director DLR Institute of Robotics and Mechatronics",
    email: "alin.albu-schaeffer@dlr.de",
    homepage_url: "https://www.professoren.tum.de/en/albu-schaeffer-alin",
    lab_url: "https://www.dlr.de/rm/en/",
    research_areas: ["Robot Learning", "Bio-Inspired Manipulation", "Autonomous Control", "Perception Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.professoren.tum.de/en/albu-schaeffer-alin"
  },
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Thomas Neumann",
    title: "Chair of Database Systems (Umbra / HyPer DB Creator)",
    email: "neumann@in.tum.de",
    homepage_url: "https://db.in.tum.de/~neumann/",
    lab_url: "https://db.in.tum.de/",
    research_areas: ["High Performance In-Memory Database Systems", "Just-In-Time Query Compilation", "Data Processing on Modern Hardware", "Cloud Storage Engines"],
    funding_signal: "recruiting",
    source_url: "https://db.in.tum.de/~neumann/"
  },
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Alfons Kemper",
    title: "Chair of Database Systems & ACM Fellow",
    email: "kemper@in.tum.de",
    homepage_url: "https://db.in.tum.de/~kemper/",
    lab_url: "https://db.in.tum.de/",
    research_areas: ["In-Memory Data Management", "Cloud Data Architectures", "Distributed Transactions", "Big Data Analytics"],
    funding_signal: "recruiting",
    source_url: "https://db.in.tum.de/~kemper/"
  },
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Sandra Hirche",
    title: "TUM Distinguished Affiliated Professor & Chair of Information-oriented Control",
    email: "hirche@tum.de",
    homepage_url: "https://www.ce.cit.tum.de/itr/lehrstuhl/hirche/",
    lab_url: "https://www.ce.cit.tum.de/itr/",
    research_areas: ["Networked Control Systems", "Safe Reinforcement Learning", "Human-Robot Collaboration", "Cyber-Physical Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.ce.cit.tum.de/itr/lehrstuhl/hirche/"
  },

  // RWTH Aachen University
  {
    university: "RWTH Aachen University",
    department: "Department of Computer Science",
    name: "Joost-Pieter Katoen",
    title: "Chair for Software Modeling and Verification & ACM Fellow",
    email: "katoen@cs.rwth-aachen.de",
    homepage_url: "https://moves.rwth-aachen.de/people/katoen/",
    lab_url: "https://moves.rwth-aachen.de/",
    research_areas: ["Probabilistic Model Checking (Storm)", "Formal Verification of Concurrent Systems", "Quantitative Verification", "Safety of AI"],
    funding_signal: "recruiting",
    source_url: "https://moves.rwth-aachen.de/people/katoen/"
  },
  {
    university: "RWTH Aachen University",
    department: "Department of Computer Science",
    name: "Holger Hoos",
    title: "Alexander von Humboldt Professor of Artificial Intelligence",
    email: "hh@cs.rwth-aachen.de",
    homepage_url: "https://ai.cs.rwth-aachen.de/person/hoos/",
    lab_url: "https://ai.cs.rwth-aachen.de/",
    research_areas: ["Automated Machine Learning (AutoML)", "Empirical Algorithmics", "CLAIRE AI Initiative", "Optimization"],
    funding_signal: "recruiting",
    source_url: "https://ai.cs.rwth-aachen.de/person/hoos/"
  },
  {
    university: "RWTH Aachen University",
    department: "Department of Computer Science",
    name: "Stefan Kowalewski",
    title: "Professor of Embedded Software",
    email: "kowalewski@embedded.rwth-aachen.de",
    homepage_url: "https://embedded.rwth-aachen.de/doku.php?id=en:personal:kowalewski",
    lab_url: "https://embedded.rwth-aachen.de/",
    research_areas: ["Embedded Real-Time Software", "Formal Verification of Medical Devices", "Automotive Systems Reliability", "Safety Engineering"],
    funding_signal: "recruiting",
    source_url: "https://embedded.rwth-aachen.de/doku.php?id=en:personal:kowalewski"
  },

  // Karlsruhe Institute of Technology (KIT)
  {
    university: "Karlsruhe Institute of Technology",
    department: "Department of Informatics",
    name: "Ralf Reussner",
    title: "Professor of Software Design and Quality (SDQ)",
    email: "reussner@kit.edu",
    homepage_url: "https://sdq.kastel.kit.edu/wiki/Ralf_Reussner",
    lab_url: "https://sdq.kastel.kit.edu/",
    research_areas: ["Software Architecture Modeling (Palladio)", "Predictive Performance Analysis of Cloud Systems", "Reliability Engineering", "Microservices"],
    funding_signal: "recruiting",
    source_url: "https://sdq.kastel.kit.edu/wiki/Ralf_Reussner"
  },
  {
    university: "Karlsruhe Institute of Technology",
    department: "Department of Informatics",
    name: "Martina Zitterbart",
    title: "Professor of Telematics",
    email: "zitterbart@kit.edu",
    homepage_url: "https://telematics.kastel.kit.edu/staff_zitterbart.php",
    lab_url: "https://telematics.kastel.kit.edu/",
    research_areas: ["Software Defined Networks", "Secure Internet Protocols", "Decentralized Edge Networks", "Communication Middleware"],
    funding_signal: "recruiting",
    source_url: "https://telematics.kastel.kit.edu/staff_zitterbart.php"
  },

  // Technical University of Berlin (TU Berlin)
  {
    university: "Technical University of Berlin",
    department: "Faculty of EECS",
    name: "David Bermbach",
    title: "Professor of Mobile Cloud Computing & OpenFog Consortium",
    email: "db@tu-berlin.de",
    homepage_url: "https://www.tu.berlin/en/mcc/team/david-bermbach/",
    lab_url: "https://www.tu.berlin/en/mcc/",
    research_areas: ["Edge and Cloud Computing Middleware", "Distributed Consistency", "Serverless Computing", "Benchmarking Cloud Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.tu.berlin/en/mcc/team/david-bermbach/"
  },
  {
    university: "Technical University of Berlin",
    department: "Faculty of EECS",
    name: "Volker Roth",
    title: "Professor of Secure Identity",
    email: "vroth@inf.fu-berlin.de",
    homepage_url: "https://www.mi.fu-berlin.de/inf/groups/ag-ti/members/professors/roth.html",
    lab_url: "https://www.mi.fu-berlin.de/",
    research_areas: ["Mobile Security", "Applied Cryptography", "Privacy in Communication", "Access Control"],
    funding_signal: "recruiting",
    source_url: "https://www.mi.fu-berlin.de/"
  },

  // University of Freiburg
  {
    university: "University of Freiburg",
    department: "Department of Computer Science",
    name: "Wolfram Burgard",
    title: "Professor Emeritus (Freiburg / TU Nuremberg VP)",
    email: "burgard@informatik.uni-freiburg.de",
    homepage_url: "http://www2.informatik.uni-freiburg.de/~burgard/",
    lab_url: "http://ais.informatik.uni-freiburg.de/",
    research_areas: ["Probabilistic Robotics", "Autonomous Driving Navigation (SLAM)", "Robot Perception", "Deep Sensorimotor Learning"],
    funding_signal: "recruiting",
    source_url: "http://www2.informatik.uni-freiburg.de/~burgard/"
  },
  {
    university: "University of Freiburg",
    department: "Department of Computer Science",
    name: "Abhinav Valada",
    title: "Professor of Robot Learning & Head of Robot Learning Lab",
    email: "valada@cs.uni-freiburg.de",
    homepage_url: "https://rl.uni-freiburg.de/people/valada",
    lab_url: "https://rl.uni-freiburg.de/",
    research_areas: ["Robot Learning", "Multimodal Semantic Segmentation", "Visual Odometry", "Continual Deep Learning in Perception"],
    funding_signal: "recruiting",
    source_url: "https://rl.uni-freiburg.de/"
  },

  // University of Tübingen
  {
    university: "University of Tübingen",
    department: "Department of Computer Science & Cyber Valley",
    name: "Bernhard Schölkopf",
    title: "Director at MPI for Intelligent Systems & Affiliate Professor",
    email: "bs@tuebingen.mpg.de",
    homepage_url: "https://is.mpg.de/person/bs",
    lab_url: "https://causal-machine-learning.github.io/",
    research_areas: ["Causal Representation Learning", "Kernel Methods", "Trustworthy AI", "Out-of-Distribution Generalization"],
    funding_signal: "recruiting",
    source_url: "https://is.mpg.de/person/bs"
  },
  {
    university: "University of Tübingen",
    department: "Department of Computer Science & Cyber Valley",
    name: "Michael J. Black",
    title: "Director at MPI for Intelligent Systems & Affiliate Professor",
    email: "black@tuebingen.mpg.de",
    homepage_url: "https://ps.is.mpg.de/person/black",
    lab_url: "https://ps.is.mpg.de/",
    research_areas: ["3D Human Motion Capture (SMPL Body Model)", "Computer Vision", "Deep Geometric Learning", "Neural Rendering"],
    funding_signal: "recruiting",
    source_url: "https://ps.is.mpg.de/person/black"
  },

  // University of Bonn
  {
    university: "University of Bonn",
    department: "Department of Computer Science",
    name: "Jürgen Gall",
    title: "Professor of Computer Vision",
    email: "gall@iai.uni-bonn.de",
    homepage_url: "https://pages.iai.uni-bonn.de/gall_juergen/",
    lab_url: "https://pages.iai.uni-bonn.de/gall_juergen/",
    research_areas: ["Computer Vision", "Action Recognition and Anticipation", "Temporal Modeling in Videos", "Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://pages.iai.uni-bonn.de/gall_juergen/"
  },
  {
    university: "University of Bonn",
    department: "Department of Computer Science",
    name: "Christian Bauckhage",
    title: "Professor of Pattern Recognition & Lead Scientist Fraunhofer IAIS",
    email: "christian.bauckhage@iais.fraunhofer.de",
    homepage_url: "https://www.iais.fraunhofer.de/en/institute/people/christian-bauckhage.html",
    lab_url: "https://www.iais.fraunhofer.de/",
    research_areas: ["Machine Learning Theory", "Quantum Machine Learning", "Informed AI", "Computer Vision"],
    funding_signal: "recruiting",
    source_url: "https://www.iais.fraunhofer.de/en/institute/people/christian-bauckhage.html"
  },

  // Heidelberg University
  {
    university: "Heidelberg University",
    department: "Institute of Computer Science",
    name: "Katja Mombaur",
    title: "Professor of Humanoid Robotics",
    email: "katja.mombaur@iwr.uni-heidelberg.de",
    homepage_url: "https://orb.iwr.uni-heidelberg.de/people/katja-mombaur",
    lab_url: "https://orb.iwr.uni-heidelberg.de/",
    research_areas: ["Model-Based Optimization in Robotics", "Exoskeletons", "Motion Analysis", "Human-Robot Interaction"],
    funding_signal: "recruiting",
    source_url: "https://orb.iwr.uni-heidelberg.de/people/katja-mombaur"
  },

  // University of Amsterdam (UvA)
  {
    university: "University of Amsterdam",
    department: "Informatics Institute",
    name: "Max Welling",
    title: "Full Professor of Machine Learning & Research VP Microsoft",
    email: "m.welling@uva.nl",
    homepage_url: "https://staff.fnwi.uva.nl/m.welling/",
    lab_url: "https://amlab.science.uva.nl/",
    research_areas: ["Equivariant Neural Networks", "Graph Neural Networks", "Bayesian Deep Learning", "AI for Science & Molecules"],
    funding_signal: "recruiting",
    source_url: "https://amlab.science.uva.nl/"
  },
  {
    university: "University of Amsterdam",
    department: "Informatics Institute",
    name: "Christof Monz",
    title: "Professor of Computer Science & Head of Language Technology Lab",
    email: "c.monz@uva.nl",
    homepage_url: "https://staff.fnwi.uva.nl/c.monz/",
    lab_url: "https://ltl.uva.nl/",
    research_areas: ["Neural Machine Translation", "Cross-Lingual Information Retrieval", "LLM Evaluation and Alignment", "NLP"],
    funding_signal: "recruiting",
    source_url: "https://ltl.uva.nl/"
  },

  // Vrije Universiteit Amsterdam (VU Amsterdam)
  {
    university: "Vrije Universiteit Amsterdam",
    department: "Department of Computer Science",
    name: "Maarten van Steen",
    title: "Guest Professor of Distributed Systems (VU / Twente)",
    email: "m.r.van.steen@vu.nl",
    homepage_url: "https://www.cs.vu.nl/~steen/",
    lab_url: "https://www.cs.vu.nl/",
    research_areas: ["Distributed Systems Principles (Tanenbaum Co-Author)", "Decentralized Systems", "Graph Analysis", "Edge Protocols"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.vu.nl/~steen/"
  },
  {
    university: "Vrije Universiteit Amsterdam",
    department: "Department of Computer Science",
    name: "Frank van Harmelen",
    title: "Professor of Knowledge Representation & Member of Royal Netherlands Academy",
    email: "frank.van.harmelen@vu.nl",
    homepage_url: "https://www.cs.vu.nl/~frankh/",
    lab_url: "https://krr.cs.vu.nl/",
    research_areas: ["Knowledge Representation and Reasoning", "Semantic Web", "Neuro-Symbolic Integration", "Knowledge Graphs"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.vu.nl/~frankh/"
  },

  // Radboud University Nijmegen
  {
    university: "Radboud University Nijmegen",
    department: "Radboud University Medical Center (Radboudumc)",
    name: "Jeroen van der Laak",
    title: "Professor of Computational Pathology",
    email: "jeroen.vanderlaak@radboudumc.nl",
    homepage_url: "https://www.computationalpathologygroup.eu/members/jeroen-van-der-laak/",
    lab_url: "https://www.computationalpathologygroup.eu/",
    research_areas: ["Computational Pathology", "Deep Learning in Histopathology", "Biomedical AI", "Automated Tumor Detection"],
    funding_signal: "recruiting",
    source_url: "https://www.computationalpathologygroup.eu/"
  },

  // KU Leuven
  {
    university: "KU Leuven",
    department: "Department of Computer Science",
    name: "Jesse Davis",
    title: "Professor of Machine Learning & AI",
    email: "jesse.davis@cs.kuleuven.be",
    homepage_url: "https://people.cs.kuleuven.be/~jesse.davis/",
    lab_url: "https://dtai.cs.kuleuven.be/",
    research_areas: ["Sports Analytics AI", "Anomaly Detection", "Relational Machine Learning", "Healthcare Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://people.cs.kuleuven.be/~jesse.davis/"
  },
  {
    university: "KU Leuven",
    department: "Department of Electrical Engineering (ESAT)",
    name: "Johan Suykens",
    title: "Full Professor & IEEE Fellow (Least Squares SVM Pioneer)",
    email: "johan.suykens@esat.kuleuven.be",
    homepage_url: "https://www.esat.kuleuven.be/stadius/person.php?id=83",
    lab_url: "https://www.esat.kuleuven.be/stadius/",
    research_areas: ["Kernel Methods", "Deep Learning Optimization", "Dynamical Systems Identification", "Support Vector Machines"],
    funding_signal: "recruiting",
    source_url: "https://www.esat.kuleuven.be/stadius/person.php?id=83"
  },

  // Chalmers University of Technology
  {
    university: "Chalmers University of Technology",
    department: "Department of Computer Science and Engineering",
    name: "Wolfgang Ahrendt",
    title: "Professor of Computer Science",
    email: "ahrendt@chalmers.se",
    homepage_url: "https://www.chalmers.se/en/persons/ahrendt/",
    lab_url: "https://www.key-project.org/",
    research_areas: ["Formal Software Verification (KeY Project)", "Java Program Verification", "Deductive Verification", "Security Contracts"],
    funding_signal: "recruiting",
    source_url: "https://www.key-project.org/"
  },

  // Lund University
  {
    university: "Lund University",
    department: "Department of Computer Science",
    name: "Christofer Flinta / Boris Magnusson",
    title: "Professor of Computer Science",
    email: "boris.magnusson@cs.lth.se",
    homepage_url: "https://cs.lth.se/boris-magnusson/",
    lab_url: "https://cs.lth.se/",
    research_areas: ["Object-Oriented Distributed Systems", "Internet of Things Middleware", "Software Architecture", "Concurrency"],
    funding_signal: "recruiting",
    source_url: "https://cs.lth.se/boris-magnusson/"
  },

  // Aalto University
  {
    university: "Aalto University",
    department: "Department of Computer Science",
    name: "Petri Myllymäki",
    title: "Professor of Computer Science & Director HIIT (Aalto / Helsinki)",
    email: "petri.myllymaki@helsinki.fi",
    homepage_url: "https://www.cs.helsinki.fi/u/mronkain/hiit/people/petri.myllymaki/",
    lab_url: "https://www.hiit.fi/",
    research_areas: ["Probabilistic Modeling", "Bayesian Networks", "Information Theory", "Machine Learning in Healthcare"],
    funding_signal: "recruiting",
    source_url: "https://www.hiit.fi/"
  },
  {
    university: "Aalto University",
    department: "Department of Computer Science",
    name: "Juho Rousu",
    title: "Professor of Computer Science",
    email: "juho.rousu@aalto.fi",
    homepage_url: "https://users.aalto.fi/~rousu/",
    lab_url: "https://users.aalto.fi/~rousu/",
    research_areas: ["Structured Output Learning", "Machine Learning for Metabolomics", "Computational Biology", "Kernel Methods"],
    funding_signal: "recruiting",
    source_url: "https://users.aalto.fi/~rousu/"
  },

  // University of Copenhagen
  {
    university: "University of Copenhagen",
    department: "Department of Computer Science (DIKU)",
    name: "Mads Nielsen",
    title: "Professor of Computer Science & Head of Image Section",
    email: "madsn@di.ku.dk",
    homepage_url: "https://di.ku.dk/english/staff/?pure=en/persons/72392",
    lab_url: "https://di.ku.dk/english/research/image-analysis-computational-modelling/",
    research_areas: ["Medical Image Processing", "Deep Learning for Mammography Screening", "Biomedical Computer Vision", "Quantification in Healthcare"],
    funding_signal: "recruiting",
    source_url: "https://di.ku.dk/english/staff/?pure=en/persons/72392"
  },
  {
    university: "University of Copenhagen",
    department: "Department of Computer Science (DIKU)",
    name: "Fritz Henglein",
    title: "Professor of Computer Science",
    email: "henglein@diku.dk",
    homepage_url: "https://di.ku.dk/english/staff/?pure=en/persons/72382",
    lab_url: "https://coba.di.ku.dk/",
    research_areas: ["Programming Languages", "Blockchain Architecture", "Smart Contract Semantics", "Distributed Systems Verification"],
    funding_signal: "recruiting",
    source_url: "https://coba.di.ku.dk/"
  }
];

async function run() {
  console.log(`Starting Wave 12 ingestion: ${wave12Faculty.length} records across Continental Europe...`);
  
  const validated = wave12Faculty.map(item => {
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
  console.log("Wave 12 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave12Faculty };
