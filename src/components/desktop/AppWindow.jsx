import React, { useRef, useState, useEffect } from 'react';
import AppIcon from '../common/AppIcon';
import './AppWindow.css';

export default function AppWindow({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  children
}) {
  const isDragging = useRef(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });
  const [pos, setPos] = useState(win.position);

  // Sync state if external position changes
  useEffect(() => {
    setPos(win.position);
  }, [win.position]);

  // Window dragging by header
  const handleMouseDown = (e) => {
    // Only drag with left click and when not maximized
    if (e.button !== 0 || win.isMaximized) return;

    // Don't drag if clicked on a button or control
    if (e.target.closest('button') || e.target.closest('[role="button"]') || e.target.closest('.aura-control-btn')) return;

    isDragging.current = true;
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: pos.x,
      winY: pos.y
    };

    onFocus();

    const handleMouseMove = (moveEvent) => {
      if (!isDragging.current) return;
      const dx = moveEvent.clientX - dragStart.current.mouseX;
      const dy = moveEvent.clientY - dragStart.current.mouseY;

      // Bound within screen
      const newX = Math.max(0, Math.min(window.innerWidth - 120, dragStart.current.winX + dx));
      const newY = Math.max(50, Math.min(window.innerHeight - 100, dragStart.current.winY + dy));

      setPos({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        onPositionChange?.(win.id, pos);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  if (win.isMinimized) return null;

  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;

  const style = win.isMaximized || isSmallScreen
    ? {
        position: 'fixed',
        top: '8px',
        left: '8px',
        right: '8px',
        bottom: '56px',
        width: 'calc(100vw - 16px)',
        height: 'calc(100vh - 64px)',
        zIndex: win.zIndex,
      }
    : {
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: 'calc(100vh - 76px)',
        zIndex: win.zIndex,
      };

  return (
    <div
      onMouseDown={onFocus}
      className={`rounded-xl flex flex-col overflow-hidden backdrop-blur-2xl transition-shadow select-none ${
        isActive
          ? 'shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-emerald-500/30'
          : 'shadow-xl opacity-95'
      }`}
      style={{
        ...style,
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: isActive ? 'var(--color-status-dot)' : 'var(--color-border-default)',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      {/* Title Bar / Draggable Chrome */}
      <div
        onMouseDown={handleMouseDown}
        className={`aura-window-titlebar select-none transition-colors ${
          win.isMaximized || isSmallScreen ? 'cursor-default' : 'cursor-move'
        }`}
      >
        {/* App Title & Icon */}
        <div className="flex items-center gap-2 min-w-0 pr-3">
          <AppIcon
            app={win}
            appId={win.id}
            size={16}
            style={{ color: 'var(--color-status-dot)' }}
            className="shrink-0"
          />
          <span
            className="font-mono text-xs font-medium truncate"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {win.title}
          </span>
          <span
            className="text-[9px] font-mono ml-2 hidden sm:inline shrink-0"
            style={{ color: 'var(--color-text-muted)' }}
          >
            PID: 884{win.id.charCodeAt(0) % 10}
          </span>
        </div>

        {/* Unique Floating Minimal Window Controls for AURA */}
        <div className="aura-window-controls">
          {/* Minimize */}
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(win.id);
            }}
            title="Minimize"
            aria-label="Minimize Window"
            className="aura-control-btn aura-control-minimize"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>

          {/* Maximize / Restore */}
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(win.id);
            }}
            title={win.isMaximized ? 'Restore' : 'Maximize'}
            aria-label={win.isMaximized ? 'Restore Window' : 'Maximize Window'}
            className="aura-control-btn aura-control-maximize"
          >
            {win.isMaximized ? (
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-hidden="true"
              >
                <path d="M4.5 1.5V4.5H1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 1.5V4.5H10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 7.5H4.5V10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 7.5H7.5V10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="8" height="8" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            )}
          </button>

          {/* Close */}
          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose(win.id);
            }}
            title="Close"
            aria-label="Close Window"
            className="aura-control-btn aura-control-close"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <path d="M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
