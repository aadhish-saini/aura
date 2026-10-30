import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for cross-browser Fullscreen API management.
 * Gracefully handles permissions, errors, and manual user exits (e.g. via ESC key).
 */
export function useFullscreen() {
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

  // Sync state on fullscreenchange events
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

      if (!currentlyFullscreen) {
        // User exited fullscreen (e.g. pressed Escape or browser control)
        setShowExitToast(true);
      } else {
        setShowExitToast(false);
      }
    };

    const handleFullscreenError = (err) => {
      console.warn('Fullscreen request error:', err);
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
      setShowExitToast(false);
      return { success: true };
    } catch (err) {
      console.warn('Could not enter fullscreen mode:', err);
      setFullscreenError('Fullscreen unavailable. Running in windowed mode.');
      return { success: false, error: err };
    }
  }, []);

  /**
   * Exit browser fullscreen if currently in fullscreen.
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
