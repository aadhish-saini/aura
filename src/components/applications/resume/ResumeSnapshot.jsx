import React from 'react';
import { Code, Layout, Cpu, Bot, Sparkles, Layers } from 'lucide-react';

const FOCUS_ICONS = {
  'software-dev': Code,
  'frontend-eng': Layout,
  'ai-intelligence': Cpu,
  'ai-agents': Bot,
  'interactive-web': Sparkles,
};

export default function ResumeSnapshot({ focusAreas }) {
  return (
    <section className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Header */}
      <div className="mb-6">
        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
          PROFESSIONAL SNAPSHOT
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-1">
          Technical Focus & Core Domains
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          The engineering disciplines shaping my software projects and daily technical exploration.
        </p>
      </div>

      {/* Grid of 5 Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {focusAreas.map((area) => {
          const Icon = FOCUS_ICONS[area.id] || Layers;

          return (
            <div
              key={area.id}
              className="p-4 rounded-xl border transition-all duration-200 hover:border-cyan-500/30 hover:bg-slate-900/40 flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
              }}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div
                    className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-cyan-400"
                    style={{
                      backgroundColor: 'rgba(6, 182, 212, 0.08)',
                      borderColor: 'rgba(6, 182, 212, 0.25)',
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    {area.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {area.description}
                </p>
              </div>

              <div className="pt-2 mt-3 border-t text-[10px] font-mono text-slate-500 flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <span>Domain Focus</span>
                <span className="text-cyan-400/70">Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

