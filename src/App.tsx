import React, { useState, useEffect } from 'react';
import { TabType, MoodType, UserProfile, MoodLog, JournalEntry, TimerSettings } from './types';
import { initialUserProfile, initialMoodLogs, initialJournalEntries } from './data/initialData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { TimerView } from './components/TimerView';
import { MindfulView } from './components/MindfulView';
import { JournalView } from './components/JournalView';
import { InsightsView } from './components/InsightsView';
import { StretchModal } from './components/StretchModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>('calm');

  // Persistence with LocalStorage
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sanctuary_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.name === 'Alex') parsed.name = 'Sayandeep';
      return parsed;
    }
    return initialUserProfile;
  });

  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    const saved = localStorage.getItem('sanctuary_mood_logs');
    return saved ? JSON.parse(saved) : initialMoodLogs;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('sanctuary_journal');
    return saved ? JSON.parse(saved) : initialJournalEntries;
  });

  const [timerSettings, setTimerSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('sanctuary_timer_settings');
    return saved
      ? JSON.parse(saved)
      : { focusMinutes: 25, refreshMinutes: 5, autoStartBreaks: false, soundEnabled: true };
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sanctuary_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isStretchModalOpen, setIsStretchModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('sanctuary_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sanctuary_mood_logs', JSON.stringify(moodLogs));
  }, [moodLogs]);

  useEffect(() => {
    localStorage.setItem('sanctuary_journal', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('sanctuary_timer_settings', JSON.stringify(timerSettings));
  }, [timerSettings]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sanctuary_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sanctuary_theme', 'light');
    }
  }, [isDarkMode]);

  // Handlers
  const handleToggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleLogMood = (mood: MoodType) => {
    setSelectedMood(mood);
    const todayStr = new Date().toISOString().split('T')[0];
    const newLog: MoodLog = {
      id: `m-${Date.now()}`,
      date: todayStr,
      mood,
      timestamp: Date.now(),
    };
    setMoodLogs((prev) => [newLog, ...prev.filter((l) => l.date !== todayStr)]);
  };

  const handleAddJournalEntry = (text: string, moodTag?: MoodType) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newEntry: JournalEntry = {
      id: `j-${Date.now()}`,
      date: todayStr,
      text,
      moodTag: moodTag || selectedMood || 'calm',
      createdAt: Date.now(),
    };
    setJournalEntries((prev) => [newEntry, ...prev]);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const handleUpdateJournalEntryReflection = (id: string, reflection: string) => {
    setJournalEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, aiReflection: reflection } : e))
    );
  };

  const handleSessionComplete = (mode: 'focus' | 'refresh', durationMinutes: number) => {
    if (mode === 'focus') {
      setUser((prev) => ({
        ...prev,
        totalMindfulMinutes: prev.totalMindfulMinutes + durationMinutes,
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background relative overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed transition-colors duration-300">
      {/* Header Top Bar */}
      <Header
        user={user}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />

      {/* Dynamic View Canvas */}
      <div className="flex-grow md:pl-24 pb-20 md:pb-8">
        {activeTab === 'home' && (
          <HomeView
            user={user}
            selectedMood={selectedMood}
            onLogMood={handleLogMood}
            onNavigateToTimer={() => setActiveTab('timer')}
            onNavigateToMindful={() => setActiveTab('mindful')}
          />
        )}

        {activeTab === 'timer' && (
          <TimerView
            settings={timerSettings}
            onOpenStretchModal={() => setIsStretchModalOpen(true)}
            onSessionComplete={handleSessionComplete}
          />
        )}

        {activeTab === 'mindful' && <MindfulView />}

        {activeTab === 'journal' && (
          <JournalView
            moodLogs={moodLogs}
            journalEntries={journalEntries}
            onAddJournalEntry={handleAddJournalEntry}
            onDeleteJournalEntry={handleDeleteJournalEntry}
            onUpdateJournalEntryReflection={handleUpdateJournalEntryReflection}
            selectedMood={selectedMood}
          />
        )}

        {activeTab === 'insights' && <InsightsView user={user} moodLogs={moodLogs} />}
      </div>

      {/* Navigation (Bottom Bar for Mobile & Left Sidebar for Desktop) */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Stretch Suggestion Modal */}
      <StretchModal
        isOpen={isStretchModalOpen}
        onClose={() => setIsStretchModalOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        user={user}
        onUpdateUser={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
        settings={timerSettings}
        onUpdateSettings={setTimerSettings}
        isDarkMode={isDarkMode}
        onSetDarkMode={setIsDarkMode}
      />
    </div>
  );
}
