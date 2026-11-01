/**
 * Interactive Developer Portfolio Configuration and Editorial Content
 * Building a Personal Identity Beyond a Traditional Website
 */

export const PORTFOLIO_DATA = {
  // Identity & Hero
  hero: {
    projectName: "Interactive Developer Portfolio",
    mainHeading: "INTERACTIVE DEVELOPER PORTFOLIO",
    tagline: "Building a Personal Identity Beyond a Traditional Website.",
    shortDescription: "An interactive developer portfolio built around a custom 3D avatar, cursor-responsive interactions, smooth animations, and visual storytelling. Designed to turn a conventional portfolio into an engaging digital experience.",
    category: "Frontend Development & Interactive Web Experience",
    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "GSAP",
      "Three.js"
    ],
    githubUrl: "https://github.com/aadhish-saini/portfolio-website-2",
    repoName: "aadhish-saini/portfolio-website-2",
    iconImage: "/projects-icons/3d-portfolio-icon.png",
  },

  // 12 Case Study Sections
  sections: {
    theBeginning: {
      number: "01",
      title: "The Beginning",
      tagline: "Rethinking the Developer Portfolio",
      paragraphs: [
        "A portfolio is usually a collection of sections containing someone's introduction, skills, projects, and contact information.",
        "I wanted to approach it differently.",
        "Instead of building another conventional portfolio, I wanted to create an experience that would make visitors interact with the website and explore my work in a more memorable way.",
        "The idea was to bring together 3D elements, animation, cursor interactions, and web technologies to create a digital representation of myself.",
        "That became the foundation of my Interactive Developer Portfolio."
      ]
    },

    theProblem: {
      number: "02",
      title: "The Problem",
      tagline: "The Static Template Dilemma",
      intro: "Traditional developer portfolios often follow similar layouts:",
      points: [
        "A hero section with an introduction.",
        "A list of technical skills.",
        "A collection of project cards.",
        "An about section and contact information."
      ],
      conclusion: "Although these layouts communicate information effectively, they do not always demonstrate a developer's creativity or ability to build interactive experiences. I wanted my portfolio itself to become an example of what I could build."
    },

    theSolution: {
      number: "03",
      title: "The Solution",
      tagline: "An Experience Built Around an Avatar",
      paragraphs: [
        "I developed an interactive portfolio centred around a custom 3D avatar.",
        "Rather than treating the avatar as a static illustration, the experience was designed to make it feel more alive through subtle movements and cursor-responsive behaviour.",
        "The website combines personal storytelling, interactive visual elements, smooth transitions, and project showcases into one connected experience.",
        "The goal was simple: visitors should not just read about my work; they should experience it."
      ]
    },

    avatarExperience: {
      number: "04",
      title: "The 3D Avatar Experience",
      tagline: "Giving Character to Code",
      overview: "The central visual element is a custom avatar representing me. The avatar acts as the visual identity of the portfolio and creates a more personal connection with visitors.",
      interactionConcept: [
        {
          title: "Cursor-Responsive Head & Eye Tracking",
          description: "Follows pointer coordinates across viewport bounds to simulate active human visual focus and attentiveness."
        },
        {
          title: "Natural Blinking Behaviour",
          description: "Stochastic micro-intervals programmed to emulate organic human eye blinking patterns rather than mechanical loops."
        },
        {
          title: "Subtle Idle Movements",
          description: "Micro-animations that keep the character alive even when the user is inactive or reading static text."
        },
        {
          title: "Dynamic Eye States",
          description: "Contextual expression shifts that add warmth, curiosity, and responsiveness during interactive moments."
        },
        {
          title: "Central Hero Position",
          description: "Anchored at the primary visual focal point of the introductory section rather than hidden behind standard graphics."
        }
      ],
      summary: "This turns the introductory section into an interactive experience rather than a static profile banner."
    },

    interactiveVisualSystem: {
      number: "05",
      title: "Interactive Visual System",
      tagline: "Motion and Visual Feedback with Purpose",
      overview: "The portfolio uses motion and visual feedback to make navigation more engaging. These elements are intended to support the content rather than distract visitors from it.",
      elements: [
        {
          title: "Custom Cursor Behaviour",
          description: "A tailored cursor tracking system offering context-aware resizing, magnetic snap-to-element effects, and visual hints."
        },
        {
          title: "Smooth Hover Interactions",
          description: "Reactive feedback across interactive touchpoints, transforming passive hover into playful discovery."
        },
        {
          title: "Animated Section Transitions",
          description: "Choreographed spatial shifts that transport the visitor smoothly through the narrative timeline."
        },
        {
          title: "Scroll-Controlled Visual Changes",
          description: "Parallax layers and scroll-triggered transformations synchronizing visual depth with reading progression."
        },
        {
          title: "Dynamic Typography & Backgrounds",
          description: "Fluid text treatments and ambient background transitions that respond gracefully to user viewport motion."
        },
        {
          title: "Carefully Placed Colour Accents",
          description: "Balanced neon greens, electric cyans, and deep space obsidian that direct visual attention with restraint."
        }
      ]
    },

    projectShowcase: {
      number: "06",
      title: "Project Showcase",
      tagline: "Connecting Creative Frontend with Deep Engineering",
      paragraphs: [
        "The portfolio also works as a central place to explore my development work.",
        "It presents projects through visual previews and structured information, allowing visitors to understand what I have built and explore individual projects.",
        "The project showcase connects my creative frontend work with my other technical interests, including AI development and software engineering."
      ]
    },

    technologyStack: {
      number: "07",
      title: "Technology Stack",
      tagline: "Tools for Expressive Frontend Engineering",
      summary: "The combination allows the website to go beyond static layouts and create a more expressive user interface.",
      technologies: [
        {
          name: "React",
          role: "Component-based interface development",
          detail: "Provides structured component hierarchy, state-driven rendering, and clean separation of concerns."
        },
        {
          name: "JavaScript",
          role: "Interaction logic and dynamic behaviour",
          detail: "Drives real-time cursor coordinate calculations, mathematical interpolations, and event dispatching."
        },
        {
          name: "CSS",
          role: "Layout, styling, and visual effects",
          detail: "Engineers responsive layouts, blend modes, glassmorphism surfaces, and hardware-accelerated transitions."
        },
        {
          name: "GSAP",
          role: "Smooth animations and scroll-based transitions",
          detail: "High-performance animation timelines, easing mathematics, and fine-grained scroll trigger orchestration."
        },
        {
          name: "Three.js",
          role: "3D graphics and interactive visual experiences",
          detail: "WebGL rendering pipeline, mesh transformations, lighting calculations, and interactive 3D scene control."
        }
      ]
    },

    engineeringChallenges: {
      number: "08",
      title: "Engineering Challenges",
      tagline: "Balancing Visual Creativity with Performance",
      intro: "Building an interactive portfolio introduces challenges beyond ordinary website development.",
      challenges: [
        {
          title: "Natural Cursor Interaction",
          description: "Translating 2D screen coordinates into smooth, believable 3D rotational angles with damping to eliminate jitter."
        },
        {
          title: "Animation Coordination",
          description: "Coordinating multiple simultaneous timelines without visual conflicts, layout thrashing, or race conditions."
        },
        {
          title: "3D Rendering Performance",
          description: "Maintaining a consistent 60 FPS while running WebGL geometry and shader calculations alongside complex DOM nodes."
        },
        {
          title: "Reusable Component Structure",
          description: "Structuring complex interactive behaviors into clean, decoupled React components that remain maintainable."
        },
        {
          title: "Cross-Device Responsiveness",
          description: "Adapting high-interaction desktop mouse events gracefully for touchscreens, mobile viewports, and various resolutions."
        },
        {
          title: "Creativity vs. Usability",
          description: "Striking a fine balance where motion delights the user without slowing down navigation or obscuring core content."
        }
      ],
      takeaway: "The project helped me understand that an interactive experience needs more than attractive visuals. Performance, timing, responsiveness, and usability matter just as much."
    },

    developmentApproach: {
      number: "09",
      title: "Development Approach",
      tagline: "Modular Decomposition for Creative Systems",
      paragraphs: [
        "I approached the project by separating the experience into individual sections and reusable components.",
        "The visual system, avatar interactions, cursor behaviour, animations, and project showcases were treated as separate parts of the interface.",
        "This made it easier to improve individual interactions without rebuilding the entire website."
      ],
      modules: [
        { name: "Avatar Engine", desc: "Three.js mesh loader, material shaders, and coordinate tracker" },
        { name: "Cursor Controller", desc: "Pointer delta calculation, smoothing, and magnetic elements" },
        { name: "Motion Timeline", desc: "GSAP master timeline orchestrating section reveals" },
        { name: "Content Showcase", desc: "Modular project cards with interactive preview triggers" }
      ]
    },

    whatILearned: {
      number: "10",
      title: "What I Learned",
      tagline: "Websites as Interactive Products",
      overview: "This project helped me explore frontend development beyond conventional layouts. It changed how I think about frontend development: a website can be both an information platform and an interactive product.",
      skills: [
        "React component architecture",
        "Animation timelines and scroll interactions",
        "3D web experiences",
        "Cursor-based interaction design",
        "Visual storytelling",
        "Responsive interface development",
        "Performance considerations in animation-heavy websites"
      ]
    },

    futurePossibilities: {
      number: "11",
      title: "Future Possibilities",
      tagline: "Evolving the Digital Experience",
      intro: "There is still room to expand the experience. Possible improvements include:",
      items: [
        {
          title: "More Advanced 3D Avatar Expressions",
          detail: "Facial blend shapes and real-time audio lip-syncing for heightened interactive immersion."
        },
        {
          title: "Additional Interactive Environments",
          detail: "Context-aware 3D scenery and ambient lighting that shift based on daytime, reading pace, or user choice."
        },
        {
          title: "More Detailed Project Demonstrations",
          detail: "In-browser live sandbox previews and interactive architecture exploration modules."
        },
        {
          title: "Improved Mobile Interaction Alternatives",
          detail: "Gyroscope-driven tilt tracking and gesture-based alternatives replacing mouse cursor interactions on mobile."
        },
        {
          title: "Further Performance Optimisation",
          detail: "OffscreenCanvas rendering, texture compression, and adaptive WebGL level-of-detail for lower-end devices."
        }
      ]
    },

    theVision: {
      number: "12",
      title: "The Vision",
      tagline: "The portfolio itself is the project.",
      quote: "I see this portfolio as more than an online resume. It is an evolving digital space that represents my learning journey, technical interests, and creative approach to building software. I wanted to make something that communicates not only what I know, but also how I think about building experiences.",
      coreStatement: "The portfolio itself is the project."
    }
  },

  // Project Information Summary (Bottom Section)
  projectInfo: {
    project: "Interactive Developer Portfolio",
    category: "Frontend Development",
    domain: "Interactive Web Experiences",
    primaryObjective: "Building a memorable personal identity through an interactive portfolio.",
    coreTechnologies: "React, JavaScript, CSS, GSAP, Three.js",
    repository: "aadhish-saini/portfolio-website-2",
    githubUrl: "https://github.com/aadhish-saini/portfolio-website-2"
  }
};

