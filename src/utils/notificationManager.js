/**
 * Notification Manager for AURA OS
 * Manages system, application, and achievement notifications with localStorage persistence.
 */

const STORAGE_KEY = 'aura_notifications_v2';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'sys-welcome',
    title: 'AURA Workstation Ready',
    description: 'System booted into high-performance developer workspace. Press Ctrl+K for Command Palette.',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type: 'system',
    read: false
  }
];

export function getNotifications() {
  if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    return INITIAL_NOTIFICATIONS;
  }
}

export function saveNotifications(notifications) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    window.dispatchEvent(new CustomEvent('aura-notifications-updated', { detail: notifications }));
  } catch (err) {
    // Ignore storage errors
  }
}

export function addNotification({ title, description, type = 'system' }) {
  const current = getNotifications();
  const newNotif = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title,
    description,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    type,
    read: false
  };

  const updated = [newNotif, ...current].slice(0, 30); // Cap at 30
  saveNotifications(updated);
  return newNotif;
}

export function dismissNotification(id) {
  const current = getNotifications();
  const updated = current.filter((n) => n.id !== id);
  saveNotifications(updated);
}

export function clearAllNotifications() {
  saveNotifications([]);
}

export function markAllAsRead() {
  const current = getNotifications();
  const updated = current.map((n) => ({ ...n, read: true }));
  saveNotifications(updated);
}

export function getUnreadCount() {
  const current = getNotifications();
  return current.filter((n) => !n.read).length;
}

