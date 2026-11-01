/**
 * Centralized Honors & Recognition Data Configuration
 * AURA — Aadhish's Unified Runtime Architecture
 *
 * All records strictly represent verified achievements and milestones.
 * No arbitrary statistics or fabricated award counts.
 */

export const HONOR_CATEGORIES = [
  { id: 'all', label: 'All Records', description: 'Comprehensive achievement log' },
  { id: 'hackathons', label: 'Hackathons', description: 'Competitive engineering & hackathons' },
  { id: 'awards', label: 'Awards', description: 'Individual & team honors' },
  { id: 'certifications', label: 'Certifications', description: 'Verified credentials & qualifications' },
  { id: 'milestones', label: 'Milestones', description: 'Development & technical milestones' },
  { id: 'secrets', label: 'Secret Discovery', description: 'Hidden portfolio achievements & Easter eggs' },
];

export const HONORS_DATA = {
  header: {
    title: 'Honors & Recognition',
    subtitle: 'Every achievement represents a step forward — a challenge accepted, an experience gained, and progress made.',
    introduction:
      'A structured archive of competitive hackathon performances, engineering milestones, and verified recognitions earned through hands-on software development.',
  },

  // Featured Confirmed Achievement
  featuredAchievement: {
    id: 'hackathon-rank7',
    category: 'hackathons',
    title: 'Internal College Hackathon',
    organization: 'College Engineering Body',
    date: 'College Hackathon Edition',
    rank: '07',
    rankDisplay: 'Rank 07',
    totalTeams: 63,
    resultSummary: '7th Rank among 63 Teams',
    team: 'Dark Syntaxx',
    role: 'Core Team Member & Developer',
    status: 'Verified Achievement',
    recognition: 'Certificate Received',
    hasCertificate: true,
    certificateImage: null, // No uploaded image file yet; clean verified certificate badge placeholder is rendered
    certificateDetails: {
      type: 'Official Certificate of Merit & Participation',
      recipient: 'Aadhish Saini (Team: Dark Syntaxx)',
      issuance: 'Awarded for securing 7th Rank among 63 competing engineering teams',
      status: 'Document on File // Verified',
    },
    description:
      'Competed with 63 engineering teams to conceptualize, design, and prototype a software solution under strict hackathon deadlines. Led technical problem solving and user-interface implementation within Team Dark Syntaxx, securing a top-10 position on the final competition leaderboard.',
    highlights: [
      'Top 10 Finish: Outperformed 56 competing collegiate teams',
      'Team Dark Syntaxx: Collaborative sprint through ideation and functional prototyping',
      'Official Recognition: Certificate received for technical execution and ranking',
    ],
    tags: ['Hackathon', 'Dark Syntaxx', 'Competitive Prototyping', 'Top 10 Finalist'],
  },

  // All Achievement Records for Archive & Filtering
  records: [
    {
      id: 'hackathon-rank7',
      category: 'hackathons',
      title: 'Internal College Hackathon',
      organization: 'College Engineering Body',
      date: 'College Hackathon Edition',
      rankDisplay: 'Rank 07 / 63',
      result: '7th Rank among 63 Teams',
      team: 'Dark Syntaxx',
      status: 'Completed // Top 10 Finalist',
      hasCertificate: true,
      certificateImage: null,
      certificateProofText: 'Official Certificate Received',
      description:
        'Competed with 63 engineering teams to design and prototype an innovative software solution under strict hackathon deadlines. Secured 7th place on the overall leaderboard.',
      tags: ['Hackathon', 'Dark Syntaxx', 'Top 10 Finalist'],
      order: 1,
    },
    // Milestones (Categorized under 'milestones')
    {
      id: 'milestone-hackathon-top10',
      category: 'milestones',
      title: 'First Competitive Hackathon — Top 10 Placement',
      organization: 'Team Dark Syntaxx',
      date: 'Milestone 01',
      result: 'Rank 7 of 63 Teams',
      status: 'Milestone Achieved',
      hasCertificate: true,
      certificateImage: null,
      certificateProofText: 'Certificate Received',
      description:
        'First major collegiate hackathon journey with Team Dark Syntaxx, validating fast-paced collaboration and delivering a working prototype under pressure.',
      tags: ['Milestone', 'Hackathon', 'Team Dark Syntaxx'],
      order: 2,
    },
    {
      id: 'milestone-dhruvnetra',
      category: 'milestones',
      title: 'DhruvNetra Architecture Conception',
      organization: 'Smart Automation / Digital Twin Research',
      date: 'Milestone 02',
      result: 'Prototype System Architecture',
      status: 'Project Engineered',
      hasCertificate: false,
      certificateImage: null,
      description:
        'Researched and architected a digital platform prototype for remote operations monitoring of Indian Antarctic Research Stations, Maitri and Bharati.',
      tags: ['Milestone', 'DhruvNetra', 'Digital Twin'],
      order: 3,
    },
    {
      id: 'milestone-aivoiceguard',
      category: 'milestones',
      title: 'AI-Voice Guard Deepfake Audio Research',
      organization: 'AI & Cybersecurity Prototype',
      date: 'Milestone 03',
      result: 'FastAPI & Hugging Face Integration',
      status: 'Project Engineered',
      hasCertificate: false,
      certificateImage: null,
      description:
        'Engineered an AI-powered voice authenticity verification system combining FastAPI inference with speech transformer pipelines for synthetic voice detection.',
      tags: ['Milestone', 'AI-Voice Guard', 'Machine Learning'],
      order: 4,
    },
    {
      id: 'milestone-aura-os',
      category: 'milestones',
      title: 'AURA Personal Developer OS Runtime',
      organization: 'Creative Software Engineering',
      date: 'Milestone 04',
      result: 'Interactive OS Portfolio Architecture',
      status: 'System Operational',
      hasCertificate: false,
      certificateImage: null,
      description:
        'Designed and constructed an OS-inspired desktop runtime environment unifying application windows, system shortcuts, theme transitions, and technical showcases.',
      tags: ['Milestone', 'AURA', 'Desktop Architecture'],
      order: 5,
    },
  ],

  // Hidden / Secret Discovery records
  secretGamingAchievement: {
    unlocked: {
      id: 'secret-gaming-achievement',
      category: 'secrets',
      title: "WAIT... WHERE'S THE GAME?",
      organization: 'AURA System Core // Easter Egg Discovery',
      date: 'Secret Discovery',
      rankDisplay: 'UNLOCKED',
      result: 'A developer who loves gaming somehow forgot to add a game to his own operating system.',
      team: 'Curious Visitor',
      status: 'Secret Discovered // Achieved',
      hasCertificate: false,
      isSecretDiscovery: true,
      description:
        'A developer who loves gaming somehow forgot to add a game to his own operating system. Found by probing system anomalies and launching the hidden cybersecurity challenge: AURA: SYSTEM OVERRIDE.',
      tags: ['Secret Discovery', 'Gaming Easter Egg', 'SYSTEM OVERRIDE'],
      order: 6,
    },
    locked: {
      id: 'secret-gaming-achievement',
      category: 'secrets',
      title: '??? [CLASSIFIED SECRET DISCOVERY]',
      organization: 'AURA System Core',
      date: 'Secret Discovery',
      rankDisplay: 'LOCKED',
      result: 'Locked secret achievement waiting to be uncovered.',
      team: 'System Security',
      status: 'Locked // Undiscovered',
      hasCertificate: false,
      isSecretDiscovery: true,
      description:
        'A hidden achievement exists somewhere inside AURA. Look closely at system messages, terminal clues, and unseen applications.',
      tags: ['Secret Discovery', 'Locked'],
      order: 6,
    },
  },

  // Empty state messages for categories with no records yet
  emptyStates: {
    awards: {
      title: 'No Independent Awards Logged Yet',
      description:
        'Individual and special institutional honors are published here as they are officially conferred. Competitive recognitions are currently logged under Hackathons.',
      badgeText: 'Awaiting Official Confeals',
    },
    certifications: {
      title: 'No Certifications Logged Yet',
      description:
        'Technical credentials and professional certification tracks are verified before publication. Records with verifiable credential IDs will appear here upon completion.',
      badgeText: 'Verification In Progress',
    },
  },
};

