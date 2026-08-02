/** 21 GIF previews from motionsites.ai, in spec order. */
export const MARQUEE_IMAGES: string[] = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

/** First 11 images -> Row 1 (moves RIGHT on scroll). */
export const ROW_ONE = MARQUEE_IMAGES.slice(0, 11);
/** Remaining 10 images -> Row 2 (moves LEFT on scroll). */
export const ROW_TWO = MARQUEE_IMAGES.slice(11, 21);

const cf =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2F";

export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  year: string;
  overview: string;
  problem: string;
  result: string;
  technologies: string[];
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Advertising Sales Analysis",
    category: "Data Science & Analytics",
    description: "Analyzing advertising performance across channels using statistical modeling to optimize ROI.",
    year: "2025",
    overview: "This project focused on analyzing large datasets to determine the most effective advertising channels. By leveraging statistical modeling and data visualization, the goal was to uncover hidden patterns that drive conversion.",
    problem: "Sales data is often siloed and difficult to interpret without statistical context. Identifying which ad spend directly correlates with sales requires rigorous cleaning and correlation analysis.",
    result: "The analysis successfully identified the top-performing channels, providing actionable recommendations to optimize future marketing budgets.",
    technologies: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Jupyter"],
    images: {
      col1Top: `${cf}hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85`,
      col1Bottom: `${cf}hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85`,
      col2: `${cf}hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85`,
    },
  },
  {
    number: "02",
    name: "Cortex AI",
    category: "AI & Agent Orchestration",
    description: "An autonomous multi-agent orchestration framework for streaming LLM reasoning and workflow execution.",
    year: "2026",
    overview: "Cortex AI is an advanced multi-agent execution framework designed to coordinate autonomous AI agents. It handles real-time token streaming, tool call execution, and state persistence with low latency.",
    problem: "Orchestrating multi-step AI agent workflows introduces high latency, state sync bottlenecks, and complex prompt management challenges.",
    result: "Delivered an enterprise-grade agent orchestration runtime capable of sub-100ms multi-step task resolution.",
    technologies: ["Python", "FastAPI", "PyTorch", "Redis", "WebSockets", "TypeScript"],
    images: {
      col1Top: `${cf}hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85`,
      col1Bottom: `${cf}hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85`,
      col2: `${cf}hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85`,
    },
  },
  {
    number: "03",
    name: "Java Applications",
    category: "Backend & Systems",
    description: "Robust object-oriented applications demonstrating core software engineering principles.",
    year: "2025",
    overview: "This project encompasses a suite of Java-based applications built to solve specific algorithmic and system-level problems, emphasizing clean architecture and efficient resource management.",
    problem: "Building scalable backend logic requires a deep understanding of object-oriented design patterns, memory management, and data structures.",
    result: "A portfolio of highly performant, well-documented Java applications that run reliably under load.",
    technologies: ["Java", "Maven", "JUnit", "OOP"],
    images: {
      col1Top: `${cf}hf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85`,
      col1Bottom: `${cf}hf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85`,
      col2: `${cf}hf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85`,
    },
  },
  {
    number: "04",
    name: "Machine Learning Models",
    category: "AI & Predictive Modeling",
    description: "Neural networks and predictive algorithms for classification and regression tasks.",
    year: "2025",
    overview: "This ongoing project involves designing, training, and deploying various machine learning models to tackle real-world datasets, ranging from natural language processing to computer vision.",
    problem: "Raw data holds immense potential, but extracting predictive value requires carefully tuned algorithms and robust evaluation metrics.",
    result: "Successfully deployed models with high accuracy metrics, demonstrating practical application of AI concepts.",
    technologies: ["Python", "PyTorch", "TensorFlow", "Scikit-Learn"],
    images: {
      col1Top: `${cf}hf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85`,
      col1Bottom: `${cf}hf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85`,
      col2: `${cf}hf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85`,
    },
  },
  {
    number: "05",
    name: "This Portfolio",
    category: "Frontend Architecture",
    description: "An interactive engineering experience — particle systems, GSAP choreography, and editorial design.",
    year: "2026",
    overview: "The goal was to move beyond templates and build an interactive experience that tells a story with every scroll.",
    problem: "Standard portfolios lack emotional resonance. The challenge was to create an interface that surprises users while remaining highly performant.",
    result: "A highly polished interactive experience that communicates engineering craftsmanship.",
    technologies: ["Next.js", "TypeScript", "GSAP", "Canvas", "Lenis"],
    images: {
      col1Top: `${cf}hf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85`,
      col1Bottom: `${cf}hf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85`,
      col2: `${cf}hf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85`,
    },
  },
];

export type Service = {
  number: string;
  name: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    number: "01",
    name: "Frontend",
    description:
      "React, Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion — building performant, interactive user interfaces with modern frameworks and animation libraries.",
  },
  {
    number: "02",
    name: "Backend",
    description:
      "Node.js, Python, Java, RESTful APIs, GraphQL, Microservices — architecting scalable server-side systems and clean API designs.",
  },
  {
    number: "03",
    name: "Data & ML",
    description:
      "PyTorch, TensorFlow, Scikit-Learn, Pandas, Jupyter, NumPy — training predictive models, neural networks, and data pipelines for real-world classification and regression tasks.",
  },
  {
    number: "04",
    name: "Tools",
    description:
      "Git / GitHub, Figma, Docker, Vercel, VS Code, CI/CD — leveraging professional-grade tooling for version control, design collaboration, containerization, and deployment.",
  },
  {
    number: "05",
    name: "Java",
    description:
      "Object-oriented programming, multithreading, design patterns, and system architecture — building robust, scalable backend systems with clean, maintainable code.",
  },
  {
    number: "06",
    name: "DSA",
    description:
      "Data Structures & Algorithms — arrays, trees, graphs, dynamic programming, and complexity analysis for solving complex computational problems efficiently.",
  },
];

export const PORTRAIT_URL =
  "https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png";

const about =
  "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/";

export const ABOUT_IMAGES = {
  moon: `${about}moon_icon.11395d36.png`,
  object: `${about}p59_1.4659672e.png`,
  lego: `${about}lego_icon-1.703bb594.png`,
  group: `${about}Group_134-1.2e04f3ce.png`,
};
