import React from 'react';
import { Lightbulb, Layers, Users, BookOpen } from 'lucide-react';

const COMPETENCY_ICONS = {
  'problem-solving': Lightbulb,
  'product-thinking': Layers,
  'team-collaboration': Users,
  'continuous-learning': BookOpen,
};

export default function SkillsBeyond({ items }) {
  return (
    <section id="beyond-technologies" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              08 — BEYOND TECHNOLOGIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Beyond Technologies
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
            How I approach engineering challenges, make technical decisions, and collaborate with teams.
          </p>
        </div>

        {/* 4 Cards in 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => {
            const Icon = COMPETENCY_ICONS[item.id] || Lightbulb;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-slate-600/60"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 text-cyan-400"
                    style={{
                      backgroundColor: 'rgba(6, 182, 212, 0.08)',
                      borderColor: 'rgba(6, 182, 212, 0.25)',
                    }}
                  >
                    <Icon size={17} />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs font-semibold text-slate-200 mb-2 leading-relaxed">
                  {item.summary}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

