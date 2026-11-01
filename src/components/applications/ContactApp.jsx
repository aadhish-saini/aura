import React from 'react';
import ContactApp from './contact/ContactApp';

/**
 * Contact & Transmission Application
 * AURA — Aadhish's Unified Runtime Architecture
 *
 * Dedicated communication hub with functional Formspree email submission,
 * direct transmission channels, verified social profiles, and collaboration radar.
 */
export default function ContactAppWrapper(props) {
  return <ContactApp {...props} />;
}
