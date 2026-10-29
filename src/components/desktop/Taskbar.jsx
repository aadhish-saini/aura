import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Volume2,
  BatteryCharging
} from 'lucide-react';
import StartMenu from './StartMenu';
import AppIcon from '../common/AppIcon';

export default function Taskbar({
  openWindows,
  activeWindowId,
  onTaskbarItemClick,
  openApp,
  onReturnToBoot
}) {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  // Live real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
      setDateStr(
        now.toLocaleDateString([], {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }).toUpperCase()
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <footer 
        className="fixed bottom-0 left-0 right-0 h-12 z-50 px-3 md:px-4 flex items-center justify-between border-t backdrop-blur-md select-none transition-colors"
        style={{
          backgroundColor: 'var(--color-bg-panel)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-primary)'
        }}
      >
        {/* Left: Start Launcher & App Shortcuts */}
        <div className="flex items-center gap-2">
          {/* Start Launcher Button */}
          <button
            id="start-menu-button"
            type="button"
            onClick={() => setIsStartOpen(!isStartOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wide transition-all cursor-pointer hover:brightness-110 active:scale-95"
            style={{
              backgroundColor: 'var(--color-status-dot)',
              color: '#050706'
            }}
            title="AURA Start Launcher"
          >
            <span className="text-[10px]">▲</span>
            <span>AURA</span>
          </button>

          {/* Quick Pinned Launchers */}
          <div className="hidden sm:flex items-center gap-1 pl-1">
            <button
              type="button"
              onClick={() => openApp('terminal')}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-neutral-400 hover:text-white flex items-center justify-center w-7 h-7"
              title="Open Terminal CLI"
            >
              <AppIcon appId="terminal" size={17} />
            </button>
            <button
              type="button"
              onClick={() => openApp('explorer')}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-neutral-400 hover:text-white flex items-center justify-center w-7 h-7"
              title="Open File Explorer"
            >
              <AppIcon appId="explorer" size={16} />
            </button>
            <button
              type="button"
              onClick={() => openApp('settings')}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-neutral-400 hover:text-white flex items-center justify-center w-7 h-7"
              title="Open Settings"
            >
              <AppIcon appId="settings" size={16} />
            </button>
          </div>

          <div className="h-4 w-[1px] hidden sm:block mx-1" style={{ backgroundColor: 'var(--color-border-default)' }} />

          {/* Open Windows Tabs in Taskbar */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-[40vw] sm:max-w-[50vw]">
            {openWindows.map((win) => {
              const isCurrent = activeWindowId === win.id && !win.isMinimized;
              return (
                <button
                  key={win.id}
                  type="button"
                  onClick={() => onTaskbarItemClick(win.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer truncate shrink-0 border ${
                    isCurrent
                      ? 'bg-white/15 text-white font-medium shadow-sm'
                      : win.isMinimized
                      ? 'opacity-60 hover:opacity-100 hover:bg-white/5'
                      : 'hover:bg-white/10'
                  }`}
                  style={{
                    backgroundColor: isCurrent ? 'var(--color-btn-accent-bg)' : 'transparent',
                    borderColor: isCurrent ? 'var(--color-status-dot)' : 'transparent',
                    color: isCurrent ? 'var(--color-status-dot)' : 'var(--color-text-secondary)'
                  }}
                  title={win.title}
                >
                  <AppIcon app={win} appId={win.id} size={14} className="shrink-0" />
                  <span 
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: win.isMinimized ? 'var(--color-text-muted)' : 'var(--color-status-dot)'
                    }}
                  />
                  <span className="truncate max-w-[100px]">{win.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: System Tray & Clock */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Diagnostic indicators */}
          <div className="hidden md:flex items-center gap-2 text-neutral-400 text-xs">
            <Wifi size={13} />
            <Volume2 size={13} />
            <BatteryCharging size={14} className="text-emerald-400" />
          </div>

          <div className="hidden md:block h-4 w-[1px]" style={{ backgroundColor: 'var(--color-border-default)' }} />

          {/* Live Clock & Date */}
          <div className="flex flex-col items-end leading-tight select-none">
            <span className="text-xs font-semibold text-white tracking-wider">
              {timeStr || '12:00:00'}
            </span>
            <span className="text-[9px] tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              {dateStr || 'OCT 2026'}
            </span>
          </div>
        </div>
      </footer>

      {/* Start Menu Popup */}
      <StartMenu
        isOpen={isStartOpen}
        onClose={() => setIsStartOpen(false)}
        openApp={openApp}
        onReturnToBoot={onReturnToBoot}
      />
    </>
  );
}
