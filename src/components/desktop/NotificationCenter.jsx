import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Trash2, CheckCircle2, ShieldCheck, Sparkles, Terminal, Info } from 'lucide-react';
import {
  getNotifications,
  dismissNotification,
  clearAllNotifications,
  markAllAsRead
} from '../../utils/notificationManager';
import './NotificationCenter.css';

export default function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState(getNotifications);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleUpdate = (e) => {
      setNotifications(e.detail || getNotifications());
    };

    window.addEventListener('aura-notifications-updated', handleUpdate);
    return () => window.removeEventListener('aura-notifications-updated', handleUpdate);
  }, []);

  // When opened, mark unread notifications as read after a short delay
  useEffect(() => {
    if (isOpen) {
      setNotifications(getNotifications());
      const timer = setTimeout(() => {
        markAllAsRead();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Click outside and Escape handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    const handleOutsideClick = (e) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        !e.target.closest('#notification-tray-button') &&
        !e.target.closest('#mobile-notification-tray-button')
      ) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('touchstart', handleOutsideClick, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const renderIcon = (type) => {
    switch (type) {
      case 'achievement':
        return <Sparkles size={14} className="text-amber-400" />;
      case 'app':
        return <Terminal size={14} className="text-cyan-400" />;
      default:
        return <ShieldCheck size={14} className="text-sky-400" />;
    }
  };

  return (
    <aside
      ref={panelRef}
      role="dialog"
      aria-label="AURA Notification Center"
      className="aura-notification-panel fixed bottom-14 right-2 left-2 sm:left-auto sm:right-4 w-auto sm:w-[380px] max-w-[calc(100vw-16px)] sm:max-w-[calc(100vw-32px)] rounded-2xl border shadow-2xl backdrop-blur-2xl font-sans text-xs z-50 select-none animate-in fade-in slide-in-from-bottom-2 duration-150 flex flex-col max-h-[480px] overflow-hidden"
      style={{
        backgroundColor: 'rgba(8, 12, 22, 0.95)',
        borderColor: 'var(--color-border-strong)',
        color: 'var(--color-text-primary)'
      }}
    >
      {/* Top Header */}
      <div
        className="px-4 py-3 border-b flex items-center justify-between"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-sky-400" />
          <span className="font-mono font-semibold tracking-wider uppercase text-white text-[11px]">
            Notification Center
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400">
            {notifications.length}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={clearAllNotifications}
              title="Clear all notifications"
              className="px-2 py-1 rounded text-[11px] font-mono text-neutral-400 hover:text-red-400 hover:bg-white/5 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={12} />
              <span>Clear</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close notifications panel"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {notifications.length === 0 ? (
          <div className="py-12 px-4 text-center flex flex-col items-center justify-center font-mono text-neutral-500 space-y-2">
            <CheckCircle2 size={24} className="text-neutral-600" />
            <span className="text-xs">No active notifications</span>
            <span className="text-[10px] text-neutral-600">System quiet // All events clear</span>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all duration-150 flex items-start gap-3 relative group ${
                n.read ? 'bg-white/[0.02] border-white/5' : 'bg-sky-500/[0.06] border-sky-500/30'
              }`}
            >
              <div
                className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  borderColor: 'var(--color-border-subtle)'
                }}
              >
                {renderIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0 pr-5">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-semibold text-white truncate text-[11px]">
                    {n.title}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 shrink-0">
                    {n.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-snug line-clamp-2">
                  {n.description}
                </p>
              </div>

              {/* Dismiss Single */}
              <button
                type="button"
                onClick={() => dismissNotification(n.id)}
                title="Dismiss"
                aria-label={`Dismiss notification ${n.title}`}
                className="absolute top-2.5 right-2.5 text-neutral-500 hover:text-white p-1 rounded hover:bg-white/10 opacity-70 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X size={12} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer Edge */}
      <div
        className="px-4 py-2 border-t text-[10px] font-mono text-neutral-500 flex items-center justify-between"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <span>AURA TELEMETRY BUS</span>
        <span>ESC TO CLOSE</span>
      </div>
    </aside>
  );
}

