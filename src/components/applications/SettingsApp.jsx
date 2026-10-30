import React from 'react';
import { Sun, Moon, Monitor, Sliders, Info, Keyboard, Maximize, Minimize } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';

export default function SettingsApp({
  theme,
  onToggleTheme,
  isFullscreen,
  onToggleFullscreen
}) {
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div>
            <span 
              className="text-[10px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--color-status-dot)' }}
            >
              PREFERENCES & RUNTIME
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              System Settings
            </h3>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              Appearance, workstation themes, display mode, and system shortcuts
            </p>
          </div>
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-mono border"
            style={{
              backgroundColor: 'rgba(52, 211, 153, 0.1)',
              borderColor: 'rgba(52, 211, 153, 0.25)',
              color: 'var(--color-status-dot)'
            }}
          >
            ACTIVE CONFIG
          </span>
        </div>

        {/* Display & Fullscreen Mode */}
        <div 
          className="p-5 rounded-xl border flex flex-col gap-3"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Monitor size={16} style={{ color: 'var(--color-status-dot)' }} />
              <h4 className="text-sm font-semibold text-white">Display & Fullscreen Simulation</h4>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              {isFullscreen ? 'FULLSCREEN ACTIVE' : 'WINDOWED MODE'}
            </span>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            AURA operates as an immersive workstation. When in windowed mode, you can expand to fullscreen below or via the <span className="font-semibold text-white">AURA SESSION</span> menu in the taskbar.
          </p>

          <div className="pt-1">
            {isFullscreen ? (
              <div
                className="px-4 py-2.5 rounded-lg text-xs font-mono flex items-center justify-between border"
                style={{
                  backgroundColor: 'rgba(52, 211, 153, 0.08)',
                  borderColor: 'rgba(52, 211, 153, 0.25)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="font-semibold">IMMERSIVE FULLSCREEN ACTIVE</span>
                </div>
                <span className="text-[10px] text-neutral-400">
                  Shut down via Start Menu or press Esc
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onToggleFullscreen}
                className="px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 active:scale-95"
                style={{
                  backgroundColor: 'var(--color-btn-accent-bg)',
                  borderColor: 'var(--color-border-strong)',
                  borderWidth: '1px',
                  color: 'var(--color-status-dot)'
                }}
              >
                <Maximize size={14} />
                <span>ENTER FULLSCREEN</span>
              </button>
            )}
          </div>
        </div>

        {/* Theme Settings Panel */}
        <div 
          className="p-5 rounded-xl border flex flex-col gap-4"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <div className="flex items-center gap-2">
            <Sliders size={16} style={{ color: 'var(--color-status-dot)' }} />
            <h4 className="text-sm font-semibold text-white">Appearance & Theme</h4>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Choose between AADHISH OS Obsidian Dark (authentic Stitch terminal black) and VS Code-Inspired Light mode. Theme persists in local storage across sessions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Dark Theme Card */}
            <button
              type="button"
              onClick={() => isDark ? null : onToggleTheme()}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                isDark ? 'ring-2 ring-emerald-400 brightness-110' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: '#050706',
                borderColor: isDark ? 'var(--color-status-dot)' : 'var(--color-border-subtle)',
                color: '#ffffff'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-emerald-400">
                  <Moon size={16} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold">AADHISH OS Obsidian Dark</div>
                  <div className="text-[10px] text-neutral-400 font-mono">Stitch Emerald / Black</div>
                </div>
              </div>
              {isDark && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              )}
            </button>

            {/* Light Theme Card */}
            <button
              type="button"
              onClick={() => !isDark ? null : onToggleTheme()}
              className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                !isDark ? 'ring-2 ring-blue-500 brightness-105' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: '#F8F9FC',
                borderColor: !isDark ? '#356AC3' : 'var(--color-border-subtle)',
                color: '#242938'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-neutral-300 flex items-center justify-center text-blue-600">
                  <Sun size={16} />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold">VS Code Light</div>
                  <div className="text-[10px] text-neutral-500 font-mono">Alabaster / Cobalt</div>
                </div>
              </div>
              {!isDark && (
                <span className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(53,106,195,0.8)]" />
              )}
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference */}
        <div 
          className="p-5 rounded-xl border flex flex-col gap-3"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <div className="flex items-center gap-2">
            <Keyboard size={16} style={{ color: 'var(--color-status-dot)' }} />
            <h4 className="text-sm font-semibold text-white">System Keyboard Shortcuts</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-1">
            <div className="p-2.5 rounded-lg border flex items-center justify-between" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <span>Escape</span>
              <span className="text-neutral-400 text-[11px]">Close open menus</span>
            </div>
            <div className="p-2.5 rounded-lg border flex items-center justify-between" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <span>Ctrl + Shift + Esc</span>
              <span className="text-neutral-400 text-[11px]">Open Terminal</span>
            </div>
            <div className="p-2.5 rounded-lg border flex items-center justify-between" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <span>Ctrl + Alt + S</span>
              <span className="text-neutral-400 text-[11px]">Toggle Start menu</span>
            </div>
            <div className="p-2.5 rounded-lg border flex items-center justify-between" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <span>Ctrl + Alt + F</span>
              <span className="text-neutral-400 text-[11px]">Toggle fullscreen</span>
            </div>
            <div className="p-2.5 rounded-lg border flex items-center justify-between sm:col-span-2" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <span>Alt + F4</span>
              <span className="text-neutral-400 text-[11px]">Close focused window</span>
            </div>
          </div>
        </div>

        {/* System Specifications Info */}
        <div 
          className="p-5 rounded-xl border flex flex-col gap-3"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <div className="flex items-center gap-2">
            <Info size={16} style={{ color: 'var(--color-status-dot)' }} />
            <h4 className="text-sm font-semibold text-white">About AADHISH OS — Developer Environment</h4>
          </div>

          <div className="space-y-2 text-xs font-mono" style={{ color: 'var(--color-text-secondary)' }}>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <span>Build Channel:</span>
              <span className="text-white font-medium">{PORTFOLIO_DATA.systemInfo.osVersion}</span>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <span>Architecture:</span>
              <span className="text-white font-medium">{PORTFOLIO_DATA.systemInfo.kernel}</span>
            </div>
            <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <span>Compositor:</span>
              <span className="text-white font-medium">Windows 11-Inspired Web Compositor</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Security State:</span>
              <span className="text-emerald-400 font-medium">UEFI SECURE BOOT VERIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Window Status Edge */}
      <div 
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)'
        }}
      >
        <span>SETTINGS ENGINE // SYNCED</span>
        <span>LOCALSTORAGE: ACTIVE</span>
      </div>
    </div>
  );
}
