/**
 * Window Animation Utilities for AURA OS
 * 
 * Provides mathematical modeling for origin-based emergence,
 * taskbar docking deltas, and accessible reduced-motion detection.
 */

/**
 * Checks if the user prefers reduced motion
 */
export function isReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Helper to get the screen center coordinates of an element by selector
 */
export function getElementCenter(selector) {
  if (typeof document === 'undefined') return null;
  try {
    const el = document.querySelector(selector);
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        return {
          x: Math.round(r.left + r.width / 2),
          y: Math.round(r.top + r.height / 2)
        };
      }
    }
  } catch (e) {
    // ignore query errors
  }
  return null;
}

/**
 * Resolves the launch origin for an app by checking:
 * 1. Explicitly passed origin
 * 2. Desktop icon element
 * 3. Taskbar icon element
 * 4. Fallback to bottom-center emergence
 */
export function resolveAppOrigin(appId, explicitOrigin = null) {
  if (explicitOrigin && typeof explicitOrigin.x === 'number' && typeof explicitOrigin.y === 'number') {
    return explicitOrigin;
  }

  // Check desktop icon
  const desktopCenter = getElementCenter(`[data-desktop-icon="${appId}"]`);
  if (desktopCenter) return desktopCenter;

  // Check taskbar icon
  const taskbarCenter = getElementCenter(`[data-taskbar-icon="${appId}"]`);
  if (taskbarCenter) return taskbarCenter;

  // Default fallback: bottom-center (Start / taskbar area)
  if (typeof window !== 'undefined') {
    return {
      x: Math.round(window.innerWidth / 2),
      y: Math.round(window.innerHeight - 30)
    };
  }

  return null;
}

/**
 * Computes the launch emergence offset and transform-origin
 * based on the launch origin relative to the window rect.
 *
 * Visual specs:
 * - Scale: 92–95% (0.94 default)
 * - Subtle directional movement (up to 16px along the vector to the launcher)
 * - Natural transform-origin biased toward the launcher
 */
export function computeLaunchTransform(launchOrigin, winRect) {
  if (isReducedMotion()) {
    return {
      translateX: 0,
      translateY: 0,
      scale: 1,
      transformOrigin: '50% 50%'
    };
  }

  // Fallback: subtle upward glide from bottom
  if (!launchOrigin || typeof launchOrigin.x !== 'number') {
    return {
      translateX: 0,
      translateY: 14,
      scale: 0.94,
      transformOrigin: '50% 80%'
    };
  }

  const winCenterX = winRect.left + winRect.width / 2;
  const winCenterY = winRect.top + winRect.height / 2;

  const dx = launchOrigin.x - winCenterX;
  const dy = launchOrigin.y - winCenterY;
  const dist = Math.hypot(dx, dy) || 1;

  // Maximum displacement: 16px along the vector
  const maxDisplacement = 16;
  const displacement = Math.min(maxDisplacement, dist * 0.05);

  const translateX = Math.round((dx / dist) * displacement);
  const translateY = Math.round((dy / dist) * displacement);

  // Bias transform-origin towards the launcher icon, clamped within 15% - 85%
  const originXPercent = Math.max(15, Math.min(85, Math.round(50 + (dx / dist) * 35)));
  const originYPercent = Math.max(15, Math.min(85, Math.round(50 + (dy / dist) * 35)));

  return {
    translateX,
    translateY,
    scale: 0.94,
    transformOrigin: `${originXPercent}% ${originYPercent}%`
  };
}

/**
 * Computes translation delta towards the taskbar icon for minimize/restore
 */
export function computeTaskbarDelta(appId, winRect) {
  if (isReducedMotion()) {
    return { deltaX: 0, deltaY: 0 };
  }

  const taskbarCenter = getElementCenter(`[data-taskbar-icon="${appId}"]`);
  let targetX = typeof window !== 'undefined' ? window.innerWidth / 2 : 500;
  let targetY = typeof window !== 'undefined' ? window.innerHeight - 24 : 800;

  if (taskbarCenter) {
    targetX = taskbarCenter.x;
    targetY = taskbarCenter.y;
  }

  const winCenterX = winRect.left + winRect.width / 2;
  const winCenterY = winRect.top + winRect.height / 2;

  return {
    deltaX: Math.round(targetX - winCenterX),
    deltaY: Math.round(targetY - winCenterY)
  };
}

