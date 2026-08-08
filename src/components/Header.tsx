import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unreadNotificationCount,
    setIsNotificationDrawerOpen,
    isNotificationDrawerOpen,
    isDarkMode,
    toggleDarkMode,
    profile,
  } = useApp();

  return (
    <>
      {/* Desktop TopAppBar */}
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50 justify-between items-center px-6 lg:px-12 h-20 backdrop-blur-xl bg-surface/30 border-b border-white/10 dark:border-white/10 border-gray-200">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 group text-left"
          >
            <h1 className="font-display text-2xl font-extrabold text-primary tracking-tighter group-hover:opacity-80 transition-opacity">
              STREAMFLUX
            </h1>
          </button>

          <nav className="flex gap-6">
            {(
              [
                { id: 'home', label: 'Home' },
                { id: 'search', label: 'Search' },
                { id: 'subscriptions', label: 'Subscriptions' },
                { id: 'profile', label: 'Profile' },
              ] as { id: NavTab; label: string }[]
            ).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`font-label-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === item.id
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="px-3.5 py-2 rounded-full glass-panel border border-primary/30 text-on-background hover:bg-primary/20 hover:border-primary/60 transition-all active:scale-95 flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-lg text-primary">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="text-xs font-bold tracking-wide">
              {isDarkMode ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Real-Time Push Notifications Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
            className="relative p-2.5 rounded-full glass-overlay text-on-background hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
            title="Real-Time Push Notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-background font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-md">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="w-10 h-10 rounded-full overflow-hidden border border-primary/40 hover:opacity-80 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* Mobile TopAppBar */}
      <header className="md:hidden fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-16 backdrop-blur-xl bg-surface/40 border-b border-white/10">
        <button
          onClick={() => setActiveTab('home')}
          className="text-primary hover:opacity-80 transition-opacity flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        <h1
          onClick={() => setActiveTab('home')}
          className="font-display text-xl font-extrabold text-primary tracking-tighter cursor-pointer"
        >
          STREAMFLUX
        </h1>

        <div className="flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-full glass-panel border border-primary/30 text-on-background flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base text-primary">
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
            className="relative p-1.5 text-on-background flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl">notifications</span>
            {unreadNotificationCount > 0 && (
              <span className="absolute top-0 right-0 bg-secondary text-background font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {unreadNotificationCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="w-8 h-8 rounded-full overflow-hidden border border-primary/40"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>
    </>
  );
};
