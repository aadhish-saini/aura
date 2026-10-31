import React, { useEffect, useRef } from 'react';
import { RefreshCw, Sliders, Terminal, LayoutGrid, ArrowDownAZ } from 'lucide-react';
import './DesktopContextMenu.css';

export default function DesktopContextMenu({
  isOpen,
  position,
  onClose,
  onRefresh,
  openApp,
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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Clamped position inside viewport
  const menuWidth = 200;
  const menuHeight = 220;
  const x = Math.min(position.x, window.innerWidth - menuWidth - 10);
  const y = Math.min(position.y, window.innerHeight - menuHeight - 50);

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
      {/* View Options */}
      <div className="relative group">
        <button
          type="button"
          className="w-full px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors hover:bg-white/10 cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <LayoutGrid size={13} style={{ color: 'var(--color-status-dot)' }} />
            <span>View</span>
          </div>
          <span className="text-[10px] text-neutral-400">▸</span>
        </button>

        {/* View submenu on hover */}
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

      {/* Sort By */}
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

        {/* Sort submenu */}
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

      {/* Refresh */}
      <button
        type="button"
        onClick={() => {
          onClose();
          onRefresh();
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <RefreshCw size={13} style={{ color: 'var(--color-status-dot)' }} />
        <span>Refresh</span>
      </button>

      <div className="my-1 border-t" style={{ borderColor: 'var(--color-border-subtle)' }} />

      {/* Open Terminal */}
      <button
        type="button"
        onClick={() => {
          onClose();
          openApp('terminal', { x: position.x, y: position.y });
        }}
        className="w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-colors hover:bg-white/10 cursor-pointer text-left"
      >
        <Terminal size={13} style={{ color: 'var(--color-status-dot)' }} />
        <span>Open Terminal</span>
      </button>

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
