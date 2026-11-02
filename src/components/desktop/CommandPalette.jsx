import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  Terminal,
  FolderGit2,
  FileText,
  User,
  Sliders,
  Compass,
  Trophy,
  Mail,
  Folder,
  Gamepad2,
  Maximize2,
  Minimize2,
  Moon,
  Power,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import AppIcon from '../common/AppIcon';
import './CommandPalette.css';

const COMMAND_ITEMS = [
  // Applications
  {
    id: 'app-about',
    type: 'app',
    category: 'Applications',
    title: 'About Me',
    subtitle: 'Developer biography, philosophy & identity',
    keywords: ['about', 'bio', 'whoami', 'aadhish', 'profile', 'story'],
    shortcut: 'Ctrl+1',
    action: (helpers) => helpers.openApp('about')
  },
  {
    id: 'app-projects',
    type: 'app',
    category: 'Applications',
    title: 'Projects Repository',
    subtitle: 'Engineering showcase, architecture & live demos',
    keywords: ['projects', 'code', 'github', 'repo', 'apps', 'work'],
    shortcut: 'Ctrl+2',
    action: (helpers) => helpers.openApp('projects')
  },
  {
    id: 'app-skills',
    type: 'app',
    category: 'Applications',
    title: 'Skills & Capabilities',
    subtitle: 'Technical stack, languages, tools & AI expertise',
    keywords: ['skills', 'stack', 'languages', 'python', 'react', 'javascript', 'c++'],
    shortcut: 'Ctrl+3',
    action: (helpers) => helpers.openApp('skills')
  },
  {
    id: 'app-achievements',
    type: 'app',
    category: 'Applications',
    title: 'Honors & Recognitions',
    subtitle: 'Hackathons, rankings & engineering milestones',
    keywords: ['achievements', 'honors', 'hackathon', 'rank', 'awards'],
    shortcut: 'Ctrl+4',
    action: (helpers) => helpers.openApp('achievements')
  },
  {
    id: 'app-resume',
    type: 'app',
    category: 'Applications',
    title: 'Curriculum Vitae',
    subtitle: 'Verified ATS PDF document viewer',
    keywords: ['resume', 'cv', 'pdf', 'career', 'job', 'experience'],
    shortcut: 'Ctrl+5',
    action: (helpers) => helpers.openApp('resume')
  },
  {
    id: 'app-contact',
    type: 'app',
    category: 'Applications',
    title: 'Contact & Transmission',
    subtitle: 'Direct email, form submission & social profiles',
    keywords: ['contact', 'email', 'message', 'send', 'connect'],
    shortcut: 'Ctrl+6',
    action: (helpers) => helpers.openApp('contact')
  },
  {
    id: 'app-terminal',
    type: 'app',
    category: 'Applications',
    title: 'Terminal Shell',
    subtitle: 'Interactive CLI, system diagnostics & bash utilities',
    keywords: ['terminal', 'cli', 'bash', 'shell', 'command', 'neofetch'],
    shortcut: 'Ctrl+Shift+T',
    action: (helpers) => helpers.openApp('terminal')
  },
  {
    id: 'app-explorer',
    type: 'app',
    category: 'Applications',
    title: 'File Explorer',
    subtitle: 'Browse virtual filesystem AURA_FS',
    keywords: ['explorer', 'files', 'filesystem', 'folders', 'storage'],
    action: (helpers) => helpers.openApp('explorer')
  },
  {
    id: 'app-settings',
    type: 'app',
    category: 'Applications',
    title: 'Settings & Appearance',
    subtitle: 'Runtime preferences, shortcuts & display mode',
    keywords: ['settings', 'preferences', 'theme', 'config', 'fullscreen'],
    action: (helpers) => helpers.openApp('settings')
  },
  {
    id: 'app-override',
    type: 'app',
    category: 'Applications',
    title: 'AURA: SYSTEM OVERRIDE',
    subtitle: 'Classified cybersecurity puzzle challenge (Easter Egg)',
    keywords: ['game', 'override', 'easter egg', 'puzzle', 'cybersecurity'],
    action: (helpers) => helpers.openApp('system-override')
  },

  // Direct Projects
  {
    id: 'proj-dhruvnetra',
    type: 'project',
    category: 'Projects',
    title: 'Open DhruvNetra 3D Twin',
    subtitle: 'Antarctic station remote management & telemetry',
    keywords: ['dhruvnetra', 'antarctica', '3d', 'digital twin', 'research'],
    action: (helpers) => helpers.openProject('dhruvnetra')
  },
  {
    id: 'proj-aivoiceguard',
    type: 'project',
    category: 'Projects',
    title: 'Open AI-Voice Guard',
    subtitle: 'Real-time deepfake detection engine & VoIP shield',
    keywords: ['ai-voice-guard', 'voice', 'audio', 'deepfake', 'security'],
    action: (helpers) => helpers.openProject('ai-voice-guard')
  },
  {
    id: 'proj-portfolio',
    type: 'project',
    category: 'Projects',
    title: 'Open Interactive 3D Portfolio',
    subtitle: 'Custom rigged avatar & interactive viewport experience',
    keywords: ['portfolio', 'avatar', '3d portfolio', 'interactive'],
    action: (helpers) => helpers.openProject('3d-portfolio')
  },
  {
    id: 'proj-aura',
    type: 'project',
    category: 'Projects',
    title: 'Open AURA OS Architecture',
    subtitle: 'Unified runtime architecture specification & design',
    keywords: ['aura', 'operating system', 'os', 'runtime'],
    action: (helpers) => helpers.openProject('aura-os')
  },

  // System Utilities & Quick Actions
  {
    id: 'sys-show-desktop',
    type: 'system',
    category: 'System Actions',
    title: 'Show Desktop',
    subtitle: 'Toggle minimize on all active windows',
    keywords: ['desktop', 'minimize all', 'hide windows', 'clear screen'],
    shortcut: 'Win+D',
    action: (helpers) => helpers.toggleShowDesktop()
  },
  {
    id: 'sys-fullscreen',
    type: 'system',
    category: 'System Actions',
    title: 'Toggle Fullscreen Mode',
    subtitle: 'Switch between windowed simulation and immersive display',
    keywords: ['fullscreen', 'screen', 'expand', 'maximize view'],
    shortcut: 'Ctrl+Alt+F',
    action: (helpers) => helpers.onToggleFullscreen?.()
  },
  {
    id: 'sys-restart',
    type: 'system',
    category: 'Power Options',
    title: 'Restart AURA OS',
    subtitle: 'Reboot to UEFI boot sequence',
    keywords: ['restart', 'reboot', 'reload'],
    action: (helpers) => helpers.onRestart?.()
  },
  {
    id: 'sys-sleep',
    type: 'system',
    category: 'Power Options',
    title: 'Sleep Mode',
    subtitle: 'Suspend workstation to low-power standby',
    keywords: ['sleep', 'standby', 'suspend'],
    action: (helpers) => helpers.onSleep?.()
  },
  {
    id: 'sys-shutdown',
    type: 'system',
    category: 'Power Options',
    title: 'Shut Down AURA',
    subtitle: 'Power down system session and exit',
    keywords: ['shutdown', 'power off', 'exit', 'quit'],
    action: (helpers) => helpers.onShutdown?.()
  }
];

