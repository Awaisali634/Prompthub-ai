import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Wand2, 
  Shuffle, 
  ChevronDown, 
  SlidersHorizontal,
  Info,
  Layers,
  Camera,
  Sun,
  Ratio,
  Cpu,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { ImagePromptResult, SavedPromptItem } from '../types';
import { getApiUrl } from '../config/api';
import { admobService } from '../services/admobService';

interface ImagePromptToolProps {
  onCopy: (text: string, label: string) => void;
  onSave: (item: Omit<SavedPromptItem, 'id' | 'createdAt'>) => void;
  initialPrompt?: string;
}

const STARTER_IDEAS = [
  "A cyberpunk samurai cat sitting on a neon rooftop in Tokyo rain",
  "Minimalist architectural concrete villa in Joshua Tree desert at dusk",
  "High-fashion futuristic metallic gown Vogue cover editorial",
  "Ethereal bioluminescent mushroom forest with glowing floating spirits",
  "Vintage 1970s analog portrait of a musician in a smoke-filled cafe"
];

const STYLES = [
  "Photorealistic Cinematic",
  "Anime & Manga (Makoto Shinkai style)",
  "3D Render (Octane / Unreal Engine 5)",
  "Dark Fantasy Oil Painting",
  "Retro 80s Synthwave / Cyberpunk",
  "Minimalist Vector Graphic",
  "Vintage 35mm Analog Film (Kodak Portra)",
  "Claymation & Stop Motion"
];

const ASPECT_RATIOS = [
  { label: "16:9 (Cinematic Landscape)", value: "16:9" },
  { label: "9:16 (TikTok / Story)", value: "9:16" },
  { label: "1:1 (Square Feed)", value: "1:1" },
  { label: "4:5 (Instagram Portrait)", value: "4:5" },
  { label: "21:9 (Ultrawide Cinema)", value: "21:9" }
];

const LIGHTING_OPTIONS = [
  "Dramatic Volumetric Chiaroscuro",
  "Golden Hour Warm Ambient Glow",
  "Vibrant Cyberpunk Neon Backlight",
  "Studio Softbox Clean Editorial",
  "Moody Overcast Misty Fog",
  "Bioluminescent Natural Luminescence"
];

const CAMERAS = [
  "35mm Anamorphic Lens, f/1.4",
  "85mm Portrait Prime Lens, f/1.2",
  "Ultra-Wide 14mm Dramatic Angle",
  "Macro 100mm Extreme Close-Up",
  "Hasselblad Medium Format 100c",
  "Overhead 4K Drone Aerial"
];

const ENGINES = [
  "Midjourney v6.1",
  "Flux.1 Pro / Dev",
  "Stable Diffusion XL",
  "DALL-E 3"
];

