import React from 'react';
import { 
  Eye, 
  Sparkles, 
  Activity, 
  Smile, 
  Compass, 
  MousePointer2, 
  Box,
  Layers
} from 'lucide-react';

const INTERACTION_ICONS = [
  Eye,
  Sparkles,
  Activity,
  Smile,
  Compass
];

export default function PortfolioAvatarSection({ data }) {
  const { number, title, tagline, overview, interactionConcept, summary } = data;

  return (
    <section id="avatar-experience" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
              {number} — {title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {tagline}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {overview}
          </p>
        </div>

        {/* Central Visual Composition: Avatar Focus Card */}
        <div 
          className="p-6 sm:p-8 rounded-3xl border mb-10 relative overflow-hidden group"
          style={{
            backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
            borderColor: 'rgba(6, 182, 212, 0.25)',
          }}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-15"
            style={{ background: 'radial-gradient(circle, #06b6d4 0%, #10b981 70%, transparent 100%)' }}
          />

          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 relative z-10">
            {/* Avatar Visual Display Container */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl border flex items-center justify-center p-3 relative shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundColor: 'rgba(6, 182, 212, 0.06)',
                  borderColor: 'rgba(6, 182, 212, 0.4)',
                }}
              >
                <img 
                  src="/projects-icons/3d-portfolio-icon.png" 
                  alt="3D Avatar Character" 
                  className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
                />

                {/* Live Eye / Interaction Pulse Indicator */}
                <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-mono border bg-emerald-950/80 border-emerald-500/40 text-emerald-400 flex items-center gap-1 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE RIG</span>
                </div>
              </div>
            </div>

            {/* Avatar Role & Character Narrative */}
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono border mb-2 text-cyan-300 border-cyan-500/20 bg-cyan-950/30">
                <Box size={12} />
                <span>3D CHARACTER & INTERACTION CONCEPT</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                A Living Character in the Viewport
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Instead of presenting a static graphic or standard photography, the custom 3D avatar establishes a direct connection with the audience. As visitors move their cursor across the display, the avatar naturally tracks their motion, transforming a passive reading session into a playful dialogue.
              </p>
            </div>
          </div>
        </div>

        {/* 5 Interaction Concept Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {interactionConcept.map((concept, idx) => {
            const Icon = INTERACTION_ICONS[idx] || Sparkles;

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-400/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div 
                      className="w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: 'rgba(6, 182, 212, 0.08)',
                        borderColor: 'rgba(6, 182, 212, 0.25)',
                      }}
                    >
                      <Icon size={16} />
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      TRAIT 0{idx + 1}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white tracking-tight mb-1.5">
                    {concept.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {concept.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Banner */}
        <div 
          className="p-4 rounded-xl border flex items-center gap-3 text-xs font-mono text-slate-300"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.04)',
            borderColor: 'rgba(16, 185, 129, 0.25)',
          }}
        >
          <MousePointer2 size={16} className="text-emerald-400 shrink-0" />
          <span>
            <strong className="text-white">Design Outcome:</strong> {summary}
          </span>
        </div>
      </div>
    </section>
  );
}

