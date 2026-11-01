import React, { useRef, useCallback } from 'react';
import { RESUME_DATA } from './resumeData';
import ResumeHeader from './ResumeHeader';
import ResumeSnapshot from './ResumeSnapshot';
import ResumeSkills from './ResumeSkills';
import ResumeProjects from './ResumeProjects';
import ResumePdfViewer from './ResumePdfViewer';
import ResumeCareerDirection from './ResumeCareerDirection';
import { FileText, ShieldCheck } from 'lucide-react';

export default function ResumeApp({ openApp }) {
  const containerRef = useRef(null);

  // Scroll smoothly to the embedded PDF viewer section
  const handleScrollToViewer = useCallback(() => {
    if (!containerRef.current) return;
    const viewerEl = containerRef.current.querySelector('#resume-pdf-viewer');
    if (viewerEl) {
      viewerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Inter-application project showcase opening
  const handleOpenProject = useCallback((projectId) => {
    window.__aura_requested_project = projectId;
    window.dispatchEvent(
      new CustomEvent('aura:open-project', { detail: { projectId } })
    );

    if (typeof openApp === 'function') {
      openApp('projects');
    }
  }, [openApp]);

  return (
    <div className="flex flex-col h-full bg-[#080c14] text-slate-100 select-text overflow-hidden relative font-sans">
      {/* Main Scrollable Content */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-7 md:p-8 space-y-2 scroll-smooth"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section A: Profile Header & Actions */}
          <ResumeHeader
            header={RESUME_DATA.header}
            onScrollToViewer={handleScrollToViewer}
          />

          {/* Section B: Professional Snapshot */}
          <ResumeSnapshot focusAreas={RESUME_DATA.technicalFocus} />

          {/* Section C: Technical Background */}
          <ResumeSkills skills={RESUME_DATA.technicalBackground} />

          {/* Section D: Selected Projects */}
          <ResumeProjects
            projects={RESUME_DATA.selectedProjects}
            onOpenProject={handleOpenProject}
          />

          {/* Section E: Native Resume PDF Viewer */}
          <ResumePdfViewer
            pdfUrl={RESUME_DATA.header.pdfUrl}
            downloadFileName={RESUME_DATA.header.downloadFileName}
          />

          {/* Section G: Career Direction */}
          <ResumeCareerDirection
            careerDirection={RESUME_DATA.careerDirection}
          />
        </div>
      </div>

      {/* Window Status Edge */}
      <div
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0"
        style={{
          backgroundColor: 'rgba(5, 8, 16, 0.95)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted, #64748b)',
        }}
      >
        <span className="text-cyan-400/90 flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>RESUME ARCHIVE // /resume.pdf // 2 PAGES</span>
        </span>
        <span className="text-slate-500">DOCUMENT VIEWER v2.0</span>
      </div>
    </div>
  );
}

