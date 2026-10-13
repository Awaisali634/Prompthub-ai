import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Copy, 
  Check, 
  Flame, 
  ArrowUpRight, 
  Wand2,
  Image as ImageIcon,
  Video as VideoIcon,
  Clapperboard,
  ExternalLink
} from 'lucide-react';
import { TRENDING_ITEMS } from '../data/trendingData';
import { TrendingItem, ActiveTab } from '../types';

interface TrendingSectionProps {
  onCopy: (text: string, label: string) => void;
  onUseInTool: (prompt: string, tool: 'image' | 'video' | 'script') => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  onCopy,
  onUseInTool,
}) => {
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'script'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredItems = TRENDING_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.toolType === filter;
  });

  const handleCopy = (item: TrendingItem) => {
    onCopy(item.fullPrompt, item.title);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Real-Time Virality Feed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Trending AI Prompts
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top-performing generative prompts and retention structures tested by leading creators.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-[#0f172a] border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Trends
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'image'
                  ? 'bg-violet-500/20 text-violet-300 font-semibold border border-violet-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Images
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'video'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              Videos
            </button>
            <button
              onClick={() => setFilter('script')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'script'
                  ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              Shorts Scripts
            </button>
          </div>
        </div>

        {/* Trending Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="relative rounded-2xl bg-[#0f172a]/70 hover:bg-[#111c35]/90 border border-white/10 hover:border-amber-500/40 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/30 group overflow-hidden"
              >
                {/* Header with Badge & Engine */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.engine}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {item.preview}
                  </p>

                  {/* Prompt Text Preview Box */}
                  <div className="p-3 rounded-xl bg-[#0b0f17] border border-white/5 text-[11px] text-slate-300 font-mono line-clamp-3 group-hover:line-clamp-none transition-all mb-4 select-all">
                    {item.fullPrompt}
                  </div>
                </div>

                {/* Footer Metrics & Actions */}
                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="flex items-center gap-1 font-mono text-slate-300">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      {item.copiesCount} copies
                    </span>
                    <span className="text-emerald-400 font-mono font-medium">
                      {item.growth} this week
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopy(item)}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isCopied
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onUseInTool(item.fullPrompt, item.toolType)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 hover:border-amber-500/40 transition-all active:scale-98"
                    >
                      <span>Use in Studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
