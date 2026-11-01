import React from 'react';
import { ArrowRight, MonitorCheck, Radio } from 'lucide-react';

export default function SkillsInPractice({ projects, onOpenProject }) {
  return (
    <section id="skills-in-practice" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              06 — SKILLS IN PRACTICE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Skills in Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            Where individual languages, frameworks, and engineering concepts come together in real software projects.
          </p>
        </div>

        {/* 4 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => {
            const isClickable = proj.isClickable;

            return (
              <div
                key={proj.id}
                className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isClickable
                    ? 'hover:border-cyan-500/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.1)] group cursor-pointer'
                    : 'opacity-95'
                }`}
                style={{
                  backgroundColor: isClickable
                    ? 'rgba(15, 23, 42, 0.45)'
                    : 'rgba(10, 15, 26, 0.35)',
                  borderColor: isClickable
                    ? 'rgba(56, 189, 248, 0.18)'
                    : 'rgba(255, 255, 255, 0.07)',
                }}
                onClick={() => {
                  if (isClickable && onOpenProject && proj.projectId) {
                    onOpenProject(proj.projectId);
                  }
                }}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    if (onOpenProject && proj.projectId) {
                      onOpenProject(proj.projectId);
                    }
                  }
                }}
                aria-label={isClickable ? `Open ${proj.name} project details` : undefined}
              >
                <div>
                  {/* Top Bar: Number, Category & Name */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
                      PROJECT {proj.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                    {proj.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 font-sans">
                    {proj.description}
                  </p>

                  {/* Note for AI-Voice Guard */}
                  {proj.note && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-[11px] font-sans mb-4 flex items-start gap-2">
                      <Radio size={14} className="shrink-0 mt-0.5 text-amber-400" />
                      <span>{proj.note}</span>
                    </div>
                  )}

                  {/* Skills Applied Tags */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                      Key Capabilities Applied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/80 border border-slate-800 text-slate-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  {isClickable ? (
                    <>
                      <span className="font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
                        Explore Full Architecture
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </span>
                    </>
                  ) : (
                    <div className="w-full flex items-center justify-between text-slate-500 font-mono text-[11px]">
                      <span className="flex items-center gap-1.5 text-cyan-400/80">
                        <MonitorCheck size={13} />
                        <span>Active Operating System</span>
                      </span>
                      <span className="text-[10px] italic">Informational Entry</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

