import { PORTFOLIO_DATA } from './portfolioData';

/**
 * Terminal Command Handler & Response Formatter
 * Pure function executing safe terminal commands with formatted outputs.
 */
export function executeTerminalCommand(rawCommand, { openApp, clearOutput }) {
  const trimmed = rawCommand.trim();
  const lower = trimmed.toLowerCase();

  if (!lower) {
    return { type: 'empty' };
  }

  if (lower === 'clear') {
    clearOutput();
    return { type: 'cleared' };
  }

  if (lower === 'help') {
    return {
      type: 'success',
      content: [
        { text: 'AADHISH OS Shell, version 4.19.0-release (wasm32-unknown-linux-gnu)', style: 'muted' },
        { text: 'These shell commands are defined internally. Type a command to execute:', style: 'normal' },
        { text: '  help          - List all available commands', style: 'highlight' },
        { text: '  shortcuts     - View system keyboard shortcuts (Ctrl+Alt+F, etc.)', style: 'highlight' },
        { text: '  about         - Display developer summary and biography', style: 'highlight' },
        { text: '  skills        - List engineering technologies & proficiencies', style: 'highlight' },
        { text: '  projects      - List featured software projects & repositories', style: 'highlight' },
        { text: '  achievements  - Display verified competition honors & milestones', style: 'highlight' },
        { text: '  contact       - Show developer contact channels', style: 'highlight' },
        { text: '  resume        - Open resume viewer application', style: 'highlight' },
        { text: '  date          - Print current workstation timestamp', style: 'highlight' },
        { text: '  whoami        - Print current identity and role', style: 'highlight' },
        { text: '  neofetch      - Display AADHISH OS ASCII badge and system telemetry', style: 'highlight' },
        { text: '  sudo unlock   - Reveal builder philosophy & AWS Student Builder mindset', style: 'highlight' },
        { text: '  clear         - Clear terminal screen buffer', style: 'highlight' }
      ]
    };
  }

  if (lower === 'shortcuts') {
    return {
      type: 'success',
      content: [
        { text: 'AADHISH OS // SYSTEM KEYBOARD SHORTCUTS:', style: 'accent' },
        { text: '  Escape              : Close open Start menu, power menu, or dialogs', style: 'highlight' },
        { text: '  Ctrl + Shift + Esc  : Launch Terminal CLI window', style: 'highlight' },
        { text: '  Ctrl + Alt + S      : Toggle Start menu', style: 'highlight' },
        { text: '  Ctrl + Alt + F      : Toggle browser fullscreen mode', style: 'highlight' },
        { text: '  Alt + F4            : Close currently active application window', style: 'highlight' },
        { text: 'Note: Shortcuts are ignored when actively typing in terminal or input fields.', style: 'muted' }
      ]
    };
  }

  if (lower === 'about') {
    return {
      type: 'success',
      content: [
        { text: `[IDENTITY] ${PORTFOLIO_DATA.identity.name}`, style: 'accent' },
        { text: PORTFOLIO_DATA.identity.title, style: 'secondary' },
        { text: `"${PORTFOLIO_DATA.identity.introduction}"`, style: 'quote' },
        { text: `CURRENT FOCUS: ${PORTFOLIO_DATA.identity.sections.currentFocus}`, style: 'normal' },
        { text: `APPROACH: ${PORTFOLIO_DATA.identity.sections.approach}`, style: 'muted' },
        { text: "Tip: Type 'projects' or click desktop icon to inspect code.", style: 'tip' }
      ]
    };
  }

  if (lower === 'projects') {
    const lines = [
      { text: 'FEATURED REPOSITORIES // SOFTWARE INVENTORY:', style: 'accent' }
    ];
    PORTFOLIO_DATA.projects.forEach((p, idx) => {
      lines.push({ text: `  [0${idx + 1}] ${p.title} (${p.category})`, style: 'highlight' });
      lines.push({ text: `       Stack: ${p.stack.join(', ')}`, style: 'muted' });
      lines.push({ text: `       Desc:  ${p.description}`, style: 'normal' });
    });
    lines.push({ text: "Type 'open projects' or click Projects icon to open window.", style: 'tip' });
    return { type: 'success', content: lines };
  }

  if (lower === 'skills') {
    return {
      type: 'success',
      content: [
        { text: 'ENGINEERING SKILL MATRIX:', style: 'accent' },
        { text: '  PROGRAMMING : Python, JavaScript, C++', style: 'highlight' },
        { text: '  FRONTEND    : HTML5, CSS3, React, Tailwind CSS', style: 'highlight' },
        { text: '  DATABASE    : MySQL (Relational Schema Design)', style: 'highlight' },
        { text: '  AI / ML     : AI Development, LLM Prompt Orchestration, Autonomous Workflows', style: 'highlight' },
        { text: '  METHODOLOGY : Prototype-driven engineering, clean architecture, WCAG accessible design', style: 'muted' }
      ]
    };
  }

  if (lower === 'achievements') {
    return {
      type: 'success',
      content: [
        { text: 'VERIFIED HONORS & RECOGNITIONS:', style: 'accent' },
        { text: `  ★ ${PORTFOLIO_DATA.achievements[0].title}`, style: 'highlight' },
        { text: `    Result:      ${PORTFOLIO_DATA.achievements[0].result}`, style: 'secondary' },
        { text: `    Description: ${PORTFOLIO_DATA.achievements[0].description}`, style: 'normal' }
      ]
    };
  }

  if (lower === 'contact') {
    return {
      type: 'success',
      content: [
        { text: 'TRANSMISSION CHANNELS:', style: 'accent' },
        { text: `  Email:    ${PORTFOLIO_DATA.identity.email}`, style: 'highlight' },
        { text: `  GitHub:   ${PORTFOLIO_DATA.identity.github}`, style: 'highlight' },
        { text: `  Location: ${PORTFOLIO_DATA.identity.location}`, style: 'normal' },
        { text: `  Status:   ${PORTFOLIO_DATA.identity.status}`, style: 'secondary' }
      ]
    };
  }

  if (lower === 'resume') {
    if (openApp) openApp('resume');
    return {
      type: 'success',
      content: [
        { text: 'Launching Resume application window...', style: 'accent' },
        { text: `Developer: ${PORTFOLIO_DATA.identity.name} // Degree: ${PORTFOLIO_DATA.identity.degree}`, style: 'normal' }
      ]
    };
  }

  if (lower === 'date') {
    return {
      type: 'success',
      content: [
        { text: new Date().toUTCString(), style: 'highlight' },
        { text: `Local Workstation: ${new Date().toLocaleString()}`, style: 'muted' }
      ]
    };
  }

  if (lower === 'whoami') {
    return {
      type: 'success',
      content: [
        { text: `${PORTFOLIO_DATA.identity.name} (guest@aura)`, style: 'accent' },
        { text: `Role: ${PORTFOLIO_DATA.identity.title}`, style: 'normal' },
        { text: `Station: ${PORTFOLIO_DATA.systemInfo.stationLocation}`, style: 'muted' }
      ]
    };
  }

  if (lower === 'neofetch') {
    return {
      type: 'neofetch',
      content: [
        { text: "      /\\      OS: AURA 26100.workstation", style: 'accent' },
        { text: "     /  \\     Host: AWS Student Builder Environment", style: 'normal' },
        { text: "    / /\\ \\    Kernel: Darwin-ARM64 / WebAssembly 4.19", style: 'normal' },
        { text: "   / ____ \\   Uptime: Active session", style: 'normal' },
        { text: "  /_/    \\_\\  Shell: bash // interactive-web-cli", style: 'normal' },
        { text: "              Resolution: Browser Viewport", style: 'normal' },
        { text: "              DE: AURA Window Compositor", style: 'normal' },
        { text: "              Theme: Dynamic (Dark / Light VS Code)", style: 'secondary' },
        { text: "              Font: Geist, JetBrains Mono", style: 'normal' },
        { text: "              Memory: 8.4 GB / 16.0 GB (Allocated)", style: 'muted' }
      ]
    };
  }

  if (lower === 'sudo unlock') {
    return {
      type: 'success',
      content: [
        { text: '[BUILDER MINDSET UNLOCKED]', style: 'accent' },
        { text: '------------------------------------------------------------', style: 'muted' },
        { text: 'Philosophy: "Learn by building, ship meaningful prototypes,', style: 'highlight' },
        { text: 'and treat software as a disciplined craft of solving real needs."', style: 'highlight' },
        { text: 'For the AWS Student Builder Challenge: Turning ideas into working,', style: 'normal' },
        { text: 'resilient, user-focused digital systems.', style: 'normal' },
        { text: '------------------------------------------------------------', style: 'muted' },
        { text: 'Access granted: All portfolio sub-systems ready.', style: 'secondary' }
      ]
    };
  }

  if (lower.startsWith('open ')) {
    const appTarget = lower.replace('open ', '').trim();
    if (['about', 'projects', 'skills', 'achievements', 'resume', 'contact', 'terminal', 'explorer', 'settings'].includes(appTarget)) {
      if (openApp) openApp(appTarget);
      return {
        type: 'success',
        content: [{ text: `Opened application window: '${appTarget}'`, style: 'accent' }]
      };
    }
  }

  return {
    type: 'error',
    content: [
      { text: `bash: command not found: '${rawCommand}'`, style: 'error' },
      { text: "Type 'help' for a list of available commands.", style: 'muted' }
    ]
  };
}
