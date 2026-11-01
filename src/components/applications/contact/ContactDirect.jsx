import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, ExternalLink } from 'lucide-react';

export default function ContactDirect({ email, phone, phoneCallUrl, emailMailtoUrl }) {
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  return (
    <section className="mb-10 pb-8 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
      {/* Section Label */}
      <div className="mb-5">
        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
          DIRECT TRANSMISSION CHANNELS
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-1">
          Primary Direct Contacts
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Fastest routes for technical discussions, engineering inquiries, and direct communication.
        </p>
      </div>

      {/* 2 Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email Card */}
        <div
          className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/40 flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
            borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-cyan-400"
                  style={{
                    backgroundColor: 'rgba(6, 182, 212, 0.08)',
                    borderColor: 'rgba(6, 182, 212, 0.25)',
                  }}
                >
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    EMAIL INBOX
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Primary Contact
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20">
                Active
              </span>
            </div>

            <div className="mb-4">
              <a
                href={emailMailtoUrl}
                className="text-sm sm:text-base font-bold font-mono text-white hover:text-cyan-300 transition-colors break-all"
                title="Send email to aadhishsainii@gmail.com"
              >
                {email}
              </a>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Best for detailed inquiries, project specifications, and engineering discussions.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <button
              type="button"
              onClick={() => copyToClipboard(email, 'email')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-700/80 text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer active:scale-95"
              aria-label="Copy email address"
            >
              {copiedKey === 'email' ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={emailMailtoUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 transition-all cursor-pointer"
            >
              <ExternalLink size={12} />
              <span>Compose Mail</span>
            </a>
          </div>
        </div>

        {/* Phone Card */}
        <div
          className="p-5 rounded-2xl border transition-all duration-200 hover:border-cyan-500/40 hover:bg-slate-900/40 flex flex-col justify-between"
          style={{
            backgroundColor: 'var(--color-btn-default-bg, rgba(255, 255, 255, 0.02))',
            borderColor: 'var(--color-border-subtle, rgba(255, 255, 255, 0.08))',
          }}
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-cyan-400"
                  style={{
                    backgroundColor: 'rgba(6, 182, 212, 0.08)',
                    borderColor: 'rgba(6, 182, 212, 0.25)',
                  }}
                >
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                    PHONE / WHATSAPP
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Voice & Messaging
                  </span>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
                IST (UTC+5:30)
              </span>
            </div>

            <div className="mb-4">
              <a
                href={phoneCallUrl}
                className="text-sm sm:text-base font-bold font-mono text-white hover:text-cyan-300 transition-colors"
                title="Call +91 82220 05143"
              >
                {phone}
              </a>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Available for scheduled calls, hackathon coordination, and urgent technical updates.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t flex items-center justify-between gap-2" style={{ borderColor: 'var(--color-border-subtle)' }}>
            <button
              type="button"
              onClick={() => copyToClipboard(phone, 'phone')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-700/80 text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer active:scale-95"
              aria-label="Copy phone number"
            >
              {copiedKey === 'phone' ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Phone</span>
                </>
              )}
            </button>

            <a
              href={phoneCallUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 transition-all cursor-pointer"
            >
              <Phone size={12} />
              <span>Call / Cellular</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

