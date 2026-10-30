import React, { useState, useEffect, useRef } from 'react';
import { executeTerminalCommand } from '../../config/terminalCommands';

export default function TerminalApp({ openApp }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      content: [
        { text: 'AURA Developer Kernel v4.19-generic (wasm32)', style: 'muted' },
        { text: "Welcome to AURA Terminal. Type 'help' for available commands.", style: 'secondary' },
        { text: "Try running: 'about', 'projects', 'skills', 'neofetch', or 'sudo unlock'", style: 'muted' }
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep input focused
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      if (!cmd) return;

      // Add to command history list
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);

      // Execute command
      const response = executeTerminalCommand(cmd, {
        openApp,
        clearOutput: () => setHistory([])
      });

      if (response.type !== 'cleared') {
        setHistory((prev) => [
          ...prev,
          {
            type: 'user',
            command: cmd,
            response
          }
        ]);
      }

      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(commandHistory[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx] || '');
      }
    }
  };

  const renderStyledText = (item, idx) => {
    let colorClass = 'text-white';
    if (item.style === 'muted') colorClass = 'text-neutral-500';
    if (item.style === 'accent') colorClass = 'text-sky-400 font-semibold';
    if (item.style === 'secondary') colorClass = 'text-cyan-300';
    if (item.style === 'highlight') colorClass = 'text-neutral-200';
    if (item.style === 'quote') colorClass = 'text-neutral-300 italic';
    if (item.style === 'tip') colorClass = 'text-amber-300/80 text-[11px]';
    if (item.style === 'error') colorClass = 'text-red-400';

    return (
      <div key={idx} className={`${colorClass} leading-relaxed break-words font-mono`}>
        {item.text}
      </div>
    );
  };

  return (
    <div
      onClick={handleContainerClick}
      className="flex flex-col h-full bg-[#07070d] text-neutral-200 font-mono text-xs select-text overflow-hidden cursor-text"
    >
      {/* Terminal Output Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            {entry.type === 'user' && (
              <div className="flex items-center gap-2">
                <span className="text-sky-400 font-semibold select-none">
                  guest@aura:~$
                </span>
                <span className="text-white font-medium">{entry.command}</span>
              </div>
            )}

            {entry.type === 'system' && (
              <div className="space-y-0.5">
                {entry.content.map((item, i) => renderStyledText(item, i))}
              </div>
            )}

            {entry.response && entry.response.content && (
              <div className="pl-2 border-l border-sky-900/50 space-y-0.5 py-1">
                {entry.response.content.map((item, i) => renderStyledText(item, i))}
              </div>
            )}
          </div>
        ))}

        {/* Input prompt line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-sky-400 font-semibold select-none">
            guest@aura:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-transparent text-white outline-none border-none p-0 font-mono text-xs caret-sky-400"
            placeholder="Type a command (try 'help')..."
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Terminal status line */}
      <div className="h-6 px-3 bg-[#050806] border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 font-mono select-none">
        <span>BASH 4.19 // UTF-8</span>
        <span>TYPE 'HELP' FOR MANUAL</span>
      </div>
    </div>
  );
}
