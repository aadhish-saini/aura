import React from 'react';
import { Trophy, Award, Bookmark, CheckCircle2, FileCheck2, ArrowUpRight } from 'lucide-react';

const CATEGORY_ICONS = {
  hackathons: Trophy,
  awards: Award,
  certifications: CheckCircle2,
  milestones: Bookmark,
};

export default function HonorsList({ items, onSelectItem }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => {
        const Icon = CATEGORY_ICONS[item.category] || Trophy;

        return (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="p-5 rounded-2xl border transition-all duration-200 hover:border-amber-400/40 hover:-translate-y-0.5 group cursor-pointer flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
              borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectItem(item);
              }
            }}
            aria-label={`View details for ${item.title}`}
          >
            <div>
              {/* Card Header: Category & Result Pill */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 text-amber-400 group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.08)',
                      borderColor: 'rgba(245, 158, 11, 0.25)',
                    }}
                  >
                    <Icon size={15} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.organization}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 border border-amber-500/25 text-amber-300 shrink-0">
                  {item.rankDisplay || item.result}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-amber-200 transition-colors">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                {item.description}
              </p>

              {/* Team Pill if present */}
              {item.team && (
                <div className="mb-3 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5">
                  <span className="text-slate-500">Team:</span>
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20">
                    {item.team}
                  </span>
                </div>
              )}
            </div>

            {/* Footer: Proof & Inspect Trigger */}
            <div
              className="pt-3 border-t flex items-center justify-between text-[11px] font-mono text-slate-400"
              style={{ borderColor: 'var(--color-border-subtle)' }}
            >
              <div className="flex items-center gap-1.5 text-emerald-400/90">
                <FileCheck2 size={13} />
                <span className="truncate max-w-[170px]">
                  {item.hasCertificate ? 'Certificate on file' : 'Verified log'}
                </span>
              </div>

              <span className="text-slate-500 group-hover:text-amber-300 transition-colors flex items-center gap-0.5 shrink-0">
                <span>Inspect</span>
                <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

