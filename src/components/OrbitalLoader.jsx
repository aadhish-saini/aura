import React from 'react';

export default function OrbitalLoader() {
  return (
    <div className="my-3 flex flex-col items-center justify-center">
      <div 
        aria-label="Loading AURA system" 
        role="status" 
        className="win-loader-container"
      >
        <div className="win-dot" />
        <div className="win-dot" />
        <div className="win-dot" />
        <div className="win-dot" />
        <div className="win-dot" />
      </div>
    </div>
  );
}
