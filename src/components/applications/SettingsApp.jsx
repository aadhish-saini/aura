import React from 'react';
import { Moon, Monitor, Sliders, Info, Keyboard, Maximize } from 'lucide-react';
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
              backgroundColor: 'var(--color-badge-bg)',
              borderColor: 'var(--color-btn-accent-border)',
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
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  borderColor: 'rgba(56, 189, 248, 0.25)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.85)]" />
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

        {/* Appearance & Visual Identity */}
        <div 
          className="p-5 rounded-xl border flex flex-col gap-3"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders size={16} style={{ color: 'var(--color-status-dot)' }} />
              <h4 className="text-sm font-semibold text-white">Appearance & Theme</h4>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              LOCKED DARK
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            AURA is permanently configured in its signature Obsidian Dark environment (deep cosmic violet, slate navy, and electric cyan accents).
          </p>
          <div
            className="p-3.5 rounded-xl border flex items-center justify-between mt-1"
            style={{
              backgroundColor: '#06070a',
              borderColor: 'var(--color-border-subtle)',
              color: '#ffffff'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-cyan-400">
                <Moon size={16} />
              </div>
              <div>
                <div className="text-xs font-semibold">AURA Obsidian Dark</div>
                <div className="text-[10px] text-neutral-400 font-mono">Cosmic Violet & Cyan // Workstation Standard</div>
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.85)]" />
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
            <h4 className="text-sm font-semibold text-white">About AURA — Developer Environment</h4>
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
              <span className="text-sky-400 font-medium">UEFI SECURE BOOT VERIFIED</span>
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
