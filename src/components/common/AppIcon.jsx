import React, { useState } from 'react';
import {
  User,
  FolderGit2,
  Cpu,
  Award,
  FileText,
  Mail,
  Terminal,
  FolderTree,
  Sliders,
  HelpCircle,
  Gamepad2
} from 'lucide-react';
import { DESKTOP_APPS } from '../../config/desktopApps';

const LUCIDE_FALLBACKS = {
  about: User,
  projects: FolderGit2,
  skills: Cpu,
  achievements: Award,
  resume: FileText,
  contact: Mail,
  terminal: Terminal,
  explorer: FolderTree,
  settings: Sliders,
  'system-override': Gamepad2
};

/**
 * Reusable AppIcon component
 * Renders custom image from public/icons/ if available,
 * falling back gracefully to Lucide vector icon.
 */
export default function AppIcon({
  appId,
  app,
  size = 20,
  className = '',
  style = {}
}) {
  const [imgError, setImgError] = useState(false);

  const appData = app || DESKTOP_APPS[appId] || {};
  const imageSrc = appData.image;
  const FallbackIcon = LUCIDE_FALLBACKS[appId || appData.id] || HelpCircle;

  if (imageSrc && !imgError) {
    return (
      <img
        src={imageSrc}
        alt={appData.shortTitle || appData.title || appId || 'App Icon'}
        width={size}
        height={size}
        className={`object-contain pointer-events-none select-none transition-transform ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          maxWidth: `${size}px`,
          maxHeight: `${size}px`,
          ...style
        }}
        onError={() => setImgError(true)}
        loading="eager"
      />
    );
  }

  return (
    <FallbackIcon
      size={size}
      className={`shrink-0 ${className}`}
      style={style}
    />
  );
}
