import React, { useState } from 'react';
import { UserProfile, TimerSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  settings: TimerSettings;
  onUpdateSettings: (updated: TimerSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  settings,
  onUpdateSettings,
}) => {
  const [userName, setUserName] = useState<string>(user.name);
  const [focusMins, setFocusMins] = useState<number>(settings.focusMinutes);
  const [refreshMins, setRefreshMins] = useState<number>(settings.refreshMinutes);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(settings.soundEnabled);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUser({ name: userName });
    onUpdateSettings({
      ...settings,
      focusMinutes: focusMins,
      refreshMinutes: refreshMins,
      soundEnabled,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-fade-in">
      <div onClick={onClose} className="absolute inset-0 bg-on-background/20 backdrop-blur-sm" />

      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-sm w-full relative z-10 shadow-xl border border-white/50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-1 rounded-full"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <h3 className="font-title-md text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">settings</span>
          Sanctuary Settings
        </h3>

        <div className="space-y-4 text-left">
          {/* Name */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-variant text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Focus duration */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Focus Duration (Minutes)
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={focusMins}
              onChange={(e) => setFocusMins(parseInt(e.target.value) || 25)}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-variant text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Refresh duration */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Refresh Duration (Minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={refreshMins}
              onChange={(e) => setRefreshMins(parseInt(e.target.value) || 5)}
              className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-variant text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary-container"
            />
          </div>

          {/* Audio Chimes toggle */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-on-surface-variant">Sound & Chimes</span>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={(e) => setSoundEnabled(e.target.checked)}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-6 py-3 rounded-full bg-primary text-on-primary font-label-sm text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};
