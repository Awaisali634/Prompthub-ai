import React from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Clapperboard, 
  ArrowRight, 
  Sliders, 
  Camera, 
  Film, 
  Flame, 
  CheckCircle,
  Copy
} from 'lucide-react';
import { ActiveTab } from '../types';

interface ToolCardsProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const ToolCards: React.FC<ToolCardsProps> = ({ setActiveTab }) => {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Core Generative Engines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Three Powerful AI Creation Studios
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select a specialized tool designed for maximum fidelity and creator workflow.
            </p>
          </div>
        </div>

        {/* 3 Attractive Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: AI Image Prompt Generator */}
          <div className="relative group rounded-2xl bg-[#0f172a]/70 hover:bg-[#111c35]/90 border border-violet-500/20 hover:border-violet-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-violet-950/30 overflow-hidden">
            {/* Ambient Card Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
                  Tool 01
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-violet-200 transition-colors mb-2 flex items-center gap-2">
                AI Image Prompt Generator
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Turn simple concepts into photorealistic Midjourney, Flux.1, and SDXL prompts with custom camera, lighting, and negative prompts.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span>Cinematic camera, lens & lighting presets</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span>Built-in negative prompt engineering</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                  <span>3 instant creative variations per idea</span>
                </div>
              </div>

              {/* Engine Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Midjourney v6.1', 'Flux.1 Pro', 'DALL-E 3', 'SDXL'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400 border border-white/5 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('image-tool')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-violet-600/20 hover:bg-violet-600 text-violet-200 hover:text-white border border-violet-500/30 hover:border-violet-500 font-semibold text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-violet-900/40 active:scale-98"
            >
              <span>Launch Image Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: AI Video Prompt Generator */}
          <div className="relative group rounded-2xl bg-[#0f172a]/70 hover:bg-[#111c35]/90 border border-cyan-500/20 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-cyan-950/30 overflow-hidden">
            {/* Ambient Card Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                  <VideoIcon className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Tool 02
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors mb-2 flex items-center gap-2">
                AI Video Prompt Generator
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Choreograph cinematic video prompts with camera physics, subject motion, atmospheric lighting, and anti-warp negative commands.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Dolly, orbital, FPV & tracking camera paths</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Zero-morphing & anti-glitch negative controls</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Director notes & sound design pacing</span>
                </div>
              </div>

              {/* Engine Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Sora', 'Runway Gen-3', 'Luma Dream', 'Kling AI'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400 border border-white/5 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('video-tool')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-200 hover:text-white border border-cyan-500/30 hover:border-cyan-500 font-semibold text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-cyan-900/40 active:scale-98"
            >
              <span>Launch Video Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: TikTok / Reels Script Generator */}
          <div className="relative group rounded-2xl bg-[#0f172a]/70 hover:bg-[#111c35]/90 border border-rose-500/20 hover:border-rose-500/50 p-6 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-rose-950/30 overflow-hidden">
            {/* Ambient Card Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                  <Clapperboard className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  Tool 03
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-rose-200 transition-colors mb-2 flex items-center gap-2">
                AI Script Studio
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Generate complete production scripts for YouTube, TikTok/Reels, Instagram, Advertisements, and Stories with custom tone, language, and scene directions.
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>5 Formats: YouTube, TikTok/Reels, Instagram, Ads & Stories</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Professional, Funny, Emotional & Cinematic tones</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Teleprompter view, scene breakdowns & captions</span>
                </div>
              </div>

              {/* Engine Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {['YouTube', 'TikTok / Reels', 'Instagram', 'Advertisement', 'Story'].map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-slate-400 border border-white/5 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('script-tool')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/30 hover:border-rose-500 font-semibold text-sm transition-all duration-200 group-hover:shadow-lg group-hover:shadow-rose-900/40 active:scale-98"
            >
              <span>Launch Script Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
