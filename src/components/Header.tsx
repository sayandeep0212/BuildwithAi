import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, isDarkMode, onToggleTheme, onOpenSettings }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="w-full pt-4 pb-2 bg-background">
      <div className="flex justify-between items-center px-6 max-w-[900px] mx-auto w-full">
        <div className="flex items-center gap-4 hover:opacity-90 transition-opacity cursor-pointer">
          <img
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/30 shadow-sm"
            src={user.avatarUrl}
            alt={user.name}
          />
          <div>
            <h1 className="font-title-md text-title-md text-primary font-semibold">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-xs text-outline font-medium">Digital Sanctuary</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-full hover:bg-surface-container transition-colors active:scale-95 text-primary flex items-center justify-center"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-full hover:bg-surface-container transition-colors active:scale-95 text-primary flex items-center justify-center"
            title="Settings"
          >
            <span className="material-symbols-outlined text-[22px]">
              settings
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
