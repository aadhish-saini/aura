import React from 'react';
import { 
  PhoneCall, 
  Cpu, 
  Sparkles, 
  Gauge, 
  Network, 
  KeyRound, 
  AlertTriangle, 
  FileText 
} from 'lucide-react';

const COMPONENT_ICONS = {
  "01": PhoneCall,
  "02": Cpu,
  "03": Sparkles,
  "04": Gauge,
  "05": Network,
  "06": KeyRound,
  "07": AlertTriangle,
  "08": FileText,
};

export default function AIVoiceGuardComponents({ components }) {
  return (
    <section id="system-components" className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-400 font-mono text-xs tracking-widest uppercase">
              07 — CORE SYSTEM COMPONENTS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Modular Security Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Eight interconnected software modules engineered to execute high-throughput audio capture, low-latency machine learning inference, and transparent conversational protection.
          </p>
        </div>

        {/* 8-Card Component Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {components.map((item) => {
            const Icon = COMPONENT_ICONS[item.index] || Cpu;

            return (
              <div
                key={item.id}
                className="p-5 sm:p-6 rounded-2xl border transition-all duration-200 hover:border-purple-500/40 group flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div 
                      className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-slate-300 transition-colors group-hover:text-purple-300 group-hover:border-purple-500/40 group-hover:bg-purple-950/20"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <Icon size={18} strokeWidth={1.75} />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                        MOD #{item.index}
                      </span>
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-mono border text-purple-300"
                        style={{
                          backgroundColor: 'rgba(168, 85, 247, 0.08)',
                          borderColor: 'rgba(168, 85, 247, 0.25)',
                        }}
                      >
                        {item.domain}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

