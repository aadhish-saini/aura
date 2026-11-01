import React, { useState, useMemo } from 'react';
import { HONORS_DATA } from './honorsData';
import HonorsNav from './HonorsNav';
import HonorsFeatured from './HonorsFeatured';
import HonorsList from './HonorsList';
import HonorsTimeline from './HonorsTimeline';
import HonorsEmptyState from './HonorsEmptyState';
import HonorDetailModal from './HonorDetailModal';
import { Trophy, Award, ShieldCheck, Sparkles, Gamepad2, Lock, Unlock } from 'lucide-react';
import { isGamingAchievementUnlocked } from '../../../utils/easterEggManager';

export default function HonorsApp() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortAscending, setSortAscending] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { header, featuredAchievement, records, emptyStates } = HONORS_DATA;

  const isUnlocked = isGamingAchievementUnlocked();
  const secretRecord = isUnlocked
    ? HONORS_DATA.secretGamingAchievement.unlocked
    : HONORS_DATA.secretGamingAchievement.locked;

  // Filtered and sorted achievement records
  const filteredRecords = useMemo(() => {
    let list = [...records];
    if (isUnlocked || activeCategory === 'secrets') {
      list.push(secretRecord);
    }

    if (activeCategory !== 'all') {
      list = list.filter((r) => r.category === activeCategory);
    }

    list.sort((a, b) => {
      return sortAscending ? a.order - b.order : b.order - a.order;
    });

    return list;
  }, [records, activeCategory, sortAscending, isUnlocked, secretRecord]);

  // Extract milestones for the timeline view
  const milestonesList = useMemo(() => {
    const list = records.filter((r) => r.category === 'milestones');
    list.sort((a, b) => (sortAscending ? a.order - b.order : b.order - a.order));
    return list;
  }, [records, sortAscending]);

  return (
    <div className="flex flex-col h-full bg-[#080c14] text-slate-100 select-text overflow-hidden relative font-sans">
      {/* Category and Sort Navigation Bar */}
      <HonorsNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        sortAscending={sortAscending}
        onToggleSort={() => setSortAscending((prev) => !prev)}
      />

      {/* Main Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-7 md:p-8 space-y-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Banner */}
          <div className="mb-8 pb-6 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-amber-500/25 bg-amber-950/20 text-amber-300">
                <Trophy size={13} className="text-amber-400" />
                <span className="font-semibold tracking-wider uppercase">HONORS ARCHIVE</span>
                <span className="text-white/30">•</span>
                <span>AUDITABLE PROOF</span>
              </div>

              <span
                className="px-2.5 py-0.5 rounded text-[10px] font-mono border"
                style={{
                  backgroundColor: 'var(--color-badge-bg, rgba(255, 255, 255, 0.04))',
                  borderColor: 'rgba(245, 158, 11, 0.3)',
                  color: '#fbbf24',
                }}
              >
                VERIFIED LOG
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
              {header.title}
            </h1>

            <p className="text-sm sm:text-base font-serif italic text-amber-200/90 font-light mb-3">
              "{header.subtitle}"
            </p>

            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed font-sans">
              {header.introduction}
            </p>
          </div>

          {/* Conditional View by Category */}
          {activeCategory === 'secrets' ? (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border backdrop-blur-xl relative overflow-hidden"
                style={{
                  backgroundColor: isUnlocked ? 'rgba(16, 24, 39, 0.7)' : 'rgba(15, 23, 42, 0.4)',
                  borderColor: isUnlocked ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: isUnlocked ? '0 0 30px rgba(245, 158, 11, 0.15)' : 'none',
                }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isUnlocked
                        ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-800/60 border-slate-700 text-slate-500'
                    }`}>
                      {isUnlocked ? <Trophy size={26} /> : <Lock size={24} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-amber-400">
                          {secretRecord.rankDisplay}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {secretRecord.organization}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">
                        {secretRecord.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-[11px] font-mono border ${
                    isUnlocked
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}>
                    {secretRecord.status}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-sans mb-4">
                  {secretRecord.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                  {secretRecord.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                    ALL SECRET DISCOVERIES
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                    Operating System Easter Eggs & Trophies
                  </h3>
                </div>
                <HonorsList
                  items={[secretRecord]}
                  onSelectItem={setSelectedItem}
                />
              </div>
            </div>
          ) : activeCategory === 'awards' ? (
            <HonorsEmptyState
              category="awards"
              emptyInfo={emptyStates.awards}
            />
          ) : activeCategory === 'certifications' ? (
            <HonorsEmptyState
              category="certifications"
              emptyInfo={emptyStates.certifications}
            />
          ) : activeCategory === 'milestones' ? (
            <div>
              <div className="mb-4">
                <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                  PROGRESSION LOG
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                  Development Milestones Timeline
                </h3>
              </div>
              <HonorsTimeline
                milestones={milestonesList}
                onSelectMilestone={setSelectedItem}
              />
            </div>
          ) : activeCategory === 'hackathons' ? (
            <div>
              <HonorsFeatured
                featured={featuredAchievement}
                onSelectAchievement={setSelectedItem}
              />
              <div className="mt-8">
                <div className="mb-4">
                  <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                    COMPETITION RECORDS
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                    Collegiate & Engineering Hackathons
                  </h3>
                </div>
                <HonorsList
                  items={filteredRecords}
                  onSelectItem={setSelectedItem}
                />
              </div>
            </div>
          ) : (
            /* 'all' Category View */
            <div className="space-y-10">
              {/* Featured Confirmed Hackathon */}
              <HonorsFeatured
                featured={featuredAchievement}
                onSelectAchievement={setSelectedItem}
              />

              {/* General Archive List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-amber-400 font-mono text-xs tracking-widest uppercase">
                      ALL ARCHIVED ENTRIES
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                      Verified Recognitions & Milestones
                    </h3>
                  </div>
                </div>

                <HonorsList
                  items={filteredRecords}
                  onSelectItem={setSelectedItem}
                />
              </div>

              {/* Milestone Timeline preview */}
              <div className="pt-6 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <div className="mb-4">
                  <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
                    CHRONOLOGY
                  </span>
                  <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
                    Milestone Timeline
                  </h3>
                </div>
                <HonorsTimeline
                  milestones={milestonesList}
                  onSelectMilestone={setSelectedItem}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Window / Modal Inspector */}
      {selectedItem && (
        <HonorDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Window Status Edge */}
      <div
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0"
        style={{
          backgroundColor: 'rgba(5, 8, 16, 0.95)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted, #64748b)',
        }}
      >
        <span className="text-amber-400/90 flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>RECOGNITION LOG // AUDITABLE VERIFICATION</span>
        </span>
        <span className="text-slate-500">HONORS ARCHIVE v2.0</span>
      </div>
    </div>
  );
}

