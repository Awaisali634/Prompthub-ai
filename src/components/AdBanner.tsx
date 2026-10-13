import React from 'react';
import { ADMOB_CONFIG } from '../config/admob';

interface AdBannerProps {
  slotId: 'homeBanner' | 'studioResultsBanner';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId,
  className = ''
}) => {
  // If ads are disabled globally in config, don't render anything
  if (!ADMOB_CONFIG.enabled) {
    return null;
  }

  const slot = ADMOB_CONFIG?.slots?.[slotId];
  if (!slot) {
    return null;
  }

  return (
    <aside 
      aria-label="Advertisement"
      className={`w-full max-w-5xl mx-auto my-8 sm:my-10 px-4 sm:px-0 select-none ${className}`}
    >
      {/* Discreet Compliance Label */}
      <div className="flex items-center justify-between pb-1 px-1">
        <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase">
          Advertisement
        </span>
        <span className="text-[10px] font-mono text-slate-400">
          AdMob Ready
        </span>
      </div>

      {/* Ad Placement Container Frame */}
      <div 
        className="w-full min-h-[90px] sm:min-h-[100px] rounded-2xl bg-[#0f172a]/40 border border-dashed border-white/10 hover:border-white/20 transition-colors flex items-center justify-center p-3 relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(11, 15, 23, 0.6) 100%)'
        }}
      >
        {/* AdMob / AdSense Unit Tag (Standard insertion container) */}
        <div 
          id={slot.slotId}
          data-ad-client={ADMOB_CONFIG.publisherId}
          data-ad-slot={slot.adUnitId}
          data-ad-format={slot.format}
          data-full-width-responsive="true"
          className="w-full h-full flex flex-col items-center justify-center text-center py-2"
        >
          {/* Subtle non-intrusive placeholder state (No fake ads) */}
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span className="font-medium text-slate-300">
              Reserved Ad Placement Area
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 max-w-sm">
            Non-intrusive responsive banner slot configured for future Google AdMob integration.
          </p>
        </div>
      </div>
    </aside>
  );
};
