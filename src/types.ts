export type TabType = 'home' | 'mindful' | 'journal' | 'timer' | 'insights';

export type MoodType = 'calm' | 'focused' | 'tired' | 'stressed' | 'anxious';

export interface MoodLog {
  id: string;
  date: string; // YYYY-MM-DD
  mood: MoodType;
  note?: string;
  timestamp: number;
}

export interface JournalEntry {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
  moodTag?: MoodType;
  aiReflection?: string;
  createdAt: number;
}

export interface Stretch {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  imageUrl: string;
  steps: string[];
}

export interface Soundscape {
  id: string;
  title: string;
  description: string;
  category: 'Quick Refreshes' | 'Focus Soundscapes' | 'Deep Rest & Recovery';
  duration: string;
  icon: string;
  type: 'rain' | 'waves' | 'library' | 'whitenoise' | 'binaural';
}

export interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  soundscapeId?: string;
  duration: string;
}

export interface TimerSettings {
  focusMinutes: number;
  refreshMinutes: number;
  autoStartBreaks: boolean;
  soundEnabled: boolean;
}

export interface UserProfile {
  name: string;
  avatarUrl: string;
  dailyGoalMinutes: number;
  streakDays: number;
  totalMindfulMinutes: number;
}
