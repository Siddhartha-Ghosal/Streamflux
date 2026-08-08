import React, { useState, useEffect, useRef } from 'react';
import { Movie } from '../types';
import { useApp } from '../context/AppContext';

interface MovieCardProps {
  movie: Movie;
  aspectRatio?: 'portrait' | 'landscape';
  className?: string;
  showProgress?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  aspectRatio = 'portrait',
  className = '',
  showProgress = false,
}) => {
  const { openMovieDetails, openPlayer, isInWatchlist, toggleWatchlist } = useApp();
  const inList = isInWatchlist(movie.id);

  // Intersection Observer for Lazy Loading
  const cardRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (cardRef.current) {
              observer.unobserve(cardRef.current);
            }
          }
        });
      },
      { rootMargin: '150px', threshold: 0.01 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const imageUrl = aspectRatio === 'portrait' ? movie.posterUrl : movie.backdropUrl || movie.posterUrl;

  return (
    <div
      ref={cardRef}
      onClick={() => openMovieDetails(movie)}
      className={`group cursor-pointer flex-none relative snap-start transform hover:-translate-y-1.5 hover:scale-[1.03] transition-all duration-300 ease-out ${className}`}
    >
      <div
        className={`relative w-full rounded-2xl overflow-hidden glass-panel border border-white/10 group-hover:border-primary/60 group-hover:shadow-[0_12px_30px_rgba(197,163,104,0.3)] transition-all duration-300 ${
          aspectRatio === 'portrait' ? 'aspect-[2/3]' : 'aspect-video'
        }`}
      >
        {/* Shimmer Skeleton Placeholder before in-view & loaded */}
        {(!isInView || !isLoaded) && (
          <div className="absolute inset-0 bg-surface-variant/40 animate-pulse flex items-center justify-center">
            <span className="material-symbols-outlined text-white/20 text-3xl">movie</span>
          </div>
        )}

        {/* Image with IntersectionObserver lazy src */}
        {isInView && (
          <img
            src={imageUrl}
            alt={movie.title}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        )}

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-10 pointer-events-none">
          {movie.isNew ? (
            <span className="bg-secondary text-background font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md tracking-wider">
              NEW 🌟
            </span>
          ) : movie.is4K ? (
            <span className="bg-primary/20 border border-primary/50 text-primary font-extrabold text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-sm">
              4K HDR
            </span>
          ) : <span />}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(movie.id);
            }}
            className="pointer-events-auto p-1.5 rounded-full glass-overlay text-white hover:text-secondary hover:bg-black/50 transition-all active:scale-90 flex items-center justify-center"
            title={inList ? 'Remove from My List' : 'Add to My List'}
          >
            <span
              className="material-symbols-outlined text-base"
              style={{ fontVariationSettings: inList ? "'FILL' 1" : "'FILL' 0" }}
            >
              {inList ? 'bookmark_added' : 'add'}
            </span>
          </button>
        </div>

        {/* Hover Play Button Overlay with Play Sign & Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openPlayer(movie);
            }}
            className="px-4 py-2 rounded-full bg-primary text-background font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5 neon-glow hover:scale-110 transition-all shadow-2xl active:scale-95"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
            <span>PLAY</span>
          </button>
        </div>

        {/* Bottom Info Rating */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-white z-10">
          <div className="flex items-center gap-1 font-bold bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span>{movie.rating}</span>
          </div>
          <span className="text-[10px] font-semibold text-white/90 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
            {movie.duration}
          </span>
        </div>
      </div>

      {/* Movie Title */}
      <h4 className="font-label-lg text-xs font-bold text-on-surface truncate mt-2 group-hover:text-primary transition-colors">
        {movie.title}
      </h4>

      {/* Progress Bar for Continue Watching */}
      {showProgress && movie.watchProgress !== undefined && (
        <div className="w-full h-1.5 bg-surface-variant/50 rounded-full overflow-hidden mt-1.5">
          <div
            className="h-full gradient-progress rounded-full shadow-[0_0_8px_rgba(197,163,104,0.8)]"
            style={{ width: `${movie.watchProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};
