/**
 * AURA Startup Sound Manager
 * Handles preloading, user-gesture audio unlocking, and single-shot playback
 * of /startup_sound.mp3 immediately after the boot sequence completes and desktop appears.
 */

const STARTUP_SOUND_PATH = '/startup_sound.mp3';
const COMFORTABLE_VOLUME = 0.5;

let audioInstance = null;
let isSoundQueued = false;

/**
 * Preload the startup sound asset on landing screen mount
 * to avoid network latency during boot transition.
 */
export function preloadStartupSound() {
  if (typeof window === 'undefined') return;
  try {
    if (!audioInstance) {
      audioInstance = new Audio(STARTUP_SOUND_PATH);
      audioInstance.preload = 'auto';
      audioInstance.volume = COMFORTABLE_VOLUME;
    }
  } catch (err) {
    // Graceful error handling - never crash AURA
  }
}

/**
 * Initialize / unlock audio playback during the user's click gesture (e.g. BOOT SYSTEM).
 * This satisfies browser autoplay restrictions ahead of time.
 */
export function unlockAndQueueStartupSound() {
  if (typeof window === 'undefined') return;
  isSoundQueued = true;

  try {
    if (!audioInstance) {
      preloadStartupSound();
    }
    if (audioInstance) {
      audioInstance.volume = COMFORTABLE_VOLUME;
      audioInstance.load();
    }
  } catch (err) {
    // Ignore unlock errors gracefully
  }
}

/**
 * Play the startup sound once after the boot sequence finishes and desktop is visible.
 * Safe against React re-renders, window actions, and remounts.
 */
export function playStartupSoundIfQueued() {
  if (typeof window === 'undefined' || !isSoundQueued) return;
  // Immediately reset flag so it only plays once per boot
  isSoundQueued = false;

  try {
    if (!audioInstance) {
      audioInstance = new Audio(STARTUP_SOUND_PATH);
      audioInstance.preload = 'auto';
      audioInstance.volume = COMFORTABLE_VOLUME;
    }

    audioInstance.currentTime = 0;
    audioInstance.volume = COMFORTABLE_VOLUME;
    const playPromise = audioInstance.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay policy or interruption gracefully handled without error popups
        console.warn('AURA startup sound playback deferred by browser policy:', err.message);
      });
    }
  } catch (err) {
    // Graceful catch-all
  }
}

