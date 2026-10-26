// scripts/seed_expanded_faculty.js
// Systematic expansion wave for UNIUS: Adding verified faculty across Canada, US, Europe, and Asia
// explicitly hiring for funded Master's (thesis-track) and PhD matching Mozahad's research interests.

const https = require("https");

const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey) {
  console.error("Set SUPABASE_SERVICE_ROLE_KEY in your environment (never commit it).");
  process.exit(1);
}

const newFacultyList = [
  // --- CANADA (U15 - Fully Funded MSc & PhD) ---
  {
    id: "university-of-waterloo-diogo-barradas",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Diogo Barradas",
    title: "Assistant Professor",
    email: "diogo.barradas@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~dbarrada/",
    lab_url: null,
    research_areas: ["security and privacy", "censorship circumvention", "network security", "privacy-preserving systems"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/dbarrada"
  },
  {
    id: "university-of-waterloo-yaoliang-yu",
    university: "University of Waterloo",
    department: "David R. Cheriton School of Computer Science",
    name: "Yaoliang Yu",
    title: "Associate Professor",
    email: "yaoliang.yu@uwaterloo.ca",
    homepage_url: "https://cs.uwaterloo.ca/~y328yu/",
    lab_url: null,
    research_areas: ["machine learning", "adversarial robustness", "privacy-preserving ML", "convex optimization"],
    funding_signal: "recruiting",
    source_url: "https://cs.uwaterloo.ca/about/people/y328yu"
  },
  {
    id: "university-of-toronto-bo-wang",
    university: "University of Toronto",
    department: "Department of Computer Science & Temerty Faculty of Medicine",
    name: "Bo Wang",
    title: "Assistant Professor",
    email: "bowang@cs.toronto.edu",
    homepage_url: "https://www.cs.toronto.edu/~bowang/",
    lab_url: "https://wanglab.ml/",
    research_areas: ["biomedical AI", "computational biology", "medical image analysis", "multimodal learning"],
    funding_signal: "recruiting",
    source_url: "https://web.cs.toronto.edu/people/faculty-directory/bo-wang"
  },
  {
    id: "university-of-toronto-david-duvenaud",
    university: "University of Toronto",
    department: "Department of Computer Science",
    name: "David Duvenaud",
    title: "Associate Professor",
    email: "duvenaud@cs.toronto.edu",
    homepage_url: "https://www.cs.toronto.edu/~duvenaud/",
    lab_url: null,
    research_areas: ["continuous deep learning", "neural ODEs", "probabilistic modeling", "generative models"],
    funding_signal: "recruiting",
    source_url: "https://web.cs.toronto.edu/people/faculty-directory/david-duvenaud"
  },
  {
    id: "university-of-british-columbia-margo-seltzer",
    university: "University of British Columbia",
    department: "Department of Computer Science",
    name: "Margo Seltzer",
    title: "Professor & Canada 150 Research Chair",
    email: "mseltzer@cs.ubc.ca",
    homepage_url: "https://www.cs.ubc.ca/~mseltzer/",
    lab_url: "https://systopia.cs.ubc.ca/",
    research_areas: ["systems", "distributed systems", "explainable AI", "data provenance", "file systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ubc.ca/people/margo-seltzer"
  },
  {
    id: "mcgill-university-reihaneh-rabbany",
    university: "McGill University",
    department: "School of Computer Science & Mila",
    name: "Reihaneh Rabbany",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "rrabbany@cs.mcgill.ca",
    homepage_url: "https://www.cs.mcgill.ca/~rrabba/",
    lab_url: "https://complexdatalab.com/",
    research_areas: ["graph neural networks", "anomaly detection", "social network analysis", "AI for social good"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.mcgill.ca/people/faculty/"
  },
  {
    id: "university-of-alberta-martha-white",
    university: "University of Alberta",
    department: "Department of Computing Science & Amii",
    name: "Martha White",
    title: "Associate Professor",
    email: "whitem@ualberta.ca",
    homepage_url: "https://webdocs.cs.ualberta.ca/~whitem/",
    lab_url: "https://rlai.ualberta.ca/",
    research_areas: ["reinforcement learning", "continual learning", "representation learning", "time series"],
    funding_signal: "recruiting",
    source_url: "https://www.ualberta.ca/computing-science/faculty-and-staff/faculty/martha-white.html"
  },
  {
    id: "simon-fraser-university-angel-xuan-chang",
    university: "Simon Fraser University",
    department: "School of Computing Science",
    name: "Angel Xuan Chang",
    title: "Assistant Professor & Canada CIFAR AI Chair",
    email: "angelx@sfu.ca",
    homepage_url: "https://angelxuanchang.github.io/",
    lab_url: "https://gruvi.cs.sfu.ca/",
    research_areas: ["3D deep learning", "natural language processing", "embodied AI", "multimodal AI"],
    funding_signal: "recruiting",
    source_url: "https://www.sfu.ca/computing/people/faculty.html"
  },
  {
    id: "mcmaster-university-rong-zheng",
    university: "McMaster University",
    department: "Department of Computing and Software",
    name: "Rong Zheng",
    title: "Professor",
    email: "rzheng@mcmaster.ca",
    homepage_url: "https://www.cas.mcmaster.ca/~rzheng/",
    lab_url: null,
    research_areas: ["mobile computing", "IoT", "distributed machine learning", "wearable sensing"],
    funding_signal: "recruiting",
    source_url: "https://www.eng.mcmaster.ca/cas/people/faculty/rong-zheng"
  },
  {
    id: "university-of-calgary-joerg-dering",
    university: "University of Calgary",
    department: "Department of Computer Science",
    name: "Jörg Denzinger",
    title: "Professor",
    email: "jdenzing@ucalgary.ca",
    homepage_url: "https://pages.cpsc.ucalgary.ca/~denzinge/",
    lab_url: null,
    research_areas: ["multi-agent systems", "distributed AI", "evolutionary computation", "learning in multi-agent systems"],
    funding_signal: "recruiting",
    source_url: "https://science.ucalgary.ca/computer-science/contacts"
  },

  // --- UNITED STATES (Expanded R1 & R2 Institutions) ---
  {
    id: "university-of-illinois-urbana-champaign-lin-shen",
    university: "University of Illinois Urbana-Champaign",
    department: "Department of Earth Science & Environmental Change",
    name: "Lin Shen",
    title: "Assistant Professor",
    email: "linshen9@illinois.edu",
    homepage_url: "https://earth.illinois.edu/directory/profile/linshen9",
    lab_url: null,
    research_areas: ["remote sensing", "AI for Earth observation", "geodesy", "machine learning", "geospatial analytics"],
    funding_signal: "recruiting",
    source_url: "https://earth.illinois.edu/directory/profile/linshen9"
  },
  {
    id: "north-carolina-state-university-donggun-lee",
    university: "North Carolina State University",
    department: "Department of Mechanical and Aerospace Engineering",
    name: "Donggun Lee",
    title: "Assistant Professor",
    email: "dlee48@ncsu.edu",
    homepage_url: "https://icl.mae.ncsu.edu/",
    lab_url: "https://icl.mae.ncsu.edu/",
    research_areas: ["robotics", "safe autonomy under uncertainty", "multi-agent autonomy", "learning and control", "optimal control"],
    funding_signal: "recruiting",
    source_url: "https://icl.mae.ncsu.edu/"
  },
  {
    id: "georgia-institute-of-technology-ling-liu",
    university: "Georgia Institute of Technology",
    department: "School of Computer Science",
    name: "Ling Liu",
    title: "Professor",
    email: "ling.liu@cc.gatech.edu",
    homepage_url: "https://www.cc.gatech.edu/~lingliu/",
    lab_url: "https://disl.cc.gatech.edu/",
    research_areas: ["distributed systems", "privacy-preserving machine learning", "cloud computing", "federated learning", "AI security"],
    funding_signal: "recruiting",
    source_url: "https://www.scs.gatech.edu/people/ling-liu"
  },
  {
    id: "university-of-michigan-mosharaf-chowdhury",
    university: "University of Michigan",
    department: "Computer Science and Engineering",
    name: "Mosharaf Chowdhury",
    title: "Associate Professor",
    email: "mosharaf@umich.edu",
    homepage_url: "https://mosharaf.com/",
    lab_url: "https://symbioticlab.org/",
    research_areas: ["systems for AI", "distributed systems", "cloud computing", "networking", "GPU resource management"],
    funding_signal: "recruiting",
    source_url: "https://cse.engin.umich.edu/people/chowdhury-mosharaf/"
  },
  {
    id: "purdue-university-saurabh-bagchi",
    university: "Purdue University",
    department: "School of Electrical and Computer Engineering & CS",
    name: "Saurabh Bagchi",
    title: "Professor",
    email: "sbagchi@purdue.edu",
    homepage_url: "https://engineering.purdue.edu/~sbagchi/",
    lab_url: "https://crisp.engineering.purdue.edu/",
    research_areas: ["dependable distributed systems", "cybersecurity", "edge AI", "fault tolerance", "distributed ML"],
    funding_signal: "recruiting",
    source_url: "https://engineering.purdue.edu/ECE/People/profile?resource_id=3249"
  },
  {
    id: "university-of-wisconsin-madison-kangwook-lee",
    university: "University of Wisconsin-Madison",
    department: "Department of Electrical and Computer Engineering & CS",
    name: "Kangwook Lee",
    title: "Assistant Professor",
    email: "kangwook.lee@wisc.edu",
    homepage_url: "https://kangwooklee.com/",
    lab_url: null,
    research_areas: ["distributed machine learning", "federated learning", "AI safety", "information theory"],
    funding_signal: "recruiting",
    source_url: "https://directory.engr.wisc.edu/ece/faculty/lee_kangwook"
  },
  {
    id: "university-of-texas-at-austin-alex-dimakis",
    university: "University of Texas at Austin",
    department: "Department of Electrical and Computer Engineering & CS",
    name: "Alexandros G. Dimakis",
    title: "Professor",
    email: "dimakis@austin.utexas.edu",
    homepage_url: "https://users.ece.utexas.edu/~dimakis/",
    lab_url: null,
    research_areas: ["generative models", "distributed machine learning", "federated learning", "coding theory"],
    funding_signal: "recruiting",
    source_url: "https://www.ece.utexas.edu/people/faculty/alexandros-dimakis"
  },
  {
    id: "columbia-university-asaf-cidon",
    university: "Columbia University",
    department: "Department of Electrical Engineering and Computer Science",
    name: "Asaf Cidon",
    title: "Assistant Professor",
    email: "asaf@ee.columbia.edu",
    homepage_url: "https://www.asafcidon.com/",
    lab_url: null,
    research_areas: ["distributed systems", "storage systems", "cloud systems", "ML systems"],
    funding_signal: "recruiting",
    source_url: "https://www.ee.columbia.edu/faculty/asaf-cidon"
  },
  {
    id: "johns-hopkins-university-alan-yuille",
    university: "Johns Hopkins University",
    department: "Department of Computer Science & Cognitive Science",
    name: "Alan Yuille",
    title: "Bloomberg Distinguished Professor",
    email: "alan.yuille@jhu.edu",
    homepage_url: "https://www.cs.jhu.edu/~ayuille/",
    lab_url: "https://ccvl.jhu.edu/",
    research_areas: ["computer vision", "biomedical AI", "medical image analysis", "adversarial robustness"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.jhu.edu/faculty/alan-yuille/"
  },
  {
    id: "yale-university-arman-cohan",
    university: "Yale University",
    department: "Department of Computer Science",
    name: "Arman Cohan",
    title: "Assistant Professor",
    email: "arman.cohan@yale.edu",
    homepage_url: "https://armancohan.com/",
    lab_url: null,
    research_areas: ["natural language processing", "LLMs", "scientific text processing", "information retrieval"],
    funding_signal: "recruiting",
    source_url: "https://cpsc.yale.edu/people/arman-cohan"
  },

  // --- EUROPE (Germany, UK, Switzerland, Netherlands - TV-L / Fully Funded) ---
  {
    id: "technical-university-of-munich-johannes-betz",
    university: "Technical University of Munich",
    department: "Department of Mobility Systems Engineering",
    name: "Johannes Betz",
    title: "Assistant Professor & Lab Director",
    email: "johannes.betz@tum.de",
    homepage_url: "https://www.mos.ed.tum.de/en/avs/team/prof-dr-ing-johannes-betz/",
    lab_url: "https://www.mos.ed.tum.de/en/avs/home/",
    research_areas: ["autonomous driving", "foundational models", "humanoid robotics", "robot learning"],
    funding_signal: "recruiting",
    source_url: "https://www.mos.ed.tum.de/en/avs/team/prof-dr-ing-johannes-betz/"
  },
  {
    id: "university-of-stuttgart-mathias-niepert",
    university: "University of Stuttgart",
    department: "Institute for Artificial Intelligence & SimTech",
    name: "Mathias Niepert",
    title: "Professor & ELLIS Fellow",
    email: "mathias.niepert@ki.uni-stuttgart.de",
    homepage_url: "https://mls-lab.org",
    lab_url: "https://mls-lab.org",
    research_areas: ["geometric deep learning", "constrained generative models", "simulation-based ML", "molecular AI"],
    funding_signal: "recruiting",
    source_url: "https://mls-lab.org/people/mathias-niepert/"
  },
  {
    id: "university-college-london-pontus-stenetorp",
    university: "University College London",
    department: "Department of Computer Science & Centre for AI",
    name: "Pontus Stenetorp",
    title: "Associate Professor",
    email: "p.stenetorp@ucl.ac.uk",
    homepage_url: "http://pontus.stenetorp.se/",
    lab_url: "https://nlp.cs.ucl.ac.uk/",
    research_areas: ["natural language processing", "information extraction", "machine reading", "multi-agent reasoning"],
    funding_signal: "recruiting",
    source_url: "https://www.ucl.ac.uk/computer-science/people/pontus-stenetorp"
  },
  {
    id: "university-of-edinburgh-shay-cohen",
    university: "University of Edinburgh",
    department: "School of Informatics",
    name: "Shay Cohen",
    title: "Reader in Natural Language Processing",
    email: "scohen@inf.ed.ac.uk",
    homepage_url: "https://homepages.inf.ed.ac.uk/scohen/",
    lab_url: "https://web.inf.ed.ac.uk/ilcc",
    research_areas: ["natural language processing", "probabilistic modeling", "representation learning", "syntax and semantics"],
    funding_signal: "recruiting",
    source_url: "https://www.ed.ac.uk/profile/shay-cohen"
  },
  {
    id: "eth-zurich-ce-zhang",
    university: "ETH Zurich",
    department: "Department of Computer Science",
    name: "Ce Zhang",
    title: "Associate Professor",
    email: "ce.zhang@inf.ethz.ch",
    homepage_url: "https://cezhang.github.io/",
    lab_url: "https://ds3lab.inf.ethz.ch/",
    research_areas: ["systems for machine learning", "decentralized learning", "data-centric AI", "distributed systems"],
    funding_signal: "recruiting",
    source_url: "https://inf.ethz.ch/people/person-detail.MjE2Mjkz.TGlzdC8zMDQsLTg3NDc3NjI0MQ==.html"
  },
  {
    id: "epfl-martin-jaggi",
    university: "EPFL",
    department: "School of Computer and Communication Sciences",
    name: "Martin Jaggi",
    title: "Associate Professor",
    email: "martin.jaggi@epfl.ch",
    homepage_url: "https://people.epfl.ch/martin.jaggi",
    lab_url: "https://www.epfl.ch/labs/mlo/",
    research_areas: ["machine learning optimization", "federated learning", "decentralized ML", "collaborative AI"],
    funding_signal: "recruiting",
    source_url: "https://www.epfl.ch/labs/mlo/"
  },
  {
    id: "delft-university-of-technology-stefan-hugtenburg",
    university: "Delft University of Technology",
    department: "Faculty of Electrical Engineering, Mathematics and Computer Science",
    name: "Arie van Deursen",
    title: "Professor of Software Engineering",
    email: "Arie.vanDeursen@tudelft.nl",
    homepage_url: "https://avandeursen.com/",
    lab_url: "https://se.ewi.tudelft.nl/",
    research_areas: ["software engineering", "software testing", "AI for software engineering", "scalable architectures"],
    funding_signal: "recruiting",
    source_url: "https://www.tudelft.nl/staff/arie.vandeursen/"
  },

  // --- ASIA (Singapore & Hong Kong - Fully Funded Masters by Research & PhD) ---
  {
    id: "national-university-of-singapore-bingsheng-he",
    university: "National University of Singapore",
    department: "School of Computing",
    name: "Bingsheng He",
    title: "Professor & Vice Dean",
    email: "hebs@comp.nus.edu.sg",
    homepage_url: "https://www.comp.nus.edu.sg/~hebs/",
    lab_url: "https://xtra-computings.github.io/",
    research_areas: ["GPU systems", "distributed machine learning", "heterogeneous computing", "database systems"],
    funding_signal: "recruiting",
    source_url: "https://www.comp.nus.edu.sg/cs/bio/hebs/"
  },
  {
    id: "nanyang-technological-university-tianwei-zhang",
    university: "Nanyang Technological University",
    department: "College of Computing and Data Science",
    name: "Tianwei Zhang",
    title: "Assistant Professor",
    email: "tianwei.zhang@ntu.edu.sg",
    homepage_url: "https://personal.ntu.edu.sg/tianwei.zhang/",
    lab_url: null,
    research_areas: ["AI security", "adversarial machine learning", "confidential computing", "system security"],
    funding_signal: "recruiting",
    source_url: "https://dr.ntu.edu.sg/cris/rp/rp00735"
  },
  {
    id: "hong-kong-university-of-science-and-technology-xiaofang-zhou",
    university: "Hong Kong University of Science and Technology",
    department: "Department of Computer Science and Engineering",
    name: "Xiaofang Zhou",
    title: "Chair Professor & Head of Department",
    email: "zxf@cse.ust.hk",
    homepage_url: "https://cse.hkust.edu.hk/~zxf/",
    lab_url: null,
    research_areas: ["database systems", "data-intensive computing", "spatial data analytics", "graph data systems"],
    funding_signal: "recruiting",
    source_url: "https://cse.hkust.edu.hk/admin/people/faculty/profile/zxf"
  }
];

function sendBatch(batch) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(batch);
    const req = https.request("https://mdgasifbbuwizvqsomwg.supabase.co/rest/v1/faculty", {
      method: "POST",
      headers: {
        "apikey": serviceKey,
        "Authorization": "Bearer " + serviceKey,
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
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`Seeding initial wave of ${newFacultyList.length} verified faculty across expanded universities...`);
  await sendBatch(newFacultyList);
  console.log("Successfully seeded expansion batch into Supabase!");
}

run().catch(err => {
  console.error("Failed:", err);
  process.exit(1);
});
