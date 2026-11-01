import React, { useState, useEffect } from 'react';
import { Folder, Layers, FolderCode, Boxes } from 'lucide-react';
import DhruvNetraDetails from './projects/dhruvnetra/DhruvNetraDetails';
import AIVoiceGuardDetails from './projects/aivoiceguard/AIVoiceGuardDetails';
import PortfolioDetails from './projects/portfolio/PortfolioDetails';
import ErrorBoundary from '../common/ErrorBoundary';

/**
 * Projects Explorer Application
 * Features an icon-based 6-project desktop explorer.
 * Supports dedicated in-depth details experiences for DhruvNetra, AI-Voice Guard, and Interactive Developer Portfolio.
 * The other three projects remain interactive shortcuts pending individual implementation.
 */
const PROJECTS = [
  {
    id: 'dhruvnetra',
    name: 'DhruvNetra',
    image: '/projects-icons/dhruvnetra-icon.png',
    hasDetails: true,
  },
  {
    id: 'aura',
    name: 'AURA',
    image: '/AURA-icon.png',
    placeholderIcon: Layers,
    hasDetails: false,
  },
  {
    id: 'ai-project',
    name: 'AI-Voice Guard',
    image: '/projects-icons/ai-voice-guard-icon.png',
    hasDetails: true,
  },
  {
    id: 'web-dev-project',
    name: 'Web Development Project',
    placeholderIcon: FolderCode,
    hasDetails: false,
  },
  {
    id: 'portfolio-website',
    name: 'Portfolio Website',
    image: '/projects-icons/3d-portfolio-icon.png',
    hasDetails: true,
  },
  {
    id: 'other-projects',
    name: 'Other Projects',
    placeholderIcon: Boxes,
    hasDetails: false,
  },
];

