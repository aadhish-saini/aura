/**
 * Notification Manager for AURA OS
 * Manages system, application, and achievement notifications with localStorage persistence.
 */

import { playNotificationSound } from './notificationSound';
export { playNotificationSound };

const STORAGE_KEY = 'aura_notifications_v2';

export const WELCOME_NOTIFICATION_DEF = {
  id: 'sys-welcome',
  title: 'AURA Workstation Ready',
  description: 'Welcome to AURA! Your personal developer workspace is ready. Explore my projects, skills, achievements and more.',
  type: 'system'
};

const INITIAL_NOTIFICATIONS = [
  {
    ...WELCOME_NOTIFICATION_DEF,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    read: false
  }
];

// Session tracking for desktop welcome toast and discovery hint
let currentBootSessionId = `${Date.now()}`;
let welcomedBootSessionId = null;
let welcomeTriggerTime = null;
let welcomeTriggerSessionId = null;
let honorsViewedSessionId = null;
let gameDiscoveredSessionId = null;
let gameCompletedSessionId = null;
let allProjectsSessionId = null;

try {
  if (typeof sessionStorage !== 'undefined') {
    const storedSession = sessionStorage.getItem('aura_boot_session_id');
    if (storedSession) {
      currentBootSessionId = storedSession;
    } else {
      sessionStorage.setItem('aura_boot_session_id', currentBootSessionId);
    }
    welcomedBootSessionId = sessionStorage.getItem('aura_boot_welcomed_id');
    const storedWelcomeTime = sessionStorage.getItem('aura_welcome_trigger_time');
    const storedWelcomeSession = sessionStorage.getItem('aura_welcome_trigger_session');
    if (storedWelcomeTime && storedWelcomeSession) {
      welcomeTriggerTime = parseInt(storedWelcomeTime, 10);
      welcomeTriggerSessionId = storedWelcomeSession;
    }
  }
} catch (e) {}

/**
 * Initializes a new boot session for the welcome notification toast.
 * Called whenever AURA boots or restarts.
 */
export function startNewBootSession() {
  currentBootSessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
  welcomedBootSessionId = null;
  welcomeTriggerTime = null;
  welcomeTriggerSessionId = null;
  honorsViewedSessionId = null;
  gameDiscoveredSessionId = null;
  gameCompletedSessionId = null;
  allProjectsSessionId = null;
  gameDiscoveredNotifFired = false;
  gameCompletedNotifFired = false;
  allProjectsNotifFired = false;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('aura_boot_session_id', currentBootSessionId);
      sessionStorage.removeItem('aura_boot_welcomed_id');
      sessionStorage.removeItem('aura_welcome_trigger_time');
      sessionStorage.removeItem('aura_welcome_trigger_session');
      sessionStorage.removeItem('aura_discovery_hint_shown_session');
      sessionStorage.removeItem('aura_honors_viewed_session');
      sessionStorage.removeItem('aura_game_discovered_session');
      sessionStorage.removeItem('aura_game_completed_session');
      sessionStorage.removeItem('aura_all_projects_session');
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('aura_game_discovered_notif_shown');
      localStorage.removeItem('aura_all_projects_notif_shown');
      localStorage.removeItem('aura_game_completed_notif_shown');
    }
  } catch (e) {}
  return currentBootSessionId;
}

/**
 * Returns true if the welcome notification toast has not yet been shown for this boot session.
 */
export function isWelcomeToastPending() {
  let sessionId = currentBootSessionId;
  let welcomedId = welcomedBootSessionId;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionId = sessionStorage.getItem('aura_boot_session_id') || currentBootSessionId;
      welcomedId = sessionStorage.getItem('aura_boot_welcomed_id') || welcomedBootSessionId;
    }
  } catch (e) {}
  return welcomedId !== sessionId;
}

/**
 * Marks the welcome toast as handled for the current boot session to prevent duplicate toasts.
 */
