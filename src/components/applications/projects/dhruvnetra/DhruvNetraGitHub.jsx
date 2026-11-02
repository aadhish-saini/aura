import React from 'react';
import { ArrowUpRight } from 'lucide-react';

function GithubIcon({ size = 22, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function DhruvNetraGitHub({ repoUrl, repoName = "aadhish-saini/DhruvNetra" }) {
  return (
    <section className="py-8 sm:py-10 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div 
          className="p-5 sm:p-6 rounded-2xl border transition-all duration-200 hover:border-sky-400/40 relative overflow-hidden group"
          style={{
            backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.04))',
            borderColor: 'var(--color-border-default, rgba(255, 255, 255, 0.1))'
          }}
        >
          {/* Subtle decorative glow */}
          <div 
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"
            style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 text-white"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderColor: 'var(--color-border-subtle)'
                }}
              >
                <GithubIcon size={24} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">
                    Open Source Repository
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-mono font-semibold text-white tracking-tight">
                  {repoName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Explore the source code and implementation of DhruvNetra.
                </p>
              </div>
            </div>

            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all duration-200 cursor-pointer shrink-0 hover:scale-[1.02] active:scale-95"
              style={{
                backgroundColor: 'var(--color-status-dot, #38bdf8)',
                color: '#06070a',
              }}
            >
              <span>View Source Code</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
