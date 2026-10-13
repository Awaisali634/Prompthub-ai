import React, { useState } from 'react';
import { 
  Clapperboard, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Flame, 
  Clock, 
  Globe, 
  Sliders, 
  Hash, 
  Music, 
  Eye, 
  Shuffle, 
  RotateCcw,
  Film,
  Tv,
  Share2,
  Megaphone,
  BookOpen,
  Volume2,
  Smile,
  Briefcase,
  Heart,
  Camera,
  Layers,
  FileText,
  AlignLeft
} from 'lucide-react';
import { ScriptResult, SavedPromptItem, ScriptContentType, ScriptTone } from '../types';
import { getApiUrl } from '../config/api';
import { admobService } from '../services/admobService';

interface ScriptStudioProps {
  onCopy: (text: string, label: string) => void;
  onSave: (item: Omit<SavedPromptItem, 'id' | 'createdAt'>) => void;
  initialPrompt?: string;
}

const STARTER_TOPICS: Record<ScriptContentType, string[]> = {
  'YouTube': [
    "How to build a $10,000/month digital product business from your bedroom",
    "Why 99% of people will be replaced by AI in 5 years (and how to adapt)",
    "I tested 50 morning productivity routines for 30 days — here is what actually works",
    "The untold psychological trick behind Steve Jobs' iconic keynote speeches"
  ],
  'TikTok/Reels': [
    "3 free AI websites that feel completely illegal to know about in 2026",
    "Stop wasting 4 hours on video editing — steal this 30-second workflow",
    "The subtle psychological sign someone is manipulating you without you knowing",
    "The 1-minute habit that destroyed my anxiety and brain fog forever"
  ],
  'Instagram': [
    "5 lessons I wish I knew before turning 25 about money and freedom",
    "Behind the scenes of how our design studio crafted this viral brand identity",
    "Why aesthetic minimalism is the ultimate superpower for modern creators",
    "The exact framework we used to gain 100k engaged followers in 90 days"
  ],
  'Advertisement': [
    "Smart ergonomic chair that eliminates lower back pain in 14 days or 100% money back",
    "All-in-one AI audio workstation that turns raw voice recordings into studio masters",
    "Organic hydration electrolyte drink made with zero artificial sugars or dyes",
    "Next-generation noise-canceling headphones engineered specifically for deep focus work"
  ],
  'Story': [
    "A lonely lighthouse keeper receives a mysterious radio transmission from 50 years in the future",
    "An ambitious young chef uncovers an antique cookbook with recipes that alter human memories",
    "Two astronauts on Mars find a mysterious glowing botanical garden beneath the red dust",
    "A retired detective takes on one final cold case that strikes uncomfortably close to home"
  ]
};

const CONTENT_TYPES: Array<{
  id: ScriptContentType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}> = [
  { id: 'YouTube', label: 'YouTube', icon: Tv, description: 'Long-form / deep video with chapters & retention hooks' },
  { id: 'TikTok/Reels', label: 'TikTok / Reels', icon: Flame, description: 'Fast vertical video, 3-second hook & seamless loop' },
  { id: 'Instagram', label: 'Instagram', icon: Share2, description: 'Aesthetic carousel / reel narrative with saveable value' },
  { id: 'Advertisement', label: 'Advertisement', icon: Megaphone, description: 'Direct-response commercial with problem & urgency offer' },
  { id: 'Story', label: 'Story', icon: BookOpen, description: 'Cinematic narrative arc, character tension & plot twist' }
];

const TONES: Array<{
  id: ScriptTone;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  description: string;
}> = [
  { id: 'Professional', label: 'Professional', icon: Briefcase, accent: 'from-blue-500 to-indigo-500', description: 'Crisp, articulate, authoritative & credible' },
  { id: 'Funny', label: 'Funny', icon: Smile, accent: 'from-amber-400 to-orange-500', description: 'Humorous, witty, relatable comedic timing' },
  { id: 'Emotional', label: 'Emotional', icon: Heart, accent: 'from-rose-500 to-pink-500', description: 'Heartfelt, poignant, vulnerable & inspiring' },
  { id: 'Cinematic', label: 'Cinematic', icon: Film, accent: 'from-violet-500 to-purple-500', description: 'Atmospheric, dramatic, sensory & movie-grade' }
];

