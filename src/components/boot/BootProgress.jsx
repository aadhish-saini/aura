import React from 'react';

export default function BootProgress({ progress }) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-64 max-w-xs mt-3 flex flex-col items-center">
      {/* Outer track */}
      <div 
        className="w-full h-1 rounded-full overflow-hidden border"
        style={{
          backgroundColor: 'var(--color-progress-track)',
          borderColor: 'var(--color-progress-track-border)',
        }}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {/* Progress fill */}
        <div
          className="h-full transition-all duration-200 ease-out rounded-full"
          style={{
            width: `${clampedProgress}%`,
            backgroundColor: 'var(--color-progress-fill)',
            boxShadow: 'var(--color-progress-glow)',
          }}
        />
      </div>

      {/* Labels */}
      <div 
        className="w-full flex justify-between items-center text-[10px] font-mono mt-1.5 px-0.5"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <span>PROGRESS</span>
        <span 
          className="font-semibold"
          style={{ color: 'var(--color-text-substatus)' }}
        >
          {clampedProgress}%
        </span>
      </div>
    </div>
  );
}
