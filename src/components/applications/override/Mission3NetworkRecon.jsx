import React, { useState } from 'react';
import { Network, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Radio, RefreshCw } from 'lucide-react';

const NODES = [
  { id: '10.0.4.12', name: 'Node Alpha (Relay)', x: 60, y: 120, isHoneypot: false, desc: 'Entry hop relay. Clean telemetry.' },
  { id: '10.0.4.19', name: 'Node Zeta (Decoy)', x: 160, y: 50, isHoneypot: true, desc: 'Tripwire alert! IDS honeypot detected.' },
  { id: '10.0.4.24', name: 'Node Beta (Repeater)', x: 180, y: 170, isHoneypot: false, desc: 'Signal amplifier on backbone.' },
  { id: '10.0.4.35', name: 'Node Delta (Trap)', x: 280, y: 60, isHoneypot: true, desc: 'SYN flood sinkhole. Avoid.' },
  { id: '10.0.4.48', name: 'Node Gamma (Router)', x: 300, y: 180, isHoneypot: false, desc: 'Internal multi-layer switch.' },
  { id: '10.0.4.96', name: 'Node Omega (Core Gateway)', x: 420, y: 120, isHoneypot: false, desc: 'TARGET CORE GATEWAY.' },
];

const CORRECT_PATH = ['10.0.4.12', '10.0.4.24', '10.0.4.48', '10.0.4.96'];

