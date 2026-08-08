import React from 'react';
import { useApp } from '../context/AppContext';
import { MOVIES } from '../data/mockData';
import { MovieCard } from './MovieCard';

export const SearchScreen: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, openMovieDetails } = useApp();

  const categories = [
    { name: 'Action', bg: 'from-error-container to-[#4a0005]', colSpan: 'col-span-2' },
    { name: 'Sci-Fi', bg: 'from-primary-container to-[#1a0040]', colSpan: 'col-span-1' },
    { name: 'Comedy', bg: 'from-tertiary-fixed to-tertiary-container', colSpan: 'col-span-1', textColor: 'text-surface-container-lowest' },
    { name: 'Horror', bg: 'from-surface-container-highest to-black', colSpan: 'col-span-1 row-span-2', textColor: 'text-error' },
    { name: 'Drama', bg: 'from-secondary-container to-surface-variant', colSpan: 'col-span-2' },
    { name: 'Anime', bg: 'from-secondary to-primary-container', colSpan: 'col-span-1' },
  ];

  const popularSearches = MOVIES.slice(0, 4);

  // Filtered results
  const filteredMovies = MOVIES.filter((movie) => {
    const queryMatch =
      !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
      movie.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch = !selectedCategory || movie.genres.includes(selectedCategory) || movie.category === selectedCategory;

    return queryMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-background text-on-background px-5 md:px-12 pt-20 md:pt-24 pb-28 max-w-7xl mx-auto">
      {/* Mobile Top Header Search */}
      <div className="relative w-full max-w-2xl mx-auto mb-6">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-xl">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Movies, shows, or genres..."
          className="w-full bg-surface border border-outline-variant/30 rounded-full py-3.5 pl-12 pr-10 font-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-on-surface-variant/50 glass-panel shadow-lg"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills if Selected */}
      {selectedCategory && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-on-surface-variant font-medium">Filtering by:</span>
          <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-bold flex items-center gap-1">
            {selectedCategory}
            <button onClick={() => setSelectedCategory(null)} className="hover:text-secondary">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </span>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSearchQuery('');
            }}
            className="text-xs text-secondary hover:underline ml-auto"
          >
            Clear all
          </button>
        </div>
      )}

      {/* If Searching or Category Active -> Show Filtered Grid */}
      {searchQuery || selectedCategory ? (
        <section className="mb-10 animate-fadeIn">
          <h2 className="font-headline-md text-xl font-bold text-on-surface mb-4">
            Search Results ({filteredMovies.length})
          </h2>
          {filteredMovies.length === 0 ? (
            <div className="text-center py-16 glass-panel rounded-2xl p-8">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-2">search_off</span>
              <p className="text-on-surface-variant text-base font-medium">
                No titles matching "{searchQuery || selectedCategory}"
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                }}
                className="mt-4 px-5 py-2 bg-primary/20 border border-primary/40 text-primary font-bold text-xs rounded-full hover:bg-primary/30 transition-all"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} aspectRatio="portrait" />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Popular Searches */}
          <section className="mb-8">
            <h2 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface mb-4">
              Popular Searches
            </h2>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 -mx-5 px-5 md:mx-0 md:px-0">
              {popularSearches.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => openMovieDetails(movie)}
                  className="flex-shrink-0 w-[140px] md:w-[170px] group cursor-pointer"
                >
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 glass-panel group-hover:neon-glow group-hover:scale-105 transition-all duration-300">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-0.5 bg-secondary/20 border border-secondary/40 rounded-full font-label-sm text-[10px] font-bold text-secondary">
                        {movie.is4K ? '4K' : movie.isNew ? 'NEW' : 'HD'}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-label-lg text-xs font-semibold text-on-surface truncate group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Browse Categories Bento Grid */}
          <section className="mb-10">
            <h2 className="font-headline-md text-xl md:text-2xl font-bold text-on-surface mb-4">
              Browse Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[150px]">
              {categories.map((cat) => (
                <div
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${cat.colSpan}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg} opacity-85 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3
                      className={`font-headline-md text-lg md:text-2xl font-extrabold drop-shadow-md ${
                        cat.textColor || 'text-white'
                      }`}
                    >
                      {cat.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};
