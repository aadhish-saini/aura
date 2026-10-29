import React from 'react';
import SystemBar from './SystemBar';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import WelcomeWidget from './WelcomeWidget';
import AppWindow from './AppWindow';

import AboutApp from '../applications/AboutApp';
import ProjectsApp from '../applications/ProjectsApp';
import SkillsApp from '../applications/SkillsApp';
import AchievementsApp from '../applications/AchievementsApp';
import ResumeApp from '../applications/ResumeApp';
import ContactApp from '../applications/ContactApp';
import TerminalApp from '../applications/TerminalApp';
import FileExplorerApp from '../applications/FileExplorerApp';
import SettingsApp from '../applications/SettingsApp';

import { DESKTOP_ICON_LIST } from '../../config/desktopApps';
import { useWindowManager } from '../../hooks/useWindowManager';
import '../../styles/desktop.css';

export default function Desktop({ theme, onToggleTheme, onReturnToBoot }) {
  const {
    openWindows,
    activeWindowId,
    openApp,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    handleTaskbarItemClick,
    updateWindowPosition
  } = useWindowManager();

  const renderWindowContent = (win) => {
    switch (win.id) {
      case 'about':
        return <AboutApp openApp={openApp} />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'achievements':
        return <AchievementsApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'terminal':
        return <TerminalApp openApp={openApp} />;
      case 'explorer':
        return <FileExplorerApp openApp={openApp} />;
      case 'settings':
        return <SettingsApp theme={theme} onToggleTheme={onToggleTheme} />;
      default:
        return (
          <div className="p-6 text-center text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
            Module {win.title} active.
          </div>
        );
    }
  };

  return (
    <div className="desktop-canvas flex flex-col justify-between">
      {/* Subtle Atmospheric Ambient Glows */}
      <div className="desktop-glow-1" />
      <div className="desktop-glow-2" />

      {/* Technical CAD Hairline Grid Pattern */}
      <svg className="desktop-cad-grid" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="desktopCadGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="24" cy="24" r="0.75" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#desktopCadGrid)" />
      </svg>

      {/* Crosshairs & Coordinate Decals */}
      <div className="absolute top-16 left-6 text-[9px] font-mono pointer-events-none opacity-20 hidden md:block">
        SYS_LOC: +28.6139°N / +77.2090°E
      </div>
      <div className="absolute top-16 right-6 text-[9px] font-mono pointer-events-none opacity-20 hidden md:block">
        REF://WORKSPACE.ARM64
      </div>

      {/* Top System Masthead */}
      <SystemBar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onReturnToBoot={onReturnToBoot}
        openApp={openApp}
        activeWindowId={activeWindowId}
      />

      {/* Main Desktop Stage */}
      <main className="flex-1 pt-16 pb-16 px-4 md:px-6 relative z-10 flex flex-col sm:flex-row gap-6 overflow-hidden">
        {/* Left Vertical App Launcher Rail */}
        <div className="flex sm:flex-col flex-wrap gap-1.5 sm:gap-2 z-20 shrink-0 self-start max-w-full overflow-x-auto sm:overflow-visible py-1">
          {DESKTOP_ICON_LIST.map((app) => {
            const isOpen = openWindows.some((w) => w.id === app.id);
            const isActive = activeWindowId === app.id;
            return (
              <DesktopIcon
                key={app.id}
                app={app}
                isOpen={isOpen}
                isActive={isActive}
                onOpen={openApp}
              />
            );
          })}
        </div>

        {/* Center / Right Canvas Area with Welcome Widget */}
        <div className="flex-1 relative overflow-y-auto max-h-[calc(100vh-130px)] pr-1">
          <div className="py-2">
            <WelcomeWidget openApp={openApp} />
          </div>

          {/* Desktop Watermark Footer */}
          <div className="w-full flex items-center justify-end pointer-events-none pt-8 pb-4">
            <div className="text-[10px] font-mono tracking-widest text-neutral-500/40 text-right">
              AURA // BUILD 26100.WORKSTATION.2025 // STABLE_CHANNEL
            </div>
          </div>
        </div>
      </main>

      {/* Multi-Window Compositor Layer */}
      {openWindows.map((win) => (
        <AppWindow
          key={win.id}
          window={win}
          isActive={activeWindowId === win.id}
          onFocus={() => focusWindow(win.id)}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onPositionChange={updateWindowPosition}
        >
          {renderWindowContent(win)}
        </AppWindow>
      ))}

      {/* Fixed Bottom Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onTaskbarItemClick={handleTaskbarItemClick}
        openApp={openApp}
        onReturnToBoot={onReturnToBoot}
      />
    </div>
  );
}
