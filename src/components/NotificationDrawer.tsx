import React from 'react';
import { useApp } from '../context/AppContext';
import { MOVIES } from '../data/mockData';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    addPushNotification,
    openMovieDetails,
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const triggerTestPush = () => {
    const randomMovie = MOVIES[Math.floor(Math.random() * MOVIES.length)];
    addPushNotification(
      'Push Alert 🔔',
      `Exclusive content for "${randomMovie.title}" is now available in 4K HDR!`,
      'release',
      randomMovie.id
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-surface text-on-surface h-full shadow-2xl flex flex-col border-l border-white/10 animate-slideLeft p-5">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">notifications</span>
            <h3 className="font-headline-md text-lg font-bold">Push Notifications</h3>
          </div>
          <button
            onClick={() => setIsNotificationDrawerOpen(false)}
            className="p-1 text-on-surface-variant hover:text-white rounded-full"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Actions Bar */}
        <div className="flex justify-between items-center my-3 text-xs">
          <button
            onClick={triggerTestPush}
            className="px-3 py-1.5 bg-primary/20 border border-primary/40 text-primary font-bold rounded-full hover:bg-primary/30 transition-all active:scale-95 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">notifications_active</span>
            Test Push Notification
          </button>

          {notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="text-on-surface-variant hover:text-error transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-3 py-2 pr-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2">notifications_off</span>
              <p className="text-sm font-medium">No new notifications</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationAsRead(notif.id);
                  if (notif.movieId) {
                    const found = MOVIES.find((m) => m.id === notif.movieId);
                    if (found) {
                      openMovieDetails(found);
                      setIsNotificationDrawerOpen(false);
                    }
                  }
                }}
                className={`p-3.5 rounded-2xl glass-panel border transition-all cursor-pointer ${
                  notif.read ? 'border-white/5 opacity-70' : 'border-primary/40 bg-primary/5'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-lg">
                      {notif.icon || 'notifications'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-bold text-xs text-on-surface">{notif.title}</h4>
                      <span className="text-[10px] text-on-surface-variant">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-snug">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
