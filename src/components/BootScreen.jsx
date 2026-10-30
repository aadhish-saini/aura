import React from 'react';
import SystemHeader from './SystemHeader';
import BrandLogo from './BrandLogo';
import OrbitalLoader from './OrbitalLoader';
import BootStatus from './BootStatus';
import BootProgress from './BootProgress';
import SystemFooter from './SystemFooter';
import { useBootSequence } from '../hooks/useBootSequence';
import '../styles/boot-screen.css';

export default function BootScreen({ theme, onToggleTheme, onEnterWorkspace, bootNotice }) {
  const {
    progress,
    currentStage,
    isCompleted,
    restartBoot,
    completeBoot,
    handleLogoClick,
  } = useBootSequence({ onComplete: onEnterWorkspace });

  return (
    <div
      className="antialiased min-h-screen flex flex-col justify-between selection:bg-neutral-800 relative font-sans overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'var(--color-bg-app)',
        color: 'var(--color-text-primary)',
      }}
    >
      {/* Top System Bar */}
      <SystemHeader
        onRestart={restartBoot}
        onSkip={() => completeBoot(true)}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* Non-intrusive Notice (e.g. Fullscreen unavailable) */}
      {bootNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className="px-3.5 py-1.5 rounded-lg border text-xs font-mono shadow-md backdrop-blur-md"
            style={{
              backgroundColor: 'var(--color-bg-panel)',
              borderColor: 'var(--color-border-default)',
              color: 'var(--color-text-secondary)',
            }}
          >
            {bootNotice}
          </div>
        </div>
      )}

      {/* Main Center Boot Stage */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-20 px-6 py-12">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto" id="boot-stack">
          {/* Centered AURA Monogram Brandmark */}
          <BrandLogo
            onClick={handleLogoClick}
            disabled={isCompleted}
          />

          {/* Main Typography Header */}
          <h1
            className="text-3xl md:text-4xl lg:text-[42px] font-medium tracking-tight mb-2 select-none transition-colors duration-300"
            style={{ color: 'var(--color-text-primary)' }}
          >
            AADHISH OS
          </h1>

          <p
            className="text-xs md:text-sm tracking-[0.25em] uppercase font-light font-mono mb-12 select-none transition-colors duration-300"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            A Personal Developer Environment
          </p>

          {/* Windows Authentic 5-Dot Orbital Ring Loader */}
          <OrbitalLoader />

          {/* Windows-style Loading Status & Diagnostic Telemetry */}
          <BootStatus
            mainText={currentStage.main}
            subText={currentStage.sub}
          />

          {/* Progress Bar & Percentage */}
          <BootProgress progress={progress} />
        </div>
      </main>

      {/* Bottom Diagnostics & Watermark Bar */}
      <SystemFooter />
    </div>
  );
}
