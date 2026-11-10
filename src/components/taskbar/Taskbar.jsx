import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  Volume2,
  VolumeX,
  ChevronUp,
  Monitor,
  Layers
} from 'lucide-react';
import StartMenu from './StartMenu';
import AuraSessionMenu from './AuraSessionMenu';
import TaskbarCalendar from './TaskbarCalendar';
import NotificationCenter from '../notifications/NotificationCenter';
import AppIcon from '../common/AppIcon';
import { DESKTOP_APPS } from '../../config/desktopApps';
import { getUnreadCount } from '../../utils/notificationManager';
import './Taskbar.css';

// Pinned apps for taskbar center section
const PINNED_TASKBAR_APP_IDS = [
  'explorer',
  'about',
  'projects',
  'skills',
  'achievements',
  'contact',
  'terminal'
];

export default function Taskbar({
  openWindows,
  activeWindowId,
  onTaskbarItemClick,
  openApp,
  theme,
  onToggleTheme,
  isFullscreen,
  onRequestFullscreen,
  onToggleFullscreen,
  onSleep,
  onRestart,
  onShutdown,
  toggleShowDesktop,
  onOpenSwitcher
}) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isTrayMenuOpen, setIsTrayMenuOpen] = useState(false);
  const [isSessionMenuOpen, setIsSessionMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(() => getUnreadCount());
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const trayMenuRef = useRef(null);

  // Sync unread notification count
  useEffect(() => {
    const handleUpdate = () => setUnreadCount(getUnreadCount());
    window.addEventListener('aura-notifications-updated', handleUpdate);
    window.addEventListener('focus', handleUpdate);
    return () => {
      window.removeEventListener('aura-notifications-updated', handleUpdate);
      window.removeEventListener('focus', handleUpdate);
    };
  }, []);

  // Global shortcut to toggle Start Menu (Ctrl+Alt+S or Meta)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in form inputs
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.isContentEditable ||
          activeEl.classList.contains('terminal-input'))
      ) {
        return;
      }

      if ((e.ctrlKey && e.altKey && (e.key === 's' || e.key === 'S')) || (e.key === 'Meta' && !e.repeat)) {
        e.preventDefault();
        setIsStartOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Live Windows 11-style 2-line clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
      setDateStr(
        now.toLocaleDateString([], {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric'
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close tray menu on outside click
  useEffect(() => {
    if (!isTrayMenuOpen) return;

    const handleOutsideClick = (e) => {
      if (trayMenuRef.current && !trayMenuRef.current.contains(e.target) && !e.target.closest('#tray-toggle-button')) {
        setIsTrayMenuOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isTrayMenuOpen]);

  // Combine pinned apps with any other open apps (e.g. resume or settings) so all open apps are represented
  const allTaskbarAppIds = [...PINNED_TASKBAR_APP_IDS];
  openWindows.forEach((win) => {
    if (!allTaskbarAppIds.includes(win.id)) {
      allTaskbarAppIds.push(win.id);
    }
  });

  return (
    <>
      <footer
        className="windows-taskbar fixed bottom-0 left-0 right-0 h-12 md:h-13 z-50 px-3 flex items-center justify-between border-t backdrop-blur-xl select-none"
        style={{
          backgroundColor: 'var(--color-bg-panel)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-primary)'
        }}
        role="navigation"
        aria-label="Windows Taskbar"
      >
        {/* Left Section: Subtle Station Telemetry Decal */}
        <div className="flex items-center gap-2 shrink-0 min-w-0 opacity-40 hidden lg:flex text-[10px] font-mono pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          <span>AURA // WORKSTATION</span>
        </div>

        {/* Center Section: Centered Unified Cluster (Start button → clear horizontal gap → pinned applications) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-0 bottom-0 items-center justify-center max-w-[calc(100vw-280px)] lg:max-w-[calc(100vw-220px)] overflow-x-auto no-scrollbar py-0.5 z-10">
          <div className="flex items-center">
            {/* Standalone Rectangular AURA Start Button */}
            <button
              id="start-menu-button"
              type="button"
              onClick={() => {
                setIsStartOpen(!isStartOpen);
                if (!isStartOpen) setIsCalendarOpen(false);
              }}
              className="start-trigger-btn flex items-center justify-center cursor-pointer outline-none border-0 bg-transparent p-0 m-0 shadow-none transition-opacity duration-200 select-none shrink-0"
              title="AURA Start Menu (Ctrl+Alt+S)"
              aria-label="AURA Start Menu"
              aria-expanded={isStartOpen}
            >
              <img
                src="/aura-start-icon.png"
                alt="AURA Start Menu"
                className={`h-[30px] sm:h-[32px] md:h-[34px] w-auto object-contain select-none pointer-events-none transition-all duration-200 ${isStartOpen
                  ? 'brightness-125 drop-shadow-[0_0_12px_rgba(192,38,211,0.55)]'
                  : 'brightness-100 hover:brightness-115'
                  }`}
              />
            </button>

            {/* Clear Horizontal Gap establishing visual distinction through spacing alone */}
            <div className="w-4 sm:w-5 md:w-6 shrink-0" aria-hidden="true" />

            {/* Pinned & Running Applications Group */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {allTaskbarAppIds.map((appId) => {
                const app = DESKTOP_APPS[appId];
                if (!app) return null;

                const openWin = openWindows.find((w) => w.id === appId);
                const isOpen = !!openWin;
                const isActive = isOpen && activeWindowId === appId && !openWin.isMinimized;
                const isMinimized = isOpen && openWin.isMinimized;

                return (
                  <button
                    key={appId}
                    id={`taskbar-icon-${appId}`}
                    data-taskbar-icon={appId}
                    type="button"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const origin = {
                        x: Math.round(rect.left + rect.width / 2),
                        y: Math.round(rect.top + rect.height / 2)
                      };
                      onTaskbarItemClick(appId, origin);
                    }}
                    className={`taskbar-icon-btn relative p-1.5 sm:p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer group ${isActive
                      ? 'bg-white/15 shadow-sm'
                      : isOpen
                        ? 'hover:bg-white/10'
                        : 'hover:bg-white/5 opacity-85 hover:opacity-100'
                      }`}
                    title={`${app.title}${isOpen ? (isMinimized ? ' (Minimized)' : ' (Active)') : ''}`}
                    aria-label={app.title}
                  >
                    <AppIcon app={app} appId={appId} size={22} className="transition-transform group-hover:scale-110" />

                    {/* Windows 11 Active / Open Indicator beneath icon */}
                    {isOpen && (
                      <span
                        className={`taskbar-indicator absolute bottom-0.5 transition-all duration-200 rounded-full ${isActive
                          ? 'w-4 h-1'
                          : isMinimized
                            ? 'w-1.5 h-1 opacity-50'
                            : 'w-2 h-1 opacity-80'
                          }`}
                        style={{
                          backgroundColor: 'var(--color-status-dot)',
                          boxShadow: isActive ? 'var(--color-status-glow)' : 'none'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Section: System Tray & Clock (Permanently Pinned Right on Desktop/Tablet) */}
        <div className="hidden md:flex ml-auto items-center gap-1 sm:gap-2 shrink-0 z-20">
          {/* Quick Settings Flyout Trigger */}
          <div className="relative">
            <button
              id="tray-toggle-button"
              type="button"
              onClick={() => setIsTrayMenuOpen(!isTrayMenuOpen)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-neutral-300 hover:text-white flex items-center gap-1 text-xs"
              title="Quick System Preferences"
              aria-label="Quick System Preferences"
              aria-expanded={isTrayMenuOpen}
            >
              {isSoundMuted ? <VolumeX size={14} className="text-neutral-400" /> : <Volume2 size={14} />}
              <ChevronUp size={11} className={`transition-transform duration-200 ${isTrayMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick Preferences Popover */}
            {isTrayMenuOpen && (
              <div
                ref={trayMenuRef}
                className="fixed bottom-14 right-4 w-64 rounded-xl border p-3.5 shadow-2xl backdrop-blur-2xl font-mono text-xs z-50 animate-in fade-in zoom-in-95 duration-150 select-none"
                style={{
                  backgroundColor: 'var(--color-bg-panel)',
                  borderColor: 'var(--color-border-strong)',
                  color: 'var(--color-text-primary)'
                }}
              >
                <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <span className="font-semibold text-white">System Preferences</span>
                  <span className="text-[10px] text-neutral-400">AURA</span>
                </div>

                <div className="space-y-2.5 pt-2.5">
                  {/* Fullscreen Status & Control */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <Monitor size={13} style={{ color: 'var(--color-status-dot)' }} />
                      <span>Fullscreen:</span>
                    </span>
                    {isFullscreen ? (
                      <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-400 font-mono text-[10px] font-semibold tracking-wide">
                        Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setIsTrayMenuOpen(false);
                          onRequestFullscreen?.();
                        }}
                        className="px-2 py-0.5 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 font-mono text-[11px] cursor-pointer"
                      >
                        Enter
                      </button>
                    )}
                  </div>

                  {/* Sound Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <Volume2 size={13} style={{ color: 'var(--color-status-dot)' }} />
                      <span>Audio FX:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsSoundMuted(!isSoundMuted)}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] cursor-pointer"
                    >
                      {isSoundMuted ? 'Muted' : 'Enabled'}
                    </button>
                  </div>

                  {/* Personalization shortcut */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsTrayMenuOpen(false);
                      openApp('settings');
                    }}
                    className="w-full mt-1 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-center text-[11px] text-sky-400 font-semibold cursor-pointer block"
                  >
                    Open Full Settings
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notification Center Trigger */}
          <button
            id="notification-tray-button"
            type="button"
            onClick={() => {
              setIsNotificationOpen((prev) => !prev);
              setIsCalendarOpen(false);
              setIsTrayMenuOpen(false);
              setIsSessionMenuOpen(false);
              setIsStartOpen(false);
            }}
            className={`relative p-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              isNotificationOpen
                ? 'bg-white/15 text-white'
                : 'hover:bg-white/10 text-neutral-300 hover:text-white'
            }`}
            title={`Notification Center ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
            aria-label="Notification Center"
            aria-expanded={isNotificationOpen}
          >
            <Bell size={14} className={unreadCount > 0 ? 'text-cyan-400' : 'text-neutral-300'} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] px-0.5 rounded-full bg-cyan-400 text-[9px] font-bold text-black flex items-center justify-center leading-none shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* AURA SESSION Unobtrusive Status & System Controls */}
          <button
            id="aura-session-button"
            type="button"
            onClick={() => {
              setIsSessionMenuOpen(!isSessionMenuOpen);
              if (!isSessionMenuOpen) setIsCalendarOpen(false);
            }}
            className={`aura-session-trigger flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${isSessionMenuOpen
              ? 'bg-sky-500/15 border-sky-500/40 text-white'
              : 'hover:bg-white/10 text-neutral-300 hover:text-white border-transparent'
              }`}
            title="AURA Session Controls"
            aria-label="AURA Session Controls"
            aria-expanded={isSessionMenuOpen}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${isFullscreen
                ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]'
                : 'bg-violet-400/80 shadow-[0_0_6px_rgba(168,85,247,0.6)]'
                }`}
            />
            <span className="font-semibold tracking-wider text-[11px] hidden lg:inline">
              AURA SESSION
            </span>
            <span className="font-semibold tracking-wider text-[11px] hidden md:inline lg:hidden">
              SESSION
            </span>
          </button>

          {/* Windows 11 Stacked Clock & Date Trigger Button */}
          <button
            id="taskbar-clock-btn"
            type="button"
            onClick={() => {
              setIsCalendarOpen((prev) => !prev);
              setIsTrayMenuOpen(false);
              setIsSessionMenuOpen(false);
              setIsNotificationOpen(false);
              setIsStartOpen(false);
            }}
            className={`flex flex-col items-end px-2 py-1 rounded-lg transition-all cursor-pointer select-none leading-none font-mono border ${isCalendarOpen
              ? 'bg-white/15 border-white/20 text-white shadow-sm'
              : 'border-transparent hover:bg-white/10 text-slate-200 hover:text-white'
              }`}
            title="Open Calendar"
            aria-label="Taskbar Date and Time, open Calendar"
            aria-expanded={isCalendarOpen}
          >
            <span className="text-[11px] font-medium tracking-tight">
              {timeStr || '12:00 PM'}
            </span>
            <span
              className="text-[9px] mt-0.5 tracking-wider"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {dateStr || '10/30/2026'}
            </span>
          </button>

          {/* Windows 11 Far-Right Show Desktop Sliver */}
          <button
            id="taskbar-show-desktop-btn"
            type="button"
            onClick={() => {
              setIsStartOpen(false);
              setIsCalendarOpen(false);
              setIsNotificationOpen(false);
              setIsTrayMenuOpen(false);
              setIsSessionMenuOpen(false);
              toggleShowDesktop();
            }}
            className="w-1.5 sm:w-2 h-7 sm:h-8 my-auto ml-1 rounded-sm border-l border-white/20 hover:bg-sky-400/30 transition-colors cursor-pointer"
            title="Show Desktop (Win+D)"
            aria-label="Show Desktop"
          />
        </div>

        {/* Mobile Dock (< 768px): Dedicated touch-optimized bar */}
        <div className="flex md:hidden w-full h-full items-center justify-between gap-1 overflow-hidden">
          {/* Left: Mobile Start + Task Switcher */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              id="mobile-start-menu-button"
              type="button"
              onClick={() => {
                setIsStartOpen((prev) => !prev);
                if (!isStartOpen) {
                  setIsCalendarOpen(false);
                  setIsNotificationOpen(false);
                  setIsTrayMenuOpen(false);
                }
              }}
              className="start-trigger-btn flex items-center justify-center p-1 shrink-0 cursor-pointer"
              title="AURA Start Menu"
              aria-label="AURA Start Menu"
              aria-expanded={isStartOpen}
            >
              <img
                src="/aura-start-icon.png"
                alt="AURA Start"
                className={`h-7 w-auto object-contain select-none pointer-events-none transition-all duration-200 ${
                  isStartOpen ? 'brightness-125 drop-shadow-[0_0_10px_rgba(192,38,211,0.55)]' : 'brightness-100'
                }`}
              />
            </button>

            <button
              id="mobile-task-switcher-btn"
              type="button"
              onClick={() => {
                setIsStartOpen(false);
                setIsCalendarOpen(false);
                setIsNotificationOpen(false);
                onOpenSwitcher?.();
              }}
              className={`p-1.5 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                openWindows.length > 0 ? 'text-sky-400 hover:bg-white/10' : 'text-neutral-400 hover:bg-white/10'
              }`}
              title="App Switcher"
              aria-label="App Switcher"
            >
              <Layers size={18} />
            </button>
          </div>

          {/* Center: Scrollable Running & Pinned Apps */}
          <div className="flex-1 min-w-0 mx-1 flex items-center justify-start overflow-x-auto no-scrollbar py-0.5 gap-1">
            {allTaskbarAppIds.map((appId) => {
              const app = DESKTOP_APPS[appId];
              if (!app) return null;

              const openWin = openWindows.find((w) => w.id === appId);
              const isOpen = !!openWin;
              const isActive = isOpen && activeWindowId === appId && !openWin.isMinimized;
              const isMinimized = isOpen && openWin.isMinimized;

              return (
                <button
                  key={`mob-${appId}`}
                  type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const origin = {
                      x: Math.round(rect.left + rect.width / 2),
                      y: Math.round(rect.top + rect.height / 2)
                    };
                    onTaskbarItemClick(appId, origin);
                  }}
                  className={`relative p-1.5 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-white/20'
                      : isOpen
                        ? 'bg-white/10'
                        : 'opacity-70 hover:opacity-100'
                  }`}
                  title={app.title}
                  aria-label={app.title}
                >
                  <AppIcon app={app} appId={appId} size={20} />
                  {isOpen && (
                    <span
                      className={`taskbar-indicator absolute bottom-0.5 rounded-full ${
                        isActive ? 'w-3 h-0.5 bg-sky-400' : 'w-1.5 h-0.5 bg-neutral-400 opacity-60'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Notifications, Compact Clock, Show Desktop */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              id="mobile-notification-tray-button"
              type="button"
              onClick={() => {
                setIsNotificationOpen((prev) => !prev);
                setIsCalendarOpen(false);
                setIsStartOpen(false);
              }}
              className="relative p-1.5 rounded-lg text-neutral-300 hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
              title="Notifications"
              aria-label="Notifications"
              aria-expanded={isNotificationOpen}
            >
              <Bell size={16} className={unreadCount > 0 ? 'text-cyan-400' : 'text-neutral-300'} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[13px] h-[13px] px-0.5 rounded-full bg-cyan-400 text-[8px] font-bold text-black flex items-center justify-center leading-none">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            <button
              id="mobile-clock-btn"
              type="button"
              onClick={() => {
                setIsCalendarOpen((prev) => !prev);
                setIsNotificationOpen(false);
                setIsStartOpen(false);
              }}
              className="px-1.5 py-1 rounded-md text-[11px] font-mono text-neutral-200 shrink-0 cursor-pointer leading-tight"
              title="Open Calendar"
              aria-label="Open Calendar"
            >
              {timeStr || '12:00 PM'}
            </button>

            <button
              id="mobile-show-desktop-btn"
              type="button"
              onClick={() => {
                setIsStartOpen(false);
                setIsCalendarOpen(false);
                setIsNotificationOpen(false);
                setIsTrayMenuOpen(false);
                setIsSessionMenuOpen(false);
                toggleShowDesktop();
              }}
              className="p-1 rounded-md text-neutral-400 hover:text-white shrink-0 cursor-pointer"
              title="Show Desktop"
              aria-label="Show Desktop"
            >
              <Monitor size={15} />
            </button>
          </div>
        </div>
      </footer>

      {/* Notification Center Popover */}
      <NotificationCenter
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Windows 11-Style Calendar Popup */}
      <TaskbarCalendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      />

      {/* AURA Session Menu Popover */}
      <AuraSessionMenu
        isOpen={isSessionMenuOpen}
        onClose={() => setIsSessionMenuOpen(false)}
        isFullscreen={isFullscreen}
        onRequestFullscreen={onRequestFullscreen}
        onRestart={onRestart}
        onShutdown={onShutdown}
      />

      {/* Start Menu Popup */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        openApp={openApp}
        onSleep={onSleep}
        onRestart={onRestart}
        onShutdown={onShutdown}
        recentAppId={activeWindowId}
      />
    </>
  );
}
