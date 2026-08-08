import React, { useState, useEffect, useRef } from 'react';
import { TimerSettings } from '../types';
import { audioEngine } from '../utils/audioSynth';

interface TimerViewProps {
  settings: TimerSettings;
  onOpenStretchModal: () => void;
  onSessionComplete: (mode: 'focus' | 'refresh', durationMinutes: number) => void;
}

export const TimerView: React.FC<TimerViewProps> = ({
  settings,
  onOpenStretchModal,
  onSessionComplete,
}) => {
  const [mode, setMode] = useState<'focus' | 'refresh'>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(settings.focusMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const totalTime = (mode === 'focus' ? settings.focusMinutes : settings.refreshMinutes) * 60;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // When mode changes, update time left
  useEffect(() => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    const newTotal = (mode === 'focus' ? settings.focusMinutes : settings.refreshMinutes) * 60;
    setTimeLeft(newTotal);
  }, [mode, settings.focusMinutes, settings.refreshMinutes]);

  // Countdown effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            if (settings.soundEnabled) {
              audioEngine.playChime();
            }
            onSessionComplete(
              mode,
              mode === 'focus' ? settings.focusMinutes : settings.refreshMinutes
            );
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, settings, onSessionComplete]);

  // SVG Progress circle calculation
  const circumference = 301.59;
  const strokeDashoffset = circumference - (timeLeft / totalTime) * circumference;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTogglePlay = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
  };

  const handleSkip = () => {
    setIsRunning(false);
    const nextMode = mode === 'focus' ? 'refresh' : 'focus';
    setMode(nextMode);
  };

  return (
    <main
      className={`max-w-[900px] mx-auto px-6 pt-8 pb-32 min-h-screen flex flex-col items-center justify-center relative z-10 transition-colors duration-1000 ${
        mode === 'refresh' ? 'refresh-mode' : ''
      }`}
    >
      {/* Mode Switcher Pills */}
      <div className="flex space-x-2 bg-surface-container-high rounded-full p-1 mb-12 shadow-sm">
        <button
          onClick={() => setMode('focus')}
          className={`px-6 py-2 rounded-full font-label-sm text-xs font-semibold transition-all duration-300 ${
            mode === 'focus'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          Focus
        </button>
        <button
          onClick={() => setMode('refresh')}
          className={`px-6 py-2 rounded-full font-label-sm text-xs font-semibold transition-all duration-300 ${
            mode === 'refresh'
              ? 'bg-secondary text-on-secondary shadow-sm'
              : 'text-on-surface-variant hover:bg-surface-variant'
          }`}
        >
          Refresh
        </button>
      </div>

      {/* Timer Display Circle with SVG Progress Ring */}
      <div className="relative flex items-center justify-center w-64 h-64 md:w-80 md:h-80 rounded-full bg-surface-container-lowest timer-glow mb-12">
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="stroke-surface-container-highest"
            cx="50"
            cy="50"
            r="48"
            fill="none"
            strokeWidth="2.5"
          />
          <circle
            className={mode === 'focus' ? 'stroke-primary' : 'stroke-secondary'}
            cx="50"
            cy="50"
            r="48"
            fill="none"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        <div className="text-center z-10">
          <h1 className="font-display text-5xl md:text-6xl text-primary font-bold tracking-tight">
            {formatTime(timeLeft)}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 font-medium">
            {mode === 'focus' ? 'Deep work' : 'Breathe & reset'}
          </p>
        </div>
      </div>

      {/* Control Buttons (Replay, Play/Pause, Skip) */}
      <div className="flex items-center space-x-4 mb-12">
        {/* Reset / Replay */}
        <button
          onClick={handleReset}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-95"
          title="Reset timer"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
            replay
          </span>
        </button>

        {/* Play / Pause Toggle */}
        <button
          onClick={handleTogglePlay}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-on-primary shadow-lg hover:opacity-90 transition-all active:scale-95 ${
            mode === 'focus' ? 'bg-primary' : 'bg-secondary'
          }`}
          title={isRunning ? 'Pause' : 'Start'}
        >
          <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            {isRunning ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Skip Next */}
        <button
          onClick={handleSkip}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container text-on-surface-variant hover:bg-surface-variant transition-colors active:scale-95"
          title="Skip mode"
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
            skip_next
          </span>
        </button>
      </div>

      {/* Suggest a Stretch Button */}
      <button
        onClick={onOpenStretchModal}
        className="flex items-center space-x-2 px-6 py-3 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed transition-colors active:scale-95 shadow-sm font-medium text-xs"
      >
        <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>
          self_improvement
        </span>
        <span className="font-label-sm">Suggest a stretch</span>
      </button>
    </main>
  );
};
