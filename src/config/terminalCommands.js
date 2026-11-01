import { PORTFOLIO_DATA } from './portfolioData';
import {
  unlockGamingAchievement,
  advanceHintStage,
  getHintStage,
} from '../utils/easterEggManager';

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
        { text: 'AURA Shell, version 4.19.0-release (wasm32-unknown-linux-gnu)', style: 'muted' },
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
        { text: '  neofetch      - Display AURA ASCII badge and system telemetry', style: 'highlight' },
        { text: '  sudo unlock   - Reveal builder philosophy & AWS Student Builder mindset', style: 'highlight' },
        { text: '  hint          - Query AURA system discovery clues & hints', style: 'tip' },
        { text: '  clear         - Clear terminal screen buffer', style: 'highlight' }
      ]
    };
  }

  if (lower === 'shortcuts') {
    return {
      type: 'success',
      content: [
        { text: 'AURA // SYSTEM KEYBOARD SHORTCUTS:', style: 'accent' },
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
        { text: "              Theme: AURA Obsidian Dark (Permanent)", style: 'secondary' },
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

  // Easter Egg & Hint System: Trigger 1 / 2 - Game query
  if (['game', 'games', 'play', 'secret', 'easteregg'].includes(lower)) {
    advanceHintStage(2);
    return {
      type: 'success',
      content: [
        { text: '[AURA // SYSTEM DISCOVERY HINT 02]', style: 'accent' },
        { text: '"A developer\'s workspace is incomplete without something to play with. Maybe there\'s an application that isn\'t listed?"', style: 'highlight' },
        { text: 'Look closely at system daemons or query \'hint\' for progressive clues.', style: 'muted' },
        { text: "Command suggestion: Try 'override' or 'ps' to inspect hidden processes.", style: 'tip' }
      ]
    };
  }

  // Progressive Hint System: Trigger 2 / 3
  if (['hint', 'hints'].includes(lower)) {
    const stage = getHintStage();
    if (stage < 2) {
      advanceHintStage(2);
      return {
        type: 'success',
        content: [
          { text: '[AURA // SYSTEM DISCOVERY HINT 01]', style: 'accent' },
          { text: '"I built an entire operating system, added my projects, skills and achievements... but something important is still missing. 🤔"', style: 'highlight' },
          { text: 'Tip: Ask yourself what every operating system needs when a developer gets bored.', style: 'tip' }
        ]
      };
    } else if (stage === 2) {
      advanceHintStage(3);
      return {
        type: 'success',
        content: [
          { text: '[AURA // SYSTEM DISCOVERY HINT 02]', style: 'accent' },
          { text: '"A developer\'s workspace is incomplete without something to play with. Maybe there\'s an application that isn\'t listed?"', style: 'highlight' },
          { text: 'Try checking system processes with \'ps\' or launching \'override\'.', style: 'tip' }
        ]
      };
    } else {
      advanceHintStage(3);
      return {
        type: 'success',
        content: [
          { text: '[AURA // SYSTEM DISCOVERY HINT 03 — STRONGER HINT]', style: 'accent' },
          { text: '"I love building things, but I also love playing them. Look beyond the applications you can see."', style: 'highlight' },
          { text: 'Direct sequence: Type \'override\' to bypass standard security filters and launch the hidden cybersecurity game.', style: 'tip' }
        ]
      };
    }
  }

  // System processes inspection with hidden daemon
  if (['ps', 'top', 'processes', 'systemctl', 'services'].includes(lower)) {
    return {
      type: 'success',
      content: [
        { text: 'PID   USER      CPU%  MEM%  COMMAND', style: 'accent' },
        { text: '1     root      0.1   1.2   /aura/system/init', style: 'muted' },
        { text: '104   guest     0.4   2.8   /aura/desktop/compositor', style: 'normal' },
        { text: '218   guest     0.2   1.4   /aura/shell/terminal', style: 'normal' },
        { text: '512   guest     0.0   0.8   /aura/services/telemetry', style: 'muted' },
        { text: '4096  hidden    0.9   4.2   /system/bin/system-override.service [CLASSIFIED]', style: 'highlight' },
        { text: "Notice: Process 4096 is responding to the 'override' instruction.", style: 'tip' }
      ]
    };
  }

  // Developer notes scratchpad
  if (['notes', 'cat notes', 'cat notes.txt'].includes(lower)) {
    return {
      type: 'success',
      content: [
        { text: 'FILE: /guest/home/notes.txt', style: 'accent' },
        { text: '------------------------------------------------------------', style: 'muted' },
        { text: '1. Complete AURA portfolio desktop windows... [DONE]', style: 'normal' },
        { text: '2. Wire Formspree contact endpoint... [DONE]', style: 'normal' },
        { text: '3. WAIT... WHERE IS THE GAME?? I forgot to add a game!', style: 'highlight' },
        { text: '4. Secretly hiding SYSTEM OVERRIDE cybersecurity challenge.', style: 'secondary' },
        { text: '   Access key: \'override\'', style: 'tip' },
        { text: '------------------------------------------------------------', style: 'muted' }
      ]
    };
  }

  // Launching the hidden game directly via terminal
  if (['override', 'system-override', 'system override', 'game-start'].includes(lower)) {
    unlockGamingAchievement();
    if (openApp) openApp('system-override');
    return {
      type: 'success',
      content: [
        { text: '>>> [SYSTEM OVERRIDE DETECTED] <<<', style: 'accent' },
        { text: 'Bypassing security barriers and mounting hidden challenge module...', style: 'highlight' },
        { text: '★ ACHIEVEMENT UNLOCKED: "WAIT... WHERE\'S THE GAME?"', style: 'secondary' },
        { text: 'Launching AURA: SYSTEM OVERRIDE — The Hidden Gem.', style: 'tip' }
      ]
    };
  }

  if (lower.startsWith('open ')) {
    const appTarget = lower.replace('open ', '').trim();
    if (appTarget === 'override' || appTarget === 'system-override') {
      unlockGamingAchievement();
      if (openApp) openApp('system-override');
      return {
        type: 'success',
        content: [
          { text: '>>> Launching hidden module: AURA: SYSTEM OVERRIDE <<<', style: 'accent' },
          { text: '★ ACHIEVEMENT UNLOCKED: "WAIT... WHERE\'S THE GAME?"', style: 'secondary' }
        ]
      };
    }
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
