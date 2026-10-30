import React, { useRef, useEffect } from 'react';
import { Moon, RotateCw, Power } from 'lucide-react';
import './PowerMenu.css';

export default function PowerMenu({
  isOpen,
  onClose,
  onSleep,
  onRestart,
  onShutdown
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('#power-menu-button')) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="power-menu-popover fixed z-50 rounded-xl border p-1.5 shadow-2xl backdrop-blur-2xl font-mono select-none animate-in fade-in zoom-in-95 duration-150"
      style={{
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: 'var(--color-border-strong)',
        color: 'var(--color-text-primary)'
      }}
      role="menu"
      aria-label="Power Options"
    >
      {/* Sleep Option */}
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          onSleep();
        }}
        className="w-full px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer hover:bg-white/10 text-left group"
      >
        <div
          className="w-7 h-7 rounded-md border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-secondary)'
          }}
        >
          <Moon size={13} className="group-hover:text-amber-400 transition-colors" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white group-hover:text-sky-400 transition-colors">
            Sleep
          </span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
            Preserves state in memory
          </span>
        </div>
      </button>

      {/* Restart Option */}
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          onRestart();
        }}
        className="w-full px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer hover:bg-white/10 text-left group"
      >
        <div
          className="w-7 h-7 rounded-md border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-secondary)'
          }}
        >
          <RotateCw size={13} className="group-hover:text-blue-400 transition-colors" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white group-hover:text-sky-400 transition-colors">
            Restart AURA
          </span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
            Reboots system environment
          </span>
        </div>
      </button>

      <div className="my-1 border-t" style={{ borderColor: 'var(--color-border-subtle)' }} />

      {/* Shut Down Option */}
      <button
        type="button"
        role="menuitem"
        onClick={() => {
          onClose();
          onShutdown();
        }}
        className="w-full px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors cursor-pointer hover:bg-rose-500/15 text-left group"
      >
        <div
          className="w-7 h-7 rounded-md border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-400 bg-rose-500/10 transition-transform group-hover:scale-105"
        >
          <Power size={13} />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-rose-400 group-hover:text-rose-300 transition-colors">
            Shut Down AURA
          </span>
          <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
            Exit session & power down
          </span>
        </div>
      </button>
    </div>
  );
}
