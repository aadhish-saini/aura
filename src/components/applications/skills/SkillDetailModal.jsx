import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SKILL_LEVELS } from './skillsData';

export default function SkillDetailModal({ skill, onClose, onOpenProject }) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!skill) return null;

  const levelInfo = SKILL_LEVELS[skill.level] || SKILL_LEVELS.exploring;
  const levelText = skill.levelDisplay || levelInfo.label;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative animate-in zoom-in-95 duration-150 select-text"
        style={{
          backgroundColor: 'var(--color-bg-card, #090d16)',
          borderColor: 'rgba(6, 182, 212, 0.3)',
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(6, 182, 212, 0.15)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg border text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          style={{ borderColor: 'var(--color-border-subtle)' }}
          aria-label="Close dialog"
        >
          <X size={15} />
        </button>

        {/* Skill Header */}
        <div className="flex items-start gap-3.5 mb-4 pr-8">
          <div>
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-1">
              {skill.category || "Technical Capability"}
            </div>
            <h3 id="skill-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {skill.name}
            </h3>
          </div>
        </div>

        {/* Level Definition Badge & Description */}
        <div 
          className="p-3.5 rounded-xl border mb-5 flex flex-col gap-1.5"
          style={{
            backgroundColor: levelInfo.bgColor,
            borderColor: levelInfo.borderColor,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300">
              Proficiency Benchmark
            </span>
            <span 
              className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold"
              style={{
                color: levelInfo.color,
                backgroundColor: 'rgba(0, 0, 0, 0.3)'
              }}
            >
              {levelText}
            </span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            {levelInfo.description}
          </p>
        </div>

        {/* Overview Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-sans">
          {skill.description}
        </p>

        {/* Used For / Focus Areas */}
        {(skill.usedFor || skill.details) && (
          <div className="mb-5">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Implementation Focus & Practical Use
            </div>
            {skill.usedFor ? (
              <ul className="space-y-1.5">
                {skill.usedFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed">
                {skill.details}
              </p>
            )}
          </div>
        )}

        {/* Associated Projects */}
        {(skill.associatedProjects || skill.projects) && (skill.associatedProjects || skill.projects).length > 0 && (
          <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">
              Applied In Projects
            </div>
            <div className="flex flex-wrap gap-2">
              {(skill.associatedProjects || skill.projects).map((proj) => {
                if (proj.isInternalLink) {
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => {
                        onClose();
                        if (onOpenProject) {
                          onOpenProject(proj.id);
                        }
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono text-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/40 border-cyan-500/30 hover:border-cyan-400 transition-colors cursor-pointer group"
                      title={`Open ${proj.name} details in Projects`}
                    >
                      <span>{proj.name}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  );
                }

                return (
                  <span
                    key={proj.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono text-slate-400 bg-white/[0.03] border-white/10"
                  >
                    <span>{proj.name}</span>
                    {proj.note && <span className="text-[10px] text-slate-500">({proj.note})</span>}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

