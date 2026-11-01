import React from 'react';
import ResumeApp from './resume/ResumeApp';

/**
 * Resume & Professional Profile Application
 * AURA — Aadhish's Unified Runtime Architecture
 *
 * Professional profile explorer with native embedded PDF viewer,
 * direct download, new-tab access, and technical project showcases.
 */
export default function ResumeAppWrapper(props) {
  return <ResumeApp {...props} />;
}
