import React from 'react';
import { Trophy } from 'lucide-react';

export default function AboutBeyond() {
  return (
    <section id="story-section-04" className="about-section py-14 md:py-20 px-6 md:px-12 border-b border-[var(--color-border-subtle)]">
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Chapter Header & Story Narrative */}
        <div className="lg:col-span-6">
          <div className="mb-6">
            <div className="chapter-numeral mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
              <span>04 — BEYOND THE CLASSROOM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-1">
              Learning through real challenges.
            </h2>
            <p className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
              EXPERIENCE // COLLABORATION UNDER PRESSURE
            </p>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
            <p className="text-[var(--color-text-primary)] font-medium text-base sm:text-lg">
              One of my first major experiences outside regular coursework was participating in a college-level hackathon.
            </p>

            <p>
              It was more than a competition. It introduced me to collaborative development, working under deadlines, making technical decisions, and turning an idea into something demonstrable.
            </p>

            <p>
              Experiences like these have shaped the way I approach development: think bigger, experiment faster, and never stop learning.
            </p>
          </div>
        </div>

        {/* Right Column: Prominent Achievement Composition */}
        <div className="lg:col-span-6">
          <div className="hackathon-stat-card relative overflow-hidden">
            {/* Corner Badge */}
            <div className="flex items-center justify-between mb-6">
              <span 
                className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border inline-flex items-center gap-1.5"
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  borderColor: 'rgba(56, 189, 248, 0.3)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <Trophy size={11} />
                <span>Hackathon Achievement</span>
              </span>

              <span className="text-[10px] font-mono text-[var(--color-text-muted)] hidden sm:inline">
                COMPETITIVE MILESTONE
              </span>
            </div>

            {/* Numerical Focus Display */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 items-end mb-4">
              <div>
                <div 
                  className="text-4xl sm:text-6xl font-bold font-mono tracking-tight tabular-nums"
                  style={{ color: 'var(--color-status-dot)' }}
                >
                  07
                </div>
                <div className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] mt-1">
                  Team position
                </div>
                <div className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  Final rank secured
                </div>
              </div>

              <div className="border-l border-[var(--color-border-subtle)] pl-4 sm:pl-8">
                <div className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-[var(--color-text-primary)] tabular-nums">
                  63
                </div>
                <div className="text-xs sm:text-sm font-medium text-[var(--color-text-primary)] mt-1">
                  Participating teams
                </div>
                <div className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  Total competing teams
                </div>
              </div>
            </div>

            {/* Subtext summary */}
            <div className="pt-4 border-t border-[var(--color-border-subtle)] text-xs font-mono text-[var(--color-text-secondary)] flex items-center justify-between">
              <span>Our team secured 7th position among 63 participating teams.</span>
              <span className="text-[10px] text-[var(--color-text-muted)] font-mono hidden sm:inline">TOP 11%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
