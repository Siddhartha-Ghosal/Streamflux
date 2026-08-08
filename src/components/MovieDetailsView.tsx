import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOVIES } from '../data/mockData';
import { MovieCard } from './MovieCard';

export const MovieDetailsView: React.FC = () => {
  const {
    selectedMovie,
    setActiveTab,
    openPlayer,
    toggleWatchlist,
    isInWatchlist,
    startDownload,
    downloads,
    addPushNotification,
  } = useApp();

  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const movie = selectedMovie || MOVIES[0];
  const inList = isInWatchlist(movie.id);

  const currentDownload = downloads.find((d) => d.movieId === movie.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setCopiedShare(true);
    addPushNotification('Link Copied! 🔗', `Share link for "${movie.title}" copied to clipboard.`);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const moreLikeThis = MOVIES.filter((m) => m.id !== movie.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-on-background pb-28 pt-0 animate-fadeIn">
      {/* Top Glass Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-16 pt-safe">
        <button
          onClick={() => setActiveTab('home')}
          aria-label="Back"
          className="w-10 h-10 rounded-full glass-overlay flex items-center justify-center text-on-background hover:bg-white/10 transition-all active:scale-95 shadow-lg"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <button
          onClick={handleShare}
          aria-label="Share"
          className="w-10 h-10 rounded-full glass-overlay flex items-center justify-center text-on-background hover:bg-white/10 transition-all active:scale-95 shadow-lg relative"
        >
          <span className="material-symbols-outlined text-xl">share</span>
          {copiedShare && (
            <span className="absolute -bottom-8 right-0 bg-primary text-background font-bold text-[10px] px-2 py-0.5 rounded shadow-md whitespace-nowrap">
              Copied!
            </span>
          )}
        </button>
      </header>

      {/* Main Hero Backdrop */}
      <section className="relative w-full h-[530px] min-h-[400px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${movie.backdropUrl || movie.posterUrl}')` }}
        />
        <div className="absolute inset-0 scrim-bottom z-10" />

        {/* Floating Content Over Backdrop */}
        <div className="absolute bottom-0 left-0 w-full px-5 pb-8 z-20 flex flex-col items-center text-center">
          {/* Play Button */}
          <button
            onClick={() => openPlayer(movie)}
            className="mb-6 px-8 py-3.5 rounded-full bg-primary text-background flex items-center justify-center gap-2 neon-glow hover:scale-105 transition-all font-extrabold text-sm tracking-wider uppercase shadow-2xl active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
            <span>Play Movie</span>
          </button>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-on-background mb-2 tracking-tight">
            {movie.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-3 font-label-sm text-xs text-on-surface-variant mb-3 flex-wrap justify-center">
            <span>{movie.year}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span>{movie.duration}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="border border-outline-variant px-1.5 py-0.5 rounded text-[10px] font-semibold">
              {movie.maturityRating}
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="flex items-center text-tertiary font-bold">
              <span className="material-symbols-outlined text-sm mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              {movie.rating}
            </span>
          </div>

          {/* Genre Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {movie.genres.map((genre, idx) => (
              <span
                key={genre}
                className={`px-3 py-1 rounded-full font-label-sm text-xs ${
                  idx === 0
                    ? 'bg-secondary/20 text-secondary'
                    : idx === 1
                    ? 'bg-primary/20 text-primary'
                    : 'bg-surface-variant text-on-surface'
                }`}
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Synopsis Section */}
      <section className="px-5 mt-6 max-w-4xl mx-auto">
        <h2 className="font-headline-md text-xl font-bold text-on-background mb-2">Synopsis</h2>
        <p className={`font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed ${isSynopsisExpanded ? '' : 'line-clamp-3'}`}>
          {movie.synopsis}
        </p>
        <button
          onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
          className="text-primary font-label-lg text-sm mt-2 font-semibold hover:underline cursor-pointer"
        >
          {isSynopsisExpanded ? 'Show less' : 'Read more'}
        </button>
      </section>

      {/* Top Cast Section */}
      <section className="mt-8 max-w-4xl mx-auto">
        <h2 className="px-5 font-headline-md text-xl font-bold text-on-background mb-4">Top Cast</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-5 pb-2">
          {movie.cast.map((actor) => (
            <div key={actor.id} className="flex flex-col items-center min-w-[84px] text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-primary/20 bg-surface-container-high flex items-center justify-center">
                {actor.image ? (
                  <img
                    src={actor.image}
                    alt={actor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-outline-variant text-3xl">person</span>
                )}
              </div>
              <span className="font-label-sm text-xs font-semibold text-on-background w-full truncate">
                {actor.name}
              </span>
              <span className="font-label-sm text-[10px] text-on-surface-variant w-full truncate">
                {actor.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Actions Row (Bento) */}
      <section className="px-5 mt-6 max-w-4xl mx-auto grid grid-cols-2 gap-4">
        <button
          onClick={() => toggleWatchlist(movie.id)}
          className="glass-overlay rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-surface-bright/50 transition-all active:scale-95"
        >
          <span
            className="material-symbols-outlined text-2xl text-secondary"
            style={{ fontVariationSettings: inList ? "'FILL' 1" : "'FILL' 0" }}
          >
            {inList ? 'bookmark_added' : 'add'}
          </span>
          <span className="font-label-sm text-xs font-medium text-on-background">
            {inList ? 'Saved in List' : 'My List'}
          </span>
        </button>

        <button
          onClick={() => startDownload(movie)}
          className="glass-overlay rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-surface-bright/50 transition-all active:scale-95 relative overflow-hidden"
        >
          <span className="material-symbols-outlined text-2xl text-primary">
            {currentDownload?.status === 'completed' ? 'download_done' : 'download'}
          </span>
          <span className="font-label-sm text-xs font-medium text-on-background">
            {currentDownload
              ? currentDownload.status === 'completed'
                ? 'Downloaded'
                : `Downloading (${currentDownload.progress}%)`
              : 'Download'}
          </span>
          {currentDownload && currentDownload.status === 'downloading' && (
            <div
              className="absolute bottom-0 left-0 h-1 bg-secondary transition-all duration-300"
              style={{ width: `${currentDownload.progress}%` }}
            />
          )}
        </button>
      </section>

      {/* More Like This Grid */}
      <section className="mt-8 px-5 max-w-4xl mx-auto">
        <h2 className="font-headline-md text-xl font-bold text-on-background mb-4">More Like This</h2>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {moreLikeThis.map((item) => (
            <MovieCard key={item.id} movie={item} aspectRatio="portrait" />
          ))}
        </div>
      </section>
    </div>
  );
};
