import React from 'react';
import { Compass, Sparkles } from 'lucide-react';

export default function ResumeCareerDirection({ careerDirection }) {
  const { statement, motto } = careerDirection || {
    statement:
      'My long-term goal is to grow into an AI engineer with strong software engineering foundations, capable of developing intelligent applications, working with machine learning models, and building autonomous AI systems.',
    motto: 'Learning through building. Growing through challenges.',
  };

  return (
    <section className="pt-4 pb-8">
      <div
        className="relative p-7 sm:p-10 rounded-3xl border overflow-hidden text-center"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.7) 0%, rgba(8, 12, 22, 0.9) 100%)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, #3b82f6 50%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-mono text-[11px] font-semibold tracking-widest uppercase mb-5">
            <Compass size={13} />
            <span>CAREER HORIZON</span>
          </div>

          {/* Statement */}
          <blockquote className="text-sm sm:text-base md:text-lg text-slate-200 font-medium leading-relaxed tracking-tight mb-6 font-sans">
            "{statement}"
          </blockquote>

          {/* Divider */}
          <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6" />

          {/* Motto */}
          <div className="text-xs sm:text-sm font-mono font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            {motto}
          </div>
        </div>
      </div>
    </section>
  );
}

