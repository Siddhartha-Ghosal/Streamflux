import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CONTINUE_WATCHING, MOVIES } from '../data/mockData';
import { MovieCard } from './MovieCard';

export const ProfileScreen: React.FC = () => {
  const {
    profile,
    updateProfile,
    isDarkMode,
    toggleDarkMode,
    setActiveTab,
    openPlayer,
    openMovieDetails,
    watchlist,
    downloads,
    removeDownload,
    addPushNotification,
  } = useApp();

  const [activeModal, setActiveModal] = useState<'my-list' | 'downloads' | 'settings' | 'edit-avatar' | null>(null);
  const [avatarInput, setAvatarInput] = useState(profile.avatar);

  const savedMovies = MOVIES.filter((m) => watchlist.includes(m.id));

  const handleSaveAvatar = () => {
    if (avatarInput.trim()) {
      updateProfile({ avatar: avatarInput });
      addPushNotification('Profile Updated 📸', 'Your avatar image was updated successfully.');
      setActiveModal(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-background px-5 md:px-12 pt-20 md:pt-24 pb-28 max-w-6xl mx-auto flex flex-col gap-8">
      {/* Profile Header & Stats Bento */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-2 md:mt-4">
        {/* Avatar Ring */}
        <div className="relative group">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary neon-glow relative z-10 bg-surface-container-high">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full z-0 transform group-hover:scale-110 transition-transform duration-500" />
          <button
            onClick={() => setActiveModal('edit-avatar')}
            className="absolute bottom-0 right-0 w-10 h-10 rounded-full glass-panel flex items-center justify-center text-primary hover:bg-primary/20 transition-colors z-20 shadow-md"
            title="Edit Avatar"
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              edit
            </span>
          </button>
        </div>

        {/* User Info & Stats */}
        <div className="flex flex-col items-center md:items-start flex-1 gap-4 text-center md:text-left w-full">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-on-surface mb-1">
              {profile.name}
            </h2>
            <div className="inline-flex items-center gap-1.5 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/30">
              <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
              <span className="font-label-sm text-xs font-bold text-secondary uppercase tracking-wider">
                {profile.membership}
              </span>
            </div>
          </div>

          {/* Stats Bento */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md">
            <div className="glass-panel rounded-2xl p-4 flex flex-col items-center md:items-start justify-center">
              <span className="material-symbols-outlined text-primary mb-1 opacity-80">schedule</span>
              <span className="font-display text-2xl font-bold text-on-surface">{profile.hoursWatched}</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Hours Watched
              </span>
            </div>

            <div className="glass-panel rounded-2xl p-4 flex flex-col items-center md:items-start justify-center">
              <span className="material-symbols-outlined text-secondary mb-1 opacity-80">bookmark_added</span>
              <span className="font-display text-2xl font-bold text-on-surface">{watchlist.length}</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                Titles in List
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Continue Watching Section */}
      <section className="flex flex-col gap-3">
        <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_circle
          </span>
          Continue Watching
        </h3>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-3 -mx-5 px-5 md:mx-0 md:px-0 snap-x snap-mandatory">
          {CONTINUE_WATCHING.map((item) => (
            <div
              key={item.id}
              onClick={() => openPlayer(item)}
              className="min-w-[240px] md:min-w-[280px] flex-shrink-0 snap-start flex flex-col gap-2 group cursor-pointer"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden glass-panel group-hover:neon-glow transition-all duration-300">
                <img
                  src={item.backdropUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_arrow
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <h4 className="font-label-lg text-sm font-semibold text-on-surface truncate">{item.title}</h4>
                <span className="font-label-sm text-xs text-on-surface-variant">{item.duration}</span>
              </div>

              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden mt-0.5">
                <div
                  className="h-full gradient-progress rounded-full shadow-[0_0_8px_rgba(255,176,205,0.8)]"
                  style={{ width: `${item.watchProgress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu List Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => setActiveModal('my-list')}
          className="glass-panel p-4 rounded-2xl flex items-center justify-between group hover:bg-surface-bright/50 transition-all border-l-4 border-transparent hover:border-primary text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary">list</span>
            </div>
            <span className="font-body-lg text-base font-semibold text-on-surface">My List</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => setActiveModal('downloads')}
          className="glass-panel p-4 rounded-2xl flex items-center justify-between group hover:bg-surface-bright/50 transition-all border-l-4 border-transparent hover:border-secondary text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <span className="material-symbols-outlined text-secondary">download</span>
            </div>
            <div className="flex flex-col">
              <span className="font-body-lg text-base font-semibold text-on-surface">Downloads</span>
              <span className="font-label-sm text-xs text-on-surface-variant">
                {downloads.length} items saved offline
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => setActiveTab('subscriptions')}
          className="glass-panel p-4 rounded-2xl flex items-center justify-between group hover:bg-surface-bright/50 transition-all border-l-4 border-transparent hover:border-primary text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-primary">subscriptions</span>
            </div>
            <div className="flex flex-col">
              <span className="font-body-lg text-base font-semibold text-on-surface">Subscription Plan</span>
              <span className="font-label-sm text-xs text-on-surface-variant">
                Pro • Renews in {profile.renewDays} days
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
            chevron_right
          </span>
        </button>

        <button
          onClick={() => setActiveModal('settings')}
          className="glass-panel p-4 rounded-2xl flex items-center justify-between group hover:bg-surface-bright/50 transition-all border-l-4 border-transparent hover:border-secondary text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
              <span className="material-symbols-outlined text-secondary">settings</span>
            </div>
            <span className="font-body-lg text-base font-semibold text-on-surface">Settings</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:text-secondary transition-colors">
            chevron_right
          </span>
        </button>
      </section>

      {/* Sign Out Action */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => {
            addPushNotification('Signed Out 🚪', 'You have been logged out of StreamFlux.');
            setActiveTab('home');
          }}
          className="px-8 py-3 border border-error/50 rounded-full text-error hover:bg-error/10 transition-colors font-label-lg font-bold flex items-center gap-2 active:scale-95 text-sm"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          Sign Out
        </button>
      </div>

      {/* MODALS */}
      {/* 1. My List Modal */}
      {activeModal === 'my-list' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 relative max-h-[85vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bookmark</span> My Saved Titles
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {savedMovies.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant">
                <p>No titles in your list yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {savedMovies.map((m) => (
                  <MovieCard key={m.id} movie={m} aspectRatio="portrait" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Downloads Modal */}
      {activeModal === 'downloads' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-xl rounded-3xl p-6 relative max-h-[85vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">download</span> Offline Downloads
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {downloads.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant">
                <p>No offline downloads.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {downloads.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center gap-4 glass-panel p-3 rounded-xl border border-white/10"
                  >
                    <img src={d.posterUrl} alt={d.title} className="w-12 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-on-surface">{d.title}</h4>
                      <p className="text-xs text-on-surface-variant">{d.fileSize}</p>
                      {d.status === 'downloading' ? (
                        <div className="w-full h-1 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-secondary transition-all" style={{ width: `${d.progress}%` }} />
                        </div>
                      ) : (
                        <span className="text-[10px] text-tertiary font-bold flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-xs">check_circle</span> Ready to watch
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeDownload(d.id)}
                      className="p-2 text-error hover:bg-error/20 rounded-full"
                      title="Delete Download"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Settings Modal */}
      {activeModal === 'settings' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-lg rounded-3xl p-6 relative border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings</span> App Settings
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-on-surface-variant hover:text-white">
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* Theme toggle */}
              <div className="flex justify-between items-center glass-panel p-4 rounded-2xl">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Appearance Mode</h4>
                  <p className="text-xs text-on-surface-variant">Toggle between dark and light themes</p>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="px-4 py-2 bg-primary/20 border border-primary/40 text-primary font-bold text-xs rounded-full flex items-center gap-2 hover:bg-primary/30 transition-all shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                  </span>
                  <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              {/* Push Notifications Toggle */}
              <div className="flex justify-between items-center glass-panel p-4 rounded-2xl">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Push Notifications</h4>
                  <p className="text-xs text-on-surface-variant">Receive alerts for new releases and downloads</p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.pushEnabled}
                  onChange={(e) => updateProfile({ pushEnabled: e.target.checked })}
                  className="w-5 h-5 accent-primary cursor-pointer"
                />
              </div>

              {/* Wi-Fi Download Only */}
              <div className="flex justify-between items-center glass-panel p-4 rounded-2xl">
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Wi-Fi Only Downloads</h4>
                  <p className="text-xs text-on-surface-variant">Save mobile data when downloading 4K videos</p>
                </div>
                <input
                  type="checkbox"
                  checked={profile.wifiOnly}
                  onChange={(e) => updateProfile({ wifiOnly: e.target.checked })}
                  className="w-5 h-5 accent-secondary cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Edit Avatar Modal */}
      {activeModal === 'edit-avatar' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="glass-panel w-full max-w-md rounded-3xl p-6 relative border border-white/20">
            <h3 className="font-bold text-lg text-on-surface mb-4">Update Profile Avatar</h3>
            <input
              type="text"
              value={avatarInput}
              onChange={(e) => setAvatarInput(e.target.value)}
              placeholder="Enter Avatar Image URL"
              className="w-full bg-black/50 border border-white/20 rounded-xl p-3 text-sm text-white mb-4 focus:outline-none focus:border-primary"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs text-on-surface-variant font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAvatar}
                className="px-5 py-2 bg-primary text-background font-bold text-xs rounded-xl shadow-md"
              >
                Save Avatar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
