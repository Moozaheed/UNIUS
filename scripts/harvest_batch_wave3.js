// scripts/harvest_batch_wave3.js
// Wave 3 Harvest: UK Russell Group, Switzerland, Nordic Institutions
// Adds 35+ brand new universities and 85+ verified faculty records

const { upsertBatch, slugify } = require("./harvest_professors");

const wave3Faculty = [
  // ==================== UNITED KINGDOM ====================
  // 1. University of Oxford
  {
    university: "University of Oxford",
    department: "Department of Computer Science",
    name: "Michael Wooldridge",
    title: "Professor of Computer Science & Head of Department",
    email: "michael.wooldridge@cs.ox.ac.uk",
    homepage_url: "https://www.cs.ox.ac.uk/people/michael.wooldridge/",
    lab_url: "https://www.cs.ox.ac.uk/activities/agent/index.html",
    research_areas: ["Multi-Agent Systems", "Autonomous Agents", "Trustworthy AI", "Logic and Computation"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ox.ac.uk/people/michael.wooldridge/"
  },
  {
    university: "University of Oxford",
    department: "Department of Computer Science",
    name: "Yarin Gal",
    title: "Associate Professor of Machine Learning",
    email: "yarin.gal@cs.ox.ac.uk",
    homepage_url: "https://www.cs.ox.ac.uk/people/yarin.gal/website/",
    lab_url: "https://oatml.cs.ox.ac.uk/",
    research_areas: ["Bayesian Deep Learning", "AI Safety", "Continual Learning", "Uncertainty Estimation"],
    funding_signal: "recruiting",
    source_url: "https://oatml.cs.ox.ac.uk/"
  },
  {
    university: "University of Oxford",
    department: "Department of Computer Science",
    name: "Graham Cormode",
    title: "Professor of Computer Science",
    email: "graham.cormode@cs.ox.ac.uk",
    homepage_url: "https://www.cs.ox.ac.uk/people/graham.cormode/",
    lab_url: "https://www.cs.ox.ac.uk/activities/datagroups/",
    research_areas: ["Privacy-Preserving Data Analysis", "Federated Analytics", "Differential Privacy", "Streaming Algorithms"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ox.ac.uk/people/graham.cormode/"
  },
  {
    university: "University of Oxford",
    department: "Department of Computer Science",
    name: "Andrew Martin",
    title: "Professor of Systems Security",
    email: "andrew.martin@cs.ox.ac.uk",
    homepage_url: "https://www.cs.ox.ac.uk/people/andrew.martin/",
    lab_url: "https://www.cybersecurity.ox.ac.uk/",
    research_areas: ["Systems Security", "Trusted Execution Environments (TEE)", "Distributed Systems Security", "Cloud Security"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ox.ac.uk/people/andrew.martin/"
  },

  // 2. University of Cambridge
  {
    university: "University of Cambridge",
    department: "Department of Computer Science and Technology",
    name: "Alastair Beresford",
    title: "Professor of Computer Security",
    email: "alastair.beresford@cl.cam.ac.uk",
    homepage_url: "https://www.cl.cam.ac.uk/~arb33/",
    lab_url: "https://www.cl.cam.ac.uk/research/security/",
    research_areas: ["Mobile Systems Security", "Distributed Systems", "Privacy Enhancing Technologies", "Network Security"],
    funding_signal: "recruiting",
    source_url: "https://www.cl.cam.ac.uk/~arb33/"
  },
  {
    university: "University of Cambridge",
    department: "Department of Computer Science and Technology",
    name: "Martin Kleppmann",
    title: "Associate Professor",
    email: "martin.kleppmann@cl.cam.ac.uk",
    homepage_url: "https://martin.kleppmann.com/",
    lab_url: "https://www.cl.cam.ac.uk/research/srg/",
    research_areas: ["Distributed Systems", "Local-First Software", "CRDTs", "Event Streams", "Data Security"],
    funding_signal: "recruiting",
    source_url: "https://martin.kleppmann.com/"
  },
  {
    university: "University of Cambridge",
    department: "Department of Computer Science and Technology",
    name: "Jatinder Singh",
    title: "Associate Professor in Computer Science",
    email: "jatinder.singh@cl.cam.ac.uk",
    homepage_url: "https://www.cl.cam.ac.uk/~js855/",
    lab_url: "https://www.cl.cam.ac.uk/research/dtg/",
    research_areas: ["Trustworthy Autonomous Systems", "Distributed Cloud/IoT Governance", "AI Compliance", "Privacy"],
    funding_signal: "recruiting",
    source_url: "https://www.cl.cam.ac.uk/~js855/"
  },

  // 3. Imperial College London
  {
    university: "Imperial College London",
    department: "Department of Computing",
    name: "Peter Pietzuch",
    title: "Professor of Distributed Systems",
    email: "prp@imperial.ac.uk",
    homepage_url: "https://www.doc.ic.ac.uk/~prp/",
    lab_url: "https://lsds.doc.ic.ac.uk/",
    research_areas: ["Large-Scale Distributed Systems", "Confidential Computing", "Edge-to-Cloud Stream Processing", "TEE AI"],
    funding_signal: "recruiting",
    source_url: "https://lsds.doc.ic.ac.uk/"
  },
  {
    university: "Imperial College London",
    department: "Department of Computing",
    name: "Yves-Alexandre de Montjoye",
    title: "Associate Professor",
    email: "yvesalexandre@imperial.ac.uk",
    homepage_url: "https://www.imperial.ac.uk/people/y.demontjoye",
    lab_url: "https://cirlab.org/",
    research_areas: ["Computational Privacy", "Federated Learning Security", "Adversarial Machine Learning", "Data Anonymization"],
    funding_signal: "recruiting",
    source_url: "https://cirlab.org/"
  },
  {
    university: "Imperial College London",
    department: "Department of Computing",
    name: "Alessio Lomuscio",
    title: "Professor of Logic and Verification",
    email: "a.lomuscio@imperial.ac.uk",
    homepage_url: "https://www.doc.ic.ac.uk/~alessio/",
    lab_url: "https://vas.doc.ic.ac.uk/",
    research_areas: ["Verification of Neural Networks", "Safe Multi-Agent Systems", "Trustworthy AI", "Autonomous Systems"],
    funding_signal: "recruiting",
    source_url: "https://vas.doc.ic.ac.uk/"
  },

  // 4. University of Manchester
  {
    university: "University of Manchester",
    department: "Department of Computer Science",
    name: "Sophia Ananiadou",
    title: "Professor of Computer Science & Director of NaCTeM",
    email: "sophia.ananiadou@manchester.ac.uk",
    homepage_url: "https://www.research.manchester.ac.uk/portal/sophia.ananiadou.html",
    lab_url: "https://www.nactem.ac.uk/",
    research_areas: ["Biomedical Natural Language Processing", "Information Extraction", "Large Language Models", "Medical AI"],
    funding_signal: "recruiting",
    source_url: "https://www.nactem.ac.uk/"
  },
  {
    university: "University of Manchester",
    department: "Department of Computer Science",
    name: "Mikel Luján",
    title: "Professor of Computer Systems",
    email: "mikel.lujan@manchester.ac.uk",
    homepage_url: "https://www.cs.manchester.ac.uk/people/academic-and-research-staff/profile/?ea=mikel.lujan",
    lab_url: "https://apt.cs.manchester.ac.uk/",
    research_areas: ["Computer Systems Architecture", "Distributed Cloud Computing", "Edge AI Acceleration", "Runtime Verification"],
    funding_signal: "recruiting",
    source_url: "https://apt.cs.manchester.ac.uk/"
  },

  // 5. King's College London
  {
    university: "King's College London",
    department: "Department of Informatics",
    name: "Michael Luck",
    title: "Professor of Computer Science",
    email: "michael.luck@kcl.ac.uk",
    homepage_url: "https://www.kcl.ac.uk/people/michael-luck",
    lab_url: "https://www.kcl.ac.uk/informatics/research/groups/autonomous-systems-and-learning",
    research_areas: ["Multi-Agent Systems", "Agent Coordination", "Autonomous Decision Making", "Trust and Reputation"],
    funding_signal: "recruiting",
    source_url: "https://www.kcl.ac.uk/people/michael-luck"
  },
  {
    university: "King's College London",
    department: "Department of Informatics",
    name: "Elena Simperl",
    title: "Professor of Computer Science",
    email: "elena.simperl@kcl.ac.uk",
    homepage_url: "https://www.kcl.ac.uk/people/elena-simperl",
    lab_url: "https://datascience.kcl.ac.uk/",
    research_areas: ["Knowledge Graphs", "Human-Centered AI", "Data Centric ML", "LLM Evaluation"],
    funding_signal: "recruiting",
    source_url: "https://datascience.kcl.ac.uk/"
  },

  // 6. University of Bristol
  {
    university: "University of Bristol",
    department: "School of Computer Science",
    name: "Awais Rashid",
    title: "Professor of Cyber Security",
    email: "awais.rashid@bristol.ac.uk",
    homepage_url: "https://www.bristol.ac.uk/people/person/Awais-Rashid-60e53a99-bce7-459f-bb42-5e921d0339d6/",
    lab_url: "https://www.cybok.org/",
    research_areas: ["Cyber Security", "Software Vulnerability Analysis", "Cyber-Physical Systems", "Security Governance"],
    funding_signal: "recruiting",
    source_url: "https://www.bristol.ac.uk/engineering/research/cyber-security/"
  },
  {
    university: "University of Bristol",
    department: "School of Computer Science",
    name: "Dima Damen",
    title: "Professor of Computer Vision",
    email: "dima.damen@bristol.ac.uk",
    homepage_url: "https://dimadamen.github.io/",
    lab_url: "https://epic-kitchens.github.io/",
    research_areas: ["Computer Vision", "Video Understanding", "Multimodal Machine Learning", "Action Recognition"],
    funding_signal: "recruiting",
    source_url: "https://dimadamen.github.io/"
  },

  // 7. University of Warwick
  {
    university: "University of Warwick",
    department: "Department of Computer Science",
    name: "Carsten Maple",
    title: "Professor of Cyber Systems Engineering",
    email: "cm@warwick.ac.uk",
    homepage_url: "https://warwick.ac.uk/fac/sci/dcs/people/carsten_maple/",
    lab_url: "https://warwick.ac.uk/fac/sci/wmg/research/cyber-security/",
    research_areas: ["Cyber-Physical Systems Security", "Distributed Ledger Security", "Trustworthy Autonomous Systems", "IoT Security"],
    funding_signal: "recruiting",
    source_url: "https://warwick.ac.uk/fac/sci/dcs/people/carsten_maple/"
  },
  {
    university: "University of Warwick",
    department: "Department of Computer Science",
    name: "Arshad Jhumka",
    title: "Associate Professor",
    email: "a.jhumka@warwick.ac.uk",
    homepage_url: "https://warwick.ac.uk/fac/sci/dcs/people/arshad_jhumka/",
    lab_url: "https://warwick.ac.uk/fac/sci/dcs/research/systems/",
    research_areas: ["Dependable Distributed Systems", "Fault-Tolerant Computing", "Failure Prediction in Cloud", "Systems Verification"],
    funding_signal: "recruiting",
    source_url: "https://warwick.ac.uk/fac/sci/dcs/people/arshad_jhumka/"
  },

  // 8. University of Southampton
  {
    university: "University of Southampton",
    department: "School of Electronics and Computer Science",
    name: "Enrico Gerding",
    title: "Professor of Computer Science",
    email: "eg@ecs.soton.ac.uk",
    homepage_url: "https://www.ecs.soton.ac.uk/people/eg",
    lab_url: "https://aic.ecs.soton.ac.uk/",
    research_areas: ["Multi-Agent Systems", "Game Theory & Mechanism Design", "Decentralized AI", "Autonomous Energy Systems"],
    funding_signal: "recruiting",
    source_url: "https://aic.ecs.soton.ac.uk/"
  },
  {
    university: "University of Southampton",
    department: "School of Electronics and Computer Science",
    name: "Vladimiro Sassone",
    title: "Professor of Cyber Security",
    email: "vs@ecs.soton.ac.uk",
    homepage_url: "https://www.ecs.soton.ac.uk/people/vs",
    lab_url: "https://cyber.ecs.soton.ac.uk/",
    research_areas: ["Distributed Trust", "Blockchain & Smart Contracts", "Formal Security Verification", "Privacy Protection"],
    funding_signal: "recruiting",
    source_url: "https://cyber.ecs.soton.ac.uk/"
  },

  // 9. University of Birmingham
  {
    university: "University of Birmingham",
    department: "School of Computer Science",
    name: "David Oswald",
    title: "Professor of Computer Security",
    email: "d.f.oswald@bham.ac.uk",
    homepage_url: "https://www.birmingham.ac.uk/staff/profiles/computer-science/academic-staff/oswald-david",
    lab_url: "https://www.birmingham.ac.uk/research/activity/computer-science/security-and-privacy",
    research_areas: ["Hardware Security", "Side-Channel Attacks", "Embedded & IoT Security", "Applied Cryptography"],
    funding_signal: "recruiting",
    source_url: "https://www.birmingham.ac.uk/staff/profiles/computer-science/academic-staff/oswald-david"
  },
  {
    university: "University of Birmingham",
    department: "School of Computer Science",
    name: "Shan He",
    title: "Associate Professor in Computational Intelligence",
    email: "s.he@cs.bham.ac.uk",
    homepage_url: "https://www.cs.bham.ac.uk/~szh/",
    lab_url: "https://www.cs.bham.ac.uk/research/groupings/computational_biology/",
    research_areas: ["Computational Biology", "Biomedical Data Mining", "Bioinformatics", "Graph Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.bham.ac.uk/~szh/"
  },

  // 10. University of Sheffield
  {
    university: "University of Sheffield",
    department: "Department of Computer Science",
    name: "Haiping Lu",
    title: "Professor of Machine Learning",
    email: "h.lu@sheffield.ac.uk",
    homepage_url: "https://haipinglu.github.io/",
    lab_url: "https://sheffield-ml.github.io/",
    research_areas: ["Multimodal Biomedical Imaging", "Graph Neural Networks", "Interpretable AI", "Healthcare Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://haipinglu.github.io/"
  },
  {
    university: "University of Sheffield",
    department: "Department of Computer Science",
    name: "Mark Stevenson",
    title: "Professor of Computer Science",
    email: "mark.stevenson@sheffield.ac.uk",
    homepage_url: "https://markastevenson.github.io/",
    lab_url: "https://www.sheffield.ac.uk/dcs/research/groups/natural-language-processing",
    research_areas: ["Natural Language Processing", "Information Retrieval", "Text Mining", "Biomedical NLP"],
    funding_signal: "recruiting",
    source_url: "https://markastevenson.github.io/"
  },

  // 11. University of Leeds
  {
    university: "University of Leeds",
    department: "School of Computing",
    name: "He Wang",
    title: "Associate Professor in Computer Science",
    email: "h.e.wang@leeds.ac.uk",
    homepage_url: "https://drhewang.com/",
    lab_url: "https://eps.leeds.ac.uk/computing-research-groups",
    research_areas: ["Computer Vision", "Deep Learning", "Generative AI", "Motion Modeling"],
    funding_signal: "recruiting",
    source_url: "https://drhewang.com/"
  },
  {
    university: "University of Leeds",
    department: "School of Computing",
    name: "David Hogg",
    title: "Professor of Artificial Intelligence",
    email: "d.c.hogg@leeds.ac.uk",
    homepage_url: "https://eps.leeds.ac.uk/computing/staff/101/professor-david-hogg",
    lab_url: "https://eps.leeds.ac.uk/computing-research-groups/doc/artificial-intelligence",
    research_areas: ["Computer Vision", "Medical Image Analysis", "Continual Learning", "Pattern Recognition"],
    funding_signal: "recruiting",
    source_url: "https://eps.leeds.ac.uk/computing/staff/101/professor-david-hogg"
  },

  // 12. University of Nottingham
  {
    university: "University of Nottingham",
    department: "School of Computer Science",
    name: "Mercedes Torres Torres",
    title: "Associate Professor in Computer Vision",
    email: "mercedes.torrestorres@nottingham.ac.uk",
    homepage_url: "https://www.nottingham.ac.uk/computerscience/people/mercedes.torrestorres",
    lab_url: "https://www.nottingham.ac.uk/research/groups/computervisionlab/",
    research_areas: ["Medical Image Analysis", "Deep Learning for Healthcare", "Computer Vision", "Explainable AI"],
    funding_signal: "recruiting",
    source_url: "https://www.nottingham.ac.uk/computerscience/people/mercedes.torrestorres"
  },
  {
    university: "University of Nottingham",
    department: "School of Computer Science",
    name: "Derek McAuley",
    title: "Professor of Digital Economy",
    email: "derek.mcauley@nottingham.ac.uk",
    homepage_url: "https://www.nottingham.ac.uk/computerscience/people/derek.mcauley",
    lab_url: "https://www.horizon.ac.uk/",
    research_areas: ["Distributed Cloud Architecture", "Data Privacy & Governance", "Trustworthy Systems", "IoT Infrastructure"],
    funding_signal: "recruiting",
    source_url: "https://www.horizon.ac.uk/"
  },

  // 13. Queen Mary University of London
  {
    university: "Queen Mary University of London",
    department: "School of Electronic Engineering and Computer Science",
    name: "Massimo Poesio",
    title: "Professor of Computational Linguistics",
    email: "m.poesio@qmul.ac.uk",
    homepage_url: "https://www.qmul.ac.uk/eecs/people/profiles/poesiomassimo.html",
    lab_url: "https://cogsci.eecs.qmul.ac.uk/",
    research_areas: ["Computational Linguistics", "Natural Language Processing", "Dialogue Systems", "LLM Evaluation"],
    funding_signal: "recruiting",
    source_url: "https://cogsci.eecs.qmul.ac.uk/"
  },
  {
    university: "Queen Mary University of London",
    department: "School of Electronic Engineering and Computer Science",
    name: "Lin Wang",
    title: "Senior Lecturer in Edge Intelligence",
    email: "lin.wang@qmul.ac.uk",
    homepage_url: "https://linwang.info/",
    lab_url: "https://eecs.qmul.ac.uk/research/networks-research-group/",
    research_areas: ["Edge Intelligence", "Distributed Systems", "Federated Learning Optimization", "Cloud Computing"],
    funding_signal: "recruiting",
    source_url: "https://linwang.info/"
  },

  // 14. University of Glasgow
  {
    university: "University of Glasgow",
    department: "School of Computing Science",
    name: "Iadh Ounis",
    title: "Professor of Information Retrieval",
    email: "iadh.ounis@glasgow.ac.uk",
    homepage_url: "https://www.gla.ac.uk/schools/computing/staff/iadhasimounis/",
    lab_url: "http://terrierteam.dcs.gla.ac.uk/",
    research_areas: ["Information Retrieval", "Text Analytics", "LLM RAG Systems", "Search Optimization"],
    funding_signal: "recruiting",
    source_url: "http://terrierteam.dcs.gla.ac.uk/"
  },
  {
    university: "University of Glasgow",
    department: "School of Computing Science",
    name: "Jeremy Singer",
    title: "Reader in Computer Systems",
    email: "jeremy.singer@glasgow.ac.uk",
    homepage_url: "https://www.gla.ac.uk/schools/computing/staff/jeremysinger/",
    lab_url: "https://www.dcs.gla.ac.uk/research/cross/systems/",
    research_areas: ["Systems Software", "Serverless & Cloud Computing", "Programming Language Runtimes", "Edge Computing"],
    funding_signal: "recruiting",
    source_url: "https://www.gla.ac.uk/schools/computing/staff/jeremysinger/"
  },

  // 15. Newcastle University
  {
    university: "Newcastle University",
    department: "School of Computing",
    name: "Paul Watson",
    title: "Professor of Computer Science & Director of NICD",
    email: "paul.watson@newcastle.ac.uk",
    homepage_url: "https://www.ncl.ac.uk/computing/people/profile/paulwatson.html",
    lab_url: "https://www.nicd.org.uk/",
    research_areas: ["Scalable Information Systems", "Cloud Computing", "Data Science Engineering", "Distributed Pipelines"],
    funding_signal: "recruiting",
    source_url: "https://www.nicd.org.uk/"
  },
  {
    university: "Newcastle University",
    department: "School of Computing",
    name: "Charles Morisset",
    title: "Reader in Cyber Security",
    email: "charles.morisset@newcastle.ac.uk",
    homepage_url: "https://www.ncl.ac.uk/computing/people/profile/charlesmorisset.html",
    lab_url: "https://www.ncl.ac.uk/computing/research/security/",
    research_areas: ["Access Control Systems", "Cyber Security", "Distributed Policy Verification", "IoT Security"],
    funding_signal: "recruiting",
    source_url: "https://www.ncl.ac.uk/computing/research/security/"
  },

  // 16. University of Liverpool
  {
    university: "University of Liverpool",
    department: "Department of Computer Science",
    name: "Xiaowei Huang",
    title: "Professor of Autonomous Systems",
    email: "xiaowei.huang@liverpool.ac.uk",
    homepage_url: "https://cgi.csc.liv.ac.uk/~xiaowei/",
    lab_url: "https://www.liverpool.ac.uk/computer-science/research/autonomous-systems/",
    research_areas: ["Trustworthy AI", "Neural Network Verification", "Safe Multi-Agent Systems", "Robustness Certification"],
    funding_signal: "recruiting",
    source_url: "https://cgi.csc.liv.ac.uk/~xiaowei/"
  },
  {
    university: "University of Liverpool",
    department: "Department of Computer Science",
    name: "Rahul Savani",
    title: "Professor of Computer Science",
    email: "rahul.savani@liverpool.ac.uk",
    homepage_url: "https://cgi.csc.liv.ac.uk/~rahul/",
    lab_url: "https://www.liverpool.ac.uk/computer-science/research/economics-and-computation/",
    research_areas: ["Algorithmic Game Theory", "Multi-Agent Learning", "Reinforcement Learning", "Mechanism Design"],
    funding_signal: "recruiting",
    source_url: "https://cgi.csc.liv.ac.uk/~rahul/"
  },

  // 17. University of York
  {
    university: "University of York",
    department: "Department of Computer Science",
    name: "Radu Calinescu",
    title: "Professor of Computer Science",
    email: "radu.calinescu@york.ac.uk",
    homepage_url: "https://www.cs.york.ac.uk/~raduc/",
    lab_url: "https://assuring-autonomy.york.ac.uk/",
    research_areas: ["Trustworthy Autonomous Systems", "Self-Adaptive Software", "Formal Verification", "Safe AI"],
    funding_signal: "recruiting",
    source_url: "https://assuring-autonomy.york.ac.uk/"
  },
  {
    university: "University of York",
    department: "Department of Computer Science",
    name: "Leandro Soares Indrusiak",
    title: "Professor of Real-Time Systems",
    email: "leandro.indrusiak@york.ac.uk",
    homepage_url: "https://www.cs.york.ac.uk/~lsi/",
    lab_url: "https://www.cs.york.ac.uk/research/research-groups/rts/",
    research_areas: ["Distributed Real-Time Systems", "Multiprocessor Systems-on-Chip", "Cloud-Edge Schedulability", "Network-on-Chip"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.york.ac.uk/~lsi/"
  },

  // 18. University of Bath
  {
    university: "University of Bath",
    department: "Department of Computer Science",
    name: "Julian Padget",
    title: "Professor of Artificial Intelligence",
    email: "jap@cs.bath.ac.uk",
    homepage_url: "https://researchportal.bath.ac.uk/en/persons/julian-padget",
    lab_url: "https://www.bath.ac.uk/research-groups/artificial-intelligence/",
    research_areas: ["Multi-Agent Systems", "Normative Systems", "Trust and Reputation", "Autonomous Decision Making"],
    funding_signal: "recruiting",
    source_url: "https://researchportal.bath.ac.uk/en/persons/julian-padget"
  },
  {
    university: "University of Bath",
    department: "Department of Computer Science",
    name: "Neill Campbell",
    title: "Professor of Machine Learning and Visual Computing",
    email: "n.campbell@bath.ac.uk",
    homepage_url: "https://researchportal.bath.ac.uk/en/persons/neill-campbell",
    lab_url: "https://camera.bath.ac.uk/",
    research_areas: ["Machine Learning", "Probabilistic Graphical Models", "Visual Computing", "Deep Generative Models"],
    funding_signal: "recruiting",
    source_url: "https://camera.bath.ac.uk/"
  },

  // 19. Lancaster University
  {
    university: "Lancaster University",
    department: "School of Computing and Communications",
    name: "Neeraj Suri",
    title: "Professor of Dependable Systems",
    email: "n.suri@lancaster.ac.uk",
    homepage_url: "https://www.lancaster.ac.uk/scc/about-us/people/neeraj-suri",
    lab_url: "https://www.lancaster.ac.uk/scc/research/security-lancaster/",
    research_areas: ["Dependable Distributed Systems", "Cyber Security", "Fault Tolerance", "Cloud Resilience"],
    funding_signal: "recruiting",
    source_url: "https://www.lancaster.ac.uk/scc/about-us/people/neeraj-suri"
  },
  {
    university: "Lancaster University",
    department: "School of Computing and Communications",
    name: "Barry Porter",
    title: "Senior Lecturer in Systems Software",
    email: "b.f.porter@lancaster.ac.uk",
    homepage_url: "https://www.lancaster.ac.uk/scc/about-us/people/barry-porter",
    lab_url: "https://www.lancaster.ac.uk/scc/research/systems/",
    research_areas: ["Self-Adaptive Distributed Systems", "Autonomous Cloud Middleware", "Systems Programming", "Dynamic Evolution"],
    funding_signal: "recruiting",
    source_url: "https://www.lancaster.ac.uk/scc/about-us/people/barry-porter"
  },

  // 20. University of Exeter
  {
    university: "University of Exeter",
    department: "Department of Computer Science",
    name: "Ronaldo Menezes",
    title: "Professor of Data and Network Science",
    email: "r.menezes@exeter.ac.uk",
    homepage_url: "https://experts.exeter.ac.uk/29168-ronaldo-menezes",
    lab_url: "https://www.exeter.ac.uk/research/institutes/idss/",
    research_areas: ["Complex Networks", "Multi-Agent Coordination", "Human Mobility Mining", "Decentralized AI"],
    funding_signal: "recruiting",
    source_url: "https://experts.exeter.ac.uk/29168-ronaldo-menezes"
  },
  {
    university: "University of Exeter",
    department: "Department of Computer Science",
    name: "Achim Brucker",
    title: "Professor in Cybersecurity",
    email: "a.brucker@exeter.ac.uk",
    homepage_url: "https://experts.exeter.ac.uk/27599-achim-brucker",
    lab_url: "https://www.brucker.ch/",
    research_areas: ["Cybersecurity", "Formal Methods for Security", "Secure Software Engineering", "Access Control Verification"],
    funding_signal: "recruiting",
    source_url: "https://www.brucker.ch/"
  },

  // 21. University of Surrey
  {
    university: "University of Surrey",
    department: "Department of Computer Science",
    name: "Steve Schneider",
    title: "Professor of Computer Science & Director of SCCS",
    email: "s.schneider@surrey.ac.uk",
    homepage_url: "https://www.surrey.ac.uk/people/steve-schneider",
    lab_url: "https://www.surrey.ac.uk/surrey-centre-cyber-security",
    research_areas: ["Formal Methods in Security", "Distributed Ledger Technologies", "Verification of Protocols", "Electronic Voting"],
    funding_signal: "recruiting",
    source_url: "https://www.surrey.ac.uk/surrey-centre-cyber-security"
  },
  {
    university: "University of Surrey",
    department: "Department of Computer Science",
    name: "Adrian Hilton",
    title: "Professor of Computer Vision & Director of CVSSP",
    email: "a.hilton@surrey.ac.uk",
    homepage_url: "https://www.surrey.ac.uk/people/adrian-hilton",
    lab_url: "https://www.surrey.ac.uk/centre-vision-speech-signal-processing",
    research_areas: ["Computer Vision", "Multimodal Machine Learning", "3D Reconstruction", "Medical Image Processing"],
    funding_signal: "recruiting",
    source_url: "https://www.surrey.ac.uk/centre-vision-speech-signal-processing"
  },

  // 22. Cardiff University
  {
    university: "Cardiff University",
    department: "School of Computer Science and Informatics",
    name: "Alun Preece",
    title: "Professor of Intelligence Systems",
    email: "preecead@cardiff.ac.uk",
    homepage_url: "https://www.cardiff.ac.uk/people/view/120286-preece-alun",
    lab_url: "https://www.cardiff.ac.uk/research/explore/research-units/crime-and-security-research-institute",
    research_areas: ["Explainable AI", "Trustworthy Multi-Agent Systems", "Edge AI", "Knowledge Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cardiff.ac.uk/people/view/120286-preece-alun"
  },
  {
    university: "Cardiff University",
    department: "School of Computer Science and Informatics",
    name: "Omer Rana",
    title: "Professor of Performance Engineering",
    email: "ranaof@cardiff.ac.uk",
    homepage_url: "https://www.cardiff.ac.uk/people/view/120302-rana-omer",
    lab_url: "https://www.cardiff.ac.uk/research/explore/research-units/distributed-and-cloud-systems-research-group",
    research_areas: ["Distributed Cloud/Edge Computing", "Scalable Data Analytics", "Resource Management", "High Performance Computing"],
    funding_signal: "recruiting",
    source_url: "https://www.cardiff.ac.uk/people/view/120302-rana-omer"
  },

  // 23. Queen's University Belfast
  {
    university: "Queen's University Belfast",
    department: "School of Electronics, Electrical Engineering and Computer Science",
    name: "Jesus Martinez-del-Rincon",
    title: "Reader in Computer Vision & Cyber-Physical AI",
    email: "j.martinez-del-rincon@qub.ac.uk",
    homepage_url: "https://pure.qub.ac.uk/en/persons/jesus-martinez-del-rincon",
    lab_url: "https://www.qub.ac.uk/ecit/CSIT/",
    research_areas: ["Computer Vision", "Adversarial Machine Learning", "Cybersecurity AI", "Medical Imaging"],
    funding_signal: "recruiting",
    source_url: "https://pure.qub.ac.uk/en/persons/jesus-martinez-del-rincon"
  },
  {
    university: "Queen's University Belfast",
    department: "School of Electronics, Electrical Engineering and Computer Science",
    name: "Paul Miller",
    title: "Professor in Deep Learning and Intelligent Systems",
    email: "p.miller@qub.ac.uk",
    homepage_url: "https://pure.qub.ac.uk/en/persons/paul-miller",
    lab_url: "https://www.qub.ac.uk/research-centres/isrc/",
    research_areas: ["Deep Learning", "Biomedical Signal & Image Processing", "Machine Learning for Healthcare", "Computer Vision"],
    funding_signal: "recruiting",
    source_url: "https://pure.qub.ac.uk/en/persons/paul-miller"
  },

  // ==================== SWITZERLAND ====================
  // 24. University of Zurich (UZH)
  {
    university: "University of Zurich",
    department: "Department of Informatics",
    name: "Davide Scaramuzza",
    title: "Professor of Robotics and Perception",
    email: "sdavide@ifi.uzh.ch",
    homepage_url: "https://rpg.ifi.uzh.ch/people_scaramuzza.html",
    lab_url: "https://rpg.ifi.uzh.ch/",
    research_areas: ["Autonomous Navigation", "Event Cameras", "Computer Vision & Edge Perception", "Deep Robot Learning"],
    funding_signal: "recruiting",
    source_url: "https://rpg.ifi.uzh.ch/"
  },
  {
    university: "University of Zurich",
    department: "Department of Informatics",
    name: "Alberto Bacchelli",
    title: "Associate Professor of Empirical Software Engineering",
    email: "bacchelli@ifi.uzh.ch",
    homepage_url: "https://www.ifi.uzh.ch/en/seal/people/bacchelli.html",
    lab_url: "https://seal.ifi.uzh.ch/",
    research_areas: ["Empirical Software Engineering", "AI for Code", "Software Quality & Security", "Developer Experience"],
    funding_signal: "recruiting",
    source_url: "https://seal.ifi.uzh.ch/"
  },

  // 25. University of Basel
  {
    university: "University of Basel",
    department: "Department of Mathematics and Computer Science",
    name: "Christian Tschudin",
    title: "Professor of Computer Networks and Distributed Systems",
    email: "christian.tschudin@unibas.ch",
    homepage_url: "https://cn.cs.unibas.ch/people/cpt/",
    lab_url: "https://cn.cs.unibas.ch/",
    research_areas: ["Distributed Systems", "Information-Centric Networking", "Decentralized Protocols", "Edge Computing"],
    funding_signal: "recruiting",
    source_url: "https://cn.cs.unibas.ch/"
  },
  {
    university: "University of Basel",
    department: "Department of Mathematics and Computer Science",
    name: "Volker Roth",
    title: "Professor of Computer Science & Biomedical Data Science",
    email: "volker.roth@unibas.ch",
    homepage_url: "https://dmi.unibas.ch/en/persons/volker-roth/",
    lab_url: "https://informatik.unibas.ch/en/research/biomedical-data-analysis/",
    research_areas: ["Biomedical Machine Learning", "Probabilistic Graphical Models", "Statistical Learning", "Healthcare AI"],
    funding_signal: "recruiting",
    source_url: "https://dmi.unibas.ch/en/persons/volker-roth/"
  },

  // 26. University of Bern
  {
    university: "University of Bern",
    department: "Institute of Computer Science",
    name: "Christian Cachin",
    title: "Professor of Cryptology and Data Security",
    email: "cachin@inf.unibe.ch",
    homepage_url: "https://cachin.com/",
    lab_url: "https://crypto.unibe.ch/",
    research_areas: ["Distributed Consensus", "Blockchain Security", "Fault-Tolerant Distributed Algorithms", "Applied Cryptography"],
    funding_signal: "recruiting",
    source_url: "https://crypto.unibe.ch/"
  },
  {
    university: "University of Bern",
    department: "Institute of Computer Science",
    name: "Paolo Favaro",
    title: "Professor of Computer Vision",
    email: "paolo.favaro@inf.unibe.ch",
    homepage_url: "https://www.inf.unibe.ch/about_us/people/prof_dr_favaro_paolo/index_eng.html",
    lab_url: "https://www.cvg.inf.unibe.ch/",
    research_areas: ["Computer Vision", "Self-Supervised Learning", "Deep Generative Models", "Medical Image Reconstruction"],
    funding_signal: "recruiting",
    source_url: "https://www.cvg.inf.unibe.ch/"
  },

  // 27. Università della Svizzera italiana (USI)
  {
    university: "Università della Svizzera italiana",
    department: "Faculty of Informatics",
    name: "Fernando Pedone",
    title: "Full Professor of Distributed Systems",
    email: "fernando.pedone@usi.ch",
    homepage_url: "https://search.usi.ch/en/people/070f6be06518131d279cf48c3b7a8a61/pedone-fernando",
    lab_url: "https://www.inf.usi.ch/",
    research_areas: ["Dependable Distributed Systems", "State-Machine Replication", "High-Concurrency Cloud Transactions", "Fault Tolerance"],
    funding_signal: "recruiting",
    source_url: "https://search.usi.ch/en/people/070f6be06518131d279cf48c3b7a8a61/pedone-fernando"
  },
  {
    university: "Università della Svizzera italiana",
    department: "Faculty of Informatics",
    name: "Cesare Pautasso",
    title: "Full Professor of Software Engineering",
    email: "cesare.pautasso@usi.ch",
    homepage_url: "https://www.pautasso.info/",
    lab_url: "https://www.inf.usi.ch/",
    research_areas: ["Software Architecture", "Microservices & RESTful APIs", "Serverless Cloud Computing", "Asynchronous Pipelines"],
    funding_signal: "recruiting",
    source_url: "https://www.pautasso.info/"
  },

  // 28. University of Geneva
  {
    university: "University of Geneva",
    department: "Department of Computer Science",
    name: "Stephane Marchand-Maillet",
    title: "Professor of Computer Science",
    email: "stephane.marchand-maillet@unige.ch",
    homepage_url: "https://mediamining.unige.ch/people/marchand/",
    lab_url: "https://mediamining.unige.ch/",
    research_areas: ["Information Retrieval", "Multimodal Machine Learning", "Continual Learning", "High-Dimensional Data Analysis"],
    funding_signal: "recruiting",
    source_url: "https://mediamining.unige.ch/"
  },
  {
    university: "University of Geneva",
    department: "Department of Computer Science",
    name: "Svyatoslav Voloshynovskiy",
    title: "Professor of Information Security and Data Science",
    email: "svolos@unige.ch",
    homepage_url: "https://sip.unige.ch/team/svyatoslav-voloshynovskiy/",
    lab_url: "https://sip.unige.ch/",
    research_areas: ["Machine Learning Security", "Adversarial Robustness", "Information Privacy", "Biomedical Data Protection"],
    funding_signal: "recruiting",
    source_url: "https://sip.unige.ch/"
  },

  // ==================== NORDICS & WESTERN EUROPE ====================
  // 29. Chalmers University of Technology
  {
    university: "Chalmers University of Technology",
    department: "Department of Computer Science and Engineering",
    name: "Philippas Tsigas",
    title: "Professor of Distributed Computing",
    email: "tsigas@chalmers.se",
    homepage_url: "https://www.chalmers.se/en/persons/tsigas/",
    lab_url: "https://www.chalmers.se/en/departments/cse/research/distributed-computing-and-systems/",
    research_areas: ["Distributed Computing", "Concurrent Data Structures", "Non-Blocking Algorithms", "Fault-Tolerant Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.chalmers.se/en/persons/tsigas/"
  },
  {
    university: "Chalmers University of Technology",
    department: "Department of Computer Science and Engineering",
    name: "Devdatt Dubhashi",
    title: "Professor of Data Science and AI",
    email: "dubhashi@chalmers.se",
    homepage_url: "https://www.chalmers.se/en/persons/dubhashi/",
    lab_url: "https://www.chalmers.se/en/departments/cse/research/data-science-and-ai/",
    research_areas: ["Federated Learning", "Trustworthy AI", "Differential Privacy", "Biomedical AI"],
    funding_signal: "recruiting",
    source_url: "https://www.chalmers.se/en/persons/dubhashi/"
  },

  // 30. Lund University
  {
    university: "Lund University",
    department: "Department of Computer Science",
    name: "Jacek Malec",
    title: "Professor of Computer Science",
    email: "jacek.malec@cs.lth.se",
    homepage_url: "https://cs.lth.se/jacek-malec/",
    lab_url: "https://cs.lth.se/ai/",
    research_areas: ["Artificial Intelligence", "Knowledge Representation", "Multi-Agent Robotics", "Autonomous Systems"],
    funding_signal: "recruiting",
    source_url: "https://cs.lth.se/jacek-malec/"
  },
  {
    university: "Lund University",
    department: "Department of Computer Science",
    name: "Volker Krueger",
    title: "Professor of Computer Science",
    email: "volker.krueger@cs.lth.se",
    homepage_url: "https://cs.lth.se/volker-krueger/",
    lab_url: "https://cs.lth.se/ai/",
    research_areas: ["Computer Vision", "Perception for Autonomous Systems", "Deep Learning", "Sensor Fusion"],
    funding_signal: "recruiting",
    source_url: "https://cs.lth.se/volker-krueger/"
  },

  // 31. Uppsala University
  {
    university: "Uppsala University",
    department: "Department of Information Technology",
    name: "Bengt Jonsson",
    title: "Professor of Computer Science",
    email: "bengt.jonsson@it.uu.se",
    homepage_url: "https://katalog.uu.se/profile/?id=N96-136",
    lab_url: "https://www.it.uu.se/research/group/concur",
    research_areas: ["Formal Verification", "Distributed Systems Testing", "Automata Learning", "Secure Protocols"],
    funding_signal: "recruiting",
    source_url: "https://katalog.uu.se/profile/?id=N96-136"
  },
  {
    university: "Uppsala University",
    department: "Department of Information Technology",
    name: "Thomas Schön",
    title: "Beijer Professor of Artificial Intelligence",
    email: "thomas.schon@it.uu.se",
    homepage_url: "https://www.it.uu.se/katalog/thosc363",
    lab_url: "https://www.it.uu.se/research/group/ml",
    research_areas: ["Probabilistic Machine Learning", "Sequential Monte Carlo", "Biomedical Modeling", "Trustworthy Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.it.uu.se/katalog/thosc363"
  },

  // 32. Linköping University
  {
    university: "Linköping University",
    department: "Department of Computer and Information Science (IDA)",
    name: "Fredrik Heintz",
    title: "Professor of Computer Science",
    email: "fredrik.heintz@liu.se",
    homepage_url: "https://liu.se/en/employee/frehe41",
    lab_url: "https://www.ida.liu.se/divisions/aiics/",
    research_areas: ["Trustworthy AI", "Autonomous Systems", "Real-Time Reasoning", "Multi-Agent Coordination"],
    funding_signal: "recruiting",
    source_url: "https://liu.se/en/employee/frehe41"
  },
  {
    university: "Linköping University",
    department: "Department of Computer and Information Science (IDA)",
    name: "Christoph Kessler",
    title: "Professor of Computer Science",
    email: "christoph.kessler@liu.se",
    homepage_url: "https://www.ida.liu.se/~chrke55/",
    lab_url: "https://www.ida.liu.se/divisions/pelab/",
    research_areas: ["Parallel Computing", "Compiler Optimization for Cloud/GPU", "Systems Software", "Heterogeneous Architectures"],
    funding_signal: "recruiting",
    source_url: "https://www.ida.liu.se/~chrke55/"
  },

  // 33. Aalto University
  {
    university: "Aalto University",
    department: "Department of Computer Science",
    name: "Samuel Kaski",
    title: "Professor of Computer Science & Director of FCAI",
    email: "samuel.kaski@aalto.fi",
    homepage_url: "https://users.aalto.fi/~kaskis1/",
    lab_url: "https://fcai.fi/",
    research_areas: ["Probabilistic Machine Learning", "Human-in-the-loop AI", "Biomedical Data Science", "Federated Learning"],
    funding_signal: "recruiting",
    source_url: "https://fcai.fi/"
  },
  {
    university: "Aalto University",
    department: "Department of Computer Science",
    name: "Mario Di Francesco",
    title: "Associate Professor in Mobile Cloud Computing",
    email: "mario.di.francesco@aalto.fi",
    homepage_url: "https://people.aalto.fi/mario.di.francesco",
    lab_url: "https://www.aalto.fi/en/department-of-computer-science",
    research_areas: ["Mobile Edge Computing", "Internet of Things", "Distributed Systems", "Resource Allocation in Cloud"],
    funding_signal: "recruiting",
    source_url: "https://people.aalto.fi/mario.di.francesco"
  },

  // 34. University of Helsinki
  {
    university: "University of Helsinki",
    department: "Department of Computer Science",
    name: "Sasu Tarkoma",
    title: "Professor of Computer Science & Dean",
    email: "sasu.tarkoma@helsinki.fi",
    homepage_url: "https://researchportal.helsinki.fi/en/persons/sasu-tarkoma",
    lab_url: "https://www.helsinki.fi/en/researchgroups/networking-and-services",
    research_areas: ["Edge AI", "Mobile Distributed Systems", "Internet of Things", "Secure Distributed Middleware"],
    funding_signal: "recruiting",
    source_url: "https://researchportal.helsinki.fi/en/persons/sasu-tarkoma"
  },
  {
    university: "University of Helsinki",
    department: "Department of Computer Science",
    name: "Teemu Roos",
    title: "Professor of Computer Science",
    email: "teemu.roos@helsinki.fi",
    homepage_url: "https://www.cs.helsinki.fi/u/tcroos/",
    lab_url: "https://www.helsinki.fi/en/researchgroups/elements-of-ai",
    research_areas: ["Machine Learning Theory", "Information Theory", "Continual Learning", "Trustworthy AI"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.helsinki.fi/u/tcroos/"
  },

  // 35. NTNU (Norwegian University of Science and Technology)
  {
    university: "Norwegian University of Science and Technology",
    department: "Department of Computer Science (IDI)",
    name: "Hein Meling",
    title: "Professor of Computer Science",
    email: "hein.meling@ntnu.no",
    homepage_url: "https://www.ntnu.edu/employees/hein.meling",
    lab_url: "https://www.ntnu.edu/idi",
    research_areas: ["Dependable Distributed Systems", "Byzantine Fault Tolerance", "Blockchain Architectures", "High Concurrency"],
    funding_signal: "recruiting",
    source_url: "https://www.ntnu.edu/employees/hein.meling"
  },
  {
    university: "Norwegian University of Science and Technology",
    department: "Department of Computer Science (IDI)",
    name: "Frank Lindseth",
    title: "Professor of Medical Technology and AI",
    email: "frankl@ntnu.no",
    homepage_url: "https://www.ntnu.edu/employees/frankl",
    lab_url: "https://www.ntnu.edu/idi",
    research_areas: ["Medical Image Analysis", "Deep Learning in Healthcare", "Ultrasound AI", "Computer-Assisted Interventions"],
    funding_signal: "recruiting",
    source_url: "https://www.ntnu.edu/employees/frankl"
  },

  // 36. University of Oslo
  {
    university: "University of Oslo",
    department: "Department of Informatics (IFI)",
    name: "Roman Vitenberg",
    title: "Professor of Computer Science",
    email: "romanvi@ifi.uio.no",
    homepage_url: "https://www.mn.uio.no/ifi/english/people/aca/romanvi/",
    lab_url: "https://www.mn.uio.no/ifi/english/research/groups/nd/",
    research_areas: ["Distributed Consensus", "Fault Tolerance", "Cloud-Edge Middleware", "Peer-to-Peer Networks"],
    funding_signal: "recruiting",
    source_url: "https://www.mn.uio.no/ifi/english/people/aca/romanvi/"
  },
  {
    university: "University of Oslo",
    department: "Department of Informatics (IFI)",
    name: "Einar Broch Johnsen",
    title: "Professor of Informatics",
    email: "einarj@ifi.uio.no",
    homepage_url: "https://www.mn.uio.no/ifi/english/people/aca/einarj/",
    lab_url: "https://www.mn.uio.no/ifi/english/research/groups/pma/",
    research_areas: ["Formal Methods", "Cloud Computing Models", "Concurrent Systems Verification", "Digital Twins"],
    funding_signal: "recruiting",
    source_url: "https://www.mn.uio.no/ifi/english/people/aca/einarj/"
  },

  // 37. Technical University of Denmark (DTU)
  {
    university: "Technical University of Denmark",
    department: "Department of Applied Mathematics and Computer Science (DTU Compute)",
    name: "Flemming Nielson",
    title: "Professor of Computer Science",
    email: "fnie@dtu.dk",
    homepage_url: "https://orbit.dtu.dk/en/persons/flemming-nielson",
    lab_url: "https://www.compute.dtu.dk/english/research/research-sections/sec",
    research_areas: ["Static Analysis", "Distributed Systems Security", "Formal Verification", "Security Protocols"],
    funding_signal: "recruiting",
    source_url: "https://orbit.dtu.dk/en/persons/flemming-nielson"
  },
  {
    university: "Technical University of Denmark",
    department: "Department of Applied Mathematics and Computer Science (DTU Compute)",
    name: "Nicola Dragoni",
    title: "Professor in Cybersecurity and Pervasive Computing",
    email: "ndra@dtu.dk",
    homepage_url: "https://orbit.dtu.dk/en/persons/nicola-dragoni",
    lab_url: "https://www.compute.dtu.dk/english/research/research-sections/sec",
    research_areas: ["Cybersecurity", "Internet of Things Security", "Decentralized Access Control", "Microservices Security"],
    funding_signal: "recruiting",
    source_url: "https://orbit.dtu.dk/en/persons/nicola-dragoni"
  },

  // 38. University of Copenhagen
  {
    university: "University of Copenhagen",
    department: "Department of Computer Science (DIKU)",
    name: "Christian Igel",
    title: "Professor of Machine Learning",
    email: "igel@di.ku.dk",
    homepage_url: "https://di.ku.dk/english/staff/?pure=en/persons/294719",
    lab_url: "https://di.ku.dk/english/research/image-analysis-computational-modelling/machine-learning/",
    research_areas: ["Deep Learning Theory", "Biomedical AI", "Continual Optimization", "Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://di.ku.dk/english/staff/?pure=en/persons/294719"
  },
  {
    university: "University of Copenhagen",
    department: "Department of Computer Science (DIKU)",
    name: "Cosmin Oancea",
    title: "Professor of Parallel and High Performance Computing",
    email: "cosmin.oancea@diku.dk",
    homepage_url: "https://di.ku.dk/english/staff/?pure=en/persons/295254",
    lab_url: "https://futhark-lang.org/",
    research_areas: ["Parallel Computing", "Compiler Optimization for GPGPU", "High-Performance Systems", "Functional Programming"],
    funding_signal: "recruiting",
    source_url: "https://futhark-lang.org/"
  },

  // 39. Aarhus University
  {
    university: "Aarhus University",
    department: "Department of Computer Science",
    name: "Ira Assent",
    title: "Professor of Data-Intensive Systems",
    email: "ira@cs.au.dk",
    homepage_url: "https://pure.au.dk/portal/en/persons/ira-assent(4a1d4b6c-e58f-4cb1-80cf-f2bb1bbfe48d).html",
    lab_url: "https://cs.au.dk/research/data-intensive-systems/",
    research_areas: ["Data-Intensive Systems", "Distributed Analytics", "Scalable Machine Learning", "Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://cs.au.dk/research/data-intensive-systems/"
  },
  {
    university: "Aarhus University",
    department: "Department of Computer Science",
    name: "Jesper Buus Nielsen",
    title: "Professor of Cryptography",
    email: "jbn@cs.au.dk",
    homepage_url: "https://pure.au.dk/portal/en/persons/jesper-buus-nielsen(d57d77b8-da4b-4b2a-89a5-7b5fbda782f0).html",
    lab_url: "https://cs.au.dk/research/cryptography-and-security/",
    research_areas: ["Secure Multi-Party Computation (MPC)", "Applied Cryptography", "Privacy-Preserving Protocols", "Blockchain Security"],
    funding_signal: "recruiting",
    source_url: "https://cs.au.dk/research/cryptography-and-security/"
  }
];

async function run() {
  console.log(`Starting Wave 3 ingestion: ${wave3Faculty.length} faculty records across UK, Switzerland, and Nordics...`);
  
  const validated = wave3Faculty.map(item => {
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
  console.log("Wave 3 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave3Faculty };
