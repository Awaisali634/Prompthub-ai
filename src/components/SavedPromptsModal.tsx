import React, { useState } from 'react';
import { 
  Bookmark, 
  X, 
  Trash2, 
  Copy, 
  Check, 
  Download, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Clapperboard,
  Sparkles
} from 'lucide-react';
import { SavedPromptItem } from '../types';

interface SavedPromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPrompts: SavedPromptItem[];
  onDeletePrompt: (id: string) => void;
  onClearAll: () => void;
  onCopy: (text: string, label: string) => void;
}

export const SavedPromptsModal: React.FC<SavedPromptsModalProps> = ({
  isOpen,
  onClose,
  savedPrompts,
  onDeletePrompt,
  onClearAll,
  onCopy,
}) => {
  const [filter, setFilter] = useState<'all' | 'image' | 'video' | 'script'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = savedPrompts.filter((p) => {
    if (filter === 'all') return true;
    return p.type === filter;
  });

  const handleCopy = (item: SavedPromptItem) => {
    onCopy(item.content, item.title);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedPrompts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `prompthub-saved-prompts-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Your Saved Prompts</h3>
              <p className="text-xs text-slate-400">{savedPrompts.length} prompts stored in browser cache</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedPrompts.length > 0 && (
              <button
                onClick={exportAsJSON}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition-colors"
                title="Export as JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-5 py-3 border-b border-white/5 bg-[#0b0f17]/50 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({savedPrompts.length})
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'image'
                  ? 'bg-violet-500/20 text-violet-300 font-semibold border border-violet-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Images
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'video'
                  ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setFilter('script')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                filter === 'script'
                  ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Scripts
            </button>
          </div>

          {savedPrompts.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#0b0f17] border border-white/5 hover:border-white/10 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`p-1 rounded ${
                        item.type === 'image' 
                          ? 'bg-violet-500/20 text-violet-400' 
                          : item.type === 'video'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {item.type === 'image' ? (
                          <ImageIcon className="w-3.5 h-3.5" />
                        ) : item.type === 'video' ? (
                          <VideoIcon className="w-3.5 h-3.5" />
                        ) : (
                          <Clapperboard className="w-3.5 h-3.5" />
                        )}
                      </span>
                      <span className="text-xs font-bold text-white truncate max-w-[280px]">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopy(item)}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => onDeletePrompt(item.id)}
                        className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 font-mono line-clamp-3 select-all leading-relaxed">
                    {item.content}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <div className="flex gap-1">
                      {item.tags.map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center">
              <Bookmark className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-300">No saved prompts yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Generate prompts in any studio and click "Save" to build your private collection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
