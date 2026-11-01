import React, { useRef } from 'react';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { AI_VOICE_GUARD_DATA } from './aiVoiceGuardData';
import AIVoiceGuardHero from './AIVoiceGuardHero';
import AIVoiceGuardPipeline from './AIVoiceGuardPipeline';
import AIVoiceGuardComponents from './AIVoiceGuardComponents';
import AIVoiceGuardTechStack from './AIVoiceGuardTechStack';
import AIVoiceGuardSections from './AIVoiceGuardSections';

export default function AIVoiceGuardDetails({ onBack }) {
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
        backgroundColor: 'var(--color-bg-app, #07090e)',
        color: 'var(--color-text-primary, #ffffff)',
      }}
    >
      {/* Sticky Navigation Bar */}
      <div 
        className="sticky top-0 z-30 px-4 sm:px-6 py-2.5 border-b flex items-center justify-between backdrop-blur-md transition-colors"
        style={{
          backgroundColor: 'rgba(7, 9, 14, 0.88)',
          borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-medium transition-all duration-150 hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
          style={{
            backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
            borderColor: 'rgba(168, 85, 247, 0.3)',
            color: 'var(--color-text-secondary, #94a3b8)',
          }}
          title="Return to 6-project icon explorer"
        >
          <ArrowLeft size={14} className="text-purple-400" />
          <span>Back to Projects Explorer</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span className="hidden sm:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[11px] text-purple-400 font-semibold">AI SECURITY // ACTIVE</span>
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-[11px] text-slate-400">VOIP PROTECTION</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 pb-16">
        {/* Project Hero */}
        <AIVoiceGuardHero data={AI_VOICE_GUARD_DATA.hero} />

        {/* 01 The Idea, 02 The Problem, 03 Our Solution */}
        <AIVoiceGuardSections 
          mode="part1" 
          sections={AI_VOICE_GUARD_DATA.sections} 
        />

        {/* 04 How It Works (6-Stage Pipeline) */}
        <AIVoiceGuardPipeline 
          pipeline={AI_VOICE_GUARD_DATA.pipeline} 
        />

        {/* 05 The Detection Engine, 06 Real-Time Communication Architecture */}
        <AIVoiceGuardSections 
          mode="part2" 
          sections={AI_VOICE_GUARD_DATA.sections} 
        />

        {/* 07 Core System Components (8 Modules) */}
        <AIVoiceGuardComponents 
          components={AI_VOICE_GUARD_DATA.components} 
        />

        {/* 08 Privacy by Design */}
        <AIVoiceGuardSections 
          mode="part3" 
          sections={AI_VOICE_GUARD_DATA.sections} 
        />

        {/* 09 Technology Stack (Grouped Categories) */}
        <AIVoiceGuardTechStack 
          techStack={AI_VOICE_GUARD_DATA.techStack} 
        />

        {/* 10 Development Journey, 11 Differentiation, 12 Beneficiaries, 13 Real-World Impact, 14 Future Roadmap, 15 The Vision + Specs */}
        <AIVoiceGuardSections 
          mode="part4" 
          sections={AI_VOICE_GUARD_DATA.sections} 
          projectInfo={AI_VOICE_GUARD_DATA.projectInfo} 
        />

        {/* Page Footer Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 mt-12 border-t flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-mono font-medium hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-all"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
              borderColor: 'rgba(168, 85, 247, 0.3)',
            }}
          >
            <ArrowLeft size={14} className="text-purple-400" />
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
            <ArrowUp size={14} className="text-purple-400" />
            <span>Scroll to Top</span>
          </button>
        </div>
      </div>
    </div>
  );
}

