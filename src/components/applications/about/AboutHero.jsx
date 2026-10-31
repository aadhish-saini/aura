import React from 'react';
import { ChevronDown, Sparkles, Terminal, Cpu } from 'lucide-react';

export default function AboutHero({ onScrollToStory }) {
  return (
    <header className="relative min-h-[460px] md:min-h-[520px] flex flex-col justify-between py-10 md:py-14 px-6 md:px-12 border-b border-[var(--color-border-subtle)] overflow-hidden">
      {/* Background Graphic Watermark */}
      <div 
        className="absolute top-1/2 right-4 md:right-16 -translate-y-1/2 select-none pointer-events-none opacity-[0.035] dark:opacity-[0.05] flex items-center justify-center"
        aria-hidden="true"
      >
        <img 
          src="/AURA-icon.png" 
          alt="" 
          className="w-72 h-72 md:w-96 md:h-96 object-contain filter grayscale"
        />
      </div>

      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex flex-col justify-between h-full flex-1 relative z-10">
        {/* Top Telemetry Decal */}
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span 
              className="w-2 h-2 rounded-full" 
              style={{ 
                backgroundColor: 'var(--color-status-dot)',
                boxShadow: 'var(--color-status-glow)'
              }} 
            />
            <span className="font-semibold tracking-widest uppercase text-[10px]" style={{ color: 'var(--color-status-dot)' }}>
              ABOUT ME // ARCHITECTURE SPECIFICATION
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[10px] text-[var(--color-text-muted)]">
            <span>AURA WORKSTATION</span>
            <span>•</span>
            <span>BUILD 26100</span>
          </div>
        </div>

        {/* Hero Center Editorial Typography */}
        <div className="my-auto py-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            {/* Subtle decorative eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 text-[11px] font-mono"
              style={{
                backgroundColor: 'var(--color-btn-default-bg)',
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-text-secondary)'
              }}
            >
              <Sparkles size={12} className="text-sky-400" />
              <span>PERSONAL PROFILE & SYSTEM ARCHITECT</span>
            </div>

            {/* Name Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.08] mb-4">
              AADHISH SAINI
            </h1>

            {/* Visually distinctive subtitle */}
            <p className="text-xl sm:text-2xl font-normal italic tracking-wide text-[var(--color-status-dot)] mb-6">
              The mind behind AURA.
            </p>

            {/* Pitch Philosophy Statement */}
            <p className="text-base sm:text-lg md:text-xl font-normal leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">
              A Computer Science Student.&nbsp;
              <span className="text-[var(--color-text-primary)] font-medium">A Developer by Practice.</span>&nbsp;
              <span className="text-[var(--color-status-dot)] font-medium">An AI Enthusiast by Curiosity.</span>
            </p>
          </div>

          {/* Right Column Ambient Badge on Wide Screens */}
          <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-center">
            <div 
              className="p-5 rounded-2xl border backdrop-blur-sm max-w-xs text-right font-mono text-xs space-y-3"
              style={{
                backgroundColor: 'var(--color-btn-default-bg)',
                borderColor: 'var(--color-border-subtle)'
              }}
            >
              <div className="flex items-center justify-end gap-2 text-[10px] text-[var(--color-status-dot)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
                <span>ARCHITECT SPEC</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Building interactive systems, operating architecture, and intelligent software from first principles.
              </p>
              <div className="text-[10px] text-[var(--color-text-muted)] pt-2 border-t border-[var(--color-border-subtle)]">
                LOC: INDIA // DEV ENV ACTIVE
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator & Telemetry */}
        <div className="flex items-center justify-between pt-6 border-t border-[var(--color-border-subtle)] text-xs font-mono">
          <button
            type="button"
            onClick={onScrollToStory}
            className="group inline-flex items-center gap-2 cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-status-dot)] transition-colors select-none text-[11px]"
            aria-label="Scroll to begin story"
          >
            <span>EXPLORE THE STORY</span>
            <ChevronDown size={14} className="transition-transform group-hover:translate-y-0.5 duration-200" />
          </button>

          <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-muted)]">
            <Terminal size={12} />
            <span>ORIGIN: 01 // DISCOVERY</span>
          </div>
        </div>
      </div>
    </header>
  );
}
