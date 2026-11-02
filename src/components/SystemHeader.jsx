import React from 'react';
import { RotateCw } from 'lucide-react';

export default function SystemHeader({ onRestart, onSkip }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 p-3 sm:p-6 md:p-8 flex justify-between items-center pointer-events-auto">
      {/* Boot Telemetry Tag */}
      <div 
        className="flex items-center gap-2.5 text-xs font-mono tracking-wider opacity-75 hover:opacity-100 transition-opacity"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <span 
          className="inline-block w-2 h-2 rounded-full"
          style={{
            backgroundColor: 'var(--color-status-dot)',
            boxShadow: 'var(--color-status-glow)',
          }}
        />
        <span className="hidden sm:inline">UEFI 2.80 // SECURE BOOT (ACTIVE)</span>
        <span className="sm:hidden">UEFI SECURE</span>
      </div>

      {/* Quick Navigation Glass Buttons */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Reboot Diagnostic Button */}
        <button
          type="button"
          onClick={onRestart}
          className="px-3 py-1.5 rounded-md text-xs font-mono tracking-wider transition-all backdrop-blur-md flex items-center gap-1.5 cursor-pointer border hover:brightness-110 active:scale-95"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)',
            color: 'var(--color-btn-default-text)',
          }}
          title="Restart Boot Sequence"
          aria-label="Restart Boot Sequence"
        >
          <RotateCw size={13} className="transition-transform group-hover:rotate-45" />
          <span className="hidden sm:inline">RESTART</span>
        </button>

        {/* Skip to Workspace Button */}
        <button
          type="button"
          onClick={onSkip}
          className="px-3.5 py-1.5 rounded-md text-xs font-mono font-medium tracking-wider transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer border shadow-lg group hover:brightness-110 active:scale-95"
          style={{
            backgroundColor: 'var(--color-btn-accent-bg)',
            borderColor: 'var(--color-btn-accent-border)',
            color: 'var(--color-btn-accent-text)',
          }}
          title="Bypass boot loading"
          aria-label="Skip to Desktop (Escape)"
        >
          <span>SKIP TO DESKTOP</span>
          <span 
            className="text-[10px] px-1.5 py-0.5 rounded transition-colors"
            style={{
              backgroundColor: 'var(--color-badge-bg)',
              color: 'var(--color-badge-text)',
            }}
          >
            ESC
          </span>
        </button>
      </div>
    </header>
  );
}
