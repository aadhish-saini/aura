import React from 'react';
import { Terminal, Sun, Moon, RotateCcw, Wifi, User, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';

export default function SystemBar({
  theme,
  onToggleTheme,
  onReturnToBoot,
  openApp,
  activeWindowId
}) {
  const isDark = theme === 'dark';

  return (
    <header 
      className="fixed top-0 left-0 right-0 h-12 z-50 px-4 md:px-6 flex items-center justify-between border-b backdrop-blur-md transition-colors select-none"
      style={{
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: 'var(--color-border-subtle)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Left: Branding & Node Telemetry */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-5 h-5 rounded flex items-center justify-center font-bold text-xs"
            style={{
              backgroundColor: 'var(--color-status-dot)',
              color: '#050706'
            }}
          >
            A
          </div>
          <span className="font-mono text-xs font-bold tracking-tight uppercase">
            AURA
          </span>
        </div>

        <div className="h-3.5 w-[1px] hidden sm:block" style={{ backgroundColor: 'var(--color-border-default)' }} />

        <span 
          className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            color: 'var(--color-text-secondary)'
          }}
        >
          DEVELOPER EDITION
        </span>

        <span 
          className="hidden lg:inline text-[9px] font-mono"
          style={{ color: 'var(--color-text-muted)' }}
        >
          NODE://PORTFOLIO.SYS
        </span>
      </div>

      {/* Center Nav: Quick Access Launchers */}
      <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
        <button
          type="button"
          onClick={() => openApp('projects')}
          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
            activeWindowId === 'projects'
              ? 'bg-emerald-500/15 text-emerald-400 font-medium'
              : 'hover:bg-white/5'
          }`}
          style={{ color: activeWindowId === 'projects' ? 'var(--color-status-dot)' : 'var(--color-text-secondary)' }}
        >
          Projects
        </button>

        <button
          type="button"
          onClick={() => openApp('terminal')}
          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
            activeWindowId === 'terminal'
              ? 'bg-emerald-500/15 text-emerald-400 font-medium'
              : 'hover:bg-white/5'
          }`}
          style={{ color: activeWindowId === 'terminal' ? 'var(--color-status-dot)' : 'var(--color-text-secondary)' }}
        >
          Terminal
        </button>

        <button
          type="button"
          onClick={() => openApp('skills')}
          className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
            activeWindowId === 'skills'
              ? 'bg-emerald-500/15 text-emerald-400 font-medium'
              : 'hover:bg-white/5'
          }`}
          style={{ color: activeWindowId === 'skills' ? 'var(--color-status-dot)' : 'var(--color-text-secondary)' }}
        >
          Skills
        </button>
      </nav>

      {/* Right: Telemetry, Theme Toggle, Reboot & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Status Telemetry */}
        <div 
          className="hidden sm:flex items-center gap-2 text-[10px] font-mono"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full" 
            style={{ 
              backgroundColor: 'var(--color-status-dot)', 
              boxShadow: 'var(--color-status-glow)' 
            }} 
          />
          <span className="hidden md:inline">ONLINE</span>
          <span>|</span>
          <span className="text-white font-medium">127.0.0.1</span>
        </div>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-1.5 rounded-md border transition-all cursor-pointer hover:brightness-110 active:scale-95"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-secondary)'
          }}
          title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDark ? (
            <Sun size={13} className="hover:text-amber-300 transition-colors" />
          ) : (
            <Moon size={13} className="hover:text-blue-600 transition-colors" />
          )}
        </button>

        {/* Reboot / Return to Boot Screen */}
        <button
          type="button"
          onClick={onReturnToBoot}
          className="p-1.5 rounded-md border transition-all cursor-pointer hover:brightness-110 active:scale-95"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-secondary)'
          }}
          title="Reboot AURA (Return to Boot Screen)"
          aria-label="Reboot AURA"
        >
          <RotateCcw size={13} />
        </button>

        {/* Profile Avatar */}
        <button
          type="button"
          onClick={() => openApp('about')}
          className="w-7 h-7 rounded-full flex items-center justify-center border font-mono text-xs font-bold cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundColor: 'var(--color-btn-accent-bg)',
            borderColor: 'var(--color-border-default)',
            color: 'var(--color-status-dot)'
          }}
          title="Open Developer Profile (About Me)"
        >
          A
        </button>
      </div>
    </header>
  );
}
