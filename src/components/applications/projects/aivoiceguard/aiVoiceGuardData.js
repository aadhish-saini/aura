/**
 * AI-Voice Guard Project Configuration and Complete Editorial Content
 * An AI-Powered Voice Deepfake Detection & Real-Time Communication Security System
 */

export const AI_VOICE_GUARD_DATA = {
  hero: {
    title: "AI-VOICE GUARD",
    tagline: "Detecting the voices you cannot trust.",
    subtitle: "An AI-Powered Voice Deepfake Detection & Real-Time Communication Security System",
    introduction: "The rapid democratization of generative AI and neural voice synthesis has made acoustic cloning alarmingly accessible. With mere seconds of reference audio, modern synthesis engines can replicate the cadence, timbre, and emotional inflections of any individual—challenging interpersonal trust, telephonic verification, and corporate authorization. AI-Voice Guard was created to serve as an intelligent defensive shield, analyzing conversational audio streams to distinguish authentic human speech from synthetic facsimiles.",
    metadata: [
      "AI Security",
      "Deepfake Detection",
      "VoIP Security",
      "Machine Learning",
      "Real-Time Analysis"
    ],
    githubUrl: "https://github.com/aadhish-saini/AI-Voice-Guard",
    repoName: "aadhish-saini/AI-Voice-Guard",
    iconImage: "/projects-icons/ai-voice-guard-icon.png"
  },

  sections: {
    theIdea: {
      number: "01",
      title: "THE IDEA",
      tagline: "What if the voice on the other side wasn't real?",
      content: [
        "For centuries, the human voice has served as a fundamental anchor of identity, trust, and intimacy. A familiar voice on a telephone line was once all the verification needed to establish authenticity. In the era of modern generative intelligence, however, that biological assumption has collapsed.",
        "Recent breakthroughs in diffusion models, neural vocoders, and zero-shot voice cloning allow artificial speech to be generated in real time with astonishing fidelity. Anyone with access to consumer GPUs and a short audio clip from social media can synthesize convincing speech in another person's likeness.",
        "AI-Voice Guard was conceptualized around a singular question: In a world where hearing can no longer be believing, how do we give individuals and organizations the technological capability to question vocal authenticity in real time?"
      ]
    },

    theProblem: {
      number: "02",
      title: "THE PROBLEM",
      tagline: "Trust is becoming harder to verify.",
      threats: [
        {
          title: "Voice Impersonation",
          description: "Attackers can clone executive, familial, or colleague voices using minimal sample audio, defeating conventional human conversational vigilance."
        },
        {
          title: "AI-Generated Audio",
          description: "Synthetic speech engines now produce natural micro-tremors, breathing pauses, and emotional nuances that easily deceive untrained human ears."
        },
        {
          title: "Social Engineering Attacks",
          description: "Malicious actors exploit synthetic speech for fraudulent emergency fund transfers, CEO impersonation schemes, and unauthorized credential resets."
        },
        {
          title: "Lack of Real-Time Awareness",
          description: "Existing media forensics tools operate exclusively offline on pre-recorded files, providing zero real-time situational awareness during active calls."
        },
        {
          title: "Growing Digital Threat Surface",
          description: "As voice communication expands across distributed remote workplaces, customer support channels, and VoIP infrastructure, the absence of active verification poses systemic risk."
        }
      ]
    },

    ourSolution: {
      number: "03",
      title: "OUR SOLUTION",
      tagline: "An intelligent security layer for voice communication.",
      content: [
        "AI-Voice Guard introduces an active, non-intrusive security layer engineered specifically for live conversational environments.",
        "Rather than treating audio as an uninspected continuous pipe, the system slices incoming speech into short, sequential chunks. Each chunk is preprocessed, normalized, and evaluated through a specialized deep learning transformer to detect acoustic synthesis anomalies.",
        "A rolling risk assessment engine monitors prediction trends across consecutive chunks, translating raw probabilities into clear, color-coded security alerts in the user interface—protecting the conversation without interrupting natural dialogue."
      ]
    },

    theDetectionEngine: {
      number: "05",
      title: "THE DETECTION ENGINE",
      tagline: "AI at the centre of voice security.",
      model: "Hemgg/Deepfake-audio-detection",
      framework: "Hugging Face Transformers / PyTorch",
      details: [
        {
          title: "Audio-Level Detection",
          description: "Evaluates short temporal audio chunks (1–3 seconds) to detect acoustic anomalies, spectral inconsistencies, and neural vocoder synthesis artifacts that evade human perception."
        },
        {
          title: "Session-Level Risk Evaluation",
          description: "Maintains a sliding temporal memory across consecutive predictions, preventing momentary audio distortion from triggering false alarms and establishing genuine call-level trust trends."
        },
        {
          title: "Probabilistic Assessment Disclaimer",
          description: "Model outputs represent probabilistic risk scores and authenticity estimates rather than mathematical proof. Acoustic quality, background noise, and VoIP codecs are accounted for in the rolling risk calculation."
        }
      ]
    },

    realTimeArchitecture: {
      number: "06",
      title: "REAL-TIME COMMUNICATION ARCHITECTURE",
      tagline: "Security designed around the conversation.",
      layers: [
        {
          layer: "Layer 01",
          name: "WebRTC Audio Layer",
          detail: "Captures incoming conversational audio streams with ultra-low latency, tapping into active peer connections via Web Audio API nodes without disrupting audio playback."
        },
        {
          layer: "Layer 02",
          name: "Audio Processing Layer",
          detail: "Asynchronous client-side buffer manager chunking continuous speech into 1–3 second segments, standardizing sample rates and channel allocations."
        },
        {
          layer: "Layer 03",
          name: "WebSocket Communication Layer",
          detail: "Full-duplex, low-overhead event pipeline transporting binary audio payloads from client to backend server and streaming inference results back in real time."
        },
        {
          layer: "Layer 04",
          name: "AI Inference Layer",
          detail: "FastAPI server hosting the transformer model pipeline, executing rapid forward passes on tensor batches with minimal GPU/CPU inference overhead."
        },
        {
          layer: "Layer 05",
          name: "Rolling Risk Engine",
          detail: "Algorithmic state machine tracking rolling average confidence, confidence variance, and trigger thresholds to smooth out transient acoustic outliers."
        },
        {
          layer: "Layer 06",
          name: "Frontend Warning Layer",
          detail: "Reactive interface elements presenting non-intrusive visual badges (Authentic, Caution, High Risk) and risk meter gauges directly within the call viewport."
        }
      ]
    },

    privacyByDesign: {
      number: "08",
      title: "PRIVACY BY DESIGN",
      tagline: "Security should not come at the cost of privacy.",
      principles: [
        {
          title: "Transient Audio Processing",
          description: "Incoming audio chunks reside in volatile system memory only for the brief duration required for tensor preprocessing and inference evaluation."
        },
        {
          title: "Immediate Raw Audio Discarding",
          description: "The moment model classification concludes, raw audio buffers are purged completely. No audio recording or permanent voice file is written to storage."
        },
        {
          title: "Result-Based Storage",
          description: "Only non-reversible operational metadata—such as timestamp, risk score, chunk sequence ID, and confidence tier—is preserved for audit purposes."
        },
        {
          title: "Controlled Communication",
          description: "Data transmission occurs over encrypted WebSockets with localized authentication boundaries, preventing unauthorized eavesdropping on telemetry."
        },
        {
          title: "Privacy Objective",
          description: "To defend users against vocal deception while strictly safeguarding the confidentiality of their private and business conversations."
        }
      ]
    },

    developmentJourney: {
      number: "10",
      title: "DEVELOPMENT JOURNEY",
      tagline: "From an AI security idea to a functional prototype foundation.",
      milestones: [
        {
          phase: "Stage 1",
          title: "Research & Problem Understanding",
          detail: "Studied state-of-the-art neural speech synthesis algorithms, voice cloning toolkits, and social engineering attack methodologies across telephonic channels."
        },
        {
          phase: "Stage 2",
          title: "Model Exploration & Selection",
          detail: "Benchmarked open-source audio deepfake detection classifiers on Hugging Face, evaluating Hemgg/Deepfake-audio-detection for latency, accuracy, and resource efficiency."
        },
        {
          phase: "Stage 3",
          title: "Backend Development",
          detail: "Built the asynchronous Python and FastAPI backend, architecting REST endpoints, WebSocket listeners, and thread-safe transformer inference runtimes."
        },
        {
          phase: "Stage 4",
          title: "Audio Detection Pipeline",
          detail: "Engineered Librosa-based preprocessing modules for downmixing, 16kHz resampling, and sliding-window chunking across dynamic audio streams."
        },
        {
          phase: "Stage 5",
          title: "Real-Time Architecture Planning",
          detail: "Designed the WebRTC audio capture interface, bidirectional WebSocket protocols, and rolling risk scoring logic to dampen single-chunk prediction noise."
        },
        {
          phase: "Stage 6",
          title: "Frontend Development",
          detail: "Created the responsive React and Tailwind interface, call session dashboard, audio waveform visualizations, and real-time security warning indicators."
        }
      ],
      engineeringNote: "Important Distinction: AI-Voice Guard was architected and implemented as a functional prototype foundation. The core audio chunking, model inference, and risk scoring pipelines were demonstrated and validated. Complete live communication gateway integration and enterprise-scale VoIP deployment remain areas for ongoing evolution."
    },

    differentiation: {
      number: "11",
      title: "WHAT MAKES AI-VOICE GUARD DIFFERENT?",
      tagline: "Detection is only one part of the solution.",
      pillars: [
        {
          title: "AI-Based Voice Analysis",
          description: "Bypasses superficial audio metadata to inspect microscopic acoustic anomalies, phase inconsistencies, and vocoder artifacts intrinsic to synthesized audio."
        },
        {
          title: "Communication-Oriented Detection",
          description: "Purpose-built for active conversational flows rather than static post-call file forensics, utilizing rolling temporal scoring to maintain context across speech."
        },
        {
          title: "Privacy-Conscious Processing",
          description: "Upholds conversation confidentiality by design through ephemeral memory buffers, zero permanent raw audio storage, and result-only audit logging."
        }
      ]
    },

    beneficiaries: {
      number: "12",
      title: "WHO CAN BENEFIT?",
      tagline: "Designed for a world where voices can be imitated.",
      groups: [
        {
          role: "Everyday Communication Users",
          benefit: "Protects family members and individuals from predatory voice cloning emergencies, fake hostage calls, and telephonic extortion schemes."
        },
        {
          role: "Businesses & Organizations",
          benefit: "Safeguards executive communications, sensitive commercial discussions, and verbal wire transfer authorizations against sophisticated CEO fraud."
        },
        {
          role: "Financial & Customer Support Teams",
          benefit: "Provides call centers and banking desks with real-time suspicion scoring on inbound caller audio without adding frustrating interrogation steps."
        },
        {
          role: "Remote Work Environments",
          benefit: "Empowers distributed engineering and management teams with continuous confidence that teleconferencing participants are genuine."
        },
        {
          role: "Security Researchers & Developers",
          benefit: "Provides an extensible open-source baseline for benchmarking new synthetic speech detection models in live communication environments."
        }
      ]
    },

    realWorldImpact: {
      number: "13",
      title: "REAL-WORLD IMPACT",
      tagline: "Making digital voices more accountable.",
      impacts: [
        {
          title: "Restoring Conversational Trust",
          description: "Combats the erosion of trust in digital telephony by giving users an impartial technological ally during uncertain conversations."
        },
        {
          title: "Mitigating Financial Fraud",
          description: "Reduces losses from social engineering and voice clone scams by prompting operators to pause and verify through secondary out-of-band channels."
        },
        {
          title: "Fostering Critical Awareness",
          description: "Cultivates a security mindset around voice authenticity, helping society adapt to the reality of generative synthetic media."
        },
        {
          title: "Open Security Innovation",
          description: "Contributes open-source architecture to the cybersecurity community, ensuring defensive AI tools evolve alongside generative cloning tech."
        }
      ]
    },

    futureRoadmap: {
      number: "14",
      title: "FUTURE ROADMAP",
      tagline: "Building towards a more intelligent voice security ecosystem.",
      milestones: [
        {
          title: "Complete Live WebRTC Integration",
          detail: "Native media gateway plugins enabling transparent call interception and automated chunk analysis on consumer teleconferencing platforms."
        },
        {
          title: "Advanced Risk Calibration",
          detail: "Environment-adaptive baseline calibration that tunes sensitivity dynamically for noisy rooms, headsets, and cellular compression artifacts."
        },
        {
          title: "Improved Detection Models",
          detail: "Multi-model ensemble architectures combining spectral transformer embeddings with prosodic feature and breathing pattern classification."
        },
        {
          title: "Advanced Audio Analysis",
          detail: "Background acoustics cross-correlation to detect whether both speakers' room reverberations match the reported physical calling environment."
        },
        {
          title: "Secure Call History",
          detail: "Cryptographically signed session audit ledgers providing immutable proof of authenticity scores for corporate compliance investigations."
        },
        {
          title: "Improved User Alerts",
          detail: "Multi-modal alert cues including gentle haptic pulses, subtle audio earcons, and peripheral HUD banners during high-risk detection spikes."
        },
        {
          title: "Expanded Communication Support",
          detail: "Chrome browser extension and SIP softphone gateway adapters to support Zoom, Microsoft Teams, Discord, and PBX telephony."
        },
        {
          title: "Performance Optimization",
          detail: "Model quantization via ONNX Runtime and TensorRT to slash inference latency below 400ms on commodity CPU and edge hardware."
        }
      ]
    },

    vision: {
      number: "15",
      title: "THE VISION",
      tagline: "Because hearing a familiar voice shouldn't mean trusting it blindly.",
      quote: "We cannot always trust what we hear. But we can build technology that helps us question it intelligently.",
      summary: "AI-Voice Guard envisions a digital communication landscape where generative speech tools cannot be weaponized without resistance—where voice security is transparent, privacy is respected, and authenticity is intelligently verified."
    }
  },

  // 04 — HOW IT WORKS Pipeline Stages
  pipeline: [
    {
      stage: "01",
      name: "Audio Acquisition",
      badge: "WebRTC Stream",
      description: "Captures incoming conversational audio through WebRTC peer connections or browser microphone media streams using Web Audio API nodes."
    },
    {
      stage: "02",
      name: "Audio Chunking",
      badge: "1–3s Buffer Window",
      description: "Continuously buffers and slices the incoming audio stream into standard 1–3 second temporal chunks, balancing rapid detection latency with sufficient acoustic context."
    },
    {
      stage: "03",
      name: "Audio Preprocessing",
      badge: "Librosa Engine",
      description: "Converts multichannel audio to mono, normalizes peak amplitude, and resamples the buffer to 16kHz to match transformer input specifications."
    },
    {
      stage: "04",
      name: "Deepfake Detection",
      badge: "Transformer Inference",
      description: "Executes model inference using the Hemgg/Deepfake-audio-detection classifier, generating raw probability scores across synthetic vs. authentic classes."
    },
    {
      stage: "05",
      name: "Rolling Risk Assessment",
      badge: "Temporal Scoring",
      description: "Aggregates prediction outputs across a sliding window of recent chunks, filtering out momentary acoustic anomalies to compute a stable session risk score."
    },
    {
      stage: "06",
      name: "User Warning",
      badge: "Reactive UI",
      description: "Renders real-time visual status badges (Authentic, Suspicious, High Risk) and risk meter gauges, providing immediate clarity without interrupting the call."
    }
  ],

  // 07 — CORE SYSTEM COMPONENTS
  components: [
    {
      id: "voice-interface",
      index: "01",
      name: "Voice Communication Interface",
      domain: "Client HUD",
      summary: "Clean, responsive calling console providing in-call controls (mute, speaker, end call), session duration, and integrated security status indicators."
    },
    {
      id: "audio-engine",
      index: "02",
      name: "Audio Processing Engine",
      domain: "Signal Pipeline",
      summary: "Asynchronous stream processor managing chunk boundaries, circular audio buffer rings, amplitude normalization, and 16kHz resampling via Librosa."
    },
    {
      id: "detection-engine",
      index: "03",
      name: "Deepfake Detection Engine",
      domain: "AI Model",
      summary: "Dedicated machine learning inference pipeline hosting the Hemgg/Deepfake-audio-detection transformer model fine-tuned for synthetic audio classification."
    },
    {
      id: "risk-engine",
      index: "04",
      name: "Risk Assessment Engine",
      domain: "Scoring Logic",
      summary: "Temporal state machine tracking moving average risk across consecutive chunks to dampen transient anomalies and compute reliable authenticity trends."
    },
    {
      id: "websocket-comm",
      index: "05",
      name: "WebSocket Communication",
      domain: "Event Transport",
      summary: "Low-overhead bidirectional communication bus managing real-time audio chunk transmission from client to server and instantaneous score returns."
    },
    {
      id: "session-mgmt",
      index: "06",
      name: "Call & Session Management",
      domain: "State Control",
      summary: "Manages cryptographic call identifiers, participant metadata, connection negotiation, and state teardown across active communication channels."
    },
    {
      id: "alert-interface",
      index: "07",
      name: "Security & Alert Interface",
      domain: "User Feedback",
      summary: "Visual warning module displaying color-coded threat levels, suspicion indicators, and guidance recommendations when deepfake probabilities spike."
    },
    {
      id: "call-records",
      index: "08",
      name: "Call History & Records",
      domain: "Audit Logging",
      summary: "Diagnostic logging engine recording chronological risk events, aggregate call confidence scores, and session metadata for post-call security audits."
    }
  ],

  // 09 — TECHNOLOGY STACK
  techStack: [
    {
      category: "Frontend",
      technologies: [
        { name: "React 18", role: "Component Architecture" },
        { name: "Vite", role: "Build Tooling & Dev Server" },
        { name: "JavaScript (ESNext)", role: "Client Application Logic" },
        { name: "Tailwind CSS", role: "Responsive Interface Styling" }
      ]
    },
    {
      category: "Backend",
      technologies: [
        { name: "Python 3.11+", role: "Core Runtime" },
        { name: "FastAPI", role: "Asynchronous ASGI Framework" },
        { name: "RESTful API", role: "Service Endpoints & Telemetry" }
      ]
    },
    {
      category: "Artificial Intelligence",
      technologies: [
        { name: "Hugging Face Transformers", role: "Model Orchestration" },
        { name: "Hemgg/Deepfake-audio-detection", role: "Classification Model" },
        { name: "PyTorch Inference", role: "Tensor Computations" }
      ]
    },
    {
      category: "Audio Processing",
      technologies: [
        { name: "Librosa", role: "Feature Extraction & Resampling" },
        { name: "Chunk-Based Processing", role: "1–3s Sliding Buffer" },
        { name: "Mono Conversion", role: "Audio Channel Downmixing" },
        { name: "16kHz Resampling", role: "Acoustic Normalization" }
      ]
    },
    {
      category: "Real-Time Communication",
      technologies: [
        { name: "WebRTC", role: "Peer-to-Peer Media Streams" },
        { name: "WebSockets", role: "Low-Latency Duplex Events" },
        { name: "Web Audio API", role: "In-Browser Stream Capture" }
      ]
    },
    {
      category: "Data & Session Management",
      technologies: [
        { name: "Session Modules", role: "Call State & Lifecycle" },
        { name: "Optional Supabase", role: "Metadata & Audit Logs" }
      ]
    }
  ],

  // Project Information Summary
  projectInfo: {
    project: "AI-Voice Guard",
    category: "Artificial Intelligence & Cybersecurity",
    domain: "Audio Deepfake Detection",
    objective: "AI-Powered Voice Authenticity Assessment",
    model: "Hemgg/Deepfake-audio-detection",
    backend: "Python, FastAPI",
    frontend: "React, Vite",
    audioProcessing: "Librosa",
    aiFramework: "Hugging Face Transformers",
    communicationArchitecture: "WebRTC, WebSockets",
    optionalDataLayer: "Supabase",
    processingApproach: "Chunk-Based Audio Analysis (1–3s)",
    privacyApproach: "Transient Audio Processing & Result-Based Storage",
    closingLine: "Built to make digital voice communication more trustworthy in the age of generative AI."
  }
};

