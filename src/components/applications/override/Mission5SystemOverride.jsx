import React, { useState, useEffect } from 'react';
import { Zap, CheckCircle2, AlertTriangle, Award } from 'lucide-react';

export default function Mission5SystemOverride({ onComplete, onFailAttempt }) {
  // All puzzle input fields start completely empty
  const [tokenPort, setTokenPort] = useState('');
  const [tokenCipher, setTokenCipher] = useState('');
  const [tokenGateway, setTokenGateway] = useState('');
  const [tokenHash, setTokenHash] = useState('');

  const [frequency, setFrequency] = useState(400);
  const [phase, setPhase] = useState(60);
  const [isBreached, setIsBreached] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Expected solutions protected inside validation logic only
  const EXPECTED_PORT = '8192';
  const EXPECTED_CIPHER = 'CYBER_SENTINEL';
  const EXPECTED_GATEWAY = '10.0.4.96';
  const EXPECTED_HASH = '0X1AE47F';

  // Calculate waveform synchronization %
  const freqDelta = Math.abs(frequency - 440);
  const phaseDelta = Math.abs(phase - 180);
  const freqScore = Math.max(0, 100 - freqDelta * 2);
  const phaseScore = Math.max(0, 100 - (phaseDelta / 180) * 100);
  const totalSync = Math.round((freqScore * 0.6) + (phaseScore * 0.4));
  const isHarmonicLocked = totalSync >= 92;

  const handleExecuteOverride = () => {
    const cleanHash = tokenHash.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const isTokensValid =
      tokenPort.trim() === EXPECTED_PORT &&
      tokenCipher.trim().toUpperCase() === EXPECTED_CIPHER &&
      tokenGateway.trim() === EXPECTED_GATEWAY &&
      (cleanHash === '0X1AE47F' || cleanHash === '1AE47F');

    if (isTokensValid && isHarmonicLocked) {
      setIsBreached(true);
      setFeedback({
        type: 'success',
        message: '>>> SYSTEM OVERRIDE CONFIRMED: ROOT PRIVILEGES GRANTED <<<'
      });
      setTimeout(() => {
        onComplete();
      }, 2400);
    } else {
      onFailAttempt();
      if (!isTokensValid) {
        setFeedback({
          type: 'error',
          message: 'FAILED: One or more synthesized mission tokens do not match kernel values.'
        });
      } else {
        setFeedback({
          type: 'error',
          message: `FAILED: Harmonic synchronization is only ${totalSync}%. Adjust Frequency and Phase sliders until harmonic lock is reached (92%+).`
        });
      }
    }
  };

  return (
    <div className={`flex-1 p-5 sm:p-7 overflow-y-auto font-sans flex flex-col justify-between relative ${
      isBreached ? 'animate-pulse' : ''
    }`}>
      {/* Glitch & Breach Overlay on Success */}
      {isBreached && (
        <div className="absolute inset-0 z-40 bg-emerald-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center select-none font-mono">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mb-4 shadow-[0_0_40px_#10b981]">
            <Award size={42} className="animate-bounce" />
          </div>
          <span className="text-xs tracking-widest text-emerald-400 font-bold uppercase mb-2">
            SECURITY BARRIER DISSOLVED // ACCESS GRANTED
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            SYSTEM OVERRIDE COMPLETE
          </h1>
          <p className="text-sm text-emerald-200/90 max-w-md font-sans">
            Congratulations, Operator! You bypassed all 5 security protocols and uncovered the hidden gem of AURA.
          </p>
          <span className="text-xs text-emerald-400/80 mt-4 animate-pulse">
            DECRYPTING DEVELOPER ARCHIVE...
          </span>
        </div>
      )}

      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Mission Brief */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-cyan-400">
            <Zap size={14} />
            <span>MISSION 05 // SYSTEM OVERRIDE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Root Privilege Escalation & Master Breach
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-light mt-1">
            Synthesize all 4 mission security tokens and achieve harmonic resonance with the kernel clock to complete the system override.
          </p>
        </div>

        {/* Master Token Matrix */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#070d18] font-mono text-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400 text-[11px]">
            <span>SYNTHESIZED EXPLOIT PAYLOAD:</span>
            <span className="text-cyan-400">TOKENS FROM MISSIONS 1 - 4</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-black/40 rounded-lg border border-white/10">
              <span className="text-slate-500 text-[10px] block mb-1">M1 // HANDSHAKE PORT:</span>
              <input
                type="text"
                value={tokenPort}
                onChange={(e) => setTokenPort(e.target.value)}
                placeholder="Enter access credential (M1 port)..."
                className="w-full bg-transparent text-cyan-300 font-bold focus:outline-none placeholder:text-slate-600 placeholder:font-normal text-xs"
              />
            </div>

            <div className="p-3 bg-black/40 rounded-lg border border-white/10">
              <span className="text-slate-500 text-[10px] block mb-1">M2 // CIPHER PASSPHRASE:</span>
              <input
                type="text"
                value={tokenCipher}
                onChange={(e) => setTokenCipher(e.target.value)}
                placeholder="Type your decoded message (M2 cipher)..."
                className="w-full bg-transparent text-amber-300 font-bold focus:outline-none placeholder:text-slate-600 placeholder:font-normal text-xs uppercase"
              />
            </div>

            <div className="p-3 bg-black/40 rounded-lg border border-white/10">
              <span className="text-slate-500 text-[10px] block mb-1">M3 // GATEWAY IP:</span>
              <input
                type="text"
                value={tokenGateway}
                onChange={(e) => setTokenGateway(e.target.value)}
                placeholder="Enter the node sequence (M3 gateway IP)..."
                className="w-full bg-transparent text-emerald-300 font-bold focus:outline-none placeholder:text-slate-600 placeholder:font-normal text-xs"
              />
            </div>

            <div className="p-3 bg-black/40 rounded-lg border border-white/10">
              <span className="text-slate-500 text-[10px] block mb-1">M4 // PROTOCOL HASH:</span>
              <input
                type="text"
                value={tokenHash}
                onChange={(e) => setTokenHash(e.target.value)}
                placeholder="Submit your deduction (M4 protocol hash)..."
                className="w-full bg-transparent text-purple-300 font-bold focus:outline-none placeholder:text-slate-600 placeholder:font-normal text-xs uppercase"
              />
            </div>
          </div>
        </div>

        {/* Harmonic Waveform Frequency Synthesizer */}
        <div className="p-5 rounded-xl border border-white/10 bg-[#0a1220] space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-slate-300 font-semibold">KERNEL HARMONIC SYNCHRONIZER:</span>
            <span className={`px-2.5 py-0.5 rounded font-bold border ${
              isHarmonicLocked
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_#10b981]'
                : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            }`}>
              {isHarmonicLocked ? 'HARMONIC LOCK REACHED' : `SYNC: ${totalSync}%`}
            </span>
          </div>

          {/* SVG Waveform Visualizer */}
          <div className="w-full h-32 bg-black/60 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 400 120" className="w-full h-full">
              {/* Target Wave (Cyan, static carrier wave representation) */}
              <path
                d="M 0 60 Q 50 10 100 60 T 200 60 T 300 60 T 400 60"
                fill="none"
                stroke="rgba(56, 189, 248, 0.4)"
                strokeWidth="2"
              />
              {/* Tuned Wave (Emerald, dynamic based on frequency and phase) */}
              <path
                d={`M 0 ${60 + Math.sin(phase * Math.PI / 180) * 20} Q ${50 * (440 / frequency)} ${60 - (frequency - 400) * 0.4} ${100 * (440 / frequency)} 60 T ${200 * (440 / frequency)} 60 T ${300 * (440 / frequency)} 60 T 400 60`}
                fill="none"
                stroke={isHarmonicLocked ? '#10b981' : '#f59e0b'}
                strokeWidth="3"
                className="transition-all duration-100"
              />
            </svg>
            <div className="absolute bottom-2 left-3 text-[10px] text-slate-500">
              TARGET: KERNEL CARRIER PROFILE (ALIGN WAVE HARMONICS)
            </div>
          </div>

          {/* Harmonic Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">FREQUENCY:</span>
                <span className="text-cyan-300 font-bold">{frequency} Hz</span>
              </div>
              <input
                type="range"
                min="380"
                max="500"
                value={frequency}
                onChange={(e) => setFrequency(parseInt(e.target.value, 10))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-400">PHASE OFFSET:</span>
                <span className="text-amber-300 font-bold">{phase}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={phase}
                onChange={(e) => setPhase(parseInt(e.target.value, 10))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2 border ${
              feedback.type === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-red-950/40 border-red-500/50 text-red-300'
            }`}
          >
            {feedback.type === 'success' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
            <span>{feedback.message}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleExecuteOverride}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono font-bold text-sm tracking-wider uppercase transition-all bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-300 text-slate-950 hover:opacity-90 shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap size={16} fill="currentColor" />
            <span>EXECUTE SYSTEM OVERRIDE</span>
          </button>
        </div>
      </div>
    </div>
  );
}

