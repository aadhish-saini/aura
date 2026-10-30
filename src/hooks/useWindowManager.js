import { useState, useCallback, useRef } from 'react';
import { DESKTOP_APPS } from '../config/desktopApps';

const BASE_Z_INDEX = 30;

export function useWindowManager() {
  // Clean boot: every boot starts with all application windows closed
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const zIndexCounter = useRef(BASE_Z_INDEX + 2);

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

  // Open an app (or restore & focus if already open)
  const openApp = useCallback((appId) => {
    const appConfig = DESKTOP_APPS[appId];
    if (!appConfig) return;

    setOpenWindows((prev) => {
      const existing = prev.find((w) => w.id === appId);
      if (existing) {
        // Bring to front and restore
        zIndexCounter.current += 1;
        const newZ = zIndexCounter.current;
        return prev.map((w) =>
          w.id === appId
            ? { ...w, isMinimized: false, zIndex: newZ }
            : w
        );
      }

      // Open new instance
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

  // Close window
  const closeWindow = useCallback((appId) => {
    setOpenWindows((prev) => {
      const filtered = prev.filter((w) => w.id !== appId);
      if (activeWindowId === appId) {
        // Find highest z-index unminimized window to activate
        const activeCandidates = filtered.filter((w) => !w.isMinimized);
        if (activeCandidates.length > 0) {
          activeCandidates.sort((a, b) => b.zIndex - a.zIndex);
          setActiveWindowId(activeCandidates[0].id);
        } else {
          setActiveWindowId(null);
        }
      }
      return filtered;
    });
  }, [activeWindowId]);

  // Minimize window
  const minimizeWindow = useCallback((appId) => {
    setOpenWindows((prev) =>
      prev.map((win) => (win.id === appId ? { ...win, isMinimized: true } : win))
    );

    if (activeWindowId === appId) {
      setOpenWindows((prev) => {
        const candidates = prev.filter((w) => w.id !== appId && !w.isMinimized);
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
          return {
            ...win,
            isMaximized: !win.isMaximized,
            zIndex: newZ
          };
        }
        return win;
      })
    );
    setActiveWindowId(appId);
  }, []);

  // Taskbar click handler: toggle minimize or focus
  const handleTaskbarItemClick = useCallback((appId) => {
    const win = openWindows.find((w) => w.id === appId);
    if (!win) {
      openApp(appId);
      return;
    }

    if (win.isMinimized) {
      focusWindow(appId);
    } else if (activeWindowId === appId) {
      minimizeWindow(appId);
    } else {
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
    focusWindow,
    handleTaskbarItemClick,
    updateWindowPosition
  };
}
