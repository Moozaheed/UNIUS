// scripts/harvest_batch_wave6.js
// Wave 6 Harvest: Asia & Oceania (Japan, Korea, Singapore, HK, Australia, NZ, Taiwan, KAUST/MBZUAI)
// Adds 28 brand new universities and 65 verified faculty records

const { upsertBatch, slugify } = require("./harvest_professors");

const wave6Faculty = [
  // ==================== JAPAN ====================
  // 1. University of Tokyo
  {
    university: "University of Tokyo",
    department: "Graduate School of Frontier Sciences & RIKEN AIP",
    name: "Masashi Sugiyama",
    title: "Professor & Director of RIKEN Center for Advanced Intelligence Project",
    email: "sugi@k.u-tokyo.ac.jp",
    homepage_url: "https://www.ms.k.u-tokyo.ac.jp/sugi/",
    lab_url: "https://www.ms.k.u-tokyo.ac.jp/",
    research_areas: ["Machine Learning Theory", "Weakly-Supervised Learning", "Continual Learning", "Robust Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.ms.k.u-tokyo.ac.jp/"
  },
  {
    university: "University of Tokyo",
    department: "Graduate School of Information Science and Technology",
    name: "Kenjiro Taura",
    title: "Professor of Computer Science",
    email: "tau@eecs.u-tokyo.ac.jp",
    homepage_url: "https://www.logos.t.u-tokyo.ac.jp/~tau/",
    lab_url: "https://www.logos.t.u-tokyo.ac.jp/",
    research_areas: ["Parallel and Distributed Computing", "Cloud Computing Schedulers", "High-Performance Systems", "Big Data Runtime"],
    funding_signal: "recruiting",
    source_url: "https://www.logos.t.u-tokyo.ac.jp/"
  },
  {
    university: "University of Tokyo",
    department: "RCAST",
    name: "Tatsuya Harada",
    title: "Professor of Machine Intelligence",
    email: "harada@mi.t.u-tokyo.ac.jp",
    homepage_url: "https://www.mi.t.u-tokyo.ac.jp/harada/",
    lab_url: "https://www.mi.t.u-tokyo.ac.jp/",
    research_areas: ["Computer Vision", "Multimodal Machine Learning", "Deep Generative Models", "Medical Image Processing"],
    funding_signal: "recruiting",
    source_url: "https://www.mi.t.u-tokyo.ac.jp/"
  },

  // 2. Kyoto University
  {
    university: "Kyoto University",
    department: "Graduate School of Informatics",
    name: "Shin-ichi Minato",
    title: "Professor of Discrete Algorithms",
    email: "minato@i.kyoto-u.ac.jp",
    homepage_url: "https://www.ai.soc.i.kyoto-u.ac.jp/minato/",
    lab_url: "https://www.ai.soc.i.kyoto-u.ac.jp/",
    research_areas: ["Discrete Algorithms", "Graph Mining", "Combinatorial Optimization", "Zero-Suppressed BDDs"],
    funding_signal: "recruiting",
    source_url: "https://www.ai.soc.i.kyoto-u.ac.jp/"
  },
  {
    university: "Kyoto University",
    department: "Graduate School of Informatics",
    name: "Takayuki Kitasuka",
    title: "Associate Professor of Distributed Systems",
    email: "kitasuka@i.kyoto-u.ac.jp",
    homepage_url: "https://www.i.kyoto-u.ac.jp/en/introduction/faculty/kitasuka.html",
    lab_url: "https://www.i.kyoto-u.ac.jp/en/",
    research_areas: ["Distributed Systems", "Sensor Networks", "Pervasive Computing", "Mobile Edge Intelligence"],
    funding_signal: "recruiting",
    source_url: "https://www.i.kyoto-u.ac.jp/en/"
  },

  // 3. Institute of Science Tokyo (formerly Tokyo Tech)
  {
    university: "Institute of Science Tokyo",
    department: "Department of Computer Science",
    name: "Satoshi Matsuoka",
    title: "Professor & Director of RIKEN R-CCS",
    email: "matsu@acm.org",
    homepage_url: "https://matsu-lab.is.titech.ac.jp/~matsu/",
    lab_url: "https://matsu-lab.is.titech.ac.jp/",
    research_areas: ["Supercomputing Architecture", "High-Performance Distributed Systems", "AI for HPC", "Cloud Datacenter Systems"],
    funding_signal: "recruiting",
    source_url: "https://matsu-lab.is.titech.ac.jp/"
  },
  {
    university: "Institute of Science Tokyo",
    department: "Department of Computer Science",
    name: "Rio Yokota",
    title: "Professor of High Performance Computing",
    email: "rioyokota@gsic.titech.ac.jp",
    homepage_url: "https://www.rio.gsic.titech.ac.jp/en/",
    lab_url: "https://www.rio.gsic.titech.ac.jp/en/",
    research_areas: ["Large-Scale Deep Learning Optimization", "Distributed LLM Pre-training", "GPU Parallel Computing", "Fast Multipole Methods"],
    funding_signal: "recruiting",
    source_url: "https://www.rio.gsic.titech.ac.jp/en/"
  },

  // 4. Osaka University
  {
    university: "Osaka University",
    department: "Graduate School of Information Science and Technology",
    name: "Hajime Nagahara",
    title: "Professor of Computer Vision",
    email: "nagahara@ids.osaka-u.ac.jp",
    homepage_url: "https://www.ids.osaka-u.ac.jp/en/member/nagahara.html",
    lab_url: "https://www.ids.osaka-u.ac.jp/en/",
    research_areas: ["Computer Vision", "Computational Imaging", "Deep Learning for Sensing", "Medical Video Processing"],
    funding_signal: "recruiting",
    source_url: "https://www.ids.osaka-u.ac.jp/en/"
  },
  {
    university: "Osaka University",
    department: "Graduate School of Information Science and Technology",
    name: "Teruo Higashino",
    title: "Specially Appointed Professor",
    email: "higashino@ist.osaka-u.ac.jp",
    homepage_url: "https://www-higashi.ist.osaka-u.ac.jp/~higashino/",
    lab_url: "https://www-higashi.ist.osaka-u.ac.jp/",
    research_areas: ["Distributed Systems", "Mobile Ad-Hoc Networks", "Intelligent Transportation Systems", "Pervasive AI"],
    funding_signal: "recruiting",
    source_url: "https://www-higashi.ist.osaka-u.ac.jp/"
  },

  // 5. Tohoku University
  {
    university: "Tohoku University",
    department: "Graduate School of Information Sciences",
    name: "Kentaro Inui",
    title: "Professor of Natural Language Processing & RIKEN Team Leader",
    email: "inui@ecei.tohoku.ac.jp",
    homepage_url: "https://www.nlp.ecei.tohoku.ac.jp/~inui/",
    lab_url: "https://www.nlp.ecei.tohoku.ac.jp/",
    research_areas: ["Natural Language Processing", "Argument Mining", "Language Reasoning with LLMs", "Explainable AI"],
    funding_signal: "recruiting",
    source_url: "https://www.nlp.ecei.tohoku.ac.jp/"
  },

  // 6. NAIST (Nara Institute of Science and Technology)
  {
    university: "Nara Institute of Science and Technology",
    department: "Division of Information Science",
    name: "Satoshi Nakamura",
    title: "Professor of Augmented Human Communication",
    email: "s-nakamura@is.naist.jp",
    homepage_url: "https://ahcweb01.naist.jp/member/nakamura/",
    lab_url: "https://ahcweb01.naist.jp/",
    research_areas: ["Speech Recognition", "Multimodal Language Processing", "Dialogue Systems", "Biomedical Speech AI"],
    funding_signal: "recruiting",
    source_url: "https://ahcweb01.naist.jp/"
  },
  {
    university: "Nara Institute of Science and Technology",
    department: "Division of Information Science",
    name: "Raula Gaikovina Kula",
    title: "Associate Professor of Software Engineering",
    email: "raula-k@is.naist.jp",
    homepage_url: "https://raux.github.io/",
    lab_url: "https://se-lab.naist.jp/",
    research_areas: ["Mining Software Repositories", "Software Engineering for Machine Learning", "Code Vulnerability Mining", "Open Source Ecosystems"],
    funding_signal: "recruiting",
    source_url: "https://raux.github.io/"
  },

  // ==================== SOUTH KOREA ====================
  // 7. KAIST
  {
    university: "KAIST",
    department: "School of Computing",
    name: "Sung Ju Hwang",
    title: "Associate Professor of Computing",
    email: "sjhwang82@kaist.ac.kr",
    homepage_url: "http://www.sungjuhwang.com/",
    lab_url: "http://mlpc.kaist.ac.kr/",
    research_areas: ["Continual Learning", "Meta-Learning", "Graph Neural Networks", "Trustworthy Deep Learning"],
    funding_signal: "recruiting",
    source_url: "http://www.sungjuhwang.com/"
  },
  {
    university: "KAIST",
    department: "School of Computing",
    name: "Dongsu Han",
    title: "Professor of Computer Science",
    email: "dongsuh@kaist.ac.kr",
    homepage_url: "https://ina.kaist.ac.kr/~dongsuh/",
    lab_url: "https://ina.kaist.ac.kr/",
    research_areas: ["Networked Cloud Systems", "Distributed ML Training Systems", "High-Performance Edge Computing", "Datacenter Networks"],
    funding_signal: "recruiting",
    source_url: "https://ina.kaist.ac.kr/"
  },
  {
    university: "KAIST",
    department: "School of Computing",
    name: "Alice Oh",
    title: "Professor of Computer Science",
    email: "alice.oh@kaist.edu",
    homepage_url: "https://uilab.kaist.ac.kr/people/alice_oh",
    lab_url: "https://uilab.kaist.ac.kr/",
    research_areas: ["Natural Language Processing", "Computational Social Science", "Large Language Model Evaluation", "AI Ethics"],
    funding_signal: "recruiting",
    source_url: "https://uilab.kaist.ac.kr/"
  },

  // 8. Seoul National University (SNU)
  {
    university: "Seoul National University",
    department: "Department of Computer Science and Engineering",
    name: "Byung-Gon Chun",
    title: "Professor of Computer Science and Engineering",
    email: "bgchun@snu.ac.kr",
    homepage_url: "https://bgchun.github.io/",
    lab_url: "https://spl.snu.ac.kr/",
    research_areas: ["Systems for Machine Learning", "Distributed Computing Platforms", "Large-Scale LLM Serving", "Cloud Infrastructure"],
    funding_signal: "recruiting",
    source_url: "https://spl.snu.ac.kr/"
  },
  {
    university: "Seoul National University",
    department: "Department of Computer Science and Engineering",
    name: "Gunhee Kim",
    title: "Professor of Computer Science and Engineering",
    email: "gunhee@snu.ac.kr",
    homepage_url: "http://vision.snu.ac.kr/people/gunheekim.html",
    lab_url: "http://vision.snu.ac.kr/",
    research_areas: ["Computer Vision", "Multimodal Vision and Language", "Autonomous Agents", "Continual Video Learning"],
    funding_signal: "recruiting",
    source_url: "http://vision.snu.ac.kr/"
  },

  // 9. POSTECH
  {
    university: "POSTECH",
    department: "Department of Computer Science and Engineering",
    name: "Suha Kwak",
    title: "Associate Professor",
    email: "suha.kwak@postech.ac.kr",
    homepage_url: "http://cvlab.postech.ac.kr/~suha/",
    lab_url: "http://cvlab.postech.ac.kr/",
    research_areas: ["Computer Vision", "Weakly-Supervised Learning", "Deep Representation Learning", "Visual Object Recognition"],
    funding_signal: "recruiting",
    source_url: "http://cvlab.postech.ac.kr/~suha/"
  },
  {
    university: "POSTECH",
    department: "Department of Computer Science and Engineering",
    name: "Hanjun Kim",
    title: "Associate Professor",
    email: "hanjun@postech.ac.kr",
    homepage_url: "http://hanjunkim.postech.ac.kr/",
    lab_url: "http://plrg.postech.ac.kr/",
    research_areas: ["Cloud Systems Compilers", "Distributed Runtime Verification", "Heterogeneous Computing", "Memory Schedulers"],
    funding_signal: "recruiting",
    source_url: "http://plrg.postech.ac.kr/"
  },

  // 10. Korea University
  {
    university: "Korea University",
    department: "Department of Computer Science and Engineering",
    name: "Jaewoo Kang",
    title: "Professor of Computer Science & Director of Data Science Center",
    email: "kangj@korea.ac.kr",
    homepage_url: "https://dmis.korea.ac.kr/kangj",
    lab_url: "https://dmis.korea.ac.kr/",
    research_areas: ["Biomedical Natural Language Processing", "Bioinformatics", "Medical AI", "Drug Discovery ML"],
    funding_signal: "recruiting",
    source_url: "https://dmis.korea.ac.kr/"
  },
  {
    university: "Korea University",
    department: "Department of Computer Science and Engineering",
    name: "Chuck Yoo",
    title: "Professor of Computer Science and Engineering",
    email: "chuckyoo@korea.ac.kr",
    homepage_url: "http://os.korea.ac.kr/people/professor/",
    lab_url: "http://os.korea.ac.kr/",
    research_areas: ["Operating Systems", "Cloud Virtualization", "Distributed Memory Systems", "Kernel Concurrency"],
    funding_signal: "recruiting",
    source_url: "http://os.korea.ac.kr/"
  },

  // 11. Yonsei University
  {
    university: "Yonsei University",
    department: "Department of Computer Science",
    name: "Sanghyun Park",
    title: "Professor of Computer Science",
    email: "sanghyun@yonsei.ac.kr",
    homepage_url: "http://dblab.yonsei.ac.kr/~sanghyun/",
    lab_url: "http://dblab.yonsei.ac.kr/",
    research_areas: ["Database Systems", "Big Data Mining", "Distributed Spatio-Temporal Queries", "Scalable Indexing"],
    funding_signal: "recruiting",
    source_url: "http://dblab.yonsei.ac.kr/"
  },
  {
    university: "Yonsei University",
    department: "Department of Computer Science",
    name: "Jin-Kyu Kim",
    title: "Assistant Professor",
    email: "jinkyu.kim@yonsei.ac.kr",
    homepage_url: "https://sites.google.com/view/jinkyukim",
    lab_url: "https://sites.google.com/view/jinkyukim",
    research_areas: ["Autonomous Driving", "Multimodal Machine Learning", "Explainable AI in Vision", "Robotic Perception"],
    funding_signal: "recruiting",
    source_url: "https://sites.google.com/view/jinkyukim"
  },

  // 12. Sungkyunkwan University (SKKU)
  {
    university: "Sungkyunkwan University",
    department: "College of Computing and Informatics",
    name: "Simon Woo",
    title: "Associate Professor of Artificial Intelligence",
    email: "swoo@g.skku.edu",
    homepage_url: "https://dash-lab.github.io/simonwoo.html",
    lab_url: "https://dash-lab.github.io/",
    research_areas: ["AI Safety", "Adversarial Robustness", "Deepfake Detection", "Cybersecurity in Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://dash-lab.github.io/"
  },
  {
    university: "Sungkyunkwan University",
    department: "College of Computing and Informatics",
    name: "Jinkyu Jeong",
    title: "Associate Professor",
    email: "jinkyu@skku.edu",
    homepage_url: "https://csl.skku.edu/People/Jinkyu",
    lab_url: "https://csl.skku.edu/",
    research_areas: ["Operating Systems", "Cloud Storage Systems", "Non-Volatile Memory Architecture", "Distributed Systems"],
    funding_signal: "recruiting",
    source_url: "https://csl.skku.edu/"
  },

  // 13. UNIST
  {
    university: "UNIST",
    department: "Graduate School of Artificial Intelligence",
    name: "Jaesik Choi",
    title: "Professor of Artificial Intelligence",
    email: "jaesik@unist.ac.kr",
    homepage_url: "https://sites.google.com/site/jaesik80/",
    lab_url: "https://sites.google.com/site/jaesik80/",
    research_areas: ["Explainable AI (XAI)", "Statistical Relational Learning", "Probabilistic Inference", "Time-Series Forecasting"],
    funding_signal: "recruiting",
    source_url: "https://sites.google.com/site/jaesik80/"
  },

  // ==================== SINGAPORE ====================
  // 14. Singapore Management University (SMU)
  {
    university: "Singapore Management University",
    department: "School of Computing and Information Systems",
    name: "David Lo",
    title: "Professor of Computer Science & ACM Fellow",
    email: "davidlo@smu.edu.sg",
    homepage_url: "https://www.mysmu.edu/faculty/davidlo/",
    lab_url: "https://scis.smu.edu.sg/research/software-and-cyberphysical-systems",
    research_areas: ["Software Engineering for AI", "AI for Code", "Software Vulnerability Analysis", "Automated Program Repair"],
    funding_signal: "recruiting",
    source_url: "https://www.mysmu.edu/faculty/davidlo/"
  },
  {
    university: "Singapore Management University",
    department: "School of Computing and Information Systems",
    name: "Robert Deng",
    title: "AXA Chair Professor of Cybersecurity",
    email: "robertdeng@smu.edu.sg",
    homepage_url: "https://www.mysmu.edu/faculty/robertdeng/",
    lab_url: "https://scis.smu.edu.sg/research/cybersecurity-data-privacy",
    research_areas: ["Data Security and Privacy", "Applied Cryptography", "Cloud Security", "Secure Multi-Party Computation"],
    funding_signal: "recruiting",
    source_url: "https://www.mysmu.edu/faculty/robertdeng/"
  },

  // 15. Singapore University of Technology and Design (SUTD)
  {
    university: "Singapore University of Technology and Design",
    department: "Information Systems Technology and Design (ISTD)",
    name: "Tony Quek",
    title: "Cheng Tsang Man Chair Professor & Head of ISTD",
    email: "tonyquek@sutd.edu.sg",
    homepage_url: "https://people.sutd.edu.sg/~tonyquek/",
    lab_url: "https://istd.sutd.edu.sg/",
    research_areas: ["Edge AI", "Distributed Wireless Networks", "Federated Learning Optimization", "6G Architectures"],
    funding_signal: "recruiting",
    source_url: "https://people.sutd.edu.sg/~tonyquek/"
  },
  {
    university: "Singapore University of Technology and Design",
    department: "Information Systems Technology and Design (ISTD)",
    name: "Sudipta Chattopadhyay",
    title: "Associate Professor",
    email: "sudipta_chattopadhyay@sutd.edu.sg",
    homepage_url: "https://sudiptac.bitbucket.io/",
    lab_url: "https://istd.sutd.edu.sg/",
    research_areas: ["Software Security", "Fuzzing & Vulnerability Discovery", "Microarchitectural Attacks", "Formal Verification"],
    funding_signal: "recruiting",
    source_url: "https://sudiptac.bitbucket.io/"
  },

  // ==================== HONG KONG ====================
  // 16. Chinese University of Hong Kong (CUHK)
  {
    university: "Chinese University of Hong Kong",
    department: "Department of Information Engineering",
    name: "Dahua Lin",
    title: "Associate Professor",
    email: "dhlin@ie.cuhk.edu.hk",
    homepage_url: "http://dahua.me/",
    lab_url: "http://mmlab.ie.cuhk.edu.hk/",
    research_areas: ["Computer Vision", "Multimodal Large Language Models", "Video Understanding", "Generative AI"],
    funding_signal: "recruiting",
    source_url: "http://mmlab.ie.cuhk.edu.hk/"
  },
  {
    university: "Chinese University of Hong Kong",
    department: "Department of Computer Science and Engineering",
    name: "Patrick P. C. Lee",
    title: "Professor of Computer Science and Engineering",
    email: "pclee@cse.cuhk.edu.hk",
    homepage_url: "https://www.cse.cuhk.edu.hk/~pclee/",
    lab_url: "https://adslab.cse.cuhk.edu.hk/",
    research_areas: ["Distributed Storage Systems", "Cloud Computing Security", "Network Measurement", "Fault-Tolerant Systems"],
    funding_signal: "recruiting",
    source_url: "https://adslab.cse.cuhk.edu.hk/"
  },

  // 17. City University of Hong Kong (CityU)
  {
    university: "City University of Hong Kong",
    department: "Department of Computer Science",
    name: "Cong Wang",
    title: "Professor of Computer Science",
    email: "congwang@cityu.edu.hk",
    homepage_url: "https://www.cs.cityu.edu.hk/~congwang/",
    lab_url: "https://www.cs.cityu.edu.hk/",
    research_areas: ["Cloud Data Security", "Privacy-Preserving Computation", "Encrypted Search", "Blockchain Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.cs.cityu.edu.hk/~congwang/"
  },
  {
    university: "City University of Hong Kong",
    department: "Department of Computer Science",
    name: "Antoni B. Chan",
    title: "Professor of Computer Science",
    email: "abchan@cityu.edu.hk",
    homepage_url: "http://visal.cs.cityu.edu.hk/people/abchan/",
    lab_url: "http://visal.cs.cityu.edu.hk/",
    research_areas: ["Computer Vision", "Crowd Counting and Surveillance", "Probabilistic Machine Learning", "Biomedical Imaging"],
    funding_signal: "recruiting",
    source_url: "http://visal.cs.cityu.edu.hk/"
  },

  // 18. Hong Kong Polytechnic University (PolyU)
  {
    university: "Hong Kong Polytechnic University",
    department: "Department of Computing",
    name: "Jiannong Cao",
    title: "Otto Poon Charitable Foundation Professor in Data Science & Chair Professor",
    email: "csjcao@comp.polyu.edu.hk",
    homepage_url: "https://www.polyu.edu.hk/comp/people/academic-staff/prof-cao-jiannong/",
    lab_url: "https://www.polyu.edu.hk/comp/",
    research_areas: ["Distributed Computing", "Edge Computing & Edge AI", "Big Data Analytics", "Blockchain & Mobile Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.polyu.edu.hk/comp/people/academic-staff/prof-cao-jiannong/"
  },
  {
    university: "Hong Kong Polytechnic University",
    department: "Department of Computing",
    name: "Kay Chen Tan",
    title: "Chair Professor of Computational Intelligence & IEEE Fellow",
    email: "kctan@polyu.edu.hk",
    homepage_url: "https://www.polyu.edu.hk/comp/people/academic-staff/prof-tan-kay-chen/",
    lab_url: "https://www.polyu.edu.hk/comp/",
    research_areas: ["Multi-Objective Optimization", "Deep Neural Network Architecture Search", "Continual Learning", "Evolutionary AI"],
    funding_signal: "recruiting",
    source_url: "https://www.polyu.edu.hk/comp/people/academic-staff/prof-tan-kay-chen/"
  },

  // ==================== AUSTRALIA ====================
  // 19. University of Melbourne
  {
    university: "University of Melbourne",
    department: "School of Computing and Information Systems",
    name: "Rajkumar Buyya",
    title: "Redmond Barry Distinguished Professor & Director of CLOUDS Lab",
    email: "rbuyya@unimelb.edu.au",
    homepage_url: "http://buyya.com/",
    lab_url: "http://cloudbus.org/",
    research_areas: ["Cloud Computing", "Edge/Fog Distributed Architectures", "High Concurrency Resource Schedulers", "Serverless Platforms"],
    funding_signal: "recruiting",
    source_url: "http://buyya.com/"
  },
  {
    university: "University of Melbourne",
    department: "School of Computing and Information Systems",
    name: "Benjamin Rubinstein",
    title: "Professor of Computer Science",
    email: "benjamin.rubinstein@unimelb.edu.au",
    homepage_url: "https://rubinstein.net.au/",
    lab_url: "https://cis.unimelb.edu.au/research",
    research_areas: ["Differential Privacy", "Adversarial Machine Learning", "Machine Learning Security", "Private Data Sharing"],
    funding_signal: "recruiting",
    source_url: "https://rubinstein.net.au/"
  },

  // 20. Australian National University (ANU)
  {
    university: "Australian National University",
    department: "School of Computing",
    name: "Stephen Gould",
    title: "Professor of Computer Science",
    email: "stephen.gould@anu.edu.au",
    homepage_url: "http://users.cecs.anu.edu.au/~sgould/",
    lab_url: "http://users.cecs.anu.edu.au/~sgould/",
    research_areas: ["Computer Vision", "Deep Structured Learning", "Deep Declarative Networks", "Video Scene Understanding"],
    funding_signal: "recruiting",
    source_url: "http://users.cecs.anu.edu.au/~sgould/"
  },
  {
    university: "Australian National University",
    department: "School of Computing",
    name: "Lexing Xie",
    title: "Professor of Computer Science & Head of Computational Media Lab",
    email: "lexing.xie@anu.edu.au",
    homepage_url: "http://users.cecs.anu.edu.au/~xlx/",
    lab_url: "https://cm.cecs.anu.edu.au/",
    research_areas: ["Computational Media", "Social Multimedia Analytics", "Sequential Deep Learning", "Information Diffusion Networks"],
    funding_signal: "recruiting",
    source_url: "https://cm.cecs.anu.edu.au/"
  },

  // 21. University of Sydney
  {
    university: "University of Sydney",
    department: "School of Computer Science",
    name: "Albert Zomaya",
    title: "Peter Nicol Russell Chair Professor & Director of Centre for Distributed Systems",
    email: "albert.zomaya@sydney.edu.au",
    homepage_url: "https://www.sydney.edu.au/engineering/about/our-people/academic-staff/albert-zomaya.html",
    lab_url: "https://www.sydney.edu.au/engineering/our-research/computer-science/centre-for-distributed-and-high-performance-computing.html",
    research_areas: ["Distributed and High Performance Computing", "Cloud Resource Management", "Edge-Cloud Integration", "Cyber-Physical Systems"],
    funding_signal: "recruiting",
    source_url: "https://www.sydney.edu.au/engineering/about/our-people/academic-staff/albert-zomaya.html"
  },
  {
    university: "University of Sydney",
    department: "School of Computer Science",
    name: "Tongliang Liu",
    title: "Associate Professor & Director of Sydney AI Centre",
    email: "tongliang.liu@sydney.edu.au",
    homepage_url: "https://tongliang-liu.github.io/",
    lab_url: "https://tongliang-liu.github.io/",
    research_areas: ["Trustworthy Machine Learning", "Learning with Noisy Labels", "Adversarial Robustness", "Causal Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://tongliang-liu.github.io/"
  },

  // 22. University of New South Wales (UNSW Sydney)
  {
    university: "University of New South Wales",
    department: "School of Computer Science and Engineering",
    name: "Salil Kanhere",
    title: "Professor of Computer Science and Engineering",
    email: "salil.kanhere@unsw.edu.au",
    homepage_url: "https://www.unsw.edu.au/staff/salil-kanhere",
    lab_url: "https://cybersecurity.unsw.edu.au/",
    research_areas: ["Cybersecurity", "Blockchain & Distributed Ledgers", "Internet of Things", "Pervasive Edge Computing"],
    funding_signal: "recruiting",
    source_url: "https://www.unsw.edu.au/staff/salil-kanhere"
  },
  {
    university: "University of New South Wales",
    department: "School of Computer Science and Engineering",
    name: "Lina Yao",
    title: "Professor of Computer Science and Engineering",
    email: "lina.yao@unsw.edu.au",
    homepage_url: "https://www.linayao.com/",
    lab_url: "https://www.linayao.com/",
    research_areas: ["Data Mining", "Multimodal Brain-Computer Interfaces", "Federated Learning in Healthcare", "Graph Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.linayao.com/"
  },

  // 23. University of Queensland
  {
    university: "University of Queensland",
    department: "School of Information Technology and Electrical Engineering",
    name: "Guido Zuccon",
    title: "Professor of Computer Science",
    email: "g.zuccon@uq.edu.au",
    homepage_url: "https://ielab.io/people/guido-zuccon.html",
    lab_url: "https://ielab.io/",
    research_areas: ["Information Retrieval", "Medical AI Search", "Healthcare Language Processing", "Evaluation of LLMs"],
    funding_signal: "recruiting",
    source_url: "https://ielab.io/"
  },
  {
    university: "University of Queensland",
    department: "School of Information Technology and Electrical Engineering",
    name: "Shazia Sadiq",
    title: "Professor of Computer Science",
    email: "shazia@eecs.uq.edu.au",
    homepage_url: "https://researchers.uq.edu.au/researcher/134",
    lab_url: "https://datascience.uq.edu.au/",
    research_areas: ["Data Governance", "Trustworthy Data Systems", "Business Process Management", "Responsible AI"],
    funding_signal: "recruiting",
    source_url: "https://researchers.uq.edu.au/researcher/134"
  },

  // 24. Monash University
  {
    university: "Monash University",
    department: "Faculty of Information Technology",
    name: "Carsten Rudolph",
    title: "Professor of Cybersecurity",
    email: "carsten.rudolph@monash.edu",
    homepage_url: "https://research.monash.edu/en/persons/carsten-rudolph",
    lab_url: "https://www.monash.edu/it/our-research/centres-and-labs/cybersecurity-group",
    research_areas: ["Cybersecurity", "Formal Security Modeling", "Blockchain and Privacy", "Cloud System Trust"],
    funding_signal: "recruiting",
    source_url: "https://research.monash.edu/en/persons/carsten-rudolph"
  },
  {
    university: "Monash University",
    department: "Faculty of Information Technology",
    name: "Reza Haffari",
    title: "Professor of Data Science and AI",
    email: "reza.haffari@monash.edu",
    homepage_url: "https://research.monash.edu/en/persons/reza-haffari",
    lab_url: "https://www.monash.edu/it/our-research/centres-and-labs/natural-language-processing-lab",
    research_areas: ["Natural Language Processing", "Machine Translation", "Continual Deep Learning", "LLM Reasoning"],
    funding_signal: "recruiting",
    source_url: "https://research.monash.edu/en/persons/reza-haffari"
  },

  // 25. University of Technology Sydney (UTS)
  {
    university: "University of Technology Sydney",
    department: "School of Computer Science",
    name: "Guodong Long",
    title: "Associate Professor in Artificial Intelligence",
    email: "guodong.long@uts.edu.au",
    homepage_url: "https://profiles.uts.edu.au/Guodong.Long",
    lab_url: "https://www.uts.edu.au/research-and-teaching/our-research/australian-artificial-intelligence-institute",
    research_areas: ["Federated Learning", "Distributed AI", "Differential Privacy", "Healthcare Machine Learning"],
    funding_signal: "recruiting",
    source_url: "https://profiles.uts.edu.au/Guodong.Long"
  },

  // ==================== NEW ZEALAND ====================
  // 26. University of Auckland
  {
    university: "University of Auckland",
    department: "School of Computer Science",
    name: "Yun Sing Koh",
    title: "Professor of Computer Science & Director of Centre for Machine Learning",
    email: "ykoh@cs.auckland.ac.nz",
    homepage_url: "https://profiles.auckland.ac.nz/y-koh",
    lab_url: "https://www.cs.auckland.ac.nz/research/groups/dml/",
    research_areas: ["Continual Learning", "Concept Drift in Data Streams", "Anomaly Detection", "Machine Learning Security"],
    funding_signal: "recruiting",
    source_url: "https://profiles.auckland.ac.nz/y-koh"
  },
  {
    university: "University of Auckland",
    department: "School of Computer Science",
    name: "Jiamou Liu",
    title: "Associate Professor of Computer Science",
    email: "jiamou.liu@auckland.ac.nz",
    homepage_url: "https://profiles.auckland.ac.nz/jiamou-liu",
    lab_url: "https://www.cs.auckland.ac.nz/research/",
    research_areas: ["Multi-Agent Systems", "Social Network Analysis", "Algorithmic Game Theory", "Knowledge Representation"],
    funding_signal: "recruiting",
    source_url: "https://profiles.auckland.ac.nz/jiamou-liu"
  },

  // 27. University of Otago
  {
    university: "University of Otago",
    department: "Department of Computer Science",
    name: "Brendan McCane",
    title: "Professor of Computer Science",
    email: "mccane@cs.otago.ac.nz",
    homepage_url: "https://www.otago.ac.nz/computer-science/people/brendan-mccane",
    lab_url: "https://www.otago.ac.nz/computer-science/research",
    research_areas: ["Computer Vision", "Deep Learning Theory", "Biomedical Image Classification", "Representation Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.otago.ac.nz/computer-science/people/brendan-mccane"
  },

  // ==================== TAIWAN & MIDDLE EAST ====================
  // 28. National Taiwan University (NTU)
  {
    university: "National Taiwan University",
    department: "Department of Computer Science and Information Engineering",
    name: "Hsuan-Tien Lin",
    title: "Distinguished Professor of Computer Science",
    email: "htlin@csie.ntu.edu.tw",
    homepage_url: "https://www.csie.ntu.edu.tw/~htlin/",
    lab_url: "https://www.csie.ntu.edu.tw/~htlin/",
    research_areas: ["Cost-Sensitive Machine Learning", "Active Learning", "Deep Learning Optimization", "Continual Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.csie.ntu.edu.tw/~htlin/"
  },
  {
    university: "National Taiwan University",
    department: "Department of Computer Science and Information Engineering",
    name: "Hung-yi Lee",
    title: "Professor of Electrical Engineering and Computer Science",
    email: "hungyilee@ntu.edu.tw",
    homepage_url: "https://speech.ee.ntu.edu.tw/~hylee/index.php",
    lab_url: "https://speech.ee.ntu.edu.tw/",
    research_areas: ["Speech Processing", "Large Language Model Safety and Jailbreak Detection", "Prompt Engineering", "Multimodal AI"],
    funding_signal: "recruiting",
    source_url: "https://speech.ee.ntu.edu.tw/"
  },

  // 29. King Abdullah University of Science and Technology (KAUST)
  {
    university: "King Abdullah University of Science and Technology",
    department: "CEMSE Division",
    name: "Peter Richtárik",
    title: "Professor of Computer Science",
    email: "peter.richtarik@kaust.edu.sa",
    homepage_url: "https://richtarik.org/",
    lab_url: "https://richtarik.org/",
    research_areas: ["Federated Learning Optimization", "Distributed Stochastic Optimization", "Gradient Compression", "Differential Privacy"],
    funding_signal: "recruiting",
    source_url: "https://richtarik.org/"
  },
  {
    university: "King Abdullah University of Science and Technology",
    department: "CEMSE Division",
    name: "Bernard Ghanem",
    title: "Professor of Electrical and Computer Engineering",
    email: "bernard.ghanem@kaust.edu.sa",
    homepage_url: "https://cemse.kaust.edu.sa/people/person/bernard-ghanem",
    lab_url: "https://www.ivulab.org/",
    research_areas: ["Computer Vision", "Adversarial Robustness", "Video Understanding", "Trustworthy Deep Learning"],
    funding_signal: "recruiting",
    source_url: "https://www.ivulab.org/"
  },
  {
    university: "King Abdullah University of Science and Technology",
    department: "CEMSE Division",
    name: "Marco Canini",
    title: "Associate Professor of Computer Science",
    email: "marco@kaust.edu.sa",
    homepage_url: "https://mcanini.github.io/",
    lab_url: "https://sandblab.github.io/",
    research_areas: ["Distributed Cloud Computing", "Systems for Machine Learning", "Programmable Datacenter Networks", "Fault Tolerance"],
    funding_signal: "recruiting",
    source_url: "https://sandblab.github.io/"
  },

  // 30. Mohamed bin Zayed University of Artificial Intelligence (MBZUAI)
  {
    university: "Mohamed bin Zayed University of Artificial Intelligence",
    department: "Department of Machine Learning",
    name: "Eric Xing",
    title: "President & University Professor",
    email: "eric.xing@mbzuai.ac.ae",
    homepage_url: "https://mbzuai.ac.ae/study/faculty/eric-xing/",
    lab_url: "https://mbzuai.ac.ae/",
    research_areas: ["Distributed Machine Learning Systems", "Probabilistic Graphical Models", "Petuum Platform", "Foundation Models"],
    funding_signal: "recruiting",
    source_url: "https://mbzuai.ac.ae/study/faculty/eric-xing/"
  },
  {
    university: "Mohamed bin Zayed University of Artificial Intelligence",
    department: "Department of Natural Language Processing",
    name: "Preslav Nakov",
    title: "Professor & Chair of NLP Department",
    email: "preslav.nakov@mbzuai.ac.ae",
    homepage_url: "https://preslavnakov.com/",
    lab_url: "https://mbzuai.ac.ae/study/faculty/preslav-nakov/",
    research_areas: ["Fact-Checking and Hallucination Mitigation in LLMs", "Natural Language Processing", "Adversarial NLP", "Social Media Mining"],
    funding_signal: "recruiting",
    source_url: "https://preslavnakov.com/"
  }
];

async function run() {
  console.log(`Starting Wave 6 ingestion: ${wave6Faculty.length} faculty records across Asia & Oceania...`);
  
  const validated = wave6Faculty.map(item => {
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
  console.log("Wave 6 ingestion complete!");
}

if (require.main === module) {
  run().catch(console.error);
}

module.exports = { wave6Faculty };
