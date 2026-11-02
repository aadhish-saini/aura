import { useState, useCallback, useRef, useEffect } from 'react';
import { DESKTOP_APPS } from '../config/desktopApps';
import { resolveAppOrigin } from '../utils/windowAnimations';

const BASE_Z_INDEX = 30;
const CLOSE_ANIMATION_DURATION_MS = 240;

export function useWindowManager() {
  // Clean boot: every boot starts with all application windows closed
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const zIndexCounter = useRef(BASE_Z_INDEX + 2);
  const closeTimers = useRef({});

  // Cleanup all pending close timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(closeTimers.current).forEach((timerId) => clearTimeout(timerId));
      closeTimers.current = {};
    };
  }, []);

  // Focus a window and bring it to top
  const focusWindow = useCallback((appId) => {
    zIndexCounter.current += 1;
    const newZ = zIndexCounter.current;

    setOpenWindows((prev) =>
      prev.map((win) => {
        if (win.id === appId) {
          return {
            ...win,
            isMinimized: false,
            zIndex: newZ
          };
        }
        return win;
      })
    );
    setActiveWindowId(appId);
  }, []);

  // Open an app (or restore & focus if already open or closing)
  const openApp = useCallback((appId, origin = null) => {
    const appConfig = DESKTOP_APPS[appId];
    if (!appConfig) return;

    // Resolve launch origin for emerging animation
    const resolvedOrigin = resolveAppOrigin(appId, origin);

    // If this window was scheduled to close, cancel its close timer immediately
    if (closeTimers.current[appId]) {
      clearTimeout(closeTimers.current[appId]);
      delete closeTimers.current[appId];
    }

    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === appId);
      if (existing) {
        // Bring to front, cancel any closing state, and restore if minimized
        zIndexCounter.current += 1;
        const newZ = zIndexCounter.current;
        return prev.map((w) =>
          w.id === appId
            ? {
                ...w,
                isClosing: false,
                isMinimized: false,
                launchOrigin: resolvedOrigin || w.launchOrigin,
                zIndex: newZ
              }
            : w
        );
      }

      // Open new window instance
      zIndexCounter.current += 1;
      const newZ = zIndexCounter.current;

      // Calculate responsive default position
      const offset = (prev.length % 5) * 24;
      const posX = Math.max(20, Math.min(window.innerWidth - 750, (appConfig.defaultPosition?.x || 300) + offset));
      const posY = Math.max(60, Math.min(window.innerHeight - 550, (appConfig.defaultPosition?.y || 80) + offset));

      const newWindow = {
        id: appId,
        ...appConfig,
        isMinimized: false,
        isMaximized: false,
        snapState: null,
        preSnapRect: null,
        isClosing: false,
        launchOrigin: resolvedOrigin,
        position: { x: posX, y: posY },
        size: {
          width: Math.min(window.innerWidth - 40, appConfig.defaultWidth || 720),
          height: Math.min(window.innerHeight - 140, appConfig.defaultHeight || 540)
        },
        zIndex: newZ
      };

      return [...prev, newWindow];
    });

    setActiveWindowId(appId);
  }, []);

  // Close window with smooth closing animation delay
  const closeWindow = useCallback((appId) => {
    // Clear any existing timer for this window
    if (closeTimers.current[appId]) {
      clearTimeout(closeTimers.current[appId]);
      delete closeTimers.current[appId];
    }

    // 1. Immediately flag window as closing and shift active focus to the next window
    setOpenWindows((prev) => {
      const targetWin = prev.find((w) => w.id === appId);
      if (!targetWin) return prev;

      return prev.map((w) => (w.id === appId ? { ...w, isClosing: true } : w));
    });

    // 2. Select next active window immediately if closing the currently active window
    setActiveWindowId((currentActiveId) => {
      if (currentActiveId === appId) {
        // Look up remaining unminimized and non-closing windows
        setOpenWindows((latestWindows) => {
          const candidates = latestWindows.filter((w) => w.id !== appId && !w.isMinimized && !w.isClosing);
          if (candidates.length > 0) {
            candidates.sort((a, b) => b.zIndex - a.zIndex);
            return latestWindows; // keep state, return
          }
          return latestWindows;
        });

        // Compute new active id from current openWindows state
        // We'll compute it deterministically in a functional update below
      }
      return currentActiveId;
    });

    // Update active window id cleanly
    setOpenWindows((prev) => {
      if (activeWindowId === appId) {
        const candidates = prev.filter((w) => w.id !== appId && !w.isMinimized && !w.isClosing);
        if (candidates.length > 0) {
          candidates.sort((a, b) => b.zIndex - a.zIndex);
          setActiveWindowId(candidates[0].id);
        } else {
          setActiveWindowId(null);
        }
      }
      return prev;
    });

    // 3. Schedule the actual removal from state after the closing animation finishes
    closeTimers.current[appId] = setTimeout(() => {
      setOpenWindows((prev) => prev.filter((w) => w.id !== appId));
      delete closeTimers.current[appId];
    }, CLOSE_ANIMATION_DURATION_MS);
  }, [activeWindowId]);

  // Minimize window with smooth animation
  const minimizeWindow = useCallback((appId) => {
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === appId ? { ...win, isMinimized: true } : win))
    );

    if (activeWindowId === appId) {
      setOpenWindows((prev) => {
        const candidates = prev.filter((w) => w.id !== appId && !w.isMinimized && !w.isClosing);
        if (candidates.length > 0) {
          candidates.sort((a, b) => b.zIndex - a.zIndex);
          setActiveWindowId(candidates[0].id);
        } else {
          setActiveWindowId(null);
        }
        return prev;
      });
    }
  }, [activeWindowId]);

  // Maximize / restore window
  const maximizeWindow = useCallback((appId) => {
    zIndexCounter.current += 1;
    const newZ = zIndexCounter.current;

    setOpenWindows((prev) =>
      prev.map((win) => {
        if (win.id === appId) {
          const isCurrentlyExpanded = win.isMaximized || Boolean(win.snapState);
          if (isCurrentlyExpanded) {
            return {
              ...win,
              isMaximized: false,
              snapState: null,
              position: win.preSnapRect ? win.preSnapRect.position : win.position,
              size: win.preSnapRect ? win.preSnapRect.size : win.size,
              zIndex: newZ
            };
          } else {
            return {
              ...win,
              isMaximized: true,
              snapState: 'maximize',
              preSnapRect: { position: { ...win.position }, size: { ...win.size } },
              zIndex: newZ
            };
          }
        }
        return win;
      })
    );
    setActiveWindowId(appId);
  }, []);

  // Snap window to a designated screen region
  const snapWindow = useCallback((appId, snapType) => {
    zIndexCounter.current += 1;
    const newZ = zIndexCounter.current;

    setOpenWindows((prev) =>
      prev.map((win) => {
        if (win.id === appId) {
          if (!snapType) {
            return {
              ...win,
              snapState: null,
              isMaximized: false,
              position: win.preSnapRect ? win.preSnapRect.position : win.position,
              size: win.preSnapRect ? win.preSnapRect.size : win.size,
              zIndex: newZ
            };
          }

          const currentPreSnap = win.preSnapRect || { position: { ...win.position }, size: { ...win.size } };
          const isMax = snapType === 'maximize';

          return {
            ...win,
            snapState: snapType,
            isMaximized: isMax,
            preSnapRect: currentPreSnap,
            zIndex: newZ
          };
        }
        return win;
      })
    );
    setActiveWindowId(appId);
  }, []);

  // Minimize all windows or restore all (Show Desktop)
  const toggleShowDesktop = useCallback(() => {
    setOpenWindows((prev) => {
      const anyVisible = prev.some((w) => !w.isMinimized && !w.isClosing);
      if (anyVisible) {
        setActiveWindowId(null);
        return prev.map((w) => ({ ...w, isMinimized: true }));
      } else {
        if (prev.length > 0) {
          setActiveWindowId(prev[prev.length - 1].id);
        }
        return prev.map((w) => ({ ...w, isMinimized: false }));
      }
    });
  }, []);

  // Taskbar click handler: toggle minimize or focus / restore
  const handleTaskbarItemClick = useCallback((appId, origin = null) => {
    const win = openWindows.find((w) => w.id === appId);
    if (!win) {
      openApp(appId, origin);
      return;
    }

    if (win.isClosing) {
      // Re-activate if was closing
      openApp(appId, origin);
    } else if (win.isMinimized) {
      // Restore from minimized
      focusWindow(appId);
    } else if (activeWindowId === appId) {
      // Active window clicked on taskbar -> minimize
      minimizeWindow(appId);
    } else {
      // Inactive open window clicked -> bring to front
      focusWindow(appId);
    }
  }, [openWindows, activeWindowId, focusWindow, minimizeWindow, openApp]);

  // Update window position (from dragging)
  const updateWindowPosition = useCallback((appId, newPos) => {
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === appId ? { ...win, position: newPos } : win))
    );
  }, []);

  // Close currently active window (for Alt+F4)
  const closeActiveWindow = useCallback(() => {
    if (activeWindowId) {
      closeWindow(activeWindowId);
    }
  }, [activeWindowId, closeWindow]);

  return {
    openWindows,
    activeWindowId,
    openApp,
    closeWindow,
    closeActiveWindow,
    minimizeWindow,
    maximizeWindow,
    snapWindow,
    toggleShowDesktop,
    focusWindow,
    handleTaskbarItemClick,
    updateWindowPosition
  };
}
