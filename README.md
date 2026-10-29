# AURA — Aadhish's Unified Runtime Architecture

> An interactive, browser-based desktop environment presenting the engineering portfolio and developer workstation of **Aadhish Saini** through simulated operating-system interfaces.

[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald)](LICENSE)

---

## 🖥️ Project Overview

**AURA (Aadhish's Unified Runtime Architecture)** reimagines the personal developer portfolio as a fully interactive simulated desktop environment. Designed with inspiration from modern high-performance operating systems and developer terminals, AURA greets visitors with an authentic UEFI boot sequence, an orbital ring loader, diagnostic telemetry, a session sign-in gate, and a complete multi-window desktop interface.

Visitors can explore developer projects, technical skills, verified achievements, and contact channels by launching applications from desktop shortcuts, a curated taskbar, or an interactive terminal CLI shell.

---

## ✨ Implemented Features

### 1. Cinematic UEFI Boot Sequence
- **Realistic Telemetry Pipeline**: Multi-phase boot sequence displaying kernel initialization, microcode loading, filesystem mounting, and runtime launch stages.
- **5-Dot Orbital Loader**: Authentic Windows-inspired orbital ring animation with velocity curve deceleration.
- **Interactive Controls**: Clickable kernel monogram logo to reboot the system at any time; `ESC` or `F8` keyboard shortcuts to skip boot diagnostics directly.
- **Telemetry Footer**: Real-time diagnostic bar displaying boot channel, startup mode, and workstation build.

### 2. Session Sign-in & Welcome Screen
- **User Gate**: Glassmorphism session greeting with user avatar, status indicator, and workspace entry button.
- **Smooth Transition**: Interactive launch button with loading spinner that mounts the full desktop workstation compositor.

### 3. Simulated Desktop Environment
- **Multi-Window Compositor**:
  - Independent movable windows with smooth header dragging.
  - Minimize, maximize/restore, and close window controls.
  - Active window focus management and z-index depth stacking.
- **Desktop Rail & Icons**: High-contrast icon shortcuts with custom badge imagery (`public/icons/`) and hover elevation effects.
- **Desktop Watermark**: Authentic OS build stamp (`AURA // BUILD 26100.WORKSTATION.2025 // STABLE_CHANNEL`).
- **Interactive Welcome Widget**: Real-time developer status indicator, bio quote, hardware telemetry tile, and quick action launch buttons.

### 4. Taskbar & Start Launcher
- **AURA Start Menu**: Windows-style launcher featuring search filtering, developer profile badge, quick application grid, system settings access, and reboot action.
- **Active Taskbar**: Pinned application shortcuts, active open window pills with focus indicators, system status, and live UTC/local clock.
- **Top System Bar**: Quick application links, connection telemetry (`127.0.0.1`), theme toggle, and system reboot button.

### 5. Nine Dedicated Applications
1. **About Me (`about`)**: Developer identity specification, background abstract, current engineering focus, technical interests, and methodology.
2. **Projects (`projects`)**: Interactive repository browser showcasing featured software, architecture breakdown, engineering highlights, and direct repository links.
3. **Skills (`skills`)**: Hardware and software proficiency matrix covering Programming (Python, JavaScript, C++), Frontend, Databases, and Applied AI/LLM orchestration.
4. **Honors (`achievements`)**: Verified competition honors, including Internal College Hackathon (Rank 7 / 63 teams).
5. **Resume (`resume`)**: Clean ATS-formatted curriculum vitae viewer with skill highlights, education history, and downloadable summary.
6. **Transmission / Contact (`contact`)**: Direct communication hub with interactive contact form, transmission channels, and social links.
7. **Terminal CLI (`terminal`)**: Interactive Bash-style web shell (`guest@aura:~$`) featuring:
   - Command history navigation (`ArrowUp` / `ArrowDown`).
   - Rich internal commands: `help`, `about`, `projects`, `skills`, `achievements`, `contact`, `resume`, `date`, `whoami`, `neofetch`, `sudo unlock`, and `clear`.
   - ASCII system badge and telemetry via `neofetch`.
8. **File Explorer (`explorer`)**: Hierarchical virtual filesystem (`/AURA_FS`) with breadcrumb navigation, folder traversal, and file-to-app launches.
9. **Settings (`settings`)**: Appearance preferences, theme engine switcher, and hardware/system specifications.

### 6. Dual Theme System
- **AURA Obsidian Dark**: Deep terminal black (`#050706`) with neon emerald accents (`#34d399`), custom glow effects, and subtle grid backdrops.
- **VS Code Light**: High-contrast modern workstation theme with clean alabaster cards and cobalt blue accents.
- **Persistence**: Theme selection persists automatically across sessions in `localStorage`.

---

## 🔮 Planned / Future Features

The following features are roadmap items planned for future releases:
- [ ] Sound synthesis engine for authentic boot chimes, window clicks, and terminal key clacks.
- [ ] Fullscreen toggle shortcut (`F11`) with persistent desktop layout.
- [ ] Window snap-to-edge docking (split left / split right).
- [ ] Additional virtual command-line utilities (`curl`, `cat`, `grep`, `ping`).
- [ ] Interactive live demos embedded within project modal windows.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Bundler & Tooling** | [Vite 6](https://vitejs.dev/) |
| **Styling** | Vanilla CSS + [Tailwind CSS 3](https://tailwindcss.com/) with CSS Custom Properties |
| **Typography** | [Geist](https://vercel.com/font), [JetBrains Mono](https://www.jetbrains.com/lp/mono/) |
| **Icons** | [Lucide React](https://lucide.dev/) + Custom High-Res Application Badges |
| **Language** | JavaScript (ESNext / JSX) |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aadhishsaini/aura-portfolio.git
   cd aura-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000` (or the port specified in terminal output).

### Production Build
Compile the optimized production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## ⌨️ Controls & Keyboard Shortcuts

| Shortcut / Action | Context | Description |
|---|---|---|
| `ESC` / `F8` | Boot Screen | Skip boot sequence diagnostics and jump immediately to Welcome screen |
| Click Kernel Logo | Boot Screen | Re-trigger kernel boot cycle |
| Click Reboot Button | System Bar / Start Menu | Soft-reboot AURA back to the initial UEFI boot screen |
| `ArrowUp` / `ArrowDown` | Terminal CLI | Cycle through previous command execution history |
| `help` | Terminal CLI | List all available shell commands |
| `neofetch` | Terminal CLI | Render ASCII system telemetry badge |
| Click Window Titlebar | Desktop Windows | Drag and position window anywhere on the canvas |
| Double Click Window Header | Desktop Windows | Maximize or restore window dimensions |

---

## 📂 Project Structure

```text
├── public/
│   ├── icons/                   # Custom high-res application icons (about me, projects, skills, etc.)
│   └── favicon.ico              # System favicon
├── src/
│   ├── components/
│   │   ├── applications/        # 9 desktop application views
│   │   │   ├── AboutApp.jsx
│   │   │   ├── ContactApp.jsx
│   │   │   ├── FileExplorerApp.jsx
│   │   │   ├── HonorsApp.jsx
│   │   │   ├── ProjectsApp.jsx
│   │   │   ├── ResumeApp.jsx
│   │   │   ├── SettingsApp.jsx
│   │   │   ├── SkillsApp.jsx
│   │   │   └── TerminalApp.jsx
│   │   ├── common/              # Shared icon resolvers & utility components
│   │   │   └── AppIcon.jsx
│   │   ├── desktop/             # Desktop environment compositor
│   │   │   ├── AppWindow.jsx    # Movable window frame & controls
│   │   │   ├── Desktop.jsx      # Main desktop canvas & state manager
│   │   │   ├── StartMenu.jsx    # Start launcher menu
│   │   │   ├── SystemBar.jsx    # Top system status bar
│   │   │   ├── Taskbar.jsx      # Bottom taskbar & active apps
│   │   │   └── WelcomeWidget.jsx# Desktop telemetry widget
│   │   ├── BootProgress.jsx     # UEFI boot progress bar
│   │   ├── BootScreen.jsx       # Root boot screen container
│   │   ├── BootStatus.jsx       # Diagnostic status text
│   │   ├── BrandLogo.jsx        # Geometric kernel monogram
│   │   ├── OrbitalLoader.jsx    # 5-dot orbital ring loader
│   │   ├── SystemFooter.jsx     # Diagnostic watermark bar
│   │   ├── SystemHeader.jsx     # Top boot bar
│   │   └── WelcomeOverlay.jsx   # Session sign-in modal
│   ├── config/
│   │   ├── desktopApps.js       # App registry, window geometry & icon routes
│   │   ├── portfolioData.js     # Centralized developer portfolio content & projects
│   │   └── terminalCommands.js  # Terminal shell command dispatch & neofetch output
│   ├── hooks/
│   │   ├── useBootSequence.js   # State-driven bootloader hook
│   │   └── useTheme.js          # Dual theme engine & localStorage sync
│   ├── styles/
│   │   ├── index.css            # Base typography & design tokens
│   │   ├── boot.css             # UEFI animations & orbital keyframes
│   │   └── desktop.css          # Window compositor styles & panel blurs
│   ├── App.jsx                  # Root state coordinator (Boot <-> Desktop)
│   └── main.jsx                 # Application entry point
├── .gitignore                   # Production git ignore rules
├── index.html                   # HTML entry point with metadata & web fonts
├── package.json                 # Project configuration (aura-portfolio)
├── tailwind.config.js           # Tailwind configuration
└── vite.config.js               # Vite build configuration
```

---

## 👨‍💻 Developer & Author

**Aadhish Saini**  
- GitHub: [@aadhishsaini](https://github.com/aadhishsaini)  
- Focus: AI Development, LLM Orchestration & Web Architecture  

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
