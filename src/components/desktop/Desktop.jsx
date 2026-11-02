import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Taskbar from './Taskbar';
import DesktopIcon from './DesktopIcon';
import AuraBackground from './AuraBackground';
import AppWindow from './AppWindow';
import DesktopContextMenu from './DesktopContextMenu';
import CommandPalette from './CommandPalette';
import AppSwitcher from './AppSwitcher';
import SnapPreview from './SnapPreview';

import AboutApp from '../applications/AboutApp';
import ProjectsApp from '../applications/ProjectsApp';
import SkillsApp from '../applications/SkillsApp';
import AchievementsApp from '../applications/AchievementsApp';
import ResumeApp from '../applications/ResumeApp';
import ContactApp from '../applications/ContactApp';
import TerminalApp from '../applications/TerminalApp';
import FileExplorerApp from '../applications/FileExplorerApp';
import SettingsApp from '../applications/SettingsApp';
import DiscoveryHintNotification from './DiscoveryHintNotification';
import AchievementToast from './AchievementToast';

const SystemOverrideApp = React.lazy(() => import('../applications/override/SystemOverrideApp'));

import { DESKTOP_ICON_LIST } from '../../config/desktopApps';
import { useWindowManager } from '../../hooks/useWindowManager';
import { playStartupSoundIfQueued } from '../../utils/startupSound';
import { unlockAchievement, recordAppOpened } from '../../utils/achievementManager';
import { Maximize } from 'lucide-react';
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
    snapWindow,
    toggleShowDesktop,
    focusWindow,
    handleTaskbarItemClick,
    updateWindowPosition
  } = useWindowManager();

  // Desktop customization state
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0 });
  const [iconSize, setIconSize] = useState('medium'); // 'small' | 'medium' | 'large'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name'
  const [isRefreshing, setIsRefreshing] = useState(false);

  // New OS feature states
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false);
  const [switcherIndex, setSwitcherIndex] = useState(0);
  const [snapPreviewRect, setSnapPreviewRect] = useState(null);

  // Track references for stable event handlers
  const openWindowsRef = useRef(openWindows);
  openWindowsRef.current = openWindows;

  const switcherIndexRef = useRef(switcherIndex);
  switcherIndexRef.current = switcherIndex;

  const isAppSwitcherOpenRef = useRef(isAppSwitcherOpen);
  isAppSwitcherOpenRef.current = isAppSwitcherOpen;

  // Open app wrapper that records discovery achievements
  const handleOpenApp = useCallback(
    (appId, origin = null) => {
      recordAppOpened(appId);
      openApp(appId, origin);
    },
    [openApp]
  );

  // Play startup confirmation sound and unlock First Boot achievement
  useEffect(() => {
    playStartupSoundIfQueued();
    unlockAchievement('first-boot');
  }, []);

  // Keep switcherIndex valid if windows close
  useEffect(() => {
    if (openWindows.length === 0) {
      setIsAppSwitcherOpen(false);
      setSwitcherIndex(0);
    } else if (switcherIndex >= openWindows.length) {
      setSwitcherIndex(0);
    }
  }, [openWindows.length, switcherIndex]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      // Don't fire normal shortcuts if the user is typing in an input or textarea or terminal
      const activeEl = document.activeElement;
      const isInput =
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable ||
          activeEl.classList.contains('terminal-input'));

      // 1. Escape -> Close active overlays in priority order
      if (e.key === 'Escape') {
        if (isAppSwitcherOpenRef.current) {
          e.preventDefault();
          setIsAppSwitcherOpen(false);
          return;
        }
        if (isCommandPaletteOpen) {
          e.preventDefault();
          setIsCommandPaletteOpen(false);
          return;
        }
        if (contextMenu.isOpen) {
          e.preventDefault();
          setContextMenu({ isOpen: false, x: 0, y: 0 });
          return;
        }
      }

      // 2. Command Palette: Ctrl + K / Cmd + K
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      // 3. Alt + Tab Application Switcher
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        const wins = openWindowsRef.current;
        if (wins.length > 0) {
          if (!isAppSwitcherOpenRef.current) {
            setIsAppSwitcherOpen(true);
            const nextIdx = wins.length > 1 ? 1 : 0;
            setSwitcherIndex(nextIdx);
          } else {
            setSwitcherIndex((prev) =>
              e.shiftKey ? (prev - 1 + wins.length) % wins.length : (prev + 1) % wins.length
            );
          }
        }
        return;
      }

      // 4. Show Desktop: Win + D / Ctrl + Alt + D
      if (
        (e.metaKey && (e.key === 'd' || e.key === 'D')) ||
        (e.ctrlKey && e.altKey && (e.key === 'd' || e.key === 'D'))
      ) {
        e.preventDefault();
        toggleShowDesktop();
        return;
      }

      // 5. Open Terminal CLI: Ctrl + Shift + T or Ctrl + Shift + Escape
      if (
        e.ctrlKey &&
        e.shiftKey &&
        (e.key === 't' || e.key === 'T' || e.key === 'Escape' || e.code === 'Escape')
      ) {
        e.preventDefault();
        handleOpenApp('terminal');
        return;
      }

      // Skip remaining OS shortcuts if user is typing in an active input
      if (isInput) return;

      // 6. Ctrl + Alt + F -> Toggle Fullscreen
      if (e.ctrlKey && e.altKey && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        onToggleFullscreen();
        return;
      }

      // 7. Alt + F4 -> Close Active Window
      if (e.altKey && (e.key === 'F4' || e.code === 'F4')) {
        e.preventDefault();
        closeActiveWindow();
        return;
      }
    };

    const handleGlobalKeyUp = (e) => {
      // Release Alt to commit Alt+Tab selection
      if (e.key === 'Alt' && isAppSwitcherOpenRef.current) {
        const wins = openWindowsRef.current;
        const idx = switcherIndexRef.current;
        if (wins[idx]) {
          focusWindow(wins[idx].id);
        }
        setIsAppSwitcherOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('keyup', handleGlobalKeyUp);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('keyup', handleGlobalKeyUp);
    };
  }, [
    isCommandPaletteOpen,
    contextMenu.isOpen,
    toggleShowDesktop,
    handleOpenApp,
    onToggleFullscreen,
    closeActiveWindow,
    focusWindow
  ]);

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

  // Mobile Long-Press gesture on canvas to open Context Menu
  const touchTimerRef = useRef(null);

  const handleCanvasTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    if (
      e.target.closest('.windows-taskbar') ||
      e.target.closest('[role="dialog"]') ||
      e.target.closest('.aura-app-window') ||
      e.target.closest('[data-desktop-icon]')
    ) {
      return;
    }
    const touch = e.touches[0];
    const clientX = touch.clientX;
    const clientY = touch.clientY;

    touchTimerRef.current = setTimeout(() => {
      setContextMenu({
        isOpen: true,
        x: Math.min(clientX, window.innerWidth - 220),
        y: Math.min(clientY, window.innerHeight - 340)
      });
      touchTimerRef.current = null;
    }, 500);
  };

  const handleCanvasTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
      touchTimerRef.current = null;
    }
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
        return <AboutApp openApp={handleOpenApp} />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp openApp={handleOpenApp} />;
      case 'achievements':
        return <AchievementsApp />;
      case 'resume':
        return <ResumeApp openApp={handleOpenApp} />;
      case 'contact':
        return <ContactApp />;
      case 'terminal':
        return <TerminalApp openApp={handleOpenApp} onClose={() => closeWindow(win.id)} />;
      case 'explorer':
        return <FileExplorerApp openApp={handleOpenApp} />;
      case 'settings':
        return (
          <SettingsApp
            theme={theme}
            onToggleTheme={onToggleTheme}
            isFullscreen={isFullscreen}
            onToggleFullscreen={onToggleFullscreen}
          />
        );
      case 'system-override':
        return (
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-full bg-[#050914] text-xs font-mono text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping mr-2" />
                <span>MOUNTING CLASSIFIED OVERRIDE MODULE...</span>
              </div>
            }
          >
            <SystemOverrideApp openApp={handleOpenApp} />
          </React.Suspense>
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
      onTouchStart={handleCanvasTouchStart}
      onTouchMove={handleCanvasTouchEnd}
      onTouchEnd={handleCanvasTouchEnd}
    >
      {/* 1. Original AURA Particle Background Wallpaper */}
      <AuraBackground />

      {/* Fullscreen Exit Subtle Temporary Notification */}
      {showExitToast && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-3 duration-200 select-none max-w-lg w-[calc(100vw-32px)]"
        >
          <div
            className="p-3.5 sm:p-4 rounded-2xl border shadow-2xl backdrop-blur-2xl font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{
              backgroundColor: 'var(--color-bg-panel)',
              borderColor: 'var(--color-border-strong)',
              color: 'var(--color-text-primary)'
            }}
          >
            <div className="flex items-start gap-2.5">
              <span
                className="w-2 h-2 rounded-full mt-1 shrink-0"
                style={{
                  backgroundColor: 'var(--color-status-dot)',
                  boxShadow: 'var(--color-status-glow)'
                }}
              />
              <div className="flex flex-col">
                <span className="font-semibold text-white tracking-wide">
                  Immersive mode ended
                </span>
                <span
                  className="text-[11px] mt-0.5"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  AURA is still running in windowed mode.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={onRequestFullscreen}
                className="px-3 py-1.5 rounded-xl font-semibold text-[11px] cursor-pointer transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                style={{
                  backgroundColor: 'var(--color-progress-fill)',
                  color: '#050706'
                }}
              >
                <Maximize size={12} />
                <span>Return to Fullscreen</span>
              </button>

              <button
                type="button"
                onClick={onDismissExitToast}
                className="px-2.5 py-1.5 rounded-xl border text-[11px] cursor-pointer transition-colors hover:bg-white/10 active:scale-95"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)'
                }}
              >
                Continue in Windowed Mode
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Desktop Stage: Minimal Desktop containing ONLY Desktop Application Icons */}
      <main className="flex-1 p-3 sm:p-4 md:p-6 relative z-10 flex flex-col items-start pointer-events-none select-none">
        {/* Windows-Style Predictable Desktop Launcher:
            - Desktop/Tablet (>= 768px): Left-grouped vertical columns (top-to-bottom, wrapping into immediately adjacent column)
            - Mobile (< 768px): Dedicated touch-friendly 3-column grid safe from bottom dock */}
        <div
          className={`desktop-icon-container transition-opacity duration-300 ${
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
                onOpen={handleOpenApp}
                iconSize={iconSize}
              />
            );
          })}
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
          onSnap={snapWindow}
          onSnapPreview={setSnapPreviewRect}
          onPositionChange={updateWindowPosition}
        >
          {renderWindowContent(win)}
        </AppWindow>
      ))}

      {/* Window Ghost Snap Preview */}
      <SnapPreview rect={snapPreviewRect} />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        openApp={handleOpenApp}
        toggleShowDesktop={toggleShowDesktop}
        onToggleFullscreen={onToggleFullscreen}
        onRestart={onRestart}
        onSleep={onSleep}
        onShutdown={onShutdown}
      />

      {/* Alt + Tab Application Switcher */}
      <AppSwitcher
        isOpen={isAppSwitcherOpen}
        openWindows={openWindows}
        selectedIndex={switcherIndex}
        onSelectIndex={(idx) => {
          setSwitcherIndex(idx);
          if (openWindows[idx]) {
            focusWindow(openWindows[idx].id);
          }
          setIsAppSwitcherOpen(false);
        }}
        onClose={() => setIsAppSwitcherOpen(false)}
      />

      {/* Desktop Context Menu (Right Click) */}
      <DesktopContextMenu
        isOpen={contextMenu.isOpen}
        position={{ x: contextMenu.x, y: contextMenu.y }}
        onClose={() => setContextMenu({ isOpen: false, x: 0, y: 0 })}
        onRefresh={handleRefresh}
        openApp={handleOpenApp}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        toggleShowDesktop={toggleShowDesktop}
        iconSize={iconSize}
        setIconSize={setIconSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Desktop Easter Egg Discovery Hint & Gaming Achievement Notifications */}
      <DiscoveryHintNotification openApp={handleOpenApp} />
      <AchievementToast />

      {/* Persistent Windows 11 Taskbar */}
      <Taskbar
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onTaskbarItemClick={handleTaskbarItemClick}
        openApp={handleOpenApp}
        toggleShowDesktop={toggleShowDesktop}
        onOpenSwitcher={() => setIsAppSwitcherOpen(true)}
        theme={theme}
        onToggleTheme={onToggleTheme}
        isFullscreen={isFullscreen}
        onRequestFullscreen={onRequestFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        onSleep={onSleep}
        onRestart={onRestart}
        onShutdown={onShutdown}
      />
    </div>
  );
}
