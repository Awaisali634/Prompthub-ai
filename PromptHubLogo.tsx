import React, { useId } from 'react';

interface PromptHubLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showBadge?: boolean;
  showTagline?: boolean;
  className?: string;
  iconOnly?: boolean;
}

export const PromptHubLogo: React.FC<PromptHubLogoProps> = ({
  size = 'md',
  showWordmark = true,
  showBadge = true,
  showTagline = false,
  className = '',
  iconOnly = false
}) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  // Dimension definitions
  const dimensions = {
    sm: { icon: 32, box: 'w-8 h-8', text: 'text-base', badge: 'text-[9px] px-1 py-0.2', tagline: 'text-[9px]' },
    md: { icon: 40, box: 'w-10 h-10', text: 'text-lg sm:text-xl', badge: 'text-[10px] px-1.5 py-0.5', tagline: 'text-[10px]' },
    lg: { icon: 48, box: 'w-12 h-12', text: 'text-xl sm:text-2xl', badge: 'text-[11px] px-2 py-0.5', tagline: 'text-xs' },
    xl: { icon: 64, box: 'w-16 h-16', text: 'text-2xl sm:text-3xl', badge: 'text-xs px-2.5 py-1', tagline: 'text-sm' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Icon Mark */}
      <div 
        className={`relative ${dimensions.box} rounded-xl p-[1px] transition-transform duration-300 group-hover:scale-105 shrink-0`}
        style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95) 0%, rgba(99, 102, 241, 0.85) 50%, rgba(168, 85, 247, 0.95) 100%)',
          boxShadow: '0 4px 20px -2px rgba(6, 182, 212, 0.25), 0 2px 10px -2px rgba(99, 102, 241, 0.3)'
        }}
      >
        {/* Outer ambient glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-violet-500/20 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
        
        {/* Inner container */}
        <div className="relative w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center overflow-hidden">
          {/* Subtle tech grid background pattern */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.4) 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />

          {/* SVG Vector Logo Icon */}
          <svg
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/4 h-3/4 relative z-10 drop-shadow-[0_2px_8px_rgba(6,182,212,0.4)]"
          >
            <defs>
              {/* Chevron Linear Gradient */}
              <linearGradient id={`ph-chev-${id}`} x1="12" y1="16" x2="38" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>

              {/* Spark Star Linear Gradient */}
              <linearGradient id={`ph-spark-${id}`} x1="36" y1="14" x2="56" y2="46" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="50%" stopColor="#67e8f9" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>

              {/* Core Glow Radial Gradient */}
              <radialGradient id={`ph-glow-${id}`} cx="44" cy="28" r="8" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </radialGradient>

              {/* Underline Cursor Gradient */}
              <linearGradient id={`ph-cur-${id}`} x1="14" y1="52" x2="42" y2="52" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            {/* Prompt Chevron Bracket ( > ) with smooth rounded geometry */}
            <path
              d="M16 17.5L31.5 31.5C32.3 32.2 32.3 33.4 31.5 34.1L16 48.1"
              stroke={`url(#ph-chev-${id})`}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* AI Generative Spark / 4-Point Star Nexus */}
            <path
              d="M44 14C44 21.5 48.5 26 56 26C48.5 26 44 30.5 44 38C44 30.5 39.5 26 32 26C39.5 26 44 21.5 44 14Z"
              fill={`url(#ph-spark-${id})`}
            />

            {/* Radiant Center Dot */}
            <circle cx="44" cy="26" r="2.5" fill="#ffffff" />
            <circle cx="44" cy="26" r="5" fill={`url(#ph-glow-${id})`} opacity="0.6" />

            {/* Mini prompt micro-spark satellite */}
            <circle cx="27" cy="18" r="1.5" fill="#38bdf8" opacity="0.9" />

            {/* Sleek Terminal Cursor Line under the prompt */}
            <rect
              x="22"
              y="48"
              width="22"
              height="3.5"
              rx="1.75"
              fill={`url(#ph-cur-${id})`}
            />
          </svg>
        </div>
      </div>

      {/* Wordmark (PromptHub AI) */}
      {!iconOnly && showWordmark && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className={`font-extrabold tracking-tight ${dimensions.text} leading-none flex items-center`}>
              <span className="text-white">Prompt</span>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Hub
              </span>
            </span>

            {/* AI Badge Pill */}
            {showBadge && (
              <span 
                className={`inline-flex items-center gap-1 font-bold rounded-md bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-violet-500/15 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider ${dimensions.badge} shadow-[0_0_10px_rgba(6,182,212,0.15)]`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>AI</span>
              </span>
            )}
          </div>

          {/* Subtitle / Tagline */}
          {showTagline && (
            <p className={`text-slate-400 font-medium tracking-wide mt-1 leading-none ${dimensions.tagline}`}>
              Create Better. Faster. With AI.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
