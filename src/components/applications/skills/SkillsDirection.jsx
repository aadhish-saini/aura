import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export default function SkillsDirection({ direction }) {
  const { heading, mainContent, closingStatement } = direction || {
    heading: 'MY DIRECTION',
    mainContent:
      'My goal is to grow into an AI engineer capable of designing and developing intelligent systems — from understanding models and building AI applications to creating autonomous agents that can interact with tools and solve real-world problems.',
    closingStatement: 'LEARNING. BUILDING. IMPROVING. REPEATING.',
  };

  return (
    <section id="my-direction" className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div
          className="relative p-8 sm:p-12 rounded-3xl border overflow-hidden text-center"
          style={{
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(8, 12, 22, 0.95) 100%)',
            borderColor: 'rgba(56, 189, 248, 0.25)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Ambient Lighting Gradient */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, rgba(139, 92, 246, 0.15) 50%, transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Header Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-semibold tracking-widest uppercase mb-6">
              <Compass size={13} />
              <span>{heading}</span>
            </div>

            {/* Core Goal Statement */}
            <blockquote className="text-base sm:text-lg md:text-xl text-slate-200 font-medium leading-relaxed tracking-tight mb-8 font-sans">
              "{mainContent}"
            </blockquote>

            {/* Divider */}
            <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8" />

            {/* Closing Bold Motto */}
            <div className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
              {closingStatement}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

