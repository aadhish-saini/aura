/**
 * Centralized Resume & Professional Profile Data
 * AURA — Aadhish's Unified Runtime Architecture
 *
 * Grounded in verified developer background.
 * No arbitrary percentages or fabricated work histories.
 */

export const RESUME_DATA = {
  header: {
    name: "Aadhish Saini",
    role: "Computer Science & Engineering Student",
    title: "Resume & Professional Profile",
    subtitle: "A developer focused on building practical software experiences and exploring intelligent technologies.",
    introduction:
      "I'm a Computer Science and Engineering student interested in software development, artificial intelligence, and building technology-driven solutions.",
    pdfUrl: "/resume.pdf",
    downloadFileName: "Aadhish_Saini_Resume.pdf",
  },

  technicalFocus: [
    {
      id: "software-dev",
      title: "Software Development",
      description: "Building reliable applications, modular architectures, and structured problem solving.",
    },
    {
      id: "frontend-eng",
      title: "Frontend Engineering",
      description: "Engineering performant, accessible, and responsive user interfaces using modern web runtimes.",
    },
    {
      id: "ai-intelligence",
      title: "Artificial Intelligence",
      description: "Exploring machine learning concepts, audio tensor processing, and model inference pipelines.",
    },
    {
      id: "ai-agents",
      title: "AI Agents & Automation",
      description: "Studying autonomous agents, tool interaction, LangChain workflows, and LLM foundations.",
    },
    {
      id: "interactive-web",
      title: "Interactive Web Experiences",
      description: "Crafting spatial web interactions, animations with GSAP, and 3D scenes with Three.js.",
    },
  ],

  // Consistent with Skills application proficiency benchmarks
  technicalBackground: [
    { name: "Python", level: "Developing", levelKey: "developing" },
    { name: "JavaScript", level: "Comfortable", levelKey: "comfortable" },
    { name: "C++", level: "Beginner", levelKey: "beginner" },
    { name: "HTML", level: "Comfortable", levelKey: "comfortable" },
    { name: "CSS", level: "Comfortable", levelKey: "comfortable" },
    { name: "React", level: "Beginner / Developing", levelKey: "developing" },
    { name: "MySQL", level: "Beginner", levelKey: "beginner" },
    { name: "GSAP", level: "Exploring / Developing", levelKey: "developing" },
    { name: "Three.js", level: "Exploring", levelKey: "exploring" },
  ],

  selectedProjects: [
    {
      id: "dhruvnetra",
      number: "01",
      name: "DhruvNetra",
      category: "Smart Automation / Digital Twin",
      description:
        "A digital platform prototype for remote operations monitoring of Indian Antarctic Research Stations, Maitri and Bharati.",
      stack: ["React", "JavaScript", "Frontend Engineering", "3D Visualization"],
      isClickable: true,
      projectId: "dhruvnetra",
    },
    {
      id: "ai-project",
      number: "02",
      name: "AI-Voice Guard",
      category: "AI & Cybersecurity",
      description:
        "An AI-powered voice deepfake detection and verification prototype utilizing FastAPI inference and Hugging Face transformer models.",
      stack: ["Python", "FastAPI", "Hugging Face", "Audio Processing"],
      isClickable: true,
      projectId: "ai-project",
    },
    {
      id: "portfolio-website",
      number: "03",
      name: "Interactive Developer Portfolio",
      category: "Frontend Development / Interactive Web",
      description:
        "An interactive personal portfolio built around a custom 3D avatar, cursor-responsive interactions, and GSAP timeline animations.",
      stack: ["React", "JavaScript", "CSS", "GSAP", "Three.js"],
      isClickable: true,
      projectId: "portfolio-website",
    },
    {
      id: "aura",
      number: "04",
      name: "AURA",
      category: "Creative Engineering / Personal Portfolio OS",
      description:
        "An OS-inspired personal portfolio designed as an interactive desktop environment with application windows, window management, and runtime tools.",
      stack: ["React", "JavaScript", "Desktop UI Architecture", "Window Management"],
      isClickable: false,
    },
  ],

  careerDirection: {
    statement:
      "My long-term goal is to grow into an AI engineer with strong software engineering foundations, capable of developing intelligent applications, working with machine learning models, and building autonomous AI systems.",
    motto: "Learning through building. Growing through challenges.",
  },
};

