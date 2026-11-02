import React, { useEffect, useRef } from 'react';
import AppIcon from '../common/AppIcon';
import './AppSwitcher.css';

export default function AppSwitcher({
  isOpen,
  openWindows,
  selectedIndex,
  onSelectIndex,
  onClose
}) {
  const containerRef = useRef(null);

  // If no windows are open, or not open, do not render
  if (!isOpen || !openWindows || openWindows.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-label="Application Switcher"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none pointer-events-none animate-in fade-in duration-100"
    >
      <div
        ref={containerRef}
        className="aura-app-switcher p-3 rounded-2xl border shadow-2xl backdrop-blur-2xl flex flex-col gap-2 max-w-xl w-full animate-in zoom-in-95 duration-100 pointer-events-auto"
        style={{
          backgroundColor: 'rgba(9, 14, 26, 0.94)',
          borderColor: 'rgba(56, 189, 248, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.2)'
        }}
      >
        <div className="flex items-center justify-between px-2 pt-1 pb-2 border-b border-white/10 text-xs font-mono">
          <span className="text-cyan-400 font-semibold tracking-wider uppercase text-[11px]">
            Active Task Switcher
          </span>
          <span className="text-neutral-400 text-[10px]">
            Release Alt to Switch // Tab to Cycle
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto p-1.5 no-scrollbar">
          {openWindows.map((win, idx) => {
            const isSelected = idx === selectedIndex;

            return (
              <div
                key={win.id}
                onClick={() => onSelectIndex(idx)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-150 min-w-[100px] max-w-[120px] cursor-pointer ${
                  isSelected
                    ? 'bg-sky-500/20 border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)] scale-105'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center p-1.5 mb-2 border ${
                    isSelected
                      ? 'border-sky-400/50 bg-sky-500/30 text-white'
                      : 'border-white/10 bg-white/[0.04]'
                  }`}
                >
                  <AppIcon appId={win.id} size={28} />
                </div>

                <span
                  className={`text-xs font-mono font-medium truncate w-full ${
                    isSelected ? 'text-white font-bold' : 'text-neutral-300'
                  }`}
                >
                  {win.shortTitle || win.title}
                </span>

                <span
                  className={`text-[9px] font-mono mt-0.5 uppercase tracking-wide ${
                    win.isMinimized ? 'text-amber-400/80' : 'text-emerald-400/80'
                  }`}
                >
                  {win.isMinimized ? 'Minimized' : 'Active'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

