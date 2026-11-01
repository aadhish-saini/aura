import React from 'react';
import { Target, Compass, Sparkles } from 'lucide-react';

export default function SkillsRoadmap({ roadmap }) {
  const { current, next, longTerm } = roadmap || {};

  const stages = [
    {
      ...current,
      id: 'current',
      badge: 'Tier 01',
      icon: Target,
      gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
      borderAccent: 'border-cyan-500/30',
      dotColor: 'bg-cyan-400',
    },
    {
      ...next,
      id: 'next',
      badge: 'Tier 02',
      icon: Compass,
      gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
      borderAccent: 'border-blue-500/30',
      dotColor: 'bg-blue-400',
    },
    {
      ...longTerm,
      id: 'longTerm',
      badge: 'Tier 03',
      icon: Sparkles,
      gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
      borderAccent: 'border-purple-500/30',
      dotColor: 'bg-purple-400',
    },
  ];

  return (
    <section id="learning-roadmap" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              07 — LEARNING ROADMAP
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Learning Roadmap & Progression
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-2xl">
            A clear timeline of my active study, immediate technical milestones, and long-term engineering goals.
          </p>
        </div>

        {/* 3 Tier Progression Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stages.map((stage) => {
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`p-5 rounded-2xl border ${stage.borderAccent} relative flex flex-col justify-between`}
                style={{
                  backgroundColor: 'rgba(12, 17, 29, 0.65)',
                }}
              >
                <div>
                  {/* Top Badge & Stage Name */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                      {stage.badge}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${stage.dotColor}`} />
                      <span className="text-[10px] font-mono text-slate-400">
                        {stage.tagline}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 mb-4">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${stage.color}18`,
                        border: `1px solid ${stage.color}40`,
                        color: stage.color,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {stage.stage}
                    </h3>
                  </div>

                  {/* Roadmap Items */}
                  <ul className="space-y-2 mb-6">
                    {stage.items && stage.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-xs text-slate-300 font-sans p-2 rounded-lg bg-slate-900/50 border border-slate-800/60"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: stage.color }}
                        />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer cue */}
                <div
                  className="pt-3 border-t text-[10px] font-mono text-slate-500 flex items-center justify-between"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <span>Milestone Track</span>
                  <span style={{ color: stage.color }}>Active Path</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
