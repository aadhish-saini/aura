import React from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import { Award, Trophy, Calendar, CheckCircle2 } from 'lucide-react';

export default function AchievementsApp() {
  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div>
            <span 
              className="text-[10px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--color-status-dot)' }}
            >
              MILESTONES & HONORS
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Verified Achievements
            </h3>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              Hackathons, technical competitions, and engineering recognitions
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
            VERIFIED RECORD
          </span>
        </div>

        {/* Achievements Timeline List */}
        <div className="space-y-4">
          {PORTFOLIO_DATA.achievements.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border flex flex-col sm:flex-row items-start gap-4 transition-all hover:brightness-105"
              style={{
                backgroundColor: 'var(--color-btn-default-bg)',
                borderColor: 'var(--color-border-default)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: 'rgba(52, 211, 153, 0.12)',
                  borderColor: 'rgba(52, 211, 153, 0.3)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <Trophy size={22} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-white">
                    {item.title}
                  </h4>
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold"
                    style={{
                      backgroundColor: 'var(--color-btn-accent-bg)',
                      color: 'var(--color-status-dot)'
                    }}
                  >
                    {item.result}
                  </span>
                </div>

                <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono border"
                      style={{
                        backgroundColor: 'var(--color-btn-accent-bg)',
                        borderColor: 'var(--color-border-subtle)',
                        color: 'var(--color-text-muted)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
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
        <span>RECOGNITION LOG // AUDITABLE</span>
        <span>STATUS: VERIFIED</span>
      </div>
    </div>
  );
}