export function markWelcomeToastHandled() {
  let sessionId = currentBootSessionId;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionId = sessionStorage.getItem('aura_boot_session_id') || currentBootSessionId;
      sessionStorage.setItem('aura_boot_welcomed_id', sessionId);
    }
  } catch (e) {}
  welcomedBootSessionId = sessionId;
}

/**
 * Ensures the welcome notification is saved in the Notification Center
 * with the current boot timestamp, without creating duplicate entries.
 */
export function recordBootWelcomeNotification() {
  const current = getNotifications();
  const safeCurrent = Array.isArray(current) ? current : [];
  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const welcomePayload = {
    ...WELCOME_NOTIFICATION_DEF,
    timestamp: now,
    read: false
  };

  const existingIndex = safeCurrent.findIndex((n) => n.id === 'sys-welcome');
  let updated;
  if (existingIndex >= 0) {
    updated = [...safeCurrent];
    updated[existingIndex] = {
      ...updated[existingIndex],
      ...welcomePayload
    };
  } else {
    updated = [welcomePayload, ...safeCurrent].slice(0, 30);
  }

  saveNotifications(updated);

  // Record welcome trigger timestamp and dispatch event for downstream triggers
  const sessionId = (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aura_boot_session_id')) || currentBootSessionId;
  welcomeTriggerTime = Date.now();
  welcomeTriggerSessionId = sessionId;

  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('aura_welcome_trigger_time', `${welcomeTriggerTime}`);
      sessionStorage.setItem('aura_welcome_trigger_session', sessionId);
    }
  } catch (e) {}

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('aura-welcome-triggered', {
        detail: { timestamp: welcomeTriggerTime, sessionId }
      })
    );
  }

  return welcomePayload;
}

/**
 * Returns the timestamp and boot session when the welcome notification was triggered.
 */
export function getWelcomeTriggerInfo() {
  let timestamp = welcomeTriggerTime;
  let sessionId = welcomeTriggerSessionId;
  try {
    if (typeof sessionStorage !== 'undefined') {
      const storedTime = sessionStorage.getItem('aura_welcome_trigger_time');
      const storedSession = sessionStorage.getItem('aura_welcome_trigger_session');
      if (storedTime && storedSession) {
        timestamp = parseInt(storedTime, 10);
        sessionId = storedSession;
      }
    }
  } catch (e) {}
  return { timestamp, sessionId };
}

/**
 * Returns true if the discovery clue notification has not yet been shown for this boot session.
 */
export function isDiscoveryHintPending() {
  let sessionId = currentBootSessionId;
  let shownSessionId = null;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionId = sessionStorage.getItem('aura_boot_session_id') || currentBootSessionId;
      shownSessionId = sessionStorage.getItem('aura_discovery_hint_shown_session');
    }
  } catch (e) {}
  return shownSessionId !== sessionId;
}

/**
 * Marks the discovery clue notification as shown for the current boot session.
 */
export function markDiscoveryHintShown() {
  let sessionId = currentBootSessionId;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionId = sessionStorage.getItem('aura_boot_session_id') || currentBootSessionId;
      sessionStorage.setItem('aura_discovery_hint_shown_session', sessionId);
    }
  } catch (e) {}
}

export function getNotifications() {
  if (typeof window === 'undefined') return [...INITIAL_NOTIFICATIONS];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      return [...INITIAL_NOTIFICATIONS];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...INITIAL_NOTIFICATIONS];
  } catch (err) {
    return [...INITIAL_NOTIFICATIONS];
  }
}

// Initialize on first boot if storage key does not exist yet
if (typeof window !== 'undefined') {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    }
  } catch (err) {}
}

export function saveNotifications(notifications) {
  if (typeof window === 'undefined') return;
  try {
    const safeNotifications = Array.isArray(notifications) ? notifications : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeNotifications));
    window.dispatchEvent(new CustomEvent('aura-notifications-updated', { detail: safeNotifications }));
  } catch (err) {
    // Ignore storage errors
  }
}

