/**
 * Centralized Skills & Technical Capabilities Configuration
 * AURA — Aadhish's Unified Runtime Architecture
 */

export const SKILL_LEVELS = {
  exploring: {
    id: "exploring",
    label: "Exploring",
    color: "#a855f7", // Violet
    bgColor: "rgba(168, 85, 247, 0.12)",
    borderColor: "rgba(168, 85, 247, 0.3)",
    description: "Currently learning the fundamentals and understanding how the technology works."
  },
  beginner: {
    id: "beginner",
    label: "Beginner",
    color: "#38bdf8", // Sky / Cyan
    bgColor: "rgba(56, 189, 248, 0.12)",
    borderColor: "rgba(56, 189, 248, 0.3)",
    description: "Understands basic concepts and can perform simple tasks with guidance or references."
  },
  developing: {
    id: "developing",
    label: "Developing",
    color: "#3b82f6", // Electric Blue
    bgColor: "rgba(59, 130, 246, 0.12)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    description: "Has practical exposure and can use the technology in small projects or specific implementation tasks."
  },
  comfortable: {
    id: "comfortable",
    label: "Comfortable",
    color: "#10b981", // Emerald
    bgColor: "rgba(16, 185, 129, 0.12)",
    borderColor: "rgba(16, 185, 129, 0.3)",
    description: "Can independently use the technology for familiar tasks and practical development work."
  }
};

