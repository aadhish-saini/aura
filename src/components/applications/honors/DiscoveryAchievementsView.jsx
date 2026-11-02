import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Lock,
  CheckCircle2,
  Sparkles,
  Monitor,
  Terminal,
  Cpu,
  Layers,
  Gamepad2,
  Compass
} from 'lucide-react';
import { getAllAchievementsWithStatus } from '../../../utils/achievementManager';

const ICON_MAP = {
  Monitor,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Gamepad2,
  Compass,
  Trophy
};

export default function DiscoveryAchievementsView() {
  const [achievements, setAchievements] = useState(getAllAchievementsWithStatus);

  useEffect(() => {
    const handleUpdate = () => {
      setAchievements(getAllAchievementsWithStatus());
    };

    window.addEventListener('aura-achievements-updated', handleUpdate);
    window.addEventListener('aura-achievement-unlocked', handleUpdate);
    return () => {
      window.removeEventListener('aura-achievements-updated', handleUpdate);
      window.removeEventListener('aura-achievement-unlocked', handleUpdate);
    };
  }, []);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Header Card */}
      <div
        className="p-6 rounded-2xl border backdrop-blur-xl relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          borderColor: 'rgba(245, 158, 11, 0.35)',
          boxShadow: '0 0 30px rgba(245, 158, 11, 0.1)'
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 text-amber-300 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Trophy size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-amber-400">
                  EXPLORATION TELEMETRY
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] font-mono text-cyan-300">
                  {unlockedCount} OF {achievements.length} UNLOCKED
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                Discovery Achievements & Easter Eggs
              </h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-2xl font-mono font-bold text-amber-400">
              {progressPercent}%
            </span>
            <span className="text-[10px] font-mono text-neutral-400 block">
              COMPLETION RATE
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans mt-3">
          Explore the operating system, inspect projects, execute CLI commands, and uncover hidden features to unlock the complete set of AURA milestones.
        </p>
      </div>

      {/* Grid of 7 Discovery Achievements */}
      <div>
        <div className="mb-4">
          <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
            ACHIEVEMENT LOG
          </span>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
            System Milestones & Hidden Challenges
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {achievements.map((ach) => {
            const IconComp = ICON_MAP[ach.icon] || Trophy;

            return (
              <div
                key={ach.id}
                className={`p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 ${
                  ach.unlocked
                    ? 'bg-amber-500/[0.06] border-amber-500/35 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                    : 'bg-white/[0.02] border-white/5 opacity-75'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    ach.unlocked
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-500'
                  }`}
                >
                  {ach.unlocked ? <IconComp size={20} /> : <Lock size={18} />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 font-semibold truncate">
                      {ach.category}
                    </span>
                    <span
                      className={`px-2 py-0.2 rounded text-[9px] font-mono font-semibold border ${
                        ach.unlocked
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                      }`}
                    >
                      {ach.unlocked ? 'UNLOCKED' : 'LOCKED'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight truncate">
                    {ach.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans mt-0.5">
                    {ach.unlocked ? ach.description : ach.hint}
                  </p>

                  {ach.unlocked && ach.unlockedAt && (
                    <div className="mt-2 pt-2 border-t border-white/10 text-[10px] font-mono text-emerald-400/80 flex items-center gap-1">
                      <CheckCircle2 size={11} />
                      <span>Unlocked: {new Date(ach.unlockedAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

