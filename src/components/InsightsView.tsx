import React from 'react';
import { UserProfile, MoodLog } from '../types';

interface InsightsViewProps {
  user: UserProfile;
  moodLogs: MoodLog[];
}

export const InsightsView: React.FC<InsightsViewProps> = ({ user, moodLogs }) => {
  // Compute mood distribution breakdown
  const moodCounts = moodLogs.reduce(
    (acc, log) => {
      acc[log.mood] = (acc[log.mood] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalLogs = moodLogs.length || 1;

  return (
    <main className="max-w-[900px] mx-auto px-6 pt-8 pb-32">
      <header className="mb-8">
        <h1 className="font-headline-lg-mobile text-2xl text-primary font-bold mb-1">
          Sanctuary Insights
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Observing your mindfulness and focus patterns.
        </p>
      </header>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant/40 shadow-sm">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-2xl">local_fire_department</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Streak</span>
          </div>
          <div className="text-3xl font-bold text-on-surface">{user.streakDays} Days</div>
          <p className="text-xs text-outline mt-1">Consistent daily practice</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant/40 shadow-sm">
          <div className="flex items-center gap-2 text-secondary mb-2">
            <span className="material-symbols-outlined text-2xl">timer</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Total Focus</span>
          </div>
          <div className="text-3xl font-bold text-on-surface">{user.totalMindfulMinutes} min</div>
          <p className="text-xs text-outline mt-1">Deep work logged</p>
        </div>

        <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-variant/40 shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 text-primary mb-2">
            <span className="material-symbols-outlined text-2xl">spa</span>
            <span className="text-xs font-semibold uppercase tracking-wider">Daily Goal</span>
          </div>
          <div className="text-3xl font-bold text-on-surface">
            {Math.round((user.totalMindfulMinutes / user.dailyGoalMinutes) * 100)}%
          </div>
          <p className="text-xs text-outline mt-1">of {user.dailyGoalMinutes} min goal</p>
        </div>
      </div>

      {/* Mood Distribution */}
      <section className="p-6 rounded-2xl bg-surface-container-low border border-surface-variant/40 mb-8 shadow-sm">
        <h3 className="font-title-md text-title-md text-on-surface font-semibold mb-4">
          Mood Balance Distribution
        </h3>

        <div className="space-y-4">
          {[
            { type: 'calm', label: 'Calm', color: 'bg-primary-fixed text-on-primary-fixed' },
            { type: 'focused', label: 'Focused', color: 'bg-secondary-container text-on-secondary-container' },
            { type: 'tired', label: 'Tired', color: 'bg-tertiary-container/40 text-on-surface' },
            { type: 'anxious', label: 'Anxious / Stressed', color: 'bg-error-container text-on-error-container' },
          ].map((item) => {
            const count = moodCounts[item.type] || 0;
            const percentage = Math.round((count / totalLogs) * 100);

            return (
              <div key={item.type}>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-on-surface">{item.label}</span>
                  <span className="text-outline">{percentage}% ({count} logs)</span>
                </div>
                <div className="w-full bg-surface-container-highest rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${Math.max(percentage, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Weekly Focus Progress Graphic */}
      <section className="p-6 rounded-2xl bg-surface-container-low border border-surface-variant/40 shadow-sm">
        <h3 className="font-title-md text-title-md text-on-surface font-semibold mb-4">
          Weekly Mindful Activity
        </h3>

        <div className="flex items-end justify-between h-40 pt-6 px-2 border-b border-surface-container-highest">
          {[
            { day: 'Mon', mins: 45 },
            { day: 'Tue', mins: 50 },
            { day: 'Wed', mins: 25 },
            { day: 'Thu', mins: 60 },
            { day: 'Fri', mins: 50 },
            { day: 'Sat', mins: 30 },
            { day: 'Sun', mins: 40 },
          ].map((bar, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-8 rounded-t-lg bg-primary-container transition-all hover:bg-primary duration-300"
                style={{ height: `${(bar.mins / 60) * 100}%` }}
                title={`${bar.mins} mins`}
              />
              <span className="text-xs text-outline font-semibold">{bar.day}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
