import React from 'react';
import { Target, Brain, Compass, Code, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';

export default function AboutApp({ openApp }) {
  const { identity } = PORTFOLIO_DATA;

  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      <div className="p-5 md:p-6 flex flex-col gap-5 flex-1">
        {/* Profile Identity Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <span 
              className="text-[10px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--color-status-dot)' }}
            >
              IDENTITY SPECIFICATION
            </span>
            <h3 className="text-2xl font-semibold tracking-tight text-white mt-1">
              {identity.name}
            </h3>
            <p className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-secondary)' }}>
              {identity.degree}
            </p>
          </div>
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner shrink-0"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)',
              color: 'var(--color-status-dot)'
            }}
          >
            <Code size={24} />
          </div>
        </div>

        {/* Profile Narrative Abstract */}
        <div 
          className="p-4 rounded-xl border backdrop-blur-sm"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-subtle)',
          }}
        >
          <p 
            className="text-sm leading-relaxed italic"
            style={{ color: 'var(--color-text-primary)' }}
          >
            "{identity.introduction}"
          </p>
        </div>

        {/* 3 Compact Structured Information Cards */}
        <div className="grid grid-cols-1 gap-3">
          {/* Card 1: Current Focus */}
          <div 
            className="p-4 rounded-xl border flex items-start gap-3.5 transition-all hover:brightness-105"
            style={{
              backgroundColor: 'var(--color-btn-accent-bg)',
              borderColor: 'var(--color-border-default)',
            }}
          >
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: 'var(--color-badge-bg)',
                borderColor: 'var(--color-btn-accent-border)',
                color: 'var(--color-status-dot)'
              }}
            >
              <Target size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div 
                className="text-xs font-mono font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-status-dot)' }}
              >
                CURRENT FOCUS
              </div>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {identity.sections.currentFocus}
              </p>
            </div>
          </div>

          {/* Card 2: Technical Interests */}
          <div 
            className="p-4 rounded-xl border flex items-start gap-3.5 transition-all hover:brightness-105"
            style={{
              backgroundColor: 'var(--color-btn-accent-bg)',
              borderColor: 'var(--color-border-default)',
            }}
          >
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: 'var(--color-badge-bg)',
                borderColor: 'var(--color-btn-accent-border)',
                color: 'var(--color-status-dot)'
              }}
            >
              <Brain size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div 
                className="text-xs font-mono font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-status-dot)' }}
              >
                TECHNICAL INTERESTS
              </div>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {identity.sections.technicalInterests}
              </p>
            </div>
          </div>

          {/* Card 3: My Approach */}
          <div 
            className="p-4 rounded-xl border flex items-start gap-3.5 transition-all hover:brightness-105"
            style={{
              backgroundColor: 'var(--color-btn-accent-bg)',
              borderColor: 'var(--color-border-default)',
            }}
          >
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border"
              style={{
                backgroundColor: 'var(--color-badge-bg)',
                borderColor: 'var(--color-btn-accent-border)',
                color: 'var(--color-status-dot)'
              }}
            >
              <Compass size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div 
                className="text-xs font-mono font-semibold uppercase tracking-wider"
                style={{ color: 'var(--color-status-dot)' }}
              >
                MY APPROACH
              </div>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {identity.sections.approach}
              </p>
            </div>
          </div>
        </div>

        {/* Action Footnote */}
        <div className="pt-2 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-[11px] font-mono" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-status-dot)' }} />
            <span>STATUS: KERNEL VERIFIED</span>
          </div>

          <button
            type="button"
            onClick={() => openApp && openApp('projects')}
            className="px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 active:scale-95 text-white"
            style={{
              backgroundColor: 'var(--color-progress-fill)',
              boxShadow: 'var(--color-progress-glow)'
            }}
          >
            <span>Explore Projects</span>
            <ArrowRight size={14} />
          </button>
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
        <span>MEM: 124MB ALLOCATED</span>
        <span>ENCODING: UTF-8</span>
      </div>
    </div>
  );
}
