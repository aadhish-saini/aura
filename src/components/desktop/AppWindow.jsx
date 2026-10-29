import React, { useRef, useState, useEffect } from 'react';
import {
  Minus,
  Square,
  Copy,
  X
} from 'lucide-react';
import AppIcon from '../common/AppIcon';

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
    if (e.target.closest('button') || e.target.closest('[role="button"]')) return;

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
        top: '52px',
        left: '0',
        right: '0',
        bottom: '52px',
        width: '100vw',
        height: 'calc(100vh - 104px)',
        zIndex: win.zIndex,
      }
    : {
        position: 'fixed',
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        width: `${win.size.width}px`,
        height: `${win.size.height}px`,
        maxWidth: 'calc(100vw - 32px)',
        maxHeight: 'calc(100vh - 120px)',
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
        className={`h-9 px-3.5 flex items-center justify-between border-b select-none transition-colors ${
          win.isMaximized || isSmallScreen ? 'cursor-default' : 'cursor-move'
        }`}
        style={{
          backgroundColor: 'var(--color-btn-default-bg)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        {/* App Title & Icon */}
        <div className="flex items-center gap-2 min-w-0">
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
            className="text-[9px] font-mono ml-2 hidden sm:inline"
            style={{ color: 'var(--color-text-muted)' }}
          >
            PID: 884{win.id.charCodeAt(0) % 10}
          </span>
        </div>

        {/* Window Controls (Minimize, Maximize/Restore, Close) */}
        <div className="flex items-center gap-1.5 shrink-0 ml-3">
          {/* Minimize */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize(win.id);
            }}
            title="Minimize"
            aria-label="Minimize Window"
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors cursor-pointer group"
            style={{ backgroundColor: 'var(--color-btn-accent-bg)' }}
          >
            <Minus size={9} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-primary)' }} />
          </button>

          {/* Maximize / Restore */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize(win.id);
            }}
            title={win.isMaximized ? 'Restore' : 'Maximize'}
            aria-label="Maximize or Restore Window"
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors cursor-pointer group"
            style={{ backgroundColor: 'var(--color-btn-accent-bg)' }}
          >
            {win.isMaximized ? (
              <Copy size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-primary)' }} />
            ) : (
              <Square size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--color-text-primary)' }} />
            )}
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose(win.id);
            }}
            title="Close"
            aria-label="Close Window"
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors cursor-pointer group hover:!bg-red-500"
            style={{ backgroundColor: 'var(--color-btn-accent-bg)' }}
          >
            <X size={9} className="opacity-0 group-hover:opacity-100 text-white transition-opacity" />
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
