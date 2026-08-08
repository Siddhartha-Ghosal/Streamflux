export type NavTab = 'home' | 'search' | 'subscriptions' | 'profile' | 'movie-details';

export interface CastMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string;
  maturityRating: string;
  rating: number;
  genres: string[];
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  cast: CastMember[];
  isNew?: boolean;
  is4K?: boolean;
  isTrending?: boolean;
  isPopular?: boolean;
  category?: 'Action' | 'Sci-Fi' | 'Comedy' | 'Horror' | 'Drama' | 'Anime';
  videoUrl?: string;
  episodeInfo?: string;
  watchProgress?: number; // percentage 0-100
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'release' | 'download' | 'continue' | 'system';
  movieId?: string;
  icon?: string;
}

export interface UserProfile {
  name: string;
  membership: string;
  avatar: string;
  hoursWatched: number;
  titlesInListCount: number;
  email: string;
  renewDays: number;
  autoDownload: boolean;
  wifiOnly: boolean;
  pushEnabled: boolean;
}

export interface DownloadItem {
  id: string;
  movieId: string;
  title: string;
  fileSize: string;
  progress: number; // 0 - 100
  status: 'downloading' | 'completed' | 'paused';
  posterUrl: string;
}
