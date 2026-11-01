import React, { useState, useEffect } from 'react';
import { X, Award, Trophy, Users, ShieldCheck, FileCheck2, ExternalLink, ZoomIn, ArrowLeft } from 'lucide-react';

export default function HonorDetailModal({ item, onClose }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isLightboxOpen]);

  if (!item) return null;

  return (
    <>
      {/* Detail Modal Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-150"
        onClick={onClose}
      >
        <div
          className="w-full max-w-xl rounded-2xl border p-6 sm:p-7 shadow-2xl relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto select-text"
          style={{
            backgroundColor: '#090d16',
            borderColor: 'rgba(245, 158, 11, 0.35)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(245, 158, 11, 0.15)',
          }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="honor-detail-title"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg border text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--color-border-subtle)' }}
            aria-label="Close details"
          >
            <X size={16} />
          </button>

          {/* Top Category Badge */}
          <div className="flex items-center gap-2 mb-2 pr-8">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30">
              {item.category}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {item.organization}
            </span>
          </div>

          {/* Title */}
          <h2 id="honor-detail-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            {item.title}
          </h2>

          {/* Result Banner */}
          <div
            className="p-3 rounded-xl border mb-5 flex items-center justify-between gap-3"
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.08)',
              borderColor: 'rgba(245, 158, 11, 0.25)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <Trophy size={18} className="text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 block">
                  Official Result
                </span>
                <span className="text-sm font-bold text-white">
                  {item.result || item.rankDisplay}
                </span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-1 shrink-0">
              <ShieldCheck size={12} />
              <span>Verified Record</span>
            </span>
          </div>

          {/* Team Info if present */}
          {item.team && (
            <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <Users size={14} className="text-cyan-400" />
                <span>Team: <strong className="text-white">{item.team}</strong></span>
              </div>
              {item.role && (
                <span className="text-slate-400 text-[11px]">{item.role}</span>
              )}
            </div>
          )}

          {/* Full Description */}
          <div className="mb-5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Summary & Impact
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>

          {/* Certificate Section */}
          <div className="mb-6 pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2.5">
              Verification & Certificate Proof
            </span>

            {item.hasCertificate ? (
              item.certificateImage ? (
                <div
                  className="relative rounded-xl border overflow-hidden cursor-pointer group"
                  style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <img
                    src={item.certificateImage}
                    alt={`${item.title} Certificate`}
                    className="w-full h-44 object-cover object-top transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono">
                    <ZoomIn size={16} />
                    <span>Click to Enlarge Certificate</span>
                  </div>
                </div>
              ) : (
                <div
                  className="p-4 rounded-xl border flex flex-col gap-2"
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.05)',
                    borderColor: 'rgba(245, 158, 11, 0.25)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-semibold">
                      <FileCheck2 size={15} />
                      <span>{item.certificateDetails?.type || 'Official Certificate Received'}</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20">
                      Document On File
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans">
                    {item.certificateDetails?.issuance || 'Awarded for securing 7th Rank among 63 competing collegiate engineering teams.'}
                  </p>
                  <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Audit Status: Confirmed</span>
                    <span>Team Dark Syntaxx</span>
                  </div>
                </div>
              )
            ) : (
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400 font-mono flex items-center gap-2">
                <ShieldCheck size={14} className="text-cyan-400 shrink-0" />
                <span>Verified technical milestone recorded in project architecture logs.</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {item.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Return Action */}
          <div className="pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-slate-300 hover:text-white hover:bg-white/5 border-slate-700 transition-colors cursor-pointer font-mono"
            >
              <ArrowLeft size={13} />
              <span>Back to Archive</span>
            </button>
            <span className="text-[10px] font-mono text-slate-500">
              AURA Verification Log
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox for enlarged certificate if image exists */}
      {isLightboxOpen && item.certificateImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-10 right-0 p-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
            <img
              src={item.certificateImage}
              alt={`${item.title} Full Certificate`}
              className="max-h-[85vh] w-auto rounded-xl shadow-2xl border border-amber-500/40 object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

