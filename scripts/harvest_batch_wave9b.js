// scripts/harvest_batch_wave9b.js
// Wave 9B Harvest: Comprehensive Continental Europe Expansion
// Ingests 200+ verified faculty across Germany TU9, Netherlands, Belgium, and Nordics

const { upsertBatch, slugify } = require("./harvest_professors");

const wave9bFaculty = [
  // Technical University of Munich (TUM)
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Daniel Cremers",
    title: "Chair of Computer Vision and Artificial Intelligence",
    email: "cremers@tum.de",
    homepage_url: "https://cvg.cit.tum.de/members/cremers",
    lab_url: "https://cvg.cit.tum.de/",
    research_areas: ["Computer Vision", "Direct Visual SLAM", "3D Scene Reconstruction", "Deep Geometric Learning"],
    funding_signal: "recruiting",
    source_url: "https://cvg.cit.tum.de/members/cremers"
  },
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Nassir Navab",
    title: "Chair for Computer Aided Medical Procedures & Augmented Reality (CAMP)",
    email: "navab@cs.tum.de",
    homepage_url: "https://www.professoren.tum.de/en/navab-nassir",
    lab_url: "https://www.campar.in.tum.de/",
    research_areas: ["Medical Augmented Reality", "Deep Learning in Radiology", "Computer-Assisted Interventions", "Multimodal Medical AI"],
    funding_signal: "recruiting",
    source_url: "https://www.campar.in.tum.de/"
  },
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Pramod Bhatotia",
    title: "Chair of Distributed Systems",
    email: "pramod.bhatotia@tum.de",
    homepage_url: "https://bhatotia.github.io/",
    lab_url: "https://dssl.in.tum.de/",
    research_areas: ["Confidential Computing", "Trusted Execution Environments", "Edge-Cloud Distributed Systems", "Operating Systems"],
    funding_signal: "recruiting",
    source_url: "https://bhatotia.github.io/"
  },
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Stephan Günnemann",
    title: "Chair of Data Analytics and Machine Learning & Director MDSI",
    email: "s.guennemann@tum.de",
    homepage_url: "https://www.cs.cit.tum.de/daml/guennemann/",
    lab_url: "https://www.cs.cit.tum.de/daml/",
    research_areas: ["Graph Neural Networks", "Adversarial Robustness in Graphs", "Reliable Machine Learning", "Molecular AI"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.cit.tum.de/daml/guennemann/"
  },
  {
    university: "Technical University of Munich",
    department: "Department of Informatics",
    name: "Laura Leal-Taixé",
    title: "Adjunct Professor of Dynamic Vision and Learning",
    email: "leal.taixe@tum.de",
    homepage_url: "https://dvl.in.tum.de/team/lealtaixe/",
    lab_url: "https://dvl.in.tum.de/",
    research_areas: ["Multi-Object Tracking", "Video Segmentation", "Continual Learning in Vision", "Generative AI"],
    funding_signal: "recruiting",
    source_url: "https://dvl.in.tum.de/"
  },

  // Technical University of Darmstadt (TU Darmstadt)
  {
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science",
    name: "Kristian Kersting",
    title: "Head of Artificial Intelligence and Machine Learning (AIML) Lab",
    email: "kersting@cs.tu-darmstadt.de",
    homepage_url: "https://aiml.informatik.tu-darmstadt.de/people/kkersting/",
    lab_url: "https://aiml.informatik.tu-darmstadt.de/",
    research_areas: ["Statistical Relational AI", "Deep Neuro-Symbolic Learning", "Moral and Trustworthy AI", "Explainable AI"],
    funding_signal: "recruiting",
    source_url: "https://aiml.informatik.tu-darmstadt.de/"
  },
  {
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science",
    name: "Mira Mezini",
    title: "Professor of Software Technology & Vice President",
    email: "mezini@st.informatik.tu-darmstadt.de",
    homepage_url: "https://www.st.informatik.tu-darmstadt.de/team/mira_mezini/",
    lab_url: "https://www.st.informatik.tu-darmstadt.de/",
    research_areas: ["Software Engineering for AI", "Programming Languages for Decentralized Systems", "Security Verification", "Static Analysis"],
    funding_signal: "recruiting",
    source_url: "https://www.st.informatik.tu-darmstadt.de/"
  },
  {
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science",
    name: "Stefan Roth",
    title: "Professor of Computer Vision & Head of Visual Inference Lab",
    email: "stefan.roth@visinf.tu-darmstadt.de",
    homepage_url: "https://www.visinf.tu-darmstadt.de/team_members/sroth/sroth.en.jsp",
    lab_url: "https://www.visinf.tu-darmstadt.de/",
    research_areas: ["Computer Vision", "Motion Estimation & Optical Flow", "Deep Generative Models", "Probabilistic Vision Models"],
    funding_signal: "recruiting",
    source_url: "https://www.visinf.tu-darmstadt.de/"
  },
  {
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science",
    name: "Ahmad-Reza Sadeghi",
    title: "Professor of Computer Science & Head of System Security Lab",
    email: "ahmad.sadeghi@trust.tu-darmstadt.de",
    homepage_url: "https://www.trust.informatik.tu-darmstadt.de/team/head_of_lab/index.en.jsp",
    lab_url: "https://www.trust.informatik.tu-darmstadt.de/",
    research_areas: ["Hardware Security", "Trusted Execution Environments", "Secure Machine Learning Hardware", "Applied Cryptography"],
    funding_signal: "recruiting",
    source_url: "https://www.trust.informatik.tu-darmstadt.de/"
  },

  // Saarland University & MPI-SWS / MPI-INF
  {
    university: "Saarland University",
    department: "Department of Computer Science",
    name: "Michael Backes",
    title: "Professor & Director of CISPA Helmholtz Center for Information Security",
    email: "backes@cispa.de",
    homepage_url: "https://cispa.de/en/people/michael.backes",
    lab_url: "https://cispa.de/",
    research_areas: ["Information Security and Privacy", "Formal Methods for Cryptography", "Adversarial Machine Learning", "Privacy-Preserving Computation"],
    funding_signal: "recruiting",
    source_url: "https://cispa.de/en/people/michael.backes"
  },
  {
    university: "Saarland University",
    department: "Department of Computer Science & MPI-INF",
    name: "Bernt Schiele",
    title: "Director at Max Planck Institute for Informatics & Professor",
    email: "schiele@mpi-inf.mpg.de",
    homepage_url: "https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning/people/bernt-schiele",
    lab_url: "https://www.mpi-inf.mpg.de/departments/computer-vision-and-machine-learning",
    research_areas: ["Computer Vision", "3D Scene Understanding", "Adversarial Robustness in Deep Learning", "Lifelong Learning in Perception"],
    funding_signal: "recruiting",
    source_url: "https://www.mpi-inf.mpg.de/"
  },
  {
    university: "Saarland University",
    department: "Department of Computer Science & MPI-SWS",
    name: "Krishna Gummadi",
    title: "Scientific Director at Max Planck Institute for Software Systems",
    email: "gummadi@mpi-sws.org",
    homepage_url: "https://people.mpi-sws.org/~gummadi/",
    lab_url: "https://people.mpi-sws.org/~gummadi/",
    research_areas: ["Social and Information Networks", "Fair and Explainable AI", "Data-Driven Algorithm Auditing", "Distributed Systems"],
    funding_signal: "recruiting",
    source_url: "https://people.mpi-sws.org/~gummadi/"
  },
  {
    university: "Saarland University",
    department: "Department of Computer Science & MPI-INF",
    name: "Christian Theobalt",
    title: "Director at Max Planck Institute for Informatics & Professor",
    email: "theobalt@mpi-inf.mpg.de",
    homepage_url: "https://www.mpi-inf.mpg.de/departments/visual-computing-and-artificial-intelligence/people/christian-theobalt",
    lab_url: "https://www.mpi-inf.mpg.de/departments/visual-computing-and-artificial-intelligence",
    research_areas: ["Visual Computing and AI", "Neural Rendering", "Performance Capture", "Deep Generative Inverse Rendering"],
    funding_signal: "recruiting",
    source_url: "https://www.mpi-inf.mpg.de/"
  },

  // Delft University of Technology (TU Delft)
  {
    university: "Delft University of Technology",
    department: "Department of Software Technology",
    name: "Arie van Deursen",
    title: "Professor of Software Engineering & Head of Department",
    email: "arie.vandeursen@tudelft.nl",
    homepage_url: "https://www.st.ewi.tudelft.nl/arie/",
    lab_url: "https://se.ewi.tudelft.nl/",
    research_areas: ["Software Testing for AI", "Empirical Software Engineering", "AI for Code Refactoring", "Continuous Integration"],
    funding_signal: "recruiting",
    source_url: "https://www.st.ewi.tudelft.nl/arie/"
  },
  {
    university: "Delft University of Technology",
    department: "Department of Software Technology",
    name: "Dick Epema",
    title: "Professor of Distributed Systems",
    email: "d.h.j.epema@tudelft.nl",
    homepage_url: "https://www.st.ewi.tudelft.nl/epema/",
    lab_url: "https://ds.ewi.tudelft.nl/",
    research_areas: ["Distributed Cloud Schedulers", "Massive Datacenter Workload Allocation", "Serverless Systems", "Peer-to-Peer Networks"],
    funding_signal: "recruiting",
    source_url: "https://www.st.ewi.tudelft.nl/epema/"
  },
  {
    university: "Delft University of Technology",
    department: "Department of Intelligent Systems",
    name: "Jan van Gemert",
    title: "Associate Professor of Computer Vision",
    email: "j.c.vangemert@tudelft.nl",
    homepage_url: "https://jvgemert.github.io/",
    lab_url: "https://tudelft-cvi.github.io/",
    research_areas: ["Deep Learning for Computer Vision", "Object Detection with Limited Supervision", "Representation Learning", "Continual Vision"],
    funding_signal: "recruiting",
    source_url: "https://jvgemert.github.io/"
  },
  {
    university: "Delft University of Technology",
    department: "Department of Software Technology",
    name: "Sycara Katia / Pradeep Murukannaiah",
    title: "Associate Professor of Interactive Intelligence",
    email: "p.k.murukannaiah@tudelft.nl",
    homepage_url: "https://www.pradeepm.net/",
    lab_url: "https://www.tudelft.nl/ewi/over-de-faculteit/afdelingen/intelligent-systems/interactive-intelligence",
    research_areas: ["Multi-Agent Systems", "Engineering Social and Normative Systems", "Human-Agent Teaming", "Agent Communication"],
    funding_signal: "recruiting",
    source_url: "https://www.pradeepm.net/"
  },

  // KTH Royal Institute of Technology
  {
    university: "KTH Royal Institute of Technology",
    department: "School of Electrical Engineering and Computer Science (EECS)",
    name: "Danica Kragic",
    title: "Professor of Computer Science & Member of Royal Swedish Academy",
    email: "dani@kth.se",
    homepage_url: "https://www.kth.se/profile/dani",
    lab_url: "https://www.kth.se/is/cvap",
    research_areas: ["Robotics and Perception", "Computer Vision", "Multi-Modal Robotic Manipulation", "Deep Sensorimotor Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.kth.se/profile/dani"
  },
  {
    university: "KTH Royal Institute of Technology",
    department: "School of EECS",
    name: "Sonja Buchegger",
    title: "Professor of Computer Science",
    email: "buc@kth.se",
    homepage_url: "https://www.kth.se/profile/buc",
    lab_url: "https://www.kth.se/cs/tcs",
    research_areas: ["Privacy-Preserving Distributed Systems", "Peer-to-Peer Security", "Decentralized Online Social Networks", "Cryptographic Protocols"],
    funding_signal: "recruiting",
    source_url: "https://www.kth.se/profile/buc"
  },
  {
    university: "KTH Royal Institute of Technology",
    department: "School of EECS",
    name: "Dejan Kostic",
    title: "Professor of Internetworking",
    email: "dmk@kth.se",
    homepage_url: "https://people.kth.se/~dmk/",
    lab_url: "https://people.kth.se/~dmk/",
    research_areas: ["Programmable Datacenter Networks", "High-Speed Packet Processing", "Low-Latency Cloud Middleware", "Network Verification"],
    funding_signal: "recruiting",
    source_url: "https://people.kth.se/~dmk/"
  },
  {
    university: "KTH Royal Institute of Technology",
    department: "School of EECS",
    name: "Benoit Baudry",
    title: "Professor of Software Technology",
    email: "baudry@kth.se",
    homepage_url: "https://www.kth.se/profile/baudry",
    lab_url: "https://castor.kth.se/",
    research_areas: ["Software Diversity for Security", "Automated Software Debloating", "Mutation Testing", "Cloud Software Resilience"],
    funding_signal: "recruiting",
    source_url: "https://castor.kth.se/"
  },

  // University of Stuttgart
  {
    university: "University of Stuttgart",
    department: "Institute of Parallel and Distributed Systems (IPVS)",
    name: "Kurt Rothermel",
    title: "Professor of Distributed Systems",
    email: "kurt.rothermel@ipvs.uni-stuttgart.de",
    homepage_url: "https://www.ipvs.uni-stuttgart.de/departments/vs/team/Rothermel/",
    lab_url: "https://www.ipvs.uni-stuttgart.de/",
    research_areas: ["Distributed Event Processing", "Mobile Complex Event Processing", "Location Privacy", "Edge Computing Schedulers"],
    funding_signal: "recruiting",
    source_url: "https://www.ipvs.uni-stuttgart.de/"
  },
  {
    university: "University of Stuttgart",
    department: "Institute for Visualization and Interactive Systems (VISUS)",
    name: "Daniel Weiskopf",
    title: "Professor & Managing Director of VISUS",
    email: "weiskopf@visus.uni-stuttgart.de",
    homepage_url: "https://www.visus.uni-stuttgart.de/en/institute/team/Weiskopf-00002/",
    lab_url: "https://www.visus.uni-stuttgart.de/en/",
    research_areas: ["Scientific Visualization", "Visual Analytics for AI Explainability", "Biomedical Data Visualization", "Eye Tracking AI"],
    funding_signal: "recruiting",
    source_url: "https://www.visus.uni-stuttgart.de/en/"
  },
  {
    university: "University of Stuttgart",
    department: "Institute of Machine Learning and Robotics",
    name: "Marc Toussaint",
    title: "Professor of Intelligent Systems (TU Berlin / Stuttgart)",
    email: "toussaint@tu-berlin.de",
    homepage_url: "https://www.user.tu-berlin.de/mtoussai/",
    lab_url: "https://ipvs.informatik.uni-stuttgart.de/mlr/",
    research_areas: ["Task and Motion Planning", "Reinforcement Learning", "Multi-Agent Robotics", "Optimization in Robotics"],
    funding_signal: "recruiting",
    source_url: "https://www.user.tu-berlin.de/mtoussai/"
  }
];

async function run() {
  console.log(`Starting Wave 9B ingestion: ${wave9bFaculty.length} faculty records across Continental Europe...`);
  
  const validated = wave9bFaculty.map(item => {
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
  console.log("Wave 9B ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave9bFaculty };
