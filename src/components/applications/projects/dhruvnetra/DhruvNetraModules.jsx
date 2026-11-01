import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  Zap,
  Fuel,
  Wind,
  Droplets,
  CloudSnow,
  Package,
  Bell,
  Sliders,
  Landmark,
  BarChart3
} from 'lucide-react';

const MODULE_ICONS = {
  overview: LayoutDashboard,
  'digital-twin': Boxes,
  'power-management': Zap,
  'fuel-management': Fuel,
  'hvac-management': Wind,
  'water-management': Droplets,
  'environmental-monitoring': CloudSnow,
  'logistics-management': Package,
  'alerts-notifications': Bell,
  'what-if-simulation': Sliders,
  'government-command': Landmark,
  'reports-analytics': BarChart3,
};

export default function DhruvNetraModules({ modules }) {
  return (
    <section className="py-12 sm:py-16 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              05 — CORE SYSTEM MODULES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            Twelve Integrated Operational Modules
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            From spatial 3D station exploration and life-support telemetry to predictive disaster sandboxes and high-level ministry oversight, DhruvNetra spans twelve purpose-built subsystems.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {modules.map((mod) => {
            const Icon = MODULE_ICONS[mod.id] || Boxes;

            return (
              <div
                key={mod.id}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-sky-400/30 group"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))',
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-slate-300 transition-colors group-hover:text-sky-300 group-hover:border-sky-400/40"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <Icon size={20} strokeWidth={1.75} />
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-sky-400/80 uppercase tracking-wider">
                        Module {mod.index}
                      </div>
                      <h3 className="text-base font-semibold text-white tracking-tight">
                        {mod.name}
                      </h3>
                    </div>
                  </div>

                  <span 
                    className="px-2 py-0.5 rounded text-[10px] font-mono border text-slate-300 shrink-0"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderColor: 'var(--color-border-subtle)',
                    }}
                  >
                    {mod.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed pl-13">
                  {mod.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

