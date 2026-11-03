/**
 * AURA Project Case Study Data & Editorial Specifications
 * Aadhish's Unified Runtime Architecture (AURA)
 */

export const AURA_DATA = {
  // Identity & Hero Header
  hero: {
    projectName: "AURA",
    fullForm: "Aadhish's Unified Runtime Architecture",
    mainHeading: "AURA",
    tagline: "A Personal Identity, Reimagined as an Operating System.",
    subtitle: "A Browser-Based Interactive Desktop Environment for a Personal Developer Portfolio.",
    shortDescription: "AURA transforms a traditional developer portfolio into an interactive, browser-based desktop environment where visitors can explore applications, projects, skills, and achievements through an OS-inspired interface.",
    category: "Web Development / Interactive Systems",
    technologies: [
      "React 18",
      "JavaScript (ESNext)",
      "Tailwind CSS",
      "Vite 6",
      "Lucide Icons",
      "AWS Amplify"
    ],
    githubUrl: "https://github.com/aadhish-saini/aura",
    repoName: "aadhish-saini/aura",
    iconImage: "/AURA-icon.png",
  },

  // 15 Comprehensive Case Study Sections
  sections: {
    // 01 — THE BEGINNING
    theBeginning: {
      number: "01",
      title: "The Beginning",
      tagline: "Rethinking the Developer Portfolio as an Operating Environment",
      paragraphs: [
        "AURA started with a simple thought: What if a personal portfolio wasn't just a website with different sections, but an entire environment that visitors could explore?",
        "Instead of presenting information through traditional static pages, I wanted to create something that felt familiar yet different — a desktop operating system built around my identity, projects, skills, and development journey.",
        "That idea eventually became AURA: Aadhish's Unified Runtime Architecture."
      ]
    },

    // 02 — THE PROBLEM
    theProblem: {
      number: "02",
      title: "The Problem",
      tagline: "The Static Template Dilemma",
      intro: "Traditional developer portfolios often follow the exact same structure:",
      points: [
        "A predictable hero section with a short static introduction.",
        "A standard about section recounting background and education.",
        "Uniform project card grids offering limited architectural insight.",
        "Isolated skill badges and conventional web contact forms."
      ],
      conclusion: "Although this format works and communicates information effectively, it doesn't always create an engaging experience. I wanted to move beyond static presentation and create something where visitors could interact with the interface, open applications, explore projects, and discover information naturally."
    },

    // 03 — THE SOLUTION
    theSolution: {
      number: "03",
      title: "The Solution",
      tagline: "A Living Browser-Based Workstation",
      paragraphs: [
        "AURA transforms a personal portfolio into a browser-based desktop environment.",
        "Visitors enter through an authentic boot sequence and arrive at an interactive desktop containing application icons, a taskbar, a Start menu, and multiple functional windows.",
        "Each application represents a different part of my developer identity.",
        "Instead of navigating between conventional website pages, visitors explore my portfolio through an OS-inspired interface."
      ]
    },

    // 04 — THE DESKTOP EXPERIENCE
    desktopExperience: {
      number: "04",
      title: "The Desktop Experience",
      tagline: "Crafting Familiar Desktop Affordances in the Browser",
      overview: "The desktop is the central environment of AURA. Rather than feeling like a conventional static website, the interface delivers tactile OS affordances that reward user curiosity.",
      features: [
        {
          title: "Cinematic Boot & Shutdown Sequences",
          description: "Multi-phase telemetry bootloader displaying kernel diagnostics, microcode initialization, and orbital progress ring deceleration."
        },
        {
          title: "Original Particle Silhouette Background",
          description: "Interactive canvas particle system rendering the developer profile silhouette and AURA monogram with subtle ambient drift."
        },
        {
          title: "Predictable Windows-Style Launcher",
          description: "Left-grouped vertical application icons arranged top-to-bottom that wrap into adjacent columns without scattering across the display."
        },
        {
          title: "Centered Windows 11 Taskbar & Start Menu",
          description: "Unified center cluster featuring the AURA emblem Start launcher, running app indicators, live system clock, and system tray."
        },
        {
          title: "Full Window Management Controls",
          description: "Movable application windows supporting smooth dragging, minimize, maximize/restore, window snapping, and depth layering."
        },
        {
          title: "Startup Confirmation Sound",
          description: "Authentic OS startup audio confirmation automatically triggered upon successful desktop initialization."
        },
        {
          title: "High-Contrast Dark Theme",
          description: "Refined dark visual environment featuring deep Obsidian black backdrops accented by purple, sky-blue, and cyan glows."
        }
      ]
    },

    // 05 — APPLICATIONS INSIDE AURA
    applications: {
      number: "05",
      title: "Applications Inside AURA",
      tagline: "A Connected Ecosystem of Developer Modules",
      overview: "Each application provides access to a different part of my developer identity. The portfolio behaves as one connected environment instead of a collection of detached website sections.",
      appsList: [
        {
          id: "about",
          name: "About Me",
          role: "Developer Identity & Editorial Bio",
          description: "A 7-chapter editorial story detailing my origins, learning methodology, engineering values, and long-term vision in artificial intelligence.",
          icon: "/icons/about me.png"
        },
        {
          id: "projects",
          name: "Projects",
          role: "Interactive Repository Explorer",
          description: "A dedicated repository browser featuring deep-dive technical case studies, architectural breakdowns, and direct source links.",
          icon: "/icons/projects.png"
        },
        {
          id: "skills",
          name: "Skills",
          role: "Hardware & Software Matrix",
          description: "Interactive proficiency matrix covering Programming Languages, Web Technologies, Artificial Intelligence, Databases, and Developer Tooling.",
          icon: "/icons/skills.png"
        },
        {
          id: "achievements",
          name: "Achievements",
          role: "Verified Honors & Milestones",
          description: "Verified academic and hackathon honors, including securing Rank 7 out of 63 competing teams in an internal hackathon.",
          icon: "/icons/honors.png"
        },
        {
          id: "resume",
          name: "Resume",
          role: "Curriculum Vitae Viewer",
          description: "Native embedded document viewer displaying my verified ATS curriculum vitae with instant PDF download and external tab preview.",
          icon: "/icons/resume.png"
        },
        {
          id: "contact",
          name: "Contact",
          role: "Direct Communication Console",
          description: "Interactive transmission console with live Formspree email submission, field validation, spam protection, and direct social links.",
          icon: "/icons/contact.png"
        },
        {
          id: "terminal",
          name: "Terminal",
          role: "Command-Line Portfolio Shell",
          description: "Interactive Bash-style shell supporting 19+ internal commands, history recall, Levenshtein fuzzy matching, and neofetch telemetry.",
          icon: "/icons/terminal.png"
        },
        {
          id: "explorer",
          name: "File Explorer",
          role: "AURA_FS Virtual Filesystem",
          description: "Hierarchical virtual filesystem with breadcrumb navigation, folder inspection, and direct file-to-application launching.",
          icon: "/icons/projects.png"
        },
        {
          id: "settings",
          name: "Settings",
          role: "Workstation Preferences",
          description: "Desktop environment controls for immersive fullscreen mode, audio FX toggling, and workstation build telemetry.",
          icon: "/icons/skills.png"
        }
      ]
    },

    // 06 — THE PROJECTS EXPLORER
    projectsExplorer: {
      number: "06",
      title: "The Projects Explorer",
      tagline: "Case Studies That Dive Beyond the Surface",
      paragraphs: [
        "The Projects application acts as a dedicated space for exploring my development work. It contains individual project entries, each opening a detailed case study within the existing AURA desktop environment.",
        "Instead of simple summary cards, each project case study explores the engineering thought process, architectural decisions, user experience considerations, and technologies that brought the software to life.",
        "Featured projects include DhruvNetra (Antarctic Research Station 3D Digital Twin), AI-Voice Guard (Real-Time Deepfake Detection Platform), Interactive Developer Portfolio (3D Avatar Web Experience), and AURA itself."
      ],
      showcaseItems: [
        {
          title: "DhruvNetra",
          category: "Smart India Hackathon • NCPOR",
          summary: "3D Digital Twin and telemetry dashboard for remote monitoring of India's Maitri and Bharati Antarctic research stations.",
          icon: "/projects-icons/dhruvnetra-icon.png"
        },
        {
          title: "AI-Voice Guard",
          category: "AI Security • VoIP Protection",
          summary: "Real-time synthetic speech and deepfake audio detection system protecting teleconferences and voice calls.",
          icon: "/projects-icons/ai-voice-guard-icon.png"
        },
        {
          title: "Interactive Developer Portfolio",
          category: "Creative Frontend • 3D Avatar",
          summary: "Interactive portfolio experience featuring cursor-tracking 3D avatar animations, smooth transitions, and visual storytelling.",
          icon: "/projects-icons/3d-portfolio-icon.png"
        },
        {
          title: "AURA",
          category: "Web Development • OS Portfolio",
          summary: "A complete browser-based operating system runtime presenting developer projects and skills through desktop metaphors.",
          icon: "/AURA-icon.png"
        }
      ]
    },

    // 07 — THE INTERACTIVE TERMINAL
    interactiveTerminal: {
      number: "07",
      title: "The Interactive Terminal",
      tagline: "Command-Line Portfolio Discovery",
      intro: "The terminal introduces an alternative, keyboard-centric way to navigate AURA. Visitors can type authentic CLI commands to explore applications, inspect system specifications, and discover information about the developer.",
      terminalSpecs: [
        {
          cmd: "help",
          desc: "Lists all available commands and system navigation syntax."
        },
        {
          cmd: "about",
          desc: "Prints the developer profile abstract and engineering philosophy."
        },
        {
          cmd: "projects",
          desc: "Displays the active software engineering repository index."
        },
        {
          cmd: "skills",
          desc: "Outputs current technical skills, languages, and tools."
        },
        {
          cmd: "whoami",
          desc: "Returns developer identity, education, and current focus."
        },
        {
          cmd: "open <app>",
          desc: "Launches any application directly (e.g. 'open projects', 'open resume')."
        },
        {
          cmd: "neofetch",
          desc: "Renders the iconic ASCII system badge with live workstation telemetry."
        },
        {
          cmd: "achievements",
          desc: "Displays verified honors, competitions, and hackathon records."
        },
        {
          cmd: "contact",
          desc: "Prints communication channels, GitHub profile, and transmission info."
        },
        {
          cmd: "clear",
          desc: "Clears the active terminal output buffer."
        }
      ],
      features: [
        "Command history navigation using ArrowUp and ArrowDown keys.",
        "Levenshtein distance fuzzy matching to suggest corrections for misspelled commands.",
        "Seamless integration with the window manager to launch GUI applications via CLI."
      ]
    },

    // 08 — DESKTOP INTERACTION & MULTITASKING
    desktopInteraction: {
      number: "08",
      title: "Desktop Interaction & Multitasking",
      tagline: "Independent Window Compositor & Session Controls",
      paragraphs: [
        "AURA is engineered around familiar desktop paradigms rather than conventional web page navigation. Applications run as independent windows inside a custom multi-window compositor layer.",
        "Visitors can open multiple applications simultaneously, arrange them across the desktop workspace, minimize windows to the taskbar, and restore them with origin-aware gliding animations.",
        "The interface supports active window focus management, dynamic z-index depth elevation, maximize/restore toggling, edge snap preview docking, and global keyboard shortcuts (Alt+Tab app switcher and Ctrl+K command palette)."
      ],
      capabilities: [
        { title: "Window Focus Stacking", desc: "Clicking any window elevates its z-index above other active applications." },
        { title: "Minimize & Restore Glides", desc: "Windows shrink and fly into their specific taskbar icon, preserving child state." },
        { title: "Workspace Clamping", desc: "Windows calculate boundaries dynamically to stay strictly above the taskbar." },
        { title: "Keyboard Multitasking", desc: "Alt+Tab activates a native app switcher overlay for rapid window cycling." }
      ]
    },

    // 09 — RESPONSIVE EXPERIENCE
    responsiveExperience: {
      number: "09",
      title: "Responsive Experience",
      tagline: "From Ultra-Wide Monitors to 320px Mobile Screens",
      paragraphs: [
        "AURA is engineered to work across desktop monitors, laptops, tablets, and mobile phones through a tiered responsive architecture.",
        "On desktop and laptop displays (>= 1024px), AURA provides the full multi-window operating system experience with floating, resizable windows and centered taskbar clustering.",
        "On tablet screens (768px – 1023px), the desktop identity is maintained with compact taskbar spacing and touch-optimized snapping.",
        "On mobile phones (< 768px, down to 320px), AURA transitions into a distraction-free mobile OS: windows render as native full-screen cards with touch-friendly headers, dragging is disabled, desktop icons organize into a clean 3-column launcher grid, and the taskbar adapts into a compact touch dock."
      ],
      tiers: [
        { device: "Desktop & Ultra-wide (>= 1440px)", layout: "Full multi-window compositor, ambient particle canvas, and centered Windows 11 taskbar." },
        { device: "Laptops (1024px – 1439px)", layout: "Grouped left-column desktop icon arrangement with zero Start menu overlap." },
        { device: "Tablets (768px – 1023px)", layout: "Compact taskbar clustering, touch window resizing, and snappable workspace." },
        { device: "Mobile Phones (< 768px)", layout: "Dedicated 3-column app grid, native fullscreen window cards, and touch mobile dock." }
      ]
    },

    // 10 — TECHNOLOGY STACK
    technologyStack: {
      number: "10",
      title: "Technology Stack",
      tagline: "Lightweight, Production-Grade Frontend Architecture",
      intro: "AURA is built entirely with lightweight, modern web technologies without heavy desktop emulation frameworks or bulky external UI suites.",
      technologies: [
        {
          name: "React 18.3",
          category: "UI & Component Architecture",
          role: "Powering modular application components, reactive window states, and the multi-window compositor."
        },
        {
          name: "JavaScript (ESNext)",
          category: "Runtime Logic & Algorithms",
          role: "Handling window positioning algorithms, Levenshtein command fuzzy matching, and desktop event buses."
        },
        {
          name: "Tailwind CSS 3.4 & CSS Custom Properties",
          category: "Styling & Responsive Design",
          role: "Delivering responsive grid systems, hardware-accelerated animations, glassmorphism filters, and theme variables."
        },
        {
          name: "Vite 6.0",
          category: "Build Tool & Bundler",
          role: "Lightning-fast HMR development server and optimized Rollup production bundling with sub-30s compilation."
        },
        {
          name: "Lucide React",
          category: "Iconography",
          role: "Crisp vector icons powering taskbar triggers, window header controls, and system telemetry decals."
        },
        {
          name: "AWS Amplify",
          category: "Cloud Deployment",
          role: "Configured cloud hosting platform for automated CI/CD builds, custom domains, and global edge distribution."
        }
      ]
    },

    // 11 — ENGINEERING CHALLENGES
    engineeringChallenges: {
      number: "11",
      title: "Engineering Challenges",
      tagline: "System-Level Problems Solved in Frontend Code",
      intro: "Simulating a complete operating system inside a web browser required solving unique architectural challenges:",
      challenges: [
        {
          title: "Browser Window Management Without Libraries",
          description: "Building an independent multi-window compositor supporting drag, resize, minimize, maximize, and z-index elevation purely in React and vanilla DOM APIs."
        },
        {
          title: "Desktop Icon Column-Wrapping Geometry",
          description: "Preventing CSS Flexbox cross-axis stretching so wrapped columns stay tightly grouped on the left side of the desktop without encroaching on the centered Start menu."
        },
        {
          title: "Multi-Window Z-Index Depth Stacking",
          description: "Ensuring newly opened, clicked, or restored windows dynamically rise to the foreground while maintaining clean stacking order across 9 different applications."
        },
        {
          title: "High-Performance Particle Canvas",
          description: "Rendering an interactive particle background that animates smoothly at 60fps without interfering with pointer events or lagging desktop window drag operations."
        },
        {
          title: "Mobile Viewport Adaptation",
          description: "Gracefully transforming multi-window desktop interactions into focused fullscreen card experiences with bottom-dock navigation for handheld touchscreens down to 320px."
        },
        {
          title: "Browser Audio Security Compliance",
          description: "Engineering client-side audio gesture unlocking so the startup sound chimes seamlessly after user boot interaction without triggering autoplay policy blocks."
        }
      ]
    },

    // 12 — DEVELOPMENT APPROACH
    developmentApproach: {
      number: "12",
      title: "Development Approach",
      tagline: "Iterative Engineering from Concept to Workstation",
      intro: "AURA was developed incrementally through a methodical seven-phase engineering process:",
      phases: [
        {
          phase: "01",
          name: "Concept & Brand Identity",
          detail: "Establishing the AURA identity, Obsidian dark visual language, particle silhouette aesthetic, and OS portfolio concept."
        },
        {
          phase: "02",
          name: "UEFI Bootloader & Particle Canvas",
          detail: "Building the cinematic UEFI boot sequence, telemetry logging pipeline, orbital loader, and canvas particle system."
        },
        {
          phase: "03",
          name: "Window Compositor & Taskbar",
          detail: "Engineering the custom window manager hook, draggable window frame, centered taskbar cluster, and Start menu overlay."
        },
        {
          phase: "04",
          name: "Portfolio Applications Integration",
          detail: "Implementing the 9 dedicated applications: About Me, Projects, Skills, Honors, Resume, Contact, Terminal, Explorer, and Settings."
        },
        {
          phase: "05",
          name: "Terminal CLI & Discovery System",
          detail: "Creating the interactive command-line web shell with 19+ commands, Easter egg puzzle ('SYSTEM OVERRIDE'), and achievement toasts."
        },
        {
          phase: "06",
          name: "Multi-Tier Responsive Adaptation",
          detail: "Developing dedicated responsive adaptations across mobile phones (320px), tablets, laptops, and ultra-wide desktop monitors."
        },
        {
          phase: "07",
          name: "Production Optimization & Deployment",
          detail: "Refining code structure, eliminating dead code, optimizing Rollup asset chunking, and configuring AWS Amplify hosting."
        }
      ]
    },

    // 13 — FUTURE ROADMAP
    futureRoadmap: {
      number: "13",
      title: "Future Roadmap",
      tagline: "Completed Milestones & Planned Horizons",
      intro: "AURA is an evolving digital product. Here is the verified status of completed milestones alongside upcoming planned initiatives:",
      milestones: [
        {
          status: "Completed",
          title: "Core Operating System Architecture",
          detail: "Multi-window compositor, taskbar, Start menu, calendar popover, notification center, and 9 primary applications."
        },
        {
          status: "Completed",
          title: "Command-Line Shell & Discovery Engine",
          detail: "Interactive terminal with 19+ commands, fuzzy suggestions, achievement system, and hidden cybersecurity Easter egg."
        },
        {
          status: "Completed",
          title: "Complete Responsive Architecture",
          detail: "Adaptive layouts across mobile phones (down to 320px), tablets, laptops, and ultra-wide 2K desktop displays."
        },
        {
          status: "In Development",
          title: "Cloud Infrastructure & CI/CD",
          detail: "Refining the AWS Amplify continuous deployment pipeline, global CDN edge caching, and build verification."
        },
        {
          status: "Planned",
          title: "Embedded Interactive Live Demos",
          detail: "Interactive project sandboxes running live within window viewports directly inside the Projects application."
        },
        {
          status: "Planned",
          title: "In-Browser Code Editor & Previewer",
          detail: "A lightweight Monaco-inspired code sandbox allowing visitors to write, edit, and run code snippets within AURA."
        }
      ]
    },

    // 14 — WHAT MAKES AURA DIFFERENT?
    whatMakesDifferent: {
      number: "14",
      title: "What Makes AURA Different?",
      tagline: "Identity Expressed as a Functional Environment",
      paragraphs: [
        "AURA isn't intended to imitate a real commercial operating system or replace one.",
        "Instead, it takes the universally familiar concept of a desktop environment and uses it to present a developer's identity, technical versatility, and engineering philosophy in a much more interactive way.",
        "Where typical portfolios deliver static information through passive scrolling, AURA invites visitors to become active operators: booting the system, launching terminal commands, organizing project windows, and discovering hidden Easter eggs.",
        "Its focus is on combining personal branding, project storytelling, frontend engineering, and desktop-inspired interactions into one cohesive, memorable browser-based experience."
      ],
      pillars: [
        { title: "Active Exploration", desc: "Visitors interact with tools, windows, and commands rather than skimming static text." },
        { title: "First-Principles Code", desc: "Built with standard React and CSS—no bulky external desktop simulator libraries." },
        { title: "Holistic Storytelling", desc: "Every project, skill, and milestone is presented in its natural architectural context." },
        { title: "Responsive Craftsmanship", desc: "Maintains authentic OS identity on large screens while offering native card layouts on mobile." }
      ]
    },

    // 15 — VISION
    theVision: {
      number: "15",
      title: "Vision",
      tagline: "Beyond Static Web Pages: A Personal Digital Product",
      quote: "Not just a portfolio. A workspace built around my journey.",
      coreStatement: "ENGINEERING SYSTEMS FROM FIRST PRINCIPLES",
      paragraphs: [
        "I wanted to build something that represents more than the technologies I know or the projects I have completed.",
        "AURA is an experiment in turning a personal portfolio into an interactive product — one that reflects how I think about interfaces, software, and user experiences.",
        "It is continuously evolving as I learn, experiment, and build."
      ]
    }
  },

  // Project Information & Technical Specifications Matrix
  projectInfo: {
    project: "AURA",
    fullForm: "Aadhish's Unified Runtime Architecture",
    category: "Web Development / Interactive Systems",
    projectType: "Personal Portfolio OS",
    developer: "Aadhish Saini",
    primaryObjective: "Transforming a developer portfolio into an interactive desktop environment.",
    frontend: "React 18.3, JavaScript (ESNext), Tailwind CSS 3.4",
    buildTool: "Vite 6.0",
    hosting: "AWS Amplify (Cloud Deployment Platform)",
    repository: "github.com/aadhish-saini/aura",
    githubUrl: "https://github.com/aadhish-saini/aura",
    closingLine: "AURA OS // ARCHITECT SPECIFICATION VERIFIED // SYSTEM VERSION 26100"
  }
};

