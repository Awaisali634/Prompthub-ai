import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Layers,
  Image as ImageIcon,
  Video as VideoIcon,
  Clapperboard
} from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="relative pt-6 pb-12 sm:pt-12 sm:pb-16 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/15 to-cyan-400/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6 shadow-inner">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-300">
            Next-Gen AI Creator Engine • 100% Free Prototype
          </span>
          <span className="text-xs text-cyan-400 font-semibold flex items-center">
            v1.0 Ready <ArrowRight className="w-3 h-3 ml-0.5" />
          </span>
        </div>

        {/* Main Branding Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            PromptHub
          </span>{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-violet-400">
            AI
          </span>
        </h1>

        {/* Required Tagline */}
        <p className="text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300 mb-6">
          Create Better. Faster. With AI.
        </p>

        {/* Supporting Copy */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed mb-8">
          AI-powered tools for creating image prompts, video prompts, scripts, and trending content ideas. Generate photorealistic visual prompts, cinematic camera choreography, and viral production scripts in seconds.
        </p>

        {/* Fast Action CTA Group */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto mb-10">
          <button
            onClick={() => setActiveTab('image-tool')}
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-950/50 hover:shadow-violet-700/40 transition-all active:scale-95"
          >
            <ImageIcon className="w-4 h-4 text-violet-200" />
            Image Studio
          </button>

          <button
            onClick={() => setActiveTab('video-tool')}
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-950/50 hover:shadow-cyan-700/40 transition-all active:scale-95"
          >
            <VideoIcon className="w-4 h-4 text-cyan-200" />
            Video Studio
          </button>

          <button
            onClick={() => setActiveTab('script-tool')}
            className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-rose-950/50 hover:shadow-rose-700/40 transition-all active:scale-95"
          >
            <Clapperboard className="w-4 h-4 text-rose-200" />
            Script Studio
          </button>
        </div>

        {/* Trust & Creator Micro Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-white/[0.08] text-slate-400 text-xs">
          <div className="flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Instant 1-Click Copy</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Viral Retention Tested</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Multi-Engine Tuning</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
        </div>
      </div>
    </section>
  );
};
