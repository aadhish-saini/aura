import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../config/portfolioData';
import { FileText, Download, GraduationCap, Briefcase, Code, CheckCircle, Info } from 'lucide-react';

export default function ResumeApp() {
  const { identity, skills, projects, achievements } = PORTFOLIO_DATA;
  const [downloadNotice, setDownloadNotice] = useState(false);

  const handleDownload = () => {
    // Check if resume.pdf exists in public root
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          window.open('/resume.pdf', '_blank');
        } else {
          setDownloadNotice(true);
        }
      })
      .catch(() => {
        setDownloadNotice(true);
      });
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      <div className="p-5 md:p-6 flex-1 flex flex-col gap-5">
        {/* Header Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div>
            <span 
              className="text-[10px] font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--color-status-dot)' }}
            >
              CURRICULUM VITAE
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              Resume Preview
            </h3>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
              {identity.name} // {identity.degree}
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-2 cursor-pointer transition-all hover:brightness-110 active:scale-95 text-white"
            style={{
              backgroundColor: 'var(--color-progress-fill)',
              boxShadow: 'var(--color-progress-glow)'
            }}
          >
            <Download size={14} />
            <span>Download Resume (PDF)</span>
          </button>
        </div>

        {downloadNotice && (
          <div 
            className="p-3 rounded-lg border text-xs flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(53, 106, 195, 0.1)',
              borderColor: 'rgba(53, 106, 195, 0.3)',
              color: 'var(--color-text-primary)'
            }}
          >
            <Info size={16} className="text-blue-400 shrink-0" />
            <span>
              <strong>Resume Asset Notice:</strong> Place your real <code>resume.pdf</code> into the <code>/public/resume.pdf</code> directory to enable direct one-click PDF downloads. The preview below reflects verified portfolio data.
            </span>
          </div>
        )}

        {/* Structured Resume Preview Document Sheet */}
        <div 
          className="p-6 rounded-xl border flex flex-col gap-5 shadow-lg"
          style={{
            backgroundColor: 'var(--color-btn-default-bg)',
            borderColor: 'var(--color-border-default)'
          }}
        >
          {/* Header */}
          <div className="pb-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <div>
              <h1 className="text-2xl font-bold text-white">{identity.name}</h1>
              <p className="text-xs font-mono mt-1" style={{ color: 'var(--color-status-dot)' }}>
                {identity.title}
              </p>
            </div>
            <div className="text-right text-[11px] font-mono" style={{ color: 'var(--color-text-secondary)' }}>
              <div>{identity.location}</div>
              <div>{identity.email}</div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--color-status-dot)' }}>
              <GraduationCap size={15} />
              <span>EDUCATION</span>
            </div>
            <div className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
              <div className="flex justify-between items-center text-xs font-semibold text-white">
                <span>BTech Computer Science Engineering</span>
                <span className="font-mono text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Undergraduate</span>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                Focus on Software Engineering, Data Structures, Algorithms, and AI Development.
              </p>
            </div>
          </div>

          {/* Engineering Projects */}
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--color-status-dot)' }}>
              <Briefcase size={15} />
              <span>FEATURED SOFTWARE PROJECTS</span>
            </div>
            <div className="space-y-2.5">
              {projects.map((p) => (
                <div key={p.id} className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
                  <div className="flex justify-between items-center text-xs font-semibold text-white">
                    <span>{p.title}</span>
                    <span className="font-mono text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{p.category}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    {p.description}
                  </p>
                  <div className="text-[10px] font-mono mt-1.5" style={{ color: 'var(--color-status-dot)' }}>
                    Stack: {p.stack.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Proficiencies */}
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: 'var(--color-status-dot)' }}>
              <Code size={15} />
              <span>TECHNICAL COMPETENCIES</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
                <strong className="text-white">Languages:</strong>{' '}
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {skills.programming.map(s => s.name).join(', ')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
                <strong className="text-white">Frontend:</strong>{' '}
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {skills.frontend.map(s => s.name).join(', ')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
                <strong className="text-white">Database:</strong>{' '}
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {skills.database.map(s => s.name).join(', ')}
                </span>
              </div>
              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-btn-accent-bg)', borderColor: 'var(--color-border-subtle)' }}>
                <strong className="text-white">Applied AI:</strong>{' '}
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {skills.aiDevelopment.map(s => s.name).join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Window Status Edge */}
      <div 
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted)'
        }}
      >
        <span>FORMAT: STANDARDIZED ATS // VERIFIED</span>
        <span>AURA EXPORT</span>
      </div>
    </div>
  );
}
