import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavTab, Movie, PushNotification, UserProfile, DownloadItem } from '../types';
import { MOVIES, CONTINUE_WATCHING, INITIAL_NOTIFICATIONS, INITIAL_PROFILE, INITIAL_DOWNLOADS } from '../data/mockData';

interface AppContextType {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  openMovieDetails: (movie: Movie) => void;
  
  // Player
  isPlayerOpen: boolean;
  playingMovie: Movie | null;
  openPlayer: (movie: Movie) => void;
  closePlayer: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  
  // My List
  watchlist: string[]; // movie IDs
  toggleWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  
  // Downloads
  downloads: DownloadItem[];
  startDownload: (movie: Movie) => void;
  removeDownload: (downloadId: string) => void;
  
  // Notifications
  notifications: PushNotification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  addPushNotification: (title: string, message: string, type?: PushNotification['type'], movieId?: string) => void;
  latestNotificationToast: PushNotification | null;
  clearNotificationToast: () => void;
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  
  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // User Profile
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(MOVIES[0]);
  
  // Player state
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Watchlist
  const [watchlist, setWatchlist] = useState<string[]>(['neon-horizon', 'avatar-echoes', 'blind-protocol']);

  // Downloads
  const [downloads, setDownloads] = useState<DownloadItem[]>(INITIAL_DOWNLOADS);

  // Notifications
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [latestNotificationToast, setLatestNotificationToast] = useState<PushNotification | null>(null);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Theme (default dark as requested in screenshots)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Profile
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  // Apply dark class to documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Periodic download progress simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloads((prev) =>
        prev.map((item) => {
          if (item.status === 'downloading' && item.progress < 100) {
            const nextProg = Math.min(100, item.progress + 10);
            if (nextProg === 100) {
              // Trigger push notification when download completes
              addPushNotification(
                'Download Complete ⚡',
                `${item.title} is ready for offline viewing!`,
                'download',
                item.movieId
              );
              return { ...item, progress: 100, status: 'completed' };
            }
            return { ...item, progress: nextProg };
          }
          return item;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate incoming real-time push notification every 45 seconds if push enabled
  useEffect(() => {
    if (!profile.pushEnabled) return;

    const pushSimulators = [
      {
        title: 'Trending #1 in Sci-Fi 🔥',
        message: 'Neon Ascension hit 1.2M streams today! Watch now in 4K.',
        type: 'release' as const,
        movieId: 'neon-ascension',
      },
      {
        title: 'New Season Unlocked 🌟',
        message: 'Neon Dreamscape S3 is premiering tonight at 8 PM EST.',
        type: 'release' as const,
        movieId: 'neon-dreamscape',
      },
      {
        title: 'Continue Watching Reminder 🍿',
        message: 'You have 28m remaining in Neon Dreamscape S2:E4.',
        type: 'continue' as const,
        movieId: 'neon-dreamscape',
      },
    ];

    let index = 0;
    const interval = setInterval(() => {
      const item = pushSimulators[index % pushSimulators.length];
      addPushNotification(item.title, item.message, item.type, item.movieId);
      index++;
    }, 45000);

    return () => clearInterval(interval);
  }, [profile.pushEnabled]);

  const openMovieDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setActiveTab('movie-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPlayer = (movie: Movie) => {
    setPlayingMovie(movie);
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    setIsPlayerOpen(false);
    setPlayingMovie(null);
  };

  const toggleWatchlist = (movieId: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(movieId);
      const updated = exists ? prev.filter((id) => id !== movieId) : [...prev, movieId];
      
      const targetMovie = MOVIES.find((m) => m.id === movieId);
      if (targetMovie && !exists) {
        addPushNotification('Added to My List 📌', `${targetMovie.title} was saved to your list.`, 'system', movieId);
      }
      return updated;
    });
  };

  const isInWatchlist = (movieId: string) => watchlist.includes(movieId);

  const startDownload = (movie: Movie) => {
    const existing = downloads.find((d) => d.movieId === movie.id);
    if (existing) {
      addPushNotification('Already Downloaded ⚡', `${movie.title} is already in your downloads list.`, 'download', movie.id);
      return;
    }

    const newDownload: DownloadItem = {
      id: `d-${Date.now()}`,
      movieId: movie.id,
      title: movie.title,
      fileSize: '2.8 GB',
      progress: 10,
      status: 'downloading',
      posterUrl: movie.posterUrl,
    };

    setDownloads((prev) => [newDownload, ...prev]);
    addPushNotification('Download Started 📥', `Downloading ${movie.title} in 4K resolution...`, 'download', movie.id);
  };

  const removeDownload = (downloadId: string) => {
    setDownloads((prev) => prev.filter((d) => d.id !== downloadId));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addPushNotification = (
    title: string,
    message: string,
    type: PushNotification['type'] = 'system',
    movieId?: string
  ) => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}-${Math.random()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type,
      movieId,
      icon: type === 'release' ? 'movie' : type === 'download' ? 'download' : 'notifications',
    };

    setNotifications((prev) => [newNotif, ...prev]);
    setLatestNotificationToast(newNotif);
  };

  const clearNotificationToast = () => {
    setLatestNotificationToast(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedMovie,
        setSelectedMovie,
        openMovieDetails,
        isPlayerOpen,
        playingMovie,
        openPlayer,
        closePlayer,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        downloads,
        startDownload,
        removeDownload,
        notifications,
        unreadNotificationCount,
        markNotificationAsRead,
        clearAllNotifications,
        addPushNotification,
        latestNotificationToast,
        clearNotificationToast,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isDarkMode,
        toggleDarkMode,
        profile,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
