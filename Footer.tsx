import React from 'react';
import { Heart, Shield, Terminal, ArrowUp, Info, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';
import { PromptHubLogo } from './PromptHubLogo';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#080c14] pt-12 pb-24 lg:pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <PromptHubLogo size="sm" showBadge={true} />
            <p className="font-semibold text-slate-300">
              Create Better. Faster. With AI.
            </p>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              AI-powered tools for creating image prompts, video prompts, scripts, and trending content ideas.
            </p>
          </div>

          {/* Col 2: Generative Studios */}
          <div className="space-y-2">
            <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Generation Studios
            </p>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => { setActiveTab('image-tool'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Image Prompt Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('video-tool'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  AI Video Prompt Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('script-tool'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  TikTok / Reels Script Generator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Discovery Vaults */}
          <div className="space-y-2">
            <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Prompt Vaults
            </p>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => { setActiveTab('trending'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Trending AI Prompts
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('library'); scrollToTop(); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Tested Prompt Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('home'); scrollToTop(); }}
                  className="hover:text-slate-200 transition-colors"
                >
                  Platform Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('about'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  <span>About & Support</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setActiveTab('privacy'); scrollToTop(); }}
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Engine Compatibility */}
          <div className="space-y-2">
            <p className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Supported Engines
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                'Midjourney v6.1',
                'Flux.1',
                'OpenAI Sora',
                'Runway Gen-3',
                'Luma Dream',
                'Kling AI',
                'TikTok / Reels',
                'DALL-E 3',
                'Gemini 3 Flash'
              ].map((m) => (
                <span key={m} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-slate-300 font-mono">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} PromptHub AI. Built for creators worldwide.</span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <button
              onClick={() => { setActiveTab('about'); scrollToTop(); }}
              className="text-slate-400 hover:text-cyan-400 underline underline-offset-4 decoration-white/20 hover:decoration-cyan-400 transition-colors"
            >
              About & Support
            </button>
            <span className="text-white/20 hidden sm:inline">•</span>
            <button
              onClick={() => { setActiveTab('privacy'); scrollToTop(); }}
              className="text-slate-400 hover:text-cyan-400 underline underline-offset-4 decoration-white/20 hover:decoration-cyan-400 transition-colors"
            >
              Privacy Policy
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
