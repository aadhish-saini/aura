import React from 'react';
import { Trophy, FileCheck2, Users, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HonorsFeatured({ featured, onSelectAchievement }) {
  if (!featured) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-400 font-mono text-xs tracking-widest uppercase flex items-center gap-1.5">
          <Trophy size={13} className="text-amber-400" />
          <span>CONFIRMED COMPETITION RECORD</span>
        </span>
      </div>

      <div
        className="relative rounded-2xl border p-6 sm:p-8 overflow-hidden transition-all duration-300 group"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 25, 38, 0.9) 0%, rgba(10, 14, 24, 0.95) 100%)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          boxShadow: '0 12px 35px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(251, 191, 36, 0.15)',
        }}
      >
        {/* Subtle Ambient Golden Radial Glow */}
        <div
          className="absolute -top-12 -right-12 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(circle, #f59e0b 0%, #d4af37 40%, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left Column: Ranking Graphic & Event Title */}
          <div className="flex-1">
            {/* Top metadata pills */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-300">
                {featured.status}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/25 flex items-center gap-1">
                <Users size={11} />
                <span>Team: {featured.team}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/[0.03] border border-white/5">
                {featured.organization}
              </span>
            </div>

            {/* Event Name */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {featured.title}
            </h2>

            {/* Narrative description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl mb-5">
              {featured.description}
            </p>

            {/* Highlights List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {featured.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                  <CheckCircle2 size={13} className="text-amber-400/90 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* Inspect Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectAchievement(featured)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-amber-200 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.15)] group"
              >
                <span>Inspect Official Dossier</span>
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Heroic Rank Display & Certificate Badge */}
          <div
            className="w-full lg:w-72 p-5 rounded-2xl border flex flex-col items-center text-center shrink-0"
            style={{
              backgroundColor: 'rgba(15, 20, 32, 0.75)',
              borderColor: 'rgba(245, 158, 11, 0.25)',
            }}
          >
            {/* Big Ranking Number */}
            <div className="mb-2">
              <span className="text-6xl sm:text-7xl font-extrabold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600">
                {featured.rank}
              </span>
              <div className="text-[11px] font-mono tracking-widest text-amber-300 uppercase font-semibold mt-1">
                LEADERBOARD RANK
              </div>
            </div>

            {/* Contest Scope */}
            <div className="text-xs text-slate-300 font-mono mb-4">
              Among <span className="text-white font-bold">{featured.totalTeams} Competing Teams</span>
            </div>

            {/* Certificate Status Box */}
            <div
              className="w-full p-3 rounded-xl border flex items-center justify-between gap-2.5 text-left"
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.06)',
                borderColor: 'rgba(245, 158, 11, 0.2)',
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <FileCheck2 size={16} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono text-amber-300 font-semibold block truncate">
                  {featured.recognition}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block">
                  Document On File
                </span>
              </div>
              <ShieldCheck size={16} className="text-emerald-400 shrink-0 ml-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

