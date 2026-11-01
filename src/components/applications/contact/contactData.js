/**
 * Centralized Contact Configuration
 * AURA — Aadhish's Unified Runtime Architecture
 *
 * Exact verified owner contact details and Formspree configuration.
 */

export const CONTACT_DATA = {
  owner: "Aadhish Saini",
  email: "aadhishsainii@gmail.com",
  phone: "+91 82220 05143",
  phoneCallUrl: "tel:+918222005143",
  emailMailtoUrl: "mailto:aadhishsainii@gmail.com",

  hero: {
    heading: "Let's Connect",
    subtitle: "Good ideas start with conversations. Let's build something meaningful together.",
    description:
      "I'm always interested in connecting with people who enjoy technology, creativity, and building things that solve real problems.",
  },

  socialProfiles: [
    {
      id: "linkedin",
      platform: "LinkedIn",
      handle: "in/aadhish-saini",
      url: "https://www.linkedin.com/in/aadhish-saini",
      description: "Professional network, engineering updates, and technical milestones.",
      accent: "#0ea5e9", // Sky
    },
    {
      id: "github",
      platform: "GitHub",
      handle: "aadhish-saini",
      url: "https://github.com/aadhish-saini",
      description: "Open-source projects, system prototypes, and architecture commits.",
      accent: "#38bdf8", // Cyan
    },
    {
      id: "instagram",
      platform: "Instagram",
      handle: "@aadhish_saini",
      url: "https://www.instagram.com/aadhish_saini/",
      description: "Visual updates, personal creative pursuits, and developer journey.",
      accent: "#e1306c", // Instagram Rose / Magenta
    },
  ],

  collaborationOpportunities: [
    {
      id: "software-dev",
      title: "Software Development",
      description: "Full-stack web applications, component architecture, and performant systems.",
    },
    {
      id: "ai-eng",
      title: "AI Engineering",
      description: "Machine learning integration, FastAPI model inference, and intelligent applications.",
    },
    {
      id: "hackathons",
      title: "Hackathons",
      description: "Competitive coding, fast-paced prototyping, and high-intensity problem solving.",
    },
    {
      id: "tech-collab",
      title: "Technical Collaboration",
      description: "Partnering on open-source initiatives, creative tools, and systems design.",
    },
    {
      id: "project-ideas",
      title: "Innovative Project Ideas",
      description: "Brainstorming and architecting solutions to solve real-world problems.",
    },
    {
      id: "knowledge-sharing",
      title: "Learning & Knowledge Sharing",
      description: "Exchanging technical insights, emerging AI research, and engineering practices.",
    },
  ],

  // Formspree hosted endpoint from Vite environment configuration
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/mkjjqzpk",
};

