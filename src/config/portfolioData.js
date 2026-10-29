/**
 * Centralized Portfolio Data Configuration
 * All profile details, projects, skills, achievements, and contact details
 * are managed here for easy editing and maintenance.
 */

export const PORTFOLIO_DATA = {
  identity: {
    name: "Aadhish Saini",
    title: "Computer Science Engineering Student | Aspiring AI Developer",
    degree: "BTech Computer Science Engineering Student",
    status: "AVAILABLE FOR BUILDING",
    focus: "AI Development",
    runtime: "DARWIN_ARM64 // READY",
    location: "India // Available Remote Worldwide",
    email: "aadhish.saini@engineer.dev",
    github: "https://github.com/aadhishsaini",
    bioQuote: "Building intelligent systems, interactive experiences, and useful software.",
    introduction:
      "I enjoy building interactive web experiences and exploring AI development. My goal is to create intelligent applications that combine useful functionality with thoughtful design.",
    sections: {
      currentFocus:
        "AI Development, prompt orchestration, and high-performance frontend engineering.",
      technicalInterests:
        "Artificial Intelligence, Full-Stack Web Architecture, Autonomous Tooling, and Developer Micro-Environments.",
      approach:
        "Learn by building real-world prototypes, experiment rapidly with emergent research, and refine until execution feels seamless."
    }
  },

  projects: [
    {
      id: "aura",
      title: "AURA",
      category: "Aadhish's Unified Runtime Architecture",
      badge: "ACTIVE",
      description:
        "Interactive browser-based desktop environment presenting developer portfolio and engineering projects through simulated operating-system interfaces.",
      stack: ["React", "Vite", "JavaScript", "CSS3", "Tailwind CSS"],
      details: {
        architecture:
          "Modular window manager, state-driven kernel UEFI bootloader, realistic orbital throbber, live terminal shell, and dual-theme engine.",
        highlights: [
          "Cinematic boot sequence with telemetry stages",
          "Multi-window compositor with drag, minimize, maximize & focus stacking",
          "Interactive terminal with custom commands & command history",
          "WCAG-compliant dark & light theme palettes"
        ],
        github: "https://github.com/aadhishsaini/aura-portfolio"
      }
    },
    {
      id: "dhruv-netra",
      title: "DhruvNetra",
      category: "Antarctic Research Station Digital Twin",
      badge: "RESEARCH",
      description:
        "Interactive 3D digital twin of an Antarctic scientific research station monitoring real-time telemetry, atmospheric metrics, and station subsystems.",
      stack: ["React", "JavaScript", "Three.js", "Tailwind CSS"],
      details: {
        architecture:
          "WebGL-based spatial digital twin visualizing environmental sensory data, thermal layers, and sensor nodes across arctic coordinates.",
        highlights: [
          "3D atmospheric & station structure rendering",
          "Simulated live telemetry feeds & sensor telemetry",
          "Low-latency spatial camera navigation"
        ],
        github: "https://github.com/aadhishsaini/dhruvnetra"
      }
    },
    {
      id: "portfolio-exp",
      title: "Portfolio Experience",
      category: "Personal Portfolio Website",
      badge: "PRODUCTION",
      description:
        "High-performance personal developer portfolio showcasing engineering projects, interactive motion design, and responsive typography.",
      stack: ["React", "JavaScript", "GSAP", "CSS Modules"],
      details: {
        architecture:
          "Motion-engineered portfolio site utilizing timeline-based scroll choreography, micro-interactions, and accessible layouts.",
        highlights: [
          "Curated typography and kinetic scroll reveals",
          "Interactive project showcase & case studies",
          "Fluid responsive design across mobile and desktop"
        ],
        github: "https://github.com/aadhishsaini/portfolio"
      }
    }
  ],

  skills: {
    programming: [
      { name: "Python", category: "Core", level: "Primary" },
      { name: "JavaScript", category: "Core", level: "Primary" },
      { name: "C++", category: "Systems", level: "Intermediate" }
    ],
    frontend: [
      { name: "HTML5", category: "Web Standards", level: "Advanced" },
      { name: "CSS3", category: "Styling & Motion", level: "Advanced" },
      { name: "React", category: "UI Framework", level: "Primary" }
    ],
    database: [
      { name: "MySQL", category: "Relational DB", level: "Working Knowledge" }
    ],
    aiDevelopment: [
      { name: "AI Development", category: "Machine Learning", level: "Active Focus" },
      { name: "LLM Orchestration & Prompting", category: "Applied AI", level: "Active Focus" },
      { name: "Autonomous Workflows & Tooling", category: "Systems AI", level: "Learning & Building" }
    ]
  },

  achievements: [
    {
      id: "hackathon-rank7",
      title: "Internal College Hackathon",
      result: "Rank 7 out of 63 teams",
      description:
        "Competed with 63 engineering teams to design and prototype an innovative full-stack software solution under strict hackathon deadlines.",
      highlight: "Rank 7 / 63 Teams",
      tags: ["Hackathon", "Engineering", "Prototyping"]
    }
  ],

  systemInfo: {
    osVersion: "AURA Build 26100.workstation.2025",
    kernel: "Darwin-ARM64 / WebAssembly 4.19",
    coreEngine: "Neural Web 3.1",
    session: "DEVELOPER_ED // 127.0.0.1",
    stationLocation: "+28.6139°N / +77.2090°E",
    statusText: "AVAILABLE FOR BUILDING",
    latency: "1.2ms"
  }
};
