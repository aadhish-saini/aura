import React, { useState, useRef, useEffect } from 'react';
import { DESKTOP_ICON_LIST } from '../../config/desktopApps';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import {
  Search,
  RotateCcw,
  Sliders,
  Power
} from 'lucide-react';
import AppIcon from '../common/AppIcon';

export default function StartMenu({ isOpen, onClose, openApp, onReturnToBoot }) {
  const [search, setSearch] = useState('');
  const menuRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('#start-menu-button')) {
        onClose();
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredApps = DESKTOP_ICON_LIST.filter(
    (app) =>
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.shortTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      ref={menuRef}
      className="fixed bottom-14 left-4 w-80 max-w-[calc(100vw-32px)] rounded-2xl border p-4 backdrop-blur-2xl shadow-2xl z-50 flex flex-col gap-4 font-sans animate-in fade-in slide-in-from-bottom-2 duration-200 select-none"
      style={{
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: 'var(--color-border-strong)'
      }}
    >
      {/* Profile Header */}
      <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border"
          style={{
            backgroundColor: 'var(--color-btn-accent-bg)',
            borderColor: 'var(--color-border-default)',
            color: 'var(--color-status-dot)'
          }}
        >
          A
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">
            {PORTFOLIO_DATA.identity.name}
          </div>
          <div className="text-[10px] font-mono truncate" style={{ color: 'var(--color-text-secondary)' }}>
            {PORTFOLIO_DATA.identity.title}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div 
        className="px-3 py-1.5 rounded-lg border flex items-center gap-2"
        style={{
          backgroundColor: 'var(--color-btn-default-bg)',
          borderColor: 'var(--color-border-default)'
        }}
      >
        <Search size={14} style={{ color: 'var(--color-text-muted)' }} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search applications..."
          className="bg-transparent text-xs text-white outline-none w-full font-mono placeholder:text-neutral-500"
          autoFocus
        />
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-3 gap-2 max-h-56 overflow-y-auto py-1">
        {filteredApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => {
              openApp(app.id);
              onClose();
            }}
            className="p-2 rounded-xl flex flex-col items-center text-center gap-1.5 hover:bg-white/10 transition-colors cursor-pointer group"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 p-1"
              style={{
                backgroundColor: 'var(--color-btn-accent-bg)',
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-status-dot)'
              }}
            >
              <AppIcon app={app} appId={app.id} size={24} />
            </div>
            <span className="text-[10px] font-mono text-neutral-300 truncate w-full">
              {app.shortTitle}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-2 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <button
          type="button"
          onClick={() => {
            onClose();
            openApp('settings');
          }}
          className="text-[11px] font-mono hover:underline flex items-center gap-1.5 cursor-pointer"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          <Sliders size={12} />
          <span>Settings</span>
        </button>

        <button
          type="button"
          onClick={() => {
            onClose();
            onReturnToBoot();
          }}
          className="px-2.5 py-1 rounded-md text-[11px] font-mono flex items-center gap-1.5 border transition-all cursor-pointer hover:bg-red-500/20 text-red-400"
          style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}
          title="Reboot AURA"
        >
          <Power size={11} />
          <span>Reboot</span>
        </button>
      </div>
    </div>
  );
}
