"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function Pomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Optional: Play a sound here
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-2 mb-3">
        <button 
          onClick={() => { setMode('work'); setTimeLeft(25 * 60); setIsActive(false); }}
          className={`text-xs px-2 py-1 rounded ${mode === 'work' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Work
        </button>
        <button 
          onClick={() => { setMode('break'); setTimeLeft(5 * 60); setIsActive(false); }}
          className={`text-xs px-2 py-1 rounded ${mode === 'break' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
        >
          Break
        </button>
      </div>
      <div className="text-4xl font-mono font-bold tracking-widest text-white mb-4">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-4">
        <button 
          onClick={toggleTimer}
          className="w-10 h-10 rounded-full bg-surface-hover border border-border flex items-center justify-center text-white hover:bg-border transition-colors"
        >
          {isActive ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
        <button 
          onClick={resetTimer}
          className="w-10 h-10 rounded-full bg-surface-hover border border-border flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <RotateCcw size={18} />
        </button>
      </div>
    </div>
  );
}
