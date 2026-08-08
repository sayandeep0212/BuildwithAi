import React, { useState, useEffect } from 'react';
import { MoodType, UserProfile } from '../types';
import { audioEngine } from '../utils/audioSynth';

interface HomeViewProps {
  user: UserProfile;
  selectedMood: MoodType | null;
  onLogMood: (mood: MoodType) => void;
  onNavigateToTimer: () => void;
  onNavigateToMindful: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  selectedMood,
  onLogMood,
  onNavigateToTimer,
  onNavigateToMindful,
}) => {
  const [breatheState, setBreatheState] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const startBreathingCycle = () => {
    if (breatheState !== 'idle') return;

    audioEngine.playChime();
    setBreatheState('inhale');

    const timer1 = setTimeout(() => {
      setBreatheState('hold');
    }, 3000);

    const timer2 = setTimeout(() => {
      setBreatheState('exhale');
    }, 5000);

    const timer3 = setTimeout(() => {
      setBreatheState('idle');
      audioEngine.playChime();
      setFeedbackMsg('Your breath is centered. Take this calmness into your day.');
      setTimeout(() => setFeedbackMsg(null), 4000);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleMoodSelect = (mood: MoodType) => {
    onLogMood(mood);
    const messages: Record<MoodType, string> = {
      calm: "Peace recorded. Stay in this gentle flow.",
      tired: "Noted. Remember to take a short refresh break today.",
      stressed: "You are doing enough. Try a 2-minute stretch in the timer tab.",
      focused: "Sharp and clear. Let's make progress on your focus goals.",
      anxious: "Breathe deeply. Your sanctuary is here whenever you need to ground.",
    };
    setFeedbackMsg(messages[mood]);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <main className="max-w-[900px] mx-auto px-4 sm:px-6 pt-4 pb-28 md:pb-12 flex flex-col items-center relative z-10">
      {/* Ambient Gradient Glow Background */}
      <div
        className="fixed inset-0 pointer-events-none z-[-1]"
        style={{
          background:
            'radial-gradient(circle at 50% 20%, rgba(204, 234, 206, 0.45) 0%, rgba(246, 251, 244, 0) 70%)',
        }}
      />

      {/* Main Sanctuary Heading */}
      <div className="text-center mb-6 sm:mb-8 max-w-lg">
        <h2 className="font-display text-2xl sm:text-3xl text-on-surface mb-1.5 font-bold tracking-tight">
          Take a moment for yourself.
        </h2>
        <p className="text-sm text-on-surface-variant">
          Your mind is a sanctuary. Pause, breathe, and reflect.
        </p>
      </div>

      {/* Interactive Breathe Button with Pulsing Aura */}
      <div className="relative w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center mb-6 sm:mb-8 group cursor-pointer">
        <div className="absolute inset-0 bg-primary-container rounded-full opacity-20 breathe-animation" />
        <div
          className="absolute inset-3 bg-primary-fixed rounded-full opacity-40 breathe-animation"
          style={{ animationDelay: '1s' }}
        />

        <button
          onClick={startBreathingCycle}
          className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 bg-primary text-on-primary rounded-full ambient-shadow flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-105 active:scale-95 shadow-lg"
        >
          <span className="material-symbols-outlined text-3xl sm:text-4xl mb-1" style={{ fontVariationSettings: "'FILL' 0" }}>
            air
          </span>
          <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold">
            {breatheState === 'idle' && 'Breathe'}
            {breatheState === 'inhale' && 'Inhale...'}
            {breatheState === 'hold' && 'Hold...'}
            {breatheState === 'exhale' && 'Exhale...'}
          </span>
        </button>
      </div>

      {/* Feedback Message Toast */}
      {feedbackMsg && (
        <div className="mb-6 px-5 py-2 rounded-full bg-primary-container/40 text-on-primary-container text-xs sm:text-sm font-medium animate-fade-in text-center max-w-md border border-primary-container/60 shadow-sm">
          ✨ {feedbackMsg}
        </div>
      )}

      {/* Mood Check-In Section */}
      <div className="w-full max-w-md mb-6 sm:mb-8">
        <p className="text-center text-[11px] text-on-surface-variant mb-3 uppercase tracking-widest font-semibold">
          How are you feeling?
        </p>
        <div className="flex justify-center gap-2.5 sm:gap-4">
          {/* Calm */}
          <button
            onClick={() => handleMoodSelect('calm')}
            className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl mood-shadow transition-all duration-200 ${
              selectedMood === 'calm'
                ? 'bg-primary-container/50 ring-2 ring-primary scale-105'
                : 'bg-surface-container-lowest hover:bg-surface-container-low border border-surface-variant/30'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                spa
              </span>
            </div>
            <span className="text-xs text-on-surface font-medium">Calm</span>
          </button>

          {/* Tired */}
          <button
            onClick={() => handleMoodSelect('tired')}
            className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl mood-shadow transition-all duration-200 ${
              selectedMood === 'tired'
                ? 'bg-secondary-container/60 ring-2 ring-secondary scale-105'
                : 'bg-surface-container-lowest hover:bg-surface-container-low border border-surface-variant/30'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                battery_0_bar
              </span>
            </div>
            <span className="text-xs text-on-surface font-medium">Tired</span>
          </button>

          {/* Stressed */}
          <button
            onClick={() => handleMoodSelect('stressed')}
            className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-2xl mood-shadow transition-all duration-200 ${
              selectedMood === 'stressed'
                ? 'bg-error-container/70 ring-2 ring-error scale-105'
                : 'bg-surface-container-lowest hover:bg-surface-container-low border border-surface-variant/30'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-error-container/50 text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </div>
            <span className="text-xs text-on-surface font-medium">Stressed</span>
          </button>
        </div>
      </div>

      {/* Quick Actions & Sanctuary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-md">
        <button
          onClick={onNavigateToTimer}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group text-left border border-surface-variant/40 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary-container text-on-primary-container">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                timer
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-on-surface">Focus Timer</h4>
              <p className="text-[11px] text-on-surface-variant">25:00 Deep Work</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform text-lg">
            chevron_right
          </span>
        </button>

        <button
          onClick={onNavigateToMindful}
          className="flex items-center justify-between p-3.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors group text-left border border-surface-variant/40 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-secondary-container text-on-secondary-container">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                headphones
              </span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-on-surface">Mindful Library</h4>
              <p className="text-[11px] text-on-surface-variant">Focus Soundscapes</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform text-lg">
            chevron_right
          </span>
        </button>
      </div>
    </main>
  );
};
