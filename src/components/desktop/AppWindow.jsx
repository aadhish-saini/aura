import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import AppIcon from '../common/AppIcon';
import {
  computeLaunchTransform,
  computeTaskbarDelta,
  isReducedMotion
} from '../../utils/windowAnimations';
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
  const [isDraggingState, setIsDraggingState] = useState(false);
  const dragStart = useRef({ mouseX: 0, mouseY: 0, winX: 0, winY: 0 });
  const [pos, setPos] = useState(win.position);

  // Viewport dimensions for responsive maximized state
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync state if external position changes
  useEffect(() => {
    setPos(win.position);
  }, [win.position]);

  // Window rect calculation
  const isSmallScreen = viewport.width < 768;
  const isMaximized = win.isMaximized || isSmallScreen;

  const currentRect = useMemo(() => {
    if (isMaximized) {
      return {
        left: 8,
        top: 8,
        width: Math.max(300, viewport.width - 16),
        height: Math.max(200, viewport.height - 64)
      };
    }
    return {
      left: pos.x,
      top: pos.y,
      width: win.size.width,
      height: win.size.height
    };
  }, [isMaximized, viewport, pos.x, pos.y, win.size.width, win.size.height]);

  // Launch transform parameters (origin-aware)
  const launchParams = useMemo(() => {
    return computeLaunchTransform(win.launchOrigin, currentRect);
  }, [win.launchOrigin, currentRect]);

  // Taskbar docking delta for minimize & restore
  const taskbarDelta = useMemo(() => {
    return computeTaskbarDelta(win.id, currentRect);
  }, [win.id, currentRect]);

  /**
   * Animation Stages:
   * 'opening'    -> initial mount emergence animation (280ms)
   * 'idle'       -> steady interactive state
   * 'minimizing' -> shrinking and gliding towards taskbar icon (220ms)
   * 'minimized'  -> hidden, preserving full React child state
   * 'restoring'  -> expanding from taskbar icon back to normal (260ms)
   * 'closing'    -> dissolving back towards launcher origin (200ms)
   */
  const [animStage, setAnimStage] = useState(() => (isReducedMotion() ? 'idle' : 'opening'));
  const animTimerRef = useRef(null);
  const prevMinimizedRef = useRef(win.isMinimized);
  const prevClosingRef = useRef(win.isClosing);

  // 1. Initial Opening Animation duration handling
  useEffect(() => {
    if (isReducedMotion()) {
      setAnimStage('idle');
      return;
    }

    animTimerRef.current = setTimeout(() => {
      setAnimStage('idle');
    }, 290);

    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, []); // Run only on initial mount

  // 2. React to isMinimized changes
  useEffect(() => {
    if (prevMinimizedRef.current === win.isMinimized) return;
    prevMinimizedRef.current = win.isMinimized;

    if (animTimerRef.current) clearTimeout(animTimerRef.current);

    if (win.isMinimized) {
      // Begin minimizing animation
      if (isReducedMotion()) {
        setAnimStage('minimized');
      } else {
        setAnimStage('minimizing');
        animTimerRef.current = setTimeout(() => {
          setAnimStage('minimized');
        }, 220);
      }
    } else {
      // Begin restoring animation
      if (isReducedMotion()) {
        setAnimStage('idle');
      } else {
        setAnimStage('restoring');
        animTimerRef.current = setTimeout(() => {
          setAnimStage('idle');
        }, 260);
      }
    }
  }, [win.isMinimized]);

  // 3. React to isClosing changes
  useEffect(() => {
    if (prevClosingRef.current === win.isClosing) return;
    prevClosingRef.current = win.isClosing;

    if (win.isClosing) {
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      setAnimStage('closing');
    } else if (animStage === 'closing') {
      // Window was revived from closing state (rapid re-open)
      setAnimStage('idle');
    }
  }, [win.isClosing, animStage]);

  // Window dragging by header
  const handleMouseDown = (e) => {
    // Only drag with left click and when not maximized
    if (e.button !== 0 || isMaximized) return;

    // Don't drag if clicked on a button or control
    if (e.target.closest('button') || e.target.closest('[role="button"]') || e.target.closest('.aura-control-btn')) return;

    isDragging.current = true;
    setIsDraggingState(true);
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
        setIsDraggingState(false);
        onPositionChange?.(win.id, pos);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Double click title bar to toggle maximize / restore
  const handleTitleBarDoubleClick = (e) => {
    if (e.target.closest('button') || e.target.closest('.aura-control-btn')) return;
    onMaximize(win.id);
  };

  // CSS variables for keyframe interpolation
  const cssVariables = useMemo(() => {
    const { translateX, translateY, scale, transformOrigin } = launchParams;
    const { deltaX, deltaY } = taskbarDelta;

    return {
      '--win-launch-transform': `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
      '--win-close-transform': `translate3d(${Math.round(translateX * 0.7)}px, ${Math.round(translateY * 0.7)}px, 0) scale(0.94)`,
      '--win-taskbar-transform': `translate3d(${Math.round(deltaX * 0.45)}px, ${Math.round(deltaY * 0.45)}px, 0) scale(0.65)`,
      transformOrigin
    };
  }, [launchParams, taskbarDelta]);

  // Positional and dimensional geometry
  const geometryStyle = useMemo(() => {
    return {
      position: 'fixed',
      left: `${currentRect.left}px`,
      top: `${currentRect.top}px`,
      width: `${currentRect.width}px`,
      height: `${currentRect.height}px`,
      zIndex: win.zIndex,
      borderRadius: isMaximized ? '8px' : '12px'
    };
  }, [currentRect, win.zIndex, isMaximized]);

  return (
    <div
      onMouseDown={onFocus}
      id={`app-window-${win.id}`}
      data-window-id={win.id}
      className={`aura-app-window flex flex-col overflow-hidden backdrop-blur-2xl select-none ${
        isActive ? 'aura-window-active' : 'aura-window-inactive'
      } ${isDraggingState ? 'is-dragging' : ''} ${
        isMaximized ? 'is-maximized' : ''
      } anim-${animStage}`}
      style={{
        ...geometryStyle,
        ...cssVariables,
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: isActive ? 'var(--color-status-dot)' : 'var(--color-border-default)',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
      role="dialog"
      aria-label={win.title}
    >
      {/* Title Bar / Draggable Chrome */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={handleTitleBarDoubleClick}
        className={`aura-window-titlebar select-none transition-colors ${
          isMaximized ? 'cursor-default' : 'cursor-move'
        }`}
      >
        {/* App Title & Icon */}
        <div className="flex items-center gap-2 min-w-0 pr-3 pointer-events-none">
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
        <div className="aura-window-controls pointer-events-auto">
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

      {/* Window Body Container: preserves children and internal states across minimize/restore */}
      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
