import React, { useRef, useState, useEffect, useCallback } from 'react';
import AboutHero from './about/AboutHero';
import AboutStory from './about/AboutStory';
import AboutLearning from './about/AboutLearning';
import AboutCraft from './about/AboutCraft';
import AboutBeyond from './about/AboutBeyond';
import AboutTechJourney from './about/AboutTechJourney';
import AboutVision from './about/AboutVision';
import AboutClosing from './about/AboutClosing';
import AboutNav from './about/AboutNav';
import { isReducedMotion } from '../../utils/windowAnimations';
import './about/AboutApp.css';

export default function AboutApp({ openApp }) {
  const containerRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState('story-section-01');

  // Scroll to section helper
  const scrollToChapter = useCallback((chapterId) => {
    const el = containerRef.current?.querySelector(`#${chapterId}`);
    if (el) {
      el.scrollIntoView({
        behavior: isReducedMotion() ? 'auto' : 'smooth',
        block: 'start'
      });
      setActiveChapter(chapterId);
    }
  }, []);

  const scrollToStory = useCallback(() => {
    scrollToChapter('story-section-01');
  }, [scrollToChapter]);

  // Progressive scroll-reveal using IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('.about-section');
    if (isReducedMotion()) {
      sections.forEach((sec) => sec.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            entry.target.classList.remove('not-revealed');
            if (entry.target.id) {
              setActiveChapter(entry.target.id);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    sections.forEach((sec) => {
      sec.classList.add('not-revealed');
      observer.observe(sec);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="about-app-container flex flex-col h-full overflow-y-auto select-text font-sans about-grid-texture"
      role="article"
      aria-label="About Aadhish Saini"
    >
      {/* Section 01: Hero / Introduction */}
      <AboutHero onScrollToStory={scrollToStory} />

      {/* Discreet Sticky Story Navigation Pill Track */}
      <AboutNav
        activeChapter={activeChapter}
        onSelectChapter={scrollToChapter}
      />

      {/* Main Narrative Flow */}
      <main className="flex-1 flex flex-col">
        {/* Section 02: 01 — Where It Began */}
        <AboutStory />

        {/* Section 03: 02 — The Way I Learn */}
        <AboutLearning />

        {/* Section 04: 03 — What I Build */}
        <AboutCraft />

        {/* Section 05: 04 — Beyond The Classroom */}
        <AboutBeyond />

        {/* Section 06: 05 — My Technical Journey */}
        <AboutTechJourney />

        {/* Section 07: 06 — What I'm Working Towards */}
        <AboutVision />

        {/* Section 08: 07 — The Story Continues */}
        <AboutClosing openApp={openApp} />
      </main>

      {/* Subtle Bottom System Edge Decal */}
      <div 
        className="h-8 px-6 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)'
        }}
      >
        <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-status-dot)]" />
            <span>AURA OS // PROFILE SPECIFICATION</span>
          </div>
          <span className="hidden sm:inline">VERIFIED DEVELOPER RECORD // 2026</span>
        </div>
      </div>
    </div>
  );
}
