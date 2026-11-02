import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, ArrowUp } from 'lucide-react';
import AppIcon from '../common/AppIcon';
import { unlockGamingAchievement } from '../../utils/easterEggManager';

const FS_STRUCTURE = {
  name: 'AURA_FS',
  type: 'dir',
  children: [
    {
      name: 'About',
      type: 'dir',
      appTarget: 'about',
      children: [
        { name: 'profile.spec', type: 'file', appTarget: 'about', size: '2.4 KB' },
        { name: 'identity.json', type: 'file', appTarget: 'about', size: '1.1 KB' }
      ]
    },
    {
      name: 'Projects',
      type: 'dir',
      appTarget: 'projects',
      children: [
        { name: 'AuraOS.system', type: 'file', appTarget: 'projects', size: '14.2 KB' },
        { name: 'DhruvNetra.3d', type: 'file', appTarget: 'projects', size: '38.0 KB' },
        { name: 'Portfolio.client', type: 'file', appTarget: 'projects', size: '9.8 KB' }
      ]
    },
    {
      name: 'Skills',
      type: 'dir',
      appTarget: 'skills',
      children: [
        { name: 'languages.matrix', type: 'file', appTarget: 'skills', size: '3.1 KB' },
        { name: 'frontend.stack', type: 'file', appTarget: 'skills', size: '4.5 KB' },
        { name: 'ai_development.spec', type: 'file', appTarget: 'skills', size: '5.2 KB' }
      ]
    },
    {
      name: 'Achievements',
      type: 'dir',
      appTarget: 'achievements',
      children: [
        { name: 'hackathon_rank7.doc', type: 'file', appTarget: 'achievements', size: '1.8 KB' }
      ]
    },
    {
      name: 'Resume',
      type: 'dir',
      appTarget: 'resume',
      children: [
        { name: 'curriculum_vitae.pdf', type: 'file', appTarget: 'resume', size: '112 KB' }
      ]
    },
    {
      name: 'Contact',
      type: 'dir',
      appTarget: 'contact',
      children: [
        { name: 'channels.vcf', type: 'file', appTarget: 'contact', size: '890 B' }
      ]
    },
    {
      name: 'System',
      type: 'dir',
      children: [
        { name: 'kernel.sys', type: 'file', size: '2.8 MB' },
        { name: 'notes.txt', type: 'file', size: '420 B' },
        { name: 'system_override.bin', type: 'file', appTarget: 'system-override', isSecret: true, size: '8.4 MB' }
      ]
    }
  ]
};

export default function FileExplorerApp({ openApp }) {
  const [currentPath, setCurrentPath] = useState(['AURA_FS']);

  // Find current node
  let currentNode = FS_STRUCTURE;
  for (let i = 1; i < currentPath.length; i++) {
    const next = currentNode.children?.find((c) => c.name === currentPath[i]);
    if (next) currentNode = next;
  }

  const navigateTo = (name) => {
    setCurrentPath((prev) => [...prev, name]);
  };

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath((prev) => prev.slice(0, -1));
    }
  };

  const handleItemClick = (item) => {
    if (item.type === 'dir') {
      navigateTo(item.name);
    } else if (item.appTarget && openApp) {
      if (item.appTarget === 'system-override') {
        unlockGamingAchievement();
      }
      openApp(item.appTarget);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto font-sans select-text">
      {/* Breadcrumb Navigation Bar */}
      <div 
        className="h-10 px-4 border-b flex items-center justify-between gap-2 text-xs font-mono select-none"
        style={{
          backgroundColor: 'var(--color-btn-default-bg)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-secondary)'
        }}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            type="button"
            disabled={currentPath.length === 1}
            onClick={navigateUp}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 cursor-pointer disabled:cursor-default mr-1"
            title="Go up one level"
          >
            <ArrowUp size={13} />
          </button>

          {currentPath.map((seg, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight size={12} className="text-neutral-500" />}
              <button
                type="button"
                onClick={() => setCurrentPath(currentPath.slice(0, idx + 1))}
                className={`hover:underline cursor-pointer ${
                  idx === currentPath.length - 1 ? 'font-semibold text-white' : ''
                }`}
              >
                {seg}
              </button>
            </React.Fragment>
          ))}
        </div>

        <span className="text-[10px] text-neutral-500 shrink-0">
          {currentNode.children?.length || 0} items
        </span>
      </div>

      {/* Directory Contents Grid */}
      <div className="p-5 md:p-6 flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {currentNode.children?.map((item) => (
            <div
              key={item.name}
              onClick={() => handleItemClick(item)}
              className="p-3.5 rounded-xl border flex flex-col items-center text-center gap-2 cursor-pointer transition-all hover:scale-[1.02] hover:brightness-110 group"
              style={{
                backgroundColor: 'var(--color-btn-default-bg)',
                borderColor: 'var(--color-border-default)'
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center border transition-colors group-hover:border-sky-500/40 p-1.5"
                style={{
                  backgroundColor: 'var(--color-btn-accent-bg)',
                  borderColor: 'var(--color-border-subtle)',
                  color: item.type === 'dir' ? 'var(--color-status-dot)' : 'var(--color-text-secondary)'
                }}
              >
                {item.type === 'dir' ? (
                  <Folder size={24} className="fill-sky-400/20 text-sky-400" />
                ) : item.appTarget ? (
                  <AppIcon appId={item.appTarget} size={24} />
                ) : (
                  <FileText size={24} />
                )}
              </div>

              <div className="w-full">
                <span className="text-xs font-mono font-medium text-white block truncate">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-neutral-500 block mt-0.5">
                  {item.type === 'dir' ? 'Directory' : item.size || 'Application'}
                </span>
              </div>
            </div>
          ))}
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
        <span>PATH: /{currentPath.join('/')}</span>
        <span>DRIVE: NVME0N1 // READ_ONLY</span>
      </div>
    </div>
  );
}
