import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for cross-browser Fullscreen API management with AURA Immersive Session support.
 * Gracefully handles user gesture permissions, browser Escape exit, recovery notifications,
 * and clean shutdown/reboot transitions without loops or focus trapping.
 */
export function useFullscreen({ isDesktopActive = true } = {}) {
  const [isFullscreen, setIsFullscreen] = useState(() => {
    if (typeof document !== 'undefined') {
      return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );
    }
    return false;
  });

  const [fullscreenError, setFullscreenError] = useState(null);
  const [showExitToast, setShowExitToast] = useState(false);

  // Tracks whether fullscreen was successfully active in the current session
  const hasBeenFullscreenRef = useRef(false);
  const isDesktopActiveRef = useRef(isDesktopActive);
  const toastTimeoutRef = useRef(null);

  // Keep isDesktopActiveRef up-to-date
  useEffect(() => {
    isDesktopActiveRef.current = isDesktopActive;
    // If desktop is no longer active (e.g. shutdown or boot), dismiss any lingering exit toast
    if (!isDesktopActive) {
      setShowExitToast(false);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = null;
      }
    }
  }, [isDesktopActive]);

  // Sync state on native fullscreenchange events
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleFullscreenChange = () => {
      const activeElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement;

      const currentlyFullscreen = !!activeElement;
      setIsFullscreen(currentlyFullscreen);

      if (currentlyFullscreen) {
        // Fullscreen successfully entered
        hasBeenFullscreenRef.current = true;
        setShowExitToast(false);
        if (toastTimeoutRef.current) {
          clearTimeout(toastTimeoutRef.current);
          toastTimeoutRef.current = null;
        }
      } else {
        // Fullscreen ended (e.g. user pressed Escape or browser control)
        // Only trigger the exit notification if the user was previously in fullscreen,
        // and the desktop is currently active (not during boot, launcher, or shutdown).
        if (hasBeenFullscreenRef.current && isDesktopActiveRef.current) {
          setShowExitToast(true);
          // Auto-dismiss after 10 seconds if user does not interact
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
          toastTimeoutRef.current = setTimeout(() => {
            setShowExitToast(false);
            toastTimeoutRef.current = null;
          }, 10000);
        }
        // Reset the flag so notification is not repeatedly shown while staying in windowed mode
        hasBeenFullscreenRef.current = false;
      }
    };

    const handleFullscreenError = (err) => {
      console.warn('Fullscreen API request error:', err);
      setFullscreenError('Fullscreen was unavailable in your browser.');
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    document.addEventListener('fullscreenerror', handleFullscreenError);
    document.addEventListener('webkitfullscreenerror', handleFullscreenError);
    document.addEventListener('mozfullscreenerror', handleFullscreenError);
    document.addEventListener('MSFullscreenError', handleFullscreenError);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);

      document.removeEventListener('fullscreenerror', handleFullscreenError);
      document.removeEventListener('webkitfullscreenerror', handleFullscreenError);
      document.removeEventListener('mozfullscreenerror', handleFullscreenError);
      document.removeEventListener('MSFullscreenError', handleFullscreenError);

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  /**
   * Request fullscreen on the document root element.
   * Returns a promise resolving to { success: boolean, error?: any }
   * without letting rejections crash the caller.
   */
  const requestFullscreen = useCallback(async () => {
    setFullscreenError(null);
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        await elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        await elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        await elem.msRequestFullscreen();
      } else {
        throw new Error('Fullscreen API is not supported on this browser.');
      }
      setIsFullscreen(true);
      hasBeenFullscreenRef.current = true;
      setShowExitToast(false);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = null;
      }
      return { success: true };
    } catch (err) {
      console.warn('Could not enter fullscreen mode:', err);
      setFullscreenError('Fullscreen unavailable. Running in windowed mode.');
      return { success: false, error: err };
    }
  }, []);

  /**
   * Exit browser fullscreen safely if currently in fullscreen.
   */
  const exitFullscreen = useCallback(async () => {
    try {
      const isFs = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );

      if (isFs && document.exitFullscreen) {
        await document.exitFullscreen();
      } else if (isFs && document.webkitExitFullscreen) {
        await document.webkitExitFullscreen();
      } else if (isFs && document.mozCancelFullScreen) {
        await document.mozCancelFullScreen();
      } else if (isFs && document.msExitFullscreen) {
        await document.msExitFullscreen();
      }
      setIsFullscreen(false);
      setShowExitToast(false);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = null;
      }
      return { success: true };
    } catch (err) {
      console.warn('Error exiting fullscreen:', err);
      return { success: false, error: err };
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      return await exitFullscreen();
    } else {
      return await requestFullscreen();
    }
  }, [isFullscreen, exitFullscreen, requestFullscreen]);

  const dismissExitToast = useCallback(() => {
    setShowExitToast(false);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
  }, []);

  return {
    isFullscreen,
    fullscreenError,
    showExitToast,
    requestFullscreen,
    exitFullscreen,
    toggleFullscreen,
    dismissExitToast,
    clearFullscreenError: () => setFullscreenError(null)
  };
}
