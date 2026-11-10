import React, { useState, useEffect } from 'react';

export default function BootStatus({ mainText, subText }) {
  const [displayText, setDisplayText] = useState(mainText);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (mainText !== displayText) {
      setFade(false);
      const timer = setTimeout(() => {
        setDisplayText(mainText);
        setFade(true);
      }, 160);
      return () => clearTimeout(timer);
    }
  }, [mainText, displayText]);

  return (
    <div className="h-10 mt-6 flex flex-col items-center justify-center select-none">
      <p
        className={`text-sm font-sans font-normal tracking-wide status-text-transition ${
          fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
        style={{ color: 'var(--color-text-substatus)' }}
      >
        {displayText}
      </p>
      <p
        className="text-[11px] font-mono tracking-widest mt-1 uppercase transition-opacity duration-300"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {subText}
      </p>
    </div>
  );
}
