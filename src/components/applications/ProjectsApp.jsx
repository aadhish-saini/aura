import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import { FolderGit2, ExternalLink, ArrowLeft, Layers, CheckCircle2 } from 'lucide-react';

export default function ProjectsApp() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const selectedProject = PORTFOLIO_DATA.projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        {selectedProject ? (
          /* Project Detail View */
          <div className="flex flex-col gap-4 animate-in fade-in duration-200">
            <button
              type="button"
              onClick={() => setSelectedProjectId(null)}
              className="self-start px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 cursor-pointer transition-all hover:brightness-110"
              style={{
                backgroundColor: 'var(--color-btn-default-bg)',
                borderColor: 'var(--color-border-default)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <ArrowLeft size={13} />
              <span>Back to Projects Index</span>
            </button>

            <div 
              className="p-5 rounded-xl border"
              style={{
                backgroundColor: 'var(--color-btn-default-bg)',
                borderColor: 'var(--color-border-strong)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div>
                  <span 
                    className="text-[10px] font-mono tracking-wider uppercase font-semibold"
                    style={{ color: 'var(--color-status-dot)' }}
                  >
                    {selectedProject.category}
                  </span>
                  <h3 className="text-xl font-bold mt-0.5 text-white">
                    {selectedProject.title}
                  </h3>
                </div>
                <span 
                  className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border"
                  style={{
                    backgroundColor: 'var(--color-badge-bg)',
                    borderColor: 'var(--color-btn-accent-border)',
                    color: 'var(--color-status-dot)'
                  }}
                >
                  {selectedProject.badge}
                </span>
              </div>

              <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                {selectedProject.description}
              </p>

              <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="text-xs font-mono font-semibold uppercase mb-2" style={{ color: 'var(--color-status-dot)' }}>
                  Architecture & Design
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {selectedProject.details.architecture}
                </p>
              </div>

              {selectedProject.details.highlights && (
                <div className="mt-4">
                  <div className="text-xs font-mono font-semibold uppercase mb-2" style={{ color: 'var(--color-status-dot)' }}>
                    Engineering Highlights
                  </div>
                  <ul className="space-y-1.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    {selectedProject.details.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={13} style={{ color: 'var(--color-status-dot)' }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 pt-4 border-t flex flex-wrap items-center justify-between gap-3" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border"
                      style={{
                        backgroundColor: 'var(--color-btn-accent-bg)',
                        borderColor: 'var(--color-border-default)',
                        color: 'var(--color-text-secondary)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {selectedProject.details.github && (
                  <a
                    href={selectedProject.details.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition-all hover:brightness-110"
                    style={{
                      backgroundColor: 'var(--color-btn-default-bg)',
                      borderColor: 'var(--color-border-default)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    <span>View Repository</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Projects Index */
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div>
                <h4 className="text-base font-semibold text-white">Featured Software & Systems</h4>
                <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {PORTFOLIO_DATA.projects.length} verified engineering systems
                </p>
              </div>
              <span 
                className="px-2 py-0.5 rounded text-[10px] font-mono border"
                style={{
                  backgroundColor: 'var(--color-badge-bg)',
                  borderColor: 'var(--color-btn-accent-border)',
                  color: 'var(--color-status-dot)'
                }}
              >
                AWS BUILDER PORTFOLIO
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {PORTFOLIO_DATA.projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className="p-4 rounded-xl border cursor-pointer transition-all hover:scale-[1.01] hover:brightness-110 flex flex-col justify-between"
                  style={{
                    backgroundColor: 'var(--color-btn-default-bg)',
                    borderColor: 'var(--color-border-default)'
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-status-dot)' }}>
                        {project.title}
                      </span>
                      <span className="text-[10px] font-mono uppercase" style={{ color: 'var(--color-text-muted)' }}>
                        {project.badge}
                      </span>
                    </div>

                    <div className="text-[11px] font-mono mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {project.category}
                    </div>

                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="flex flex-wrap gap-1">
                      {project.stack.slice(0, 3).map((s) => (
                        <span 
                          key={s} 
                          className="px-1.5 py-0.5 rounded text-[9px] font-mono border"
                          style={{
                            backgroundColor: 'var(--color-btn-accent-bg)',
                            borderColor: 'var(--color-border-subtle)',
                            color: 'var(--color-text-muted)'
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono underline hover:text-white" style={{ color: 'var(--color-status-dot)' }}>
                      Details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Window Status Edge */}
      <div 
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)'
        }}
      >
        <span>FS: /AURA_FS/PROJECTS</span>
        <span>INDEX: {PORTFOLIO_DATA.projects.length} ITEMS</span>
      </div>
    </div>
  );
}
