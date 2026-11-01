import React from 'react';
import { 
  Layout, 
  Server, 
  Sparkles, 
  Waves, 
  Radio, 
  Database,
  CheckCircle2
} from 'lucide-react';

const CATEGORY_ICONS = {
  "Frontend": Layout,
  "Backend": Server,
  "Artificial Intelligence": Sparkles,
  "Audio Processing": Waves,
  "Real-Time Communication": Radio,
  "Data & Session Management": Database,
};

export default function AIVoiceGuardTechStack({ techStack }) {
  return (
    <section id="tech-stack" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              09 — TECHNOLOGY STACK
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Engineered with Modern AI & Audio Infrastructure
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A cohesive full-stack ecosystem marrying deep learning transformer pipelines with ultra-low latency audio processing and duplex streaming.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.category] || Server;

            return (
              <div
                key={cat.category}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-500/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div 
                      className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: 'rgba(168, 85, 247, 0.08)',
                        borderColor: 'rgba(168, 85, 247, 0.25)',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {cat.category}
                    </h3>
                  </div>

                  {/* Technology Items */}
                  <ul className="space-y-3">
                    {cat.technologies.map((tech, idx) => (
                      <li key={idx} className="flex items-start justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 size={13} className="text-purple-400/80 shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-200">
                            {tech.name}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0 text-right">
                          {tech.role}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

