import React, { useState } from 'react';
import { Terminal, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, CornerDownLeft } from 'lucide-react';

export default function Mission1InitialAccess({ onComplete, onFailAttempt }) {
  const [portInput, setPortInput] = useState('');
  const [parityInput, setParityInput] = useState('');
  const [cliInput, setCliInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [cliLogs, setCliLogs] = useState([
    '[INIT] Defensive firewall active. Direct connections to port 80/443 dropped.',
    '[LOG] Port knocking sequence logged in recent inbound packet headers:',
    '      HOP 01: PORT 1024 [ACK: 0x10]',
    '      HOP 02: PORT 2048 [ACK: 0x20]',
    '      HOP 03: PORT 4096 [ACK: 0x40]',
    '      HOP 04: PORT [ ???? ] [SYN]',
    '[LOG] Handshake parity challenge bitmask: 00101010_2',
    'Type command (e.g. \'scan\', \'knock <port>\', \'auth <value>\') or submit fields below.'
  ]);

  const handleVerify = (portVal, parityVal) => {
    const p = String(portVal).trim();
    const parity = String(parityVal).trim().toLowerCase();

    const isPortCorrect = p === '8192';
    const isParityCorrect = parity === '42' || parity === '0x2a';

    if (isPortCorrect && isParityCorrect) {
      setFeedback({
        type: 'success',
        message: 'HANDSHAKE VERIFIED: Target port and parity validated. Initial breach achieved!'
      });
      setCliLogs((prev) => [
        ...prev,
        '>>> HANDSHAKE SUCCESSFUL: Port responded with SYN-ACK.',
        '>>> PARITY BITMASK VALIDATED.',
        '>>> ACCESS TOKEN GRANTED: [HANDSHAKE_PORT = 8192].'
      ]);
      setTimeout(() => {
        onComplete({ port: 8192 });
      }, 1400);
    } else {
      onFailAttempt();
      if (!isPortCorrect && !isParityCorrect) {
        setFeedback({
          type: 'error',
          message: 'FAILED: Both the target port and parity credential are incorrect.'
        });
      } else if (!isPortCorrect) {
        setFeedback({
          type: 'error',
          message: 'FAILED: Target port sequence is incorrect. Check the geometric progression.'
        });
      } else {
        setFeedback({
          type: 'error',
          message: 'FAILED: Parity credential is incorrect. Verify your binary conversion.'
        });
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleVerify(portInput, parityInput);
  };

  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    setCliLogs((prev) => [...prev, `guest@firewall:~$ ${cliInput}`]);
    setCliInput('');

    if (cmd === 'scan') {
      setCliLogs((prev) => [
        ...prev,
        'SCAN RESULTS: Firewall detects sequential multiplier on port knocking filter.',
        'Multiplier formula: Port[n] = Port[n-1] * 2',
        '1024 * 2 = 2048; 2048 * 2 = 4096; 4096 * 2 = ???'
      ]);
    } else if (cmd.startsWith('knock ')) {
      const port = cmd.replace('knock ', '').trim();
      setPortInput(port);
      if (port === '8192') {
        setCliLogs((prev) => [...prev, `[ACK] Port ${port} acknowledged. Awaiting parity authentication (00101010_2).`]);
      } else {
        setCliLogs((prev) => [...prev, `[RST] Port ${port} rejected. Connection reset by peer.`]);
      }
    } else if (cmd.startsWith('auth ')) {
      const val = cmd.replace('auth ', '').trim();
      setParityInput(val);
      setCliLogs((prev) => [...prev, `[INFO] Parity set to ${val}. Now submit or run 'verify'.`]);
    } else if (cmd === 'verify' || cmd === 'submit') {
      handleVerify(portInput, parityInput);
    } else if (cmd === 'help') {
      setCliLogs((prev) => [
        ...prev,
        'Commands:',
        '  scan         - Analyze port interval filter',
        '  knock <port> - Send SYN probe to specified port',
        '  auth <val>   - Set parity auth value',
        '  verify       - Validate current port & parity parameters'
      ]);
    } else {
      setCliLogs((prev) => [...prev, `Unknown instruction '${cmd}'. Type 'help' for guidance.`]);
    }
  };

  return (
    <div className="flex-1 p-5 sm:p-7 overflow-y-auto font-sans flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Mission Brief */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-cyan-400">
            <ShieldAlert size={14} />
            <span>MISSION 01 // HANDSHAKE SEQUENCE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Initial Access & Port Knocking
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-light mt-1">
            The firewall blocks standard entry. Observe the logged port progression and the binary bitmask to synthesize the authentication payload.
          </p>
        </div>

        {/* Packet Stream Hex Visualizer */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#070d18] font-mono text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-slate-400 text-[11px]">
            <span>RAW PACKET STREAM [INTERCEPTED]</span>
            <span className="text-emerald-400">LIVE FEED // UNENCRYPTED HEADER</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="bg-black/40 p-2 rounded border border-white/5">
              <span className="text-slate-500 block text-[10px]">MAGIC BYTES:</span>
              <span className="text-cyan-300">0x41 0x55 0x52 0x41</span>
              <span className="text-slate-500 block text-[9px] mt-0.5">ASCII: "AURA"</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-white/5">
              <span className="text-slate-500 block text-[10px]">HOP SEQUENCE:</span>
              <span className="text-amber-300">1024 → 2048 → 4096</span>
              <span className="text-slate-500 block text-[9px] mt-0.5">PATTERN: 2^n</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-white/5">
              <span className="text-slate-500 block text-[10px]">BITMASK PARITY:</span>
              <span className="text-purple-300">00101010</span>
              <span className="text-slate-500 block text-[9px] mt-0.5">FORMAT: BASE-2</span>
            </div>
            <div className="bg-black/40 p-2 rounded border border-white/5">
              <span className="text-slate-500 block text-[10px]">STATUS:</span>
              <span className="text-red-400 font-bold">LOCKED // AWAITING 4TH</span>
              <span className="text-slate-500 block text-[9px] mt-0.5">FILTER: DROP</span>
            </div>
          </div>
        </div>

        {/* Simulated CLI Terminal */}
        <div className="rounded-xl border border-white/10 bg-black/80 font-mono text-xs overflow-hidden shadow-inner">
          <div className="px-3 py-1.5 bg-slate-900/80 border-b border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span>probe-session@aura_firewall:~</span>
            <span>CLI CONSOLE</span>
          </div>
          <div className="p-3.5 space-y-1 max-h-44 overflow-y-auto text-slate-300">
            {cliLogs.map((log, idx) => (
              <div key={idx} className="leading-relaxed font-mono text-[11px]">
                {log}
              </div>
            ))}
          </div>
          <form onSubmit={handleCliSubmit} className="p-2 border-t border-white/10 bg-slate-950 flex items-center gap-2">
            <span className="text-cyan-400 text-xs pl-2">$</span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              placeholder="type 'scan', 'knock <port>', or 'help'..."
              className="flex-1 bg-transparent border-0 text-white text-xs font-mono focus:outline-none"
            />
            <button type="submit" className="text-slate-400 hover:text-white px-2 py-1 text-xs">
              <CornerDownLeft size={13} />
            </button>
          </form>
        </div>

        {/* Input Authentication Form */}
        <form onSubmit={handleFormSubmit} className="p-5 rounded-xl border border-white/10 bg-[#0a1220] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                TARGET PORT (4TH HOP):
              </label>
              <input
                type="text"
                value={portInput}
                onChange={(e) => setPortInput(e.target.value)}
                placeholder="Enter the missing number..."
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Sequence: 1024, 2048, 4096, ?
              </span>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5 font-semibold">
                PARITY VALUE (DECIMAL OF 00101010):
              </label>
              <input
                type="text"
                value={parityInput}
                onChange={(e) => setParityInput(e.target.value)}
                placeholder="Enter access credential..."
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-cyan-400"
              />
              <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                Convert binary 00101010_2 to decimal value
              </span>
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
              type="submit"
              className="px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>TRANSMIT HANDSHAKE</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

