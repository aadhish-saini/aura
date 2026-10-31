import React from 'react';
import { Network } from 'lucide-react';

export default function AboutVision() {
  return (
    <section id="story-section-06" className="about-section py-14 md:py-20 px-6 md:px-12 border-b border-[var(--color-border-subtle)]">
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Chapter Header & Metadata */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <div className="chapter-numeral mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
            <span>06 — WHAT I'M WORKING TOWARDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-1">
            From building applications to engineering intelligent systems.
          </h2>
          <p className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
            ASPIRATION // THE NEXT FRONTIER
          </p>

          {/* Research Vectors Card on Wide Screens */}
          <div className="hidden lg:block mt-8 p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-btn-default-bg)] text-xs font-mono">
            <div className="text-[10px] text-[var(--color-status-dot)] font-semibold mb-2">
              RESEARCH VECTORS
            </div>
            <div className="space-y-1.5 text-[11px] text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Cognitive Task Reasoning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Tool-Assisted Orchestration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Autonomous System Engineering</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Vision Editorial Composition */}
        <div className="lg:col-span-8">
          <div className="vision-composition relative">
            {/* Subtle Ambient Constellation Grid Accent */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-border-subtle)]">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-status-dot)]">
                <Network size={14} />
                <span className="font-semibold uppercase tracking-wider">AUTONOMOUS SYSTEMS // VISION</span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-node" />
                <span>HORIZON TARGET</span>
              </div>
            </div>

            {/* Core Vision Narrative */}
            <div className="space-y-5 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
              <p className="text-base sm:text-lg font-medium text-[var(--color-text-primary)] leading-snug">
                My long-term ambition is to become an AI engineer capable of developing intelligent systems that can understand tasks, reason through problems, interact with tools, and perform meaningful work.
              </p>

              <p>
                I'm particularly interested in the intersection of AI, software engineering, and autonomous systems.
              </p>

              {/* Stylized Statement */}
              <div className="pt-2">
                <p className="text-lg sm:text-xl font-normal italic tracking-tight text-[var(--color-status-dot)]">
                  "I want to move beyond simply using technology and develop the ability to engineer it."
                </p>
              </div>
            </div>

            {/* Minimal Bottom Metadata Bar */}
            <div className="mt-8 pt-4 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--color-text-muted)]">
              <div className="flex items-center gap-2">
                <span>FOCUS: REASONING</span>
                <span>•</span>
                <span>TOOL INTERACTION</span>
                <span>•</span>
                <span>AUTONOMY</span>
              </div>
              <span>AI ENGINEERING SPEC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
