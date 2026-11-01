import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function TaskbarCalendar({ isOpen, onClose }) {
  const containerRef = useRef(null);

  // Today reference
  const today = new Date();

  // Selected date (can be clicked in calendar)
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  // Currently viewed month/year
  const [viewDate, setViewDate] = useState(() => new Date());

  // Sync view date with today when opened
  useEffect(() => {
    if (isOpen) {
      setViewDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));
    }
  }, [isOpen]);

  // Handle outside click and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    const handleMouseDown = (e) => {
      // Don't close if clicking inside calendar or clicking the taskbar toggle button
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        !e.target.closest('#taskbar-clock-btn')
      ) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleTodayClick = (e) => {
    e.stopPropagation();
    const now = new Date();
    setSelectedDate(now);
    setViewDate(new Date(now.getFullYear(), now.getMonth(), 1));
  };

  const handleSelectDate = (dateObj) => {
    setSelectedDate(dateObj);
    // If user clicks a dimmed date from prev/next month, update the view as well
    if (dateObj.getMonth() !== viewMonth) {
      setViewDate(new Date(dateObj.getFullYear(), dateObj.getMonth(), 1));
    }
  };

  // Build calendar matrix (prev month tail, current month, next month head)
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 = Sun
  const daysInCurrentMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const cells = [];

  // Dimmed days from previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const date = new Date(viewYear, viewMonth - 1, day);
    cells.push({ day, date, isCurrentMonth: false });
  }

  // Days in current month
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(viewYear, viewMonth, day);
    cells.push({ day, date, isCurrentMonth: true });
  }

  // Dimmed days for next month (fill up to 35 or 42 cells)
  const totalSlots = cells.length > 35 ? 42 : 35;
  const remaining = totalSlots - cells.length;
  for (let day = 1; day <= remaining; day++) {
    const date = new Date(viewYear, viewMonth + 1, day);
    cells.push({ day, date, isCurrentMonth: false });
  }

  // Helper date comparisons
  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const monthYearLabel = viewDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const fullSelectedDateLabel = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-label="Windows Taskbar Calendar"
      className="fixed bottom-14 right-3 sm:right-4 z-50 w-76 sm:w-80 rounded-2xl border border-white/10 bg-[#080d1a]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-4 select-none font-sans text-xs animate-in fade-in slide-in-from-bottom-2 duration-150 motion-reduce:animate-none"
      style={{
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Header: Month & Year + Prev / Next Month Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <CalendarIcon size={14} className="text-cyan-400" />
          <span className="font-semibold text-white tracking-wide text-sm">
            {monthYearLabel}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
            title="Previous month"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95"
            title="Next month"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 text-center py-2 text-[10px] font-mono tracking-wider text-slate-400">
        {WEEKDAYS.map((wd) => (
          <div key={wd} className="py-1 font-semibold">
            {wd}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map(({ day, date, isCurrentMonth }, idx) => {
          const isTodayDate = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);

          return (
            <button
              key={`${date.toISOString()}-${idx}`}
              type="button"
              onClick={() => handleSelectDate(date)}
              className={`h-8 w-8 mx-auto rounded-lg text-xs font-mono flex items-center justify-center transition-all cursor-pointer relative ${
                isTodayDate
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.55)]'
                  : isSelected
                  ? 'bg-white/15 text-white font-semibold ring-1 ring-cyan-400/80 shadow-sm'
                  : isCurrentMonth
                  ? 'text-slate-200 hover:bg-white/10 hover:text-white'
                  : 'text-slate-600 hover:text-slate-400 hover:bg-white/5'
              }`}
              title={date.toDateString()}
              aria-label={date.toDateString()}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Footer: Full Selected Date + Today Shortcut */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
            SELECTED
          </span>
          <span className="font-medium text-white truncate" title={fullSelectedDateLabel}>
            {fullSelectedDateLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={handleTodayClick}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-semibold tracking-wider transition-all cursor-pointer active:scale-95"
          title="Return to today's date"
        >
          Today
        </button>
      </div>
    </div>
  );
}

