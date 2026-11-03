import React from 'react';
import { ExternalLink, Layers, Code2, Cpu } from 'lucide-react';

function GithubIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function AuraHero({ data }) {
  const {
    mainHeading,
    fullForm,
    tagline,
    subtitle,
    shortDescription,
    category,
    technologies,
    githubUrl,
    iconImage
  } = data;

  return (
    <header className="relative pt-6 pb-12 sm:pb-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Background ambient creative glow (violet / sky / cyan) */}
      <div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-48 rounded-full pointer-events-none blur-3xl opacity-25"
        style={{ background: 'radial-gradient(circle, #a855f7 0%, #38bdf8 45%, #06b6d4 80%, transparent 100%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Category & Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border"
          style={{
            backgroundColor: 'rgba(168, 85, 247, 0.12)',
            borderColor: 'rgba(168, 85, 247, 0.35)',
            color: '#c084fc'
          }}
        >
          <Layers size={13} className="text-purple-400" />
          <span className="font-semibold tracking-wider uppercase">{category}</span>
          <span className="text-white/30">•</span>
          <span className="text-sky-400">DESKTOP WORKSPACE OS</span>
        </div>

        {/* Main Title & Icon */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                {mainHeading}
              </h1>
              <span className="text-xs sm:text-sm font-mono text-purple-400 font-medium tracking-wider">
                v26100
              </span>
            </div>
            <p className="text-base sm:text-xl font-serif italic text-purple-200/90 font-light mb-1">
              {tagline}
            </p>
            <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
              {fullForm}
            </p>
          </div>

          {iconImage && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-purple-500/30 bg-purple-950/20 p-2 shrink-0 flex items-center justify-center shadow-[0_0_24px_rgba(168,85,247,0.25)]">
              <img 
                src={iconImage} 
                alt={mainHeading} 
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
              />
            </div>
          )}
        </div>

        {/* Subtitle Statement */}
        <div className="text-xs sm:text-sm font-mono text-sky-300/90 mb-3 flex items-center gap-2">
          <Cpu size={14} className="text-sky-400 shrink-0" />
          <span>{subtitle}</span>
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed mb-6 font-sans">
          {shortDescription}
        </p>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-mono">
          {technologies.map((tech, idx) => (
            <span 
              key={idx}
              className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-slate-300 flex items-center gap-1.5 transition-colors hover:border-purple-400/40"
            >
              <Code2 size={11} className="text-purple-400" />
              <span>{tech}</span>
            </span>
          ))}
        </div>

        {/* Primary Action Button: GitHub Repository */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium border transition-all duration-200 hover:scale-[1.02] active:scale-95 shadow-lg group"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.05))',
              borderColor: 'rgba(168, 85, 247, 0.4)',
              color: 'var(--color-text-primary, #ffffff)',
            }}
          >
            <GithubIcon size={16} />
            <span>Open Repository on GitHub</span>
            <ExternalLink size={13} className="text-slate-400 group-hover:text-purple-300 transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
}

