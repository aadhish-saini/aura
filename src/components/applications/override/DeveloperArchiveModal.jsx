import React, { useState } from 'react';
import { Award, Gamepad2, Copy, Check, X } from 'lucide-react';

export default function DeveloperArchiveModal({ score, attempts, onClose, onReplay }) {
  const [copied, setCopied] = useState(false);

  const completionHash = `AURA-ROOT-${btoa(`aadhish-operator-${score}-${attempts}`).slice(0, 16)}`;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(completionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="max-w-2xl w-full p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-2xl relative font-sans text-left my-8"
        style={{
          backgroundColor: 'rgba(10, 16, 28, 0.98)',
          borderColor: 'rgba(16, 185, 129, 0.4)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px rgba(16, 185, 129, 0.25)',
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Award size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-400">
                  CLASSIFIED // CLEARANCE LEVEL 05
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[10px] font-mono text-cyan-300">MASTER OPERATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Developer Archive Unlocked
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Developer Note */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans font-light mb-6">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-cyan-300/90 leading-relaxed">
            "You actually beat all 5 protocols! Most visitors browse a portfolio for 30 seconds and leave. You took the time to investigate, decode the ciphers, and break through the firewall. That level of curiosity is rare — and honestly, that's why I built this."
          </div>

          <p>
            When I designed AURA, I wanted it to feel like an authentic developer workstation. But midway through writing the UEFI boot sequence and desktop window compositor, I had a sudden realization:
          </p>

          <p className="italic text-slate-300">
            "I love gaming so much, how on earth did I build an entire OS without a game?"
          </p>

          <p>
            Instead of adding a generic mini-game, I wanted something that combined real cybersecurity principles — port knocking, Caesar ciphers, subnet mapping, memory hex buffers, and harmonic synchronization.
          </p>
        </div>

        {/* Gaming Passion Section */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#070d18] font-mono text-xs space-y-3 mb-6">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-[11px]">
            <Gamepad2 size={14} />
            <span>AADHISH'S GAMING DOSSIER:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="bg-black/50 p-2.5 rounded border border-white/5">
              <span className="text-slate-500 block text-[9px]">FAVORITE RPG:</span>
              <span className="text-white font-bold">Cyberpunk 2077</span>
              <span className="text-slate-400 block text-[9px] mt-0.5">Breach Protocol fan</span>
            </div>
            <div className="bg-black/50 p-2.5 rounded border border-white/5">
              <span className="text-slate-500 block text-[9px]">FAVORITE SOULSLIKE:</span>
              <span className="text-white font-bold">Elden Ring</span>
              <span className="text-slate-400 block text-[9px] mt-0.5">Tarnished mindset</span>
            </div>
            <div className="bg-black/50 p-2.5 rounded border border-white/5">
              <span className="text-slate-500 block text-[9px]">COMPETITIVE FPS:</span>
              <span className="text-white font-bold">Valorant</span>
              <span className="text-slate-400 block text-[9px] mt-0.5">Tactical coordination</span>
            </div>
            <div className="bg-black/50 p-2.5 rounded border border-white/5">
              <span className="text-slate-500 block text-[9px]">PUZZLE MASTER:</span>
              <span className="text-white font-bold">Portal 2</span>
              <span className="text-slate-400 block text-[9px] mt-0.5">Spatial deduction</span>
            </div>
          </div>
        </div>

        {/* Completion Hash & Stats */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#070d18] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs mb-6">
          <div>
            <span className="text-slate-500 text-[10px] block">OPERATOR VERIFICATION HASH:</span>
            <span className="text-emerald-400 font-bold select-all tracking-wider">
              {completionHash}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyHash}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? 'Hash Copied!' : 'Copy Hash'}</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={onReplay}
            className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
          >
            Replay Missions
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
          >
            Close & Return to Desktop
          </button>
        </div>
      </div>
    </div>
  );
}

