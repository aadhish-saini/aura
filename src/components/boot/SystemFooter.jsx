import React from 'react';

export default function SystemFooter() {
  return (
    <footer 
      className="w-full p-3.5 sm:p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono tracking-wider relative z-20 gap-3 border-t backdrop-blur-sm transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-footer-bg)',
        borderColor: 'var(--color-border-subtle)',
        color: 'var(--color-text-secondary)',
      }}
    >
      {/* Boot Prompt / Key Shortcuts */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5">
          <span style={{ color: 'var(--color-status-dot)' }}>●</span>
          <span>BOOT: FAST_STARTUP</span>
        </span>
        <span style={{ color: 'var(--color-text-muted)' }}>|</span>
        <span className="hidden md:inline">
          PRESS{' '}
          <kbd 
            className="px-1.5 py-0.5 rounded border text-[10px]"
            style={{
              backgroundColor: 'var(--color-kbd-bg)',
              borderColor: 'var(--color-kbd-border)',
              color: 'var(--color-kbd-text)',
            }}
          >
            F8
          </kbd>{' '}
          OR{' '}
          <kbd 
            className="px-1.5 py-0.5 rounded border text-[10px]"
            style={{
              backgroundColor: 'var(--color-kbd-bg)',
              borderColor: 'var(--color-kbd-border)',
              color: 'var(--color-kbd-text)',
            }}
          >
            ESC
          </kbd>{' '}
          FOR OPTIONS
        </span>
        <span className="md:hidden">DIAGNOSTICS: NORMAL</span>
      </div>

      {/* Authentic OS Build Watermark */}
      <div 
        className="flex items-center gap-2 text-right text-[11px]"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <span>AURA Developer Edition</span>
        <span style={{ color: 'var(--color-text-muted)' }}>//</span>
        <span>Build 26100.workstation</span>
      </div>
    </footer>
  );
}
