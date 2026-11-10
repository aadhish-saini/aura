import React, { useRef, useEffect } from 'react';
import './AuraSessionMenu.css';

export default function AuraSessionMenu({
  isOpen,
  onClose,
  isFullscreen,
  onRequestFullscreen,
  onRestart,
  onShutdown
}) {
  const menuRef = useRef(null);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest('#aura-session-button')
      ) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="aura-session-popover fixed bottom-14 right-2 sm:right-4 z-50 w-72 max-w-[calc(100vw-16px)] rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl font-mono select-none animate-in fade-in zoom-in-95 duration-150"
      style={{
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: 'var(--color-border-strong)',
        color: 'var(--color-text-primary)'
      }}
      role="menu"
      aria-label="AURA Session Controls"
    >
      {/* Session Header / Branding */}
      <div
        className="px-3 py-2 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: 'var(--color-status-dot)',
              boxShadow: 'var(--color-status-glow)'
            }}
          />
          <span className="text-xs font-bold tracking-wider text-white">
            AURA SESSION
          </span>
        </div>
        <span
          className="text-[10px] tracking-widest px-1.5 py-0.5 rounded font-medium"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            color: 'var(--color-text-secondary)'
          }}
        >
          RUNTIME
        </span>
      </div>

      {/* Menu Options Group */}
      <div className="p-1 space-y-1">
        {/* Fullscreen Status Row */}
        <div
          className="w-full px-3 py-2 rounded-xl flex items-center justify-between text-xs"
          style={{ backgroundColor: 'var(--color-btn-default-bg)' }}
        >
          <div className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: isFullscreen ? 'var(--color-status-dot)' : 'var(--color-text-muted)' }}
            >
              <rect x="2" y="2.5" width="12" height="9" rx="1.75" stroke="currentColor" strokeWidth="1.25" />
              <path d="M5.5 13.5H10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] font-semibold text-white">
              {isFullscreen ? 'Fullscreen: Active' : 'Fullscreen: Windowed'}
            </span>
          </div>

          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider"
            style={{
              backgroundColor: isFullscreen ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.08)',
              color: isFullscreen ? 'var(--color-status-dot)' : 'var(--color-text-secondary)'
            }}
          >
            {isFullscreen ? 'IMMERSIVE' : 'WINDOWED'}
          </span>
        </div>

        {/* Enter Fullscreen (Only shown when not in fullscreen) */}
        {!isFullscreen && (
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              onClose();
              onRequestFullscreen();
            }}
            className="aura-session-item w-full px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer text-left group"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  borderColor: 'rgba(56, 189, 248, 0.35)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 6V2.5H6M13.5 6V2.5H10M2.5 10V13.5H6M13.5 10V13.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sky-400 group-hover:text-sky-300 transition-colors">
                  Enter Fullscreen
                </span>
                <span className="text-[9px]" style={{ color: 'var(--color-text-muted)' }}>
                  Switch to immersive display
                </span>
              </div>
            </div>
            <span className="text-[10px] text-sky-400 group-hover:translate-x-0.5 transition-transform">
              →
            </span>
          </button>
        )}

        {/* Subtle Separator */}
        <div className="my-1 border-t" style={{ borderColor: 'var(--color-border-subtle)' }} />

        {/* Restart AURA */}
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onClose();
            onRestart();
          }}
          className="aura-session-item w-full px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer text-left group"
        >
          <div
            className="w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-subtle)',
              color: 'var(--color-text-secondary)'
            }}
          >
            <svg className="w-3.5 h-3.5 group-hover:text-sky-400 transition-colors" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 8A5.5 5.5 0 1 1 11.6 4.1L13.5 6M13.5 2V6H9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-white group-hover:text-sky-400 transition-colors">
              Restart AURA
            </span>
            <span className="text-[9px]" style={{ color: 'var(--color-text-muted)' }}>
              Reboot system environment
            </span>
          </div>
        </button>

        {/* Shut Down AURA */}
        <button
          type="button"
          role="menuitem"
          onClick={() => {
            onClose();
            onShutdown();
          }}
          className="aura-session-item aura-session-shutdown w-full px-3 py-2 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer text-left group"
        >
          <div
            className="w-6 h-6 rounded-lg border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400 bg-rose-500/10 group-hover:scale-105 transition-transform"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V8M4 4.5A5.5 5.5 0 1 0 12 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-rose-400 group-hover:text-rose-300 transition-colors">
              Shut Down AURA
            </span>
            <span className="text-[9px]" style={{ color: 'var(--color-text-muted)' }}>
              Exit session & power down
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}
