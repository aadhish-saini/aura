import React from 'react';
import { ArrowRight } from 'lucide-react';

const LEARNING_STEPS = [
  { id: '01', title: 'EXPLORE', desc: 'Identify ideas & frontiers' },
  { id: '02', title: 'UNDERSTAND', desc: 'Deconstruct into parts' },
  { id: '03', title: 'BUILD', desc: 'Code real solutions' },
  { id: '04', title: 'DEBUG', desc: 'Embrace and solve errors' },
  { id: '05', title: 'IMPROVE', desc: 'Iterate with purpose' }
];

export default function AboutLearning() {
  return (
    <section id="story-section-02" className="about-section py-14 md:py-20 px-6 md:px-12 border-b border-[var(--color-border-subtle)]">
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Chapter Header & Methodology */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <div className="chapter-numeral mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
            <span>02 — THE WAY I LEARN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-1">
            I learn by building, not just by watching.
          </h2>
          <p className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
            METHODOLOGY // ITERATIVE ENGINEERING
          </p>

          {/* Contextual Card on Wide Screens */}
          <div className="hidden lg:block mt-8 p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-btn-default-bg)] text-xs font-mono">
            <div className="text-[10px] text-[var(--color-status-dot)] font-semibold mb-1">
              CORE PHILOSOPHY
            </div>
            <p className="text-[var(--color-text-muted)] text-[11px] leading-relaxed">
              Prioritizing immediate hands-on experimentation over passive observation. Starting, learning through errors, and continuous refinement.
            </p>
          </div>
        </div>

        {/* Right Column: Narrative & Iteration Sequence */}
        <div className="lg:col-span-8">
          {/* Narrative */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)] mb-10 max-w-2xl">
            <p className="text-[var(--color-text-primary)] font-medium text-base sm:text-lg">
              I believe the best way to understand a technology is to work with it.
            </p>

            <p>
              My approach is simple: explore an idea, break it into smaller problems, build a solution, make mistakes, debug, and improve.
            </p>

            <p>
              Sometimes that means spending hours understanding a small issue. Sometimes it means learning an entirely new technology just to bring an idea to life.
            </p>

            <p>
              I don't believe in knowing everything before starting. I believe in starting, learning along the way, and getting better with every iteration.
            </p>
          </div>

          {/* Visual Learning Journey Sequence: EXPLORE -> UNDERSTAND -> BUILD -> DEBUG -> IMPROVE */}
          <div className="pt-2">
            <div className="text-[11px] font-mono tracking-widest uppercase mb-4 text-[var(--color-text-muted)] flex items-center gap-2">
              <span>THE ITERATION CYCLE</span>
              <div className="h-[1px] flex-1 bg-[var(--color-border-subtle)]" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-2">
              {LEARNING_STEPS.map((step, idx) => (
                <div 
                  key={step.id}
                  className="learning-step-node p-3 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-btn-default-bg)] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-[var(--color-status-dot)]">
                      {step.id}
                    </span>
                    {idx < LEARNING_STEPS.length - 1 && (
                      <ArrowRight size={10} className="hidden xl:inline text-[var(--color-text-muted)]" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-mono font-semibold tracking-wide text-[var(--color-text-primary)]">
                      {step.title}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--color-text-muted)] mt-0.5 leading-tight">
                      {step.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
