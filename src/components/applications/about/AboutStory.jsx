import React from 'react';
import { Compass, Sparkle } from 'lucide-react';

export default function AboutStory() {
  return (
    <section id="story-section-01" className="about-section py-14 md:py-20 px-6 md:px-12 border-b border-[var(--color-border-subtle)]">
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Chapter Header & Metadata */}
        <div className="lg:col-span-4 lg:sticky lg:top-20">
          <div className="chapter-numeral mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
            <span>01 — WHERE IT BEGAN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-1">
            It started with curiosity.
          </h2>
          <p className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
            THE GENESIS // FROM OBSERVER TO CREATOR
          </p>

          {/* Contextual Sidebar Card on Wide Screens */}
          <div className="hidden lg:block mt-8 p-4 rounded-xl border border-[var(--color-border-subtle)] bg-[var(--color-btn-default-bg)] text-xs font-mono">
            <div className="text-[10px] text-[var(--color-status-dot)] font-semibold mb-1">
              FOUNDATION PHASE
            </div>
            <p className="text-[var(--color-text-muted)] text-[11px] leading-relaxed">
              Transitioning from computer fascination to writing code and building digital artifacts from scratch.
            </p>
          </div>
        </div>

        {/* Right Column: Narrative Story Flow */}
        <div className="lg:col-span-8">
          <div className="relative pl-6 sm:pl-8 border-l border-[var(--color-border-default)] space-y-6 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">
            {/* Origin Pin Node */}
            <div 
              className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2"
              style={{
                backgroundColor: 'var(--color-status-dot)',
                borderColor: 'var(--color-bg-panel)',
                boxShadow: 'var(--color-status-glow)'
              }}
              aria-hidden="true"
            />

            <p className="text-[var(--color-text-primary)] font-medium text-base sm:text-lg leading-relaxed">
              I've always been fascinated by how technology works — not just what it can do, but how something built with lines of code can turn an idea into something real.
            </p>

            <p>
              What started as an interest in computers gradually became an interest in programming, designing, and building things.
            </p>

            <p>
              I began with the fundamentals of web development, learning HTML, CSS, and JavaScript. My first projects weren't perfect, but every project taught me something new.
            </p>

            <div className="about-quote my-6 pt-1 pb-1">
              <p className="text-base sm:text-lg font-normal italic text-[var(--color-text-primary)] leading-snug">
                Over time, I realised that I enjoyed more than just writing code. I enjoyed the entire process of creating something from scratch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
