import React from 'react';
import { Movie } from '../types';
import { useApp } from '../context/AppContext';

interface HeroBannerProps {
  movie: Movie;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ movie }) => {
  const { openPlayer, openMovieDetails, toggleWatchlist, isInWatchlist } = useApp();
  const inList = isInWatchlist(movie.id);

  return (
    <section className="relative w-full h-[530px] md:h-[620px] flex items-end mb-8 overflow-hidden rounded-b-2xl md:rounded-b-3xl">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl || movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent hidden md:block" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-12 pb-8 md:pb-12 flex flex-col gap-3">
        {/* Quality & Category Badges */}
        <div className="flex gap-2 flex-wrap items-center">
          <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary font-label-sm text-xs backdrop-blur-md font-semibold">
            New Release
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-variant/60 text-on-surface-variant font-label-sm text-xs backdrop-blur-md">
            4K HDR
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-variant/40 text-on-surface-variant font-label-sm text-xs backdrop-blur-md">
            {movie.duration}
          </span>
          <span className="flex items-center gap-1 text-tertiary text-xs font-bold bg-tertiary/10 border border-tertiary/20 px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            {movie.rating}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">
          {movie.title}
        </h2>

        {/* Synopsis snippet */}
        <p className="font-body-md text-sm md:text-base text-on-surface-variant max-w-xl line-clamp-2 md:line-clamp-3 leading-relaxed">
          {movie.synopsis}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => openPlayer(movie)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background font-label-lg text-sm font-extrabold rounded-xl hover:opacity-90 transition-all neon-glow active:scale-95 tracking-wide"
          >
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
            <span>Play Now</span>
          </button>

          <button
            onClick={() => toggleWatchlist(movie.id)}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface/40 backdrop-blur-md border border-primary/50 text-white font-label-lg text-sm font-semibold rounded-xl hover:bg-surface/60 transition-all active:scale-95"
          >
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: inList ? "'FILL' 1" : "'FILL' 0" }}
            >
              {inList ? 'check' : 'add'}
            </span>
            {inList ? 'In My List' : 'My List'}
          </button>

          <button
            onClick={() => openMovieDetails(movie)}
            className="p-3 bg-surface/30 backdrop-blur-md border border-white/10 text-white rounded-xl hover:bg-surface/50 transition-all hidden sm:flex items-center justify-center"
            title="More Info"
          >
            <span className="material-symbols-outlined text-xl">info</span>
          </button>
        </div>
      </div>
    </section>
  );
};
