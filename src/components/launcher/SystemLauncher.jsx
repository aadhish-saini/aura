import React, { useState } from 'react';
import BrandLogo from '../BrandLogo';
import ThemeToggle from '../ThemeToggle';
import { ArrowRight, Monitor, AlertCircle } from 'lucide-react';
import './SystemLauncher.css';

export default function SystemLauncher({
  theme,
  onToggleTheme,
  onBoot,
  onRequestFullscreen
}) {
  const [fullscreenNotice, setFullscreenNotice] = useState(null);
  const [isBooting, setIsBooting] = useState(false);

  /**
   * Primary action: Request Fullscreen through Fullscreen API and boot
   */
  const handleBootSystem = async () => {
    if (isBooting) return;
    setIsBooting(true);

    let fsSucceeded = false;
    try {
      if (onRequestFullscreen) {
        const res = await onRequestFullscreen();
        fsSucceeded = res?.success ?? false;
      }
    } catch (err) {
      console.warn('Browser denied or does not support fullscreen request:', err);
      fsSucceeded = false;
    }

    // Immediately start the boot animation after fullscreen request is initiated
    // Continues smoothly even if fullscreen is denied or unavailable
    onBoot({ withFullscreen: fsSucceeded });
  };

  /**
   * Secondary action: Boot directly in windowed mode
   */
  const handleSkipFullscreen = () => {
    if (isBooting) return;
    setIsBooting(true);
    onBoot({ withFullscreen: false });
  };

  return (
    <div
      className="launcher-container antialiased min-h-screen flex flex-col justify-between selection:bg-neutral-800 relative font-sans overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-bg-app)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 p-6 md:p-8 flex justify-between items-center">
        <div
          className="flex items-center gap-2.5 text-xs font-mono tracking-wider opacity-75 hover:opacity-100 transition-opacity"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              backgroundColor: 'var(--color-status-dot)',
              boxShadow: 'var(--color-status-glow)'
            }}
          />
          <span className="hidden sm:inline">AADHISH OS // WORKSPACE LAUNCHER</span>
          <span className="sm:hidden">AADHISH OS</span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      {/* Main Center Stage */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-20 px-6 py-12">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto launcher-card animate-in fade-in duration-500">
          {/* AADHISH OS Emblem Brandmark */}
          <div className="launcher-brand-wrapper">
            <BrandLogo />
          </div>

          {/* Title & Subtitle */}
          <h1
            className="text-3xl md:text-5xl font-medium tracking-tight mb-2 select-none transition-colors duration-300"
            style={{ color: 'var(--color-text-primary)' }}
          >
            AADHISH OS
          </h1>

          <p
            className="text-xs md:text-sm tracking-[0.25em] uppercase font-light font-mono mb-8 select-none transition-colors duration-300"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            A Personal Developer Environment
          </p>

          {/* Non-intrusive Fullscreen Error Notice if any */}
          {fullscreenNotice && (
            <div
              className="mb-6 px-4 py-2.5 rounded-lg border text-xs font-mono flex items-center gap-2 max-w-md animate-in fade-in duration-200"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.3)',
                color: '#f87171'
              }}
            >
              <AlertCircle size={15} className="shrink-0" />
              <span>{fullscreenNotice}</span>
            </div>
          )}

          {/* Action Buttons Group */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs">
            {/* Primary Action Button: BOOT SYSTEM */}
            <button
              id="boot-system-btn"
              type="button"
              onClick={handleBootSystem}
              disabled={isBooting}
              className="boot-primary-btn group w-full py-3.5 px-6 rounded-xl font-mono text-sm font-semibold tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer shadow-lg active:scale-95 disabled:opacity-80"
              style={{
                backgroundColor: 'var(--color-progress-fill)',
                boxShadow: 'var(--color-progress-glow)',
                color: '#050706'
              }}
              title="Boot system into fullscreen interactive desktop"
            >
              <span className="tracking-wide">BOOT SYSTEM</span>
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {/* Secondary Action: VIEW PORTFOLIO WITHOUT FULLSCREEN */}
            <button
              id="skip-fullscreen-btn"
              type="button"
              onClick={handleSkipFullscreen}
              disabled={isBooting}
              className="w-full py-2.5 px-4 rounded-xl border text-xs font-mono tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: 'var(--color-btn-default-bg)',
                borderColor: 'var(--color-border-default)',
                color: 'var(--color-text-secondary)'
              }}
              title="Start OS simulation in windowed browser view"
            >
              <Monitor size={14} className="opacity-75" />
              <span>VIEW PORTFOLIO WITHOUT FULLSCREEN</span>
            </button>

            {/* Small Instruction Notice */}
            <p
              className="text-[11px] font-mono tracking-wider mt-2 select-none"
              style={{ color: 'var(--color-text-muted)' }}
            >
              An interactive developer workspace
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Footer Watermark Bar */}
      <footer
        className="w-full p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center text-xs font-mono tracking-wider relative z-20 gap-3 border-t select-none"
        style={{
          borderColor: 'var(--color-border-subtle)',
          backgroundColor: 'var(--color-footer-bg)'
        }}
      >
        <div className="flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--color-status-dot)' }}
          />
          <span>STATUS: KERNEL READY</span>
          <span style={{ color: 'var(--color-text-muted)' }}>|</span>
          <span className="hidden sm:inline">AUTHENTIC SIMULATION</span>
        </div>

        <div className="flex items-center gap-2 text-right text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
          <span>AADHISH OS</span>
          <span>//</span>
          <span>Build 26100.workstation</span>
        </div>
      </footer>
    </div>
  );
}
