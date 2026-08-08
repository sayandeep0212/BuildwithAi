import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onOpenSettings }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="w-full pt-4 pb-2 bg-background dark:bg-background">
      <div className="flex justify-between items-center px-6 max-w-[900px] mx-auto w-full">
        <div className="flex items-center gap-4 hover:opacity-90 transition-opacity cursor-pointer">
          <img
            className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
            src={user.avatarUrl}
            alt={user.name}
          />
          <div>
            <h1 className="font-title-md text-title-md text-primary font-semibold">
              {getGreeting()}, {user.name}
            </h1>
            <p className="text-xs text-outline">Digital Sanctuary</p>
          </div>
        </div>

        <button
          onClick={onOpenSettings}
          className="p-2.5 rounded-full hover:bg-surface-container transition-colors active:scale-95 text-primary"
          title="Settings"
        >
          <span className="material-symbols-outlined text-[24px]" data-icon="settings">
            settings
          </span>
        </button>
      </div>
    </header>
  );
};
