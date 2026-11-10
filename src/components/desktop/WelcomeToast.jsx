import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldCheck, Award, Gamepad2, Sparkles, X } from 'lucide-react';
import {
  isWelcomeToastPending,
  markWelcomeToastHandled,
  recordBootWelcomeNotification
} from '../../utils/notificationManager';

export default function WelcomeToast() {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    // 1. Initial boot welcome notification check
    if (isWelcomeToastPending()) {
      const notif = recordBootWelcomeNotification();
      setNotification(notif);
      setIsVisible(true);

      // Automatically dismiss the floating welcome notification after 6 seconds
      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        markWelcomeToastHandled();
        timerRef.current = null;
      }, 6000);
    }

    // 2. Listen for custom desktop toast events (e.g. Honors Viewed)
    const handleDesktopToast = (e) => {
      const data = e.detail;
      if (!data) return;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setNotification(data);
      setIsVisible(true);

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        timerRef.current = null;
      }, 6000);
    };

    window.addEventListener('aura-desktop-toast', handleDesktopToast);

    return () => {
      window.removeEventListener('aura-desktop-toast', handleDesktopToast);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleManualClose = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsVisible(false);
    markWelcomeToastHandled();
  }, []);

  if (!isVisible || !notification) return null;

  const isAward = notification.icon === 'Award';
  const isGaming = notification.icon === 'Gamepad2';
  const categoryLabel = notification.category || 'SYSTEM // WELCOME';
  const statusLabel = notification.status || 'READY';
  const footerLabel = notification.footerLabel || 'AURA // WORKSPACE ACTIVE';
  const accentGradient =
    notification.accentGradient ||
    'linear-gradient(90deg, #38bdf8, #06b6d4, #10b981)';

  return (
    <aside
      role="alert"
      aria-live="polite"
      className="fixed bottom-14 right-3 left-3 sm:left-auto sm:right-6 sm:bottom-16 z-[100] max-w-sm sm:max-w-md w-auto select-none animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div
        key={notification.id || notification.title}
        className="p-4 sm:p-5 rounded-2xl border shadow-2xl backdrop-blur-2xl font-sans relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(8, 14, 26, 0.95)',
          borderColor: isGaming
            ? 'rgba(16, 185, 129, 0.4)'
            : isAward
            ? 'rgba(245, 158, 11, 0.4)'
            : 'rgba(56, 189, 248, 0.4)',
          boxShadow: isGaming
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(16, 185, 129, 0.2)'
            : isAward
            ? '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(245, 158, 11, 0.2)'
            : '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.2)',
        }}
      >
        {/* Animated Top Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: accentGradient,
          }}
        />

        <div className="flex items-start gap-3.5">
          {/* Badge Icon */}
          <div className="relative shrink-0 mt-0.5">
            <div
              className={`w-11 h-11 rounded-xl border flex items-center justify-center shadow-lg ${
                isGaming
                  ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/30 border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : isAward
                  ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/30 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-gradient-to-br from-sky-500/20 to-cyan-500/30 border-sky-400/50 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              }`}
            >
              {isGaming ? (
                <Gamepad2 size={22} className="text-emerald-400" />
              ) : isAward ? (
                <Award size={22} className="text-amber-400" />
              ) : (
                <ShieldCheck size={22} className="text-sky-400 animate-pulse" />
              )}
            </div>
            <span
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                isGaming
                  ? 'bg-emerald-400 text-slate-950'
                  : isAward
                  ? 'bg-amber-400 text-slate-950'
                  : 'bg-emerald-400 text-slate-950'
              }`}
            >
              {isGaming ? '★' : isAward ? '★' : '✓'}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border flex items-center gap-1 ${
                    isGaming
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : isAward
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                  }`}
                >
                  <Sparkles size={10} />
                  <span>{categoryLabel}</span>
                </span>
                <span
                  className={`text-[10px] font-mono flex items-center gap-1 ${
                    isGaming
                      ? 'text-emerald-400'
                      : isAward
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      isGaming
                        ? 'bg-emerald-400'
                        : isAward
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                    }`}
                  />
                  <span>{statusLabel}</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleManualClose}
                aria-label="Close notification"
                className="text-slate-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight mb-1">
              {notification.title}
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed font-sans font-light">
              {notification.description}
            </p>

            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span
                className={
                  isGaming
                    ? 'text-emerald-400/80'
                    : isAward
                    ? 'text-amber-400/80'
                    : 'text-sky-400/80'
                }
              >
                {footerLabel}
              </span>
              <span className="text-slate-500">{notification.timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
