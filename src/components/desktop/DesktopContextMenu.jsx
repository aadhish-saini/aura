import React, { useEffect, useRef } from 'react';
import {
  RefreshCw,
  Sliders,
  Terminal,
  Folder,
  Command,
  Monitor,
  LayoutGrid,
  ArrowDownAZ
} from 'lucide-react';
import './DesktopContextMenu.css';

export default function DesktopContextMenu({
  isOpen,
  position,
  onClose,
  onRefresh,
  openApp,
  onOpenCommandPalette,
  toggleShowDesktop,
  iconSize,
  setIconSize,
  sortBy,
  setSortBy
}) {
  const menuRef = useRef(null);

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('touchstart', handleOutsideClick, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Clamped position inside viewport
  const menuWidth = 210;
  const menuHeight = 320;
  const x = Math.max(10, Math.min(position.x, window.innerWidth - menuWidth - 10));
  const y = Math.max(10, Math.min(position.y, window.innerHeight - menuHeight - 50));

  return (
    <div
      ref={menuRef}
      className="desktop-context-menu fixed z-50 rounded-xl border p-1 shadow-2xl backdrop-blur-2xl font-mono text-xs select-none animate-in fade-in zoom-in-95 duration-100"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${menuWidth}px`,
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: 'var(--color-border-strong)',
        color: 'var(--color-text-primary)'
      }}
      role="menu"
      aria-label="Desktop context menu"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Refresh Desktop */}
      <button
        type="button"
        onClick={() => {
          onClose();
          onRefresh();
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <div className="flex items-center gap-2">
          <RefreshCw size={13} style={{ color: 'var(--color-status-dot)' }} />
          <span>Refresh Desktop</span>
        </div>
      </button>

      {/* Open Terminal */}
      <button
        type="button"
        onClick={() => {
          onClose();
          openApp('terminal', { x: position.x, y: position.y });
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <div className="flex items-center gap-2">
          <Terminal size={13} style={{ color: 'var(--color-status-dot)' }} />
          <span>Open Terminal</span>
        </div>
        <span className="text-[10px] text-neutral-500 font-sans">Ctrl+Shift+T</span>
      </button>

      {/* Open File Explorer */}
      <button
        type="button"
        onClick={() => {
          onClose();
          openApp('explorer', { x: position.x, y: position.y });
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <div className="flex items-center gap-2">
          <Folder size={13} style={{ color: 'var(--color-status-dot)' }} />
          <span>Open File Explorer</span>
        </div>
      </button>

      {/* Open Command Palette */}
      <button
        type="button"
        onClick={() => {
          onClose();
          onOpenCommandPalette?.();
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <div className="flex items-center gap-2">
          <Command size={13} style={{ color: 'var(--color-status-dot)' }} />
          <span>Command Palette</span>
        </div>
        <span className="text-[10px] text-neutral-500 font-sans">Ctrl+K</span>
      </button>

      {/* Show Desktop */}
      <button
        type="button"
        onClick={() => {
          onClose();
          toggleShowDesktop?.();
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <div className="flex items-center gap-2">
          <Monitor size={13} style={{ color: 'var(--color-status-dot)' }} />
          <span>Show Desktop</span>
        </div>
        <span className="text-[10px] text-neutral-500 font-sans">Win+D</span>
      </button>

      <div className="my-1 border-t" style={{ borderColor: 'var(--color-border-subtle)' }} />

      {/* View Submenu */}
      <div className="relative group">
        <button
          type="button"
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <LayoutGrid size={13} style={{ color: 'var(--color-status-dot)' }} />
            <span>View Icons</span>
          </div>
          <span className="text-[10px] text-neutral-400">▸</span>
        </button>

        <div
          className="context-submenu absolute left-full -top-1 ml-1 w-32 rounded-lg border p-1 hidden group-hover:block backdrop-blur-2xl shadow-xl"
          style={{
            backgroundColor: 'var(--color-bg-panel)',
            borderColor: 'var(--color-border-strong)'
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIconSize('large');
              onClose();
            }}
            className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between hover:bg-white/10 ${
              iconSize === 'large' ? 'text-sky-400 font-semibold' : ''
            }`}
          >
            <span>Large icons</span>
            {iconSize === 'large' && <span>✓</span>}
          </button>
          <button
            type="button"
            onClick={() => {
              setIconSize('medium');
              onClose();
            }}
            className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between hover:bg-white/10 ${
              iconSize === 'medium' ? 'text-sky-400 font-semibold' : ''
            }`}
          >
            <span>Medium icons</span>
            {iconSize === 'medium' && <span>✓</span>}
          </button>
          <button
            type="button"
            onClick={() => {
              setIconSize('small');
              onClose();
            }}
            className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between hover:bg-white/10 ${
              iconSize === 'small' ? 'text-sky-400 font-semibold' : ''
            }`}
          >
            <span>Small icons</span>
            {iconSize === 'small' && <span>✓</span>}
          </button>
        </div>
      </div>

      {/* Sort By Submenu */}
      <div className="relative group">
        <button
          type="button"
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <ArrowDownAZ size={13} style={{ color: 'var(--color-status-dot)' }} />
            <span>Sort by</span>
          </div>
          <span className="text-[10px] text-neutral-400">▸</span>
        </button>

        <div
          className="context-submenu absolute left-full -top-1 ml-1 w-28 rounded-lg border p-1 hidden group-hover:block backdrop-blur-2xl shadow-xl"
          style={{
            backgroundColor: 'var(--color-bg-panel)',
            borderColor: 'var(--color-border-strong)'
          }}
        >
          <button
            type="button"
            onClick={() => {
              setSortBy('name');
              onClose();
            }}
            className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between hover:bg-white/10 ${
              sortBy === 'name' ? 'text-sky-400 font-semibold' : ''
            }`}
          >
            <span>Name</span>
            {sortBy === 'name' && <span>✓</span>}
          </button>
          <button
            type="button"
            onClick={() => {
              setSortBy('default');
              onClose();
            }}
            className={`w-full px-2 py-1 text-left rounded text-[11px] flex items-center justify-between hover:bg-white/10 ${
              sortBy === 'default' ? 'text-sky-400 font-semibold' : ''
            }`}
          >
            <span>Default</span>
            {sortBy === 'default' && <span>✓</span>}
          </button>
        </div>
      </div>

      <div className="my-1 border-t" style={{ borderColor: 'var(--color-border-subtle)' }} />

      {/* Personalize (Opens Settings) */}
      <button
        type="button"
        onClick={() => {
          onClose();
          openApp('settings', { x: position.x, y: position.y });
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <Sliders size={13} style={{ color: 'var(--color-status-dot)' }} />
        <span>Personalize</span>
      </button>
    </div>
  );
}
