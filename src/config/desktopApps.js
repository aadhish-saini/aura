/**
 * Desktop Application Registry
 * Defines metadata, custom icon assets, and default window geometry for all 9 desktop apps.
 */

export const DESKTOP_APPS = {
  about: {
    id: "about",
    title: "About Me // Developer Profile",
    shortTitle: "About Me",
    icon: "User",
    image: "/icons/about me.png",
    category: "profile",
    defaultWidth: 760,
    defaultHeight: 580,
    defaultPosition: { x: 340, y: 80 }
  },
  projects: {
    id: "projects",
    title: "Projects // Repository Index",
    shortTitle: "Projects",
    icon: "FolderGit2",
    image: "/icons/projects.png",
    category: "work",
    defaultWidth: 800,
    defaultHeight: 580,
    defaultPosition: { x: 380, y: 90 }
  },
  skills: {
    id: "skills",
    title: "Skills // Hardware & Architecture",
    shortTitle: "Skills",
    icon: "Cpu",
    image: "/icons/skills.png",
    category: "tech",
    defaultWidth: 700,
    defaultHeight: 540,
    defaultPosition: { x: 360, y: 100 }
  },
  achievements: {
    id: "achievements",
    title: "Honors // Verified Recognitions",
    shortTitle: "Honors",
    icon: "Award",
    image: "/icons/honors.png",
    category: "milestones",
    defaultWidth: 680,
    defaultHeight: 480,
    defaultPosition: { x: 400, y: 110 }
  },
  resume: {
    id: "resume",
    title: "Resume // Curriculum Vitae",
    shortTitle: "Resume",
    icon: "FileText",
    image: "/icons/resume.png",
    category: "career",
    defaultWidth: 720,
    defaultHeight: 600,
    defaultPosition: { x: 420, y: 70 }
  },
  contact: {
    id: "contact",
    title: "Transmission // Direct Contact",
    shortTitle: "Contact",
    icon: "Mail",
    image: "/icons/contact.png",
    category: "communication",
    defaultWidth: 640,
    defaultHeight: 500,
    defaultPosition: { x: 390, y: 120 }
  },
  terminal: {
    id: "terminal",
    title: "bash // guest@aura:~",
    shortTitle: "Terminal",
    icon: "Terminal",
    image: "/icons/terminal.png",
    category: "system",
    defaultWidth: 740,
    defaultHeight: 500,
    defaultPosition: { x: 350, y: 130 }
  },
  explorer: {
    id: "explorer",
    title: "File Explorer // AURA_FS",
    shortTitle: "Explorer",
    icon: "FolderTree",
    image: null,
    category: "system",
    defaultWidth: 760,
    defaultHeight: 520,
    defaultPosition: { x: 370, y: 95 }
  },
  settings: {
    id: "settings",
    title: "Preferences // System Settings",
    shortTitle: "Settings",
    icon: "Sliders",
    image: null,
    category: "system",
    defaultWidth: 620,
    defaultHeight: 480,
    defaultPosition: { x: 410, y: 105 }
  }
};

export const DESKTOP_ICON_LIST = [
  DESKTOP_APPS.about,
  DESKTOP_APPS.projects,
  DESKTOP_APPS.skills,
  DESKTOP_APPS.achievements,
  DESKTOP_APPS.resume,
  DESKTOP_APPS.contact,
  DESKTOP_APPS.terminal,
  DESKTOP_APPS.explorer,
  DESKTOP_APPS.settings
];
