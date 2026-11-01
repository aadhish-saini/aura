import React from 'react';
import { Play, ExternalLink, Compass, Radio } from 'lucide-react';

function GithubIcon({ size = 15, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function DhruvNetraHero({ data, onWatchDemo }) {
  const { title, tagline, subtitle, metadata, githubUrl } = data;

  return (
    <header className="relative pt-6 pb-12 sm:pb-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Background ambient glow */}
      <div 
        className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-48 rounded-full pointer-events-none blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #38bdf8 0%, #6366f1 50%, transparent 70%)' }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Project Identifier / Label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4 border"
          style={{
            backgroundColor: 'var(--color-badge-bg)',
            borderColor: 'var(--color-btn-accent-border)',
            color: 'var(--color-status-dot)'
          }}
        >
          <Compass size={13} className="animate-spin-slow" />
          <span className="font-semibold tracking-wider uppercase">{metadata.problemStatement}</span>
          <span className="text-white/30">•</span>
          <span>{metadata.organization}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
          {title}
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-sky-300/90 mb-3 font-light">
          {tagline}
        </p>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mb-6">
          {subtitle}
        </p>

        {/* Project Metadata Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-slate-300">
            {metadata.ministry}
          </span>
          <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-slate-300">
            {metadata.category}
          </span>
          <span className="px-2.5 py-1 rounded-md border border-sky-400/20 bg-sky-400/5 text-sky-300">
            {metadata.theme}
          </span>
          <span className="px-2.5 py-1 rounded-md border border-emerald-400/20 bg-emerald-400/5 text-emerald-300 flex items-center gap-1.5">
            <Radio size={12} className="text-emerald-400" />
            Stations: {metadata.targetStations}
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Watch Project Demo - Smooth scroll to video */}
          <button
            type="button"
            onClick={onWatchDemo}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-95"
            style={{
              backgroundColor: 'var(--color-status-dot, #38bdf8)',
              color: '#06070a',
            }}
          >
            <Play size={15} fill="currentColor" />
            <span>Watch Project Demo</span>
          </button>

          {/* View GitHub Repository */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium border transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:bg-white/10"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)',
              color: 'var(--color-text-primary)',
            }}
          >
            <GithubIcon size={15} />
            <span>View GitHub Repository</span>
            <ExternalLink size={13} className="text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
