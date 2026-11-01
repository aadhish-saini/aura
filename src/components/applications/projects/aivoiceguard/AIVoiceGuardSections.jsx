import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Cpu, 
  Lock, 
  Quote, 
  Sparkles, 
  Users, 
  Globe, 
  Compass, 
  Info
} from 'lucide-react';

export default function AIVoiceGuardSections({ sections, projectInfo, mode = 'all' }) {
  const {
    theIdea,
    theProblem,
    ourSolution,
    theDetectionEngine,
    realTimeArchitecture,
    privacyByDesign,
    developmentJourney,
    differentiation,
    beneficiaries,
    realWorldImpact,
    futureRoadmap,
    vision
  } = sections;

  const renderPart1 = () => (
    <>
      {/* 01 — THE IDEA */}
      <section id="the-idea" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {theIdea.number} — {theIdea.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {theIdea.tagline}
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {theIdea.content.map((paragraph, idx) => (
              <p key={idx} className="font-sans">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — THE PROBLEM */}
      <section id="the-problem" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {theProblem.number} — {theProblem.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {theProblem.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            The proliferation of synthetic voice generators poses unprecedented risks across human interactions, financial transactions, and organizational security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {theProblem.threats.map((threat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-red-500/30 group"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <AlertTriangle size={15} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                      {threat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                      {threat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — OUR SOLUTION */}
      <section id="our-solution" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {ourSolution.number} — {ourSolution.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {ourSolution.tagline}
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {ourSolution.content.map((paragraph, idx) => (
              <p key={idx} className="font-sans">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderPart2 = () => (
    <>
      {/* 05 — THE DETECTION ENGINE */}
      <section id="detection-engine-section" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {theDetectionEngine.number} — {theDetectionEngine.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {theDetectionEngine.tagline}
          </h2>
          
          {/* Model Specification Card */}
          <div 
            className="p-5 sm:p-6 rounded-2xl border mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{
              backgroundColor: 'rgba(168, 85, 247, 0.05)',
              borderColor: 'rgba(168, 85, 247, 0.25)',
            }}
          >
            <div>
              <div className="text-[11px] font-mono text-purple-300 uppercase tracking-wider mb-1">
                Transformer Model Architecture
              </div>
              <div className="text-lg sm:text-xl font-bold text-white font-mono flex items-center gap-2">
                <Cpu size={18} className="text-purple-400" />
                <span>{theDetectionEngine.model}</span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg border border-purple-500/20 bg-purple-950/30 text-xs font-mono text-purple-300 self-start sm:self-center">
              {theDetectionEngine.framework}
            </div>
          </div>

          {/* Detection Engine Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {theDetectionEngine.details.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-tight mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                    <span>{item.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — REAL-TIME COMMUNICATION ARCHITECTURE */}
      <section id="communication-architecture" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {realTimeArchitecture.number} — {realTimeArchitecture.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {realTimeArchitecture.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            A synchronized six-layer protocol stack translating continuous telephonic audio into non-intrusive threat intelligence.
          </p>

          <div className="space-y-3">
            {realTimeArchitecture.layers.map((layer, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl border transition-all duration-200 hover:border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-3 sm:w-1/3 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-purple-500/20 bg-purple-950/20 text-purple-300">
                    {layer.layer}
                  </span>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {layer.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 sm:w-2/3 leading-relaxed">
                  {layer.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderPart3 = () => (
    <>
      {/* 08 — PRIVACY BY DESIGN */}
      <section id="privacy-by-design" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {privacyByDesign.number} — {privacyByDesign.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {privacyByDesign.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            Verifying voice authenticity must never require compromising personal communication privacy. AI-Voice Guard operates under strict ephemeral compute principles.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {privacyByDesign.principles.map((principle, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-emerald-500/30 group"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <Lock size={14} />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderPart4 = () => (
    <>
      {/* 10 — DEVELOPMENT JOURNEY */}
      <section id="development-journey" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {developmentJourney.number} — {developmentJourney.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {developmentJourney.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            A methodical evolution from initial speech synthesis vulnerability research to a functional real-time prototype foundation.
          </p>

          {/* Timeline Milestones */}
          <div className="space-y-4 mb-8">
            {developmentJourney.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-3 sm:w-1/3 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-purple-500/20 bg-purple-950/20 text-purple-300">
                    {m.phase}
                  </span>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {m.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 sm:w-2/3 leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Engineering Prototype Note */}
          <div 
            className="p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 text-xs font-mono text-slate-300"
            style={{
              backgroundColor: 'rgba(168, 85, 247, 0.04)',
              borderColor: 'rgba(168, 85, 247, 0.25)',
            }}
          >
            <Info size={16} className="text-purple-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {developmentJourney.engineeringNote}
            </p>
          </div>
        </div>
      </section>

      {/* 11 — WHAT MAKES AI-VOICE GUARD DIFFERENT? */}
      <section id="differentiation" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {differentiation.number} — {differentiation.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {differentiation.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            Traditional audio forensics tools were built for post-incident review of recorded audio files. AI-Voice Guard brings intelligence directly into active conversations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {differentiation.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border transition-all duration-200 hover:border-purple-500/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-purple-400 mb-4 bg-purple-950/20 border-purple-500/30">
                    <Sparkles size={18} />
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — WHO CAN BENEFIT? */}
      <section id="beneficiaries" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {beneficiaries.number} — {beneficiaries.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {beneficiaries.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            From vulnerable personal callers to mission-critical corporate authorization desks, AI-Voice Guard secures critical vocal exchanges.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {beneficiaries.groups.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-500/30"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center justify-center shrink-0">
                    <Users size={14} />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {group.role}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {group.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — REAL-WORLD IMPACT */}
      <section id="real-world-impact" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {realWorldImpact.number} — {realWorldImpact.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {realWorldImpact.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            Establishing tangible societal and enterprise defensive safeguards against synthetic speech abuse.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {realWorldImpact.impacts.map((imp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-500/30"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                    <Globe size={14} />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {imp.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {imp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14 — FUTURE ROADMAP */}
      <section id="future-roadmap" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {futureRoadmap.number} — {futureRoadmap.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {futureRoadmap.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            Strategic engineering initiatives planned to expand teleconferencing platform support, enhance detection precision, and optimize inference throughput.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {futureRoadmap.milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border flex flex-col justify-between transition-all duration-200 hover:border-purple-500/30"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">
                    Phase {idx + 1}
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight mb-2">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {m.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15 — THE VISION */}
      <section id="the-vision" className="py-16 sm:py-20 border-b relative" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border border-purple-500/25 bg-purple-950/20 text-purple-300">
            <Compass size={13} className="text-purple-400" />
            <span>{vision.number} — {vision.title}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            "{vision.tagline}"
          </h2>

          {/* Editorial Quote Box */}
          <div 
            className="p-6 sm:p-8 rounded-2xl border text-left mb-6 relative"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
              borderColor: 'rgba(168, 85, 247, 0.3)',
            }}
          >
            <Quote size={28} className="text-purple-400/40 mb-3" />
            <p className="text-base sm:text-lg text-slate-200 font-serif italic leading-relaxed mb-4">
              "{vision.quote}"
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {vision.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Project Specifications Summary */}
      {projectInfo && (
        <section id="project-specs" className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                SYSTEM ARCHITECTURE SPECIFICATIONS
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
              Technical Specification Matrix
            </h2>

            <div 
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Project</div>
                    <div className="text-sm font-semibold text-white">{projectInfo.project}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Category</div>
                    <div className="text-sm text-slate-200">{projectInfo.category}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Domain</div>
                    <div className="text-sm text-slate-200">{projectInfo.domain}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Objective</div>
                    <div className="text-sm text-slate-200">{projectInfo.objective}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">AI Model</div>
                    <div className="text-sm text-purple-300 font-mono">{projectInfo.model}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Backend Stack</div>
                    <div className="text-sm text-slate-200">{projectInfo.backend}</div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Frontend Stack</div>
                    <div className="text-sm text-slate-200">{projectInfo.frontend}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Audio Processing</div>
                    <div className="text-sm text-slate-200">{projectInfo.audioProcessing}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">AI Framework</div>
                    <div className="text-sm text-slate-200">{projectInfo.aiFramework}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Real-Time Architecture</div>
                    <div className="text-sm text-slate-200">{projectInfo.communicationArchitecture}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Processing Cadence</div>
                    <div className="text-sm text-slate-200">{projectInfo.processingApproach}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Privacy Model</div>
                    <div className="text-sm text-slate-200">{projectInfo.privacyApproach}</div>
                  </div>
                </div>
              </div>

              <div 
                className="p-4 text-center border-t text-xs font-mono text-slate-400"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                {projectInfo.closingLine}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );

  if (mode === 'part1') return renderPart1();
  if (mode === 'part2') return renderPart2();
  if (mode === 'part3') return renderPart3();
  if (mode === 'part4') return renderPart4();

  return (
    <div className="space-y-0">
      {renderPart1()}
      {renderPart2()}
      {renderPart3()}
      {renderPart4()}
    </div>
  );
}