export default function Mission3NetworkRecon({ onComplete, onFailAttempt }) {
  const [selectedPath, setSelectedPath] = useState([]);
  const [inspectedNode, setInspectedNode] = useState(NODES[0]);
  const [feedback, setFeedback] = useState(null);
  const [logs, setLogs] = useState([
    '[INIT] Virtual Subnet 10.0.4.0/24 mapped.',
    '[INTEL] Active IDS tripwires are deployed on prime and odd addresses.',
    '[CLUE] Genuine communication channels follow a consistent mathematical progression in the final octet. Beware decoy nodes that break the sequence.',
    'Select nodes sequentially to chart the clean routing tunnel to the Core Gateway.'
  ]);

  const handleNodeClick = (node) => {
    setInspectedNode(node);

    // If node is already in path, don't duplicate
    if (selectedPath.includes(node.id)) {
      return;
    }

    const newPath = [...selectedPath, node.id];
    setSelectedPath(newPath);

    if (node.isHoneypot) {
      setFeedback({
        type: 'error',
        message: `TRIPWIRE ALARM: ${node.id} is an IDS honeypot! Resetting route.`
      });
      onFailAttempt();
      setTimeout(() => {
        setSelectedPath([]);
        setFeedback(null);
      }, 1800);
    }
  };

  const handleResetRoute = () => {
    setSelectedPath([]);
    setFeedback(null);
  };

  const handleVerifyRoute = () => {
    const isExactMatch =
      selectedPath.length === CORRECT_PATH.length &&
      selectedPath.every((ip, idx) => ip === CORRECT_PATH[idx]);

    if (isExactMatch) {
      setFeedback({
        type: 'success',
        message: 'ROUTE ESTABLISHED: Clean tunnel to Core Gateway verified without triggering intrusion monitors!'
      });
      setLogs((prev) => [
        ...prev,
        '>>> ROUTE ACCEPTED: Valid tunnel established.',
        '>>> CORE GATEWAY ISOLATED: 10.0.4.96',
        '>>> ACCESS TOKEN GRANTED: [GATEWAY_IP = 10.0.4.96]'
      ]);
      setTimeout(() => {
        onComplete({ gateway: '10.0.4.96' });
      }, 1400);
    } else {
      onFailAttempt();
      setFeedback({
        type: 'error',
        message: 'FAILED: The routing sequence does not follow a valid hop progression. Check your node sequence and avoid honeypots.'
      });
    }
  };

  return (
    <div className="flex-1 p-5 sm:p-7 overflow-y-auto font-sans flex flex-col justify-between">
      <div className="max-w-3xl mx-auto w-full space-y-6">
        {/* Mission Brief */}
        <div className="pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-cyan-400">
            <Network size={14} />
            <span>MISSION 03 // NETWORK RECONNAISSANCE</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Subnet Mapping & Honeypot Evasion
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-sans font-light mt-1">
            Chart a clean route across subnet 10.0.4.0/24 to reach the Core Gateway (10.0.4.96) without alerting defensive honeypots.
          </p>
        </div>

        {/* Interactive SVG Network Topology Visualizer */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#070d18] relative select-none">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-mono text-slate-400">
            <span>INTERACTIVE TOPOLOGY MAP [10.0.4.0/24]</span>
            <span className="text-cyan-400">CLICK NODES TO TRACE ROUTE</span>
          </div>

          <div className="w-full h-64 bg-black/50 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 480 240" className="w-full h-full">
              {/* Connecting Edges */}
              <line x1="60" y1="120" x2="160" y2="50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="60" y1="120" x2="180" y2="170" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
              <line x1="160" y1="50" x2="280" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="180" y1="170" x2="300" y2="180" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />
              <line x1="280" y1="60" x2="420" y2="120" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1="300" y1="180" x2="420" y2="120" stroke="rgba(56,189,248,0.4)" strokeWidth="2" />

              {/* Active Route Edges */}
              {selectedPath.map((ip, idx) => {
                if (idx === 0) return null;
                const prevNode = NODES.find((n) => n.id === selectedPath[idx - 1]);
                const currNode = NODES.find((n) => n.id === ip);
                if (!prevNode || !currNode) return null;
                return (
                  <line
                    key={ip}
                    x1={prevNode.x}
                    y1={prevNode.y}
                    x2={currNode.x}
                    y2={currNode.y}
                    stroke="#10b981"
                    strokeWidth="3"
                    className="animate-pulse"
                  />
                );
              })}

              {/* Node Circles */}
              {NODES.map((node) => {
                const isSelected = selectedPath.includes(node.id);
                const isInspected = inspectedNode?.id === node.id;
                const isTarget = node.id === '10.0.4.96';

                return (
                  <g
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isTarget ? 18 : 14}
                      fill={
                        isSelected
                          ? '#10b981'
                          : isTarget
                          ? '#38bdf8'
                          : node.isHoneypot
                          ? 'rgba(239, 68, 68, 0.3)'
                          : 'rgba(30, 41, 59, 0.8)'
                      }
                      stroke={
                        isInspected
                          ? '#f59e0b'
                          : isSelected
                          ? '#34d399'
                          : isTarget
                          ? '#38bdf8'
                          : 'rgba(255,255,255,0.3)'
                      }
                      strokeWidth={isInspected ? 3 : 2}
                    />
                    <text
                      x={node.x}
                      y={node.y + 26}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {node.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Route Inspector */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#0a1220] font-mono text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-semibold">ACTIVE ROUTING HOPS:</span>
            <button
              type="button"
              onClick={handleResetRoute}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <RefreshCw size={11} />
              <span>Reset Route</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 min-h-[32px]">
            {selectedPath.length === 0 ? (
              <span className="text-slate-500 italic text-[11px]">
                Enter the node sequence (click nodes on map above)...
              </span>
            ) : (
              selectedPath.map((ip, idx) => (
                <React.Fragment key={ip}>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold">
                    {ip}
                  </span>
                  {idx < selectedPath.length - 1 && <span className="text-slate-500">→</span>}
                </React.Fragment>
              ))
            )}
          </div>

          {inspectedNode && (
            <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[11px] text-slate-300">
              <span className="text-amber-400 font-bold block mb-0.5">INSPECTED NODE: {inspectedNode.id} ({inspectedNode.name})</span>
              <span>{inspectedNode.desc}</span>
            </div>
          )}

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
              onClick={handleVerifyRoute}
              className="px-6 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>LOCK ROUTE TUNNEL</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

