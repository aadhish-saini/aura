import React from 'react';
import { Code, Cpu, Trophy, Users, Lightbulb, BookOpen } from 'lucide-react';

const OPPORTUNITY_ICONS = {
  'software-dev': Code,
  'ai-eng': Cpu,
  hackathons: Trophy,
  'tech-collab': Users,
  'project-ideas': Lightbulb,
  'knowledge-sharing': BookOpen,
};

export default function ContactOpportunities({ opportunities }) {
  return (
    <section className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Header */}
      <div className="mb-5">
        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
          COLLABORATION RADAR
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-1">
          Open For Collaboration
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Domains where I actively seek to team up, engineer practical solutions, and exchange ideas.
        </p>
      </div>

      {/* Grid of 6 Opportunities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {opportunities.map((opp) => {
          const Icon = OPPORTUNITY_ICONS[opp.id] || Code;

          return (
            <div
              key={opp.id}
              className="p-4 rounded-xl border transition-all duration-200 hover:border-cyan-500/30 hover:bg-slate-900/40"
              style={{
                backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
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
                  {opp.title}
                </h3>
              </div>

              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                {opp.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