export default function ProjectsApp() {
  const [selectedId, setSelectedId] = useState(() => {
    return window.__aura_requested_project || null;
  });
  const [activeProjectView, setActiveProjectView] = useState(() => {
    const requested = window.__aura_requested_project;
    if (requested && ['dhruvnetra', 'ai-project', 'portfolio-website'].includes(requested)) {
      window.__aura_requested_project = null;
      return requested;
    }
    return null;
  });

  // Listen for navigation events from other apps (e.g. Skills app)
  useEffect(() => {
    if (window.__aura_requested_project) {
      const pid = window.__aura_requested_project;
      if (['dhruvnetra', 'ai-project', 'portfolio-website'].includes(pid)) {
        setActiveProjectView(pid);
        setSelectedId(pid);
      }
      window.__aura_requested_project = null;
    }

    const handleOpenProjectEvent = (e) => {
      const { projectId } = e.detail || {};
      if (projectId && ['dhruvnetra', 'ai-project', 'portfolio-website'].includes(projectId)) {
        setActiveProjectView(projectId);
        setSelectedId(projectId);
      }
    };
    window.addEventListener('aura:open-project', handleOpenProjectEvent);
    return () => {
      window.removeEventListener('aura:open-project', handleOpenProjectEvent);
    };
  }, []);

  // Clear selection when clicking canvas background
  const handleCanvasClick = () => {
    setSelectedId(null);
  };

  const handleShortcutClick = (e, project) => {
    e.stopPropagation();
    setSelectedId(project.id);

    if (project.id === 'dhruvnetra') {
      setActiveProjectView('dhruvnetra');
    } else if (project.id === 'ai-project') {
      setActiveProjectView('ai-project');
    } else if (project.id === 'portfolio-website') {
      setActiveProjectView('portfolio-website');
    }
  };

  const handleKeyDown = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedId(project.id);
      if (project.id === 'dhruvnetra') {
        setActiveProjectView('dhruvnetra');
      } else if (project.id === 'ai-project') {
        setActiveProjectView('ai-project');
      } else if (project.id === 'portfolio-website') {
        setActiveProjectView('portfolio-website');
      }
    }
  };

  // Render DhruvNetra details view if active
  if (activeProjectView === 'dhruvnetra') {
    return (
      <div className="h-full w-full">
        <ErrorBoundary
          fallbackTitle="DhruvNetra Details Failed to Render"
          onBack={() => setActiveProjectView(null)}
          onReset={() => setActiveProjectView(null)}
        >
          <DhruvNetraDetails onBack={() => setActiveProjectView(null)} />
        </ErrorBoundary>
      </div>
    );
  }

  // Render AI-Voice Guard details view if active
  if (activeProjectView === 'ai-project') {
    return (
      <div className="h-full w-full">
        <ErrorBoundary
          fallbackTitle="AI-Voice Guard Details Failed to Render"
          onBack={() => setActiveProjectView(null)}
          onReset={() => setActiveProjectView(null)}
        >
          <AIVoiceGuardDetails onBack={() => setActiveProjectView(null)} />
        </ErrorBoundary>
      </div>
    );
  }

  // Render Interactive Developer Portfolio details view if active
  if (activeProjectView === 'portfolio-website') {
    return (
      <div className="h-full w-full">
        <ErrorBoundary
          fallbackTitle="Interactive Developer Portfolio Details Failed to Render"
          onBack={() => setActiveProjectView(null)}
          onReset={() => setActiveProjectView(null)}
        >
          <PortfolioDetails onBack={() => setActiveProjectView(null)} />
        </ErrorBoundary>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-full overflow-hidden font-sans select-none"
      style={{
        backgroundColor: 'var(--color-bg-app, #06070a)',
      }}
      onClick={handleCanvasClick}
    >
      {/* Explorer Address Bar / Header */}
      <div
        className="h-10 px-4 border-b flex items-center justify-between text-xs font-mono select-none shrink-0"
        style={{
          backgroundColor: 'var(--color-btn-default-bg)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-secondary)',
        }}
      >
        <div className="flex items-center gap-2">
          <Folder size={14} className="text-sky-400" />
          <span className="text-slate-400">AURA_FS</span>
          <span className="text-slate-600">/</span>
          <span className="text-white font-medium">Projects</span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">6 items</span>
      </div>

      {/* Explorer Canvas: Balanced, centered 6-icon desktop layout */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 md:gap-14 max-w-3xl w-full justify-items-center items-center py-4">
          {PROJECTS.map((project) => {
            const isSelected = selectedId === project.id;
            const PlaceholderIcon = project.placeholderIcon;

            return (
              <button
                key={project.id}
                type="button"
                onClick={(e) => handleShortcutClick(e, project)}
                onKeyDown={(e) => handleKeyDown(e, project)}
                className={`group flex flex-col items-center justify-start gap-2.5 sm:gap-3.5 p-3 sm:p-4 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${isSelected
                  ? 'bg-white/10 ring-1 ring-sky-400/40 shadow-[0_0_16px_rgba(56,189,248,0.2)]'
                  : 'hover:bg-white/[0.04] active:scale-95'
                  }`}
                aria-label={project.name}
                title={project.hasDetails ? `Open ${project.name} Details` : project.name}
              >
                {/* Icon Container: consistent square display dimensions */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center relative">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-contain pointer-events-none select-none transition-all duration-200 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(56,189,248,0.45)]"
                      loading="eager"
                    />
                  ) : (
                    /* Clean, neutral OS-style placeholder icon */
                    <div
                      className="w-full h-full rounded-2xl border flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:border-sky-400/40 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                      style={{
                        backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
                        borderColor: isSelected
                          ? 'rgba(56, 189, 248, 0.4)'
                          : 'var(--color-border-default, rgba(255, 255, 255, 0.1))',
                      }}
                    >
                      {PlaceholderIcon && (
                        <PlaceholderIcon
                          className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 text-slate-400/80 group-hover:text-sky-300 transition-colors"
                          strokeWidth={1.5}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Project Name: clearly readable directly underneath */}
                <span
                  className={`font-mono text-xs sm:text-sm font-medium text-center leading-snug tracking-tight max-w-[130px] sm:max-w-[150px] transition-colors select-none ${isSelected
                    ? 'text-sky-300'
                    : 'text-slate-200 group-hover:text-white'
                    }`}
                >
                  {project.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Window Status Edge */}
      <div
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)',
        }}
      >
        <span>FS: /AURA_FS/PROJECTS</span>
        <span className="hidden sm:inline">
          {selectedId
            ? `SELECTED: ${PROJECTS.find(p => p.id === selectedId)?.name.toUpperCase()}`
            : 'STATUS: READY'
          }
        </span>
        <span>6 ITEMS // DESKTOP EXPLORER</span>
      </div>
    </div>
  );
}
