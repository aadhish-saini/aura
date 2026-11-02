import React from 'react';
import './SnapPreview.css';

export default function SnapPreview({ rect }) {
  if (!rect) return null;

  return (
    <div
      className="aura-snap-preview fixed z-40 pointer-events-none rounded-xl border-2 transition-all duration-150 animate-in fade-in zoom-in-95 backdrop-blur-sm"
      style={{
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        backgroundColor: 'rgba(56, 189, 248, 0.08)',
        borderColor: 'rgba(56, 189, 248, 0.6)',
        boxShadow: '0 0 25px rgba(56, 189, 248, 0.25), inset 0 0 20px rgba(56, 189, 248, 0.1)'
      }}
    />
  );
}

