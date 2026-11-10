import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { AlertCircle, X } from 'lucide-react';

/**
 * Windows-Inspired Blocking System Notice Dialog for Projects Under Development
 *
 * Temporarily locks the entire AURA desktop interface while open.
 * Features Windows-style error feedback on outside clicks:
 * plays /notification_sounds/dialogue_box_sound.mp3 and triggers a horizontal shake & emphasis.
 */
export default function DevelopmentNoticeDialog({ isOpen, onClose, category }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const dialogRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const closeBtnRef = useRef(null);
  const audioRef = useRef(null);
  const lastSoundTimeRef = useRef(0);
  const shakeTimerRef = useRef(null);
  const exitTimerRef = useRef(null);

  // Play dialogue box error sound with throttling to prevent overlapping audio
  const playDialogueSound = useCallback(() => {
    const now = Date.now();
    if (now - lastSoundTimeRef.current < 260) {
      return;
    }
    lastSoundTimeRef.current = now;

    try {
      if (!audioRef.current) {
        audioRef.current = new Audio('/notification_sounds/dialogue_box_sound.mp3');
        audioRef.current.volume = 0.6;
        audioRef.current.preload = 'auto';
      }
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Graceful handling of browser autoplay restrictions
        });
      }
    } catch (e) {
      // Graceful error handling
    }
  }, []);

  // Trigger Windows-style modal feedback: horizontal shake, visual emphasis, and sound
  const triggerShakeAndSound = useCallback(() => {
    setIsShaking(false);
    requestAnimationFrame(() => {
      setIsShaking(true);
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      shakeTimerRef.current = setTimeout(() => {
        setIsShaking(false);
        shakeTimerRef.current = null;
      }, 390);
    });

    playDialogueSound();
  }, [playDialogueSound]);

  // Handle outside click / backdrop click
  const handleBackdropInteraction = (e) => {
    e.preventDefault();
    e.stopPropagation();
    triggerShakeAndSound();
  };

  // Graceful dismissal with closing transition
  const handleDismiss = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    exitTimerRef.current = setTimeout(() => {
      setIsExiting(false);
      onClose();
    }, 180);
  }, [isExiting, onClose]);

  // Focus trap, body scroll lock, and keyboard handler
  useEffect(() => {
    if (!isOpen) {
      setIsExiting(false);
      setIsShaking(false);
      return;
    }

    // Autofocus primary button on mount
    const focusTimer = setTimeout(() => {
      primaryBtnRef.current?.focus();
    }, 40);

    // Lock body scrolling
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Global key listener with capture phase to prevent background shortcut triggers
    const handleKeyDown = (e) => {
      // Escape key must NOT dismiss the dialog
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        triggerShakeAndSound();
        return;
      }

      // Trap focus inside modal
      if (e.key === 'Tab') {
        const focusables = [closeBtnRef.current, primaryBtnRef.current].filter(Boolean);
        if (focusables.length < 2) return;

        if (e.shiftKey) {
          // Shift + Tab: backwards
          if (document.activeElement === focusables[0]) {
            e.preventDefault();
            focusables[focusables.length - 1].focus();
          }
        } else {
          // Tab: forwards
          if (document.activeElement === focusables[focusables.length - 1]) {
            e.preventDefault();
            focusables[0].focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown, true);
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [isOpen, triggerShakeAndSound]);

  // Cleanup audio resource on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current = null;
      }
    };
  }, []);

  if (!isOpen || typeof document === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      role="presentation"
      className={`aura-blocking-overlay fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 select-none transition-opacity duration-200 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      onMouseDown={handleBackdropInteraction}
      onClick={handleBackdropInteraction}
    >
      {/* Full-screen Dark Backdrop Veil with Backdrop Blur */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-md pointer-events-none transition-opacity duration-200" />

      {/* Modal Dialog Box */}
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="aura-dev-notice-heading"
        aria-describedby="aura-dev-notice-message"
        tabIndex={-1}
        className={`relative z-10 w-full max-w-md rounded-2xl border shadow-2xl backdrop-blur-2xl font-sans text-left overflow-hidden transition-all duration-200 outline-none ${
          isExiting
            ? 'scale-95 opacity-0'
            : 'scale-100 opacity-100 animate-in fade-in zoom-in-95 duration-200'
        } ${isShaking ? 'aura-dialog-shake aura-dialog-emphasis' : ''}`}
        style={{
          backgroundColor: 'rgba(8, 14, 26, 0.98)',
          borderColor: isShaking ? 'rgba(245, 158, 11, 0.9)' : 'rgba(56, 189, 248, 0.35)',
          boxShadow: isShaking
            ? '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(245, 158, 11, 0.4), 0 0 0 2px rgba(245, 158, 11, 0.8)'
            : '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.15)',
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Top Accent Gradient Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #06b6d4, #38bdf8)',
          }}
        />

        {/* Dialog Header / System Label Bar */}
        <div className="flex items-center justify-between gap-2 px-5 sm:px-6 pt-5 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase text-amber-400/90">
              AURA SYSTEM NOTICE
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={handleDismiss}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <X size={16} />
          </button>
        </div>

        {/* Dialog Main Content */}
        <div className="px-5 sm:px-6 pb-6 pt-2">
          <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
            {/* Warning Badge Icon */}
            <div className="relative shrink-0 mt-0.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-cyan-500/15 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                <AlertCircle size={22} className="text-amber-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              {/* Subheading */}
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[11px] font-mono font-semibold tracking-wider uppercase text-amber-400/90">
                  Under Development.
                </span>
              </div>

              {/* Main Heading */}
              <h3
                id="aura-dev-notice-heading"
                className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug"
              >
                More Is In The Making.
              </h3>
            </div>
          </div>

          {/* Message Body */}
          <div
            id="aura-dev-notice-message"
            className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed mb-6"
          >
            <p>
              This section is still evolving. More projects, experiments, and creative work are currently in development.
            </p>
            <p>
              I'm constantly learning, building, and pushing beyond what's possible. There's more to come.
            </p>
          </div>

          {/* Dialog Action Buttons */}
          <div className="flex items-center justify-end pt-3 border-t border-white/10">
            <button
              ref={primaryBtnRef}
              type="button"
              onClick={handleDismiss}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-mono text-xs font-bold tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              UNDERSTOOD
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

