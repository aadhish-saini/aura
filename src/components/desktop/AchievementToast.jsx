import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Gamepad2, Sparkles, X, ShieldCheck, Monitor, Terminal, Cpu, Layers, Compass } from 'lucide-react';
import { EASTER_EGG_ACHIEVEMENT } from '../../utils/easterEggManager';

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

export default function AchievementToast() {
  const [activeAchievement, setActiveAchievement] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleUnlock = (e) => {
      const data = e.detail || EASTER_EGG_ACHIEVEMENT;
      if (data?.id === 'game-lover' || data?.id === 'secret-gaming-easter-egg') {
        return; // Handled by dedicated hidden game discovered floating toast
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setActiveAchievement(data);

      timerRef.current = setTimeout(() => {
        setActiveAchievement(null);
        timerRef.current = null;
      }, 7000);
    };

    window.addEventListener('aura-achievement-unlocked', handleUnlock);
    return () => {
      window.removeEventListener('aura-achievement-unlocked', handleUnlock);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setActiveAchievement(null);
  };

  if (!activeAchievement) return null;

  const IconComp = ICON_MAP[activeAchievement.icon] || Trophy;

  return (
    <aside
      role="alert"
      aria-live="assertive"
      className="fixed top-4 right-3 left-3 sm:left-auto sm:right-6 sm:top-6 z-50 max-w-sm sm:max-w-md w-auto select-none animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <div
        className="p-4 sm:p-5 rounded-2xl border shadow-2xl backdrop-blur-2xl font-sans relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(10, 16, 28, 0.95)',
          borderColor: 'rgba(245, 158, 11, 0.5)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.25)',
        }}
      >
        {/* Animated Trophy Gradient Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #10b981, #06b6d4)',
          }}
        />

        <div className="flex items-start gap-3.5">
          {/* Trophy Badge Icon */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/30 border border-amber-400/60 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
              <IconComp size={24} className="animate-bounce" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[9px] font-bold">
              ★
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1">
                  <Sparkles size={10} />
                  <span>{activeAchievement.category || 'SYSTEM DISCOVERY'}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck size={11} />
                  <span>UNLOCKED</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close notification"
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1">
              {activeAchievement.title}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
              "{activeAchievement.description}"
            </p>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-amber-400/80">AURA // DISCOVERY EXPLORATION</span>
              <span className="text-slate-500">SAVED IN LOCALSTORAGE</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

