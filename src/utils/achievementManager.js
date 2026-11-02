/**
 * Discovery Achievements System for AURA OS
 * Tracks user exploration milestones and saves progress in localStorage.
 */

import { addNotification } from './notificationManager';

const STORAGE_KEY = 'aura_discovery_achievements_v1';
const VISITED_APPS_KEY = 'aura_visited_apps_v1';

export const ACHIEVEMENTS_DEF = [
  {
    id: 'first-boot',
    title: 'First Boot',
    category: 'SYSTEM DISCOVERY',
    description: 'Successfully initialized the kernel and entered the AURA desktop workspace.',
    icon: 'Monitor',
    hint: 'Boot into the AURA desktop from the workspace launcher.'
  },
  {
    id: 'terminal-explorer',
    title: 'Terminal Explorer',
    category: 'EXPLORATION',
    description: 'Launched the interactive command line interface in AURA.',
    icon: 'Terminal',
    hint: 'Open the Terminal application or press Ctrl+Shift+Esc.'
  },
  {
    id: 'command-master',
    title: 'Command Master',
    category: 'TERMINAL MASTERY',
    description: 'Executed the neofetch telemetry command to audit system specs.',
    icon: 'Cpu',
    hint: "Run 'neofetch' in the Terminal to inspect system architecture."
  },
  {
    id: 'project-explorer',
    title: 'Project Explorer',
    category: 'INSPECTION',
    description: 'Dived deep into an engineering repository details dossier.',
    icon: 'Layers',
    hint: 'Inspect an individual project dossier inside the Projects app.'
  },
  {
    id: 'hidden-discovery',
    title: 'Hidden Discovery',
    category: 'SECRET DISCOVERY',
    description: 'Uncovered a classified developer note or secret system command.',
    icon: 'Sparkles',
    hint: "Query 'sudo unlock', 'notes', or follow system clues."
  },
  {
    id: 'game-lover',
    title: "Game Lover // Wait... Where's the Game?",
    category: 'SECRET DISCOVERY',
    description: 'Discovered and mounted the hidden SYSTEM OVERRIDE cybersecurity puzzle game.',
    icon: 'Gamepad2',
    hint: "Look for clues in developer notes or run 'override'."
  },
  {
    id: 'system-explorer',
    title: 'Master Explorer',
    category: 'COMPLETIONIST',
    description: 'Explored all core portfolio applications (About, Projects, Skills, Honors, Resume, Contact).',
    icon: 'Compass',
    hint: 'Launch each of the six primary portfolio modules.'
  }
];

const MAIN_PORTFOLIO_APPS = ['about', 'projects', 'skills', 'achievements', 'resume', 'contact'];

export function getAchievementsState() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    return {};
  }
}

export function isAchievementUnlocked(id) {
  const state = getAchievementsState();
  return Boolean(state[id]?.unlocked);
}

export function getAllAchievementsWithStatus() {
  const state = getAchievementsState();
  return ACHIEVEMENTS_DEF.map((ach) => ({
    ...ach,
    unlocked: Boolean(state[ach.id]?.unlocked),
    unlockedAt: state[ach.id]?.unlockedAt || null
  }));
}

export function unlockAchievement(id) {
  if (typeof window === 'undefined') return false;
  const ach = ACHIEVEMENTS_DEF.find((a) => a.id === id);
  if (!ach) return false;

  const state = getAchievementsState();
  if (state[id]?.unlocked) {
    return false; // Already unlocked, prevent duplicate toasts
  }

  const newState = {
    ...state,
    [id]: {
      unlocked: true,
      unlockedAt: new Date().toISOString()
    }
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));

    // Also sync gaming achievement if it's game-lover
    if (id === 'game-lover') {
      try {
        localStorage.setItem('aura_achievement_gaming_unlocked', 'true');
        localStorage.setItem('aura_achievement_gaming_unlocked_at', new Date().toISOString());
      } catch (e) {}
    }

    // 1. Dispatch achievement toast event
    window.dispatchEvent(
      new CustomEvent('aura-achievement-unlocked', {
        detail: {
          id: ach.id,
          title: ach.title,
          description: ach.description,
          category: ach.category,
          icon: ach.icon
        }
      })
    );

    // 2. Add to Notification Center
    addNotification({
      title: `Achievement: ${ach.title}`,
      description: ach.description,
      type: 'achievement'
    });

    window.dispatchEvent(new CustomEvent('aura-achievements-updated', { detail: newState }));
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Track an application launch to evaluate the Master Explorer achievement
 */
export function recordAppOpened(appId) {
  if (typeof window === 'undefined') return;
  try {
    let visited = [];
    const raw = localStorage.getItem(VISITED_APPS_KEY);
    if (raw) visited = JSON.parse(raw);

    if (!visited.includes(appId)) {
      visited.push(appId);
      localStorage.setItem(VISITED_APPS_KEY, JSON.stringify(visited));
    }

    // Check if all 6 main apps have been opened
    const hasAll = MAIN_PORTFOLIO_APPS.every((app) => visited.includes(app));
    if (hasAll) {
      unlockAchievement('system-explorer');
    }

    if (appId === 'terminal') {
      unlockAchievement('terminal-explorer');
    }
    if (appId === 'system-override') {
      unlockAchievement('game-lover');
    }
  } catch (e) {
    // Ignore storage issues
  }
}

