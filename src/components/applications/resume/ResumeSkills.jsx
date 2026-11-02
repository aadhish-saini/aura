import React from 'react';

const LEVEL_STYLES = {
  comfortable: {
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  developing: {
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  beginner: {
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  exploring: {
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
  },
};

export default function ResumeSkills({ skills }) {
  return (
    <section className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Header */}
      <div className="mb-6">
        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
          TECHNICAL BACKGROUND
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-1">
          Languages, Libraries & Frameworks
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Proficiency benchmarks evaluated on practical application and software development.
        </p>
      </div>

      {/* Grid of Skills Chips / Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
        {skills.map((skill) => {
          const style = LEVEL_STYLES[skill.levelKey] || LEVEL_STYLES.developing;

          return (
            <div
              key={skill.name}
              className="p-3.5 rounded-xl border flex items-center justify-between gap-2.5 transition-all hover:border-slate-600/60"
              style={{
                backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
                borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: style.color }} />
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                  {skill.name}
                </span>
              </div>

              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono font-medium shrink-0"
                style={{
                  color: style.color,
                  backgroundColor: style.bgColor,
                  border: `1px solid ${style.borderColor}`,
                }}
              >
                {skill.level}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

