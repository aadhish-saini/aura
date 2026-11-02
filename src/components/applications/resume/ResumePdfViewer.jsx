import React, { useState, useRef } from 'react';
import { FileText, Download, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

export default function ResumePdfViewer({ pdfUrl = '/resume.pdf', downloadFileName = 'Aadhish_Saini_Resume.pdf' }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef(null);

  const handleReload = () => {
    setIsLoading(true);
    setHasError(false);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <section id="resume-pdf-viewer" className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Section Headline */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
            NATIVE DOCUMENT VIEWER
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
          Curriculum Vitae Document
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Embedded native document viewer rendering verified PDF records directly within AURA OS.
        </p>
      </div>

      {/* Main Document Viewer Container */}
      <div
        className="rounded-2xl border overflow-hidden shadow-2xl flex flex-col"
        style={{
          backgroundColor: '#070a12',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(6, 182, 212, 0.1)',
        }}
      >
        {/* Document Toolbar */}
        <div
          className="px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 select-none"
          style={{
            backgroundColor: 'rgba(10, 15, 26, 0.95)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* File Information */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <FileText size={15} />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                <span>{downloadFileName}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-1.5 py-0.2 rounded hidden sm:inline">
                  Verified PDF
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 block">
                Standard PDF Document // Multi-page scroll supported
              </span>
            </div>
          </div>

          {/* Viewer Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Reload Button */}
            <button
              type="button"
              onClick={handleReload}
              className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Reload PDF preview"
              aria-label="Reload PDF preview"
            >
              <RefreshCw size={13} className={isLoading ? 'animate-spin text-cyan-400' : ''} />
            </button>

            {/* Download Button */}
            <a
              href={pdfUrl}
              download={downloadFileName}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer"
              title="Download PDF file"
            >
              <Download size={13} />
              <span>Download</span>
            </a>

            {/* Open in Tab Button */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
              title="Open document in external browser tab"
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>
          </div>
        </div>

        {/* Viewer Canvas Area */}
        <div className="relative w-full h-[650px] sm:h-[750px] md:h-[820px] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <span className="text-xs font-mono text-cyan-300">
                Loading verified resume document...
              </span>
            </div>
          )}

          {/* Graceful Fallback if browser blocks iframe PDF rendering */}
          {hasError ? (
            <div className="p-8 text-center max-w-md mx-auto">
              <AlertCircle size={32} className="text-amber-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-2">
                PDF Viewer Blocked or Unsupported
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans mb-5">
                Your browser environment restricts inline PDF rendering. You can easily view or download the complete resume using the direct links below.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={pdfUrl}
                  download={downloadFileName}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-cyan-500 hover:bg-cyan-400 transition-colors"
                >
                  Download PDF Directly
                </a>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium text-slate-300 border border-slate-700 hover:border-slate-500 transition-colors"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
          ) : (
            /* Native PDF Iframe / Embed */
            <iframe
              key={reloadKey}
              ref={iframeRef}
              src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
              title="Aadhish Saini Curriculum Vitae"
              className="w-full h-full border-0 block"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            />
          )}
        </div>

        {/* Viewer Footer Bar */}
        <div
          className="px-4 py-2 border-t flex items-center justify-between text-[10px] font-mono select-none"
          style={{
            backgroundColor: 'rgba(8, 12, 20, 0.95)',
            borderColor: 'rgba(255, 255, 255, 0.08)',
          }}
        >
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>DOCUMENT STATUS: READY // /resume.pdf</span>
          </span>
          <span className="text-slate-500 hidden sm:inline">
            NATIVE RENDERING ENGINE
          </span>
        </div>
      </div>
    </section>
  );
}

