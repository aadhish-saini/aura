import React, { useState, useEffect } from 'react';
import IntroScreen from './IntroScreen';
import SystemOverrideHUD from './SystemOverrideHUD';
import Mission1InitialAccess from './Mission1InitialAccess';
import Mission2CipherTrace from './Mission2CipherTrace';
import Mission3NetworkRecon from './Mission3NetworkRecon';
import Mission4SecurityProtocol from './Mission4SecurityProtocol';
import Mission5SystemOverride from './Mission5SystemOverride';
import DeveloperArchiveModal from './DeveloperArchiveModal';

import {
  getOverrideSave,
  saveOverrideProgress,
  resetOverrideProgress,
  unlockGamingAchievement,
} from '../../../utils/easterEggManager';
import { triggerGameCompletedNotification } from '../../../utils/notificationManager';

const MISSION_HINTS = {
  1: [
    'Inspect the inbound packet telemetry and the port knocking history logged in the firewall.',
    'Examine the multiplier between consecutive port hops (1024 to 2048 to 4096). For the parity value, check the binary bitmask notation 00101010_2.',
    'Calculate the next value in the doubling port progression. For parity, sum the base-2 place values corresponding to the set bits in 00101010 (bits at positions 32, 8, and 2).'
  ],
  2: [
    'The security daemon is broadcasting with a rotational Caesar substitution cipher where letters are shifted uniformly.',
    'Look at the length of this operating system\'s name (A-U-R-A) to deduce the rotation key.',
    'Reverse the Caesar cipher by shifting each letter backward in the alphabet by the number of letters in AURA. Use the tuner slider to visually confirm English words.'
  ],
  3: [
    'Review the subnet topology map. Only genuine communication relay nodes lead safely to the Core Gateway.',
    'Analyze the fourth octet of the IP addresses. Legitimate nodes follow a specific mathematical sequence, while odd-numbered nodes act as IDS tripwires.',
    'Begin at the entry node (10.0.4.12) and select nodes where each hop doubles the previous host octet until reaching the gateway.'
  ],
  4: [
    'Both the memory buffer sequence and the logic gate monitor must be satisfied simultaneously.',
    'Find the 3-byte target sequence within the 4x4 hex matrix, and consult the XOR gate truth table for Gate Alpha and Beta.',
    'Click the required 3 bytes into the buffer in exact order. For the XOR parity to evaluate to true, ensure Gate Alpha and Gate Beta are set to opposite states (one HIGH and one LOW).'
  ],
  5: [
    'Synthesize the access credentials acquired from all four previous missions into the exploit payload, then align the kernel clock.',
    'Recall your solutions: the 4th port from M1, the cipher phrase from M2, the gateway IP from M3, and the protocol hash from M4. Use the sliders to match the dynamic wave with the carrier wave.',
    'Enter each token into its respective slot: the 4-digit port number, the uppercase passphrase, the 10.0.4.x gateway IP, and the 0x-prefixed hash. Fine-tune Frequency and Phase sliders until harmonic synchronization exceeds 92%.'
  ]
};

