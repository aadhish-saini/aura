import React from 'react';
import { Code2, ArrowUpRight } from 'lucide-react';
import { SKILL_LEVELS } from './skillsData';

export default function SkillsLanguages({ languages, onSelectSkill }) {
  return (
    <section id="languages" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              02 — PROGRAMMING LANGUAGES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Programming Languages
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            The foundations behind the systems I build.
          </p>
        </div>

        {/* 6 Language Cards in Clean Compact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => {
            const levelInfo = SKILL_LEVELS[lang.level] || SKILL_LEVELS.exploring;

            return (
              <div
                key={lang.id}
                onClick={() => onSelectSkill(lang)}
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
                    onSelectSkill(lang);
                  }
                }}
                aria-label={`View details for ${lang.name}`}
              >
                <div>
                  {/* Top Bar: Icon, Name & Level Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor: 'rgba(6, 182, 212, 0.08)',
                          borderColor: 'rgba(6, 182, 212, 0.25)',
                        }}
                      >
                        <Code2 size={15} />
                      </div>
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {lang.name}
                      </h3>
                    </div>

                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold shrink-0"
                      style={{
                        color: levelInfo.color,
                        backgroundColor: levelInfo.bgColor,
                        border: `1px solid ${levelInfo.borderColor}`
                      }}
                    >
                      {levelInfo.label}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans line-clamp-2">
                    {lang.description}
                  </p>

                  {/* Bullets: Used For */}
                  <ul className="space-y-1 mb-4">
                    {lang.usedFor.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-400">
                        <span className="text-cyan-400/80 mt-0.5">•</span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Associated Project or Inspector Cue */}
                <div className="pt-3 border-t flex items-center justify-between text-[11px] font-mono text-slate-400" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  {lang.associatedProjects && lang.associatedProjects.length > 0 ? (
                    <span className="text-cyan-400/80 truncate max-w-[180px]">
                      {lang.associatedProjects[0].name}
                    </span>
                  ) : (
                    <span className="text-slate-500">Core Foundation</span>
                  )}
                  <span className="text-slate-500 group-hover:text-cyan-300 transition-colors flex items-center gap-0.5">
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

