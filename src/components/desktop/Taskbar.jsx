import React, { useState, useEffect, useRef } from 'react';
import {
  Maximize,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Sliders,
  ChevronUp,
  Monitor,
  Sparkles
} from 'lucide-react';
import StartMenu from './StartMenu';
import AuraSessionMenu from './AuraSessionMenu';
import AppIcon from '../common/AppIcon';
import { DESKTOP_APPS } from '../../config/desktopApps';
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
  onShutdown
}) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isTrayMenuOpen, setIsTrayMenuOpen] = useState(false);
  const [isSessionMenuOpen, setIsSessionMenuOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const trayMenuRef = useRef(null);

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
        className="windows-taskbar fixed bottom-0 left-0 right-0 h-12 md:h-13 z-50 px-2 sm:px-3 flex items-center justify-between border-t backdrop-blur-xl select-none transition-colors duration-200"
        style={{
          backgroundColor: 'var(--color-bg-panel)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-primary)'
        }}
        role="navigation"
        aria-label="Windows Taskbar"
      >
        {/* Left Section: Start Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            id="start-menu-button"
            type="button"
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`start-trigger-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              isStartOpen
                ? 'bg-white/15 shadow-inner scale-95'
                : 'hover:bg-white/10 active:scale-95'
            }`}
            title="AURA Start Menu (Ctrl+Alt+S)"
            aria-label="AURA Start Menu"
            aria-expanded={isStartOpen}
          >
            {/* Authentic AURA Application Icon */}
            <img
              src="/AURA-icon.png"
              alt="AURA"
              className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110 select-none pointer-events-none"
            />

            <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline text-white">
              AURA
            </span>
          </button>
        </div>

        {/* Center Section: Windows 11 App Icons & Running Indicators */}
        <div className="flex-1 flex items-center justify-center overflow-x-auto max-w-[calc(100vw-220px)] sm:max-w-none px-2 py-0.5">
          <div className="flex items-center gap-1 sm:gap-1.5">
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
                  type="button"
                  onClick={() => onTaskbarItemClick(appId)}
                  className={`taskbar-icon-btn relative p-1.5 sm:p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer group ${
                    isActive
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
                      className={`taskbar-indicator absolute bottom-0.5 transition-all duration-200 rounded-full ${
                        isActive
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

        {/* Right Section: System Tray & Clock */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
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

                  {/* Theme Switch */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
                      <span>Theme:</span>
                    </span>
                    <button
                      type="button"
                      onClick={onToggleTheme}
                      className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] cursor-pointer"
                    >
                      {theme === 'dark' ? 'AURA Dark' : 'AURA Light'}
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

          {/* Theme Quick Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-neutral-300 hover:text-white"
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={14} className="hover:text-amber-300" /> : <Moon size={14} className="hover:text-sky-400" />}
          </button>

          {/* AURA SESSION Unobtrusive Status & System Controls */}
          <button
            id="aura-session-button"
            type="button"
            onClick={() => setIsSessionMenuOpen(!isSessionMenuOpen)}
            className={`aura-session-trigger flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
              isSessionMenuOpen
                ? 'bg-sky-500/15 border-sky-500/40 text-white'
                : 'hover:bg-white/10 text-neutral-300 hover:text-white border-transparent'
            }`}
            title="AURA Session Controls"
            aria-label="AURA Session Controls"
            aria-expanded={isSessionMenuOpen}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isFullscreen
                  ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]'
                  : 'bg-violet-400/80 shadow-[0_0_6px_rgba(168,85,247,0.6)]'
              }`}
            />
            <span className="font-semibold tracking-wider text-[11px] hidden sm:inline">
              AURA SESSION
            </span>
            <span className="font-semibold tracking-wider text-[11px] sm:hidden">
              SESSION
            </span>
          </button>

          {/* Windows 11 Stacked Clock & Date */}
          <div
            className="flex flex-col items-end px-1.5 py-0.5 rounded-lg hover:bg-white/10 transition-colors cursor-default select-none leading-none font-mono"
            title={`${timeStr} - ${dateStr}`}
          >
            <span className="text-[11px] font-medium text-white tracking-tight">
              {timeStr || '12:00 PM'}
            </span>
            <span
              className="text-[9px] mt-0.5 tracking-wider"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {dateStr || '10/30/2026'}
            </span>
          </div>
        </div>
      </footer>

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
