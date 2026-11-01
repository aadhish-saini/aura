import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Info, Mail, ExternalLink, RefreshCw } from 'lucide-react';

export default function ContactForm({ formspreeEndpoint, ownerEmail }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: '', // Honeypot field
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured_fallback'
  const [errorMessage, setErrorMessage] = useState('');

  const isConfigured = Boolean(formspreeEndpoint && formspreeEndpoint.trim().length > 0);

  // Email format validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!validateEmail(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot spam detection
    if (formData._gotcha) {
      // Silently drop bot submission
      return;
    }

    if (!validate()) {
      return;
    }

    // If Formspree endpoint is not configured in Vite env
    if (!isConfigured) {
      setStatus('unconfigured_fallback');
      return;
    }

    // Prevent duplicate submissions
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          _source: 'AURA OS Portfolio',
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Clear form after confirmed success
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          _gotcha: '',
        });
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          data?.error ||
            "Your message couldn't be sent. Please try again or contact me directly through email."
        );
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        "Your message couldn't be sent due to a network error. Please try again or contact me directly through email."
      );
    }
  };

  // Generate fallback mailto URL with entered data
  const fallbackMailto = `mailto:${ownerEmail}?subject=${encodeURIComponent(
    formData.subject || 'Inquiry from AURA OS'
  )}&body=${encodeURIComponent(
    `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <section id="contact-form-section" className="mb-8">
      {/* Header */}
      <div className="mb-6">
        <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">
          DISPATCH TRANSMISSION
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 mb-1">
          Send a Direct Message
        </h2>
        <p className="text-xs text-slate-400 font-sans">
          Have an idea, project proposal, or collaboration in mind? Send a message directly to my inbox.
        </p>
      </div>

      {/* Main Form Container */}
      <div
        className="p-6 sm:p-8 rounded-2xl border relative overflow-hidden"
        style={{
          backgroundColor: 'rgba(12, 17, 28, 0.75)',
          borderColor: 'rgba(56, 189, 248, 0.25)',
          boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Notice if Formspree endpoint is not yet populated */}
        {!isConfigured && status !== 'success' && (
          <div
            className="p-4 rounded-xl border mb-6 flex items-start gap-3 text-xs"
            style={{
              backgroundColor: 'rgba(56, 189, 248, 0.05)',
              borderColor: 'rgba(56, 189, 248, 0.25)',
            }}
          >
            <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-mono font-bold text-cyan-300 block">
                Formspree Endpoint Configuration Notice
              </span>
              <p className="text-slate-300 font-sans leading-relaxed">
                To connect live Formspree submissions, create a form at{' '}
                <a
                  href="https://formspree.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  formspree.io
                </a>{' '}
                pointing to <code>{ownerEmail}</code> and add{' '}
                <code>VITE_FORMSPREE_ENDPOINT</code> to your <code>.env</code> file.
                Submissions via email client remain immediately functional below.
              </p>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === 'success' ? (
          <div className="py-10 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CheckCircle2 size={28} />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight mb-2">
              Message sent successfully!
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-sans mb-6">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>

            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Send Another Transmission</span>
            </button>
          </div>
        ) : (
          /* Contact Form Input Fields */
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Honeypot anti-spam field */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* Error Banner if submission failed */}
            {status === 'error' && (
              <div
                className="p-4 rounded-xl border flex items-start justify-between gap-3 text-xs"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                }}
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-red-300 block">
                      Transmission Failed
                    </span>
                    <p className="text-slate-300 font-sans mt-0.5">
                      {errorMessage ||
                        "Your message couldn't be sent. Please try again or contact me directly through email."}
                    </p>
                  </div>
                </div>

                <a
                  href={fallbackMailto}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-900/50 shrink-0 transition-colors"
                >
                  Send via Mail Client
                </a>
              </div>
            )}

            {/* Unconfigured Fallback Banner when user attempts submission without endpoint */}
            {status === 'unconfigured_fallback' && (
              <div
                className="p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.08)',
                  borderColor: 'rgba(245, 158, 11, 0.3)',
                }}
              >
                <div className="flex items-start gap-2.5">
                  <Info size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-amber-300 block">
                      Formspree Endpoint Awaiting Owner Configuration
                    </span>
                    <p className="text-slate-300 font-sans mt-0.5">
                      The Formspree endpoint is not set yet in environment variables. Click below to launch your default email client with your message pre-filled.
                    </p>
                  </div>
                </div>

                <a
                  href={fallbackMailto}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-amber-600 hover:bg-amber-500 transition-colors shrink-0"
                >
                  <Mail size={13} />
                  <span>Send via Email Client</span>
                </a>
              </div>
            )}

            {/* Row 1: Full Name & Email Address */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Full Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Alex Rivers"
                  disabled={status === 'submitting'}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-sans bg-slate-900/90 text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.name
                      ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400/30'
                      : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30'
                  }`}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="text-[11px] font-mono text-red-400 mt-1">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                >
                  Email Address <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., alex@company.com"
                  disabled={status === 'submitting'}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-sans bg-slate-900/90 text-white placeholder-slate-500 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400/30'
                      : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30'
                  }`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="text-[11px] font-mono text-red-400 mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Subject */}
            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Subject <span className="text-cyan-400">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                autoComplete="off"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Engineering Collaboration / Project Proposal"
                disabled={status === 'submitting'}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-sans bg-slate-900/90 text-white placeholder-slate-500 focus:outline-none transition-all ${
                  errors.subject
                    ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400/30'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30'
                }`}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
              />
              {errors.subject && (
                <p id="contact-subject-error" className="text-[11px] font-mono text-red-400 mt-1">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Row 3: Message Textarea */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message, project ideas, or question here..."
                disabled={status === 'submitting'}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-sans bg-slate-900/90 text-white placeholder-slate-500 focus:outline-none transition-all resize-y ${
                  errors.message
                    ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400/30'
                    : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30'
                }`}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && (
                <p id="contact-message-error" className="text-[11px] font-mono text-red-400 mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Action Bar */}
            <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-mono text-slate-500">
                Encrypted in transit // Delivered directly to {ownerEmail}
              </span>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-semibold text-white bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
              >
                {status === 'submitting' ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

