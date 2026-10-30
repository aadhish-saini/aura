import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import { Mail, MapPin, Copy, Check, ExternalLink, Radio } from 'lucide-react';

function GithubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ContactApp() {
  const { identity } = PORTFOLIO_DATA;
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div>
            <span 
              className="text-[10px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--color-status-dot)' }}
            >
              TRANSMISSION CHANNELS
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Direct Contact
            </h3>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              Open to engineering collaborations, AI prototypes, and technical discussions
            </p>
          </div>
          <span 
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono border"
            style={{
              backgroundColor: 'var(--color-badge-bg)',
              borderColor: 'var(--color-btn-accent-border)',
              color: 'var(--color-status-dot)'
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: 'var(--color-status-dot)' }} />
            AVAILABLE
          </span>
        </div>

        {/* Transmission Cards */}
        <div className="space-y-3 font-mono text-xs">
          {/* Email */}
          <div 
            className="p-4 rounded-xl border flex items-center justify-between gap-3"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)'
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: 'var(--color-badge-bg)',
                  borderColor: 'var(--color-btn-accent-border)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted block" style={{ color: 'var(--color-text-muted)' }}>
                  PRIMARY INBOX
                </span>
                <span className="text-white font-medium truncate block">
                  {identity.email}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => copyToClipboard(identity.email, 'email')}
              className="px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all hover:brightness-110 cursor-pointer shrink-0"
              style={{
                backgroundColor: 'var(--color-btn-accent-bg)',
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-text-primary)'
              }}
            >
              {copiedKey === 'email' ? (
                <>
                  <Check size={13} style={{ color: 'var(--color-status-dot)' }} />
                  <span style={{ color: 'var(--color-status-dot)' }}>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* GitHub */}
          <div 
            className="p-4 rounded-xl border flex items-center justify-between gap-3"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)'
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: 'var(--color-badge-bg)',
                  borderColor: 'var(--color-btn-accent-border)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <GithubIcon size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted block" style={{ color: 'var(--color-text-muted)' }}>
                  CODE REPOSITORIES
                </span>
                <span className="text-white font-medium truncate block">
                  github.com/aadhishsaini
                </span>
              </div>
            </div>

            <a
              href={identity.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all hover:brightness-110 cursor-pointer shrink-0"
              style={{
                backgroundColor: 'var(--color-btn-accent-bg)',
                borderColor: 'var(--color-border-subtle)',
                color: 'var(--color-text-primary)'
              }}
            >
              <span>Visit</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Location */}
          <div 
            className="p-4 rounded-xl border flex items-center justify-between gap-3"
            style={{
              backgroundColor: 'var(--color-btn-default-bg)',
              borderColor: 'var(--color-border-default)'
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: 'var(--color-badge-bg)',
                  borderColor: 'var(--color-btn-accent-border)',
                  color: 'var(--color-status-dot)'
                }}
              >
                <MapPin size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-muted block" style={{ color: 'var(--color-text-muted)' }}>
                  STATION LOCATION
                </span>
                <span className="text-white font-medium truncate block">
                  {identity.location}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono" style={{ color: 'var(--color-status-dot)' }}>
              UTC +05:30
            </span>
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
        <span>CHANNEL: SECURE // TLS 1.3</span>
        <span>STATUS: OPEN</span>
      </div>
    </div>
  );
}
