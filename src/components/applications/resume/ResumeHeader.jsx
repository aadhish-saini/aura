import React from 'react';
import { FileText, Download, ExternalLink, Eye, GraduationCap, ShieldCheck } from 'lucide-react';

export default function ResumeHeader({ header, onScrollToViewer }) {
  const { name, role, title, subtitle, introduction, pdfUrl, downloadFileName } = header;

  return (
    <section className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Top Tag & Document Verification */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/25 bg-cyan-950/20 text-cyan-300">
          <FileText size={13} className="text-cyan-400" />
          <span className="font-semibold tracking-wider uppercase">PROFILE & CURRICULUM VITAE</span>
          <span className="text-white/30">•</span>
          <span>DOCUMENT VIEWER</span>
        </div>

        <span
          className="px-2.5 py-0.5 rounded text-[10px] font-mono border flex items-center gap-1.5"
          style={{
            backgroundColor: 'var(--color-badge-bg, rgba(255, 255, 255, 0.04))',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            color: '#38bdf8',
          }}
        >
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>VERIFIED RESUME PDF</span>
        </span>
      </div>

      {/* Main Identity Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
            {name}
          </h1>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm font-semibold tracking-wide">
            <GraduationCap size={16} />
            <span>{role}</span>
          </div>
        </div>

        {/* 3 Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Action 1: View Embedded Resume */}
          <button
            type="button"
            onClick={onScrollToViewer}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-cyan-500 hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)] active:scale-95"
          >
            <Eye size={14} />
            <span>View Resume</span>
          </button>

          {/* Action 2: Download Resume */}
          <a
            href={pdfUrl}
            download={downloadFileName}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/50 transition-all cursor-pointer active:scale-95"
            title="Download PDF directly to your device"
          >
            <Download size={14} className="text-cyan-400" />
            <span>Download</span>
          </a>

          {/* Action 3: Open in New Tab */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 bg-slate-900/50 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            title="Open resume in full browser tab"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">Open in Tab</span>
          </a>
        </div>
      </div>

      {/* Subtitle Quote */}
      <blockquote className="text-base sm:text-lg font-serif italic text-cyan-200/90 font-light mb-4 border-l-2 border-cyan-400/40 pl-3.5 py-0.5">
        "{subtitle}"
      </blockquote>

      {/* Professional Introduction */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-3xl">
        {introduction}
      </p>
    </section>
  );
}