export default function SystemOverrideApp({ openApp }) {
  const [gameState, setGameState] = useState(() => getOverrideSave());
  const [view, setView] = useState('intro'); // 'intro' | 'game' | 'archive'

  useEffect(() => {
    // Ensure achievement is registered upon mounting the hidden game
    unlockGamingAchievement();
  }, []);

  const handleStartOperation = () => {
    setView('game');
  };

  const handleFailAttempt = () => {
    setGameState((prev) => {
      const updated = {
        ...prev,
        attempts: prev.attempts + 1,
        score: Math.max(100, prev.score - 25),
      };
      saveOverrideProgress(updated);
      return updated;
    });
  };

  const handleUseHint = () => {
    setGameState((prev) => {
      const updated = {
        ...prev,
        hintsUsed: prev.hintsUsed + 1,
        score: Math.max(100, prev.score - 50),
      };
      saveOverrideProgress(updated);
      return updated;
    });
  };

  const handleMission1Complete = ({ port }) => {
    setGameState((prev) => {
      const completed = Array.from(new Set([...prev.completedMissions, 1]));
      const updated = {
        ...prev,
        currentMission: 2,
        completedMissions: completed,
        score: prev.score + 200,
        tokens: { ...prev.tokens, port },
      };
      saveOverrideProgress(updated);
      return updated;
    });
  };

  const handleMission2Complete = ({ cipher }) => {
    setGameState((prev) => {
      const completed = Array.from(new Set([...prev.completedMissions, 2]));
      const updated = {
        ...prev,
        currentMission: 3,
        completedMissions: completed,
        score: prev.score + 200,
        tokens: { ...prev.tokens, cipher },
      };
      saveOverrideProgress(updated);
      return updated;
    });
  };

  const handleMission3Complete = ({ gateway }) => {
    setGameState((prev) => {
      const completed = Array.from(new Set([...prev.completedMissions, 3]));
      const updated = {
        ...prev,
        currentMission: 4,
        completedMissions: completed,
        score: prev.score + 200,
        tokens: { ...prev.tokens, gateway },
      };
      saveOverrideProgress(updated);
      return updated;
    });
  };

  const handleMission4Complete = ({ hash }) => {
    setGameState((prev) => {
      const completed = Array.from(new Set([...prev.completedMissions, 4]));
      const updated = {
        ...prev,
        currentMission: 5,
        completedMissions: completed,
        score: prev.score + 200,
        tokens: { ...prev.tokens, hash },
      };
      saveOverrideProgress(updated);
      return updated;
    });
  };

  const handleMission5Complete = () => {
    setGameState((prev) => {
      const completed = Array.from(new Set([...prev.completedMissions, 5]));
      const updated = {
        ...prev,
        completedMissions: completed,
        archiveUnlocked: true,
        score: prev.score + 500,
      };
      saveOverrideProgress(updated);
      return updated;
    });
    triggerGameCompletedNotification();
    setView('archive');
  };

  const handleReset = () => {
    if (window.confirm('Reset all mission progress for SYSTEM OVERRIDE?')) {
      const fresh = resetOverrideProgress();
      setGameState(fresh);
      setView('intro');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050914] text-slate-100 select-text overflow-hidden font-sans relative">
      {view === 'intro' ? (
        <IntroScreen onStart={handleStartOperation} />
      ) : (
        <>
          <SystemOverrideHUD
            activeMission={gameState.currentMission}
            completedMissions={gameState.completedMissions}
            score={gameState.score}
            attempts={gameState.attempts}
            hintsUsed={gameState.hintsUsed}
            currentMissionHints={MISSION_HINTS[gameState.currentMission]}
            onSelectMission={(mId) =>
              setGameState((prev) => ({ ...prev, currentMission: mId }))
            }
            onUseHint={handleUseHint}
            onResetGame={handleReset}
          />

          <main className="flex-1 overflow-y-auto flex flex-col justify-between">
            {gameState.currentMission === 1 && (
              <Mission1InitialAccess
                onComplete={handleMission1Complete}
                onFailAttempt={handleFailAttempt}
              />
            )}
            {gameState.currentMission === 2 && (
              <Mission2CipherTrace
                onComplete={handleMission2Complete}
                onFailAttempt={handleFailAttempt}
              />
            )}
            {gameState.currentMission === 3 && (
              <Mission3NetworkRecon
                onComplete={handleMission3Complete}
                onFailAttempt={handleFailAttempt}
              />
            )}
            {gameState.currentMission === 4 && (
              <Mission4SecurityProtocol
                onComplete={handleMission4Complete}
                onFailAttempt={handleFailAttempt}
              />
            )}
            {gameState.currentMission === 5 && (
              <Mission5SystemOverride
                onComplete={handleMission5Complete}
                onFailAttempt={handleFailAttempt}
              />
            )}
          </main>
        </>
      )}

      {/* Developer Archive Modal */}
      {view === 'archive' && (
        <DeveloperArchiveModal
          score={gameState.score}
          attempts={gameState.attempts}
          onClose={() => setView('game')}
          onReplay={() => {
            resetOverrideProgress();
            setGameState(getOverrideSave());
            setView('game');
          }}
        />
      )}
    </div>
  );
}

