import React, { useState } from 'react';
import { MoodLog, JournalEntry, MoodType } from '../types';

interface JournalViewProps {
  moodLogs: MoodLog[];
  journalEntries: JournalEntry[];
  onAddJournalEntry: (text: string, moodTag?: MoodType) => void;
  onDeleteJournalEntry: (id: string) => void;
  onUpdateJournalEntryReflection: (id: string, reflection: string) => void;
  selectedMood: MoodType | null;
}

export const JournalView: React.FC<JournalViewProps> = ({
  moodLogs,
  journalEntries,
  onAddJournalEntry,
  onDeleteJournalEntry,
  onUpdateJournalEntryReflection,
  selectedMood,
}) => {
  const [thoughtText, setThoughtText] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<string | null>(null);
  const [activeDate, setActiveDate] = useState<number>(10); // Day 10 as per mockup default
  const [currentMonth, setCurrentMonth] = useState<string>('October 2023');

  const charCount = thoughtText.length;
  const maxChar = 150;

  const handleSaveThought = async () => {
    if (!thoughtText.trim()) return;
    onAddJournalEntry(thoughtText.trim(), selectedMood || 'calm');
    setThoughtText('');
  };

  const handleGetAiReflection = async (entry: JournalEntry) => {
    setIsGeneratingAi(entry.id);
    try {
      const res = await fetch('/api/ai/reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought: entry.text, mood: entry.moodTag || 'reflective' }),
      });
      const data = await res.json();
      if (data.reflection) {
        onUpdateJournalEntryReflection(entry.id, data.reflection);
      }
    } catch {
      onUpdateJournalEntryReflection(
        entry.id,
        'Taking time to observe your mind is an act of gentle courage. Rest well in this moment.'
      );
    } finally {
      setIsGeneratingAi(null);
    }
  };

  // Helper to get mood for a specific day in October 2023
  const getMoodForDay = (day: number): MoodType | null => {
    const formattedDate = `2023-10-${day.toString().padStart(2, '0')}`;
    const found = moodLogs.find((m) => m.date === formattedDate);
    return found ? found.mood : null;
  };

  const getMoodDotClass = (mood: MoodType | null) => {
    if (!mood) return 'mood-dot-empty';
    switch (mood) {
      case 'calm':
        return 'mood-dot-calm';
      case 'focused':
        return 'mood-dot-focused';
      case 'anxious':
      case 'stressed':
        return 'mood-dot-anxious';
      case 'tired':
        return 'mood-dot-tired';
      default:
        return 'mood-dot-empty';
    }
  };

  return (
    <main className="w-full max-w-[900px] mx-auto px-6 pt-8 pb-32 flex-grow flex flex-col gap-10">
      {/* Header */}
      <header className="text-center md:text-left space-y-1">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-2xl md:text-3xl text-primary font-bold">
          Your Journal
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          A quiet space to observe your thoughts.
        </p>
      </header>

      {/* Calendar Section */}
      <section className="bg-surface-container-low rounded-2xl p-6 md:p-8 glow-shadow border border-surface-variant/40">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentMonth('September 2023')}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
          >
            <span className="material-symbols-outlined text-2xl">chevron_left</span>
          </button>
          <h2 className="font-title-md text-title-md text-on-surface font-semibold">
            {currentMonth}
          </h2>
          <button
            onClick={() => setCurrentMonth('November 2023')}
            className="text-on-surface-variant hover:text-primary transition-colors p-1"
          >
            <span className="material-symbols-outlined text-2xl">chevron_right</span>
          </button>
        </div>

        {/* Days of Week Row */}
        <div className="grid grid-cols-7 gap-2 mb-4 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <span key={idx} className="font-label-sm text-xs text-outline font-semibold">
              {day}
            </span>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-3 text-center">
          {/* Empty offset days for October 2023 starting on Sunday */}
          {Array.from({ length: 11 }).map((_, i) => {
            const dayNum = i + 1;
            const mood = getMoodForDay(dayNum);
            const isSelected = activeDate === dayNum;

            return (
              <div
                key={dayNum}
                onClick={() => setActiveDate(dayNum)}
                className={`flex flex-col items-center gap-1 group cursor-pointer p-1.5 rounded-xl transition-all ${
                  isSelected ? 'bg-surface shadow-sm ring-1 ring-primary/40' : ''
                }`}
              >
                <span
                  className={`font-body-md text-sm transition-colors ${
                    isSelected ? 'text-primary font-bold' : 'text-on-surface-variant group-hover:text-primary'
                  }`}
                >
                  {dayNum}
                </span>
                <div
                  className={`w-3 h-3 rounded-full transition-transform group-hover:scale-125 ${
                    isSelected ? 'bg-primary-container animate-pulse' : getMoodDotClass(mood)
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Mood Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 border-t border-surface-container-highest pt-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full mood-dot-calm" />
            <span className="font-label-sm text-xs text-outline">Calm</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full mood-dot-focused" />
            <span className="font-label-sm text-xs text-outline">Focused</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full mood-dot-tired" />
            <span className="font-label-sm text-xs text-outline">Tired</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full mood-dot-anxious" />
            <span className="font-label-sm text-xs text-outline">Anxious</span>
          </div>
        </div>
      </section>

      {/* Daily Thought Section */}
      <section className="flex flex-col gap-4">
        <h3 className="font-title-md text-title-md text-on-surface font-semibold">
          One quiet thought for today
        </h3>

        <div className="relative">
          <textarea
            value={thoughtText}
            onChange={(e) => setThoughtText(e.target.value)}
            maxLength={maxChar}
            placeholder="I am feeling..."
            className="w-full bg-surface-container-low border-none rounded-2xl p-6 font-body-lg text-body-lg text-on-surface placeholder:text-outline-variant focus:ring-2 focus:ring-primary-container focus:bg-surface-bright transition-all resize-none shadow-sm h-40 outline-none"
          />
          <div
            id="charCount"
            className={`absolute bottom-4 right-6 font-label-sm text-xs ${
              charCount > 130 ? 'text-error font-semibold' : 'text-outline'
            }`}
          >
            {charCount} / {maxChar}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSaveThought}
            disabled={!thoughtText.trim()}
            className="bg-primary-container text-on-primary-container font-label-sm text-xs font-semibold rounded-full px-7 py-3 hover:opacity-90 transition-all glow-shadow active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">edit_note</span>
            Save Thought
          </button>
        </div>
      </section>

      {/* Saved Journal Thoughts History */}
      <section className="flex flex-col gap-4 mt-2">
        <h3 className="font-title-md text-title-md text-primary font-semibold">
          Recent Sanctuary Thoughts
        </h3>

        {journalEntries.length === 0 ? (
          <p className="text-sm text-outline italic">No thoughts saved yet. Write one above!</p>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant/40 flex flex-col gap-3 relative shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed">
                      {entry.date}
                    </span>
                    {entry.moodTag && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant capitalize">
                        {entry.moodTag}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onDeleteJournalEntry(entry.id)}
                    className="text-outline hover:text-error transition-colors p-1"
                    title="Delete entry"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>

                <p className="text-on-surface font-body-md text-base leading-relaxed">
                  "{entry.text}"
                </p>

                {/* AI Reflection Box */}
                {entry.aiReflection ? (
                  <div className="mt-1 p-3.5 rounded-xl bg-primary-container/20 border border-primary-container/30 text-xs text-on-primary-container flex items-start gap-2">
                    <span className="text-base">✨</span>
                    <div>
                      <span className="font-semibold block mb-0.5">Mindfulness Reflection</span>
                      {entry.aiReflection}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleGetAiReflection(entry)}
                    disabled={isGeneratingAi === entry.id}
                    className="self-start text-xs text-primary font-semibold hover:underline flex items-center gap-1 mt-1 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    {isGeneratingAi === entry.id ? 'Reflecting...' : 'Get AI Reflection'}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
