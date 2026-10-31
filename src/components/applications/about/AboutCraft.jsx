import React from 'react';

const CRAFT_DOMAINS = [
  {
    numeral: '01',
    title: 'Web & Software Development',
    accentColor: 'var(--color-status-dot)',
    tag: 'SYSTEMS & INTERFACES',
    description:
      'Building interactive interfaces, responsive applications, and complete digital experiences with a focus on functionality and thoughtful design.',
    indicator: '●'
  },
  {
    numeral: '02',
    title: 'Artificial Intelligence',
    accentColor: 'var(--color-accent-violet)',
    tag: 'AGENTS & INTELLIGENCE',
    description:
      'Exploring Python-based AI development, intelligent agents, LLM applications, and automation to understand how software can become more intelligent and capable.',
    indicator: '◆'
  },
  {
    numeral: '03',
    title: 'Problem-Solving & Innovation',
    accentColor: '#10b981',
    tag: 'PROTOTYPING & IMPACT',
    description:
      'Taking real-world problems, researching possible solutions, and transforming concepts into working prototypes through experimentation and collaboration.',
    indicator: '▲'
  }
];

export default function AboutCraft() {
  return (
    <section id="story-section-03" className="about-section py-14 md:py-20 px-6 md:px-12 border-b border-[var(--color-border-subtle)]">
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
        {/* Chapter Header */}
        <div className="mb-10">
          <div className="chapter-numeral mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
            <span>03 — WHAT I BUILD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-1">
            Turning ideas into experiences.
          </h2>
          <p className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
            DOMAINS // TECHNICAL & CREATIVE DISCIPLINES
          </p>
        </div>

        {/* 3 Distinct Editorial Content Areas across available width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {CRAFT_DOMAINS.map((domain) => (
            <div
              key={domain.numeral}
              className="domain-panel flex flex-col justify-between"
            >
              <div>
                {/* Domain Header Label */}
                <div className="flex items-center justify-between mb-4 text-[10px] font-mono">
                  <span className="font-bold tracking-wider" style={{ color: domain.accentColor }}>
                    {domain.indicator} {domain.numeral}
                  </span>
                  <span className="text-[var(--color-text-muted)] tracking-widest uppercase">
                    {domain.tag}
                  </span>
                </div>

                {/* Domain Title */}
                <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text-primary)] mb-3">
                  {domain.title}
                </h3>

                {/* Domain Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {domain.description}
                </p>
              </div>

              {/* Minimal Accent Base */}
              <div className="pt-6 mt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                <span>FOCUS AREA</span>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.accentColor }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
