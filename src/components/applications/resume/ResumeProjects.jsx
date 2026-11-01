import React from 'react';
import { ArrowRight, MonitorCheck } from 'lucide-react';

export default function ResumeProjects({ projects, onOpenProject }) {
  return (
    <section className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Header */}
      <div className="mb-6">
        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
          SELECTED SOFTWARE PROJECTS
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-1">
          Featured Engineering Implementations
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Click any project to open its dedicated technical architectural dossier in the Projects application.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => {
          const isClickable = proj.isClickable;

          return (
            <div
              key={proj.id}
              onClick={() => {
                if (isClickable && onOpenProject && proj.projectId) {
                  onOpenProject(proj.projectId);
                }
              }}
              className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
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
              aria-label={isClickable ? `Open ${proj.name} showcase in Projects` : undefined}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
                    PROJECT {proj.number}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700/60">
                    {proj.category}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                  {proj.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t flex items-center justify-between text-xs font-mono" style={{ borderColor: 'var(--color-border-subtle)' }}>
                {isClickable ? (
                  <>
                    <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
                      Open Project Showcase
                    </span>
                    <span className="inline-flex items-center gap-1 text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight size={13} />
                    </span>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="flex items-center gap-1.5 text-cyan-400/80">
                      <MonitorCheck size={13} />
                      <span>Active Operating System</span>
                    </span>
                    <span className="italic">Host Environment</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

