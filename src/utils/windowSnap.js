/**
 * Window Snapping Utility for AURA OS
 * Computes snap zones, snap preview geometries, and snap rectangle coordinates.
 */

const TASKBAR_HEIGHT = 52;
const GAP = 8;
const SNAP_THRESHOLD = 28;
const CORNER_THRESHOLD = 50;

export function getSnapRect(snapType, viewport) {
  const { width, height } = viewport;
  const availableHeight = height - TASKBAR_HEIGHT - GAP * 2;
  const halfWidth = Math.floor((width - GAP * 3) / 2);
  const halfHeight = Math.floor((availableHeight - GAP) / 2);

  switch (snapType) {
    case 'left':
      return {
        left: GAP,
        top: GAP,
        width: halfWidth,
        height: availableHeight
      };
    case 'right':
      return {
        left: halfWidth + GAP * 2,
        top: GAP,
        width: halfWidth,
        height: availableHeight
      };
    case 'maximize':
      return {
        left: GAP,
        top: GAP,
        width: width - GAP * 2,
        height: availableHeight
      };
    case 'top-left':
      return {
        left: GAP,
        top: GAP,
        width: halfWidth,
        height: halfHeight
      };
    case 'top-right':
      return {
        left: halfWidth + GAP * 2,
        top: GAP,
        width: halfWidth,
        height: halfHeight
      };
    case 'bottom-left':
      return {
        left: GAP,
        top: halfHeight + GAP * 2,
        width: halfWidth,
        height: halfHeight
      };
    case 'bottom-right':
      return {
        left: halfWidth + GAP * 2,
        top: halfHeight + GAP * 2,
        width: halfWidth,
        height: halfHeight
      };
    default:
      return null;
  }
}

export function detectSnapZone(mouseX, mouseY, viewport) {
  const { width, height } = viewport;
  const bottomBoundary = height - TASKBAR_HEIGHT;

  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > bottomBoundary) {
    return null;
  }

  const isNearLeft = mouseX <= SNAP_THRESHOLD;
  const isNearRight = mouseX >= width - SNAP_THRESHOLD;
  const isNearTop = mouseY <= SNAP_THRESHOLD;
  const isNearBottom = mouseY >= bottomBoundary - SNAP_THRESHOLD;

  // Corner checks (quarter snapping)
  const isCornerTopLeft = mouseX <= CORNER_THRESHOLD && mouseY <= CORNER_THRESHOLD;
  const isCornerTopRight = mouseX >= width - CORNER_THRESHOLD && mouseY <= CORNER_THRESHOLD;
  const isCornerBottomLeft = mouseX <= CORNER_THRESHOLD && mouseY >= bottomBoundary - CORNER_THRESHOLD;
  const isCornerBottomRight = mouseX >= width - CORNER_THRESHOLD && mouseY >= bottomBoundary - CORNER_THRESHOLD;

  if (isCornerTopLeft) return 'top-left';
  if (isCornerTopRight) return 'top-right';
  if (isCornerBottomLeft) return 'bottom-left';
  if (isCornerBottomRight) return 'bottom-right';

  // Edge checks (half snapping & maximize)
  if (isNearTop) return 'maximize';
  if (isNearLeft) return 'left';
  if (isNearRight) return 'right';

  return null;
}