export function addNotification({ title, description, type = 'system' }) {
  const current = getNotifications();
  const safeCurrent = Array.isArray(current) ? current : [];
  const newNotif = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title,
    description,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type,
    read: false
  };

  const updated = [newNotif, ...safeCurrent].slice(0, 30); // Cap at 30
  saveNotifications(updated);
  return newNotif;
}

export function dismissNotification(id) {
  const current = getNotifications();
  const safeCurrent = Array.isArray(current) ? current : [];
  const updated = safeCurrent.filter((n) => n.id !== id);
  saveNotifications(updated);
}

export function clearAllNotifications() {
  saveNotifications([]);
}

export function markAllAsRead() {
  const current = getNotifications();
  const safeCurrent = Array.isArray(current) ? current : [];
  const updated = safeCurrent.map((n) => ({ ...n, read: true }));
  saveNotifications(updated);
}

export function getUnreadCount() {
  const current = getNotifications();
  return Array.isArray(current) ? current.filter((n) => !n.read).length : 0;
}

/**
 * Trigger the Honors Viewed milestone notification.
 * Fires once per user session when the Honors application is opened.
 */
export function triggerHonorsNotification() {
  if (typeof window === 'undefined') return;

  const sessionId =
    (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aura_boot_session_id')) ||
    currentBootSessionId;

  let alreadyShown = false;
  try {
    if (typeof sessionStorage !== 'undefined') {
      alreadyShown = sessionStorage.getItem('aura_honors_viewed_session') === sessionId;
    }
  } catch (e) {}

  if (alreadyShown || honorsViewedSessionId === sessionId) {
    return;
  }

  honorsViewedSessionId = sessionId;
  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('aura_honors_viewed_session', sessionId);
    }
  } catch (e) {}

  const title = 'Achievements Are Milestones, Not Destinations.';
  const description =
    "Every achievement represents the effort, learning, and persistence behind it. These honors are not the finish line — they're reminders of how far the journey has come and how much more lies ahead.";

  // 1. Save in Notification Center
  addNotification({
    title,
    description,
    type: 'achievement'
  });

  // 2. Dispatch floating desktop toast event
  window.dispatchEvent(
    new CustomEvent('aura-desktop-toast', {
      detail: {
        id: 'honors-milestone',
        title,
        description,
        category: 'HONORS // MILESTONES',
        status: 'VERIFIED',
        icon: 'Award',
        accentGradient: 'linear-gradient(90deg, #f59e0b, #fbbf24, #10b981, #06b6d4)',
        footerLabel: 'AURA // HONORS ARCHIVE',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    })
  );
}

let gameDiscoveredNotifFired = false;

/**
 * Trigger the Hidden Game Discovered notification.
 * Fires once when the user successfully discovers/unlocks AURA: SYSTEM OVERRIDE.
 */
export function triggerGameDiscoveredNotification() {
  if (typeof window === 'undefined') return;

  const sessionId =
    (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aura_boot_session_id')) ||
    currentBootSessionId;

  let alreadyShown = false;
  try {
    if (typeof sessionStorage !== 'undefined') {
      alreadyShown = sessionStorage.getItem('aura_game_discovered_session') === sessionId;
    }
  } catch (e) {}

  if (alreadyShown || gameDiscoveredSessionId === sessionId || gameDiscoveredNotifFired) {
    return;
  }

  gameDiscoveredSessionId = sessionId;
  gameDiscoveredNotifFired = true;

  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('aura_game_discovered_session', sessionId);
    }
    localStorage.setItem('aura_game_discovered_notif_shown', 'true');
  } catch (e) {}

  const title = "Well... You Found It.";
  const description =
    "Not everyone makes it this far. You looked beyond the interface and uncovered something hidden within AURA. Enjoy the experience — you've earned it.";

  // 1. Save in Notification Center
  addNotification({
    title,
    description,
    type: 'achievement'
  });

  // 2. Dispatch floating desktop toast event
  window.dispatchEvent(
    new CustomEvent('aura-desktop-toast', {
      detail: {
        id: 'game-discovered',
        title,
        description,
        category: 'SECRET DISCOVERY',
        status: 'UNLOCKED',
        icon: 'Gamepad2',
        accentGradient: 'linear-gradient(90deg, #10b981, #06b6d4, #8b5cf6)',
        footerLabel: 'AURA // SYSTEM OVERRIDE',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    })
  );
}

