import React, { useEffect, useState } from 'react';
import BrandLogo from '../BrandLogo';
import { Sun, Power } from 'lucide-react';
import './SleepScreen.css';

export default function SleepScreen({ onWake }) {
  const [timeStr, setTimeStr] = useState('');

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Listen to keyboard press to wake system
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Any key wakes system
      e.preventDefault();
      onWake();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onWake]);

  return (
    <div
      className="sleep-screen fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-black text-white select-none animate-in fade-in duration-700"
      onClick={onWake}
    >
      {/* Top Telemetry */}
      <div className="w-full flex justify-between items-center text-xs font-mono opacity-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>AURA // SLEEP MODE (STANDBY)</span>
        </div>
        <div>
          <span>STATE PRESERVED IN RAM</span>
        </div>
      </div>

      {/* Center Sleep Hub */}
      <div className="flex flex-col items-center text-center max-w-sm mx-auto" onClick={(e) => e.stopPropagation()}>
        {/* Pulsing Brandmark */}
        <div className="sleep-logo-pulse mb-6">
          <BrandLogo disabled={true} />
        </div>

        <div className="text-4xl md:text-5xl font-mono font-light tracking-tight text-white/90 mb-2">
          {timeStr || '12:00'}
        </div>

        <h2 className="text-lg font-mono font-medium tracking-wider text-sky-400 mb-1">
          SYSTEM ASLEEP
        </h2>

        <p className="text-xs font-mono text-neutral-400 mb-8 tracking-wide">
          All workspace windows and processes remain preserved.
        </p>

        {/* Wake Action Button */}
        <button
          type="button"
          onClick={onWake}
          className="wake-system-btn px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white font-mono text-xs font-semibold tracking-wider flex items-center gap-2.5 transition-all shadow-xl cursor-pointer"
        >
          <Sun size={15} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>WAKE SYSTEM</span>
        </button>

        <span className="text-[10px] font-mono text-neutral-500 mt-4">
          Press any key or click to resume
        </span>
      </div>

      {/* Bottom Status */}
      <div className="w-full flex justify-between items-center text-[11px] font-mono text-neutral-600">
        <span>SESSION: LOCALHOST</span>
        <span>AURA RUNTIME</span>
      </div>
    </div>
  );
}
