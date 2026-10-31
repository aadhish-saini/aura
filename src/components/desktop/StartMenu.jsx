import React, { useState, useRef, useEffect, useMemo } from 'react';
import { DESKTOP_ICON_LIST } from '../../config/desktopApps';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import {
  Search,
  Power,
  ChevronRight,
  ExternalLink,
  Sparkles,
  FileText,
  FolderGit2,
  Terminal,
  User
} from 'lucide-react';
import AppIcon from '../common/AppIcon';
import PowerMenu from '../power/PowerMenu';
import './StartMenu.css';

// Keyword mappings for rich search experience
const APP_SEARCH_KEYWORDS = {
  about: ['about', 'profile', 'bio', 'whoami', 'aadhish', 'saini', 'developer', 'education', 'background'],
  projects: ['projects', 'repositories', 'code', 'aura', 'dhruvnetra', 'portfolio', 'github', 'apps', 'work'],
  skills: ['skills', 'python', 'javascript', 'c++', 'react', 'mysql', 'ai', 'llm', 'frontend', 'technologies', 'stack'],
  achievements: ['achievements', 'honors', 'hackathon', 'rank 7', 'awards', 'competitions', 'milestones'],
  resume: ['resume', 'cv', 'curriculum vitae', 'pdf', 'job', 'career', 'education', 'download'],
  contact: ['contact', 'email', 'message', 'transmission', 'github', 'connect', 'reach out', 'channels'],
  terminal: ['terminal', 'cli', 'bash', 'shell', 'command', 'prompt', 'neofetch', 'sudo'],
  explorer: ['explorer', 'files', 'filesystem', 'aura_fs', 'folders', 'browse', 'directory'],
  settings: ['settings', 'preferences', 'theme', 'dark mode', 'light mode', 'appearance', 'display']
};

