import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SKILLS_DATA } from './skills/skillsData';
import SkillsNav from './skills/SkillsNav';
import SkillsOverview from './skills/SkillsOverview';
import SkillsLanguages from './skills/SkillsLanguages';
import SkillsDevTech from './skills/SkillsDevTech';
import SkillsAITech from './skills/SkillsAITech';
import SkillsDevTools from './skills/SkillsDevTools';
import SkillsInPractice from './skills/SkillsInPractice';
import SkillsRoadmap from './skills/SkillsRoadmap';
import SkillsBeyond from './skills/SkillsBeyond';
import SkillsDirection from './skills/SkillsDirection';
import SkillDetailModal from './skills/SkillDetailModal';

export default function SkillsApp({ openApp }) {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const containerRef = useRef(null);

  // Navigate to target section smoothly
  const handleSelectSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    if (!containerRef.current) return;

    const targetEl = containerRef.current.querySelector(`#${sectionId}`);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionIds = [
      'overview',
      'languages',
      'development',
      'ai-technologies',
      'developer-tools',
      'skills-in-practice',
      'learning-roadmap',
      'beyond-technologies',
      'my-direction',
    ];

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const el = container.querySelector(`#${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If section top has reached near top of container
          if (rect.top - containerTop <= 160) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Open corresponding project in ProjectsApp
  const handleOpenProject = useCallback((projectId) => {
    // Store requested project for initial mount or transition
    window.__aura_requested_project = projectId;

    // Dispatch custom event for ProjectsApp if already mounted
    window.dispatchEvent(
      new CustomEvent('aura:open-project', { detail: { projectId } })
    );

    // Open projects application window in AURA
    if (typeof openApp === 'function') {
      openApp('projects');
    }

    // Close any open inspector modal
    setSelectedSkill(null);
  }, [openApp]);

  return (
    <div className="flex flex-col h-full bg-[#080c14] text-slate-100 select-text overflow-hidden relative font-sans">
      {/* Sticky Navigation Bar */}
      <SkillsNav
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Main Scrollable Content Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth focus:outline-none"
        tabIndex={0}
      >
        {/* Section 01: Overview */}
        <SkillsOverview data={SKILLS_DATA.overview} />

        {/* Section 02: Programming Languages */}
        <SkillsLanguages
          languages={SKILLS_DATA.languages}
          onSelectSkill={setSelectedSkill}
        />

        {/* Section 03: Development Technologies */}
        <SkillsDevTech
          technologies={SKILLS_DATA.developmentTechnologies}
          onSelectSkill={setSelectedSkill}
        />

        {/* Section 04: AI & Emerging Technologies */}
        <SkillsAITech
          aiTechnologies={SKILLS_DATA.aiTechnologies}
          onSelectSkill={setSelectedSkill}
        />

        {/* Section 05: Developer Tools */}
        <SkillsDevTools tools={SKILLS_DATA.developerTools} />

        {/* Section 06: Skills in Practice */}
        <SkillsInPractice
          projects={SKILLS_DATA.skillsInPractice}
          onOpenProject={handleOpenProject}
        />

        {/* Section 07: Learning Roadmap */}
        <SkillsRoadmap roadmap={SKILLS_DATA.learningRoadmap} />

        {/* Section 08: Beyond Technologies */}
        <SkillsBeyond items={SKILLS_DATA.beyondTechnologies} />

        {/* Section 09: My Direction */}
        <SkillsDirection direction={SKILLS_DATA.myDirection} />
      </div>

      {/* Interactive Detail Modal / Inspector */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onOpenProject={handleOpenProject}
        />
      )}
    </div>
  );
}
