import React from 'react';
import { CheckCircle2, Copy, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  type?: 'success' | 'info' | 'copy';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage, type = 'copy', onClose }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3 px-4 py-3 bg-[#131b2e] border border-cyan-500/30 text-white rounded-xl shadow-2xl shadow-cyan-950/50 backdrop-blur-md">
        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
          {type === 'copy' ? (
            <Copy className="w-4 h-4" />
          ) : type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <Sparkles className="w-4 h-4 text-indigo-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-100">{message}</p>
          {subMessage && <p className="text-xs text-slate-400 truncate">{subMessage}</p>}
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
