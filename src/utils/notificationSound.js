/**
 * AURA Notification Sound System
 * Manages audio playback for floating toast notifications.
 *
 * Sounds:
 * - Default: /notification_sounds/notification_sound.mp3
 * - Serious Dedication: /notification_sounds/serious_dedication.mp3
 */

const DEFAULT_SOUND_PATH = '/notification_sounds/notification_sound.mp3';
const DEDICATION_SOUND_PATH = '/notification_sounds/serious_dedication.mp3';
const NOTIFICATION_VOLUME = 0.55;

let lastSoundTime = 0;
let lastSoundKey = null;

export function playNotificationSound(soundKey = 'default') {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  // Prevent duplicate playback of the exact same sound triggered within 250ms
  if (lastSoundKey === soundKey && now - lastSoundTime < 250) {
    return;
  }
  lastSoundTime = now;
  lastSoundKey = soundKey;

  try {
    const isDedication = soundKey === 'serious_dedication' || soundKey === 'dedication';
    const soundPath = isDedication ? DEDICATION_SOUND_PATH : DEFAULT_SOUND_PATH;

    const audio = new Audio(soundPath);
    audio.volume = NOTIFICATION_VOLUME;
    audio.preload = 'auto';

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy or interruption handled silently without breaking notifications
      });
    }

    // Clean up audio resource when playback completes
    audio.addEventListener(
      'ended',
      () => {
        audio.src = '';
      },
      { once: true }
    );
  } catch (err) {
    // Graceful error handling - fail silently without breaking notifications
  }
}

