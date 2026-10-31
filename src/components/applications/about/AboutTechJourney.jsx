import React from 'react';
import { Sparkles } from 'lucide-react';

const CURRENT_STACK = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'C++',
  'MySQL',
  'React'
];

const EXPLORING_STACK = [
  'Artificial Intelligence & AI Development',
  'AI Agents and LLM Applications',
  'Automation and intelligent workflows',
  'Full-Stack Engineering',
  'Cloud Technologies'
];

export default function AboutTechJourney() {
  return (
    <section id="story-section-05" className="about-section py-14 md:py-20 px-6 md:px-12 border-b border-[var(--color-border-subtle)]">
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
        {/* Chapter Header */}
        <div className="mb-10">
          <div className="chapter-numeral mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
            <span>05 — MY TECHNICAL JOURNEY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-1">
            Building my foundation, one technology at a time.
          </h2>
          <p className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
            STACK & FRONTIER // ACTIVE MASTERY & ACTIVE INQUIRY
          </p>
        </div>

        {/* 2 Clearly Distinguishable Groups across available width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          {/* Group 1: Currently Working With */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--color-border-subtle)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-status-dot)]" />
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[var(--color-text-primary)]">
                CURRENTLY WORKING WITH
              </h3>
            </div>

            <p className="text-xs font-mono text-[var(--color-text-muted)] mb-4">
              Core technologies applied in active project engineering and system development.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {CURRENT_STACK.map((tech) => (
                <div key={tech} className="tech-pill-active">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)] opacity-75" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Currently Exploring */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[var(--color-border-subtle)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-violet)]" />
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[var(--color-text-primary)]">
                CURRENTLY EXPLORING
              </h3>
            </div>

            <p className="text-xs font-mono text-[var(--color-text-muted)] mb-4">
              Active research domains, emerging AI architectures, and engineering frontiers.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {EXPLORING_STACK.map((domain) => (
                <div key={domain} className="tech-pill-exploring">
                  <Sparkles size={11} className="text-purple-400 shrink-0" />
                  <span>{domain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
