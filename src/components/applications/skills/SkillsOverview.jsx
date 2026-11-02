import React from 'react';
import { Code2, Layout, Sparkles, Wrench, Cpu } from 'lucide-react';

const CAPABILITY_ICONS = {
  Code2,
  Layout,
  Sparkles,
  Wrench
};

export default function SkillsOverview({ data }) {
  const { title, subtitle, introduction, capabilityAreas } = data;

  return (
    <section id="overview" className="pt-6 pb-12 sm:pb-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Subtle Ambient Lighting */}
        <div 
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-2/3 max-w-xl h-44 rounded-full pointer-events-none blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, #8b5cf6 90%, transparent 100%)' }}
        />

        {/* Section Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-3 border border-cyan-500/25 bg-cyan-950/20 text-cyan-300">
            <Cpu size={13} className="text-cyan-400" />
            <span className="font-semibold tracking-wider uppercase">01 — OVERVIEW</span>
            <span className="text-white/30">•</span>
            <span>CAPABILITY MATRIX</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
            {title}
          </h1>
          <p className="text-base sm:text-lg font-serif italic text-cyan-200/90 font-light">
            "{subtitle}"
          </p>
        </div>

        {/* Narrative Introduction */}
        <div className="space-y-3.5 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl mb-10 font-sans">
          {introduction.map((paragraph, idx) => (
            <p key={idx}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* 4 Compact Capability Area Groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capabilityAreas.map((area) => {
            const Icon = CAPABILITY_ICONS[area.iconName] || Code2;

            return (
              <div
                key={area.id}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-500/30 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div 
                      className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform"
                      style={{
                        backgroundColor: 'rgba(6, 182, 212, 0.08)',
                        borderColor: 'rgba(6, 182, 212, 0.25)',
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {area.title}
                    </h3>
                  </div>

                  {/* Skills Tag Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {area.skills.map((skillName, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 bg-white/[0.03] border border-white/5"
                      >
                        {skillName}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

