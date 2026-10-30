import React from 'react';

export default function BrandLogo({ onClick, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && onClick) onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={!disabled ? onClick : undefined}
      onKeyDown={handleKeyDown}
      className={`mb-8 relative group outline-none select-none ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      }`}
      title="AURA (Click to reboot)"
      aria-label="AURA Logo, click to reboot"
    >
      <div
        className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border flex items-center justify-center brand-glow relative overflow-hidden transition-all duration-300 group-hover:scale-105 backdrop-blur-xl group-focus-visible:ring-2 group-focus-visible:ring-sky-400 p-3.5"
        style={{
          backgroundColor: 'var(--color-bg-panel)',
          borderColor: 'var(--color-border-strong)',
        }}
      >
        <img
          src="/AURA-icon.png"
          alt="AURA Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(56,189,248,0.45)] transition-transform duration-500 group-hover:scale-110 pointer-events-none select-none"
        />

        {/* Top-edge frosted specular sheen */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
