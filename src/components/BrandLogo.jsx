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
      title="AURA Kernel (Click to reboot)"
      aria-label="AURA Kernel logo, click to reboot"
    >
      <div
        className="w-24 h-24 md:w-28 md:h-28 rounded-2xl border flex items-center justify-center brand-glow relative overflow-hidden transition-all duration-300 group-hover:scale-105 backdrop-blur-xl group-focus-visible:ring-2 group-focus-visible:ring-emerald-400"
        style={{
          backgroundColor: 'var(--color-bg-panel)',
          borderColor: 'var(--color-border-strong)',
        }}
      >
        {/* Geometric Modern Quad-Pane / Monogram Emblem */}
        <svg
          className="w-14 h-14 md:w-16 md:h-16 transition-transform duration-500 group-hover:rotate-1"
          fill="none"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="tileGrad1" x1="6" x2="30" y1="6" y2="30">
              <stop stopColor="#abf2c6" />
              <stop offset="1" stopColor="#256a48" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="tileGrad2" x1="34" x2="58" y1="6" y2="30">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#90d5ac" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="tileGrad3" x1="6" x2="30" y1="34" y2="58">
              <stop stopColor="#256a48" />
              <stop offset="1" stopColor="#143c28" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="tileGrad4" x1="34" x2="58" y1="34" y2="58">
              <stop stopColor="#abf2c6" />
              <stop offset="1" stopColor="#256a48" />
            </linearGradient>
          </defs>

          {/* 4 Modern Angled Quadrants mimicking Windows Modern Fluency + Angular 'A' Monogram */}
          <path
            d="M7 9C7 7.89543 7.89543 7 9 7H28C29.1046 7 30 7.89543 30 9V28C30 29.1046 29.1046 30 28 30H9C7.89543 30 7 29.1046 7 28V9Z"
            fill="url(#tileGrad1)"
            fillOpacity="0.95"
          />
          <path
            d="M34 9C34 7.89543 34.8954 7 36 7H55C56.1046 7 57 7.89543 57 9V28C57 29.1046 56.1046 30 55 30H36C34.8954 30 34 29.1046 34 28V9Z"
            fill="url(#tileGrad2)"
            fillOpacity="0.85"
          />
          <path
            d="M7 36C7 34.8954 7.89543 34 9 34H28C29.1046 34 30 34.8954 30 36V55C30 56.1046 29.1046 57 28 57H9C7.89543 57 7 56.1046 7 55V36Z"
            fill="url(#tileGrad3)"
            fillOpacity="0.9"
          />
          <path
            d="M34 36C34 34.8954 34.8954 34 36 34H55C56.1046 34 57 34.8954 57 36V55C57 56.1046 56.1046 57 55 57H36C34.8954 57 34 56.1046 34 55V36Z"
            fill="url(#tileGrad4)"
            fillOpacity="0.95"
          />

          {/* Center Monogram "A" Core Inset */}
          <path
            d="M32 17L22 47H27.5L29.5 41.5H34.5L36.5 47H42L32 17ZM30.8 37L32 30.5L33.2 37H30.8Z"
            fill="#000000"
            fillOpacity="0.88"
          />
          <circle cx="32" cy="34" fill="#abf2c6" r="1.8" />
        </svg>

        {/* Top-edge frosted specular sheen */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
