import React from 'react';
import { Bookmark, Trophy, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HonorsTimeline({ milestones, onSelectMilestone }) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <div className="relative pl-6 sm:pl-8 border-l border-amber-500/25 space-y-6 my-6">
      {milestones.map((item, idx) => (
        <div key={item.id} className="relative group">
          {/* Milestone Point Marker */}
          <div
            className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#080c14] border-amber-400 group-hover:scale-125 transition-transform flex items-center justify-center"
            style={{
              boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>

          {/* Milestone Card */}
          <div
            onClick={() => onSelectMilestone(item)}
            className="p-5 rounded-2xl border transition-all duration-200 hover:border-amber-400/40 hover:-translate-y-0.5 group cursor-pointer"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
              borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectMilestone(item);
              }
            }}
            aria-label={`View details for ${item.title}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400">
                {item.date}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/20">
                {item.result}
              </span>
            </div>

            <h4 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-amber-300 transition-colors">
              {item.title}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t text-[11px] font-mono text-slate-400" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <span className="text-slate-500">{item.organization}</span>
              <span className="text-slate-500 group-hover:text-amber-300 transition-colors flex items-center gap-1">
                <span>View Milestone</span>
                <ArrowRight size={11} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

