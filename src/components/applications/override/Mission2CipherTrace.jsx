import React, { useState } from 'react';
import { KeyRound, ShieldCheck, AlertTriangle, ArrowRight, CornerDownLeft, Sliders } from 'lucide-react';

const CIPHERTEXT = 'GCFIV_WIRXMRIP';
const EXPECTED_KEY = 'CYBER_SENTINEL';

function applyCaesarShift(text, shift) {
  return text.replace(/[A-Z]/g, (char) => {
    const code = char.charCodeAt(0) - 65;
    const shifted = (code + shift + 26) % 26;
    return String.fromCharCode(shifted + 65);
  });
}

export default function Mission2CipherTrace({ onComplete, onFailAttempt }) {
  const [shiftOffset, setShiftOffset] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [cliLogs, setCliLogs] = useState([
    '[INIT] Security daemon broadcast intercepted on internal bus.',
    `[CIPHERTEXT] ${CIPHERTEXT}`,
    '[INTEL] Cipher mode: Monolithic Caesar Rotation.',
    '[CLUE] The shift offset is derived from the letter count of the host OS.',
    'Use the Shift Decryption slider or CLI below to decipher the payload.'
  ]);

  const liveDecryptedPreview = applyCaesarShift(CIPHERTEXT, shiftOffset);

  const handleVerify = (candidate) => {
    const normalized = candidate.trim().toUpperCase();
    if (normalized === EXPECTED_KEY) {
      setFeedback({
        type: 'success',
        message: 'CIPHER DECRYPTED: CYBER_SENTINEL verified. Security daemon bypassed!'
      });
      setCliLogs((prev) => [
        ...prev,
        `>>> DECRYPTION CONFIRMED: ${EXPECTED_KEY}`,
        '>>> ROTATION KEY: -4 (Host letters: A-U-R-A = 4)',
        '>>> ACCESS TOKEN GRANTED: [CIPHER_KEY = CYBER_SENTINEL]'
      ]);
      setTimeout(() => {
        onComplete({ cipher: EXPECTED_KEY });
      }, 1400);
    } else {
      onFailAttempt();
      setFeedback({
        type: 'error',
        message: `FAILED: "${candidate}" is incorrect. Try adjusting the shift slider until readable English words appear.`
      });
    }
  };

  const handleApplyPreview = () => {
    setInputVal(liveDecryptedPreview);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleVerify(inputVal);
  };

  return (
    <div className="flex-1 p-5 sm:p-7 overflow-y-auto font-sans flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Mission Brief */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-cyan-400">
            <KeyRound size={14} />
            <span>MISSION 02 // CRYPTOGRAPHIC TRACE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Cipher Trace & Daemon Decryption
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-light mt-1">
            An encrypted message was broadcast across the system bus. Discover the rotational offset to reverse the cipher.
          </p>
        </div>

        {/* Intercepted Cipher Display */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#070d18] font-mono text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-400 text-[11px]">
            <span>INTERCEPTED ENCRYPTED STRING:</span>
            <span className="text-amber-400">ROT-N SUBSTITUTION</span>
          </div>
          <div className="text-center py-4 bg-black/60 rounded-lg border border-white/5 tracking-[0.3em] text-lg sm:text-xl font-bold text-amber-300 select-all">
            {CIPHERTEXT}
          </div>
        </div>

        {/* Interactive Real-Time Rotational Slider Tool */}
        <div className="p-5 rounded-xl border border-white/10 bg-[#0a1220] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold text-slate-200 flex items-center gap-1.5">
              <Sliders size={13} className="text-cyan-400" />
              <span>DYNAMIC DECRYPTION TUNER:</span>
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              SHIFT: {shiftOffset > 0 ? `+${shiftOffset}` : shiftOffset}
            </span>
          </div>

          <div className="space-y-1">
            <input
              type="range"
              min="-12"
              max="12"
              value={shiftOffset}
              onChange={(e) => setShiftOffset(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>-12 (Left)</span>
              <span>0 (Original)</span>
              <span>+12 (Right)</span>
            </div>
          </div>

          <div className="p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">LIVE DECRYPTED PREVIEW:</span>
              <span className="text-emerald-400 font-bold tracking-widest text-sm">
                {liveDecryptedPreview}
              </span>
            </div>
            <button
              type="button"
              onClick={handleApplyPreview}
              className="px-3 py-1.5 rounded text-[11px] font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10 transition-colors cursor-pointer"
            >
              Insert into Input
            </button>
          </div>
        </div>

        {/* Verification Form */}
        <form onSubmit={handleFormSubmit} className="p-5 rounded-xl border border-white/10 bg-[#0a1220] space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
              SUBMIT DECRYPTED PASSPHRASE:
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type your decoded message..."
              className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white font-mono text-sm tracking-wider uppercase focus:outline-none focus:border-cyan-400"
            />
            <span className="text-[10px] text-slate-500 font-mono mt-1 block">
              Enter the plaintext message obtained by reversing the Caesar shift rotation.
            </span>
          </div>

          {feedback && (
            <div
              className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2 border ${
                feedback.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-red-950/40 border-red-500/50 text-red-300'
              }`}
            >
              {feedback.type === 'success' ? <ShieldCheck size={15} /> : <AlertTriangle size={15} />}
              <span>{feedback.message}</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>AUTHENTICATE PASSPHRASE</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

