import { PORTFOLIO_DATA } from './portfolioData';
import {
  unlockGamingAchievement,
  advanceHintStage,
  getHintStage,
} from '../utils/easterEggManager';
import { unlockAchievement, recordProjectOpened } from '../utils/achievementManager';
import { triggerGameDiscoveredNotification } from '../utils/notificationManager';

export const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'whoami',
  'projects',
  'skills',
  'achievements',
  'contact',
  'resume',
  'open',
  'clear',
  'date',
  'time',
  'history',
  'neofetch',
  'exit',
  'shortcuts',
  'notes',
  'override',
  'hint'
];

export const OPENABLE_TARGETS = [
  'about',
  'projects',
  'skills',
  'achievements',
  'resume',
  'contact',
  'terminal',
  'explorer',
  'settings',
  'override',
  'system-override',
  'system override',
  'system_override',
  'system_override.bin',
  'override.bin',
  'dhruvnetra',
  'ai-voice-guard',
  'aivoiceguard',
  'ai-project',
  'portfolio',
  'portfolio-website',
  'portfolio website',
  'aura'
];

// Levenshtein distance for fuzzy command suggestion
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

function getClosestCommand(cmd) {
  let best = null;
  let min = 3;
  for (const c of AVAILABLE_COMMANDS) {
    const dist = levenshtein(cmd, c);
    if (dist < min) {
      min = dist;
      best = c;
    }
  }
  return best;
}

/**
 * Terminal Command Handler & Response Formatter
 */
