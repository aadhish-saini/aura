import React from 'react';
import { Cpu, ArrowUpRight } from 'lucide-react';
import { SKILL_LEVELS } from './skillsData';

export default function SkillsAITech({ aiTechnologies, onSelectSkill }) {
  const { applied = [], exploring = [] } = aiTechnologies || {};

  return (
    <section id="ai-technologies" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-violet-400 font-mono text-xs tracking-widest uppercase">
              04 — AI & EMERGING TECHNOLOGIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            AI & Emerging Technologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-2xl">
            My exploration of modern machine intelligence — from integrating deep learning models into working backend runtimes to studying autonomous agents and foundation models.
          </p>
        </div>

        {/* Group 1: Applied / Practical Exposure */}
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-300 font-semibold">
              Applied & Practical Exposure
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              (Integrated into real projects)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {applied.map((item) => {
              const levelInfo = SKILL_LEVELS[item.level] || SKILL_LEVELS.developing;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectSkill({ ...item, category: 'AI & Machine Learning' })}
                  className="p-5 rounded-2xl border transition-all duration-200 hover:border-violet-500/40 hover:-translate-y-0.5 group cursor-pointer flex flex-col justify-between"
                  style={{
                    backgroundColor: 'rgba(15, 18, 30, 0.65)',
                    borderColor: 'rgba(139, 92, 246, 0.18)',
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectSkill({ ...item, category: 'AI & Machine Learning' });
                    }
                  }}
                  aria-label={`View details for ${item.name}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-violet-950/40 border border-violet-500/30 flex items-center justify-center text-violet-300 group-hover:scale-105 transition-transform">
                          <Cpu size={16} />
                        </div>
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {item.name}
                        </h4>
                      </div>

                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold shrink-0"
                        style={{
                          color: levelInfo.color,
                          backgroundColor: levelInfo.bgColor,
                          border: `1px solid ${levelInfo.borderColor}`,
                        }}
                      >
                        {item.levelDisplay || levelInfo.label}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3 font-sans">
                      {item.description}
                    </p>

                    {item.details && (
                      <p className="text-[11px] text-slate-400 font-sans border-l-2 border-violet-500/40 pl-2.5 mb-3">
                        {item.details}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    {item.associatedProjects && item.associatedProjects.length > 0 ? (
                      <span className="text-violet-300/90 truncate">
                        Used in {item.associatedProjects[0].name}
                      </span>
                    ) : (
                      <span className="text-slate-500">Applied Knowledge</span>
                    )}

                    <span className="text-slate-500 group-hover:text-violet-300 transition-colors flex items-center gap-0.5">
                      <span>Inspect</span>
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Group 2: Currently Exploring */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-violet-300 font-semibold">
              Currently Exploring & Active Study
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              (Theoretical study & active prototyping)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {exploring.map((item) => {
              const levelInfo = SKILL_LEVELS[item.level] || SKILL_LEVELS.exploring;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectSkill({ ...item, category: 'AI Frontier & Research' })}
                  className="p-4 rounded-xl border transition-all duration-200 hover:border-violet-500/30 group cursor-pointer flex flex-col justify-between"
                  style={{
                    backgroundColor: 'rgba(12, 16, 26, 0.5)',
                    borderColor: 'rgba(255, 255, 255, 0.05)',
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectSkill({ ...item, category: 'AI Frontier & Research' });
                    }
                  }}
                  aria-label={`View details for ${item.name}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
                        {item.name}
                      </h4>
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono font-medium shrink-0"
                        style={{
                          color: levelInfo.color,
                          backgroundColor: levelInfo.bgColor,
                          border: `1px solid ${levelInfo.borderColor}`,
                        }}
                      >
                        {levelInfo.label}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 leading-relaxed font-sans line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>Study Area</span>
                    <span className="group-hover:text-violet-300 transition-colors flex items-center gap-0.5">
                      <span>Inspect</span>
                      <ArrowUpRight size={10} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

