import React, { useRef } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { DHRUVNETRA_DATA } from './dhruvnetraData';
import DhruvNetraHero from './DhruvNetraHero';
import DhruvNetraVideo from './DhruvNetraVideo';
import DhruvNetraGitHub from './DhruvNetraGitHub';
import DhruvNetraModules from './DhruvNetraModules';
import DhruvNetraSections from './DhruvNetraSections';

export default function DhruvNetraDetails({ onBack }) {
  const scrollContainerRef = useRef(null);

  // Smooth scroll to the video demo section
  const handleWatchDemo = () => {
    const videoSection = document.getElementById('dhruvnetra-video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Scroll to top
  const handleScrollTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={scrollContainerRef}
      className="flex flex-col h-full overflow-y-auto select-text font-sans scroll-smooth"
      style={{
        backgroundColor: 'var(--color-bg-app, #06070a)',
        color: 'var(--color-text-primary, #ffffff)',
      }}
    >
      {/* Sticky Navigation Bar */}
      <div 
        className="sticky top-0 z-30 px-4 sm:px-6 py-2.5 border-b flex items-center justify-between backdrop-blur-md transition-colors"
        style={{
          backgroundColor: 'rgba(6, 7, 10, 0.85)',
          borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-150 hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
          style={{
            backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
            borderColor: 'var(--color-border-default, rgba(255, 255, 255, 0.1))',
            color: 'var(--color-text-secondary, #94a3b8)',
          }}
          title="Return to 6-project icon explorer"
        >
          <ArrowLeft size={14} className="text-sky-400" />
          <span>Back to Projects Explorer</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-emerald-400 font-semibold">ANTARCTICA // ONLINE</span>
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-[11px] text-slate-400">SIH PS26060</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pb-16">
        {/* Project Hero */}
        <DhruvNetraHero 
          data={DHRUVNETRA_DATA.hero} 
          onWatchDemo={handleWatchDemo} 
        />

        {/* Embedded YouTube Video Player */}
        <DhruvNetraVideo 
          youtubeId={DHRUVNETRA_DATA.hero.youtubeId} 
          youtubeUrl={DHRUVNETRA_DATA.hero.youtubeUrl} 
        />

        {/* GitHub Repository Showcase */}
        <DhruvNetraGitHub 
          repoUrl={DHRUVNETRA_DATA.hero.githubUrl} 
        />

        {/* Editorial Storytelling Sections (01 to 04) */}
        <DhruvNetraSections 
          mode="intro"
          sections={DHRUVNETRA_DATA.sections}
          architectureSections={DHRUVNETRA_DATA.architectureSections}
          metadata={DHRUVNETRA_DATA.hero.metadata}
        />

        {/* Section 05: 12 Core System Modules */}
        <DhruvNetraModules 
          modules={DHRUVNETRA_DATA.modules} 
        />

        {/* Editorial Architecture & Storytelling Sections (06 to 14) */}
        <DhruvNetraSections 
          mode="architecture"
          sections={DHRUVNETRA_DATA.sections}
          architectureSections={DHRUVNETRA_DATA.architectureSections}
          metadata={DHRUVNETRA_DATA.hero.metadata}
        />

        {/* Page Footer Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 mt-12 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-medium hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-all"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)',
            }}
          >
            <ArrowLeft size={14} className="text-sky-400" />
            <span>Return to Projects Explorer</span>
          </button>

          <button
            type="button"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
            style={{
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>

      {/* Window Status Edge */}
      <div 
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)',
        }}
      >
        <span>PROJECT: DHRUVNETRA // CASE STUDY</span>
        <span className="hidden sm:inline">TARGETS: MAITRI & BHARATI STATIONS</span>
        <span>STATUS: 200 OK</span>
      </div>
    </div>
  );
}