export function executeTerminalCommand(rawCommand, { openApp, clearOutput, commandHistory = [], onClose }) {
  const trimmed = rawCommand.trim();
  const lower = trimmed.toLowerCase();

  if (!lower) {
    return { type: 'empty' };
  }

  if (lower === 'clear') {
    clearOutput();
    return { type: 'cleared' };
  }

  if (lower === 'exit' || lower === 'quit') {
    if (onClose) {
      onClose();
    } else if (openApp) {
      // Fallback
    }
    return {
      type: 'success',
      content: [{ text: 'Exiting terminal session...', style: 'muted' }]
    };
  }

  if (lower === 'help') {
    return {
      type: 'success',
      content: [
        { text: 'AURA Shell, version 4.19.0-release (wasm32-unknown-linux-gnu)', style: 'muted' },
        { text: 'Simulated browser terminal environment. Available shell commands:', style: 'normal' },
        { text: '  help              - List all available commands', style: 'highlight' },
        { text: '  about             - Display developer summary and biography', style: 'highlight' },
        { text: '  whoami            - Display developer identity information', style: 'highlight' },
        { text: '  projects          - List featured software projects & repositories', style: 'highlight' },
        { text: '  skills            - List engineering technologies & proficiencies', style: 'highlight' },
        { text: '  achievements      - Display verified competition honors & milestones', style: 'highlight' },
        { text: '  contact           - Show developer contact channels', style: 'highlight' },
        { text: '  resume            - Open native Resume application', style: 'highlight' },
        { text: '  open [app/proj]   - Launch requested application or project details', style: 'highlight' },
        { text: '  date              - Print workstation date and timestamp', style: 'highlight' },
        { text: '  time              - Display current local system time', style: 'highlight' },
        { text: '  history           - Display session command history', style: 'highlight' },
        { text: '  neofetch          - Display AURA ASCII badge and system telemetry', style: 'highlight' },
        { text: '  clear             - Clear terminal screen buffer', style: 'highlight' },
        { text: '  exit              - Close terminal application window', style: 'highlight' },
        { text: '  shortcuts         - View system keyboard shortcuts', style: 'muted' },
        { text: '  hint              - Query AURA system discovery clues & hints', style: 'tip' }
      ]
    };
  }

  if (lower === 'shortcuts') {
    return {
      type: 'success',
      content: [
        { text: 'AURA // SYSTEM KEYBOARD SHORTCUTS:', style: 'accent' },
        { text: '  Ctrl + K / Cmd + K  : Open Global Command Palette', style: 'highlight' },
        { text: '  Alt + Tab           : Fast Application Switcher', style: 'highlight' },
        { text: '  Win + D             : Toggle Show Desktop (minimize all)', style: 'highlight' },
        { text: '  Ctrl + Shift + T    : Launch Terminal CLI window', style: 'highlight' },
        { text: '  Ctrl + Alt + S      : Toggle Start Menu', style: 'highlight' },
        { text: '  Ctrl + Alt + F      : Toggle browser fullscreen mode', style: 'highlight' },
        { text: '  Alt + F4            : Close currently active window', style: 'highlight' },
        { text: '  Escape              : Close active modals, menus or overlays', style: 'highlight' }
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
        { text: "Tip: Type 'open projects' to inspect code repositories.", style: 'tip' }
      ]
    };
  }

  if (lower === 'whoami') {
    return {
      type: 'success',
      content: [
        { text: `${PORTFOLIO_DATA.identity.name} (guest@aura)`, style: 'accent' },
        { text: `Role: ${PORTFOLIO_DATA.identity.title}`, style: 'normal' },
        { text: `Station: ${PORTFOLIO_DATA.systemInfo.stationLocation}`, style: 'muted' },
        { text: `Degree: ${PORTFOLIO_DATA.identity.degree}`, style: 'normal' }
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
    lines.push({ text: "Tip: Type 'open <project-name>' to open its details dossier directly.", style: 'tip' });
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
        { text: `Local Workstation Date: ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, style: 'muted' }
      ]
    };
  }

  if (lower === 'time') {
    return {
      type: 'success',
      content: [
        { text: `Local Time: ${new Date().toLocaleTimeString()}`, style: 'highlight' },
        { text: `Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`, style: 'muted' }
      ]
    };
  }

  if (lower === 'history') {
    if (!commandHistory || commandHistory.length === 0) {
      return {
        type: 'success',
        content: [{ text: 'No command history recorded in current session.', style: 'muted' }]
      };
    }
    const lines = [{ text: 'SESSION COMMAND HISTORY:', style: 'accent' }];
    commandHistory.forEach((c, i) => {
      lines.push({ text: `  ${String(i + 1).padStart(2, ' ')}  ${c}`, style: 'normal' });
    });
    return { type: 'success', content: lines };
  }

  if (lower === 'neofetch') {
    unlockAchievement('command-master');
    return {
      type: 'neofetch',
      content: [
        { text: "      /\\      OS: AURA 26100.workstation", style: 'accent' },
        { text: "     /  \\     Host: AWS Student Builder Environment", style: 'normal' },
        { text: "    / /\\ \\    Kernel: Darwin-ARM64 / WebAssembly 4.19", style: 'normal' },
        { text: "   / ____ \\   Uptime: Active session", style: 'normal' },
        { text: "  /_/    \\_\\  Shell: bash // simulated-browser-terminal", style: 'normal' },
        { text: "              Resolution: Browser Viewport", style: 'normal' },
        { text: "              DE: AURA Window Compositor", style: 'normal' },
        { text: "              Theme: AURA Obsidian Dark (Permanent)", style: 'secondary' },
        { text: "              Font: Geist, JetBrains Mono", style: 'normal' },
        { text: "              Memory: 8.4 GB / 16.0 GB (Simulated)", style: 'muted' }
      ]
    };
  }

  if (lower === 'sudo unlock') {
    unlockAchievement('hidden-discovery');
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
        { text: '★ ACHIEVEMENT UNLOCKED: "Hidden Discovery"', style: 'secondary' }
      ]
    };
  }

  // Developer notes scratchpad
  if (['notes', 'cat notes', 'cat notes.txt'].includes(lower)) {
    unlockAchievement('hidden-discovery');
    return {
      type: 'success',
      content: [
        { text: 'FILE: /guest/home/notes.txt', style: 'accent' },
        { text: '------------------------------------------------------------', style: 'muted' },
        { text: '1. Complete AURA portfolio desktop windows... [DONE]', style: 'normal' },
        { text: '2. Wire Formspree contact endpoint... [DONE]', style: 'normal' },
        { text: '3. WAIT... WHERE IS THE GAME?? I forgot to add a game!', style: 'highlight' },
        { text: '4. Secretly hiding SYSTEM OVERRIDE cybersecurity challenge.', style: 'secondary' },
        { text: "   Access key: 'override'", style: 'tip' },
        { text: '------------------------------------------------------------', style: 'muted' }
      ]
    };
  }

  // Clean command without sudo prefix for matching
  const cleanCmd = lower.replace(/^sudo\s+/, '').trim();

  // Launching the hidden game directly via terminal
  const isDirectGameCmd = [
    'override',
    'system-override',
    'system override',
    'system_override',
    'system_override.bin',
    './system_override.bin',
    'override.bin',
    './override',
    './override.bin',
    './system-override',
    'game-start',
    'game',
    'play game',
    'play override',
    'run override',
    'run system-override',
    'run system override',
    'run system_override',
    'run system_override.bin',
    'run ./override',
    'run ./system_override.bin',
    'start override',
    'start system-override',
    'start system override',
    'start system_override',
    'start system_override.bin',
    'launch override',
    'launch system-override',
    'launch system override',
    'launch system_override',
    'launch system_override.bin'
  ].includes(cleanCmd);

  if (isDirectGameCmd) {
    unlockGamingAchievement();
    unlockAchievement('game-lover');
    triggerGameDiscoveredNotification();
    if (openApp) openApp('system-override');
    return {
      type: 'success',
      content: [
        { text: '>>> [SYSTEM OVERRIDE DETECTED] <<<', style: 'accent' },
        { text: 'Bypassing security barriers and mounting hidden challenge module...', style: 'highlight' },
        { text: '★ ACHIEVEMENT UNLOCKED: "Game Lover // Wait... Where\'s the Game?"', style: 'secondary' },
        { text: 'Launching AURA: SYSTEM OVERRIDE — The Hidden Gem.', style: 'tip' }
      ]
    };
  }

  if (['hint', 'hints'].includes(lower)) {
    const stage = getHintStage();
    advanceHintStage(2);
    unlockAchievement('hidden-discovery');
    return {
      type: 'success',
      content: [
        { text: '[AURA // SYSTEM DISCOVERY HINT]', style: 'accent' },
        { text: '"I built an entire operating system, added my projects, skills and achievements... but something important is still missing. 🤔"', style: 'highlight' },
        { text: "Try exploring system files or query 'notes' or 'override'.", style: 'tip' }
      ]
    };
  }

  // Open command: applications or specific projects
  if (lower.startsWith('open ') || lower.startsWith('project ') || lower.startsWith('projects ')) {
    const target = lower.replace(/^(open|projects|project)\s+/, '').trim();

    // Check project targets
    if (['dhruvnetra', 'dhruv netra', 'antarctic', 'antarctica'].includes(target)) {
      window.__aura_requested_project = 'dhruvnetra';
      window.dispatchEvent(new CustomEvent('aura:open-project', { detail: { projectId: 'dhruvnetra' } }));
      if (openApp) openApp('projects');
      recordProjectOpened('dhruvnetra');
      return {
        type: 'success',
        content: [{ text: 'Opening DhruvNetra 3D Digital Twin project dossier...', style: 'accent' }]
      };
    }

    if (['ai-voice-guard', 'aivoiceguard', 'voice guard', 'voiceguard', 'ai-project', 'ai project'].includes(target)) {
      window.__aura_requested_project = 'ai-project';
      window.dispatchEvent(new CustomEvent('aura:open-project', { detail: { projectId: 'ai-project' } }));
      if (openApp) openApp('projects');
      recordProjectOpened('ai-project');
      return {
        type: 'success',
        content: [{ text: 'Opening AI-Voice Guard deepfake defense dossier...', style: 'accent' }]
      };
    }

    if (['portfolio', '3d-portfolio', '3d portfolio', 'avatar', 'portfolio-website', 'portfolio website'].includes(target)) {
      window.__aura_requested_project = 'portfolio-website';
      window.dispatchEvent(new CustomEvent('aura:open-project', { detail: { projectId: 'portfolio-website' } }));
      if (openApp) openApp('projects');
      recordProjectOpened('portfolio-website');
      return {
        type: 'success',
        content: [{ text: 'Opening Interactive 3D Portfolio dossier...', style: 'accent' }]
      };
    }

    if (['aura', 'aura-os', 'aura os', 'system'].includes(target)) {
      window.__aura_requested_project = 'aura';
      window.dispatchEvent(new CustomEvent('aura:open-project', { detail: { projectId: 'aura' } }));
      if (openApp) openApp('projects');
      recordProjectOpened('aura');
      return {
        type: 'success',
        content: [{ text: 'Opening AURA OS architecture specification...', style: 'accent' }]
      };
    }

    const isGameTarget = [
      'override',
      'system-override',
      'system override',
      'system_override',
      'system_override.bin',
      'override.bin',
      './override',
      './system_override.bin',
      './override.bin',
      './system-override',
      'game'
    ].includes(target);

    if (isGameTarget) {
      unlockGamingAchievement();
      unlockAchievement('game-lover');
      triggerGameDiscoveredNotification();
      if (openApp) openApp('system-override');
      return {
        type: 'success',
        content: [
          { text: '>>> Launching hidden module: AURA: SYSTEM OVERRIDE <<<', style: 'accent' },
          { text: '★ ACHIEVEMENT UNLOCKED: "Game Lover"', style: 'secondary' }
        ]
      };
    }

    if (['about', 'projects', 'skills', 'achievements', 'resume', 'contact', 'terminal', 'explorer', 'settings'].includes(target)) {
      if (openApp) openApp(target);
      return {
        type: 'success',
        content: [{ text: `Opened application window: '${target}'`, style: 'accent' }]
      };
    }

    return {
      type: 'error',
      content: [
        { text: `open: unknown target '${target}'`, style: 'error' },
        { text: "Try 'open about', 'open projects', 'open dhruvnetra', 'open aivoiceguard', or 'open resume'.", style: 'muted' }
      ]
    };
  }

  // Suggest closest command if typo detected
  const suggestion = getClosestCommand(lower);
  const suggestionLines = [
    { text: `bash: command not found: '${rawCommand}'`, style: 'error' }
  ];
  if (suggestion) {
    suggestionLines.push({ text: `Did you mean '${suggestion}'? Type 'help' for manual.`, style: 'tip' });
  } else {
    suggestionLines.push({ text: "Type 'help' for a list of available commands.", style: 'muted' });
  }

  return {
    type: 'error',
    content: suggestionLines
  };
}