const LANGUAGES = [
  { code: 'English', label: 'English (US / UK / Global)' },
  { code: 'Spanish', label: 'Spanish (Español)' },
  { code: 'French', label: 'French (Français)' },
  { code: 'German', label: 'German (Deutsch)' },
  { code: 'Hindi', label: 'Hindi (हिन्दी)' },
  { code: 'Portuguese', label: 'Portuguese (Português)' },
  { code: 'Japanese', label: 'Japanese (日本語)' },
  { code: 'Arabic', label: 'Arabic (العربية)' },
  { code: 'Italian', label: 'Italian (Italiano)' },
  { code: 'Dutch', label: 'Dutch (Nederlands)' },
  { code: 'Korean', label: 'Korean (한국어)' },
  { code: 'Urdu', label: 'Urdu (اردو)' },
  { code: 'Russian', label: 'Russian (Русский)' },
  { code: 'Chinese', label: 'Chinese (Mandarin / 中文)' }
];

export const ScriptStudio: React.FC<ScriptStudioProps> = ({
  onCopy,
  onSave,
  initialPrompt = ''
}) => {
  const [topic, setTopic] = useState(initialPrompt);
  const [contentType, setContentType] = useState<ScriptContentType>('YouTube');
  const [tone, setTone] = useState<ScriptTone>('Cinematic');
  const [language, setLanguage] = useState('English');
  const [targetDuration, setTargetDuration] = useState('Default for format');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'teleprompter'>('timeline');

  // Copy states
  const [copiedFull, setCopiedFull] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedHook, setCopiedHook] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setCopiedFull(false);
    setCopiedCaption(false);
    setCopiedHook(false);
    setSaved(false);

    try {
      const res = await fetch(getApiUrl('/api/generate-script'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          contentType,
          tone,
          language,
          targetDuration: targetDuration === 'Default for format' ? undefined : targetDuration,
        }),
      });

      if (!res.ok) throw new Error('Script generation failed');
      const data: ScriptResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Resilient fallback script
      setResult({
        title: `${topic} - Master ${tone} Script`,
        contentType,
        tone,
        language,
        targetDuration: contentType === 'YouTube' ? '3-5 minutes' : '45-60 seconds',
        estimatedWordCount: 130,
        logline: `A high-retention exploration of ${topic} crafted with a ${tone.toLowerCase()} narrative voice for ${contentType}.`,
        hooks: [
          {
            type: "Primary Hook",
            spoken: `If you want to truly understand ${topic}, you need to look at what 99% of people are completely ignoring.`,
            visual: "Camera glides forward with slow cinematic push-in. High-contrast key lighting.",
            textOverlay: `THE TRUTH ABOUT ${topic.toUpperCase().slice(0, 24)}`
          },
          {
            type: "Alternative Contrarian Hook",
            spoken: `Everything you've been told about ${topic} was missing one single game-changing element.`,
            visual: "Fast smash-cut to striking visual demonstration with dynamic sound riser.",
            textOverlay: `STOP DOING THIS ⚠️`
          }
        ],
        scriptBeats: [
          {
            timestamp: "0:00 - 0:10",
            phase: "Scene 1: The Inciting Hook",
            visual: "Direct gaze toward camera with cinematic shallow depth of field. Subtle atmospheric dust haze.",
            voiceover: `Most people approaching ${topic} start from the wrong premise entirely.`
          },
          {
            timestamp: "0:10 - 0:30",
            phase: "Scene 2: The Core Revelation",
            visual: "Fast B-roll demonstration with kinetic on-screen typography tracking key metrics.",
            voiceover: `When you break the process down into its core components, the solution becomes glaringly obvious. Notice what happens right here.`
          },
          {
            timestamp: "0:30 - 0:45",
            phase: "Scene 3: The Climax & Breakthrough",
            visual: "High-energy sequence showing the before and after contrast in full fidelity.",
            voiceover: `This single adjustment eliminates hours of frustration and produces instant clarity.`
          },
          {
            timestamp: "0:45 - 0:55",
            phase: "Scene 4: Call to Action & Conclusion",
            visual: "Direct camera address, warm natural lighting, subtle graphic watermark on screen.",
            voiceover: `Save this script right now so you don't lose it, and drop your biggest question in the comments below!`
          }
        ],
        fullScript: `[TITLE: ${topic.toUpperCase()}]\n[FORMAT: ${contentType} | TONE: ${tone} | LANGUAGE: ${language}]\n\n[SCENE 1: OPENING HOOK]\nVISUAL: Camera glides forward with slow cinematic push-in.\nVOICEOVER: If you want to truly understand ${topic}, you need to look at what 99% of people are completely ignoring.\n\n[SCENE 2: THE REVELATION]\nVISUAL: Fast B-roll sequence with kinetic typography.\nVOICEOVER: Most people start from the wrong premise entirely. When you break the process down into its core components, the solution becomes obvious.\n\n[SCENE 3: THE BREAKTHROUGH]\nVISUAL: High-energy demonstration showing before and after.\nVOICEOVER: This single adjustment eliminates hours of frustration and produces instant clarity.\n\n[SCENE 4: CALL TO ACTION]\nVISUAL: Direct camera address, warm natural lighting.\nVOICEOVER: Save this script right now so you don't lose it, and drop your biggest question in the comments below!`,
        callToAction: "Save this script and let me know your thoughts in the comments below!",
        caption: `Everything you need to know about ${topic}. 💡\n\nSave this for later reference and drop a comment below with your thoughts! 👇`,
        hashtags: ["#scriptwriting", "#filmmaking", "#contentcreator", "#videoproduction", "#storytelling"],
        productionNotes: [
          `Audio: Atmospheric music building in intensity to match the ${tone.toLowerCase()} cadence`,
          "Pacing: Maintain deliberate pauses before pivotal revelations",
          "Optics: 35mm f/1.4 lens for cinematic background bokeh"
        ]
      });
    } finally {
      setIsLoading(false);
      admobService.onGenerationCompleted();
    }
  };

  const handleRandomTopic = () => {
    const list = STARTER_TOPICS[contentType] || STARTER_TOPICS['YouTube'];
    const random = list[Math.floor(Math.random() * list.length)];
    setTopic(random);
  };

  const handleReset = () => {
    setTopic('');
    setResult(null);
    setCopiedFull(false);
    setCopiedCaption(false);
    setCopiedHook(false);
    setSaved(false);
    onCopy('', 'Script Studio reset successfully');
  };

  const copyFullScript = () => {
    if (!result) return;
    const textToCopy = result.fullScript || `TITLE: ${result.title}
CONTENT TYPE: ${result.contentType || contentType}
TONE: ${result.tone || tone}
LANGUAGE: ${result.language || language}
DURATION: ${result.targetDuration}

--- LOGLINE ---
${result.logline || ''}

--- HOOKS ---
${result.hooks.map((h, i) => `Hook ${i + 1} (${h.type}):\nSPOKEN: "${h.spoken}"\nVISUAL: ${h.visual}\nTEXT ON SCREEN: ${h.textOverlay}`).join('\n\n')}

--- SCENE TIMELINE ---
${result.scriptBeats.map((b) => `[${b.timestamp}] ${b.phase}\nVisual: ${b.visual}\nVoiceover: ${b.voiceover}`).join('\n\n')}

--- CALL TO ACTION ---
${result.callToAction}

--- CAPTION ---
${result.caption}

--- HASHTAGS ---
${result.hashtags.join(' ')}`;

    onCopy(textToCopy, 'Complete Production Script');
    setCopiedFull(true);
    setTimeout(() => setCopiedFull(false), 2000);
  };

  const copyCaption = () => {
    if (!result) return;
    const text = `${result.caption}\n\n${result.hashtags.join(' ')}`;
    onCopy(text, 'Social Media Caption');
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const copyPrimaryHook = () => {
    if (!result || !result.hooks.length) return;
    const hook = result.hooks[0];
    const text = `SPOKEN: "${hook.spoken}"\nVISUAL: ${hook.visual}\nTEXT OVERLAY: ${hook.textOverlay}`;
    onCopy(text, 'Opening Hook');
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  const handleSaveToLibrary = () => {
    if (!result) return;
    onSave({
      type: 'script',
      title: (result.title || topic).slice(0, 45),
      content: result.fullScript || result.scriptBeats.map(b => `${b.phase}: ${b.voiceover}`).join('\n'),
      tags: [contentType, tone, language],
      metadata: {
        contentType,
        tone,
        language,
        duration: result.targetDuration,
        callToAction: result.callToAction
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Studio Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-3">
          <Clapperboard className="w-3.5 h-3.5" />
          <span>Universal Script Studio</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Script Studio
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl">
          Craft complete, high-retention scripts for YouTube, TikTok/Reels, Instagram, Advertisements, and Stories. Tailor the language, narrative voice, and cinematic pacing in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Script Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f172a]/90 border border-rose-500/20 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/40 backdrop-blur-xl">
            <form onSubmit={handleGenerate} className="space-y-5">
              {/* 1. Topic or Idea Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Clapperboard className="w-3.5 h-3.5 text-rose-400" />
                    1. Topic or Story Concept
                  </label>
                  <div className="flex items-center gap-2">
                    {topic && (
                      <button
                        type="button"
                        onClick={() => setTopic('')}
                        className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        Clear text
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleRandomTopic}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                    >
                      <Shuffle className="w-3 h-3" />
                      Inspire Me
                    </button>
                  </div>
                </div>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={`e.g. ${STARTER_TOPICS[contentType]?.[0] || 'Enter your script idea...'}`}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0f17] border border-white/10 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-slate-100 placeholder-slate-500 text-sm leading-relaxed resize-none transition-all outline-none"
                  required
                />
              </div>

              {/* Quick Starter Chips */}
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-2">
                  Suggested Ideas for {contentType}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(STARTER_TOPICS[contentType] || []).slice(0, 2).map((starter, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(starter)}
                      className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-950/40 border border-white/5 hover:border-rose-500/30 text-slate-300 hover:text-white transition-all truncate max-w-full"
                    >
                      {starter.slice(0, 36)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Content Type Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2.5">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  2. Content Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CONTENT_TYPES.map((type) => {
                    const Icon = type.icon;
                    const isSelected = contentType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setContentType(type.id)}
                        className={`flex flex-col items-start p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-rose-500/20 border-rose-500 text-white shadow-md shadow-rose-950/40'
                            : 'bg-[#0b0f17] border-white/10 text-slate-300 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-rose-400' : 'text-slate-400'}`} />
                          <span className="text-xs font-semibold">{type.label}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 line-clamp-1 leading-tight">
                          {type.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Tone Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  3. Tone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {TONES.map((t) => {
                    const Icon = t.icon;
                    const isSelected = tone === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTone(t.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left ${
                          isSelected
                            ? 'bg-gradient-to-r from-rose-950/40 to-pink-950/40 border-rose-500 text-white'
                            : 'bg-[#0b0f17] border-white/10 text-slate-300 hover:border-white/20'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-rose-500/30 text-rose-300' : 'bg-white/5 text-slate-400'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{t.label}</div>
                          <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{t.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Language Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2">
                  <Globe className="w-3.5 h-3.5 text-indigo-400" />
                  4. Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-rose-500 outline-none transition-all cursor-pointer"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-[#0f172a]">
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons: Generate & Reset */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !topic.trim()}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-950/60 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Writing Complete Script...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-rose-200" />
                      <span>Generate Complete Script</span>
                    </>
                  )}
                </button>

                {(topic || result) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
                    title="Clear input and reset generated script"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400" />
                    <span>Reset</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Output Area (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Script Master Card */}
              <div className="bg-[#0f172a]/95 border border-rose-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-rose-950/20 backdrop-blur-xl relative">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {result.contentType || contentType}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-white/10 text-slate-300">
                        {result.tone || tone}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-white/5 text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-indigo-400" />
                        {result.language || language}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        ⏱ {result.targetDuration}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {result.title}
                    </h2>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
                      title="Clear and start new script"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Clear</span>
                    </button>

                    <button
                      onClick={handleSaveToLibrary}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
                      title="Save script to local library"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-rose-400" />
                      <span>{saved ? 'Saved!' : 'Save'}</span>
                    </button>

                    <button
                      onClick={copyFullScript}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copiedFull
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950'
                      }`}
                    >
                      {copiedFull ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Script!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* View Mode Toggle (Timeline vs Teleprompter/Reader) */}
                <div className="flex items-center justify-between gap-2 mb-4 bg-[#0b0f17] p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                      viewMode === 'timeline'
                        ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Scene Breakdown Timeline</span>
                  </button>
                  <button
                    onClick={() => setViewMode('teleprompter')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                      viewMode === 'teleprompter'
                        ? 'bg-rose-500/20 text-rose-200 border border-rose-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <AlignLeft className="w-3.5 h-3.5" />
                    <span>Teleprompter / Reading Script</span>
                  </button>
                </div>

                {/* Logline / Premise */}
                {result.logline && (
                  <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                        Logline / Core Premise
                      </span>
                      <p className="text-xs text-slate-300 italic leading-relaxed">
                        "{result.logline}"
                      </p>
                    </div>
                  </div>
                )}

                {/* VIEW MODE 1: Scene Timeline */}
                {viewMode === 'timeline' ? (
                  <div className="space-y-4">
                    {/* Opening Hooks Section */}
                    {result.hooks && result.hooks.length > 0 && (
                      <div className="p-4 rounded-xl bg-[#0b0f17] border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-rose-400" />
                            Opening Hook Options
                          </span>
                          <button
                            onClick={copyPrimaryHook}
                            className="text-[11px] text-slate-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
                          >
                            {copiedHook ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copy Hook</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-2.5">
                          {result.hooks.map((hook, i) => (
                            <div key={i} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-semibold text-rose-400">{hook.type || `Hook ${i + 1}`}</span>
                                {hook.textOverlay && (
                                  <span className="font-mono text-[10px] bg-rose-500/10 text-rose-300 px-1.5 py-0.5 rounded">
                                    Overlay: {hook.textOverlay}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-medium text-white leading-relaxed">
                                🗣️ "{hook.spoken}"
                              </p>
                              <p className="text-[11px] text-slate-400 leading-normal">
                                🎥 <span className="text-slate-300">Visual:</span> {hook.visual}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Script Beats / Scenes */}
                    <div className="space-y-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
                        Scene Timeline & Dialogue
                      </span>
                      {result.scriptBeats.map((beat, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-[#0b0f17]/90 border border-white/10 space-y-2 hover:border-rose-500/20 transition-all"
                        >
                          <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                            <span className="font-bold text-slate-200 flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold flex items-center justify-center">
                                {idx + 1}
                              </span>
                              {beat.phase}
                            </span>
                            <span className="font-mono text-[11px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                              {beat.timestamp}
                            </span>
                          </div>

                          <div className="space-y-1.5 pt-1 text-xs">
                            <div className="text-slate-400 leading-relaxed">
                              <span className="font-semibold text-cyan-400 uppercase text-[10px] tracking-wide mr-1.5">
                                Visual / Action:
                              </span>
                              {beat.visual}
                            </div>
                            <div className="text-slate-100 font-medium leading-relaxed bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                              <span className="font-semibold text-rose-400 uppercase text-[10px] tracking-wide mr-1.5">
                                Voiceover / Dialogue:
                              </span>
                              "{beat.voiceover}"
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action */}
                    {result.callToAction && (
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/20 to-amber-950/20 border border-rose-500/20">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 block mb-1">
                          Call To Action (Outro)
                        </span>
                        <p className="text-xs font-semibold text-white">
                          "{result.callToAction}"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  /* VIEW MODE 2: Teleprompter / Full Text */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                      <span>Teleprompter Ready • Formatted for recording or reading</span>
                      <button
                        onClick={copyFullScript}
                        className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy All</span>
                      </button>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl bg-[#0b0f17] border border-white/10 font-sans text-sm leading-relaxed text-slate-200 max-h-[480px] overflow-y-auto whitespace-pre-wrap select-all">
                      {result.fullScript || result.scriptBeats.map(b => `[${b.phase.toUpperCase()}]\nVISUAL: ${b.visual}\nVOICEOVER: ${b.voiceover}`).join('\n\n')}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Cards: Production Notes + Social Caption */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Production & Director Notes */}
                {result.productionNotes && result.productionNotes.length > 0 && (
                  <div className="p-4 rounded-xl bg-[#0f172a]/80 border border-white/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                      <Music className="w-3.5 h-3.5" />
                      <span>Production & Audio Notes</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {result.productionNotes.map((note, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Caption & Hashtags */}
                <div className="p-4 rounded-xl bg-[#0f172a]/80 border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-cyan-400" />
                      Ready-to-Post Caption
                    </span>
                    <button
                      onClick={copyCaption}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      {copiedCaption ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copy Caption</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed bg-[#0b0f17] p-2.5 rounded-lg border border-white/5 max-h-28 overflow-y-auto">
                    {result.caption}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {result.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-[11px] text-cyan-300 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State / How it works */
            <div className="h-full flex flex-col justify-center items-center p-8 sm:p-12 text-center rounded-2xl bg-[#0f172a]/40 border border-dashed border-white/10 min-h-[460px]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-pink-500/20 to-amber-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-xl">
                <Clapperboard className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Your Complete Production Script Will Appear Here
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
                Enter your topic, choose your content format (YouTube, TikTok/Reels, Instagram, Advertisement, or Story), language, and tone. Click generate to write a full video script with scene directions, visual cues, and dialogue.
              </p>

              {/* Supported Platforms Pill Row */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {CONTENT_TYPES.map((ct) => (
                  <span
                    key={ct.id}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-slate-300 text-xs font-medium"
                  >
                    {ct.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
