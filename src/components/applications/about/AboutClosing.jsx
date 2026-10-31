import React from 'react';
import { ArrowRight, FolderGit2, Mail } from 'lucide-react';

export default function AboutClosing({ openApp }) {
  return (
    <footer id="story-section-07" className="about-section py-14 md:py-24 px-6 md:px-12 bg-gradient-to-b from-transparent to-[var(--color-bg-card)]">
      <div className="w-full max-w-5xl xl:max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-12">
          {/* Left Column: Chapter Header & Story Reflections */}
          <div className="lg:col-span-5">
            <div className="mb-6">
              <div className="chapter-numeral mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
                <span>07 — THE STORY CONTINUES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)] mb-1">
                Still learning. Still building. Just getting started.
              </h2>
              <p className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
                OUTLOOK // THE CONTINUUM OF GROWTH
              </p>
            </div>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--color-text-secondary)]">
              <p>
                AURA itself represents something I believe in: experimenting with ideas that go beyond conventional approaches.
              </p>

              <p>
                I'm still at the beginning of my journey, and there is a lot left to learn, build, and discover.
              </p>

              <p>
                But that's what makes the process exciting.
              </p>
            </div>
          </div>

          {/* Right Column: Core Personal Motto & Signature */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
            {/* Core Personal Motto */}
            <div className="p-6 md:p-8 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-btn-default-bg)] backdrop-blur-md">
              <p className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] leading-snug">
                "I don't want my journey to be defined by what I already know, but by what I'm willing to learn and create next."
              </p>
            </div>

            {/* Gratitude & Signature */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm font-normal italic text-[var(--color-text-secondary)]">
                  Thanks for taking a moment to explore my story.
                </p>
                <p className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] font-sans">
                  — Aadhish Saini
                </p>
              </div>

              {/* Action Buttons */}
              {openApp && (
                <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => openApp('projects')}
                    className="px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 active:scale-95 text-white"
                    style={{
                      backgroundColor: 'var(--color-progress-fill)',
                      boxShadow: 'var(--color-progress-glow)'
                    }}
                    title="Explore Projects Repository"
                  >
                    <FolderGit2 size={13} />
                    <span>Explore Projects</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    type="button"
                    onClick={() => openApp('contact')}
                    className="px-3 py-2 rounded-xl text-xs font-mono border border-[var(--color-border-default)] hover:bg-[var(--color-btn-default-hover)] cursor-pointer transition-all active:scale-95 text-[var(--color-text-primary)] flex items-center gap-1.5"
                    title="Send Direct Transmission"
                  >
                    <Mail size={13} />
                    <span>Get in Touch</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Operating System Interactive Action Bridges & Subsystem Status */}
        <div className="pt-6 border-t border-[var(--color-border-subtle)] flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>AURA OS // PROFILE SUBSYSTEM COMPLETE</span>
          </div>
          <span>END OF TRANSMISSION</span>
        </div>
      </div>
    </footer>
  );
}
