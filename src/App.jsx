import React, { useState, useCallback } from 'react';
import SystemLauncher from './components/launcher/SystemLauncher';
import BootScreen from './components/BootScreen';
import Desktop from './components/desktop/Desktop';
import SleepScreen from './components/power/SleepScreen';
import ShutdownScreen from './components/shutdown/ShutdownScreen';
import { useTheme } from './hooks/useTheme';
import { useFullscreen } from './hooks/useFullscreen';
import { unlockAndQueueStartupSound } from './utils/startupSound';
import { startNewBootSession } from './utils/notificationManager';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  // Central system screen state: 'launcher' | 'boot' | 'desktop' | 'sleep' | 'shutdown'
  const [systemScreen, setSystemScreen] = useState('launcher');
  const [bootNotice, setBootNotice] = useState(null);

  const {
    isFullscreen,
    showExitToast,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
    dismissExitToast
  } = useFullscreen({ isDesktopActive: systemScreen === 'desktop' });

  // Transition from launcher to boot sequence
  const handleBoot = useCallback(({ withFullscreen, notice }) => {
    unlockAndQueueStartupSound();
    startNewBootSession();
    if (notice) {
      setBootNotice(notice);
    } else {
      setBootNotice(null);
    }
    setSystemScreen('boot');
  }, []);

  // Enter desktop workspace
  const handleEnterWorkspace = useCallback(() => {
    setSystemScreen('desktop');
  }, []);

  // Reboot to boot screen
  const handleRestart = useCallback(() => {
    unlockAndQueueStartupSound();
    startNewBootSession();
    setBootNotice(null);
    setSystemScreen('boot');
  }, []);

  // Suspend desktop to sleep screen
  const handleSleep = useCallback(() => {
    setSystemScreen('sleep');
  }, []);

  // Wake from sleep
  const handleWake = useCallback(() => {
    setSystemScreen('desktop');
  }, []);

  // Trigger shutdown sequence
  const handleShutdown = useCallback(() => {
    setSystemScreen('shutdown');
  }, []);

  // Reset to launcher on shutdown completion
  const handleCompleteShutdown = useCallback(async () => {
    await exitFullscreen();
    setSystemScreen('launcher');
  }, [exitFullscreen]);

  return (
    <div
      className="w-screen h-screen overflow-hidden fixed inset-0 bg-black font-sans select-none"
      style={{
        backgroundColor: 'var(--color-bg-app)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* 1. Initial System Launcher Screen */}
      {systemScreen === 'launcher' && (
        <div className="w-full h-full animate-in fade-in duration-300">
          <SystemLauncher
            theme={theme}
            onToggleTheme={toggleTheme}
            onBoot={handleBoot}
            onRequestFullscreen={requestFullscreen}
          />
        </div>
      )}

      {/* 2. UEFI Boot Sequence & Welcome Overlay */}
      {systemScreen === 'boot' && (
        <div className="w-full h-full animate-in fade-in duration-300">
          <BootScreen
            theme={theme}
            onToggleTheme={toggleTheme}
            onEnterWorkspace={handleEnterWorkspace}
            bootNotice={bootNotice}
          />
        </div>
      )}

      {/* 3. Interactive Windows 11 Desktop Experience */}
      {systemScreen === 'desktop' && (
        <div className="w-full h-full animate-in fade-in duration-300">
          <Desktop
            theme={theme}
            onToggleTheme={toggleTheme}
            onReturnToBoot={handleRestart}
            onSleep={handleSleep}
            onRestart={handleRestart}
            onShutdown={handleShutdown}
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
            onRequestFullscreen={requestFullscreen}
            showExitToast={showExitToast}
            onDismissExitToast={dismissExitToast}
          />
        </div>
      )}

      {/* 4. Low-Power Sleep Screen Overlay */}
      {systemScreen === 'sleep' && (
        <div className="w-full h-full animate-in fade-in duration-500">
          <SleepScreen onWake={handleWake} />
        </div>
      )}

      {/* 5. Cinematic Shutdown Sequence */}
      {systemScreen === 'shutdown' && (
        <div className="w-full h-full animate-in fade-in duration-500">
          <ShutdownScreen
            theme={theme}
            onCompleteShutdown={handleCompleteShutdown}
          />
        </div>
      )}
    </div>
  );
}
