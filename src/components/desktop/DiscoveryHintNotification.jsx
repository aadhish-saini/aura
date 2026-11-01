import React, { useState, useEffect } from 'react';
import { X, Sparkles, Terminal, MessageSquare } from 'lucide-react';
import { isHintDismissed, dismissHint, isGamingAchievementUnlocked, advanceHintStage } from '../../utils/easterEggManager';

export default function DiscoveryHintNotification({ openApp }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If already dismissed or achievement already unlocked, do not show
    if (isHintDismissed() || isGamingAchievementUnlocked()) {
      return;
    }

    // Delay presentation by 14 seconds to let the visitor settle into the desktop
    const timer = setTimeout(() => {
      if (!isHintDismissed() && !isGamingAchievementUnlocked()) {
        setIsVisible(true);
        advanceHintStage(1);
      }
    }, 14000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    dismissHint();
  };

  const handleInvestigate = () => {
    setIsVisible(false);
    dismissHint();
    if (openApp) {
      openApp('terminal');
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-14 right-4 z-40 max-w-sm w-[calc(100vw-32px)] sm:w-96 select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div
        className="p-4 rounded-xl border shadow-2xl backdrop-blur-xl font-sans relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(8, 14, 26, 0.94)',
          borderColor: 'rgba(56, 189, 248, 0.35)',
          boxShadow: '0 12px 32px -4px rgba(0, 0, 0, 0.6), 0 0 20px rgba(56, 189, 248, 0.15)',
        }}
      >
        {/* Subtle top indicator bar */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background: 'linear-gradient(90deg, #38bdf8, #34d399, #818cf8)',
          }}
        />

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span className="text-[11px] font-mono font-semibold tracking-wider text-cyan-300 uppercase">
              AURA // System Thought
            </span>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss notification"
            className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
          >
            <X size={14} />
          </button>
        </div>

        <p className="text-xs text-slate-200 leading-relaxed font-sans mb-3 pr-2">
          "I built an entire operating system, added my projects, skills and achievements... but something important is still missing. 🤔"
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono">
          <span className="text-slate-500 text-[10px]">HINT 01 OF 03</span>
          <button
            type="button"
            onClick={handleInvestigate}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer bg-cyan-500/15 border border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/25 hover:border-cyan-400 active:scale-95"
          >
            <Terminal size={12} />
            <span>Investigate CLI</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

