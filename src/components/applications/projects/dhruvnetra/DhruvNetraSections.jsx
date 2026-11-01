import React from 'react';
import {
  WifiOff,
  Sparkles,
  Layers,
  Eye,
  Users,
  Compass,
  Milestone,
  ArrowRight,
  Shield,
  FileCheck2,
  Terminal,
  Activity,
  Award
} from 'lucide-react';

export default function DhruvNetraSections({ mode = 'all', sections = [], architectureSections = [], metadata = {} }) {
  // Find specific sections by id
  const theIdea = sections.find((s) => s.id === 'the-idea');
  const theProblem = sections.find((s) => s.id === 'the-problem');
  const ourSolution = sections.find((s) => s.id === 'our-solution');
  const theDigitalTwin = sections.find((s) => s.id === 'the-digital-twin');

  const offlineFirst = architectureSections.find((s) => s.id === 'offline-first');
  const aiSupport = architectureSections.find((s) => s.id === 'ai-decision-support');
  const sysArch = architectureSections.find((s) => s.id === 'system-architecture');
  const uxSection = architectureSections.find((s) => s.id === 'user-experience');
  const whoBenefits = architectureSections.find((s) => s.id === 'who-benefits');
  const realImpact = architectureSections.find((s) => s.id === 'real-world-impact');
  const devJourney = architectureSections.find((s) => s.id === 'development-journey');
  const roadmap = architectureSections.find((s) => s.id === 'future-roadmap');
  const vision = architectureSections.find((s) => s.id === 'the-vision');

  const showIntro = mode === 'all' || mode === 'intro';
  const showArch = mode === 'all' || mode === 'architecture';

  return (
    <div className="space-y-16 sm:space-y-20 py-10 sm:py-16">
      {/* 01 — THE IDEA */}
      {showIntro && theIdea && (
        <section id="the-idea" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-4">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {theIdea.number} — {theIdea.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Managing the world's most remote research stations, from anywhere.
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl pt-2">
            {theIdea.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* 02 — THE PROBLEM */}
      {showIntro && theProblem && (
        <section id="the-problem" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-4">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {theProblem.number} — {theProblem.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            Distance makes every decision more difficult.
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl pt-2">
            {theProblem.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* 03 — OUR SOLUTION */}
      {showIntro && ourSolution && (
        <section id="our-solution" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-4">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {ourSolution.number} — {ourSolution.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            One platform. Two stations. A unified operational picture.
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl pt-2">
            {ourSolution.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* 04 — THE DIGITAL TWIN */}
      {showIntro && theDigitalTwin && (
        <section id="the-digital-twin" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-4">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {theDigitalTwin.number} — {theDigitalTwin.title}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
            A digital representation of a physical research station.
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl pt-2">
            {theDigitalTwin.content.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* 06 — OFFLINE-FIRST ARCHITECTURE */}
      {showArch && offlineFirst && (
        <section id="offline-first" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {offlineFirst.number} — {offlineFirst.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              Resilient Operation in Zero-Connectivity Environments
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Polar communications face persistent satellite dropouts. DhruvNetra is engineered with a strict offline-first operational model ensuring continuous local autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offlineFirst.pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-sky-400/30"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <WifiOff size={16} className="text-sky-400" />
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 07 — AI & INTELLIGENT DECISION SUPPORT */}
      {showArch && aiSupport && (
        <section id="ai-decision-support" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {aiSupport.number} — {aiSupport.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              Operational Insights and Predictive Risk Awareness
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Equipping polar operations teams with machine learning intelligence that turns raw sensor streams into actionable preventative insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {aiSupport.pillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border transition-all duration-200 hover:border-sky-400/30"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-purple-400" />
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 08 — SYSTEM ARCHITECTURE */}
      {showArch && sysArch && (
        <section id="system-architecture" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {sysArch.number} — {sysArch.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              End-to-End Technical Engineering Foundation
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              An enterprise-grade stack spanning modern web frontends, 3D WebGL runtimes, resilient time-series ingestion, and on-station edge synchronization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sysArch.layers.map((layer, idx) => (
              <div 
                key={idx}
                className="p-4 sm:p-5 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div>
                  <span className="text-[10px] font-mono text-sky-400 tracking-wider uppercase block mb-1">
                    Layer 0{idx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                    {layer.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {layer.detail}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.05] text-slate-400 border border-white/10">
                    {layer.tech}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 09 — USER EXPERIENCE */}
      {showArch && uxSection && (
        <section id="user-experience" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {uxSection.number} — {uxSection.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              Scientific Minimalism and Spatial Navigation
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Designed specifically for mission-critical clarity: reducing cognitive burden, maximizing contrast, and providing instantaneous spatial context.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uxSection.principles.map((principle, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Eye size={16} className="text-sky-400" />
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10 — WHO BENEFITS? */}
      {showArch && whoBenefits && (
        <section id="who-benefits" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {whoBenefits.number} — {whoBenefits.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              Stakeholders Across the Antarctic Polar Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whoBenefits.stakeholders.map((sh, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-sky-400" />
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {sh.role}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {sh.benefit}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 11 — REAL-WORLD IMPACT */}
      {showArch && realImpact && (
        <section id="real-world-impact" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {realImpact.number} — {realImpact.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              Intended Benefits and Operational Impact
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {realImpact.impacts.map((imp, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} className="text-emerald-400" />
                  <h3 className="text-sm sm:text-base font-semibold text-white">
                    {imp.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                  {imp.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 12 — DEVELOPMENT JOURNEY */}
      {showArch && devJourney && (
        <section id="development-journey" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {devJourney.number} — {devJourney.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              Research, Architecture, and Iterative Evolution
            </h2>
          </div>

          <div className="space-y-3">
            {devJourney.steps.map((st, idx) => (
              <div 
                key={idx}
                className="p-4 sm:p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full border border-sky-400/40 text-sky-400 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-0.5">
                      {st.phase}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {st.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 13 — FUTURE ROADMAP */}
      {showArch && roadmap && (
        <section id="future-roadmap" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {roadmap.number} — {roadmap.title}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mt-1 mb-2">
              The Next Horizons for Antarctic Telemetry
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {roadmap.items.map((it, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
                  borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.07))'
                }}
              >
                <div>
                  <Milestone size={18} className="text-sky-400 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1.5">
                    {it.title}
                  </h3>
                  <p className="text-xs text-slate-300/90 leading-relaxed">
                    {it.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 14 — THE VISION & PROJECT INFORMATION */}
      {showArch && vision && (
        <section id="the-vision" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-20">
          <div className="mb-6">
            <span className="text-sky-400 font-mono text-xs tracking-widest uppercase">
              {vision.number} — {vision.title}
            </span>
          </div>

          {/* Atmospheric Quote Box */}
          <div 
            className="p-6 sm:p-8 rounded-3xl border relative overflow-hidden mb-10 text-center"
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.04)',
              borderColor: 'rgba(56, 189, 248, 0.25)'
            }}
          >
            <div 
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none blur-3xl opacity-20"
              style={{ background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)' }}
            />
            <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-white max-w-2xl mx-auto leading-relaxed mb-4">
              "{vision.quote}"
            </blockquote>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              {vision.summary}
            </p>
          </div>

          {/* Project Information Box */}
          <div 
            className="p-6 rounded-2xl border"
            style={{
              backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.03))',
              borderColor: 'var(--color-border-default, rgba(255, 255, 255, 0.1))'
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
              <FileCheck2 size={16} className="text-sky-400" />
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
                Project Information // Specifications
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block mb-0.5">Problem Statement</span>
                <span className="text-white font-semibold">{metadata.problemStatement}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Ministry</span>
                <span className="text-white font-semibold">{metadata.ministry}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Nodal Agency</span>
                <span className="text-white font-semibold">{metadata.organization}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Software Category</span>
                <span className="text-white font-semibold">{metadata.category}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Theme</span>
                <span className="text-sky-300 font-semibold">{metadata.theme}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Target Research Stations</span>
                <span className="text-emerald-300 font-semibold">{metadata.targetStations}</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
