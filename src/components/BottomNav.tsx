import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems: { id: NavTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'subscriptions', label: 'Subs', icon: 'subscriptions' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-20 pb-safe backdrop-blur-3xl bg-surface/40 border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] md:hidden">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 w-16 relative ${
              isActive
                ? "text-primary font-bold after:content-[''] after:absolute after:-bottom-1 after:w-1.5 after:h-1.5 after:bg-primary after:rounded-full after:shadow-[0_0_8px_#C5A368]"
                : 'text-on-surface-variant opacity-60 hover:opacity-100'
            }`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-label-sm text-[11px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
