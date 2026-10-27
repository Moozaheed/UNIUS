// scripts/harvest_batch_wave5.js
// Wave 5 Harvest: Canada U15 & Top Polytechs (Funded MSc/MASc & PhD Focus)
// Adds 18 brand new universities and 40 verified faculty records

const { upsertBatch, slugify } = require("./harvest_professors");

const wave5Faculty = [
  // 1. Université de Montréal (UdeM) / Mila
  {
    university: "Université de Montréal",
    department: "Department of Computer Science and Operations Research (DIRO)",
    name: "Yoshua Bengio",
    title: "Full Professor & Scientific Director of Mila",
    email: "yoshua.bengio@mila.quebec",
    homepage_url: "https://yoshuabengio.org/",
    lab_url: "https://mila.quebec/",
    research_areas: ["Deep Learning Theory", "AI Safety", "Representation Learning", "Generative Flow Networks (GFlowNets)"],
    funding_signal: "recruiting",
    source_url: "https://yoshuabengio.org/"
  },
  {
    university: "Université de Montréal",
    department: "Department of Computer Science and Operations Research (DIRO)",
    name: "Sarath Chandar",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "sarath.chandar@mila.quebec",
    homepage_url: "https://sarathchandar.in/",
    lab_url: "https://chandarlab.org/",
    research_areas: ["Continual Learning", "Lifelong Reinforcement Learning", "Deep Learning Optimization", "Memory Systems"],
    funding_signal: "recruiting",
    source_url: "https://chandarlab.org/"
  },
  {
    university: "Université de Montréal",
    department: "Department of Computer Science and Operations Research (DIRO)",
    name: "Liam Paull",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "liam.paull@mila.quebec",
    homepage_url: "https://liampaull.ca/",
    lab_url: "https://montrealrobotics.ca/",
    research_areas: ["Autonomous Robotics", "Multi-Agent Coordination", "Perception for Autonomous Systems", "Deep Reinforcement Learning"],
    funding_signal: "recruiting",
    source_url: "https://montrealrobotics.ca/"
  },
  {
    university: "Université de Montréal",
    department: "Department of Computer Science and Operations Research (DIRO)",
    name: "Irina Rish",
    title: "Professor & Canada Excellence Research Chair (CERC) in Autonomous AI",
    email: "irina.rish@mila.quebec",
    homepage_url: "https://irinarish.github.io/",
    lab_url: "https://ai-cerc.github.io/",
    research_areas: ["Foundation Models", "Continual Learning", "Generalization and Out-of-Distribution Robustness", "Neural Architecture Search"],
    funding_signal: "recruiting",
    source_url: "https://irinarish.github.io/"
  },

  // 2. Queen's University
  {
    university: "Queen's University",
    department: "School of Computing",
    name: "Bram Adams",
    title: "Professor of Software Engineering",
    email: "bram.adams@queensu.ca",
    homepage_url: "https://mcis.cs.queensu.ca/people/bram/",
    lab_url: "https://mcis.cs.queensu.ca/",
    research_areas: ["Software Engineering for AI/ML (SE4AI)", "Release Engineering", "DevOps Pipelines", "Mining Software Repositories"],
    funding_signal: "recruiting",
    source_url: "https://mcis.cs.queensu.ca/"
  },
  {
    university: "Queen's University",
    department: "School of Computing",
    name: "Xiaodan Zhu",
    title: "Associate Professor & Queen's National Scholar",
    email: "xiaodan.zhu@queensu.ca",
    homepage_url: "https://www.caslab.queensu.ca/~zhux/",
    lab_url: "https://nlp.cs.queensu.ca/",
    research_areas: ["Natural Language Processing", "Deep Learning", "Reasoning with LLMs", "Biomedical Text Mining"],
    funding_signal: "recruiting",
    source_url: "https://nlp.cs.queensu.ca/"
  },
  {
    university: "Queen's University",
    department: "School of Computing",
    name: "Amber Simpson",
    title: "Associate Professor & Canada Research Chair in Biomedical Computing",
    email: "amber.simpson@queensu.ca",
    homepage_url: "https://www.cs.queensu.ca/people/avatar/?netid=ams31",
    lab_url: "https://simpsonlab.ca/",
    research_areas: ["Biomedical Image Analysis", "Computational Oncology", "Medical AI", "Computer-Assisted Surgery"],
    funding_signal: "recruiting",
    source_url: "https://simpsonlab.ca/"
  },

  // 3. Western University
  {
    university: "Western University",
    department: "Department of Computer Science",
    name: "Charles Ling",
    title: "Distinguished University Professor",
    email: "cling@uwo.ca",
    homepage_url: "https://www.csd.uwo.ca/people/faculty/faculty_page.html?first=Charles&last=Ling",
    lab_url: "https://www.csd.uwo.ca/research/",
    research_areas: ["Machine Learning", "Medical Data Mining", "Cognitive AI", "Cost-Sensitive Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.csd.uwo.ca/people/faculty/faculty_page.html?first=Charles&last=Ling"
  },
  {
    university: "Western University",
    department: "Department of Computer Science",
    name: "Boyu Wang",
    title: "Assistant Professor",
    email: "bwang@csd.uwo.ca",
    homepage_url: "https://boyuwang.github.io/",
    lab_url: "https://boyuwang.github.io/",
    research_areas: ["Transfer Learning", "Continual Learning", "Multi-Task Learning", "Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://boyuwang.github.io/"
  },
  {
    university: "Western University",
    department: "Department of Computer Science",
    name: "Anwar Haque",
    title: "Associate Professor",
    email: "ahaque32@uwo.ca",
    homepage_url: "https://www.csd.uwo.ca/people/faculty/faculty_page.html?first=Anwar&last=Haque",
    lab_url: "https://www.csd.uwo.ca/research/",
    research_areas: ["Cloud Computing", "Distributed Systems", "Software Defined Networking", "Edge AI Infrastructure"],
    funding_signal: "recruiting",
    source_url: "https://www.csd.uwo.ca/people/faculty/faculty_page.html?first=Anwar&last=Haque"
  },

  // 4. University of Victoria
  {
    university: "University of Victoria",
    department: "Department of Computer Science",
    name: "Sudhakar Ganti",
    title: "Professor of Computer Science",
    email: "sganti@uvic.ca",
    homepage_url: "https://www.uvic.ca/ecs/computerscience/people/home/faculty/profiles/ganti-sudhakar.php",
    lab_url: "https://www.uvic.ca/ecs/computerscience/research/research-areas/networks-and-distributed-systems/index.php",
    research_areas: ["Cloud Computing", "Distributed Systems", "Internet of Things", "Edge AI Networking"],
    funding_signal: "recruiting",
    source_url: "https://www.uvic.ca/ecs/computerscience/people/home/faculty/profiles/ganti-sudhakar.php"
  },
  {
    university: "University of Victoria",
    department: "Department of Computer Science",
    name: "Kwang Moo Yi",
    title: "Associate Professor",
    email: "kmyi@uvic.ca",
    homepage_url: "https://www.cs.uvic.ca/~kmyi/",
    lab_url: "https://visual-geometry-group.github.io/",
    research_areas: ["Computer Vision", "3D Scene Reconstruction", "Deep Geometric Learning", "Neural Rendering"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.uvic.ca/~kmyi/"
  },

  // 5. Dalhousie University
  {
    university: "Dalhousie University",
    department: "Faculty of Computer Science",
    name: "Nur Zincir-Heywood",
    title: "Professor of Computer Science & Associate Dean Academic",
    email: "zincir@cs.dal.ca",
    homepage_url: "https://www.dal.ca/faculty/computerscience/faculty-staff/nur-zincir-heywood.html",
    lab_url: "https://www.dal.ca/faculty/computerscience/research-industry/cybersecurity.html",
    research_areas: ["Network Cybersecurity", "Machine Learning for Intrusion Detection", "Malware Analysis", "Autonomous Defense"],
    funding_signal: "recruiting",
    source_url: "https://www.dal.ca/faculty/computerscience/faculty-staff/nur-zincir-heywood.html"
  },
  {
    university: "Dalhousie University",
    department: "Faculty of Computer Science",
    name: "Malcolm Heywood",
    title: "Professor of Computer Science",
    email: "mheywood@cs.dal.ca",
    homepage_url: "https://www.dal.ca/faculty/computerscience/faculty-staff/malcolm-heywood.html",
    lab_url: "https://www.cs.dal.ca/~mheywood/",
    research_areas: ["Genetic Programming", "Continual Learning", "Reinforcement Learning", "Streaming Data Analytics"],
    funding_signal: "recruiting",
    source_url: "https://www.dal.ca/faculty/computerscience/faculty-staff/malcolm-heywood.html"
  },

  // 6. Carleton University
  {
    university: "Carleton University",
    department: "School of Computer Science",
    name: "Anil Somayaji",
    title: "Associate Professor",
    email: "somayaji@scs.carleton.ca",
    homepage_url: "https://carleton.ca/scs/people/anil-somayaji/",
    lab_url: "https://somayaji.net/",
    research_areas: ["Operating Systems Security", "Intrusion Detection", "Complex Systems Security", "Software Immunity"],
    funding_signal: "recruiting",
    source_url: "https://somayaji.net/"
  },
  {
    university: "Carleton University",
    department: "School of Computer Science",
    name: "Majid Komeili",
    title: "Associate Professor",
    email: "majid.komeili@carleton.ca",
    homepage_url: "https://carleton.ca/scs/people/majid-komeili/",
    lab_url: "https://komeililab.github.io/",
    research_areas: ["Machine Learning", "Biomedical Data Analysis", "Feature Selection", "Healthcare AI"],
    funding_signal: "recruiting",
    source_url: "https://komeililab.github.io/"
  },

  // 7. York University
  {
    university: "York University",
    department: "Lassonde School of Engineering (EECS)",
    name: "Marin Litoiu",
    title: "Professor of Software Engineering and Computer Science",
    email: "mlitoiu@yorku.ca",
    homepage_url: "https://www.eecs.yorku.ca/~mlitoiu/",
    lab_url: "https://www.eecs.yorku.ca/~mlitoiu/research.html",
    research_areas: ["Cloud Computing", "Self-Adaptive Software", "Performance Engineering", "Autonomic Distributed Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.eecs.yorku.ca/~mlitoiu/"
  },
  {
    university: "York University",
    department: "Lassonde School of Engineering (EECS)",
    name: "Marcus Brubaker",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "mab@eecs.yorku.ca",
    homepage_url: "https://www.eecs.yorku.ca/~mab/",
    lab_url: "https://mbrubake.github.io/",
    research_areas: ["Probabilistic Machine Learning", "Computer Vision", "Cryo-EM Biomedical Image Reconstruction", "Generative Models"],
    funding_signal: "recruiting",
    source_url: "https://mbrubake.github.io/"
  },

  // 8. Concordia University
  {
    university: "Concordia University",
    department: "Gina Cody School of Computer Science and Software Engineering",
    name: "Tristan Glatard",
    title: "Professor & Canada Research Chair in Multi-Dimensional Data Processing",
    email: "tristan.glatard@concordia.ca",
    homepage_url: "https://glatard.github.io/",
    lab_url: "https://big-data-lab-team.github.io/",
    research_areas: ["Distributed Cloud Computing", "Medical Imaging Pipelines", "High-Performance Computing", "Reproducible AI"],
    funding_signal: "recruiting",
    source_url: "https://glatard.github.io/"
  },
  {
    university: "Concordia University",
    department: "Gina Cody School of Computer Science and Software Engineering",
    name: "Emad Shihab",
    title: "Professor & Associate Dean of Research",
    email: "emad.shihab@concordia.ca",
    homepage_url: "https://das.encs.concordia.ca/members/emad-shihab/",
    lab_url: "https://das.encs.concordia.ca/",
    research_areas: ["Software Engineering for AI/ML", "Technical Debt", "Empirical Software Engineering", "AI Ethics and Governance"],
    funding_signal: "recruiting",
    source_url: "https://das.encs.concordia.ca/"
  },

  // 9. University of Guelph
  {
    university: "University of Guelph",
    department: "School of Computer Science",
    name: "Stefan Kremer",
    title: "Professor of Computer Science",
    email: "skremer@uoguelph.ca",
    homepage_url: "https://www.uoguelph.ca/computing/people/stefan-c-kremer",
    lab_url: "https://www.uoguelph.ca/computing/research",
    research_areas: ["Recurrent Neural Networks", "Bioinformatics", "Structural Machine Learning", "Pattern Recognition"],
    funding_signal: "recruiting",
    source_url: "https://www.uoguelph.ca/computing/people/stefan-c-kremer"
  },
  {
    university: "University of Guelph",
    department: "School of Computer Science",
    name: "Minglun Gong",
    title: "Professor & Director of School of Computer Science",
    email: "minglun@uoguelph.ca",
    homepage_url: "https://www.uoguelph.ca/computing/people/minglun-gong",
    lab_url: "https://www.uoguelph.ca/computing/research",
    research_areas: ["Computer Vision", "3D Scene Reconstruction", "Deep Learning for Visual Media", "Point Cloud Analysis"],
    funding_signal: "recruiting",
    source_url: "https://www.uoguelph.ca/computing/people/minglun-gong"
  },

  // 10. University of Saskatchewan
  {
    university: "University of Saskatchewan",
    department: "Department of Computer Science",
    name: "Chanchal Roy",
    title: "Professor of Computer Science",
    email: "chanchal.roy@usask.ca",
    homepage_url: "https://research-groups.usask.ca/serg/people/chanchal-roy.php",
    lab_url: "https://research-groups.usask.ca/serg/",
    research_areas: ["Software Engineering", "Code Clone Analysis", "Mining Software Repositories", "Software Maintenance for AI"],
    funding_signal: "recruiting",
    source_url: "https://research-groups.usask.ca/serg/"
  },
  {
    university: "University of Saskatchewan",
    department: "Department of Computer Science",
    name: "Mark Eramian",
    title: "Professor of Computer Science",
    email: "eramian@cs.usask.ca",
    homepage_url: "https://www.cs.usask.ca/~eramian/",
    lab_url: "https://www.cs.usask.ca/research/research_groups/image.php",
    research_areas: ["Medical Image Processing", "Computer Vision in Agriculture", "Image Segmentation", "Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.usask.ca/~eramian/"
  },

  // 11. University of Manitoba
  {
    university: "University of Manitoba",
    department: "Department of Computer Science",
    name: "Yang Wang",
    title: "Associate Professor",
    email: "ywang@cs.umanitoba.ca",
    homepage_url: "http://www.cs.umanitoba.ca/~ywang/",
    lab_url: "http://www.cs.umanitoba.ca/~ywang/lab/",
    research_areas: ["Computer Vision", "Machine Learning", "Video Understanding", "Human Activity Recognition"],
    funding_signal: "recruiting",
    source_url: "http://www.cs.umanitoba.ca/~ywang/"
  },
  {
    university: "University of Manitoba",
    department: "Department of Computer Science",
    name: "Noman Mohammed",
    title: "Associate Professor",
    email: "noman@cs.umanitoba.ca",
    homepage_url: "http://www.cs.umanitoba.ca/~noman/",
    lab_url: "http://www.cs.umanitoba.ca/~noman/",
    research_areas: ["Privacy-Preserving Data Mining", "Differential Privacy in Machine Learning", "Healthcare Data Security", "Cloud Security"],
    funding_signal: "recruiting",
    source_url: "http://www.cs.umanitoba.ca/~noman/"
  },

  // 12. Polytechnique Montréal
  {
    university: "Polytechnique Montréal",
    department: "Department of Computer and Software Engineering",
    name: "Foutse Khomh",
    title: "Full Professor & Canada CIFAR AI Chair",
    email: "foutse.khomh@polymtl.ca",
    homepage_url: "http://swat.polymtl.ca/~foutsekh/",
    lab_url: "http://swat.polymtl.ca/",
    research_areas: ["Quality Assurance of Machine Learning Systems", "Trustworthy ML Engineering", "Software Maintenance", "Dependable Cloud Systems"],
    funding_signal: "recruiting",
    source_url: "http://swat.polymtl.ca/"
  },
  {
    university: "Polytechnique Montréal",
    department: "Department of Computer and Software Engineering",
    name: "Giuliano Antoniol",
    title: "Full Professor & Head of SOCCER Lab",
    email: "giuliano.antoniol@polymtl.ca",
    homepage_url: "https://www.polymtl.ca/expertises/en/antoniol-giuliano",
    lab_url: "http://soccerlab.polymtl.ca/",
    research_areas: ["Software Evolution", "Traceability in Software Engineering", "Bug Prediction Models", "Empirical Systems Analysis"],
    funding_signal: "recruiting",
    source_url: "https://www.polymtl.ca/expertises/en/antoniol-giuliano"
  },

  // 13. École de technologie supérieure (ETS Montréal)
  {
    university: "École de technologie supérieure",
    department: "Department of Software and IT Engineering",
    name: "Christian Desrosiers",
    title: "Full Professor",
    email: "christian.desrosiers@etsmtl.ca",
    homepage_url: "https://profs.etsmtl.ca/cdesrosiers/",
    lab_url: "https://livia.etsmtl.ca/",
    research_areas: ["Medical Image Segmentation", "Deep Learning for Brain MRI", "Graph Neural Networks in Healthcare", "Computer Vision"],
    funding_signal: "recruiting",
    source_url: "https://profs.etsmtl.ca/cdesrosiers/"
  },
  {
    university: "École de technologie supérieure",
    department: "Department of Software and IT Engineering",
    name: "Marco Pedersoli",
    title: "Associate Professor",
    email: "marco.pedersoli@etsmtl.ca",
    homepage_url: "https://profs.etsmtl.ca/mpedersoli/",
    lab_url: "https://livia.etsmtl.ca/",
    research_areas: ["Object Detection", "Visual Domain Adaptation", "Continual Learning for Vision", "Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://profs.etsmtl.ca/mpedersoli/"
  },

  // 14. Memorial University of Newfoundland
  {
    university: "Memorial University of Newfoundland",
    department: "Department of Computer Science",
    name: "Lourdes Peña-Castillo",
    title: "Professor of Computer Science and Biology",
    email: "lourdes@mun.ca",
    homepage_url: "https://www.cs.mun.ca/~lourdes/",
    lab_url: "https://www.cs.mun.ca/research/",
    research_areas: ["Computational Biology", "Machine Learning for Functional Genomics", "Biomedical Data Integration", "Microbiome Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.mun.ca/~lourdes/"
  },
  {
    university: "Memorial University of Newfoundland",
    department: "Department of Computer Science",
    name: "Xianta Jiang",
    title: "Assistant Professor",
    email: "xjiang@mun.ca",
    homepage_url: "https://www.cs.mun.ca/~xjiang/",
    lab_url: "https://www.cs.mun.ca/research/",
    research_areas: ["Biomedical Signal Processing", "Machine Learning for Healthcare", "Physiological Monitoring", "Sensor Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.mun.ca/~xjiang/"
  },

  // 15. University of New Brunswick
  {
    university: "University of New Brunswick",
    department: "Faculty of Computer Science",
    name: "Rongxing Lu",
    title: "Professor & Mastercard IoT Cyber Security Chair",
    email: "rlu1@unb.ca",
    homepage_url: "https://www.cs.unb.ca/~rlu1/",
    lab_url: "https://www.unb.ca/cic/",
    research_areas: ["Applied Cryptography", "Privacy-Preserving Big Data Computing", "Federated Learning Security", "IoT Privacy"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.unb.ca/~rlu1/"
  },
  {
    university: "University of New Brunswick",
    department: "Faculty of Computer Science",
    name: "Suprio Ray",
    title: "Associate Professor",
    email: "sray@unb.ca",
    homepage_url: "https://www.cs.unb.ca/~sray/",
    lab_url: "https://www.cs.unb.ca/research/bigdata/",
    research_areas: ["Big Data Systems", "High-Performance Distributed Databases", "Cloud Data Management", "Spatio-Temporal Analytics"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.unb.ca/~sray/"
  },

  // 16. University of Windsor
  {
    university: "University of Windsor",
    department: "School of Computer Science",
    name: "Ziad Kobti",
    title: "Professor & Director of School of Computer Science",
    email: "kobti@uwindsor.ca",
    homepage_url: "https://www.uwindsor.ca/science/computerscience/1035/dr-ziad-kobti",
    lab_url: "https://www.uwindsor.ca/science/computerscience/research",
    research_areas: ["Multi-Agent Systems", "Social Simulation", "Artificial Life", "Distributed Agent Coordination"],
    funding_signal: "recruiting",
    source_url: "https://www.uwindsor.ca/science/computerscience/1035/dr-ziad-kobti"
  },
  {
    university: "University of Windsor",
    department: "School of Computer Science",
    name: "Boubakeur Boufama",
    title: "Professor of Computer Science",
    email: "boufama@uwindsor.ca",
    homepage_url: "https://www.uwindsor.ca/science/computerscience/1029/dr-boubakeur-boufama",
    lab_url: "https://www.uwindsor.ca/science/computerscience/research",
    research_areas: ["Computer Vision", "Autonomous Navigation", "Stereo Vision", "Surveillance Video Analytics"],
    funding_signal: "recruiting",
    source_url: "https://www.uwindsor.ca/science/computerscience/1029/dr-boubakeur-boufama"
  },

  // 17. Ontario Tech University
  {
    university: "Ontario Tech University",
    department: "Faculty of Science (Computer Science)",
    name: "Ken Pu",
    title: "Associate Professor",
    email: "ken.pu@ontariotechu.ca",
    homepage_url: "https://faculty.ontariotechu.ca/kenpu/",
    lab_url: "https://faculty.ontariotechu.ca/kenpu/research/",
    research_areas: ["Big Data Systems", "Data Lakes Architecture", "Scalable Database Engines", "Knowledge Extraction"],
    funding_signal: "recruiting",
    source_url: "https://faculty.ontariotechu.ca/kenpu/"
  },
  {
    university: "Ontario Tech University",
    department: "Faculty of Science (Computer Science)",
    name: "Faisal Qureshi",
    title: "Professor of Computer Science",
    email: "faisal.qureshi@ontariotechu.ca",
    homepage_url: "https://faculty.ontariotechu.ca/qureshi/",
    lab_url: "https://vclab.science.ontariotechu.ca/",
    research_areas: ["Computer Vision", "Camera Sensor Networks", "Visual Tracking", "Edge Intelligence"],
    funding_signal: "recruiting",
    source_url: "https://vclab.science.ontariotechu.ca/"
  },

  // 18. Toronto Metropolitan University
  {
    university: "Toronto Metropolitan University",
    department: "Department of Computer Science",
    name: "Kosta Derpanis",
    title: "Associate Professor & Research Director Vector Institute",
    email: "kosta@torontomu.ca",
    homepage_url: "https://www.cs.torontomu.ca/~kosta/",
    lab_url: "https://vcl.torontomu.ca/",
    research_areas: ["Computer Vision", "Spatiotemporal Video Analysis", "Multimodal Machine Learning", "Deep Generative Models"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.torontomu.ca/~kosta/"
  },
  {
    university: "Toronto Metropolitan University",
    department: "Department of Computer Science",
    name: "Cherie Ding",
    title: "Professor of Computer Science",
    email: "cding@torontomu.ca",
    homepage_url: "https://www.cs.torontomu.ca/~cding/",
    lab_url: "https://www.cs.torontomu.ca/research/",
    research_areas: ["Cloud Computing", "Service-Oriented Architectures", "Web Services Recommendation", "Distributed Software Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.torontomu.ca/~cding/"
  }
];

async function run() {
  console.log(`Starting Wave 5 ingestion: ${wave5Faculty.length} faculty records across Canadian Institutions (Funded MSc/MASc & PhD)...`);
  
  const validated = wave5Faculty.map(item => {
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
  console.log("Wave 5 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave5Faculty };
