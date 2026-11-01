import { useState, useEffect, useRef, useCallback } from 'react';

export const BOOT_STAGES = [
  {
    progress: 18,
    main: "Starting AURA...",
    sub: "Stage 1/4 // Initializing kernel & CPU microcode"
  },
  {
    progress: 46,
    main: "Mounting developer workspace...",
    sub: "Stage 2/4 // Mounting NVMe filesystems & passkeys"
  },
  {
    progress: 76,
    main: "Loading runtime components...",
    sub: "Stage 3/4 // Spawning Node.js & language servers"
  },
  {
    progress: 94,
    main: "Preparing developer desktop...",
    sub: "Stage 4/4 // Launching Window Compositor & UX"
  },
  {
    progress: 100,
    main: "Ready...",
    sub: "Finalizing boot telemetry"
  }
];

export function useBootSequence({ onComplete } = {}) {
  const [progress, setProgress] = useState(12);
  const [stageIndex, setStageIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const timerRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const isCompletedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete ref up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Keep ref in sync with state for event listeners
  useEffect(() => {
    isCompletedRef.current = isCompleted;
  }, [isCompleted]);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  const completeBoot = useCallback((immediate = false) => {
    if (isCompletedRef.current) return;
    isCompletedRef.current = true;
    setIsCompleted(true);
    clearTimers();

    setProgress(100);
    setStageIndex(BOOT_STAGES.length - 1);

    // Transition directly to the desktop once booting finishes
    transitionTimeoutRef.current = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, immediate ? 120 : 450);
  }, [clearTimers]);

  const startBoot = useCallback(() => {
    clearTimers();
    isCompletedRef.current = false;
    setIsCompleted(false);
    setProgress(10);
    setStageIndex(0);

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          completeBoot();
          return 100;
        }

        // Deliberate, smooth non-linear progression (5-7 seconds total)
        let increment = 1.2;
        if (prev < 25) {
          increment = 1.1 + Math.random() * 0.9;
        } else if (prev < 55) {
          increment = 1.4 + Math.random() * 1.3;
        } else if (prev < 85) {
          increment = 1.0 + Math.random() * 0.9;
        } else {
          increment = 0.7 + Math.random() * 0.8;
        }

        const next = Math.min(100, prev + increment);

        // Update stage based on progress threshold
        setStageIndex((prevStage) => {
          if (prevStage < BOOT_STAGES.length - 1 && next >= BOOT_STAGES[prevStage].progress) {
            return prevStage + 1;
          }
          return prevStage;
        });

        if (next >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          completeBoot();
          return 100;
        }

        return next;
      });
    }, 90);
  }, [clearTimers, completeBoot]);

  // Restart boot
  const restartBoot = useCallback(() => {
    startBoot();
  }, [startBoot]);

  // Handle Logo click (only restarts if not completed)
  const handleLogoClick = useCallback(() => {
    if (!isCompletedRef.current) {
      restartBoot();
    }
  }, [restartBoot]);

  // Global keyboard shortcuts (ESC, F8)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'F8') {
        if (!isCompletedRef.current) {
          e.preventDefault();
          completeBoot(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [completeBoot]);

  // Start initial boot sequence on mount
  useEffect(() => {
    startBoot();
    return () => {
      clearTimers();
    };
  }, [startBoot, clearTimers]);

  const currentStage = BOOT_STAGES[stageIndex] || BOOT_STAGES[0];

  return {
    progress: Math.round(progress),
    rawProgress: progress,
    currentStage,
    stageIndex,
    isCompleted,
    restartBoot,
    completeBoot,
    handleLogoClick,
  };
}
