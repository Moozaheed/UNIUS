// scripts/harvest_batch_wave2.js
// Ingest verified faculty from Canada (U15), Germany (TU9/MPI), Netherlands (TU Delft),
// Sweden (KTH), Singapore (NUS/NTU), and Hong Kong (HKU/HKUST).

const https = require("https");

const SUPABASE_URL = "https://mdgasifbbuwizvqsomwg.supabase.co";
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kZ2FzaWZiYnV3aXp2cXNvbXdnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDk3MDc3OSwiZXhwIjoyMTA2NTQ2Nzc5fQ.g3WicXorhtWGjYJqFrXRdWMfWroTwBzu5_bz3W7AHgY";

const wave2 = [
  // --- WATERLOO ---
  {
    id: "university-of-waterloo-florian-kerschbaum",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Florian Kerschbaum",
    title: "Professor & Executive Director, Waterloo Cybersecurity and Privacy Institute",
    email: "florian.kerschbaum@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~fkerschb/",
    lab_url: null,
    research_areas: ["privacy-preserving machine learning", "applied cryptography", "secure computation", "data security"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/fkerschb"
  },
  {
    id: "university-of-waterloo-n-asokan",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "N. Asokan",
    title: "Professor & Canada Excellence Research Chair",
    email: "asokan@uwaterloo.ca",
    homepage_url: "https://asokan.org/asokan/",
    lab_url: null,
    research_areas: ["systems security", "trustworthy AI", "hardware-assisted security", "privacy"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/nasokan"
  },
  {
    id: "university-of-waterloo-kate-larson",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Kate Larson",
    title: "Professor & University Research Chair",
    email: "kate.larson@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~klarson/",
    lab_url: null,
    research_areas: ["multi-agent systems", "cooperative AI", "algorithmic game theory", "strategic AI"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/klarson"
  },
  {
    id: "university-of-waterloo-victor-zhong",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Victor Zhong",
    title: "Assistant Professor",
    email: "victor.zhong@uwaterloo.ca",
    homepage_url: "https://victorzhong.com/",
    lab_url: null,
    research_areas: ["natural language processing", "large language models", "interactive learning", "reinforcement learning"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/vzhong"
  },
  {
    id: "university-of-waterloo-xinyue-vera-shen",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Xinyue (Vera) Shen",
    title: "Assistant Professor",
    email: "vera.shen@uwaterloo.ca",
    homepage_url: "https://verashen.github.io/",
    lab_url: null,
    research_areas: ["AI safety", "LLM security", "privacy in machine learning", "adversarial robustness"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/"
  },
  {
    id: "university-of-waterloo-meng-xu",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Meng Xu",
    title: "Assistant Professor",
    email: "meng.xu@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~m67xu/",
    lab_url: null,
    research_areas: ["systems security", "operating systems", "program analysis", "software reliability"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/m67xu"
  },
  {
    id: "university-of-waterloo-ian-goldberg",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Ian Goldberg",
    title: "Professor",
    email: "iang@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~iang/",
    lab_url: "https://crysp.uwaterloo.ca/",
    research_areas: ["privacy-enhancing technologies", "cryptography", "anonymity networks"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/iang"
  },

  // --- UBC ---
  {
    id: "university-of-british-columbia-ivan-beschastnikh",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Ivan Beschastnikh",
    title: "Associate Professor",
    email: "bestchai@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~bestchai/",
    lab_url: null,
    research_areas: ["distributed systems", "systems debugging", "software engineering", "formal methods"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/ivan-beschastnikh"
  },
  {
    id: "university-of-british-columbia-aastha-mehta",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Aastha Mehta",
    title: "Assistant Professor",
    email: "aasthakm@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~aasthakm/",
    lab_url: null,
    research_areas: ["systems security", "data privacy", "operating systems", "cloud security"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/aastha-mehta"
  },
  {
    id: "university-of-british-columbia-mathias-lecuyer",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Mathias Lécuyer",
    title: "Associate Professor",
    email: "mlecuyer@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~mlecuyer/",
    lab_url: null,
    research_areas: ["privacy-preserving machine learning", "differential privacy", "systems for ML", "trustworthy AI"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/mathias-lecuyer"
  },
  {
    id: "university-of-british-columbia-thomas-pasquier",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Thomas Pasquier",
    title: "Associate Professor",
    email: "tfjmp@cs.ubc.ca",
    homepage_url: "https://tfjmp.org/",
    lab_url: null,
    research_areas: ["systems security", "data provenance", "cloud security", "audit systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/thomas-pasquier"
  },
  {
    id: "university-of-british-columbia-vered-shwartz",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Vered Shwartz",
    title: "Assistant Professor",
    email: "vshwartz@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~vshwartz/",
    lab_url: null,
    research_areas: ["natural language processing", "commonsense reasoning", "multimodal AI", "computational linguistics"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/vered-shwartz"
  },
  {
    id: "university-of-british-columbia-danica-sutherland",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Danica Sutherland",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "dsuth@cs.ubc.ca",
    homepage_url: "https://djsutherland.ml/",
    lab_url: null,
    research_areas: ["machine learning theory", "representation learning", "kernel methods", "robust ML"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/danica-sutherland"
  },
  {
    id: "university-of-british-columbia-arpan-gujarati",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Arpan Gujarati",
    title: "Assistant Professor",
    email: "arpanbg@cs.ubc.ca",
    homepage_url: "https://arpanbg.com/",
    lab_url: null,
    research_areas: ["real-time systems", "distributed systems", "fault tolerance", "dependability"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/arpan-gujarati"
  },

  // --- ALBERTA ---
  {
    id: "university-of-alberta-paul-lu",
    university: "University of Alberta",
    department: "Department of Computing Science",
    name: "Paul Lu",
    title: "Professor",
    email: "paullu@ualberta.ca",
    homepage_url: "https://webdocs.cs.ualberta.ca/~paullu/",
    lab_url: null,
    research_areas: ["parallel and distributed systems", "cloud computing", "operating systems", "high-performance computing"],
    funding_signal: "recruiting",
    source_url: "https://www.ualberta.ca/computing-science/faculty-and-staff/faculty/paul-lu.html"
  },
  {
    id: "university-of-alberta-omid-ardakanian",
    university: "University of Alberta",
    department: "Department of Computing Science",
    name: "Omid Ardakanian",
    title: "Associate Professor",
    email: "ardakanian@ualberta.ca",
    homepage_url: "https://webdocs.cs.ualberta.ca/~ardakanian/",
    lab_url: null,
    research_areas: ["cyber-physical systems", "IoT", "networked systems", "machine learning for systems"],
    funding_signal: "recruiting",
    source_url: "https://www.ualberta.ca/computing-science/faculty-and-staff/faculty/omid-ardakanian.html"
  },
  {
    id: "university-of-alberta-lili-mou",
    university: "University of Alberta",
    department: "Department of Computing Science & Amii",
    name: "Lili Mou",
    title: "Associate Professor & Canada CIFAR AI Chair",
    email: "lmou@ualberta.ca",
    homepage_url: "https://lilmou.github.io/",
    lab_url: null,
    research_areas: ["natural language processing", "deep learning", "code intelligence", "text generation"],
    funding_signal: "recruiting",
    source_url: "https://www.ualberta.ca/computing-science/faculty-and-staff/faculty/lili-mou.html"
  },
  {
    id: "university-of-alberta-rupam-mahmood",
    university: "University of Alberta",
    department: "Department of Computing Science & Amii",
    name: "Rupam Mahmood",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "armahmood@ualberta.ca",
    homepage_url: "https://armahmood.github.io/",
    lab_url: null,
    research_areas: ["reinforcement learning", "continual learning", "adaptive systems", "robot learning"],
    funding_signal: "recruiting",
    source_url: "https://www.ualberta.ca/computing-science/faculty-and-staff/faculty/rupam-mahmood.html"
  },

  // --- MCGILL & MILA ---
  {
    id: "mcgill-university-golnoosh-farnadi",
    university: "McGill University",
    department: "School of Computer Science & Mila",
    name: "Golnoosh Farnadi",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "farnadi@cs.mcgill.ca",
    homepage_url: "https://www.cs.mcgill.ca/~gfarna/",
    lab_url: null,
    research_areas: ["trustworthy AI", "fairness in machine learning", "privacy-preserving AI", "social computing"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.mcgill.ca/people/faculty/"
  },
  {
    id: "mcgill-university-joelle-pineau",
    university: "McGill University",
    department: "School of Computer Science & Mila",
    name: "Joelle Pineau",
    title: "Professor & VP AI Research at Meta",
    email: "jpineau@cs.mcgill.ca",
    homepage_url: "https://www.cs.mcgill.ca/~jpineau/",
    lab_url: null,
    research_areas: ["reinforcement learning", "healthcare AI", "sequential decision making", "reproducible ML"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.mcgill.ca/people/faculty/"
  },

  // --- TU DARMSTADT ---
  {
    id: "tu-darmstadt-carsten-binnig",
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science",
    name: "Carsten Binnig",
    title: "Professor of Data and AI Systems",
    email: "carsten.binnig@cs.tu-darmstadt.de",
    homepage_url: "https://www.cs.tu-darmstadt.de/dais/",
    lab_url: "https://systems.informatik.tu-darmstadt.de/",
    research_areas: ["data management for ML", "distributed ML systems", "federated learning systems", "cloud data systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.tu-darmstadt.de/dais/staff_details_2624.en.jsp"
  },
  {
    id: "tu-darmstadt-kristian-kersting",
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science & hessian.AI",
    name: "Kristian Kersting",
    title: "Professor of Artificial Intelligence and Machine Learning",
    email: "kersting@cs.tu-darmstadt.de",
    homepage_url: "https://www.cs.tu-darmstadt.de/aiml/",
    lab_url: "https://hessian.ai/",
    research_areas: ["responsible AI", "deep probabilistic programming", "explainable AI", "neuro-symbolic AI"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.tu-darmstadt.de/aiml/staff_details_4032.en.jsp"
  },
  {
    id: "tu-darmstadt-ahmad-reza-sadeghi",
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science",
    name: "Ahmad-Reza Sadeghi",
    title: "Professor of System Security",
    email: "ahmad.sadeghi@trust.tu-darmstadt.de",
    homepage_url: "https://www.trust.tu-darmstadt.de/",
    lab_url: null,
    research_areas: ["hardware security", "trusted execution environments", "privacy in federated learning", "AI security"],
    funding_signal: "recruiting",
    source_url: "https://www.trust.tu-darmstadt.de/team/prof_dr_ing_ahmad_reza_sadeghi/"
  },
  {
    id: "tu-darmstadt-zsolt-istvan",
    university: "Technical University of Darmstadt",
    department: "Department of Computer Science",
    name: "Zsolt István",
    title: "Professor of Distributed and Networked Systems",
    email: "zsolt.istvan@cs.tu-darmstadt.de",
    homepage_url: "https://zsolt-istvan.github.io/",
    lab_url: null,
    research_areas: ["distributed systems", "hardware-accelerated systems", "networked systems", "cloud storage"],
    funding_signal: "recruiting",
    source_url: "https://systems.informatik.tu-darmstadt.de/"
  },

  // --- SAARLAND / MPI-SWS ---
  {
    id: "saarland-university-isabel-valera",
    university: "Saarland University",
    department: "Department of Computer Science & MPI-SWS",
    name: "Isabel Valera",
    title: "Professor of Machine Learning",
    email: "ivalera@cs.uni-saarland.de",
    homepage_url: "https://ivalera.me/",
    lab_url: null,
    research_areas: ["probabilistic machine learning", "fairness", "continual learning", "causal inference"],
    funding_signal: "recruiting",
    source_url: "https://saarland-informatics-campus.de/"
  },
  {
    id: "saarland-university-peter-druschel",
    university: "Saarland University",
    department: "Max Planck Institute for Software Systems (MPI-SWS)",
    name: "Peter Druschel",
    title: "Scientific Director & Professor",
    email: "druschel@mpi-sws.org",
    homepage_url: "https://people.mpi-sws.org/~druschel/",
    lab_url: "https://www.mpi-sws.org/",
    research_areas: ["distributed systems", "operating systems", "cloud security", "decentralized systems"],
    funding_signal: "recruiting",
    source_url: "https://www.mpi-sws.org/people/druschel/"
  },
  {
    id: "saarland-university-deepak-garg",
    university: "Saarland University",
    department: "Max Planck Institute for Software Systems (MPI-SWS)",
    name: "Deepak Garg",
    title: "Faculty & Professor",
    email: "dg@mpi-sws.org",
    homepage_url: "https://people.mpi-sws.org/~dg/",
    lab_url: null,
    research_areas: ["software security", "formal verification", "privacy policies", "programming languages"],
    funding_signal: "recruiting",
    source_url: "https://www.mpi-sws.org/people/dg/"
  },
  {
    id: "saarland-university-michael-backes",
    university: "Saarland University",
    department: "CISPA Helmholtz Center for Information Security",
    name: "Michael Backes",
    title: "Professor & Director, CISPA",
    email: "backes@cispa.de",
    homepage_url: "https://cispa.de/en/people/michael.backes",
    lab_url: "https://cispa.de/",
    research_areas: ["information security", "cryptography", "privacy in machine learning", "trustworthy AI"],
    funding_signal: "recruiting",
    source_url: "https://cispa.de/en/people/michael.backes"
  },

  // --- TU DELFT ---
  {
    id: "delft-university-of-technology-georgios-smaragdakis",
    university: "Delft University of Technology",
    department: "Faculty of Electrical Engineering, Mathematics and Computer Science",
    name: "Georgios Smaragdakis",
    title: "Professor & Head of Cybersecurity Group",
    email: "G.Smaragdakis@tudelft.nl",
    homepage_url: "https://smaragdakis.net/",
    lab_url: null,
    research_areas: ["cybersecurity", "internet measurement", "network privacy", "distributed systems"],
    funding_signal: "recruiting",
    source_url: "https://www.tudelft.nl/staff/g.smaragdakis/"
  },
  {
    id: "delft-university-of-technology-kaitai-liang",
    university: "Delft University of Technology",
    department: "Faculty of Electrical Engineering, Mathematics and Computer Science",
    name: "Kaitai Liang",
    title: "Associate Professor in Cybersecurity",
    email: "Kaitai.Liang@tudelft.nl",
    homepage_url: "https://kliang888.github.io/",
    lab_url: null,
    research_areas: ["applied cryptography", "privacy-preserving computation", "zero-knowledge proofs", "security in ML"],
    funding_signal: "recruiting",
    source_url: "https://www.tudelft.nl/staff/kaitai.liang/"
  },
  {
    id: "delft-university-of-technology-ana-lucia-varbanescu",
    university: "Delft University of Technology",
    department: "Faculty of Electrical Engineering, Mathematics and Computer Science",
    name: "Ana-Lucia Varbanescu",
    title: "Associate Professor in Distributed Systems",
    email: "A.L.Varbanescu@tudelft.nl",
    homepage_url: "https://www.tudelft.nl/en/eemcs/the-faculty/departments/software-technology/distributed-systems/people/ana-lucia-varbanescu",
    lab_url: null,
    research_areas: ["distributed systems", "high-performance computing", "performance modeling", "systems for AI"],
    funding_signal: "recruiting",
    source_url: "https://www.tudelft.nl/staff/a.l.varbanescu/"
  },

  // --- KTH SWEDEN ---
  {
    id: "kth-royal-institute-of-technology-amir-hossein-payberah",
    university: "KTH Royal Institute of Technology",
    department: "School of Electrical Engineering and Computer Science",
    name: "Amir Hossein Payberah",
    title: "Associate Professor in Distributed Systems",
    email: "payberah@kth.se",
    homepage_url: "https://people.kth.se/~payberah/",
    lab_url: null,
    research_areas: ["distributed machine learning", "scalable stream processing", "graph processing", "cloud computing"],
    funding_signal: "recruiting",
    source_url: "https://www.kth.se/profile/payberah"
  },
  {
    id: "kth-royal-institute-of-technology-sarunas-girdzijauskas",
    university: "KTH Royal Institute of Technology",
    department: "School of Electrical Engineering and Computer Science",
    name: "Sarunas Girdzijauskas",
    title: "Professor in Distributed Systems",
    email: "sarunasg@kth.se",
    homepage_url: "https://people.kth.se/~sarunasg/",
    lab_url: null,
    research_areas: ["decentralized machine learning", "distributed systems", "peer-to-peer networks", "scalable systems"],
    funding_signal: "recruiting",
    source_url: "https://www.kth.se/profile/sarunasg"
  },
  {
    id: "kth-royal-institute-of-technology-dejan-kostic",
    university: "KTH Royal Institute of Technology",
    department: "School of Electrical Engineering and Computer Science",
    name: "Dejan Kostic",
    title: "Professor of Internetworking",
    email: "dmk@kth.se",
    homepage_url: "https://people.kth.se/~dmk/",
    lab_url: null,
    research_areas: ["distributed systems", "low-latency networking", "cloud infrastructure", "operating systems"],
    funding_signal: "recruiting",
    source_url: "https://www.kth.se/profile/dmk"
  },
  {
    id: "kth-royal-institute-of-technology-panagiotis-papadimitratos",
    university: "KTH Royal Institute of Technology",
    department: "School of Electrical Engineering and Computer Science",
    name: "Panos Papadimitratos",
    title: "Professor in Networked Systems Security",
    email: "papadim@kth.se",
    homepage_url: "https://people.kth.se/~papadim/",
    lab_url: null,
    research_areas: ["network security", "privacy-enhancing technologies", "cyber-physical systems security"],
    funding_signal: "recruiting",
    source_url: "https://www.kth.se/profile/papadim"
  },

  // --- SINGAPORE (NUS / NTU) ---
  {
    id: "national-university-of-singapore-reza-shokri",
    university: "National University of Singapore",
    department: "School of Computing",
    name: "Reza Shokri",
    title: "Dean's Chair Associate Professor",
    email: "shokri@comp.nus.edu.sg",
    homepage_url: "https://www.comp.nus.edu.sg/~reza/",
    lab_url: null,
    research_areas: ["data privacy", "trustworthy machine learning", "federated learning security", "membership inference"],
    funding_signal: "recruiting",
    source_url: "https://www.comp.nus.edu.sg/cs/bio/reza/"
  },
  {
    id: "national-university-of-singapore-bryan-low",
    university: "National University of Singapore",
    department: "School of Computing",
    name: "Bryan Low (Low Kian Hsiang)",
    title: "Associate Professor & Deputy Director, NUS AI Institute",
    email: "lowkh@comp.nus.edu.sg",
    homepage_url: "https://www.comp.nus.edu.sg/~lowkh/",
    lab_url: null,
    research_areas: ["multi-agent systems", "automated machine learning", "Bayesian optimization", "planning under uncertainty"],
    funding_signal: "recruiting",
    source_url: "https://www.comp.nus.edu.sg/cs/bio/lowkh/"
  },
  {
    id: "national-university-of-singapore-prateek-saxena",
    university: "National University of Singapore",
    department: "School of Computing",
    name: "Prateek Saxena",
    title: "Associate Professor",
    email: "prateeks@comp.nus.edu.sg",
    homepage_url: "https://www.comp.nus.edu.sg/~prateeks/",
    lab_url: null,
    research_areas: ["system security", "trustworthy AI", "decentralized systems", "security in machine learning"],
    funding_signal: "recruiting",
    source_url: "https://www.comp.nus.edu.sg/cs/bio/prateeks/"
  },
  {
    id: "nanyang-technological-university-han-yu",
    university: "Nanyang Technological University",
    department: "College of Computing and Data Science",
    name: "Han Yu",
    title: "Associate Professor & Nanyang Assistant Professor",
    email: "han.yu@ntu.edu.sg",
    homepage_url: "https://personal.ntu.edu.sg/han.yu/",
    lab_url: null,
    research_areas: ["trustworthy federated learning", "multi-agent systems", "incentive mechanisms", "privacy-preserving AI"],
    funding_signal: "recruiting",
    source_url: "https://dr.ntu.edu.sg/cris/rp/rp00832"
  },
  {
    id: "nanyang-technological-university-liu-yang",
    university: "Nanyang Technological University",
    department: "College of Computing and Data Science",
    name: "Liu Yang",
    title: "Professor & Executive Director, Cyber Security Research Centre",
    email: "yangliu@ntu.edu.sg",
    homepage_url: "https://personal.ntu.edu.sg/yangliu/",
    lab_url: null,
    research_areas: ["cybersecurity", "software security", "trustworthy AI", "automated program repair"],
    funding_signal: "recruiting",
    source_url: "https://dr.ntu.edu.sg/cris/rp/rp00710"
  },

  // --- HONG KONG (HKU / HKUST) ---
  {
    id: "the-university-of-hong-kong-heming-cui",
    university: "The University of Hong Kong",
    department: "Department of Computer Science",
    name: "Heming Cui",
    title: "Associate Professor",
    email: "heming@cs.hku.hk",
    homepage_url: "https://i.cs.hku.hk/~heming/",
    lab_url: "https://i.cs.hku.hk/~heming/group.html",
    research_areas: ["parallel and distributed systems", "distributed AI serving and training", "systems security", "reliability"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.hku.hk/people/academic-staff/heming"
  },
  {
    id: "the-university-of-hong-kong-chuan-wu",
    university: "The University of Hong Kong",
    department: "Department of Computer Science",
    name: "Chuan Wu",
    title: "Professor",
    email: "cwu@cs.hku.hk",
    homepage_url: "https://i.cs.hku.hk/~cwu/",
    lab_url: null,
    research_areas: ["distributed systems", "cloud computing", "federated learning optimization", "machine learning systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.hku.hk/people/academic-staff/cwu"
  },
  {
    id: "hong-kong-university-of-science-and-technology-pan-hui",
    university: "Hong Kong University of Science and Technology",
    department: "Department of Computer Science and Engineering",
    name: "Pan Hui",
    title: "Chair Professor",
    email: "panhui@ust.hk",
    homepage_url: "https://panhui.people.ust.hk/",
    lab_url: null,
    research_areas: ["mobile computing", "edge AI", "distributed systems", "computational social science"],
    funding_signal: "recruiting",
    source_url: "https://cse.hkust.edu.hk/admin/people/faculty/profile/panhui"
  }
];

function sendBatch(batch) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(batch);
    const req = https.request(`${SUPABASE_URL}/rest/v1/faculty`, {
      method: "POST",
      headers: {
        "apikey": SERVICE_KEY,
        "Authorization": "Bearer " + SERVICE_KEY,
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
        "Content-Length": Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = "";
      res.on("data", d => data += d);
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(batch.length);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`Upserting Wave 2 batch of ${wave2.length} verified faculty profiles...`);
  await sendBatch(wave2);
  console.log("Wave 2 batch successfully upserted into Supabase!");
}

run().catch(console.error);
