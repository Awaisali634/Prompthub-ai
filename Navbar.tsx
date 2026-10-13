import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Clapperboard, 
  TrendingUp, 
  BookOpen, 
  Bookmark, 
  Menu, 
  X,
  Compass,
  Layers,
  Shield,
  Info
} from 'lucide-react';
import { ActiveTab } from '../types';
import { PromptHubLogo } from './PromptHubLogo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  openSavedModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  openSavedModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0b0f17]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Tagline */}
          <button 
            onClick={() => handleNav('home')} 
            className="group text-left transition-transform active:scale-95 flex items-center"
            aria-label="PromptHub AI Home"
          >
            <PromptHubLogo size="md" showTagline={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'home'
                  ? 'bg-white/10 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              Overview
            </button>

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            <button
              onClick={() => handleNav('image-tool')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'image-tool'
                  ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-violet-400" />
              Image Prompts
            </button>

            <button
              onClick={() => handleNav('video-tool')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'video-tool'
                  ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <VideoIcon className="w-4 h-4 text-cyan-400" />
              Video Prompts
            </button>

            <button
              onClick={() => handleNav('script-tool')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'script-tool'
                  ? 'bg-rose-600/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clapperboard className="w-4 h-4 text-rose-400" />
              Script Studio
            </button>

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            <button
              onClick={() => handleNav('trending')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'trending'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Trending AI
            </button>

            <button
              onClick={() => handleNav('library')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'library'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Library
            </button>

            <button
              onClick={() => handleNav('about')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'about'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Info className="w-4 h-4 text-cyan-400" />
              About
            </button>
          </nav>

          {/* Right Action: Saved Prompts Counter & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openSavedModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#131b2e] border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 transition-all text-xs sm:text-sm font-medium group"
              title="View your saved prompts"
            >
              <Bookmark className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Saved</span>
              <span className="px-1.5 py-0.2 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {savedCount}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white lg:hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-30 bg-[#0b0f17]/95 backdrop-blur-2xl p-6 lg:hidden flex flex-col justify-between border-b border-white/10 animate-in fade-in duration-200 overflow-y-auto">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-2">
              Creation Tools
            </p>
            <button
              onClick={() => handleNav('image-tool')}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-violet-950/20 border border-violet-500/20 text-slate-100 hover:bg-violet-950/40 text-left font-medium"
            >
              <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white">AI Image Prompt Generator</div>
                <div className="text-xs text-slate-400">Midjourney v6, Flux, Photoreal, Anime</div>
              </div>
            </button>

            <button
              onClick={() => handleNav('video-tool')}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-slate-100 hover:bg-cyan-950/40 text-left font-medium"
            >
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                <VideoIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white">AI Video Prompt Generator</div>
                <div className="text-xs text-slate-400">Sora, Runway Gen-3, Camera Movement</div>
              </div>
            </button>

            <button
              onClick={() => handleNav('script-tool')}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-slate-100 hover:bg-rose-950/40 text-left font-medium"
            >
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white">AI Script Studio</div>
                <div className="text-xs text-slate-400">YouTube, TikTok/Reels, Ads, Stories</div>
              </div>
            </button>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-2">
                Discover
              </p>
              <button
                onClick={() => handleNav('trending')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-200 text-left"
              >
                <TrendingUp className="w-5 h-5 text-amber-400" />
                <span className="font-medium">Trending AI Prompts</span>
              </button>
              <button
                onClick={() => handleNav('library')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-200 text-left"
              >
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span className="font-medium">Prompt Library</span>
              </button>
              <button
                onClick={() => handleNav('home')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-200 text-left"
              >
                <Compass className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Platform Overview</span>
              </button>
              <button
                onClick={() => handleNav('about')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-200 text-left"
              >
                <Info className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">About & Support</span>
              </button>
              <button
                onClick={() => handleNav('privacy')}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-slate-200 text-left"
              >
                <Shield className="w-5 h-5 text-slate-400" />
                <span className="font-medium">Privacy Policy</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">PromptHub AI • Create Better. Faster. With AI.</p>
          </div>
        </div>
      )}

      {/* Mobile Bottom Quick Navigation Bar (Thumb Friendly) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0f17]/95 backdrop-blur-xl border-t border-white/10 lg:hidden px-2 py-1.5 flex items-center justify-around">
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activeTab === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => handleNav('image-tool')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activeTab === 'image-tool' ? 'text-violet-400 font-bold' : 'text-slate-400'
          }`}
        >
          <ImageIcon className="w-4 h-4 mb-0.5" />
          <span>Images</span>
        </button>
        <button
          onClick={() => handleNav('video-tool')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activeTab === 'video-tool' ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`}
        >
          <VideoIcon className="w-4 h-4 mb-0.5" />
          <span>Videos</span>
        </button>
        <button
          onClick={() => handleNav('script-tool')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activeTab === 'script-tool' ? 'text-rose-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Clapperboard className="w-4 h-4 mb-0.5" />
          <span>Scripts</span>
        </button>
        <button
          onClick={() => handleNav('trending')}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] ${
            activeTab === 'trending' ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" />
          <span>Trending</span>
        </button>
      </div>
    </>
  );
};
