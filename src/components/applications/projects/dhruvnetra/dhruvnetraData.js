/**
 * DhruvNetra Project Configuration and Complete Editorial Content
 * A Digital Twin for India's Antarctic Research Stations (Maitri & Bharati)
 * SIH Problem Statement: PS26060 | Ministry of Earth Sciences | NCPOR
 */

export const DHRUVNETRA_DATA = {
  hero: {
    title: "DHRUVNETRA",
    tagline: "A Digital Twin for India's Antarctic Research Stations",
    subtitle: "Digital Platform for Efficient Remote Management of Indian Antarctic Research Stations",
    metadata: {
      problemStatement: "SIH PS26060",
      ministry: "Ministry of Earth Sciences",
      organization: "NCPOR",
      category: "Software",
      theme: "Smart Automation",
      targetStations: "Maitri & Bharati",
      projectType: "Web-Based Digital Twin & Remote Operational Platform"
    },
    githubUrl: "https://github.com/aadhish-saini/DhruvNetra",
    youtubeUrl: "https://www.youtube.com/watch?v=wm8D7UTBSXo",
    youtubeId: "wm8D7UTBSXo"
  },

  sections: [
    {
      id: "the-idea",
      number: "01",
      title: "THE IDEA",
      tagline: "Managing the world's most remote research stations, from anywhere.",
      content: [
        "Antarctica is Earth's final and most inhospitable frontier. Under the aegis of the National Centre for Polar and Ocean Research (NCPOR) and the Ministry of Earth Sciences (MoES), India maintains two permanent scientific outposts in this extreme polar wilderness: Maitri in the rocky Schirmacher Oasis, and Bharati in the coastal Larsemann Hills.",
        "Operating in conditions where winter temperatures plummet below -50°C and relentless katabatic blizzards exceed 160 km/h, human presence on the ice is entirely reliant on delicate, interconnected life support networks. Managing power generation, polar diesel fuel caches, habitat climate envelopes, and atmospheric research instruments from thousands of kilometers away has historically presented immense logistical complexity.",
        "DhruvNetra was conceived to dismantle this physical barrier. By fusing spatial 3D visualization, unified telemetry aggregation, and intelligent operational modeling into a singular browser-accessible digital twin, DhruvNetra gives mission directors and on-station engineers a clear, synchronous window into Antarctic station reality."
      ]
    },
    {
      id: "the-problem",
      number: "02",
      title: "THE PROBLEM",
      tagline: "Distance makes every decision more difficult.",
      content: [
        "When an anomalous event occurs in an extreme polar environment, immediate physical intervention is impossible. During the six months of continuous polar night, research stations are completely isolated from external supply ships and aircraft flights.",
        "Traditional station operations face four critical operational bottlenecks:",
        "1. Extreme Geographical Isolation: Headquarters in Goa and New Delhi are situated thousands of kilometers across oceans, dependent on constrained satellite communication windows.",
        "2. Fragmented Legacy Subsystems: Energy generation, fuel storage tanks, HVAC loops, and meteorological instruments often operate on isolated vendor consoles without unified data correlation.",
        "3. High Consequence of Failure: A localized boiler failure, fuel leak, or generator synchronization issue in sub-zero whiteout conditions represents an immediate life-safety hazard rather than an administrative disruption.",
        "4. Delayed Situational Diagnostics: Station crews spend excessive time conducting physical walk-around inspections in lethal sub-zero cold to log equipment parameters that could otherwise be monitored continuously."
      ]
    },
    {
      id: "our-solution",
      number: "03",
      title: "OUR SOLUTION",
      tagline: "One platform. Two stations. A unified operational picture.",
      content: [
        "DhruvNetra introduces an integrated, centralized digital command platform that brings both Maitri and Bharati into one unified operational console.",
        "By replacing disparate monitoring routines with a single intuitive interface, the system synchronizes live environmental metrics, consumable inventories, habitat diagnostics, and predictive alerts across both stations.",
        "Headquarters leadership and on-station wintering teams access identical operational situational models, eliminating ambiguity and enabling collaborative decision-making when timing is critical."
      ]
    },
    {
      id: "the-digital-twin",
      number: "04",
      title: "THE DIGITAL TWIN",
      tagline: "A digital representation of a physical research station.",
      content: [
        "At the core of DhruvNetra is a high-fidelity 3D digital twin replicating the exact physical station architecture—from habitat living blocks and central control bridges to auxiliary generator sheds and exterior scientific masts.",
        "Rather than forcing operators to decipher abstract spreadsheets or disjointed sensor tables, the 3D twin projects live telemetry onto the spatial layout of the station.",
        "Operators can orbit station facilities, isolate specific building zones, inspect structural thermal barriers, and pinpoint sensor alerts in their true physical spatial context."
      ]
    }
  ],

  modules: [
    {
      id: "overview",
      index: "01",
      name: "Overview",
      badge: "Command Center",
      summary: "Executive station dashboard aggregating overall operational health indices, active alert tallies, current ambient weather conditions, and mission readiness indicators."
    },
    {
      id: "digital-twin",
      index: "02",
      name: "Digital Twin",
      badge: "Spatial Engine",
      summary: "Interactive 3D spatial model visualizing station architecture, module compartmentalization, thermal barrier integrity, and localized sensor coordinate nodes."
    },
    {
      id: "power-management",
      index: "03",
      name: "Power Management",
      badge: "Life Support",
      summary: "Real-time electrical grid monitoring tracking primary diesel generators, auxiliary backup sets, solar and wind inputs, phase distribution, and kilowatt load balances."
    },
    {
      id: "fuel-management",
      index: "04",
      name: "Fuel Management",
      badge: "Critical Resource",
      summary: "Specialized polar-grade aviation fuel and diesel inventory monitoring, daily burn rates, tank level sensors, pipeline leak detection, and replenishment date forecasting."
    },
    {
      id: "hvac-management",
      index: "05",
      name: "HVAC Management",
      badge: "Habitat Climate",
      summary: "Habitat climate control tracking internal living quarters temperatures, hydronic heating loops, exhaust heat recovery units, humidity levels, and air pressure regulation."
    },
    {
      id: "water-management",
      index: "06",
      name: "Water Management",
      badge: "Consumables",
      summary: "Snow-melting plant monitoring, hot water generation, potable water storage reserves, filtration cycle metrics, greywater recycling, and per-capita daily consumption."
    },
    {
      id: "environmental-monitoring",
      index: "07",
      name: "Environmental Monitoring",
      badge: "Meteorology",
      summary: "Exterior meteorological sensors tracking wind speed and gust velocity, ambient temperature, barometric pressure trends, solar radiation, and blizzard warning indices."
    },
    {
      id: "logistics-management",
      index: "08",
      name: "Logistics Management",
      badge: "Inventory",
      summary: "Comprehensive tracking of mission-critical spare parts, medical supplies, emergency survival food caches, equipment operating hours, and shipping cargo manifests."
    },
    {
      id: "alerts-notifications",
      index: "09",
      name: "Alerts & Notifications",
      badge: "Incident Response",
      summary: "Multi-tiered emergency notification system categorizing system warnings into Info, Warning, Critical, and Emergency levels with automated escalation protocols."
    },
    {
      id: "what-if-simulation",
      index: "10",
      name: "What-If Simulation",
      badge: "Scenario Sandbox",
      summary: "Predictive digital twin sandbox enabling operators to simulate hypothetical disasters—such as generator failure, severe blizzards, or heating drops—before taking physical action."
    },
    {
      id: "government-command",
      index: "11",
      name: "Government Command",
      badge: "High Governance",
      summary: "Strategic oversight portal tailored for Ministry of Earth Sciences and NCPOR leadership, tracking multi-station reserves, expedition milestones, and regulatory compliance."
    },
    {
      id: "reports-analytics",
      index: "12",
      name: "Reports & Analytics",
      badge: "Audit & Intel",
      summary: "Automated generation of daily operational logs, seasonal energy efficiency audits, historical telemetry trend graphs, and regulatory compliance documentation."
    }
  ],

  architectureSections: [
    {
      id: "offline-first",
      number: "06",
      title: "OFFLINE-FIRST ARCHITECTURE",
      tagline: "Resilient operation in zero-connectivity environments.",
      pillars: [
        {
          title: "Local Availability",
          description: "Station-side deployment operates locally on edge server hardware, ensuring full monitoring and diagnostics even when satellite communication is entirely down."
        },
        {
          title: "Independent Operation",
          description: "All life-support telemetry, sensor acquisition, and incident alarms function autonomously without relying on external cloud infrastructure."
        },
        {
          title: "Data Synchronization",
          description: "An asynchronous delta-synchronization engine buffers time-series telemetry locally and transmits compressed batches as soon as satellite bandwidth windows open."
        },
        {
          title: "Unified Visibility",
          description: "Mainland command centers automatically reconcile asynchronous telemetry packets into a seamless, chronological operational history."
        }
      ]
    },
    {
      id: "ai-decision-support",
      number: "07",
      title: "AI & INTELLIGENT DECISION SUPPORT",
      tagline: "Predictive intelligence for extreme environments.",
      pillars: [
        {
          title: "Operational Insights",
          description: "Machine learning algorithms analyze power load trends and fuel consumption curves to detect subtle mechanical degradation before equipment failures occur."
        },
        {
          title: "Predictive Risk Awareness",
          description: "Correlates weather radar forecasts with current fuel reserves and heating demand to provide proactive alerts well ahead of incoming polar storms."
        },
        {
          title: "Scenario Analysis",
          description: "Models complex cascading events, evaluating how an unexpected auxiliary generator cut affects habitat temperature distribution over a 72-hour blizzard."
        },
        {
          title: "AI-Assisted Interaction",
          description: "Enables station engineers to query system status in natural language (e.g., 'Project remaining potable water reserves at current melt rate') for instant data-driven answers."
        }
      ]
    },
    {
      id: "system-architecture",
      number: "08",
      title: "SYSTEM ARCHITECTURE",
      tagline: "End-to-end technical engineering foundation.",
      layers: [
        {
          name: "Frontend Layer",
          tech: "React 18 / Tailwind CSS",
          detail: "Component-driven, responsive operational cockpit delivering high-contrast data visualization, spatial twin viewports, and zero-latency state transitions."
        },
        {
          name: "3D Spatial Environment",
          tech: "WebGL / Three.js Engine",
          detail: "Interactive spatial engine rendering station modular architecture, telemetry coordinate nodes, and dynamic visual status indicators."
        },
        {
          name: "Backend Services",
          tech: "Node.js / Express Architecture",
          detail: "High-throughput API endpoints managing sensor stream ingestion, role-based access control, and asynchronous job queuing."
        },
        {
          name: "Data Storage Layer",
          tech: "Hybrid Time-Series & Relational",
          detail: "Optimized time-series database storing continuous sensory telemetry alongside relational schemas for spare parts, cargo manifests, and audit trails."
        },
        {
          name: "AI & Analytics Engine",
          tech: "Predictive Analytics & Anomaly Detection",
          detail: "Lightweight inference models performing anomaly detection, trend forecasting, and scenario simulation calculations."
        },
        {
          name: "Offline / Sync Engine",
          tech: "Edge SQLite & Delta Protocol",
          detail: "Resilient on-station message buffer ensuring reliable store-and-forward telemetry transmission over constrained satellite uplinks."
        }
      ]
    },
    {
      id: "user-experience",
      number: "09",
      title: "USER EXPERIENCE",
      tagline: "Engineered for clarity, contrast, and cognitive focus.",
      principles: [
        {
          title: "Scientific Minimalism",
          description: "Stripped of superficial decorations, the visual hierarchy prioritizes immediate comprehension of vital life-support metrics under high-stress conditions."
        },
        {
          title: "Spatial Navigation",
          description: "Smooth orbital camera controls allow operators to transition effortlessly from station-wide exterior overviews down to individual room sensor clusters."
        },
        {
          title: "Subtle Glassmorphism",
          description: "Refined dark translucent panels and high-contrast typography maintain harmony with AURA's system aesthetic while ensuring extreme data legibility."
        },
        {
          title: "Contextual Telemetry",
          description: "Dynamic sparklines, color-coded status badges, and threshold indicators communicate subsystem state within milliseconds."
        }
      ]
    },
    {
      id: "who-benefits",
      number: "10",
      title: "WHO BENEFITS?",
      tagline: "Empowering every stakeholder across the Antarctic mission.",
      stakeholders: [
        {
          role: "Station Operations Teams",
          benefit: "Provides real-time visibility into vital life support, drastically reducing the need for dangerous outdoor manual inspections during extreme blizzards."
        },
        {
          role: "Technical & Maintenance Crews",
          benefit: "Delivers early mechanical anomaly detection, diagnostic drilldowns, and spare parts tracking to conduct targeted preventative maintenance."
        },
        {
          role: "Station Administrators",
          benefit: "Ensures precise accounting of fuel, potable water, medical supplies, and food caches, avoiding critical shortages during winter isolation."
        },
        {
          role: "Government & NCPOR Leadership",
          benefit: "Enables strategic, unified oversight of both Maitri and Bharati stations directly from national headquarters in Goa and New Delhi."
        }
      ]
    },
    {
      id: "real-world-impact",
      number: "11",
      title: "REAL-WORLD IMPACT",
      tagline: "Tangible benefits for India's polar scientific infrastructure.",
      impacts: [
        {
          title: "Human Safety Enhancement",
          detail: "Safeguards expedition scientists and wintering crew by detecting heating anomalies and toxic gas accumulation before conditions become life-threatening."
        },
        {
          title: "Critical Resource Conservation",
          detail: "Optimizes diesel generator dispatch and heat recovery, trimming fuel burn rates and preserving precious energy reserves through polar night."
        },
        {
          title: "Failure Prevention",
          detail: "Transforms maintenance from reactive firefighting into structured, predictive intervention through proactive what-if simulation testing."
        },
        {
          title: "National Scientific Leadership",
          detail: "Modernizes India's polar station management with cutting-edge digital twin infrastructure, setting a benchmark in international Antarctic operations."
        }
      ]
    },
    {
      id: "development-journey",
      number: "12",
      title: "DEVELOPMENT JOURNEY",
      tagline: "From polar logistics research to functional digital twin.",
      steps: [
        {
          phase: "Phase 1: Research & Discovery",
          detail: "Studied NCPOR operational documentation, Antarctic climate parameters, station blueprints for Maitri and Bharati, and extreme-environment telemetry constraints."
        },
        {
          phase: "Phase 2: System Architecture",
          detail: "Formulated the 12 core operational modules, specified the offline-first store-and-forward protocol, and drafted data schemas for polar telemetry."
        },
        {
          phase: "Phase 3: Spatial UI & 3D Modeling",
          detail: "Engineered the scientific design language, built 3D spatial representations of station modules, and designed high-contrast telemetry panels."
        },
        {
          phase: "Phase 4: Prototype Implementation",
          detail: "Developed the React-based command application, integrated interactive 3D WebGL scenes, simulated sensor pipelines, and built the scenario sandbox."
        },
        {
          phase: "Phase 5: Refinement & Validation",
          detail: "Stress-tested offline synchronization states, polished responsive viewports, recorded video demonstrations, and prepared the open-source repository."
        }
      ]
    },
    {
      id: "future-roadmap",
      number: "13",
      title: "FUTURE ROADMAP",
      tagline: "The evolutionary trajectory of DhruvNetra.",
      items: [
        {
          title: "Live Physical Sensor Integration",
          detail: "Direct connection with deployed LoRaWAN and Modbus hardware sensor arrays across Maitri and Bharati for true live telemetry streaming."
        },
        {
          title: "Satellite Uplink Compression",
          detail: "Ultra-compact binary serialization protocols tailored specifically for micro-bandwidth commercial and ISRO satellite uplinks."
        },
        {
          title: "Deep Predictive AI Models",
          detail: "Advanced machine learning models trained on decades of Antarctic climate records to predict blizzard intensity and structural snow-drift accumulation."
        },
        {
          title: "Supervised Autonomous Agents",
          detail: "Safety-certified AI agents capable of automatically re-routing emergency heating and shedding non-critical loads during severe electrical trips."
        },
        {
          title: "Maitri II & Arctic Twin Expansion",
          detail: "Extending the 3D digital twin platform to support India's planned next-generation Maitri II station and Arctic station Himadri at Ny-Ålesund, Svalbard."
        }
      ]
    },
    {
      id: "the-vision",
      number: "14",
      title: "THE VISION",
      tagline: "A digital window into the most remote operational environments on Earth.",
      quote: "Our vision is to give decision-makers a clearer digital window into one of the most remote operational environments on Earth.",
      summary: "DhruvNetra stands as proof that thoughtful software engineering, spatial digital twins, and offline-first resilience can bridge the vast geographic divide between mainland command and polar outposts—safeguarding human life and empowering scientific discovery at the ends of the Earth."
    }
  ]
};