export default function StartMenu({
  isOpen,
  onClose,
  openApp,
  onSleep,
  onRestart,
  onShutdown,
  recentAppId
}) {
  const [search, setSearch] = useState('');
  const [isPowerOpen, setIsPowerOpen] = useState(false);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Autofocus search on open and reset search query
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setIsPowerOpen(false);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Global keydown handler for Escape & Enter
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (isPowerOpen) {
          setIsPowerOpen(false);
        } else {
          onClose();
        }
      }
    };

    const handleOutsideClick = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest('#start-menu-button') &&
        !e.target.closest('.power-menu-popover')
      ) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, isPowerOpen, onClose]);

  // Filtered applications based on search
  const filteredApps = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return DESKTOP_ICON_LIST;

    return DESKTOP_ICON_LIST.filter((app) => {
      const matchTitle = app.title.toLowerCase().includes(q) || app.shortTitle.toLowerCase().includes(q);
      const keywords = APP_SEARCH_KEYWORDS[app.id] || [];
      const matchKeywords = keywords.some((kw) => kw.includes(q) || q.includes(kw));
      return matchTitle || matchKeywords;
    });
  }, [search]);

  // Handle Search Input submit (Enter key)
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredApps.length > 0) {
        const appId = filteredApps[0].id;
        const targetBtn = menuRef.current?.querySelector(`[data-start-app="${appId}"]`);
        let origin = null;
        if (targetBtn) {
          const rect = targetBtn.getBoundingClientRect();
          origin = {
            x: Math.round(rect.left + rect.width / 2),
            y: Math.round(rect.top + rect.height / 2)
          };
        }
        openApp(appId, origin);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  // Recommended default shortcuts
  const recentApp = DESKTOP_ICON_LIST.find((a) => a.id === recentAppId) || DESKTOP_ICON_LIST[0];

  return (
    <div
      ref={menuRef}
      className="start-menu-container fixed z-50 rounded-2xl border p-5 shadow-2xl backdrop-blur-2xl font-sans flex flex-col justify-between select-none animate-in fade-in slide-in-from-bottom-3 duration-200"
      style={{
        backgroundColor: 'var(--color-bg-panel)',
        borderColor: 'var(--color-border-strong)',
        color: 'var(--color-text-primary)'
      }}
      role="dialog"
      aria-label="AURA Start Menu"
    >
      {/* Top Header & Search Bar */}
      <div className="flex flex-col gap-3">
        {/* Brand Bar */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            {/* Authentic AURA Emblem */}
            <div className="w-6 h-6 rounded-md flex items-center justify-center p-0.5">
              <img src="/AURA-icon.png" alt="AURA" className="w-full h-full object-contain select-none pointer-events-none" />
            </div>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              AURA
            </span>
          </div>

          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              color: 'var(--color-text-secondary)'
            }}
          >
            VER 26100
          </span>
        </div>

        {/* Working Search Input */}
        <div
          className="px-3.5 py-2.5 rounded-xl border flex items-center gap-2.5 transition-all focus-within:ring-2 focus-within:ring-sky-400"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <Search size={15} style={{ color: 'var(--color-text-muted)' }} />
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search apps, projects, and commands..."
            className="bg-transparent text-xs text-white outline-none w-full font-sans placeholder:text-neutral-500"
            aria-label="Search apps, projects, and commands"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="text-neutral-400 hover:text-white text-xs cursor-pointer px-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Content: Pinned Apps & Recommended */}
      <div className="flex-1 my-3 flex flex-col gap-4 overflow-y-auto pr-1">
        {/* Pinned Applications Section */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <span
              className="text-[11px] font-mono font-semibold tracking-wider uppercase"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Pinned Applications
            </span>
            <span className="text-[10px] font-mono text-neutral-500">
              {filteredApps.length} available
            </span>
          </div>

          {filteredApps.length === 0 ? (
            <div className="p-4 text-center text-xs font-mono text-neutral-500 border rounded-xl border-dashed">
              No applications match "{search}".
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-1.5">
              {filteredApps.map((app) => (
                <button
                  key={app.id}
                  data-start-app={app.id}
                  type="button"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const origin = {
                      x: Math.round(rect.left + rect.width / 2),
                      y: Math.round(rect.top + rect.height / 2)
                    };
                    openApp(app.id, origin);
                    onClose();
                  }}
                  className="start-app-item p-2.5 rounded-xl flex flex-col items-center text-center gap-2 transition-all cursor-pointer group hover:bg-white/10 active:scale-95"
                  title={`Open ${app.title}`}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-105 p-1.5 shadow-sm"
                    style={{
                      backgroundColor: 'var(--color-btn-default-bg)',
                      borderColor: 'var(--color-border-subtle)'
                    }}
                  >
                    <AppIcon app={app} appId={app.id} size={26} />
                  </div>
                  <span className="text-[11px] font-mono text-neutral-200 truncate w-full group-hover:text-white">
                    {app.shortTitle}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Shortcuts Section (Hidden when search query active) */}
        {!search && (
          <div className="border-t pt-3" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <div className="px-1 mb-2 flex items-center justify-between">
              <span
                className="text-[11px] font-mono font-semibold tracking-wider uppercase flex items-center gap-1.5"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <Sparkles size={12} className="text-sky-400" />
                <span>Recommended</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {/* Featured Project */}
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  openApp('projects', { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) });
                  onClose();
                }}
                className="p-2 rounded-xl flex items-center gap-2.5 text-left transition-colors cursor-pointer hover:bg-white/10 group"
              >
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 p-1"
                  style={{
                    backgroundColor: 'var(--color-btn-default-bg)',
                    borderColor: 'var(--color-border-subtle)'
                  }}
                >
                  <AppIcon appId="projects" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-white truncate group-hover:text-sky-400 transition-colors">
                    DhruvNetra 3D Twin
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400 truncate">
                    Antarctic Station Research
                  </div>
                </div>
              </button>

              {/* Developer Profile */}
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  openApp('about', { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) });
                  onClose();
                }}
                className="p-2 rounded-xl flex items-center gap-2.5 text-left transition-colors cursor-pointer hover:bg-white/10 group"
              >
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 p-1"
                  style={{
                    backgroundColor: 'var(--color-btn-default-bg)',
                    borderColor: 'var(--color-border-subtle)'
                  }}
                >
                  <AppIcon appId="about" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-white truncate group-hover:text-sky-400 transition-colors">
                    About Me
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400 truncate">
                    Developer Profile & Bio
                  </div>
                </div>
              </button>

              {/* Resume Quick Access */}
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  openApp('resume', { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) });
                  onClose();
                }}
                className="p-2 rounded-xl flex items-center gap-2.5 text-left transition-colors cursor-pointer hover:bg-white/10 group"
              >
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 p-1"
                  style={{
                    backgroundColor: 'var(--color-btn-default-bg)',
                    borderColor: 'var(--color-border-subtle)'
                  }}
                >
                  <AppIcon appId="resume" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-white truncate group-hover:text-sky-400 transition-colors">
                    Curriculum Vitae
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400 truncate">
                    Verified ATS CV Sheet
                  </div>
                </div>
              </button>

              {/* Terminal CLI */}
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  openApp('terminal', { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) });
                  onClose();
                }}
                className="p-2 rounded-xl flex items-center gap-2.5 text-left transition-colors cursor-pointer hover:bg-white/10 group"
              >
                <div
                  className="w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 p-1"
                  style={{
                    backgroundColor: 'var(--color-btn-default-bg)',
                    borderColor: 'var(--color-border-subtle)'
                  }}
                >
                  <AppIcon appId="terminal" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold text-white truncate group-hover:text-sky-400 transition-colors">
                    Interactive Shell
                  </div>
                  <div className="text-[9px] font-mono text-neutral-400 truncate">
                    guest@aura:~ bash CLI
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer: User Profile & Power Button */}
      <div
        className="pt-3 border-t flex items-center justify-between"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        {/* User Profile */}
        <button
          type="button"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            openApp('about', { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) });
            onClose();
          }}
          className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer text-left"
          title="Open Developer Profile"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-sm border shrink-0 overflow-hidden p-1.5 shadow-sm"
            style={{
              backgroundColor: 'var(--color-btn-accent-bg)',
              borderColor: 'var(--color-border-default)',
              color: 'var(--color-status-dot)'
            }}
          >
            <img src="/AURA-icon.png" alt="AURA Profile" className="w-full h-full object-contain pointer-events-none select-none" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              {PORTFOLIO_DATA.identity.name}
            </div>
            <div className="text-[10px] font-mono text-neutral-400 truncate">
              Computer Science & AI
            </div>
          </div>
        </button>

        {/* Power Menu Trigger Button */}
        <div className="relative">
          <button
            id="power-menu-button"
            type="button"
            onClick={() => setIsPowerOpen(!isPowerOpen)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              isPowerOpen
                ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-sm'
                : 'hover:bg-white/10 text-neutral-300 hover:text-white border-transparent'
            }`}
            title="Power Options (Sleep, Restart, Shut Down)"
            aria-label="Power Options"
            aria-expanded={isPowerOpen}
          >
            <Power size={16} />
          </button>

          {/* Embedded PowerMenu Popover */}
          <PowerMenu
            isOpen={isPowerOpen}
            onClose={() => setIsPowerOpen(false)}
            onSleep={onSleep}
            onRestart={onRestart}
            onShutdown={onShutdown}
          />
        </div>
      </div>
    </div>
  );
}
