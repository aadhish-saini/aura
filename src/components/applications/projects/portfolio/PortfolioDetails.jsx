import React, { useRef } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from './portfolioData';
import PortfolioHero from './PortfolioHero';
import PortfolioAvatarSection from './PortfolioAvatarSection';
import PortfolioSections from './PortfolioSections';

export default function PortfolioDetails({ onBack }) {
  const scrollContainerRef = useRef(null);

  // Scroll to top handler
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
        backgroundColor: 'var(--color-bg-app, #050811)',
        color: 'var(--color-text-primary, #ffffff)',
      }}
    >
      {/* Sticky Navigation Bar */}
      <div 
        className="sticky top-0 z-30 px-4 sm:px-6 py-2.5 border-b flex items-center justify-between backdrop-blur-md transition-colors"
        style={{
          backgroundColor: 'rgba(5, 8, 17, 0.88)',
          borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-150 hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
          style={{
            backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            color: 'var(--color-text-secondary, #94a3b8)',
          }}
          title="Return to 6-project icon explorer"
        >
          <ArrowLeft size={14} className="text-cyan-400" />
          <span>Back to Projects Explorer</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] text-cyan-400 font-semibold">3D WEB EXPERIENCE // ACTIVE</span>
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-[11px] text-emerald-400">CREATIVE FRONTEND</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pb-16">
        {/* Project Hero */}
        <PortfolioHero data={PORTFOLIO_DATA.hero} />

        {/* 01 The Beginning, 02 The Problem, 03 The Solution */}
        <PortfolioSections 
          mode="intro" 
          sections={PORTFOLIO_DATA.sections} 
        />

        {/* 04 The 3D Avatar Experience (Central Highlight) */}
        <PortfolioAvatarSection 
          data={PORTFOLIO_DATA.sections.avatarExperience} 
        />

        {/* 05 to 12 & Project Information Matrix */}
        <PortfolioSections 
          mode="details" 
          sections={PORTFOLIO_DATA.sections} 
          projectInfo={PORTFOLIO_DATA.projectInfo}
        />

        {/* Page Footer Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 mt-12 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-medium hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-all"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
              borderColor: 'rgba(6, 182, 212, 0.3)',
            }}
          >
            <ArrowLeft size={14} className="text-cyan-400" />
            <span>Back to Projects Explorer</span>
          </button>

          <button
            type="button"
            onClick={handleScrollTop}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-mono font-medium hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-all"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
              borderColor: 'var(--color-border-subtle)',
            }}
          >
            <ArrowUp size={14} className="text-cyan-400" />
            <span>Scroll to Top</span>
          </button>
        </div>
      </div>
    </div>
  );
}

