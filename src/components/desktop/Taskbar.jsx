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
            className={`start-trigger-btn flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              isStartOpen
                ? 'bg-white/15 shadow-inner scale-95'
                : 'hover:bg-white/10 active:scale-95'
            }`}
            title="AADHISH OS Start Menu (Ctrl+Alt+S)"
            aria-label="AADHISH OS Start Menu"
            aria-expanded={isStartOpen}
          >
            {/* Custom 4-Pane AADHISH OS Geometric Emblem */}
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:scale-105"
              fill="none"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient gradientUnits="userSpaceOnUse" id="tbTileGrad1" x1="6" x2="30" y1="6" y2="30">
                  <stop stopColor="#abf2c6" />
                  <stop offset="1" stopColor="#256a48" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="tbTileGrad2" x1="34" x2="58" y1="6" y2="30">
                  <stop stopColor="#ffffff" />
                  <stop offset="1" stopColor="#90d5ac" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="tbTileGrad3" x1="6" x2="30" y1="34" y2="58">
                  <stop stopColor="#256a48" />
                  <stop offset="1" stopColor="#143c28" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="tbTileGrad4" x1="34" x2="58" y1="34" y2="58">
                  <stop stopColor="#abf2c6" />
                  <stop offset="1" stopColor="#256a48" />
                </linearGradient>
              </defs>

              <path d="M7 9C7 7.89543 7.89543 7 9 7H28C29.1046 7 30 7.89543 30 9V28C30 29.1046 29.1046 30 28 30H9C7.89543 30 7 29.1046 7 28V9Z" fill="url(#tbTileGrad1)" fillOpacity="0.95" />
              <path d="M34 9C34 7.89543 34.8954 7 36 7H55C56.1046 7 57 7.89543 57 9V28C57 29.1046 56.1046 30 55 30H36C34.8954 30 34 29.1046 34 28V9Z" fill="url(#tbTileGrad2)" fillOpacity="0.85" />
              <path d="M7 36C7 34.8954 7.89543 34 9 34H28C29.1046 34 30 34.8954 30 36V55C30 56.1046 29.1046 57 28 57H9C7.89543 57 7 56.1046 7 55V36Z" fill="url(#tbTileGrad3)" fillOpacity="0.9" />
              <path d="M34 36C34 34.8954 34.8954 34 36 34H55C56.1046 34 57 34.8954 57 36V55C57 56.1046 56.1046 57 55 57H36C34.8954 57 34 56.1046 34 55V36Z" fill="url(#tbTileGrad4)" fillOpacity="0.95" />
              <path d="M32 17L22 47H27.5L29.5 41.5H34.5L36.5 47H42L32 17ZM30.8 37L32 30.5L33.2 37H30.8Z" fill="#000000" fillOpacity="0.88" />
              <circle cx="32" cy="34" fill="#abf2c6" r="1.8" />
            </svg>

            <span className="text-xs font-mono font-bold tracking-wider hidden sm:inline text-white">
              START
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
                  <span className="text-[10px] text-neutral-400">AADHISH OS</span>
                </div>

                <div className="space-y-2.5 pt-2.5">
                  {/* Fullscreen Status & Control */}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <Monitor size={13} style={{ color: 'var(--color-status-dot)' }} />
                      <span>Fullscreen:</span>
                    </span>
                    {isFullscreen ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono text-[10px] font-semibold tracking-wide">
                        Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setIsTrayMenuOpen(false);
                          onRequestFullscreen?.();
                        }}
                        className="px-2 py-0.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-mono text-[11px] cursor-pointer"
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
                      {theme === 'dark' ? 'Obsidian Dark' : 'VS Code Light'}
                    </button>
                  </div>

                  {/* Personalization shortcut */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsTrayMenuOpen(false);
                      openApp('settings');
                    }}
                    className="w-full mt-1 py-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-center text-[11px] text-emerald-400 font-semibold cursor-pointer block"
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
            {theme === 'dark' ? <Sun size={14} className="hover:text-amber-300" /> : <Moon size={14} className="hover:text-blue-500" />}
          </button>

          {/* AURA SESSION Unobtrusive Status & System Controls */}
          <button
            id="aura-session-button"
            type="button"
            onClick={() => setIsSessionMenuOpen(!isSessionMenuOpen)}
            className={`aura-session-trigger flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
              isSessionMenuOpen
                ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                : 'hover:bg-white/10 text-neutral-300 hover:text-white border-transparent'
            }`}
            title="AURA Session Controls"
            aria-label="AURA Session Controls"
            aria-expanded={isSessionMenuOpen}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isFullscreen
                  ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]'
                  : 'bg-amber-400/80'
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
