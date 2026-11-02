/**
 * Easter Egg & Achievement Manager
 * AURA — Aadhish's Unified Runtime Architecture
 *
 * Handles persistent discovery progress, achievement state,
 * and game state in localStorage.
 */

const KEYS = {
  HINT_DISMISSED: 'aura_easter_egg_hint_dismissed',
  HINT_STAGE: 'aura_easter_egg_hint_stage',
  ACHIEVEMENT_GAMING: 'aura_achievement_gaming_unlocked',
  ACHIEVEMENT_TIMESTAMP: 'aura_achievement_gaming_unlocked_at',
  OVERRIDE_SAVE: 'aura_override_save',
};

import { unlockAchievement } from './achievementManager';

export const EASTER_EGG_ACHIEVEMENT = {
  id: 'secret-gaming-easter-egg',
  title: "WAIT... WHERE'S THE GAME?",
  description: "A developer who loves gaming somehow forgot to add a game to his own operating system.",
  category: "SECRET DISCOVERY",
  icon: "Gamepad2",
  secretIndicator: "CLASSIFIED // EASTER EGG #01",
};

/**
 * Check if the initial desktop hint notification was dismissed
 */
export function isHintDismissed() {
  try {
    return localStorage.getItem(KEYS.HINT_DISMISSED) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Dismiss the desktop hint notification
 */
export function dismissHint() {
  try {
    localStorage.setItem(KEYS.HINT_DISMISSED, 'true');
  } catch (e) {
    // Ignore localStorage access restrictions
  }
}

/**
 * Get current progressive discovery stage (1: initial desktop hint, 2: terminal hint, 3: stronger hint, 4: discovered)
 */
export function getHintStage() {
  try {
    const stage = parseInt(localStorage.getItem(KEYS.HINT_STAGE) || '1', 10);
    return isNaN(stage) ? 1 : stage;
  } catch (e) {
    return 1;
  }
}

/**
 * Advance discovery stage to at least the given stage
 */
export function advanceHintStage(stage) {
  try {
    const current = getHintStage();
    if (stage > current) {
      localStorage.setItem(KEYS.HINT_STAGE, String(stage));
    }
  } catch (e) {
    // Ignore
  }
}

/**
 * Check if the gaming achievement has been unlocked
 */
export function isGamingAchievementUnlocked() {
  try {
    return localStorage.getItem(KEYS.ACHIEVEMENT_GAMING) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Unlock the gaming achievement (only once).
 * Returns true if this call actually unlocked it, false if it was already unlocked.
 */
export function unlockGamingAchievement() {
  try {
    if (isGamingAchievementUnlocked()) {
      return false;
    }
    localStorage.setItem(KEYS.ACHIEVEMENT_GAMING, 'true');
    localStorage.setItem(KEYS.ACHIEVEMENT_TIMESTAMP, new Date().toISOString());
    advanceHintStage(4);

    unlockAchievement('game-lover');

    // Dispatch event for UI notifications
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('aura-achievement-unlocked', {
          detail: EASTER_EGG_ACHIEVEMENT,
        })
      );
    }
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Initial state for SYSTEM OVERRIDE game save
 */
const DEFAULT_GAME_SAVE = {
  currentMission: 1, // 1 to 5
  completedMissions: [], // [1, 2, 3, ...]
  score: 1000,
  attempts: 0,
  hintsUsed: 0,
  archiveUnlocked: false,
  tokens: {
    port: null,
    cipher: null,
    gateway: null,
    hash: null,
  },
};

/**
 * Load saved progress for SYSTEM OVERRIDE
 */
export function getOverrideSave() {
  try {
    const raw = localStorage.getItem(KEYS.OVERRIDE_SAVE);
    if (!raw) return DEFAULT_GAME_SAVE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_GAME_SAVE, ...parsed };
  } catch (e) {
    return DEFAULT_GAME_SAVE;
  }
}

/**
 * Save progress for SYSTEM OVERRIDE
 */
export function saveOverrideProgress(partialSave) {
  try {
    const current = getOverrideSave();
    const updated = { ...current, ...partialSave };
    localStorage.setItem(KEYS.OVERRIDE_SAVE, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_GAME_SAVE;
  }
}

/**
 * Reset game progress (for replaying or testing)
 */
export function resetOverrideProgress() {
  try {
    localStorage.setItem(KEYS.OVERRIDE_SAVE, JSON.stringify(DEFAULT_GAME_SAVE));
    return DEFAULT_GAME_SAVE;
  } catch (e) {
    return DEFAULT_GAME_SAVE;
  }
}

