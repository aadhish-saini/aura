import React from 'react';
import SystemHeader from './SystemHeader';
import BrandLogo from './BrandLogo';
import OrbitalLoader from './OrbitalLoader';
import BootStatus from './BootStatus';
import BootProgress from './BootProgress';
import SystemFooter from './SystemFooter';
import WelcomeOverlay from './WelcomeOverlay';
import { useBootSequence } from '../hooks/useBootSequence';
import '../styles/boot-screen.css';

export default function BootScreen({ theme, onToggleTheme, onEnterWorkspace }) {
  const {
    progress,
    currentStage,
    showWelcome,
    restartBoot,
    completeBoot,
    handleLogoClick,
  } = useBootSequence();

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
        onSkip={completeBoot}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      {/* Main Center Boot Stage */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-20 px-6 py-12">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto" id="boot-stack">
          {/* Centered AURA Monogram Brandmark */}
          <BrandLogo
            onClick={handleLogoClick}
            disabled={showWelcome}
          />

          {/* Main Typography Header */}
          <h1
            className="text-3xl md:text-4xl lg:text-[42px] font-medium tracking-tight mb-2 select-none transition-colors duration-300"
            style={{ color: 'var(--color-text-primary)' }}
          >
            AURA
          </h1>

          <p
            className="text-xs md:text-sm tracking-[0.25em] uppercase font-light font-mono mb-12 select-none transition-colors duration-300"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Aadhish's Unified Runtime Architecture
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

      {/* Welcome / Workspace Transition Modal Overlay */}
      <WelcomeOverlay
        isVisible={showWelcome}
        onEnterWorkspace={onEnterWorkspace}
      />
    </div>
  );
}
