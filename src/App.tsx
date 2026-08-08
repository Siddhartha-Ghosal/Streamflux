import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HeroBanner } from './components/HeroBanner';
import { MovieCard } from './components/MovieCard';
import { MovieDetailsView } from './components/MovieDetailsView';
import { SearchScreen } from './components/SearchScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SubscriptionsScreen } from './components/SubscriptionsScreen';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { ToastNotification } from './components/ToastNotification';
import { MOVIES } from './data/mockData';

const MainContent: React.FC = () => {
  const { activeTab, openMovieDetails } = useApp();

  const featuredHeroMovie = MOVIES[1]; // Neon Ascension
  const trendingMovies = MOVIES.filter((m) => m.isTrending);
  const newReleases = MOVIES.filter((m) => m.isNew);
  const scifiBlockbusters = MOVIES.filter((m) => m.genres.includes('Sci-Fi'));

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Header />

      <main className="w-full">
        {activeTab === 'home' && (
          <div className="pt-16 md:pt-20 pb-28">
            {/* Featured Hero Banner */}
            <HeroBanner movie={featuredHeroMovie} />

            <div className="max-w-7xl mx-auto px-5 md:px-12 flex flex-col gap-10">
              {/* Trending Now */}
              <section className="mb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline-md text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      trending_up
                    </span>
                    Trending Now
                  </h3>
                  <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">View All</span>
                </div>

                <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory">
                  {trendingMovies.map((movie) => (
                    <div key={movie.id} className="w-[145px] md:w-[200px] flex-none">
                      <MovieCard movie={movie} aspectRatio="portrait" />
                    </div>
                  ))}
                </div>
              </section>

              {/* New Releases in 4K */}
              <section className="mb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline-md text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    New Releases in 4K HDR
                  </h3>
                </div>

                <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory">
                  {newReleases.map((movie) => (
                    <div key={movie.id} className="w-[145px] md:w-[200px] flex-none">
                      <MovieCard movie={movie} aspectRatio="portrait" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Sci-Fi & Action Masterpieces */}
              <section className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-headline-md text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      rocket_launch
                    </span>
                    Sci-Fi & Cyberpunk World
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {scifiBlockbusters.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} aspectRatio="portrait" />
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'search' && <SearchScreen />}
        {activeTab === 'profile' && <ProfileScreen />}
        {activeTab === 'subscriptions' && <SubscriptionsScreen />}
        {activeTab === 'movie-details' && <MovieDetailsView />}
      </main>

      <BottomNav />
      <VideoPlayerModal />
      <NotificationDrawer />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
