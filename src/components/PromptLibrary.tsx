import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Filter, 
  Sparkles, 
  Tag, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Clapperboard, 
  Flame,
  X
} from 'lucide-react';
import { LIBRARY_PROMPTS } from '../data/libraryData';
import { PromptLibraryItem } from '../types';

interface PromptLibraryProps {
  onCopy: (text: string, label: string) => void;
  onUseInTool: (prompt: string, tool: 'image' | 'video' | 'script') => void;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  onCopy,
  onUseInTool,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'image' | 'video' | 'script' | 'hook'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPrompts = useMemo(() => {
    return LIBRARY_PROMPTS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = search.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesText = 
        item.title.toLowerCase().includes(query) ||
        item.prompt.toLowerCase().includes(query) ||
        item.engine.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query));

      return matchesCategory && matchesText;
    });
  }, [search, selectedCategory]);

  const handleCopy = (item: PromptLibraryItem) => {
    onCopy(item.prompt, item.title);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const mapToolCategory = (category: string): 'image' | 'video' | 'script' => {
    if (category === 'video') return 'video';
    if (category === 'script' || category === 'hook') return 'script';
    return 'image';
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tested Production Vault</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Prompt Library
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Curated master templates engineered for maximum visual fidelity and engagement.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search prompts, tags, engines..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-[#0f172a] border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 font-semibold'
                : 'bg-[#0f172a] border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            All Prompts ({LIBRARY_PROMPTS.length})
          </button>
          <button
            onClick={() => setSelectedCategory('image')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === 'image'
                ? 'bg-violet-600/30 text-violet-200 border border-violet-500/50 font-semibold'
                : 'bg-[#0f172a] border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
            Image Prompts
          </button>
          <button
            onClick={() => setSelectedCategory('video')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === 'video'
                ? 'bg-cyan-600/30 text-cyan-200 border border-cyan-500/50 font-semibold'
                : 'bg-[#0f172a] border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <VideoIcon className="w-3.5 h-3.5 text-cyan-400" />
            Video Prompts
          </button>
          <button
            onClick={() => setSelectedCategory('script')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === 'script'
                ? 'bg-rose-600/30 text-rose-200 border border-rose-500/50 font-semibold'
                : 'bg-[#0f172a] border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5 text-rose-400" />
            Social Scripts
          </button>
          <button
            onClick={() => setSelectedCategory('hook')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedCategory === 'hook'
                ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 font-semibold'
                : 'bg-[#0f172a] border border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            Viral Hooks
          </button>
        </div>

        {/* Prompt Cards Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-[#0f172a]/70 hover:bg-[#111c35]/90 border border-white/10 hover:border-indigo-500/40 p-5 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/25 group"
                >
                  <div>
                    {/* Top Row: Engine & Category */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                        {item.engine}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.copies.toLocaleString()} copies
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors mb-2">
                      {item.title}
                    </h3>

                    {/* Prompt Box */}
                    <div className="p-3 rounded-xl bg-[#0b0f17] border border-white/5 text-xs text-slate-300 font-mono leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all mb-3 select-all">
                      {item.prompt}
                    </div>

                    {/* Pro notes */}
                    {item.notes && (
                      <p className="text-[11px] text-indigo-300/80 italic mb-4">
                        💡 {item.notes}
                      </p>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
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
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onUseInTool(item.prompt, mapToolCategory(item.category))}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all active:scale-98"
                    >
                      <span>Open in Studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty search state */
          <div className="text-center py-16 bg-[#0f172a]/40 rounded-2xl border border-white/5">
            <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-white mb-1">No prompts found</h4>
            <p className="text-xs text-slate-400 mb-4">
              Try searching for different keywords like "cyberpunk", "drone", "reels", or reset the filter.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-xs font-medium text-white hover:bg-white/15"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
