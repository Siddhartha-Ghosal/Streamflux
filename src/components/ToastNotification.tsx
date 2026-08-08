import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOVIES } from '../data/mockData';

export const ToastNotification: React.FC = () => {
  const { latestNotificationToast, clearNotificationToast, openMovieDetails } = useApp();

  useEffect(() => {
    if (latestNotificationToast) {
      const timer = setTimeout(() => {
        clearNotificationToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [latestNotificationToast]);

  if (!latestNotificationToast) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-slideDown">
      <div
        onClick={() => {
          if (latestNotificationToast.movieId) {
            const m = MOVIES.find((x) => x.id === latestNotificationToast.movieId);
            if (m) openMovieDetails(m);
          }
          clearNotificationToast();
        }}
        className="glass-panel p-4 rounded-2xl shadow-2xl border-2 border-primary neon-glow flex items-start gap-3 cursor-pointer bg-surface/90"
      >
        <div className="w-10 h-10 rounded-full bg-secondary/20 text-secondary flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-xl">
            {latestNotificationToast.icon || 'notifications_active'}
          </span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-xs text-on-surface flex items-center justify-between">
            {latestNotificationToast.title}
            <span className="text-[10px] text-secondary font-semibold">Just now</span>
          </h4>
          <p className="text-xs text-on-surface-variant mt-1 leading-snug">
            {latestNotificationToast.message}
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearNotificationToast();
          }}
          className="text-on-surface-variant hover:text-white p-1"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
};
