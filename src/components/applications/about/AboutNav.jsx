import React from 'react';

const CHAPTERS = [
  { id: 'story-section-01', num: '01', label: 'Began' },
  { id: 'story-section-02', num: '02', label: 'Learn' },
  { id: 'story-section-03', num: '03', label: 'Build' },
  { id: 'story-section-04', num: '04', label: 'Beyond' },
  { id: 'story-section-05', num: '05', label: 'Journey' },
  { id: 'story-section-06', num: '06', label: 'Vision' },
  { id: 'story-section-07', num: '07', label: 'Future' }
];

export default function AboutNav({ activeChapter, onSelectChapter }) {
  return (
    <div className="w-full max-w-5xl xl:max-w-6xl mx-auto px-3 sm:px-6 md:px-12 my-3">
      <nav 
        aria-label="Story chapter navigation"
        className="about-chapter-nav px-3.5 py-1.5 flex items-center justify-between gap-1 w-full select-none"
      >
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full justify-between">
          <span className="text-[9px] font-mono font-bold tracking-widest text-[var(--color-text-muted)] uppercase hidden sm:inline mr-2 shrink-0">
            STORY //
          </span>

          {CHAPTERS.map((chap) => {
            const isActive = activeChapter === chap.id;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => onSelectChapter(chap.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono transition-all duration-200 cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[var(--color-status-dot)] text-slate-950 font-bold shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-btn-default-hover)]'
                }`}
                title={`Jump to section ${chap.num} — ${chap.label}`}
              >
                <span>{chap.num}</span>
                <span className="hidden sm:inline text-[9px]">{chap.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
