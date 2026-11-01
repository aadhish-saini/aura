import React, { useState } from 'react';
import { Play, ExternalLink, Video, AlertCircle } from 'lucide-react';

export default function DhruvNetraVideo({ youtubeId, youtubeUrl }) {
  const [hasError, setHasError] = useState(false);

  return (
    <section id="dhruvnetra-video-section" className="py-8 sm:py-12 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Project Demonstration // Video
            </span>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-sky-400 hover:text-sky-300 hover:underline transition-colors"
          >
            <span>Open in YouTube</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Video Player Container: 16:9 responsive aspect ratio */}
        <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl group">
          {!hasError ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&controls=1`}
              title="DhruvNetra System Demonstration"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              onError={() => setHasError(true)}
            />
          ) : (
            /* Fallback if embed is blocked */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-slate-900/90">
              <AlertCircle size={36} className="text-amber-400 mb-3" />
              <p className="text-sm font-mono text-white mb-2">Video player could not load inside the embedded frame.</p>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500 text-slate-950 font-mono text-xs font-semibold hover:bg-sky-400 transition-colors"
              >
                <Play size={14} fill="currentColor" />
                <span>Watch on YouTube ({youtubeUrl})</span>
              </a>
            </div>
          )}
        </div>

        {/* Video Caption & Metadata */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <Video size={13} className="text-sky-400" />
            <span>Demonstrating 3D Station Twin, 12 System Modules & Telemetry Feeds</span>
          </span>
          <span className="text-slate-500">ID: {youtubeId}</span>
        </div>
      </div>
    </section>
  );
}

