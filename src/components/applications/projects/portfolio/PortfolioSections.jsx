import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  Compass, 
  Quote, 
  ExternalLink, 
  Wrench, 
  Rocket, 
  Lightbulb
} from 'lucide-react';

function GithubIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function PortfolioSections({ sections, projectInfo, mode = 'all' }) {
  const {
    theBeginning,
    theProblem,
    theSolution,
    interactiveVisualSystem,
    projectShowcase,
    technologyStack,
    engineeringChallenges,
    developmentApproach,
    whatILearned,
    futurePossibilities,
    theVision
  } = sections;

  const renderIntro = () => (
    <>
      {/* 01 — THE BEGINNING */}
      <section id="the-beginning" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
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
                backgroundColor: 'rgba(16, 185, 129, 0.02)',
                borderColor: 'rgba(16, 185, 129, 0.25)',
              }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
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
                className="mt-6 p-3.5 rounded-xl border text-xs font-mono text-emerald-300 flex items-center gap-2"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderColor: 'rgba(16, 185, 129, 0.3)',
                }}
              >
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                <span>Experience-Driven Portfolio Paradigm</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderDetails = () => (
    <>
      {/* 05 — INTERACTIVE VISUAL SYSTEM */}
      <section id="visual-system" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
                {interactiveVisualSystem.number} — {interactiveVisualSystem.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {interactiveVisualSystem.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {interactiveVisualSystem.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {interactiveVisualSystem.elements.map((elem, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: 'rgba(6, 182, 212, 0.08)',
                        borderColor: 'rgba(6, 182, 212, 0.25)',
                      }}
                    >
                      <Sparkles size={15} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      SYS #{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                    {elem.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {elem.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — PROJECT SHOWCASE */}
      <section id="project-showcase" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              {projectShowcase.number} — {projectShowcase.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {projectShowcase.tagline}
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {projectShowcase.paragraphs.map((p, idx) => (
              <p key={idx}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — TECHNOLOGY STACK */}
      <section id="tech-stack" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
                {technologyStack.number} — {technologyStack.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {technologyStack.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {technologyStack.summary}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {technologyStack.technologies.map((tech) => (
              <div
                key={tech.name}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-cyan-400" />
                      <h3 className="text-base font-bold text-white tracking-tight">
                        {tech.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-950/20 text-cyan-300">
                      CORE
                    </span>
                  </div>

                  <div className="text-xs font-mono text-cyan-300/90 mb-2 font-medium">
                    {tech.role}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tech.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — ENGINEERING CHALLENGES */}
      <section id="engineering-challenges" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
                {engineeringChallenges.number} — {engineeringChallenges.title}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              {engineeringChallenges.tagline}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              {engineeringChallenges.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {engineeringChallenges.challenges.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-400/30"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Wrench size={15} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Engineering Takeaway Box */}
          <div 
            className="p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 text-xs font-mono text-slate-300"
            style={{
              backgroundColor: 'rgba(6, 182, 212, 0.04)',
              borderColor: 'rgba(6, 182, 212, 0.25)',
            }}
          >
            <Lightbulb size={17} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {engineeringChallenges.takeaway}
            </p>
          </div>
        </div>
      </section>

      {/* 09 — DEVELOPMENT APPROACH */}
      <section id="development-approach" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              {developmentApproach.number} — {developmentApproach.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {developmentApproach.tagline}
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
            {developmentApproach.paragraphs.map((p, idx) => (
              <p key={idx}>
                {p}
              </p>
            ))}
          </div>

          {/* Modular Architecture Representation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {developmentApproach.modules.map((mod, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1 block">
                    Part 0{idx + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-white mb-1.5">
                    {mod.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — WHAT I LEARNED */}
      <section id="what-i-learned" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              {whatILearned.number} — {whatILearned.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {whatILearned.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-8">
            {whatILearned.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {whatILearned.skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl border flex items-center gap-3 transition-colors hover:border-cyan-400/30"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <CheckCircle2 size={15} className="text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11 — FUTURE POSSIBILITIES */}
      <section id="future-possibilities" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              {futurePossibilities.number} — {futurePossibilities.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {futurePossibilities.tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed mb-8">
            {futurePossibilities.intro}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {futurePossibilities.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-400/30 flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                      OPPORTUNITY 0{idx + 1}
                    </span>
                    <Rocket size={13} className="text-cyan-400/80" />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — THE VISION */}
      <section id="the-vision" className="py-16 sm:py-20 border-b relative" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border border-cyan-500/25 bg-cyan-950/20 text-cyan-300">
            <Compass size={13} className="text-cyan-400" />
            <span>{theVision.number} — {theVision.title}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-6">
            "{theVision.tagline}"
          </h2>

          {/* Editorial Quote Box */}
          <div 
            className="p-6 sm:p-8 rounded-2xl border text-left mb-6 relative"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
              borderColor: 'rgba(6, 182, 212, 0.3)',
            }}
          >
            <Quote size={28} className="text-cyan-400/40 mb-3" />
            <p className="text-base sm:text-lg text-slate-200 font-serif italic leading-relaxed mb-4">
              "{theVision.quote}"
            </p>
            <div className="text-xs sm:text-sm font-mono text-cyan-300 font-semibold uppercase tracking-wider">
              {theVision.coreStatement}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT INFORMATION — BOTTOM SECTION */}
      {projectInfo && (
        <section id="project-specs" className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
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
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Category</div>
                    <div className="text-sm text-slate-200">{projectInfo.category}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Domain</div>
                    <div className="text-sm text-slate-200">{projectInfo.domain}</div>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Primary Objective</div>
                    <div className="text-sm text-slate-200">{projectInfo.primaryObjective}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Core Technologies</div>
                    <div className="text-sm text-cyan-300 font-mono">{projectInfo.coreTechnologies}</div>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">Repository</div>
                    <div className="text-sm text-slate-200 font-mono">{projectInfo.repository}</div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar: GitHub Link */}
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
                    borderColor: 'rgba(6, 182, 212, 0.3)',
                    color: 'var(--color-text-primary, #ffffff)',
                  }}
                >
                  <GithubIcon size={14} />
                  <span>Open Repository on GitHub</span>
                  <ExternalLink size={12} className="text-slate-400" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );

  if (mode === 'intro') return renderIntro();
  if (mode === 'details') return renderDetails();

  return (
    <div className="space-y-0">
      {renderIntro()}
      {renderDetails()}
    </div>
  );
}