export default function CommandPalette({
  isOpen,
  onClose,
  openApp,
  toggleShowDesktop,
  onToggleFullscreen,
  onRestart,
  onSleep,
  onShutdown
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  // Focus input and reset query on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter command items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMAND_ITEMS;

    return COMMAND_ITEMS.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSub = item.subtitle.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some((kw) => kw.includes(q) || q.includes(kw));
      return matchTitle || matchSub || matchCategory || matchKeywords;
    });
  }, [query]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex((prev) => (filteredItems.length === 0 ? 0 : Math.min(prev, filteredItems.length - 1)));
  }, [filteredItems]);

  // Helper to open projects
  const openProject = (projectId) => {
    window.__aura_requested_project = projectId;
    openApp('projects');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('aura:open-project', { detail: { projectId } }));
    }, 50);
  };

  // Execute selected item
  const handleExecute = (item) => {
    onClose();
    if (item && item.action) {
      item.action({
        openApp,
        openProject,
        toggleShowDesktop,
        onToggleFullscreen,
        onRestart,
        onSleep,
        onShutdown
      });
    }
  };

  // Keyboard navigation inside palette
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredItems.length === 0 ? 0 : (prev - 1 + filteredItems.length) % filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleExecute(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (resultsRef.current) {
      const activeEl = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <div
      className="aura-command-palette-backdrop fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-150 select-none"
      onClick={onClose}
    >
      <div
        className="aura-command-palette w-full max-w-xl rounded-2xl border shadow-2xl backdrop-blur-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col max-h-[460px]"
        style={{
          backgroundColor: 'rgba(9, 14, 26, 0.96)',
          borderColor: 'rgba(56, 189, 248, 0.35)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(56, 189, 248, 0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="AURA Command Palette"
      >
        {/* Search Input Bar */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 border-b"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <Search size={18} className="text-sky-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search applications, projects..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none font-sans"
            spellCheck={false}
          />
          <kbd
            className="px-2 py-0.5 rounded text-[10px] font-mono border text-neutral-400"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'var(--color-border-subtle)'
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={resultsRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 px-4 text-center font-mono text-xs text-neutral-500">
              No matching commands or applications found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  data-index={idx}
                  onClick={() => handleExecute(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-sky-500/20 text-white'
                      : 'hover:bg-white/[0.04] text-neutral-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 p-1 ${
                        isSelected
                          ? 'border-sky-400/50 bg-sky-500/20 text-sky-300'
                          : 'border-white/10 bg-white/[0.03] text-neutral-400'
                      }`}
                    >
                      {item.type === 'app' ? (
                        <AppIcon appId={item.id.replace('app-', '')} size={18} />
                      ) : item.type === 'project' ? (
                        <FolderGit2 size={16} />
                      ) : (
                        <Sliders size={16} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-white truncate">
                          {item.title}
                        </span>
                        <span
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded uppercase"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            color: 'var(--color-text-muted)'
                          }}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.shortcut && (
                      <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono border border-white/10 bg-white/[0.03] text-neutral-400">
                        {item.shortcut}
                      </kbd>
                    )}
                    {isSelected && <ArrowRight size={14} className="text-sky-400" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div
          className="px-4 py-2 border-t text-[10px] font-mono text-neutral-500 flex items-center justify-between"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Execute</span>
            <span>Esc Close</span>
          </div>
          <span>AURA CORE SHELL</span>
        </div>
      </div>
    </div>
  );
}
