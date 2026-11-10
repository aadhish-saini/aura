import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Compass, Sparkles, X } from 'lucide-react';
import {
  getWelcomeTriggerInfo,
  isDiscoveryHintPending,
  markDiscoveryHintShown,
  playNotificationSound
} from '../../utils/notificationManager';
import { advanceHintStage } from '../../utils/easterEggManager';

export default function DiscoveryHintNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const presentationTimerRef = useRef(null);
  const dismissTimerRef = useRef(null);

  const startPresentationTimer = useCallback((triggerTime) => {
    if (presentationTimerRef.current) return;
    if (!isDiscoveryHintPending()) return;

    const elapsed = Date.now() - triggerTime;
    const delay = Math.max(0, 14000 - elapsed);

    presentationTimerRef.current = setTimeout(() => {
      presentationTimerRef.current = null;
      if (!isDiscoveryHintPending()) return;

      setIsVisible(true);
      playNotificationSound('default');
      markDiscoveryHintShown();
      advanceHintStage(1);

      // Automatically dismiss each hint notification after 6 seconds
      dismissTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        dismissTimerRef.current = null;
      }, 6000);
    }, delay);
  }, []);

  useEffect(() => {
    // If already shown in this boot session, do not start timer
    if (!isDiscoveryHintPending()) return;

    // Check if welcome notification was already triggered
    const { timestamp, sessionId } = getWelcomeTriggerInfo();
    const currentSessionId =
      (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aura_boot_session_id')) ||
      sessionId;

    if (timestamp && sessionId === currentSessionId) {
      startPresentationTimer(timestamp);
    }

    // Listen for welcome notification trigger
    const handleWelcomeTrigger = (e) => {
      const time = e.detail?.timestamp || Date.now();
      startPresentationTimer(time);
    };

    window.addEventListener('aura-welcome-triggered', handleWelcomeTrigger);

    // If gaming easter egg is unlocked, clean up and hide immediately
    const handleAchievementUnlock = (e) => {
      const ach = e.detail;
      if (ach?.id === 'game-lover' || ach?.id === 'secret-gaming-easter-egg') {
        if (presentationTimerRef.current) {
          clearTimeout(presentationTimerRef.current);
          presentationTimerRef.current = null;
        }
        if (dismissTimerRef.current) {
          clearTimeout(dismissTimerRef.current);
          dismissTimerRef.current = null;
        }
        setIsVisible(false);
      }
    };

    window.addEventListener('aura-achievement-unlocked', handleAchievementUnlock);

    return () => {
      window.removeEventListener('aura-welcome-triggered', handleWelcomeTrigger);
      window.removeEventListener('aura-achievement-unlocked', handleAchievementUnlock);
      if (presentationTimerRef.current) {
        clearTimeout(presentationTimerRef.current);
        presentationTimerRef.current = null;
      }
      if (dismissTimerRef.current) {
        clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = null;
      }
    };
  }, [startPresentationTimer]);

  const handleManualDismiss = useCallback(() => {
    if (presentationTimerRef.current) {
      clearTimeout(presentationTimerRef.current);
      presentationTimerRef.current = null;
    }
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
      dismissTimerRef.current = null;
    }
    setIsVisible(false);
    markDiscoveryHintShown();
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-14 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-16 z-50 max-w-sm sm:max-w-md w-auto select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div
        className="p-4 sm:p-5 rounded-2xl border shadow-2xl backdrop-blur-2xl font-sans relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(8, 14, 26, 0.95)',
          borderColor: 'rgba(56, 189, 248, 0.35)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)',
        }}
      >
        {/* Subtle top indicator bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)',
          }}
        />

        <div className="flex items-start gap-3.5">
          {/* Subtle System Discovery Icon */}
          <div className="relative shrink-0 mt-0.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/30 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Compass size={22} className="text-cyan-400" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center gap-1">
                  <Sparkles size={10} />
                  <span>AURA // SYSTEM DISCOVERY</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleManualDismiss}
                aria-label="Close notification"
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1">
              Something Lies Beneath the Interface
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
              Every system has something beyond what meets the eye. AURA is no exception. Look a little closer.
            </p>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="text-cyan-400/80">AURA // ANOMALY DETECTED</span>
              <span className="text-slate-500">LOOK CLOSER</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
