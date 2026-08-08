import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const SubscriptionsScreen: React.FC = () => {
  const { profile, updateProfile, addPushNotification } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'ultra' | 'free'>('pro');

  const handleUpgrade = (planName: string, membershipLabel: string) => {
    updateProfile({ membership: membershipLabel });
    addPushNotification('Plan Updated 🎉', `Your account is now subscribed to ${planName}.`);
  };

  return (
    <div className="min-h-screen bg-background text-on-background px-5 md:px-12 pt-20 md:pt-24 pb-28 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="px-3 py-1 bg-secondary/20 border border-secondary/40 text-secondary text-xs font-bold rounded-full uppercase tracking-wider">
          StreamFlux Memberships
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold text-on-surface mt-3 mb-2">
          Choose Your Streaming Power
        </h1>
        <p className="text-on-surface-variant text-sm md:text-base">
          Unlimited 4K HDR streams, spatial audio, and multi-device downloads with no ads.
        </p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Plan */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all">
          <div>
            <h3 className="font-bold text-lg text-on-surface mb-1">Standard HD</h3>
            <p className="text-xs text-on-surface-variant mb-4">Ad-supported basic streaming</p>
            <div className="text-2xl font-extrabold text-white mb-6">$0 / month</div>
            <ul className="flex flex-col gap-3 text-xs text-on-surface-variant mb-6">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check</span> 720p HD Streaming
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check</span> 1 Screen simultaneously
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-sm">check</span> Limited catalog
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade('Standard HD', 'FREE MEMBER')}
            className="w-full py-3 bg-surface-variant text-on-surface font-bold text-xs rounded-xl hover:bg-surface-bright transition-all"
          >
            Switch to Free
          </button>
        </div>

        {/* Pro Plan (Active Default) */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between border-2 border-primary neon-glow relative transform md:-translate-y-2">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background font-extrabold text-[10px] px-3 py-1 rounded-full uppercase shadow-md">
            Most Popular
          </span>
          <div>
            <h3 className="font-bold text-lg text-on-surface mb-1">PRO MEMBER</h3>
            <p className="text-xs text-on-surface-variant mb-4">Ultra-fast 4K & Dolby Atmos</p>
            <div className="text-3xl font-extrabold text-primary mb-6">$14.99 / month</div>
            <ul className="flex flex-col gap-3 text-xs text-on-surface mb-6">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">check</span> 4K HDR & 1080p Full HD
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">check</span> 4 Screens simultaneously
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">check</span> Offline downloads (Unlimited)
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm">check</span> Zero Ads & Dolby Audio
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade('Pro Plan', 'PRO MEMBER')}
            className="w-full py-3 bg-primary text-background font-extrabold text-xs rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            {profile.membership === 'PRO MEMBER' ? 'Current Active Plan' : 'Select Pro Plan'}
          </button>
        </div>

        {/* Ultra 4K Plan */}
        <div className="glass-panel p-6 rounded-3xl flex flex-col justify-between border border-secondary/50 hover:border-secondary transition-all">
          <div>
            <h3 className="font-bold text-lg text-on-surface mb-1">ULTRA 8K VIP</h3>
            <p className="text-xs text-on-surface-variant mb-4">For ultimate audio-visual enthusiasts</p>
            <div className="text-2xl font-extrabold text-secondary mb-6">$24.99 / month</div>
            <ul className="flex flex-col gap-3 text-xs text-on-surface-variant mb-6">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm">check</span> 8K & IMAX Enhanced
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm">check</span> 8 Screens simultaneously
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm">check</span> Spatial Audio & VR Access
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-sm">check</span> VIP Early Releases
              </li>
            </ul>
          </div>
          <button
            onClick={() => handleUpgrade('Ultra 8K VIP', 'ULTRA VIP')}
            className="w-full py-3 bg-secondary/20 border border-secondary text-secondary font-extrabold text-xs rounded-xl hover:bg-secondary/30 transition-all"
          >
            Upgrade to Ultra 8K
          </button>
        </div>
      </div>
    </div>
  );
};