export const ImagePromptTool: React.FC<ImagePromptToolProps> = ({
  onCopy,
  onSave,
  initialPrompt = ""
}) => {
  const [idea, setIdea] = useState(initialPrompt);
  const [style, setStyle] = useState(STYLES[0]);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [lighting, setLighting] = useState(LIGHTING_OPTIONS[0]);
  const [camera, setCamera] = useState(CAMERAS[0]);
  const [engine, setEngine] = useState(ENGINES[0]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ImagePromptResult | null>(null);
  const [copiedMaster, setCopiedMaster] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!idea.trim()) return;

    setIsLoading(true);
    setCopiedMaster(false);
    setCopiedNegative(false);
    setSaved(false);

    try {
      const res = await fetch(getApiUrl('/api/generate-image-prompt'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea,
          style,
          aspectRatio,
          lighting,
          camera,
          engine,
        }),
      });

      if (!res.ok) throw new Error('Generation failed');
      const data: ImagePromptResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback display if error
      setResult({
        masterPrompt: `Award-winning master photography of ${idea}, rendered in immaculate ${style}. Captured on ${camera}, featuring ${lighting}. Rich depth of field, hyper-detailed textures, atmospheric haze, cinematic composition, Octane 8K render clarity, masterwork. --ar ${aspectRatio} --v 6.1 --style raw`,
        shortPrompt: `Cinematic ${style} portrait of ${idea}, illuminated by ${lighting}, shot on ${camera}, 8k photorealistic.`,
        negativePrompt: `blurry, deformed limbs, bad anatomy, low resolution, jpeg artifacts, plastic skin, distorted proportions, signature, watermark`,
        parameters: `--ar ${aspectRatio} --v 6.1 --style raw --s 250`,
        styleBreakdown: [
          { label: "Style", value: style },
          { label: "Lighting", value: lighting },
          { label: "Lens", value: camera },
          { label: "Aspect Ratio", value: aspectRatio }
        ],
        proTip: `For ${engine}, keep the primary subject in the first few words and avoid generic fillers like "hyper-detailed".`
      });
    } finally {
      setIsLoading(false);
      admobService.onGenerationCompleted();
    }
  };

  const handleRandomIdea = () => {
    const random = STARTER_IDEAS[Math.floor(Math.random() * STARTER_IDEAS.length)];
    setIdea(random);
  };

  const handleReset = () => {
    setIdea('');
    setResult(null);
    setCopiedMaster(false);
    setCopiedNegative(false);
    setSaved(false);
    onCopy('', 'Tool reset successfully');
  };

  const copyToClipboard = (text: string, type: 'master' | 'negative' | 'var') => {
    if (type === 'master') {
      setCopiedMaster(true);
      setTimeout(() => setCopiedMaster(false), 2000);
      onCopy(text, 'Master Image Prompt');
    } else if (type === 'negative') {
      setCopiedNegative(true);
      setTimeout(() => setCopiedNegative(false), 2000);
      onCopy(text, 'Negative Prompt');
    } else {
      onCopy(text, 'Variation Prompt');
    }
  };

  const handleSaveToLibrary = () => {
    if (!result) return;
    onSave({
      type: 'image',
      title: idea.slice(0, 45) + (idea.length > 45 ? '...' : ''),
      content: result.masterPrompt,
      tags: [engine, style.split(' ')[0], aspectRatio],
      metadata: {
        negativePrompt: result.negativePrompt,
        parameters: result.parameters,
        style,
        lighting,
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Tool Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-3">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Image Prompt Studio</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Image Prompt Generator
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Transform simple thoughts into studio-grade Midjourney v6, Flux, and SDXL prompts with custom lighting, camera optics, and negative filters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f172a]/80 border border-violet-500/20 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/30 backdrop-blur-md">
            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Primary Idea Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    Simple Concept or Idea
                  </label>
                  <div className="flex items-center gap-2">
                    {idea && (
                      <button
                        type="button"
                        onClick={() => setIdea('')}
                        className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        Clear text
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleRandomIdea}
                      className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"
                    >
                      <Shuffle className="w-3 h-3" />
                      Random Idea
                    </button>
                  </div>
                </div>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. Cyberpunk samurai cat resting on a neon sign in Tokyo rain..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0f17] border border-white/10 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-slate-100 placeholder-slate-500 text-sm leading-relaxed resize-none transition-all outline-none"
                  required
                />
              </div>

              {/* Quick Starter Chips */}
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-2">
                  Quick Idea Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {STARTER_IDEAS.slice(0, 3).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setIdea(preset)}
                      className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-white/5 hover:bg-violet-950/40 border border-white/5 hover:border-violet-500/30 text-slate-300 hover:text-white transition-all truncate max-w-full"
                    >
                      {preset.slice(0, 32)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Target AI Engine */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Cpu className="w-3.5 h-3.5 text-violet-400" />
                  Target AI Engine
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ENGINES.map((eng) => (
                    <button
                      key={eng}
                      type="button"
                      onClick={() => setEngine(eng)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                        engine === eng
                          ? 'bg-violet-600/20 border-violet-500 text-white shadow-sm shadow-violet-950'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                      }`}
                    >
                      {eng}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Layers className="w-3.5 h-3.5 text-violet-400" />
                  Visual Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-violet-500 outline-none transition-all cursor-pointer"
                >
                  {STYLES.map((st) => (
                    <option key={st} value={st} className="bg-[#0f172a]">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Aspect Ratio Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Ratio className="w-3.5 h-3.5 text-violet-400" />
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-violet-500 outline-none transition-all cursor-pointer"
                >
                  {ASPECT_RATIOS.map((ar) => (
                    <option key={ar.value} value={ar.value} className="bg-[#0f172a]">
                      {ar.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggle Advanced Optics & Lighting */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-all"
                >
                  <span className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-violet-400" />
                    Advanced Optics & Lighting
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                </button>

                {showAdvanced && (
                  <div className="mt-3 p-3.5 rounded-xl bg-[#0b0f17]/90 border border-white/5 space-y-3 animate-in fade-in duration-200">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                        <Sun className="w-3 h-3 text-amber-400" />
                        Lighting Setup
                      </label>
                      <select
                        value={lighting}
                        onChange={(e) => setLighting(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-white/10 text-xs text-slate-200 outline-none"
                      >
                        {LIGHTING_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 mb-1">
                        <Camera className="w-3 h-3 text-cyan-400" />
                        Camera Lens & Optics
                      </label>
                      <select
                        value={camera}
                        onChange={(e) => setCamera(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#131b2e] border border-white/10 text-xs text-slate-200 outline-none"
                      >
                        {CAMERAS.map((cam) => (
                          <option key={cam} value={cam}>
                            {cam}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Generate & Reset */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="submit"
                  disabled={isLoading || !idea.trim()}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-500 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-950/60 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Engineering Master Prompt...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-violet-200" />
                      <span>Generate Image Prompt</span>
                    </>
                  )}
                </button>

                {(idea || result) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
                    title="Clear input and reset generated prompts"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Prompt Output Display (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Primary Master Prompt Card */}
              <div className="bg-[#0f172a]/90 border border-violet-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                      Master Prompt
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {engine}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
                      title="Clear and start new prompt"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Clear</span>
                    </button>

                    <button
                      onClick={handleSaveToLibrary}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
                      title="Save to your library"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-violet-400" />
                      <span>{saved ? 'Saved!' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => copyToClipboard(result.masterPrompt, 'master')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copiedMaster
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-violet-600 hover:bg-violet-500 text-white shadow-md shadow-violet-950'
                      }`}
                    >
                      {copiedMaster ? (
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
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b0f17] border border-white/5 text-slate-200 text-sm leading-relaxed font-mono select-all break-words mb-4">
                  {result.masterPrompt}
                </div>

                {/* Parameters Tag */}
                {result.parameters && (
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-white/5 text-slate-300 font-mono">
                    <span className="text-slate-400">Parameters:</span>
                    <span className="text-violet-300 font-semibold">{result.parameters}</span>
                  </div>
                )}
              </div>

              {/* Negative Prompt Box */}
              {result.negativePrompt && (
                <div className="bg-[#0f172a]/70 border border-rose-500/20 rounded-2xl p-5 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      Negative Prompt (Unwanted Artifacts)
                    </span>
                    <button
                      onClick={() => copyToClipboard(result.negativePrompt!, 'negative')}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      {copiedNegative ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedNegative ? 'Copied' : 'Copy Negative'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 font-mono bg-[#0b0f17] p-3 rounded-xl border border-white/5 select-all leading-relaxed">
                    {result.negativePrompt}
                  </p>
                </div>
              )}

              {/* 3 Creative Variations */}
              {result.variations && result.variations.length > 0 && (
                <div className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-5 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-violet-400" />
                    Creative Angle Variations
                  </h3>
                  <div className="space-y-2.5">
                    {result.variations.map((v, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 hover:border-violet-500/30 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-violet-300">
                            {v.title}
                          </span>
                          <button
                            onClick={() => copyToClipboard(v.prompt, 'var')}
                            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 opacity-75 group-hover:opacity-100 transition-opacity"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs text-slate-300 font-mono leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                          {v.prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Style Breakdown & Pro Tip */}
              {result.proTip && (
                <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 flex items-start gap-3 text-xs text-slate-300">
                  <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-violet-200 block mb-0.5">Prompt Engineering Insider Tip</span>
                    <p className="text-slate-400 leading-relaxed">{result.proTip}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty State Guide */
            <div className="h-full min-h-[380px] bg-[#0f172a]/40 border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                <Wand2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Ready to Engineer</h3>
              <p className="text-sm text-slate-400 max-w-sm mb-6">
                Type an idea on the left or select a quick preset to generate a Midjourney/Flux production prompt with negative filtering.
              </p>
              <div className="grid grid-cols-2 gap-2 text-left max-w-sm w-full text-xs text-slate-400">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-200 font-medium block">🎯 Midjourney v6.1</span>
                  <span>Photorealistic tuning & parameter tags</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-200 font-medium block">🚫 Negative Prompt</span>
                  <span>Eliminates extra limbs, morphs & blur</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
