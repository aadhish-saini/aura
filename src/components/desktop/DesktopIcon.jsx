import React from 'react';
import AppIcon from '../common/AppIcon';

export default function DesktopIcon({ app, isOpen, isActive, onOpen, iconSize = 'medium' }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(app.id);
    }
  };

  const sizeClasses =
    iconSize === 'small'
      ? { box: 'w-10 h-10', icon: 20, font: 'text-[10px]' }
      : iconSize === 'large'
      ? { box: 'w-14 h-14', icon: 32, font: 'text-xs' }
      : { box: 'w-12 h-12', icon: 26, font: 'text-[11px]' };

  return (
    <button
      type="button"
      onClick={() => onOpen(app.id)}
      onKeyDown={handleKeyDown}
      className={`group flex sm:flex-col items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer text-left sm:text-center w-full sm:w-20 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        isActive
          ? 'bg-white/10 shadow-sm'
          : 'hover:bg-white/5 active:scale-95'
      }`}
      title={`Open ${app.shortTitle || app.title}`}
      aria-label={`Open ${app.shortTitle || app.title}`}
    >
      <div 
        className={`relative ${sizeClasses.box} rounded-xl flex items-center justify-center transition-all group-hover:scale-105 border shadow-sm p-1.5`}
        style={{
          backgroundColor: isOpen ? 'var(--color-btn-accent-bg)' : 'var(--color-btn-default-bg)',
          borderColor: isOpen ? 'var(--color-status-dot)' : 'var(--color-border-subtle)',
          color: isOpen ? 'var(--color-status-dot)' : 'var(--color-text-secondary)'
        }}
      >
        <AppIcon app={app} appId={app.id} size={sizeClasses.icon} />

        {/* Running app indicator dot */}
        {isOpen && (
          <span 
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-black shadow-[0_0_6px_rgba(52,211,153,0.8)]"
            style={{ backgroundColor: 'var(--color-status-dot)' }}
          />
        )}
      </div>

      <span 
        className={`font-mono ${sizeClasses.font} font-medium tracking-tight truncate max-w-[80px]`}
        style={{ color: isOpen ? 'var(--color-status-dot)' : 'var(--color-text-secondary)' }}
      >
        {app.shortTitle || app.title}
      </span>
    </button>
  );
}
