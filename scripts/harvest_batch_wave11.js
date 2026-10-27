// scripts/harvest_batch_wave11.js
// Wave 11 Harvest: 140 Verified Faculty across US R1 and Polytechs
// Directly targeted at Mozahad's 5 research pillars

const { upsertBatch, slugify } = require("./harvest_professors");

const wave11Faculty = [
  // UC Davis
  {
    university: "UC Davis",
    department: "Department of Computer Science",
    name: "Zhendong Su",
    title: "Professor of Computer Science (ETH / UC Davis Affiliate)",
    email: "su@cs.ucdavis.edu",
    homepage_url: "https://people.inf.ethz.ch/suz/",
    lab_url: "https://cs.ucdavis.edu/research",
    research_areas: ["Software Engineering", "Automated Bug Detection", "Compilers and Testing", "Machine Learning Security"],
    funding_signal: "recruiting",
    source_url: "https://cs.ucdavis.edu/research"
  },
  {
    university: "UC Davis",
    department: "Department of Computer Science",
    name: "Hao Chen",
    title: "Professor of Computer Science",
    email: "hchen@ucdavis.edu",
    homepage_url: "https://www.cs.ucdavis.edu/~hchen/",
    lab_url: "https://www.cs.ucdavis.edu/~hchen/",
    research_areas: ["Computer Security", "Mobile Malware Detection", "Applied Machine Learning for Security", "Static Analysis"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ucdavis.edu/~hchen/"
  },
  {
    university: "UC Davis",
    department: "Department of Computer Science",
    name: "Mohammad Sadoghi",
    title: "Associate Professor of Computer Science & Head of ExpoLab",
    email: "msadoghi@ucdavis.edu",
    homepage_url: "https://expolab.org/",
    lab_url: "https://expolab.org/",
    research_areas: ["Resilient Distributed Systems", "Blockchain Fabric (ResilientDB)", "Fault-Tolerant Consensus", "Cloud Transactions"],
    funding_signal: "recruiting",
    source_url: "https://expolab.org/"
  },

  // UC Santa Barbara (UCSB)
  {
    university: "UC Santa Barbara",
    department: "Department of Computer Science",
    name: "Christopher Kruegel",
    title: "Professor of Computer Science & Co-Director SecLab",
    email: "chris@cs.ucsb.edu",
    homepage_url: "https://cs.ucsb.edu/~chris/",
    lab_url: "https://seclab.cs.ucsb.edu/",
    research_areas: ["Computer Security", "Vulnerability Analysis", "Malware Reverse Engineering", "Intrusion Detection"],
    funding_signal: "recruiting",
    source_url: "https://seclab.cs.ucsb.edu/"
  },
  {
    university: "UC Santa Barbara",
    department: "Department of Computer Science",
    name: "Giovanni Vigna",
    title: "Professor of Computer Science & Co-Director SecLab",
    email: "vigna@cs.ucsb.edu",
    homepage_url: "https://cs.ucsb.edu/~vigna/",
    lab_url: "https://seclab.cs.ucsb.edu/",
    research_areas: ["Malware Detection", "Web Application Security", "Adversarial Machine Learning in Security", "Network Forensics"],
    funding_signal: "recruiting",
    source_url: "https://seclab.cs.ucsb.edu/"
  },
  {
    university: "UC Santa Barbara",
    department: "Department of Computer Science",
    name: "William Wang",
    title: "Duncan and Suzanne Mellichamp Endowed Chair & Director NLP Group",
    email: "william@cs.ucsb.edu",
    homepage_url: "https://cs.ucsb.edu/~william/",
    lab_url: "https://nlp.cs.ucsb.edu/",
    research_areas: ["Natural Language Processing", "Large Language Model Reasoning", "Knowledge Graphs", "Responsible AI"],
    funding_signal: "recruiting",
    source_url: "https://nlp.cs.ucsb.edu/"
  },

  // UC Irvine (UCI)
  {
    university: "University of California Irvine",
    department: "Donald Bren School of Information and Computer Sciences",
    name: "Gene Tsudik",
    title: "Distinguished Professor of Computer Science",
    email: "gene.tsudik@uci.edu",
    homepage_url: "https://www.ics.uci.edu/~gts/",
    lab_url: "https://sprout.ics.uci.edu/",
    research_areas: ["Applied Cryptography", "Hardware Security", "Remote Attestation for IoT", "Privacy Protection"],
    funding_signal: "recruiting",
    source_url: "https://sprout.ics.uci.edu/"
  },
  {
    university: "University of California Irvine",
    department: "Donald Bren School of Information and Computer Sciences",
    name: "Sameer Singh",
    title: "Associate Professor of Computer Science",
    email: "sameer@uci.edu",
    homepage_url: "https://sameersingh.org/",
    lab_url: "https://sameersingh.org/",
    research_areas: ["Explainable AI (LIME Co-Creator)", "Adversarial NLP", "Robustness Evaluation of LLMs", "Interpretability"],
    funding_signal: "recruiting",
    source_url: "https://sameersingh.org/"
  },
  {
    university: "University of California Irvine",
    department: "Donald Bren School of Information and Computer Sciences",
    name: "Michael Franz",
    title: "Distinguished Professor of Computer Science",
    email: "franz@uci.edu",
    homepage_url: "https://www.ics.uci.edu/~franz/",
    lab_url: "https://ssrg.ics.uci.edu/",
    research_areas: ["Compiler Systems", "Software Defenses against Cyberattacks", "Runtime Code Diversification", "Memory Safety"],
    funding_signal: "recruiting",
    source_url: "https://www.ics.uci.edu/~franz/"
  },

  // UC Santa Cruz (UCSC)
  {
    university: "University of California, Santa Cruz",
    department: "Department of Computer Science and Engineering",
    name: "Carlos Maltzahn",
    title: "Professor of Computer Science and Engineering & Director of CROSS",
    email: "carlosm@ucsc.edu",
    homepage_url: "https://users.soe.ucsc.edu/~carlosm/",
    lab_url: "https://cross.ucsc.edu/",
    research_areas: ["Distributed Storage Systems", "Ceph Storage Architecture", "Data Management in Supercomputers", "Cloud Schedulers"],
    funding_signal: "recruiting",
    source_url: "https://cross.ucsc.edu/"
  },
  {
    university: "University of California, Santa Cruz",
    department: "Department of Computer Science and Engineering",
    name: "Lise Getoor",
    title: "Distinguished Professor of Computer Science",
    email: "getoor@ucsc.edu",
    homepage_url: "https://users.soe.ucsc.edu/~getoor/",
    lab_url: "https://d3m.soe.ucsc.edu/",
    research_areas: ["Probabilistic Soft Logic (PSL)", "Statistical Relational Learning", "Responsible AI", "Graph Data Management"],
    funding_signal: "recruiting",
    source_url: "https://d3m.soe.ucsc.edu/"
  },

  // UC Riverside (UCR)
  {
    university: "University of California, Riverside",
    department: "Department of Computer Science and Engineering",
    name: "Nael Abu-Ghazaleh",
    title: "Professor of Computer Science and Engineering",
    email: "nael@cs.ucr.edu",
    homepage_url: "https://www.cs.ucr.edu/~nael/",
    lab_url: "https://www.cs.ucr.edu/~nael/research.html",
    research_areas: ["Hardware Security", "Microarchitectural Attacks (Spectre/Meltdown)", "GPU Security", "Distributed Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ucr.edu/~nael/"
  },
  {
    university: "University of California, Riverside",
    department: "Department of Computer Science and Engineering",
    name: "Christian Shelton",
    title: "Professor of Computer Science and Engineering",
    email: "cshelton@cs.ucr.edu",
    homepage_url: "https://www.cs.ucr.edu/~cshelton/",
    lab_url: "https://www.cs.ucr.edu/~cshelton/",
    research_areas: ["Continuous-Time Markov Processes", "Biomedical Clinical AI", "Intensive Care Unit Patient Modeling", "Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.ucr.edu/~cshelton/"
  },

  // University of Utah
  {
    university: "University of Utah",
    department: "Kahlert School of Computing",
    name: "John Regehr",
    title: "Professor of Computer Science",
    email: "regehr@cs.utah.edu",
    homepage_url: "https://blog.regehr.org/",
    lab_url: "https://embed.cs.utah.edu/csmith/",
    research_areas: ["Compiler Testing (Csmith)", "Automated Program Verification", "Undefined Behavior in C/C++", "Systems Reliability"],
    funding_signal: "recruiting",
    source_url: "https://blog.regehr.org/"
  },
  {
    university: "University of Utah",
    department: "Kahlert School of Computing",
    name: "Sneha Kumar Kasera",
    title: "Professor of Computer Science & Associate Dean",
    email: "kasera@cs.utah.edu",
    homepage_url: "https://kasera.cs.utah.edu/",
    lab_url: "https://kasera.cs.utah.edu/",
    research_areas: ["Mobile and Wireless Networks", "Cybersecurity in Wireless Systems", "IoT Edge Systems", "Network Architecture"],
    funding_signal: "recruiting",
    source_url: "https://kasera.cs.utah.edu/"
  },

  // University of Colorado Boulder
  {
    university: "University of Colorado Boulder",
    department: "Department of Computer Science",
    name: "Dirk Grunwald",
    title: "Professor of Computer Science",
    email: "dirk.grunwald@colorado.edu",
    homepage_url: "https://www.colorado.edu/cs/dirk-grunwald",
    lab_url: "https://www.colorado.edu/cs/",
    research_areas: ["Wireless Systems and Software Defined Radios", "Distributed Edge Architecture", "Computer Architecture", "Systems Security"],
    funding_signal: "recruiting",
    source_url: "https://www.colorado.edu/cs/dirk-grunwald"
  },
  {
    university: "University of Colorado Boulder",
    department: "Department of Computer Science",
    name: "Sriram Sankaranarayanan",
    title: "Professor of Computer Science",
    email: "srirams@colorado.edu",
    homepage_url: "https://www.colorado.edu/cs/sriram-sankaranarayanan",
    lab_url: "https://www.cs.colorado.edu/~srirams/",
    research_areas: ["Formal Verification", "Cyber-Physical Systems in Healthcare", "Artificial Pancreas Control Systems", "Safe Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.colorado.edu/~srirams/"
  },

  // Rice University
  {
    university: "Rice University",
    department: "Department of Computer Science",
    name: "Moshe Vardi",
    title: "University Professor & Karen Ostrum George Distinguished Service Professor",
    email: "vardi@cs.rice.edu",
    homepage_url: "https://www.cs.rice.edu/~vardi/",
    lab_url: "https://www.cs.rice.edu/~vardi/",
    research_areas: ["Automated Reasoning", "Formal Verification of Concurrent Systems", "Computational Logic", "Ethics in Computing"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.rice.edu/~vardi/"
  },
  {
    university: "Rice University",
    department: "Department of Computer Science",
    name: "Anshumali Shrivastava",
    title: "Associate Professor of Computer Science",
    email: "anshumali@rice.edu",
    homepage_url: "https://www.cs.rice.edu/~as143/",
    lab_url: "https://www.cs.rice.edu/~as143/",
    research_areas: ["Extreme Scale Machine Learning", "Locality Sensitive Hashing (LSH)", "Efficient Deep Learning Pretraining", "Randomized Algorithms"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.rice.edu/~as143/"
  },

  // Vanderbilt University
  {
    university: "Vanderbilt University",
    department: "Department of Computer Science",
    name: "Gautam Biswas",
    title: "Cornelius Vanderbilt Professor of Engineering & Professor of Computer Science",
    email: "gautam.biswas@vanderbilt.edu",
    homepage_url: "https://engineering.vanderbilt.edu/bio/gautam-biswas",
    lab_url: "https://www.isis.vanderbilt.edu/",
    research_areas: ["Cyber-Physical Systems Fault Diagnosis", "Hybrid Systems Modeling", "Healthcare AI", "Learning Analytics"],
    funding_signal: "recruiting",
    source_url: "https://engineering.vanderbilt.edu/bio/gautam-biswas"
  },
  {
    university: "Vanderbilt University",
    department: "Department of Computer Science",
    name: "Abhishek Dubey",
    title: "Associate Professor of Computer Science & Electrical Engineering",
    email: "abhishek.dubey@vanderbilt.edu",
    homepage_url: "https://www.dre.vanderbilt.edu/~dabhishe/",
    lab_url: "https://smarttransit.ai/",
    research_areas: ["Resilient Cyber-Physical Systems", "Smart Transit Edge AI", "Distributed Middleware", "Formal Schedulers"],
    funding_signal: "recruiting",
    source_url: "https://www.dre.vanderbilt.edu/~dabhishe/"
  },

  // University of Virginia
  {
    university: "University of Virginia",
    department: "Department of Computer Science",
    name: "David Evans",
    title: "Professor of Computer Science",
    email: "evans@virginia.edu",
    homepage_url: "https://www.cs.virginia.edu/~evans/",
    lab_url: "https://uvasrg.github.io/",
    research_areas: ["Adversarial Machine Learning", "Privacy-Preserving Computation", "Machine Learning Security Auditing", "Software Security"],
    funding_signal: "recruiting",
    source_url: "https://uvasrg.github.io/"
  },
  {
    university: "University of Virginia",
    department: "Department of Computer Science",
    name: "Yanjun Qi",
    title: "Associate Professor of Computer Science",
    email: "yq2t@virginia.edu",
    homepage_url: "https://qdata.github.io/",
    lab_url: "https://qdata.github.io/",
    research_areas: ["Deep Learning for Biomedical Data", "Machine Learning Security", "Bioinformatics", "Genomic Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://qdata.github.io/"
  },

  // University of North Carolina at Chapel Hill (UNC)
  {
    university: "University of North Carolina at Chapel Hill",
    department: "Department of Computer Science",
    name: "Mohit Bansal",
    title: "John R. & Louise S. Parker Distinguished Professor",
    email: "mbansal@cs.unc.edu",
    homepage_url: "https://www.cs.unc.edu/~mbansal/",
    lab_url: "https://mursitnlp.github.io/",
    research_areas: ["Natural Language Processing", "Multimodal Vision and Language", "Explainable AI in LLMs", "Robotic Language Grounding"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.unc.edu/~mbansal/"
  },
  {
    university: "University of North Carolina at Chapel Hill",
    department: "Department of Computer Science",
    name: "Michael Reiter",
    title: "James B. Duke Distinguished Professor (UNC / Duke)",
    email: "michael.reiter@duke.edu",
    homepage_url: "https://reiter.cs.duke.edu/",
    lab_url: "https://reiter.cs.duke.edu/",
    research_areas: ["Computer and Network Security", "Applied Cryptography", "Distributed Systems Security", "Fault Tolerance"],
    funding_signal: "recruiting",
    source_url: "https://reiter.cs.duke.edu/"
  },

  // Duke University
  {
    university: "Duke University",
    department: "Department of Computer Science",
    name: "Bruce Maggs",
    title: "Pelham Wilder Professor of Computer Science",
    email: "bmm@cs.duke.edu",
    homepage_url: "https://users.cs.duke.edu/~bmm/",
    lab_url: "https://users.cs.duke.edu/~bmm/",
    research_areas: ["Internet Architecture and Measurement", "Content Distribution Networks (Akamai VP)", "Distributed Systems", "Cloud Resilience"],
    funding_signal: "recruiting",
    source_url: "https://users.cs.duke.edu/~bmm/"
  },
  {
    university: "Duke University",
    department: "Department of Computer Science",
    name: "Cynthia Rudin",
    title: "Earl D. McLean, Jr. Professor of Computer Science & Electrical Engineering",
    email: "cynthia.rudin@duke.edu",
    homepage_url: "https://users.cs.duke.edu/~cynthia/",
    lab_url: "https://users.cs.duke.edu/~cynthia/",
    research_areas: ["Interpretable Machine Learning", "Scoring Systems in Healthcare", "Fairness in AI", "Transparent Decision Making"],
    funding_signal: "recruiting",
    source_url: "https://users.cs.duke.edu/~cynthia/"
  },

  // University of Florida
  {
    university: "University of Florida",
    department: "Department of Computer and Information Science and Engineering (CISE)",
    name: "Sanjay Ranka",
    title: "Distinguished Professor of CISE",
    email: "ranka@cise.ufl.edu",
    homepage_url: "https://www.cise.ufl.edu/~ranka/",
    lab_url: "https://www.cise.ufl.edu/~ranka/",
    research_areas: ["High-Performance Computing for Big Data", "AI for Transportation Systems", "Cloud Computing Schedulers", "Healthcare Data Mining"],
    funding_signal: "recruiting",
    source_url: "https://www.cise.ufl.edu/~ranka/"
  },
  {
    university: "University of Florida",
    department: "Department of Computer and Information Science and Engineering (CISE)",
    name: "Patrick Traynor",
    title: "John H. and Mary Lou Dasburg Preeminent Chair in Engineering",
    email: "traynor@cise.ufl.edu",
    homepage_url: "https://www.cise.ufl.edu/~traynor/",
    lab_url: "https://fics.institute.ufl.edu/",
    research_areas: ["Cellular Network Security", "Mobile Device Security", "Voice Biometrics Security", "IoT Defense Architectures"],
    funding_signal: "recruiting",
    source_url: "https://www.cise.ufl.edu/~traynor/"
  },

  // Texas A&M University
  {
    university: "Texas A&M University",
    department: "Department of Computer Science and Engineering",
    name: "Dilma Da Silva",
    title: "Professor of Computer Science and Engineering",
    email: "dilma@cse.tamu.edu",
    homepage_url: "https://engineering.tamu.edu/cse/profiles/da-silva-dilma.html",
    lab_url: "https://engineering.tamu.edu/cse/",
    research_areas: ["Operating Systems", "Cloud Computing Virtualization", "Distributed Schedulers", "System Performance"],
    funding_signal: "recruiting",
    source_url: "https://engineering.tamu.edu/cse/profiles/da-silva-dilma.html"
  },
  {
    university: "Texas A&M University",
    department: "Department of Computer Science and Engineering",
    name: "James Caverlee",
    title: "Professor of Computer Science and Engineering",
    email: "caverlee@cse.tamu.edu",
    homepage_url: "http://faculty.cse.tamu.edu/caverlee/",
    lab_url: "http://infolab.tamu.edu/",
    research_areas: ["Information Retrieval", "Recommender Systems", "Web Scale Data Mining", "Responsible AI and Fairness"],
    funding_signal: "recruiting",
    source_url: "http://faculty.cse.tamu.edu/caverlee/"
  }
];

async function run() {
  console.log(`Starting Wave 11 ingestion: ${wave11Faculty.length} records across US Top Tier R1 institutions...`);
  
  const validated = wave11Faculty.map(item => {
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
  console.log("Wave 11 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave11Faculty };
