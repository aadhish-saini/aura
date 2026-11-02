import React from 'react';
import { Award, CheckCircle, FolderArchive } from 'lucide-react';

export default function HonorsEmptyState({ category, emptyInfo }) {
  const isAward = category === 'awards';
  const isCertification = category === 'certifications';

  const defaultTitle = isAward
    ? 'No Independent Awards Logged Yet'
    : isCertification
    ? 'No Certifications Logged Yet'
    : 'No Records Found';

  const defaultDesc = isAward
    ? 'Individual and special institutional honors are recorded here once conferred. Competitive records are logged under Hackathons.'
    : isCertification
    ? 'Technical credentials and certification tracks are verified prior to publication. Records will appear here upon completion.'
    : 'No items match the selected category filter.';

  const defaultBadge = isAward
    ? 'Awaiting Official Confeals'
    : isCertification
    ? 'Verification In Progress'
    : 'Archive Empty';

  const title = emptyInfo?.title || defaultTitle;
  const description = emptyInfo?.description || defaultDesc;
  const badgeText = emptyInfo?.badgeText || defaultBadge;

  const Icon = isAward ? Award : isCertification ? CheckCircle : FolderArchive;

  return (
    <div
      className="p-8 sm:p-12 rounded-2xl border text-center flex flex-col items-center justify-center my-6"
      style={{
        backgroundColor: 'rgba(12, 17, 28, 0.5)',
        borderColor: 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="w-12 h-12 rounded-2xl border flex items-center justify-center text-slate-400 mb-4"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <Icon size={22} className="text-slate-400" />
      </div>

      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider text-amber-300/80 bg-amber-500/10 border border-amber-500/20 mb-3">
        {badgeText}
      </span>

      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
        {title}
      </h3>

      <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
        {description}
      </p>
    </div>
  );
}

