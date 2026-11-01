import React, { useState } from 'react';
import { Shield, HelpCircle, RefreshCw, Trophy, ChevronRight, Lock, CheckCircle2, AlertTriangle, X } from 'lucide-react';

export const MISSIONS = [
  { id: 1, name: 'INITIAL ACCESS', tag: 'M1 // HANDSHAKE' },
  { id: 2, name: 'CIPHER TRACE', tag: 'M2 // CRYPTOGRAPHY' },
  { id: 3, name: 'NETWORK RECONNAISSANCE', tag: 'M3 // SUBNET' },
  { id: 4, name: 'SECURITY PROTOCOL', tag: 'M4 // LOGIC BUFFER' },
  { id: 5, name: 'SYSTEM OVERRIDE', tag: 'M5 // CORE BREACH' },
];

export default function SystemOverrideHUD({
  activeMission,
  completedMissions,
  score,
  attempts,
  hintsUsed,
  currentMissionHints = [],
  onSelectMission,
  onUseHint,
  onResetGame,
}) {
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHintLevel, setCurrentHintLevel] = useState(1);

  // Reset hint level when active mission changes
  React.useEffect(() => {
    setCurrentHintLevel(1);
  }, [activeMission]);

  const handleRequestHint = () => {
    if (!showHintModal) {
      onUseHint();
    }
    setShowHintModal(true);
  };

  const handleNextHintLevel = () => {
    if (currentHintLevel < 3) {
      setCurrentHintLevel((prev) => prev + 1);
      onUseHint();
    }
  };

  const hintLabels = [
    'HINT LEVEL 1 // GENERAL DIRECTION',
    'HINT LEVEL 2 // INVESTIGATION CLUE',
    'HINT LEVEL 3 // LOGICAL DEDUCTION'
  ];

  const currentHintText =
    currentMissionHints[currentHintLevel - 1] ||
    'Analyze the telemetry parameters closely. Puzzles require deductive problem solving without shortcuts.';

  return (
    <header className="border-b shrink-0 select-none font-sans" style={{ borderColor: 'rgba(255, 255, 255, 0.08)', backgroundColor: 'rgba(5, 10, 20, 0.95)' }}>
      {/* Top Telemetry & Score Bar */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>AURA_OVERRIDE_v2.0</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">
            SCORE: <span className="text-emerald-400 font-semibold">{score} PTS</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-slate-400">
            ATTEMPTS: <span className="text-amber-300 font-semibold">{attempts}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Hint Trigger */}
          <button
            type="button"
            onClick={handleRequestHint}
            className="px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer border bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25"
          >
            <HelpCircle size={13} />
            <span>INTEL HINT (LVL {currentHintLevel}/3)</span>
          </button>

          {/* Reset progress */}
          <button
            type="button"
            onClick={onResetGame}
            title="Reset Game Progress"
            className="p-1 rounded text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* Mission Pipeline Stepper */}
      <div className="px-4 py-2.5 overflow-x-auto no-scrollbar flex items-center gap-2 bg-black/20">
        {MISSIONS.map((m) => {
          const isDone = completedMissions.includes(m.id);
          const isActive = activeMission === m.id;
          const isLocked = m.id > 1 && !completedMissions.includes(m.id - 1);

          return (
            <button
              key={m.id}
              type="button"
              disabled={isLocked}
              onClick={() => onSelectMission(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono shrink-0 flex items-center gap-2 transition-all border ${
                isActive
                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-200 font-bold shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                  : isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/40 cursor-pointer'
                  : isLocked
                  ? 'bg-transparent border-transparent text-slate-600 opacity-60 cursor-not-allowed'
                  : 'bg-white/[0.03] border-white/10 text-slate-300 hover:bg-white/10 cursor-pointer'
              }`}
            >
              {isDone ? (
                <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
              ) : isLocked ? (
                <Lock size={12} className="text-slate-600 shrink-0" />
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-slate-400'}`} />
              )}
              <span>{m.tag}</span>
            </button>
          );
        })}
      </div>

      {/* Hint Modal Overlay */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="max-w-md w-full p-5 rounded-2xl border shadow-2xl backdrop-blur-xl relative font-sans text-left"
            style={{
              backgroundColor: 'rgba(10, 16, 28, 0.98)',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(245, 158, 11, 0.2)',
            }}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs font-mono">
              <span className="text-amber-400 font-bold flex items-center gap-1.5">
                <HelpCircle size={14} />
                <span>{hintLabels[currentHintLevel - 1] || 'OPERATIONAL INTEL // HINT'}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowHintModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans mb-5 font-light">
              "{currentHintText}"
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              {currentHintLevel < 3 ? (
                <button
                  type="button"
                  onClick={handleNextHintLevel}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-amber-300 hover:text-white hover:bg-white/5 border border-amber-500/30 transition-colors cursor-pointer"
                >
                  Need more help? (Lvl {currentHintLevel + 1})
                </button>
              ) : (
                <span className="text-[11px] font-mono text-slate-500">
                  Maximum intel level reached
                </span>
              )}

              <button
                type="button"
                onClick={() => setShowHintModal(false)}
                className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-amber-500/20 border border-amber-500/40 text-amber-200 hover:bg-amber-500/30 cursor-pointer"
              >
                RESUME OPERATION
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

