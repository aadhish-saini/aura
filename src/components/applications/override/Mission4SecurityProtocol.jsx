import React, { useState } from 'react';
import { Cpu, ShieldCheck, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';

const MATRIX = [
  ['1C', '7A', 'E4', '9F'],
  ['5B', '1A', '3D', '82'],
  ['7F', '4C', 'D1', '6E'],
  ['A3', 'E4', '2B', '1A'],
];

const TARGET_SEQUENCE = ['1A', 'E4', '7F'];

export default function Mission4SecurityProtocol({ onComplete, onFailAttempt }) {
  const [buffer, setBuffer] = useState([]);
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleCellClick = (val) => {
    if (buffer.length >= 4) return;
    setBuffer((prev) => [...prev, val]);
  };

  const handleClearBuffer = () => {
    setBuffer([]);
    setFeedback(null);
  };

  const handleVerify = () => {
    // Check if target sequence is in buffer sequentially
    const bufferStr = buffer.join(',');
    const targetStr = TARGET_SEQUENCE.join(',');
    const isBufferValid = bufferStr.includes(targetStr);

    // Logic gate condition: Switch A XOR Switch B must be true (one true, one false)
    const isLogicValid = (switchA && !switchB) || (!switchA && switchB);

    if (isBufferValid && isLogicValid) {
      setFeedback({
        type: 'success',
        message: 'PROTOCOL ALIGNED: Hex buffer sequence matched and logic gate parity validated!'
      });
      setTimeout(() => {
        onComplete({ hash: '0x1AE47F' });
      }, 1400);
    } else {
      onFailAttempt();
      if (!isBufferValid && !isLogicValid) {
        setFeedback({
          type: 'error',
          message: 'FAILED: Both the memory buffer sequence and XOR logic parity are unfulfilled.'
        });
      } else if (!isBufferValid) {
        setFeedback({
          type: 'error',
          message: 'FAILED: Target sequence not matched in buffer in correct order. Clear and re-select.'
        });
      } else {
        setFeedback({
          type: 'error',
          message: 'FAILED: Buffer matches, but XOR logic gate parity is unfulfilled. Adjust gate switches.'
        });
      }
    }
  };

  return (
    <div className="flex-1 p-5 sm:p-7 overflow-y-auto font-sans flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Mission Brief */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-cyan-400">
            <Cpu size={14} />
            <span>MISSION 04 // SECURITY PROTOCOL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Memory Hex Buffer & Logic Gate Alignment
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-light mt-1">
            Load the target hex sequence into the supervisor buffer and configure the logic gate parity to override memory protection.
          </p>
        </div>

        {/* Target Sequence and Buffer Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl border border-white/10 bg-[#070d18]">
            <span className="text-slate-400 block mb-2 text-[11px]">REQUIRED SEQUENCE:</span>
            <div className="flex items-center gap-2">
              {TARGET_SEQUENCE.map((byte, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-bold text-sm"
                >
                  {byte}
                </span>
              ))}
            </div>
            <span className="text-slate-500 text-[10px] mt-2 block">
              Match: 1A → E4 → 7F into buffer slots
            </span>
          </div>

          <div className="p-4 rounded-xl border border-white/10 bg-[#070d18]">
            <div className="flex items-center justify-between mb-2 text-[11px]">
              <span className="text-slate-400">ACTIVE BUFFER ({buffer.length}/4 SLOTS):</span>
              <button
                type="button"
                onClick={handleClearBuffer}
                className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw size={11} />
                <span>Clear</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3].map((slotIdx) => (
                <span
                  key={slotIdx}
                  className={`w-12 h-9 rounded flex items-center justify-center font-bold text-sm border ${
                    buffer[slotIdx]
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                      : 'bg-black/40 border-white/10 text-slate-600'
                  }`}
                >
                  {buffer[slotIdx] || '--'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 4x4 Hex Memory Matrix */}
        <div className="p-5 rounded-xl border border-white/10 bg-[#0a1220] select-none">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-xs font-mono text-slate-400">
            <span>HEX MEMORY DUMP [4x4 ADDRESS MATRIX]</span>
            <span className="text-cyan-400">CLICK BYTES TO LOAD BUFFER</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
            {MATRIX.map((row, rIdx) =>
              row.map((cell, cIdx) => (
                <button
                  key={`${rIdx}-${cIdx}`}
                  type="button"
                  onClick={() => handleCellClick(cell)}
                  disabled={buffer.length >= 4}
                  className="h-12 rounded-lg font-mono font-bold text-sm transition-all cursor-pointer border bg-black/50 border-white/10 text-slate-200 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-sm"
                >
                  {cell}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Logic Gate Parity Switches */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#070d18] font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>LOGIC PARITY MONITOR // XOR GATE</span>
            <span className={`px-2 py-0.5 rounded border ${
              (switchA && !switchB) || (!switchA && switchB)
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-red-500/20 border-red-500/40 text-red-300'
            }`}>
              {(switchA && !switchB) || (!switchA && switchB) ? 'PARITY TRUE' : 'PARITY FALSE'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setSwitchA((prev) => !prev)}
              className="p-3 rounded-lg border border-white/10 bg-black/40 flex items-center justify-between text-slate-200 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <span>GATE SWITCH ALPHA:</span>
              <span className={switchA ? 'text-emerald-400 font-bold' : 'text-slate-500 font-bold'}>
                {switchA ? '[1 / HIGH]' : '[0 / LOW]'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSwitchB((prev) => !prev)}
              className="p-3 rounded-lg border border-white/10 bg-black/40 flex items-center justify-between text-slate-200 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <span>GATE SWITCH BETA:</span>
              <span className={switchB ? 'text-emerald-400 font-bold' : 'text-slate-500 font-bold'}>
                {switchB ? '[1 / HIGH]' : '[0 / LOW]'}
              </span>
            </button>
          </div>
          <span className="text-[10px] text-slate-500 block">
            Rule: Configure Gate Alpha and Gate Beta to satisfy the XOR parity condition.
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
            type="button"
            onClick={handleVerify}
            className="px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>ASSERT PROTOCOL</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

