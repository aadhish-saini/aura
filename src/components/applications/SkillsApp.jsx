import React from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import { Code2, Layout, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SkillsApp() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div>
            <span 
              className="text-[10px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--color-status-dot)' }}
            >
              TECHNICAL CAPABILITIES
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Engineering Skill Matrix
            </h3>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              Core languages, frontend architecture, databases, and AI development
            </p>
          </div>
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-mono border"
            style={{
              backgroundColor: 'rgba(52, 211, 153, 0.1)',
              borderColor: 'rgba(52, 211, 153, 0.25)',
              color: 'var(--color-status-dot)'
            }}
          >
            VERIFIED STACK
          </span>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Programming */}
          <div 
            className="p-4 rounded-xl border flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)'
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={16} style={{ color: 'var(--color-status-dot)' }} />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
                  PROGRAMMING
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {skills.programming.map((item) => (
                  <div 
                    key={item.name}
                    className="p-2.5 rounded-lg border flex items-center justify-between"
                    style={{
                      backgroundColor: 'var(--color-btn-accent-bg)',
                      borderColor: 'var(--color-border-subtle)'
                    }}
                  >
                    <span className="text-xs font-mono font-medium text-white">{item.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Frontend */}
          <div 
            className="p-4 rounded-xl border flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)'
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layout size={16} style={{ color: 'var(--color-status-dot)' }} />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
                  FRONTEND
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {skills.frontend.map((item) => (
                  <div 
                    key={item.name}
                    className="p-2.5 rounded-lg border flex items-center justify-between"
                    style={{
                      backgroundColor: 'var(--color-btn-accent-bg)',
                      borderColor: 'var(--color-border-subtle)'
                    }}
                  >
                    <span className="text-xs font-mono font-medium text-white">{item.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Database */}
          <div 
            className="p-4 rounded-xl border flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)'
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Database size={16} style={{ color: 'var(--color-status-dot)' }} />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
                  DATABASE
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {skills.database.map((item) => (
                  <div 
                    key={item.name}
                    className="p-2.5 rounded-lg border flex items-center justify-between"
                    style={{
                      backgroundColor: 'var(--color-btn-accent-bg)',
                      borderColor: 'var(--color-border-subtle)'
                    }}
                  >
                    <span className="text-xs font-mono font-medium text-white">{item.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Development */}
          <div 
            className="p-4 rounded-xl border flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)'
            }}
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} style={{ color: 'var(--color-status-dot)' }} />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-status-dot)' }}>
                  AI DEVELOPMENT
                </span>
              </div>
              <div className="flex flex-col gap-2">
                {skills.aiDevelopment.map((item) => (
                  <div 
                    key={item.name}
                    className="p-2.5 rounded-lg border flex items-center justify-between"
                    style={{
                      backgroundColor: 'var(--color-btn-accent-bg)',
                      borderColor: 'var(--color-border-subtle)'
                    }}
                  >
                    <span className="text-xs font-mono font-medium text-white">{item.name}</span>
                    <span className="text-[10px] font-mono" style={{ color: 'var(--color-status-dot)' }}>
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Window Status Edge */}
      <div 
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)'
        }}
      >
        <span>SYS.STACK // REPOSITORY CHECKED</span>
        <span>STATUS: NOMINAL</span>
      </div>
    </div>
  );
}
