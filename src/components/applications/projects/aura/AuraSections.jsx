import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Compass, 
  ExternalLink, 
  Wrench, 
  Rocket, 
  Lightbulb,
  Monitor,
  Terminal,
  Smartphone,
  Laptop,
  Layers,
  Cpu,
  ShieldCheck,
  FolderGit2
} from 'lucide-react';

function GithubIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function AuraSections({ sections, projectInfo }) {
  const {
    theBeginning,
    theProblem,
    theSolution,
    desktopExperience,
    applications,
    projectsExplorer,
    interactiveTerminal,
    desktopInteraction,
    responsiveExperience,
    technologyStack,
    engineeringChallenges,
    developmentApproach,
    futureRoadmap,
    whatMakesDifferent,
    theVision
  } = sections;

  return (
    <div className="space-y-0 select-text">
      {/* 01 — THE BEGINNING */}
      <section id="the-beginning" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {theBeginning.number} — {theBeginning.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {theBeginning.tagline}
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {theBeginning.paragraphs.map((paragraph, idx) => (
              <p key={idx} className="font-sans">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 02 & 03 — PROBLEM VS SOLUTION COMPOSITION */}
      <section id="problem-solution" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* 02 The Problem */}
            <div 
              className="p-6 sm:p-7 rounded-3xl border flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.02)',
                borderColor: 'rgba(239, 68, 68, 0.2)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-rose-400 font-mono text-xs tracking-widest uppercase">
                    {theProblem.number} — {theProblem.title}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                  {theProblem.tagline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mb-4">
                  {theProblem.intro}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {theProblem.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <AlertTriangle size={14} className="text-rose-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div 
                className="p-3.5 rounded-xl border text-xs text-slate-300 leading-relaxed font-sans"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(239, 68, 68, 0.2)',
                }}
              >
                {theProblem.conclusion}
              </div>
            </div>

            {/* 03 The Solution */}
            <div 
              className="p-6 sm:p-7 rounded-3xl border flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(168, 85, 247, 0.03)',
                borderColor: 'rgba(168, 85, 247, 0.25)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                    {theSolution.number} — {theSolution.title}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4">
                  {theSolution.tagline}
                </h3>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {theSolution.paragraphs.map((p, idx) => (
                    <p key={idx}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div 
                className="mt-6 p-3.5 rounded-xl border text-xs font-mono text-purple-300 flex items-center gap-2"
                style={{
                  backgroundColor: 'rgba(168, 85, 247, 0.06)',
                  borderColor: 'rgba(168, 85, 247, 0.3)',
                }}
              >
                <CheckCircle2 size={15} className="text-purple-400 shrink-0" />
                <span>Operating System as Portfolio Paradigm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — THE DESKTOP EXPERIENCE */}
      <section id="desktop-experience" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {desktopExperience.number} — {desktopExperience.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {desktopExperience.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {desktopExperience.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {desktopExperience.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: 'rgba(168, 85, 247, 0.08)',
                        borderColor: 'rgba(168, 85, 247, 0.25)',
                      }}
                    >
                      <Monitor size={15} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      OS #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — APPLICATIONS INSIDE AURA */}
      <section id="applications" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {applications.number} — {applications.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {applications.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {applications.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.appsList.map((app, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {app.icon ? (
                      <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.04] p-1.5 shrink-0 flex items-center justify-center">
                        <img 
                          src={app.icon} 
                          alt={app.name} 
                          className="w-full h-full object-contain pointer-events-none select-none"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl border border-purple-500/30 bg-purple-950/20 flex items-center justify-center shrink-0 text-purple-400">
                        <Layers size={18} />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight">
                        {app.name}
                      </h3>
                      <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">
                        {app.role}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {app.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — THE PROJECTS EXPLORER */}
      <section id="projects-explorer" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {projectsExplorer.number} — {projectsExplorer.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              {projectsExplorer.tagline}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
              {projectsExplorer.paragraphs.map((p, idx) => (
                <p key={idx}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projectsExplorer.showcaseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-sky-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {item.icon ? (
                      <div className="w-10 h-10 rounded-xl border border-sky-500/30 bg-sky-950/20 p-1.5 shrink-0 flex items-center justify-center">
                        <img 
                          src={item.icon} 
                          alt={item.title} 
                          className="w-full h-full object-contain pointer-events-none select-none"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl border border-sky-500/30 bg-sky-950/20 flex items-center justify-center shrink-0 text-sky-400">
                        <FolderGit2 size={18} />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider block">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {item.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — THE INTERACTIVE TERMINAL */}
      <section id="interactive-terminal" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {interactiveTerminal.number} — {interactiveTerminal.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {interactiveTerminal.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {interactiveTerminal.intro}
            </p>
          </div>

          {/* Terminal Command Specs Table */}
          <div 
            className="rounded-2xl border overflow-hidden mb-6"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <div className="p-3 border-b flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.02]" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <Terminal size={14} className="text-emerald-400" />
              <span>AURA Command-Line Shell Syntax (10 Core Commands)</span>
            </div>
            <div className="divide-y divide-white/5 font-mono text-xs">
              {interactiveTerminal.terminalSpecs.map((spec, idx) => (
                <div key={idx} className="p-3 sm:px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 hover:bg-white/[0.02]">
                  <span className="text-purple-300 font-bold tracking-wide shrink-0 sm:w-36">
                    $ {spec.cmd}
                  </span>
                  <span className="text-slate-300 sm:text-right font-sans text-xs">
                    {spec.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal Highlights */}
          <div className="space-y-2">
            {interactiveTerminal.features.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — DESKTOP INTERACTION & MULTITASKING */}
      <section id="desktop-interaction" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {desktopInteraction.number} — {desktopInteraction.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              {desktopInteraction.tagline}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
              {desktopInteraction.paragraphs.map((p, idx) => (
                <p key={idx}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {desktopInteraction.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-400/40"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5 flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-400 shrink-0" />
                  <span>{cap.title}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — RESPONSIVE EXPERIENCE */}
      <section id="responsive-experience" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {responsiveExperience.number} — {responsiveExperience.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              {responsiveExperience.tagline}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
              {responsiveExperience.paragraphs.map((p, idx) => (
                <p key={idx}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {responsiveExperience.tiers.map((tier, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-sky-400/40"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {idx === 0 && <Monitor size={16} className="text-sky-400 shrink-0" />}
                  {idx === 1 && <Laptop size={16} className="text-sky-400 shrink-0" />}
                  {idx === 2 && <Monitor size={16} className="text-purple-400 shrink-0" />}
                  {idx === 3 && <Smartphone size={16} className="text-emerald-400 shrink-0" />}
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {tier.device}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {tier.layout}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — TECHNOLOGY STACK */}
      <section id="tech-stack" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {technologyStack.number} — {technologyStack.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {technologyStack.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {technologyStack.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {technologyStack.technologies.map((tech, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                      {tech.category}
                    </span>
                    <Code2 size={14} className="text-purple-400" />
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {tech.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — ENGINEERING CHALLENGES */}
      <section id="engineering-challenges" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {engineeringChallenges.number} — {engineeringChallenges.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {engineeringChallenges.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {engineeringChallenges.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {engineeringChallenges.challenges.map((chal, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-400/40"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Wrench size={15} className="text-purple-400 shrink-0" />
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {chal.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {chal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — DEVELOPMENT APPROACH */}
      <section id="development-approach" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {developmentApproach.number} — {developmentApproach.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {developmentApproach.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {developmentApproach.intro}
            </p>
          </div>

          <div className="space-y-3">
            {developmentApproach.phases.map((ph, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center gap-3 transition-colors hover:border-purple-400/40"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-3 shrink-0 sm:w-60">
                  <span className="w-7 h-7 rounded-lg border border-purple-500/30 bg-purple-950/30 text-purple-400 flex items-center justify-center font-mono text-xs font-semibold">
                    {ph.phase}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    {ph.name}
                  </span>
                </div>
                <div className="text-xs text-slate-300 font-sans flex-1">
                  {ph.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — FUTURE ROADMAP */}
      <section id="future-roadmap" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {futureRoadmap.number} — {futureRoadmap.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {futureRoadmap.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {futureRoadmap.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {futureRoadmap.milestones.map((ms, idx) => {
              const isCompleted = ms.status === 'Completed';
              const isInDev = ms.status === 'In Development';
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                    borderColor: isCompleted 
                      ? 'rgba(16, 185, 129, 0.25)' 
                      : isInDev 
                      ? 'rgba(56, 189, 248, 0.25)' 
                      : 'rgba(168, 85, 247, 0.25)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span 
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        isCompleted 
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                          : isInDev 
                          ? 'border-sky-500/30 bg-sky-500/10 text-sky-400'
                          : 'border-purple-500/30 bg-purple-500/10 text-purple-400'
                      }`}
                    >
                      {ms.status}
                    </span>
                    <Rocket size={14} className={isCompleted ? "text-emerald-400" : isInDev ? "text-sky-400" : "text-purple-400"} />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                    {ms.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {ms.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14 — WHAT MAKES AURA DIFFERENT? */}
      <section id="what-makes-different" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                {whatMakesDifferent.number} — {whatMakesDifferent.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              {whatMakesDifferent.tagline}
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
              {whatMakesDifferent.paragraphs.map((p, idx) => (
                <p key={idx}>
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whatMakesDifferent.pillars.map((pil, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-400/40"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5 flex items-center gap-2">
                  <Lightbulb size={14} className="text-purple-400 shrink-0" />
                  <span>{pil.title}</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15 — VISION */}
      <section id="the-vision" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              {theVision.number} — {theVision.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            {theVision.tagline}
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            {theVision.paragraphs.map((p, idx) => (
              <p key={idx}>
                {p}
              </p>
            ))}
          </div>

          {/* Vision Quote Callout */}
          <div 
            className="p-6 sm:p-8 rounded-3xl border relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(168, 85, 247, 0.04)',
              borderColor: 'rgba(168, 85, 247, 0.25)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
            <p className="text-base sm:text-lg md:text-xl font-serif italic text-purple-200/90 leading-relaxed mb-3">
              "{theVision.quote}"
            </p>
            <div className="text-xs sm:text-sm font-mono text-purple-300 font-semibold uppercase tracking-wider">
              {theVision.coreStatement}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT SPECIFICATIONS MATRIX */}
      {projectInfo && (
        <section id="project-specs" className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
                PROJECT SPECIFICATIONS MATRIX
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-6">
              Project Information
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
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Full Form</div>
                    <div className="text-sm text-slate-200">{projectInfo.fullForm}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Category</div>
                    <div className="text-sm text-slate-200">{projectInfo.category}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Project Type</div>
                    <div className="text-sm text-slate-200">{projectInfo.projectType}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Developer</div>
                    <div className="text-sm text-slate-200">{projectInfo.developer}</div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Primary Objective</div>
                    <div className="text-sm text-slate-200">{projectInfo.primaryObjective}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Frontend Technologies</div>
                    <div className="text-sm text-purple-300 font-mono">{projectInfo.frontend}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Build Tool</div>
                    <div className="text-sm text-sky-300 font-mono">{projectInfo.buildTool}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Cloud Hosting</div>
                    <div className="text-sm text-emerald-300 font-mono">{projectInfo.hosting}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Repository</div>
                    <div className="text-sm text-slate-200 font-mono">{projectInfo.repository}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar: GitHub Link & Closing Verification Decal */}
              <div 
                className="p-5 border-t flex flex-wrap items-center justify-between gap-4"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <a
                  href={projectInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-medium transition-all duration-150 hover:bg-white/10 hover:text-white cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
                    borderColor: 'rgba(168, 85, 247, 0.35)',
                    color: 'var(--color-text-primary, #ffffff)',
                  }}
                >
                  <GithubIcon size={14} />
                  <span>Open Repository on GitHub</span>
                  <ExternalLink size={12} className="text-slate-400" />
                </a>

                <div className="text-[11px] font-mono text-purple-300/80">
                  {projectInfo.closingLine}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

