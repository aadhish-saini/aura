import React from 'react';

const SECTIONS = [
  { id: 'overview', number: '01', label: 'Overview' },
  { id: 'languages', number: '02', label: 'Languages' },
  { id: 'development', number: '03', label: 'Dev Tech' },
  { id: 'ai-technologies', number: '04', label: 'AI & Emerging' },
  { id: 'developer-tools', number: '05', label: 'Tools' },
  { id: 'skills-in-practice', number: '06', label: 'In Practice' },
  { id: 'learning-roadmap', number: '07', label: 'Roadmap' },
  { id: 'beyond-technologies', number: '08', label: 'Beyond' },
  { id: 'my-direction', number: '09', label: 'Direction' },
];

export default function SkillsNav({ activeSection, onSelectSection }) {
  return (
    <nav 
      aria-label="Skills Sections"
      className="sticky top-0 z-20 px-4 py-2 border-b backdrop-blur-md transition-colors select-none"
      style={{
        backgroundColor: 'rgba(5, 8, 16, 0.85)',
        borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;

          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onSelectSection(sec.id)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-medium shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
              }`}
            >
              <span className={`text-[10px] ${isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
                {sec.number}
              </span>
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

