import React, { useEffect, useState, useRef } from 'react';
import BrandLogo from '../BrandLogo';
import OrbitalLoader from '../OrbitalLoader';
import './ShutdownScreen.css';

const SHUTDOWN_STAGES = [
  {
    step: 1,
    title: 'Closing user applications...',
    sub: 'Stage 1/4 // Terminating active window processes'
  },
  {
    step: 2,
    title: 'Saving workspace state...',
    sub: 'Stage 2/4 // Syncing local preferences & theme'
  },
  {
    step: 3,
    title: 'Shutting down AADHISH OS...',
    sub: 'Stage 3/4 // Flushing kernel buffers & unmounting subsystems'
  },
  {
    step: 4,
    title: 'AADHISH OS has been shut down.',
    sub: 'System halted // Power off safe'
  }
];

export default function ShutdownScreen({ theme, onCompleteShutdown }) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const timerRef = useRef(null);

  useEffect(() => {
    // 4 Smooth stages lasting ~3.8 seconds total
    const timers = [];

    // Stage 1: Closing user applications (0s - 1.0s)
    timers.push(
      setTimeout(() => {
        setStageIndex(1);
        setProgress(45);
      }, 1000)
    );

    // Stage 2: Saving workspace state (1.0s - 2.0s)
    timers.push(
      setTimeout(() => {
        setStageIndex(2);
        setProgress(75);
      }, 2000)
    );

    // Stage 3: Shutting down AADHISH OS (2.0s - 3.2s)
    timers.push(
      setTimeout(() => {
        setStageIndex(3);
        setProgress(100);
      }, 3200)
    );

    // Stage 4: System Off and exit to Launcher (4.2s)
    timers.push(
      setTimeout(() => {
        if (onCompleteShutdown) {
          onCompleteShutdown();
        }
      }, 4300)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onCompleteShutdown]);

  const currentStage = SHUTDOWN_STAGES[stageIndex] || SHUTDOWN_STAGES[0];
  const isOff = stageIndex === 3;

  return (
    <div
      className={`shutdown-screen fixed inset-0 z-50 flex flex-col justify-between p-8 font-sans select-none transition-all duration-700 ${
        isOff ? 'bg-black text-white' : ''
      }`}
      style={{
        backgroundColor: isOff ? '#000000' : 'var(--color-bg-app)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Top Bar Telemetry */}
      <header className="w-full flex justify-between items-center text-xs font-mono opacity-60">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isOff ? 'bg-red-500' : 'bg-emerald-400 animate-pulse'
            }`}
          />
          <span>AADHISH OS // ACPI POWER_OFF SEQUENCE</span>
        </div>
        <div className="text-[11px]">
          <span>RUNLEVEL: 0</span>
        </div>
      </header>

      {/* Center Cinematic Stage */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-20 px-6 py-12">
        <div
          className={`flex flex-col items-center text-center max-w-lg mx-auto transition-all duration-500 ${
            isOff ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Logo with gradual dimming/scale */}
          <div className={`transition-all duration-700 ${isOff ? 'filter grayscale brightness-50' : ''}`}>
            <BrandLogo disabled={true} />
          </div>

          <h2
            className="text-2xl md:text-3xl font-medium tracking-tight mb-2 select-none transition-colors duration-300"
            style={{ color: isOff ? '#ffffff' : 'var(--color-text-primary)' }}
          >
            AADHISH OS
          </h2>

          <p
            className="text-xs tracking-[0.2em] uppercase font-light font-mono mb-8 select-none transition-colors duration-300"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {isOff ? 'System Halted' : 'A Personal Developer Environment'}
          </p>

          {/* Loader or Off indicator */}
          {!isOff ? (
            <div className="my-2">
              <OrbitalLoader />
            </div>
          ) : (
            <div className="my-4 text-xs font-mono text-neutral-500 tracking-wider">
              ● POWER OFF READY
            </div>
          )}

          {/* Dynamic Status Text */}
          <div className="h-12 mt-4 flex flex-col items-center justify-center">
            <p
              key={currentStage.title}
              className="text-sm font-sans font-medium tracking-wide animate-in fade-in duration-300"
              style={{ color: isOff ? '#ffffff' : 'var(--color-text-primary)' }}
            >
              {currentStage.title}
            </p>
            <p
              key={currentStage.sub}
              className="text-[11px] font-mono tracking-widest mt-1 uppercase animate-in fade-in duration-300"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {currentStage.sub}
            </p>
          </div>

          {/* Minimal Progress Line */}
          <div className="w-56 mt-4 flex flex-col items-center">
            <div
              className="w-full h-1 rounded-full overflow-hidden border"
              style={{
                backgroundColor: 'var(--color-progress-track)',
                borderColor: 'var(--color-border-subtle)'
              }}
            >
              <div
                className="h-full transition-all duration-700 ease-out rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: isOff ? '#ef4444' : 'var(--color-progress-fill)',
                  boxShadow: isOff ? '0 0 8px rgba(239, 68, 68, 0.6)' : 'var(--color-progress-glow)'
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Footer Diagnostics */}
      <footer
        className="w-full flex justify-between items-center text-[11px] font-mono select-none opacity-40 border-t pt-4"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <span>STATUS: {isOff ? 'HALTED' : 'SHUTDOWN_IN_PROGRESS'}</span>
        <span>AADHISH OS 26100.WORKSTATION</span>
      </footer>
    </div>
  );
}
