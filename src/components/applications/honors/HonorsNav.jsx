import React from 'react';
import { HONOR_CATEGORIES } from './honorsData';
import { ArrowUpDown, Award, Trophy, Bookmark, Sparkles, CheckCircle, Gamepad2 } from 'lucide-react';

const CATEGORY_ICONS = {
  all: Sparkles,
  hackathons: Trophy,
  awards: Award,
  certifications: CheckCircle,
  milestones: Bookmark,
  secrets: Gamepad2,
};

export default function HonorsNav({ activeCategory, onSelectCategory, sortAscending, onToggleSort }) {
  return (
    <nav
      aria-label="Honors Categories and Filter"
      className="sticky top-0 z-20 px-4 sm:px-6 py-2.5 border-b backdrop-blur-md transition-colors select-none"
      style={{
        backgroundColor: 'rgba(5, 8, 16, 0.88)',
        borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
      }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar py-0.5">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          {HONOR_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const Icon = CATEGORY_ICONS[cat.id] || Sparkles;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/15 border border-amber-400/40 text-amber-300 font-medium shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                }`}
                aria-pressed={isActive}
              >
                <Icon size={13} className={isActive ? 'text-amber-400' : 'text-slate-500'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Order Toggle */}
        <button
          type="button"
          onClick={onToggleSort}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-cyan-300 hover:bg-white/[0.04] border border-slate-800 transition-colors cursor-pointer shrink-0 ml-auto"
          title={`Currently: ${sortAscending ? 'Oldest to Newest' : 'Newest to Oldest'}. Click to toggle.`}
          aria-label="Toggle chronological sorting"
        >
          <ArrowUpDown size={12} className="text-cyan-400" />
          <span className="hidden sm:inline">{sortAscending ? 'Order: Ascending' : 'Order: Chronological'}</span>
          <span className="sm:hidden">{sortAscending ? 'Asc' : 'Chrono'}</span>
        </button>
      </div>
    </nav>
  );
}

