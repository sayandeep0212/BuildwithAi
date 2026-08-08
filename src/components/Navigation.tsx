import React from 'react';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'mindful', label: 'Mindful', icon: 'spa' },
  { id: 'journal', label: 'Journal', icon: 'edit_note' },
  { id: 'timer', label: 'Timer', icon: 'timer' },
  { id: 'insights', label: 'Insights', icon: 'insights' },
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 py-2.5 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.06)] border-t border-outline-variant/30">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-on-surface-variant/70 hover:text-on-surface'
              }`}
            >
              <div
                className={`flex items-center justify-center px-4 py-1 rounded-full transition-colors ${
                  isActive ? 'bg-primary-container text-on-primary-container' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
                >
                  {item.icon}
                </span>
              </div>
              <span className="text-[11px] mt-0.5 font-medium leading-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Desktop Left Sidebar Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 h-full w-24 flex-col items-center py-8 bg-surface-container-lowest border-r border-surface-variant/50 z-40 shadow-sm">
        <div className="mb-10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            spa
          </span>
        </div>

        <div className="flex flex-col space-y-6 flex-grow items-center">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                title={item.label}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container scale-105 shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                <span
                  className="material-symbols-outlined text-2xl"
                  style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
                >
                  {item.icon}
                </span>
                <span className="text-[11px] font-medium mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
