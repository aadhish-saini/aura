import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function WelcomeOverlay({ isVisible, onEnterWorkspace }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleEnter = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Provide a brief loading state before triggering the workspace transition callback
    setTimeout(() => {
      if (onEnterWorkspace) {
        onEnterWorkspace();
      }
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-700 ${
        isVisible
          ? 'opacity-100 pointer-events-auto scale-100'
          : 'opacity-0 pointer-events-none scale-95'
      }`}
      style={{
        backgroundColor: 'var(--welcome-overlay-bg)',
      }}
      aria-hidden={!isVisible}
    >
      <div className="flex flex-col items-center text-center p-8 max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
        {/* User / Dev Avatar */}
        <div
          className="w-20 h-20 rounded-full p-1 flex items-center justify-center mb-5 border transition-all duration-500"
          style={{
            borderColor: 'var(--welcome-avatar-border)',
            boxShadow: 'var(--welcome-avatar-glow)',
          }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center font-bold text-2xl font-mono shadow-inner"
            style={{
              background: `linear-gradient(135deg, var(--welcome-avatar-from), var(--welcome-avatar-to))`,
              color: 'var(--welcome-avatar-text)',
            }}
          >
            A
          </div>
        </div>

        {/* Heading */}
        <h2
          className="text-2xl md:text-3xl font-light tracking-wide mb-2 transition-colors duration-300"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Welcome, Aadhish
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm mb-6 font-mono tracking-wide transition-colors duration-300"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          AURA Workspace is Ready
        </p>

        {/* Launch Action Button */}
        <button
          type="button"
          onClick={handleEnter}
          disabled={isOpening}
          className="px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-all duration-200 shadow-lg flex items-center gap-2 cursor-pointer hover:brightness-110 active:scale-95 disabled:opacity-80 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--welcome-btn-bg)',
            boxShadow: 'var(--welcome-btn-shadow)',
          }}
          aria-label="Enter Developer Workspace"
        >
          {isOpening ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              <span>OPENING WORKSPACE...</span>
            </>
          ) : (
            <>
              <span>ENTER WORKSPACE</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* Session Telemetry */}
        <span
          className="text-[11px] font-mono mt-4 select-none"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Session: Host // 127.0.0.1:8080
        </span>
      </div>
    </div>
  );
}
