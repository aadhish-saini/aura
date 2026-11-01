import React from 'react';
import { Terminal, GitBranch, Sparkles, Palette, LayoutGrid, Database, Wrench } from 'lucide-react';

function GithubIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const TOOL_ICONS = {
  vscode: Terminal,
  git: GitBranch,
  github: GithubIcon,
  antigravity: Sparkles,
  'figma-stitch': Palette,
  figjam: LayoutGrid,
  'mysql-tool': Database,
};

export default function SkillsDevTools({ tools }) {
  return (
    <section id="developer-tools" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase">
              05 — DEVELOPER TOOLS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Developer Tools & Workflow
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            The software, versioning systems, and design tools powering my daily development environment.
          </p>
        </div>

        {/* 7 Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {tools.map((tool) => {
            const IconComponent = TOOL_ICONS[tool.id] || Wrench;

            return (
              <div
                key={tool.id}
                className="p-4 rounded-xl border transition-all duration-200 hover:border-emerald-500/30 hover:bg-slate-900/40 flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div
                      className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-emerald-400"
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                        borderColor: 'rgba(16, 185, 129, 0.25)',
                      }}
                    >
                      <IconComponent size={15} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white tracking-tight">
                        {tool.name}
                      </h3>
                      <span className="text-[10px] font-mono text-emerald-400/80">
                        {tool.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {tool.role}
                  </p>
                </div>

                <div className="pt-2.5 mt-3 border-t flex items-center justify-between text-[10px] font-mono text-slate-500" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <span>Active Workflow</span>
                  <span className="text-emerald-400/80">Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