let gameCompletedNotifFired = false;
const STORAGE_KEY_GAME_COMPLETED = 'aura_game_completed_notif_shown';

/**
 * Trigger the Hidden Game Completed notification.
 * Fires once when the user successfully completes the entire AURA: SYSTEM OVERRIDE challenge.
 */
export function triggerGameCompletedNotification() {
  if (typeof window === 'undefined') return;

  const sessionId =
    (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aura_boot_session_id')) ||
    currentBootSessionId;

  let alreadyShown = false;
  try {
    if (typeof sessionStorage !== 'undefined') {
      alreadyShown = sessionStorage.getItem('aura_game_completed_session') === sessionId;
    }
  } catch (e) {}

  if (alreadyShown || gameCompletedSessionId === sessionId || gameCompletedNotifFired) {
    return;
  }

  gameCompletedSessionId = sessionId;
  gameCompletedNotifFired = true;

  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('aura_game_completed_session', sessionId);
    }
    localStorage.setItem(STORAGE_KEY_GAME_COMPLETED, 'true');
  } catch (e) {}

  const title = "ACCESS GRANTED.";
  const description =
    "You've successfully completed the hidden challenge. What was once concealed is now unlocked. Not everyone gets this far — well played, explorer.";

  // 1. Save in Notification Center
  addNotification({
    title,
    description,
    type: 'achievement'
  });

  // 2. Dispatch floating desktop toast event
  window.dispatchEvent(
    new CustomEvent('aura-desktop-toast', {
      detail: {
        id: 'game-completed',
        title,
        description,
        category: 'SYSTEM OVERRIDE // VICTORY',
        status: 'GRANTED',
        icon: 'Award',
        accentGradient: 'linear-gradient(90deg, #10b981, #06b6d4, #f59e0b)',
        footerLabel: 'AURA // SYSTEM OVERRIDE COMPLETE',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    })
  );
}

let allProjectsNotifFired = false;
const STORAGE_KEY_ALL_PROJECTS = 'aura_all_projects_notif_shown';

/**
 * Trigger the All Projects Explored milestone notification.
 * Fires once when the user successfully opens and explores all available projects in AURA.
 */
export function triggerAllProjectsExploredNotification() {
  if (typeof window === 'undefined') return;

  const sessionId =
    (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('aura_boot_session_id')) ||
    currentBootSessionId;

  let alreadyShown = false;
  try {
    if (typeof sessionStorage !== 'undefined') {
      alreadyShown = sessionStorage.getItem('aura_all_projects_session') === sessionId;
    }
  } catch (e) {}

  if (alreadyShown || allProjectsSessionId === sessionId || allProjectsNotifFired) {
    return;
  }

  allProjectsSessionId = sessionId;
  allProjectsNotifFired = true;

  try {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('aura_all_projects_session', sessionId);
    }
    localStorage.setItem(STORAGE_KEY_ALL_PROJECTS, 'true');
  } catch (e) {}

  const title = "Not Just Projects. Pure Dedication.";
  const description =
    "You've explored every project in AURA. Each one represents an idea, countless hours of learning, experimentation, and dedication. Thanks for taking the time to explore my work.";

  // 1. Save in Notification Center
  addNotification({
    title,
    description,
    type: 'achievement'
  });

  // 2. Dispatch floating desktop toast event with dedicated serious dedication sound
  window.dispatchEvent(
    new CustomEvent('aura-desktop-toast', {
      detail: {
        id: 'all-projects-explored',
        title,
        description,
        category: 'PORTFOLIO // DEDICATION',
        status: 'EXPLORED',
        icon: 'Award',
        accentGradient: 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6)',
        footerLabel: 'AURA // ALL PROJECTS EXPLORED',
        sound: 'serious_dedication',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    })
  );
}


