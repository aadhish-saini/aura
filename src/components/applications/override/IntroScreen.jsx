import React from 'react';
import { Gamepad2, ShieldAlert, Sparkles, Terminal, ChevronRight, Play } from 'lucide-react';

export default function IntroScreen({ onStart }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 text-center select-none overflow-y-auto font-sans relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        {/* Top classified badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 mb-6 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
          <Gamepad2 size={14} className="text-cyan-400" />
          <span className="font-semibold tracking-wider uppercase">SECRET CLASSIFIED PROTOCOL</span>
          <span className="text-white/30">•</span>
          <span>EASTER EGG #01</span>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2 uppercase font-mono">
          AURA: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-sky-300">SYSTEM OVERRIDE</span>
        </h1>

        <p className="text-lg sm:text-xl font-serif italic text-cyan-200/90 font-light mb-8">
          "The Hidden Gem."
        </p>

        {/* Personal Message Card */}
        <div
          className="p-6 sm:p-7 rounded-2xl border text-left mb-8 backdrop-blur-xl relative"
          style={{
            backgroundColor: 'rgba(10, 16, 28, 0.85)',
            borderColor: 'rgba(56, 189, 248, 0.25)',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
          }}
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 text-xs font-mono text-cyan-300/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TRANSMISSION // FROM DEVELOPER: AADHISH SAINI</span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans font-light">
            <p>
              "Okay, I admit it. I love playing games as much as I love building things.
            </p>
            <p>
              Somehow, I managed to build an entire operating system and forgot to include a game in it.
            </p>
            <p>
              Can't let that happen, can I?
            </p>
            <p>
              So here's a little surprise. A hidden challenge for those curious enough to find it."
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-xs sm:text-sm font-mono text-cyan-300/90 italic font-normal">
            "No shortcuts. No obvious instructions. Just you, the system and your curiosity."
          </div>
        </div>

        {/* Initiate Operation Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono font-bold text-sm tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2 text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] active:scale-95"
          >
            <Play size={16} fill="currentColor" />
            <span>INITIATE OPERATION</span>
          </button>
        </div>

        <p className="text-[11px] font-mono text-slate-500 mt-4">
          5 MISSIONS // REAL CYBERSECURITY PUZZLES // SYSTEM ROOT REWARD
        </p>
      </div>
    </div>
  );
}

