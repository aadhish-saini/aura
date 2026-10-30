import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import WelcomeWidget from './WelcomeWidget';
import AppWindow from './AppWindow';
import DesktopContextMenu from './DesktopContextMenu';

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
import { Maximize, X } from 'lucide-react';
import '../../styles/desktop.css';

export default function Desktop({
  theme,
  onToggleTheme,
  onReturnToBoot,
  onSleep,
  onRestart,
  onShutdown,
  isFullscreen,
  onToggleFullscreen,
  onRequestFullscreen,
  showExitToast,
  onDismissExitToast
}) {
  const {
    openWindows,
    activeWindowId,
    openApp,
    closeWindow,
    closeActiveWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    handleTaskbarItemClick,
    updateWindowPosition
  } = useWindowManager();

  // Desktop customization state
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });
  const [iconSize, setIconSize] = useState('medium'); // 'small' | 'medium' | 'large'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Don't fire shortcuts if the user is typing in an input or textarea or terminal
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable ||
          activeEl.classList.contains('terminal-input'));

      // 1. Ctrl + Shift + Escape -> Open Terminal
      if (e.ctrlKey && e.shiftKey && (e.key === 'Escape' || e.code === 'Escape')) {
        e.preventDefault();
        openApp('terminal');
        return;
      }

      // 2. Ctrl + Alt + F -> Toggle Fullscreen
      if (e.ctrlKey && e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        onToggleFullscreen();
        return;
      }

      // 3. Alt + F4 -> Close Active Window
      if (e.altKey && (e.key === 'F4' || e.code === 'F4')) {
        e.preventDefault();
        closeActiveWindow();
        return;
      }

      // 4. Escape -> Close Context Menu
      if (e.key === 'Escape') {
        if (contextMenu.isOpen) {
          e.preventDefault();
          setContextMenu({ isOpen: false, x: 0, y: 0 });
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [openApp, onToggleFullscreen, closeActiveWindow, contextMenu.isOpen]);

  // Handle right click on desktop canvas
  const handleCanvasContextMenu = (e) => {
    // Only trigger if clicked on the desktop canvas itself, not inside a window
    if (e.target.closest('.windows-taskbar') || e.target.closest('[role="dialog"]') || e.target.closest('.app-window-body')) {
      return;
    }
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  // Close context menu on left click anywhere on canvas
  const handleCanvasClick = (e) => {
    if (contextMenu.isOpen && !e.target.closest('.desktop-context-menu')) {
      setContextMenu({ isOpen: false, x: 0, y: 0 });
    }
  };

  // Trigger Refresh Animation
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  }, []);

  // Sorted Desktop Icons
  const displayedIcons = useMemo(() => {
    const list = [...DESKTOP_ICON_LIST];
    if (sortBy === 'name') {
      list.sort((a, b) => (a.shortTitle || a.title).localeCompare(b.shortTitle || b.title));
    }
    return list;
  }, [sortBy]);

  // Render window content based on ID
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
        return (
          <SettingsApp
            theme={theme}
            onToggleTheme={onToggleTheme}
            isFullscreen={isFullscreen}
            onToggleFullscreen={onToggleFullscreen}
          />
        );
      default:
        return (
          <div className="p-6 text-center text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
            Module {win.title} active.
          </div>
        );
    }
  };

  return (
    <div
      className="desktop-canvas flex flex-col justify-between relative overflow-hidden select-none"
      onContextMenu={handleCanvasContextMenu}
      onClick={handleCanvasClick}
    >
      {/* Subtle Atmospheric Ambient Glows */}
      <div className="desktop-glow-1" />
      <div className="desktop-glow-2" />

      {/* Technical CAD Hairline Grid Pattern */}
      <svg className="desktop-cad-grid pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="desktopCadGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="24" cy="24" r="0.75" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#desktopCadGrid)" />
      </svg>

      {/* Crosshairs & Coordinate Decals */}
      <div className="absolute top-4 left-6 text-[9px] font-mono pointer-events-none opacity-20 hidden md:block select-none">
        AADHISH_OS // SYS_LOC: +28.6139°N / +77.2090°E
      </div>
      <div className="absolute top-4 right-6 text-[9px] font-mono pointer-events-none opacity-20 hidden md:block select-none">
        BUILD 26100.WORKSTATION // READY
      </div>

      {/* Fullscreen Exit Non-Intrusive Recovery Toast */}
      {showExitToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div
            className="px-4 py-2 rounded-xl border shadow-xl backdrop-blur-2xl flex items-center gap-3 text-xs font-mono select-none"
            style={{
              backgroundColor: 'var(--color-bg-panel)',
              borderColor: 'var(--color-status-dot)',
              color: 'var(--color-text-primary)'
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--color-status-dot)' }}
            />
            <span>Windowed mode active.</span>
            <button
              type="button"
              onClick={onRequestFullscreen}
              className="px-2 py-0.5 rounded font-semibold text-[11px] cursor-pointer hover:brightness-110 flex items-center gap-1"
              style={{
                backgroundColor: 'var(--color-btn-accent-bg)',
                color: 'var(--color-status-dot)'
              }}
            >
              <Maximize size={12} />
              <span>Enter Fullscreen</span>
            </button>
            <button
              type="button"
              onClick={onDismissExitToast}
              className="p-1 hover:bg-white/10 rounded cursor-pointer text-neutral-400 hover:text-white"
              title="Dismiss notice"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Main Desktop Stage */}
      <main className="flex-1 pt-6 pb-16 px-4 md:px-6 relative z-10 flex flex-col sm:flex-row gap-6 overflow-hidden">
        {/* Left Vertical Desktop App Launcher Grid */}
        <div
          className={`flex sm:flex-col flex-wrap gap-2 sm:gap-2.5 z-20 shrink-0 self-start max-w-full overflow-x-auto sm:overflow-visible py-1 transition-opacity duration-300 ${
            isRefreshing ? 'opacity-30 scale-98' : 'opacity-100 scale-100'
          }`}
        >
          {displayedIcons.map((app) => {
            const isOpen = openWindows.some((w) => w.id === app.id);
            const isActive = activeWindowId === app.id;
            return (
              <DesktopIcon
                key={app.id}
                app={app}
                isOpen={isOpen}
                isActive={isActive}
                onOpen={openApp}
                iconSize={iconSize}
              />
            );
          })}
        </div>

        {/* Center / Right Canvas Area with Welcome Widget */}
        <div className="flex-1 relative overflow-y-auto max-h-[calc(100vh-80px)] pr-1">
          <div className="py-2">
            <WelcomeWidget openApp={openApp} />
          </div>

          {/* Desktop Watermark Footer */}
          <div className="w-full flex items-center justify-end pointer-events-none pt-8 pb-4">
            <div className="text-[10px] font-mono tracking-widest text-neutral-500/40 text-right">
              AADHISH OS // BUILD 26100.WORKSTATION.2025 // STABLE_CHANNEL
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

      {/* Desktop Context Menu (Right Click) */}
      <DesktopContextMenu
        isOpen={contextMenu.isOpen}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        onClose={() => setContextMenu({ isOpen: false, x: 0, y: 0 })}
        onRefresh={handleRefresh}
        openApp={openApp}
        iconSize={iconSize}
        setIconSize={setIconSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Persistent Windows 11 Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onTaskbarItemClick={handleTaskbarItemClick}
        openApp={openApp}
        theme={theme}
        onToggleTheme={onToggleTheme}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        onSleep={onSleep}
        onRestart={onRestart}
        onShutdown={onShutdown}
      />
    </div>
  );
}
