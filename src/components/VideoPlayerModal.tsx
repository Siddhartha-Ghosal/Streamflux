import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const VideoPlayerModal: React.FC = () => {
  const { isPlayerOpen, playingMovie, closePlayer, addPushNotification } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [quality, setQuality] = useState('4K HDR');
  const [subtitles, setSubtitles] = useState('English');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (isPlayerOpen && playingMovie) {
      setIsPlaying(true);
      addPushNotification(
        'Now Playing 🍿',
        `Streaming "${playingMovie.title}" in ${quality} with Spatial Audio.`,
        'continue',
        playingMovie.id
      );
    }
  }, [isPlayerOpen, playingMovie]);

  if (!isPlayerOpen || !playingMovie) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 120);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const skipSeconds = (sec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += sec;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const formatTime = (timeInSec: number) => {
    if (isNaN(timeInSec)) return '00:00';
    const min = Math.floor(timeInSec / 60);
    const sec = Math.floor(timeInSec % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden animate-fadeIn">
      {/* Video element */}
      <video
        ref={videoRef}
        src={playingMovie.videoUrl}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full object-contain"
      />

      {/* Top Bar Controls */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={closePlayer}
            className="w-10 h-10 rounded-full glass-overlay flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <div>
            <h3 className="font-bold text-lg text-white font-display tracking-tight">{playingMovie.title}</h3>
            <p className="text-xs text-secondary font-semibold">
              {playingMovie.year} • {playingMovie.genres.join(', ')} • {quality}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quality Selector */}
          <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="bg-black/60 border border-white/20 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="4K HDR">4K HDR</option>
            <option value="1080p">1080p FHD</option>
            <option value="720p">720p HD</option>
          </select>

          {/* Subtitles Selector */}
          <select
            value={subtitles}
            onChange={(e) => setSubtitles(e.target.value)}
            className="bg-black/60 border border-white/20 text-white text-xs font-bold rounded-lg px-2.5 py-1.5 focus:outline-none"
          >
            <option value="English">Sub: EN</option>
            <option value="Spanish">Sub: ES</option>
            <option value="Off">Sub: Off</option>
          </select>

          <button
            onClick={closePlayer}
            className="p-2 text-white hover:text-error transition-colors"
            title="Close Player"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar Controls */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex flex-col gap-3">
        {/* Scrubber Bar */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs font-mono text-white/80">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <span className="text-xs font-mono text-white/80">{formatTime(duration)}</span>
        </div>

        {/* Action Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => skipSeconds(-10)} className="text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">replay_10</span>
            </button>

            <button
              onClick={togglePlay}
              className="px-4 py-2.5 rounded-full bg-primary text-background flex items-center justify-center gap-1.5 shadow-lg hover:scale-105 transition-all font-extrabold text-xs tracking-wider uppercase"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </button>

            <button onClick={() => skipSeconds(10)} className="text-white hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">forward_10</span>
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="text-white hover:text-primary"
              >
                <span className="material-symbols-outlined text-xl">
                  {isMuted ? 'volume_off' : volume > 0.5 ? 'volume_up' : 'volume_down'}
                </span>
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-white/30 rounded-lg accent-primary cursor-pointer hidden sm:block"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Speed Rate */}
            <button
              onClick={() => {
                const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
                setPlaybackRate(nextRate);
                if (videoRef.current) videoRef.current.playbackRate = nextRate;
              }}
              className="text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded border border-white/20 hover:bg-white/20"
            >
              {playbackRate}x
            </button>

            <button onClick={toggleFullscreen} className="text-white hover:text-primary">
              <span className="material-symbols-outlined text-2xl">fullscreen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
