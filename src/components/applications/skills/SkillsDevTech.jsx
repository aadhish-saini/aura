import React from 'react';
import { Layers, Layout, Box, Sparkles, ArrowUpRight } from 'lucide-react';
import { SKILL_LEVELS } from './skillsData';

const TECH_ICONS = {
  react: Layout,
  'frontend-engineering': Layers,
  threejs: Box,
  gsap: Sparkles,
};

export default function SkillsDevTech({ technologies, onSelectSkill }) {
  return (
    <section id="development" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              03 — DEVELOPMENT TECHNOLOGIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Development Technologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            The libraries, runtimes, and engineering disciplines I use to craft responsive digital experiences.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {technologies.map((tech) => {
            const levelInfo = SKILL_LEVELS[tech.level] || SKILL_LEVELS.developing;
            const IconComponent = TECH_ICONS[tech.id] || Layout;

            return (
              <div
                key={tech.id}
                onClick={() => onSelectSkill(tech)}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-500/40 hover:-translate-y-0.5 group cursor-pointer flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectSkill(tech);
                  }
                }}
                aria-label={`View details for ${tech.name}`}
              >
                <div>
                  {/* Card Top: Icon, Name, Category & Level */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: 'rgba(6, 182, 212, 0.08)',
                          borderColor: 'rgba(6, 182, 212, 0.25)',
                        }}
                      >
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight leading-snug">
                          {tech.name}
                        </h3>
                        <span className="text-[11px] font-mono text-slate-400">
                          {tech.category}
                        </span>
                      </div>
                    </div>

                    <span
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold shrink-0"
                      style={{
                        color: levelInfo.color,
                        backgroundColor: levelInfo.bgColor,
                        border: `1px solid ${levelInfo.borderColor}`,
                      }}
                    >
                      {tech.levelDisplay || levelInfo.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                    {tech.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                      Focus Areas & Application:
                    </span>
                    <ul className="space-y-1">
                      {tech.usedFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-400">
                          <span className="text-cyan-400/80 mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer: Applied In */}
                <div
                  className="pt-3 border-t flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-slate-500 text-[10px]">Applied in:</span>
                    {tech.projects && tech.projects.map((proj) => (
                      <span
                        key={proj.id}
                        className="px-1.5 py-0.5 rounded bg-slate-800/60 border border-slate-700/60 text-slate-300 text-[10px]"
                      >
                        {proj.name}
                      </span>
                    ))}
                  </div>

                  <span className="text-slate-500 group-hover:text-cyan-300 transition-colors flex items-center gap-0.5 shrink-0 ml-auto">
                    <span>Inspect</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
