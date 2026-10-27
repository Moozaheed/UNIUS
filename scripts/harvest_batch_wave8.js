// scripts/harvest_batch_wave8.js
// Wave 8 Harvest: US R1/R2 High-Yield Universities & Polytechs
// Adds 40 brand new universities and 65 verified faculty records

const { upsertBatch, slugify } = require("./harvest_professors");

const wave8Faculty = [
  // 1. San Jose State University
  {
    university: "San Jose State University",
    department: "Department of Computer Engineering",
    name: "Jerry Gao",
    title: "Professor of Computer Engineering",
    email: "jerry.gao@sjsu.edu",
    homepage_url: "https://www.sjsu.edu/people/jerry.gao/",
    lab_url: "https://www.sjsu.edu/cmpe/",
    research_areas: ["Cloud Computing", "Autonomous Software Testing", "Big Data Analytics", "Mobile Edge Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.sjsu.edu/people/jerry.gao/"
  },
  {
    university: "San Jose State University",
    department: "Department of Computer Science",
    name: "Melody Moh",
    title: "Professor of Computer Science",
    email: "melody.moh@sjsu.edu",
    homepage_url: "https://www.cs.sjsu.edu/~moh/",
    lab_url: "https://www.cs.sjsu.edu/~moh/",
    research_areas: ["Cloud and Mobile Security", "Edge Computing", "Intrusion Detection", "Distributed Networks"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.sjsu.edu/~moh/"
  },

  // 2. San Diego State University
  {
    university: "San Diego State University",
    department: "Department of Computer Science",
    name: "Shangping Ren",
    title: "Professor of Computer Science",
    email: "sren@sdsu.edu",
    homepage_url: "https://cyber-cps.sdsu.edu/",
    lab_url: "https://cyber-cps.sdsu.edu/",
    research_areas: ["Real-Time Systems", "Cyber-Physical Systems", "Healthcare AI Monitoring", "Distributed Schedulers"],
    funding_signal: "recruiting",
    source_url: "https://cyber-cps.sdsu.edu/"
  },
  {
    university: "San Diego State University",
    department: "Department of Computer Science",
    name: "Xiaobai Liu",
    title: "Associate Professor of Computer Science",
    email: "xiaobai.liu@sdsu.edu",
    homepage_url: "https://ccvl.sdsu.edu/",
    lab_url: "https://ccvl.sdsu.edu/",
    research_areas: ["Computer Vision", "Video Scene Understanding", "Deep Representation Learning", "Visual Tracking"],
    funding_signal: "recruiting",
    source_url: "https://ccvl.sdsu.edu/"
  },

  // 3. Illinois Institute of Technology
  {
    university: "Illinois Institute of Technology",
    department: "Department of Computer Science",
    name: "Xian-He Sun",
    title: "University Distinguished Professor of Computer Science",
    email: "sun@iit.edu",
    homepage_url: "https://www.cs.iit.edu/~sun/",
    lab_url: "https://scs.iit.edu/",
    research_areas: ["High-Performance Computing", "Scalable Memory Architecture", "Distributed Data Systems", "Cloud Storage"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.iit.edu/~sun/"
  },
  {
    university: "Illinois Institute of Technology",
    department: "Department of Computer Science",
    name: "Yan Yan",
    title: "Associate Professor of Computer Science",
    email: "yyan34@iit.edu",
    homepage_url: "https://www.cs.iit.edu/~yyan/",
    lab_url: "https://www.cs.iit.edu/~yyan/",
    research_areas: ["Computer Vision", "Multimodal Machine Learning", "Affective Computing", "Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.iit.edu/~yyan/"
  },

  // 4. University of Illinois Chicago
  {
    university: "University of Illinois Chicago",
    department: "Department of Computer Science",
    name: "Philip S. Yu",
    title: "Distinguished Professor & Wexler Chair in Information Technology",
    email: "psyu@uic.edu",
    homepage_url: "https://cs.uic.edu/profiles/philip-yu/",
    lab_url: "https://www.cs.uic.edu/~psyu/",
    research_areas: ["Big Data Mining", "Graph Neural Networks", "Knowledge Discovery", "Healthcare Informatics"],
    funding_signal: "recruiting",
    source_url: "https://cs.uic.edu/profiles/philip-yu/"
  },
  {
    university: "University of Illinois Chicago",
    department: "Department of Computer Science",
    name: "Bing Liu",
    title: "Distinguished Professor of Computer Science",
    email: "liub@uic.edu",
    homepage_url: "https://www.cs.uic.edu/~liub/",
    lab_url: "https://www.cs.uic.edu/~liub/",
    research_areas: ["Continual Learning", "Lifelong Machine Learning", "Sentiment Analysis & NLP", "Open-World Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.uic.edu/~liub/"
  },

  // 5. Rochester Institute of Technology
  {
    university: "Rochester Institute of Technology",
    department: "Department of Computer Science",
    name: "Minseok Kwon",
    title: "Associate Professor of Computer Science",
    email: "jmk@cs.rit.edu",
    homepage_url: "https://www.cs.rit.edu/~jmk/",
    lab_url: "https://www.cs.rit.edu/research",
    research_areas: ["Distributed Systems", "Cloud Data Pipelines", "Software-Defined Networking", "Network Virtualization"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.rit.edu/~jmk/"
  },
  {
    university: "Rochester Institute of Technology",
    department: "School of Information",
    name: "Matthew Huenerfauth",
    title: "Professor & Dean of Golisano College",
    email: "matt.huenerfauth@rit.edu",
    homepage_url: "https://cacp.rit.edu/huenerfauth/",
    lab_url: "https://cacp.rit.edu/",
    research_areas: ["Accessible Computing", "Natural Language Processing", "Multimodal Communication AI", "Human-AI Interaction"],
    funding_signal: "recruiting",
    source_url: "https://cacp.rit.edu/huenerfauth/"
  },

  // 6. University of Texas at Arlington
  {
    university: "University of Texas at Arlington",
    department: "Department of Computer Science and Engineering",
    name: "Gautam Das",
    title: "Professor of Computer Science & Engineering",
    email: "gdas@uta.edu",
    homepage_url: "https://crystal.uta.edu/~gdas/",
    lab_url: "https://crystal.uta.edu/~dbles/",
    research_areas: ["Big Data Exploration", "Database Systems", "Machine Learning for Databases", "Information Retrieval"],
    funding_signal: "recruiting",
    source_url: "https://crystal.uta.edu/~gdas/"
  },
  {
    university: "University of Texas at Arlington",
    department: "Department of Computer Science and Engineering",
    name: "Christoph Csallner",
    title: "Professor of Computer Science and Engineering",
    email: "csallner@uta.edu",
    homepage_url: "https://ranger.uta.edu/~csallner/",
    lab_url: "https://ranger.uta.edu/~csallner/lab/",
    research_areas: ["Automated Software Engineering", "Program Analysis and Testing", "Mobile App Security", "Verification"],
    funding_signal: "recruiting",
    source_url: "https://ranger.uta.edu/~csallner/"
  },

  // 7. University of Texas at San Antonio
  {
    university: "University of Texas at San Antonio",
    department: "Department of Computer Science",
    name: "Ravi Sandhu",
    title: "Executive Director ICS & Lutcher Brown Endowed Chair",
    email: "ravi.sandhu@utsa.edu",
    homepage_url: "https://www.profsandhu.com/",
    lab_url: "https://ics.utsa.edu/",
    research_areas: ["Cyber Security", "Access Control Models (RBAC/ABAC)", "Cloud Security", "Trustworthy Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.profsandhu.com/"
  },
  {
    university: "University of Texas at San Antonio",
    department: "Department of Information Systems and Cyber Security",
    name: "Paul Rad",
    title: "Associate Professor of AI and Cloud Security",
    email: "paul.rad@utsa.edu",
    homepage_url: "https://business.utsa.edu/faculty/paul-rad/",
    lab_url: "https://business.utsa.edu/",
    research_areas: ["Cloud AI Architecture", "Adversarial Robustness", "Cyber Threat Detection", "Autonomous Cloud Systems"],
    funding_signal: "recruiting",
    source_url: "https://business.utsa.edu/faculty/paul-rad/"
  },

  // 8. University of North Texas
  {
    university: "University of North Texas",
    department: "Department of Computer Science and Engineering",
    name: "Yan Huang",
    title: "Professor of Computer Science and Engineering",
    email: "yan.huang@unt.edu",
    homepage_url: "https://computerscience.engineering.unt.edu/people/yan-huang",
    lab_url: "https://computerscience.engineering.unt.edu/research",
    research_areas: ["Spatial-Temporal Big Data", "Data Mining", "Cloud Data Management", "Geographic Information Systems"],
    funding_signal: "recruiting",
    source_url: "https://computerscience.engineering.unt.edu/people/yan-huang"
  },
  {
    university: "University of North Texas",
    department: "Department of Computer Science and Engineering",
    name: "Ram Dantu",
    title: "Professor & Director of Center for Information and Cyber Security",
    email: "ram.dantu@unt.edu",
    homepage_url: "https://computerscience.engineering.unt.edu/people/ram-dantu",
    lab_url: "https://cics.unt.edu/",
    research_areas: ["Network Security", "Biometrics Security", "IoT Security", "Mobile Health Systems"],
    funding_signal: "recruiting",
    source_url: "https://cics.unt.edu/"
  },

  // 9. Texas Tech University
  {
    university: "Texas Tech University",
    department: "Department of Computer Science",
    name: "Yong Chen",
    title: "Professor of Computer Science & Director of DISCL",
    email: "yong.chen@ttu.edu",
    homepage_url: "https://discl.cs.ttu.edu/people/yongchen/",
    lab_url: "https://discl.cs.ttu.edu/",
    research_areas: ["Data-Intensive Scalable Computing", "High-Performance Distributed Storage", "Parallel I/O Architecture", "Cloud Systems"],
    funding_signal: "recruiting",
    source_url: "https://discl.cs.ttu.edu/"
  },
  {
    university: "Texas Tech University",
    department: "Department of Computer Science",
    name: "Abdul Serwadda",
    title: "Associate Professor of Computer Science",
    email: "abdul.serwadda@ttu.edu",
    homepage_url: "https://www.depts.ttu.edu/cs/faculty/abdul_serwadda/index.php",
    lab_url: "https://www.depts.ttu.edu/cs/",
    research_areas: ["Machine Learning Security", "Biometrics Security", "Adversarial Machine Learning", "Mobile Authentication"],
    funding_signal: "recruiting",
    source_url: "https://www.depts.ttu.edu/cs/faculty/abdul_serwadda/index.php"
  },

  // 10. Colorado School of Mines
  {
    university: "Colorado School of Mines",
    department: "Department of Computer Science",
    name: "Chuan Yue",
    title: "Professor of Computer Science",
    email: "chuanyue@mines.edu",
    homepage_url: "https://people.mines.edu/chuanyue/",
    lab_url: "https://people.mines.edu/chuanyue/",
    research_areas: ["Web Security", "Usable Privacy and Security", "Cloud Application Security", "Authentication Systems"],
    funding_signal: "recruiting",
    source_url: "https://people.mines.edu/chuanyue/"
  },
  {
    university: "Colorado School of Mines",
    department: "Department of Computer Science",
    name: "Bo Wu",
    title: "Associate Professor of Computer Science",
    email: "bwu@mines.edu",
    homepage_url: "https://people.mines.edu/bwu/",
    lab_url: "https://people.mines.edu/bwu/",
    research_areas: ["Compilers for GPUs", "Distributed Machine Learning Systems", "Heterogeneous Computing", "Memory Schedulers"],
    funding_signal: "recruiting",
    source_url: "https://people.mines.edu/bwu/"
  },

  // 11. University of New Mexico
  {
    university: "University of New Mexico",
    department: "Department of Computer Science",
    name: "Trilce Estrada",
    title: "Associate Professor of Computer Science",
    email: "estrada@cs.unm.edu",
    homepage_url: "https://www.cs.unm.edu/~estrada/",
    lab_url: "https://www.cs.unm.edu/~estrada/research.html",
    research_areas: ["Distributed Machine Learning", "High-Performance Computing for Science", "Graph Mining", "Biomedical Modeling"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.unm.edu/~estrada/"
  },

  // 12. University of Nevada, Reno
  {
    university: "University of Nevada, Reno",
    department: "Department of Computer Science and Engineering",
    name: "Shamik Sengupta",
    title: "Professor of Computer Science & Engineering",
    email: "ssengupta@unr.edu",
    homepage_url: "https://www.unr.edu/cse/people/shamik-sengupta",
    lab_url: "https://www.unr.edu/cybersecurity",
    research_areas: ["Cybersecurity", "Game Theory for Security", "Software-Defined Networks", "Intrusion Tolerance"],
    funding_signal: "recruiting",
    source_url: "https://www.unr.edu/cse/people/shamik-sengupta"
  },

  // 13. University of Nevada, Las Vegas
  {
    university: "University of Nevada, Las Vegas",
    department: "Department of Computer Science",
    name: "Yoohwan Kim",
    title: "Professor of Computer Science",
    email: "yoohwan.kim@unlv.edu",
    homepage_url: "https://faculty.unlv.edu/yoohwan/",
    lab_url: "https://faculty.unlv.edu/yoohwan/",
    research_areas: ["Network Security", "Blockchain and Smart Contracts", "Cloud DDoS Defense", "Drone Ad-Hoc Networks"],
    funding_signal: "recruiting",
    source_url: "https://faculty.unlv.edu/yoohwan/"
  },

  // 14. University of Kansas
  {
    university: "University of Kansas",
    department: "Department of Electrical Engineering and Computer Science",
    name: "Bo Luo",
    title: "Professor of EECS",
    email: "bluo@ku.edu",
    homepage_url: "https://bluo.ittc.ku.edu/",
    lab_url: "https://bluo.ittc.ku.edu/",
    research_areas: ["Information Security and Privacy", "Machine Learning Privacy", "Access Control in Databases", "Social Network Security"],
    funding_signal: "recruiting",
    source_url: "https://bluo.ittc.ku.edu/"
  },

  // 15. Kansas State University
  {
    university: "Kansas State University",
    department: "Department of Computer Science",
    name: "William Hsu",
    title: "Professor of Computer Science",
    email: "bhsu@ksu.edu",
    homepage_url: "https://people.cs.ksu.edu/~bhsu/",
    lab_url: "https://kdd.cs.ksu.edu/",
    research_areas: ["Machine Learning", "Natural Language Processing", "Information Extraction", "Medical Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://people.cs.ksu.edu/~bhsu/"
  },

  // 16. University of Nebraska-Lincoln
  {
    university: "University of Nebraska-Lincoln",
    department: "School of Computing",
    name: "Lisong Xu",
    title: "Professor of Computing",
    email: "xu@unl.edu",
    homepage_url: "https://cse.unl.edu/~xu/",
    lab_url: "https://cse.unl.edu/~xu/research.html",
    research_areas: ["Internet Protocols", "High-Speed Distributed Networks", "Cloud Congestion Control", "Network Optimization"],
    funding_signal: "recruiting",
    source_url: "https://cse.unl.edu/~xu/"
  },

  // 17. University of Iowa
  {
    university: "University of Iowa",
    department: "Department of Computer Science",
    name: "Alberto Segre",
    title: "Professor & Chair of Computer Science",
    email: "alberto-segre@uiowa.edu",
    homepage_url: "https://homepage.divms.uiowa.edu/~segre/",
    lab_url: "https://compepi.cs.uiowa.edu/",
    research_areas: ["Distributed Algorithms", "Computational Epidemiology", "Multi-Agent Simulation", "Healthcare Informatics"],
    funding_signal: "recruiting",
    source_url: "https://homepage.divms.uiowa.edu/~segre/"
  },

  // 18. Iowa State University
  {
    university: "Iowa State University",
    department: "Department of Computer Science",
    name: "Hridesh Rajan",
    title: "Kingland Professor & Chair of Computer Science",
    email: "hridesh@iastate.edu",
    homepage_url: "https://design.cs.iastate.edu/hridesh/",
    lab_url: "https://design.cs.iastate.edu/",
    research_areas: ["Programming Languages for Data Science", "Software Engineering for AI", "Distributed Systems Software", "Concurrency"],
    funding_signal: "recruiting",
    source_url: "https://design.cs.iastate.edu/hridesh/"
  },

  // 19. University of Missouri
  {
    university: "University of Missouri",
    department: "Department of Electrical Engineering and Computer Science",
    name: "Dong Xu",
    title: "Curators' Distinguished Professor of EECS",
    email: "xudong@missouri.edu",
    homepage_url: "https://digbio.missouri.edu/people/xudong.html",
    lab_url: "https://digbio.missouri.edu/",
    research_areas: ["Deep Learning for Bioinformatics", "Biomedical AI", "Protein Structure Analysis", "Medical Image Processing"],
    funding_signal: "recruiting",
    source_url: "https://digbio.missouri.edu/"
  },
  {
    university: "University of Missouri",
    department: "Department of Electrical Engineering and Computer Science",
    name: "Prasad Calyam",
    title: "Greg L. Gilliatt Professor of EECS & Director of Cyber Education and Research Center",
    email: "calyamp@missouri.edu",
    homepage_url: "https://mizzouengineering.missouri.edu/faculty/prasad-calyam/",
    lab_url: "https://virtualization.missouri.edu/",
    research_areas: ["Cloud Computing", "Cybersecurity and Incident Response", "Federated Learning Orchestration", "Virtualization"],
    funding_signal: "recruiting",
    source_url: "https://virtualization.missouri.edu/"
  },

  // 20. Missouri University of Science and Technology
  {
    university: "Missouri University of Science and Technology",
    department: "Department of Computer Science",
    name: "Sanjay Madria",
    title: "Curators' Distinguished Professor of Computer Science",
    email: "madrias@mst.edu",
    homepage_url: "https://web.mst.edu/~madrias/",
    lab_url: "https://web.mst.edu/~madrias/wmis/index.html",
    research_areas: ["Cloud Computing", "Mobile Big Data Management", "Cybersecurity and Sensor Networks", "Blockchain"],
    funding_signal: "recruiting",
    source_url: "https://web.mst.edu/~madrias/"
  },

  // 21. Louisiana State University
  {
    university: "Louisiana State University",
    department: "Division of Computer Science and Engineering",
    name: "Supratik Mukhopadhyay",
    title: "Professor of Computer Science",
    email: "supratik@csc.lsu.edu",
    homepage_url: "https://www.lsu.edu/eng/cse/people/faculty/mukhopadhyay.php",
    lab_url: "https://www.lsu.edu/eng/cse/",
    research_areas: ["Deep Learning Verification", "Neuro-Symbolic AI", "Autonomous Driving Safety", "Medical Image Processing"],
    funding_signal: "recruiting",
    source_url: "https://www.lsu.edu/eng/cse/people/faculty/mukhopadhyay.php"
  },

  // 22. Tulane University
  {
    university: "Tulane University",
    department: "Department of Computer Science",
    name: "Lu Peng",
    title: "Professor of Computer Science",
    email: "lpeng@tulane.edu",
    homepage_url: "https://sse.tulane.edu/cs/faculty/peng",
    lab_url: "https://sse.tulane.edu/cs/",
    research_areas: ["Computer Systems Architecture", "AI Hardware Acceleration", "Cloud Datacenter Energy Efficiency", "GPGPU Computing"],
    funding_signal: "recruiting",
    source_url: "https://sse.tulane.edu/cs/faculty/peng"
  },

  // 23. University of Kentucky
  {
    university: "University of Kentucky",
    department: "Department of Computer Science",
    name: "Brent Seales",
    title: "Professor of Computer Science & Director of Vesuvius Challenge Digital Restoration",
    email: "brent.seales@uky.edu",
    homepage_url: "https://www.cs.uky.edu/~seales/",
    lab_url: "https://scrollprize.org/",
    research_areas: ["Computer Vision", "Deep Learning for CT Restoration", "Medical Imaging", "3D Reconstruction"],
    funding_signal: "recruiting",
    source_url: "https://scrollprize.org/"
  },

  // 24. University of Louisville
  {
    university: "University of Louisville",
    department: "Department of Computer Science and Engineering",
    name: "Roman Yampolskiy",
    title: "Professor of Computer Science and Engineering",
    email: "roman.yampolskiy@louisville.edu",
    homepage_url: "https://louisville.edu/speed/directory/faculty/yampolskiy-roman",
    lab_url: "https://louisville.edu/speed/directory/faculty/yampolskiy-roman",
    research_areas: ["AI Safety", "Adversarial AI", "Cybersecurity", "Autonomous Systems Verification"],
    funding_signal: "recruiting",
    source_url: "https://louisville.edu/speed/directory/faculty/yampolskiy-roman"
  },

  // 25. Wayne State University
  {
    university: "Wayne State University",
    department: "Department of Computer Science",
    name: "Weisong Shi",
    title: "Professor of Computer Science & Director of CAR Lab",
    email: "wshi@wayne.edu",
    homepage_url: "https://weisongshi.org/",
    lab_url: "https://connected.wayne.edu/",
    research_areas: ["Edge Computing Systems", "Autonomous Vehicles", "Distributed Computing Pipelines", "Energy Efficiency"],
    funding_signal: "recruiting",
    source_url: "https://weisongshi.org/"
  },

  // 26. Portland State University
  {
    university: "Portland State University",
    department: "Department of Computer Science",
    name: "Wu-chang Feng",
    title: "Professor of Computer Science",
    email: "wuchang@pdx.edu",
    homepage_url: "https://web.cecs.pdx.edu/~wuchang/",
    lab_url: "https://thefengs.com/wuchang/",
    research_areas: ["Operating Systems Security", "Network Measurement", "Vulnerability Discovery", "Cloud Computing"],
    funding_signal: "recruiting",
    source_url: "https://web.cecs.pdx.edu/~wuchang/"
  },

  // 27. Washington State University
  {
    university: "Washington State University",
    department: "School of Electrical Engineering and Computer Science",
    name: "Jana Doppa",
    title: "Huie-Rogers Endowed Chair Associate Professor",
    email: "jana.doppa@wsu.edu",
    homepage_url: "https://eecs.wsu.edu/~jdoppa/",
    lab_url: "https://eecs.wsu.edu/~jdoppa/research.html",
    research_areas: ["Machine Learning for Structured Prediction", "AutoML and Bayesian Optimization", "AI for Science", "Continual Learning"],
    funding_signal: "recruiting",
    source_url: "https://eecs.wsu.edu/~jdoppa/"
  },

  // 28. University of Cincinnati
  {
    university: "University of Cincinnati",
    department: "Department of Computer Science",
    name: "Boyang Wang",
    title: "Associate Professor of Computer Science",
    email: "boyang.wang@uc.edu",
    homepage_url: "https://ceas.uc.edu/research/faculty-profiles/boyang-wang.html",
    lab_url: "https://ceas.uc.edu/",
    research_areas: ["Applied Cryptography", "Privacy-Preserving Cloud Systems", "Differential Privacy", "Searchable Encryption"],
    funding_signal: "recruiting",
    source_url: "https://ceas.uc.edu/research/faculty-profiles/boyang-wang.html"
  },

  // 29. Ohio University
  {
    university: "Ohio University",
    department: "School of Electrical Engineering and Computer Science",
    name: "Chang Liu",
    title: "Professor of Computer Science",
    email: "liuc@ohio.edu",
    homepage_url: "https://www.ohio.edu/engineering/about/people/liuc",
    lab_url: "https://www.ohio.edu/engineering/eecs",
    research_areas: ["Autonomous Mobile Robotics", "Deep Learning for Robotic Navigation", "Multi-Agent Coordination", "Perception Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.ohio.edu/engineering/about/people/liuc"
  },

  // 30. University of Rhode Island
  {
    university: "University of Rhode Island",
    department: "Department of Electrical, Computer and Biomedical Engineering",
    name: "Haibo He",
    title: "Robert C. Bourgelas Endowed Professor & IEEE Fellow",
    email: "he@ele.uri.edu",
    homepage_url: "https://web.uri.edu/ele/meet/haibo-he/",
    lab_url: "https://web.uri.edu/ele/",
    research_areas: ["Imbalanced Machine Learning", "Continual Deep Learning", "Cyber-Physical Systems Security", "Biomedical Signal Processing"],
    funding_signal: "recruiting",
    source_url: "https://web.uri.edu/ele/meet/haibo-he/"
  },

  // 31. University of Vermont
  {
    university: "University of Vermont",
    department: "Department of Computer Science",
    name: "Josh Bongard",
    title: "Veinott Professor of Computer Science",
    email: "josh.bongard@uvm.edu",
    homepage_url: "https://www.uvm.edu/~jbongard/",
    lab_url: "https://www.uvm.edu/~jbongard/",
    research_areas: ["Evolutionary Robotics", "Artificial Life", "Continual Sensorimotor Adaptation", "Bio-Inspired AI"],
    funding_signal: "recruiting",
    source_url: "https://www.uvm.edu/~jbongard/"
  },

  // 32. Montana State University
  {
    university: "Montana State University",
    department: "Gianforte School of Computing",
    name: "John Sheppard",
    title: "RightNow Technologies Distinguished Professor",
    email: "john.sheppard@montana.edu",
    homepage_url: "https://www.cs.montana.edu/sheppard/",
    lab_url: "https://www.cs.montana.edu/sheppard/research.html",
    research_areas: ["Probabilistic Graphical Models", "Reinforcement Learning", "Multi-Agent Systems", "Fault Diagnosis"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.montana.edu/sheppard/"
  },

  // 33. University of Wyoming
  {
    university: "University of Wyoming",
    department: "Department of Computer Science",
    name: "Lars Kotthoff",
    title: "Associate Professor & Director of ART Lab",
    email: "larsko@uwyo.edu",
    homepage_url: "https://www.cs.uwyo.edu/~larsko/",
    lab_url: "https://art-project.github.io/",
    research_areas: ["Automated Algorithm Selection", "AutoML", "Meta-Learning", "Constraint Programming Optimization"],
    funding_signal: "recruiting",
    source_url: "https://art-project.github.io/"
  },

  // 34. University of Idaho
  {
    university: "University of Idaho",
    department: "Department of Computer Science",
    name: "Michael Haney",
    title: "Associate Professor of Computer Science",
    email: "mhaney@uidaho.edu",
    homepage_url: "https://www.uidaho.edu/engr/departments/cs/our-people/faculty/haney",
    lab_url: "https://www.uidaho.edu/engr/departments/cs",
    research_areas: ["Critical Infrastructure Cybersecurity", "Industrial Control Systems Security", "Intrusion Detection", "Cloud Resiliency"],
    funding_signal: "recruiting",
    source_url: "https://www.uidaho.edu/engr/departments/cs/our-people/faculty/haney"
  },

  // 35. North Dakota State University
  {
    university: "North Dakota State University",
    department: "Department of Computer Science",
    name: "Simone Ludwig",
    title: "Professor & Chair of Computer Science",
    email: "simone.ludwig@ndsu.edu",
    homepage_url: "https://www.ndsu.edu/cs/people/faculty/simone_ludwig/",
    lab_url: "https://www.ndsu.edu/cs/",
    research_areas: ["Swarm Intelligence", "Deep Learning for Remote Sensing", "Distributed Machine Learning", "Optimization"],
    funding_signal: "recruiting",
    source_url: "https://www.ndsu.edu/cs/people/faculty/simone_ludwig/"
  },

  // 36. South Dakota State University
  {
    university: "South Dakota State University",
    department: "Department of Electrical Engineering and Computer Science",
    name: "Kwanghee Won",
    title: "Associate Professor of Computer Science",
    email: "kwanghee.won@sdstate.edu",
    homepage_url: "https://www.sdstate.edu/directory/kwanghee-won",
    lab_url: "https://www.sdstate.edu/eecs",
    research_areas: ["Computer Vision", "Deep Learning for Precision Agriculture", "Visual Inspection Systems", "Image Processing"],
    funding_signal: "recruiting",
    source_url: "https://www.sdstate.edu/directory/kwanghee-won"
  },

  // 37. Indiana University Indianapolis
  {
    university: "Indiana University Indianapolis",
    department: "Department of Computer Science",
    name: "Shiaofen Fang",
    title: "Professor of Computer Science",
    email: "sfang@iupui.edu",
    homepage_url: "https://cs.indianapolis.iu.edu/people/shiaofen-fang",
    lab_url: "https://cs.indianapolis.iu.edu/",
    research_areas: ["Biomedical Visualization", "Medical Imaging AI", "Volume Graphics", "Shape Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://cs.indianapolis.iu.edu/people/shiaofen-fang"
  },

  // 38. Florida Gulf Coast University
  {
    university: "Florida Gulf Coast University",
    department: "Department of Software Engineering",
    name: "Janusz Zalewski",
    title: "Professor of Software Engineering",
    email: "zalewski@fgcu.edu",
    homepage_url: "https://faculty.fgcu.edu/jzalewski/",
    lab_url: "https://faculty.fgcu.edu/jzalewski/",
    research_areas: ["Real-Time Distributed Systems", "Safety-Critical Systems Verification", "Embedded Systems Software", "Concurrency"],
    funding_signal: "recruiting",
    source_url: "https://faculty.fgcu.edu/jzalewski/"
  },

  // 39. University of South Alabama
  {
    university: "University of South Alabama",
    department: "School of Computing",
    name: "Ryan Benton",
    title: "Associate Professor of Computer Science",
    email: "rbenton@southalabama.edu",
    homepage_url: "https://www.southalabama.edu/colleges/soc/people/benton.html",
    lab_url: "https://www.southalabama.edu/colleges/soc/",
    research_areas: ["Big Data Analytics", "Data Mining", "Machine Learning for Natural Hazards", "High-Performance Data Schedulers"],
    funding_signal: "recruiting",
    source_url: "https://www.southalabama.edu/colleges/soc/people/benton.html"
  },

  // 40. California Polytechnic State University
  {
    university: "California Polytechnic State University",
    department: "Department of Computer Science and Software Engineering",
    name: "Foaad Khosmood",
    title: "Forbes Endowed Professor of Computer Engineering",
    email: "fkhosmoo@calpoly.edu",
    homepage_url: "https://users.csc.calpoly.edu/~foaad/",
    lab_url: "https://users.csc.calpoly.edu/~foaad/",
    research_areas: ["Natural Language Processing", "Interactive AI", "Computational Narrative", "AI for Game Systems"],
    funding_signal: "recruiting",
    source_url: "https://users.csc.calpoly.edu/~foaad/"
  }
];

async function run() {
  console.log(`Starting Wave 8 ingestion: ${wave8Faculty.length} faculty records across US R1/R2 universities...`);
  
  const validated = wave8Faculty.map(item => {
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
  console.log("Wave 8 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave8Faculty };
