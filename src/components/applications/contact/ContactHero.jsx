import React from 'react';
import { MessageSquare, Sparkles, Radio } from 'lucide-react';

export default function ContactHero({ hero }) {
  const { heading, subtitle, description } = hero;

  return (
    <section className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Status Pill Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/25 bg-cyan-950/20 text-cyan-300">
          <MessageSquare size={13} className="text-cyan-400" />
          <span className="font-semibold tracking-wider uppercase">COMMUNICATION HUB</span>
          <span className="text-white/30">•</span>
          <span>DIRECT TRANSMISSION</span>
        </div>

        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono border"
          style={{
            backgroundColor: 'var(--color-badge-bg, rgba(255, 255, 255, 0.04))',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            color: '#38bdf8',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>INBOX ACTIVE & MONITORED</span>
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3">
        {heading}
      </h1>

      <blockquote className="text-base sm:text-lg font-serif italic text-cyan-200/90 font-light mb-4 border-l-2 border-cyan-400/50 pl-3.5 py-0.5 max-w-2xl">
        "{subtitle}"
      </blockquote>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
        {description}
      </p>
    </section>
  );
}

