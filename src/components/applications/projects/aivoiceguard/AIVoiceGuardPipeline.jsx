import React from 'react';
import { Mic, Clock, Waves, Cpu, Activity, AlertTriangle } from 'lucide-react';

const STAGE_ICONS = {
  "01": Mic,
  "02": Clock,
  "03": Waves,
  "04": Cpu,
  "05": Activity,
  "06": AlertTriangle,
};

export default function AIVoiceGuardPipeline({ pipeline }) {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              04 — HOW IT WORKS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            From Incoming Audio to an Intelligent Security Alert
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A continuous, low-latency analysis pipeline operating in tight 1–3 second processing windows, turning raw acoustic signals into reliable session-level authenticity confidence.
          </p>
        </div>

        {/* 6-Stage Sequential Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {pipeline.map((stage) => {
            const Icon = STAGE_ICONS[stage.stage] || Activity;

            return (
              <div
                key={stage.stage}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-purple-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div 
                      className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-slate-300 transition-colors group-hover:text-purple-300 group-hover:border-purple-400/40"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </div>

                    <span 
                      className="px-2 py-0.5 rounded text-[10px] font-mono border text-purple-300 shrink-0"
                      style={{
                        backgroundColor: 'rgba(168, 85, 247, 0.08)',
                        borderColor: 'rgba(168, 85, 247, 0.25)',
                      }}
                    >
                      {stage.badge}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-1">
                    Stage {stage.stage}
                  </div>
                  <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 1–3s Processing Window Note */}
        <div 
          className="mt-6 p-4 rounded-xl border flex items-center gap-3 text-xs font-mono text-slate-300"
          style={{
            backgroundColor: 'rgba(56, 189, 248, 0.03)',
            borderColor: 'rgba(56, 189, 248, 0.2)',
          }}
        >
          <Clock size={16} className="text-sky-400 shrink-0" />
          <span>
            <strong className="text-white">Temporal Processing Window:</strong> Slicing conversational audio into 1–3 second intervals minimizes detection lag while providing adequate spectral harmonics for deep transformer inference.
          </span>
        </div>
      </div>
    </section>
  );
}

