import React, { useState } from 'react';
import BootScreen from './components/BootScreen';
import Desktop from './components/desktop/Desktop';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentView, setCurrentView] = useState('boot'); // 'boot' | 'desktop'

  /**
   * Navigation callback invoked when the user clicks "ENTER WORKSPACE"
   * from the WelcomeOverlay after the boot sequence completes.
   */
  const handleEnterWorkspace = () => {
    setCurrentView('desktop');
  };

  /**
   * Reboot system: returns back to the interactive boot sequence.
   */
  const handleReturnToBoot = () => {
    setCurrentView('boot');
  };

  return (
    <div className="w-full min-h-screen bg-black overflow-hidden font-sans">
      {currentView === 'boot' ? (
        <div className="w-full h-full animate-in fade-in duration-300">
          <BootScreen
            theme={theme}
            onToggleTheme={toggleTheme}
            onEnterWorkspace={handleEnterWorkspace}
          />
        </div>
      ) : (
        <div className="w-full h-full animate-in fade-in duration-300">
          <Desktop
            theme={theme}
            onToggleTheme={toggleTheme}
            onReturnToBoot={handleReturnToBoot}
          />
        </div>
      )}
    </div>
  );
}