export const SKILLS_DATA = {
  // Section 01: Overview
  overview: {
    title: "Skills & Capabilities",
    subtitle: "The technologies I use, the systems I build, and the knowledge I'm continuously developing.",
    introduction: [
      "I started my development journey with programming fundamentals and gradually moved towards frontend development, interactive web experiences, and AI-powered applications.",
      "My current focus is strengthening my software development foundations while exploring AI engineering, intelligent applications, and autonomous agents.",
      "I believe technical growth comes from continuously learning concepts and applying them through real projects."
    ],
    capabilityAreas: [
      {
        id: "programming-languages",
        title: "Programming Languages",
        skills: ["Python", "JavaScript", "C++", "HTML", "CSS", "SQL / MySQL"],
        accent: "cyan",
        iconName: "Code2"
      },
      {
        id: "development-technologies",
        title: "Development Technologies",
        skills: ["React", "Frontend Engineering", "Three.js", "GSAP"],
        accent: "blue",
        iconName: "Layout"
      },
      {
        id: "ai-emerging-technologies",
        title: "AI & Emerging Technologies",
        skills: ["Python for AI", "NumPy", "LLMs", "AI Agents", "LangChain", "Hugging Face", "Machine Learning"],
        accent: "violet",
        iconName: "Sparkles"
      },
      {
        id: "developer-tools",
        title: "Developer Tools",
        skills: ["VS Code", "Git", "GitHub", "Antigravity", "Figma", "Stitch", "FigJam", "MySQL"],
        accent: "emerald",
        iconName: "Wrench"
      }
    ]
  },

  // Section 02: Programming Languages
  languages: [
    {
      id: "python",
      name: "Python",
      level: "developing",
      category: "Programming Language",
      description: "Versatile language utilized for application development, scripting, data handling, and AI experimentation.",
      usedFor: [
        "Small programs and practical projects.",
        "Exploring AI application development.",
        "Learning data handling and Python libraries."
      ],
      associatedProjects: [
        { id: "ai-project", name: "AI-Voice Guard", isInternalLink: true }
      ]
    },
    {
      id: "javascript",
      name: "JavaScript",
      level: "comfortable",
      category: "Programming Language",
      description: "The primary programming language for client-side interactivity, state management, and modern component runtimes.",
      usedFor: [
        "Interactive frontend functionality.",
        "React application development.",
        "Dynamic user interfaces.",
        "Application interaction logic."
      ],
      associatedProjects: [
        { id: "aura", name: "AURA", isInternalLink: false },
        { id: "dhruvnetra", name: "DhruvNetra", isInternalLink: true },
        { id: "portfolio-website", name: "Interactive Developer Portfolio", isInternalLink: true }
      ]
    },
    {
      id: "cpp",
      name: "C++",
      level: "beginner",
      category: "Programming Language",
      description: "Foundational compiled language explored to master computational fundamentals and rigorous logic building.",
      usedFor: [
        "Programming fundamentals.",
        "Logic building.",
        "Understanding core programming concepts."
      ],
      associatedProjects: []
    },
    {
      id: "html",
      name: "HTML",
      level: "comfortable",
      category: "Markup Language",
      description: "Semantic backbone of the web used to craft accessible, well-structured document hierarchies and component layouts.",
      usedFor: [
        "Structuring web applications.",
        "Semantic page layouts.",
        "Building frontend interfaces."
      ],
      associatedProjects: [
        { id: "aura", name: "AURA", isInternalLink: false },
        { id: "dhruvnetra", name: "DhruvNetra", isInternalLink: true },
        { id: "portfolio-website", name: "Interactive Developer Portfolio", isInternalLink: true }
      ]
    },
    {
      id: "css",
      name: "CSS",
      level: "comfortable",
      category: "Styling & Layout",
      description: "Modern layout engine used to create responsive grids, fluid typography, subtle glassmorphism, and hardware-accelerated transitions.",
      usedFor: [
        "Responsive layouts.",
        "Visual design.",
        "Animations and transitions.",
        "Interface styling."
      ],
      associatedProjects: [
        { id: "aura", name: "AURA", isInternalLink: false },
        { id: "dhruvnetra", name: "DhruvNetra", isInternalLink: true },
        { id: "portfolio-website", name: "Interactive Developer Portfolio", isInternalLink: true }
      ]
    },
    {
      id: "sql",
      name: "SQL / MySQL",
      level: "beginner",
      category: "Database Query Language",
      description: "Declarative querying language for relational database architectures, table relationships, and structured data querying.",
      usedFor: [
        "Learning relational database concepts.",
        "Writing SQL queries.",
        "Understanding data storage and retrieval."
      ],
      associatedProjects: []
    }
  ],

  // Section 03: Development Technologies
  developmentTechnologies: [
    {
      id: "react",
      name: "React",
      level: "developing", // Beginner / Developing
      levelDisplay: "Beginner / Developing",
      category: "UI Framework",
      description: "Component-driven declarative library powering single-page application architectures and interactive user interfaces.",
      usedFor: [
        "Component-based interfaces.",
        "Application structure.",
        "Reusable UI components.",
        "Interactive applications."
      ],
      projects: [
        { id: "aura", name: "AURA", isInternalLink: false },
        { id: "dhruvnetra", name: "DhruvNetra", isInternalLink: true },
        { id: "portfolio-website", name: "Interactive Developer Portfolio", isInternalLink: true }
      ]
    },
    {
      id: "frontend-engineering",
      name: "Frontend Engineering",
      level: "developing",
      category: "Engineering Discipline",
      description: "Holistic craft of turning visual concepts into performant, accessible, and responsive user experiences.",
      usedFor: [
        "Responsive interfaces across viewports.",
        "UI architecture & state coordination.",
        "Component organization and clean lifecycles.",
        "User interaction design and micro-feedback.",
        "Visual hierarchy and editorial presentation."
      ],
      projects: [
        { id: "aura", name: "AURA", isInternalLink: false },
        { id: "dhruvnetra", name: "DhruvNetra", isInternalLink: true },
        { id: "portfolio-website", name: "Interactive Developer Portfolio", isInternalLink: true }
      ]
    },
    {
      id: "threejs",
      name: "Three.js / 3D Web",
      level: "exploring",
      category: "3D Graphics & WebGL",
      description: "WebGL abstraction library utilized for rendering three-dimensional spatial environments and interactive scene graphs.",
      usedFor: [
        "3D visual experiences on the web.",
        "Interactive web graphics and mesh transforms.",
        "Three-dimensional interface elements."
      ],
      projects: [
        { id: "portfolio-website", name: "Interactive Developer Portfolio", isInternalLink: true },
        { id: "dhruvnetra", name: "DhruvNetra", isInternalLink: true, note: "Prototype 3D visualization" }
      ]
    },
    {
      id: "gsap",
      name: "GSAP",
      level: "developing", // Exploring / Developing
      levelDisplay: "Exploring / Developing",
      category: "Animation Engine",
      description: "High-performance JavaScript animation runtime used for timeline orchestration and scroll-linked interactions.",
      usedFor: [
        "Animation timelines.",
        "Scroll-based animations.",
        "Smooth transitions.",
        "Motion design."
      ],
      projects: [
        { id: "portfolio-website", name: "Interactive Developer Portfolio", isInternalLink: true }
      ]
    }
  ],

  // Section 04: AI & Emerging Technologies
  aiTechnologies: {
    applied: [
      {
        id: "python-ai",
        name: "Python for AI",
        level: "developing",
        description: "Using Python as the primary foundation for machine learning exploration, automation scripts, and backend service development.",
        details: "Serves as the programming backbone for tensor pipelines, audio downmixing, and model inference services."
      },
      {
        id: "numpy",
        name: "NumPy",
        level: "beginner", // Learning
        levelDisplay: "Learning",
        description: "Exploring numerical computing, multidimensional arrays, data types, and vectorized mathematical operations.",
        details: "Fundamental library for understanding data representation and low-level numerical tensors."
      },
      {
        id: "ai-model-integration",
        name: "AI Model Integration",
        level: "developing",
        description: "Connecting deep learning classification engines into live backend applications and API endpoints.",
        details: "Explored practically through AI-Voice Guard's FastAPI model inference runtime.",
        associatedProjects: [
          { id: "ai-project", name: "AI-Voice Guard", isInternalLink: true }
        ]
      },
      {
        id: "hugging-face",
        name: "Hugging Face",
        level: "developing", // Exploring / Applied
        levelDisplay: "Exploring / Applied",
        description: "Exploring pretrained models, model repositories, transformers libraries, and classification pipelines.",
        details: "Explored through AI-Voice Guard utilizing Hemgg/Deepfake-audio-detection for speech verification.",
        associatedProjects: [
          { id: "ai-project", name: "AI-Voice Guard", isInternalLink: true }
        ]
      }
    ],
    exploring: [
      {
        id: "llms",
        name: "Large Language Models",
        level: "exploring",
        description: "Learning how LLMs work, tokenization, context windows, prompt engineering, and practical application integration."
      },
      {
        id: "ai-agents",
        name: "AI Agents & Automation",
        level: "exploring",
        description: "Understanding how autonomous AI agents use tools, interact with external environments, and execute multi-step workflows."
      },
      {
        id: "langchain",
        name: "LangChain",
        level: "exploring",
        description: "Learning about frameworks for chaining language models with external tools, document retrieval, and structured pipelines."
      },
      {
        id: "machine-learning",
        name: "Machine Learning Fundamentals",
        level: "exploring",
        description: "Building foundational understanding of supervised and unsupervised learning concepts, evaluation metrics, and training data."
      },
      {
        id: "advanced-models",
        name: "Advanced Model Development",
        level: "exploring",
        description: "Studying neural network architectures, attention mechanisms, fine-tuning, and transformer model optimization."
      }
    ]
  },

  // Section 05: Developer Tools
  developerTools: [
    {
      id: "vscode",
      name: "Visual Studio Code",
      category: "Code Editor",
      role: "Primary code editor for daily software development and project engineering."
    },
    {
      id: "git",
      name: "Git",
      category: "Version Control",
      role: "Distributed version control, branch management, and historical tracking."
    },
    {
      id: "github",
      name: "GitHub",
      category: "Collaboration",
      role: "Remote repository hosting, project tracking, and open-source collaboration."
    },
    {
      id: "antigravity",
      name: "Antigravity",
      category: "AI Environment",
      role: "AI-assisted development environment used to accelerate implementation and coding workflows."
    },
    {
      id: "figma-stitch",
      name: "Figma / Stitch",
      category: "UI/UX Design",
      role: "Interface design, spatial wireframing, and visual design system exploration."
    },
    {
      id: "figjam",
      name: "FigJam",
      category: "Visual Planning",
      role: "Visual brainstorming, architecture diagrams, and system workflow mapping."
    },
    {
      id: "mysql-tool",
      name: "MySQL",
      category: "Database",
      role: "Relational database management, schema organization, and SQL practice."
    }
  ],

  // Section 06: Skills in Practice
  skillsInPractice: [
    {
      id: "dhruvnetra",
      number: "01",
      name: "DhruvNetra",
      category: "Smart Automation / Digital Twin",
      description: "A digital platform prototype for efficient remote management of Indian Antarctic Research Stations, Maitri and Bharati.",
      skills: [
        "React",
        "JavaScript",
        "Frontend Engineering",
        "3D Visualization",
        "System Architecture",
        "Interactive UI Development"
      ],
      isClickable: true,
      targetApp: "projects",
      projectId: "dhruvnetra"
    },
    {
      id: "ai-project",
      number: "02",
      name: "AI-Voice Guard",
      category: "AI & Cybersecurity",
      description: "An AI-powered voice deepfake detection and communication security project exploring voice authenticity assessment.",
      skills: [
        "Python",
        "FastAPI",
        "AI Model Integration",
        "Hugging Face",
        "Audio Processing",
        "Real-Time Communication Architecture"
      ],
      note: "Prototype exploration; live teleconferencing gateway remains an area for ongoing evolution.",
      isClickable: true,
      targetApp: "projects",
      projectId: "ai-project"
    },
    {
      id: "portfolio-website",
      number: "03",
      name: "Interactive Developer Portfolio",
      category: "Frontend Development / Interactive Web",
      description: "An interactive personal portfolio built around a custom 3D avatar, cursor interactions, and animated web experiences.",
      skills: [
        "React",
        "JavaScript",
        "CSS",
        "GSAP",
        "Three.js",
        "Interactive UI Development"
      ],
      isClickable: true,
      targetApp: "projects",
      projectId: "portfolio-website"
    },
    {
      id: "aura",
      number: "04",
      name: "AURA",
      category: "Creative Engineering / Personal Portfolio OS",
      description: "An OS-inspired personal portfolio designed as an interactive desktop environment with application windows, taskbar, project explorer, and integrated technical applications.",
      skills: [
        "React",
        "JavaScript",
        "Frontend Engineering",
        "Desktop UI Architecture",
        "Window Management",
        "Interactive Application Development"
      ],
      isClickable: false // Informational and non-clickable as no dedicated project details page exists for AURA yet
    }
  ],

  // Section 07: Learning Roadmap
  learningRoadmap: {
    current: {
      stage: "Current Learning",
      tagline: "Active Daily Focus",
      color: "#38bdf8",
      items: [
        "Advanced Python",
        "NumPy",
        "Backend Development and APIs",
        "AI Application Development",
        "LLM Fundamentals"
      ]
    },
    next: {
      stage: "Next Learning Priorities",
      tagline: "Upcoming Deep-Dives",
      color: "#818cf8",
      items: [
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Advanced LLM Applications",
        "AI Agent Architectures",
        "Cloud Computing"
      ]
    },
    longTerm: {
      stage: "Long-Term Direction",
      tagline: "Engineering Horizon",
      color: "#c084fc",
      items: [
        "Model Development",
        "Intelligent AI Systems",
        "Autonomous Agents",
        "Tool-Using AI Applications",
        "AI Engineering"
      ]
    }
  },

  // Section 08: Beyond Technologies
  beyondTechnologies: [
    {
      id: "problem-solving",
      title: "Problem Solving",
      summary: "Breaking complex problems into manageable parts and approaching them logically.",
      detail: "Approaching technical roadblocks methodically by isolating variables, analyzing edge cases, and constructing structured, step-by-step solutions."
    },
    {
      id: "product-thinking",
      title: "Product Thinking",
      summary: "Understanding the purpose of a product and how technical decisions affect the user experience.",
      detail: "Aligning software implementation with end-user needs, prioritizing intuitiveness, responsive performance, and purposeful design over superficial features."
    },
    {
      id: "team-collaboration",
      title: "Team Collaboration",
      summary: "Working with teammates, sharing responsibilities, and contributing to collaborative development.",
      detail: "Valuing clear communication, modular code organization, receptive feedback loops, and shared accountability across team milestones."
    },
    {
      id: "continuous-learning",
      title: "Continuous Learning",
      summary: "Exploring new technologies, improving existing skills, and applying new knowledge through projects.",
      detail: "Treating curiosity as a discipline — consistently studying emerging tools, dissecting architectural patterns, and solidifying theory through tangible code."
    }
  ],

  // Section 09: My Direction
  myDirection: {
    heading: "MY DIRECTION",
    mainContent: "My goal is to grow into an AI engineer capable of designing and developing intelligent systems — from understanding models and building AI applications to creating autonomous agents that can interact with tools and solve real-world problems.",
    closingStatement: "LEARNING. BUILDING. IMPROVING. REPEATING."
  }
};

