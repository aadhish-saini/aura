import React from 'react';
import { ArrowRight, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import AppIcon from '../common/AppIcon';

export default function WelcomeWidget({ openApp }) {
  const { identity, systemInfo } = PORTFOLIO_DATA;

  return (
    <div className="flex flex-col gap-4 max-w-xl">
      {/* Refined Welcome Widget */}
      <div 
        className="rounded-2xl border p-6 backdrop-blur-xl shadow-xl relative overflow-hidden transition-all"
        style={{
          backgroundColor: 'var(--color-bg-panel)',
          borderColor: 'var(--color-border-strong)'
        }}
      >
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute -right-10 -top-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: 'rgba(52, 211, 153, 0.12)' }}
        />

        <div className="flex items-center justify-between mb-2">
          <span 
            className="text-[10px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5"
            style={{ color: 'var(--color-status-dot)' }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-status-dot)' }} />
            AURA // INITIALIZED
          </span>
          <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
            NODE.01
          </span>
        </div>

        <div className="mt-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {identity.name}
          </h2>
          <p className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-secondary)' }}>
            {identity.title}
          </p>
        </div>

        <p className="text-xs sm:text-sm mt-4 leading-relaxed italic" style={{ color: 'var(--color-text-primary)' }}>
          "{identity.bioQuote}"
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => openApp('projects')}
            className="px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 active:scale-95 text-white"
            style={{
              backgroundColor: 'var(--color-progress-fill)',
              boxShadow: 'var(--color-progress-glow)'
            }}
          >
            <span>Explore My Work</span>
            <ArrowRight size={14} />
          </button>

          <button
            type="button"
            onClick={() => openApp('terminal')}
            className="px-4 py-2 rounded-lg text-xs font-mono border flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 active:scale-95"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)',
              color: 'var(--color-text-primary)'
            }}
          >
            <AppIcon appId="terminal" size={14} />
            <span>Open Terminal</span>
          </button>
        </div>
      </div>

      {/* 2 Sub-Widgets Grid: Dev Status & System Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Developer Status Card */}
        <div 
          className="rounded-xl border p-4 backdrop-blur-md flex flex-col justify-between shadow-md"
          style={{
            backgroundColor: 'var(--color-bg-panel)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              DEV STATUS
            </span>
            <span 
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono border"
              style={{
                backgroundColor: 'rgba(52, 211, 153, 0.1)',
                borderColor: 'rgba(52, 211, 153, 0.25)',
                color: 'var(--color-status-dot)'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-status-dot)' }} />
              ONLINE
            </span>
          </div>

          <div className="my-3">
            <div className="text-xs font-mono font-semibold text-white">
              {identity.status}
            </div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              Focus: {identity.focus}
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-muted)' }}>
            <span>RUNTIME: ARM64</span>
            <span style={{ color: 'var(--color-status-dot)' }}>READY</span>
          </div>
        </div>

        {/* Quick System Info Card */}
        <div 
          className="rounded-xl border p-4 backdrop-blur-md flex flex-col justify-between shadow-md"
          style={{
            backgroundColor: 'var(--color-bg-panel)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
              SYSTEM INFO
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--color-status-dot)' }}>
              EDITION 2025
            </span>
          </div>

          <div className="my-2 space-y-1 text-[11px] font-mono">
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-text-muted)' }}>Core Engine:</span>
              <span className="text-white">{systemInfo.coreEngine}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-text-muted)' }}>Session:</span>
              <span style={{ color: 'var(--color-status-dot)' }}>DEVELOPER_ED</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-text-muted)' }}>Stack Latency:</span>
              <span className="text-white">{systemInfo.latency}</span>
            </div>
          </div>

          <div className="text-[9px] font-mono pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-muted)' }}>
            CLICK APP ICONS TO INSPECT
          </div>
        </div>
      </div>

      {/* Micro Hardware Telemetry Tile */}
      <div 
        className="rounded-xl border p-3 flex items-center justify-between text-[10px] font-mono"
        style={{
          backgroundColor: 'var(--color-btn-default-bg)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)'
        }}
      >
        <div className="flex items-center gap-2">
          <Cpu size={14} style={{ color: 'var(--color-status-dot)' }} />
          <span>NEURAL ACCELERATOR: OPTIMIZED</span>
        </div>
        <span>VRAM 8.4 / 16.0 GB</span>
      </div>
    </div>
  );
}
