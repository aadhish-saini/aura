import React from 'react';
import { CONTACT_DATA } from './contactData';
import ContactHero from './ContactHero';
import ContactDirect from './ContactDirect';
import ContactForm from './ContactForm';
import ContactSocials from './ContactSocials';
import ContactOpportunities from './ContactOpportunities';
import { ShieldCheck } from 'lucide-react';

export default function ContactApp() {
  const { owner, email, phone, phoneCallUrl, emailMailtoUrl, hero, socialProfiles, collaborationOpportunities, formspreeEndpoint } = CONTACT_DATA;

  return (
    <div className="flex flex-col h-full bg-[#080c14] text-slate-100 select-text overflow-hidden relative font-sans">
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 sm:p-7 md:p-8 space-y-2 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          {/* Section A: Hero */}
          <ContactHero hero={hero} />

          {/* Section B: Direct Contact */}
          <ContactDirect
            email={email}
            phone={phone}
            phoneCallUrl={phoneCallUrl}
            emailMailtoUrl={emailMailtoUrl}
          />

          {/* Section E: Functional Contact Form (Primary Feature) */}
          <ContactForm
            formspreeEndpoint={formspreeEndpoint}
            ownerEmail={email}
          />

          {/* Section C: Social Profiles */}
          <ContactSocials profiles={socialProfiles} />

          {/* Section D: Collaboration Opportunities */}
          <ContactOpportunities opportunities={collaborationOpportunities} />
        </div>
      </div>

      {/* Window Status Edge */}
      <div
        className="h-7 px-4 border-t flex items-center justify-between text-[10px] font-mono select-none shrink-0"
        style={{
          backgroundColor: 'rgba(5, 8, 16, 0.95)',
          borderColor: 'var(--color-border-subtle)',
          color: 'var(--color-text-muted, #64748b)',
        }}
      >
        <span className="text-cyan-400/90 flex items-center gap-1.5">
          <ShieldCheck size={12} className="text-emerald-400" />
          <span>TRANSMISSION SECURE // aadhishsainii@gmail.com</span>
        </span>
        <span className="text-slate-500">COMMUNICATION HUB v2.0</span>
      </div>
    </div>
  );
}

