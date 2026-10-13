import React, { useState } from 'react';
import { 
  Clapperboard, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Flame, 
  Clock, 
  MessageSquare, 
  Hash, 
  Share2, 
  Music, 
  Eye, 
  CheckCircle2, 
  Shuffle, 
  Lightbulb,
  Video,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { ScriptResult, SavedPromptItem } from '../types';

interface ScriptGeneratorToolProps {
  onCopy: (text: string, label: string) => void;
  onSave: (item: Omit<SavedPromptItem, 'id' | 'createdAt'>) => void;
  initialPrompt?: string;
}

const VIRAL_SCRIPT_TOPICS = [
  "3 free AI websites that feel completely illegal to know about",
  "Why 99% of people fail to build an audience on social media",
  "The 10-minute morning routine that eliminated my brain fog forever",
  "How a 21-year-old built a $15k/month digital product business from home",
  "The single biggest gym workout mistake destroying your gains"
];

const PLATFORMS = [
  "TikTok & Instagram Reels",
  "YouTube Shorts",
  "Universal Short-Form Video"
];

const TONES = [
  "Energetic & Viral (Fast-paced)",
  "Storytelling & Relatable (Personal)",
  "Educational & High-Value (Authority)",
  "Contrarian & Shocking (Pattern-interrupt)",
  "Humorous & Sarcastic"
];

const DURATIONS = [
  "15-30 Seconds (Rapid-Fire Hook)",
  "30-45 Seconds (Sweet Spot Retention)",
  "45-60 Seconds (Full Story & Value)",
  "60-90 Seconds (Deep Dive)"
];

const NICHES = [
  "Tech, AI & Software",
  "Business, Finance & Entrepreneurship",
  "Productivity & Self-Improvement",
  "Fitness, Health & Nutrition",
  "Lifestyle, Travel & Fashion"
];

export const ScriptGeneratorTool: React.FC<ScriptGeneratorToolProps> = ({
  onCopy,
  onSave,
  initialPrompt = ""
}) => {
  const [topic, setTopic] = useState(initialPrompt);
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [niche, setNiche] = useState(NICHES[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setCopiedScript(false);
    setCopiedCaption(false);
    setSaved(false);

    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          platform,
          tone,
          targetDuration: duration,
          niche,
        }),
      });

      if (!res.ok) throw new Error('Script generation failed');
      const data: ScriptResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        title: `How to Master ${topic} (Viral Blueprint)`,
        targetDuration: duration,
        estimatedWordCount: 90,
        hooks: [
          {
            type: "Curiosity Gap (High Retention)",
            spoken: `Stop scrolling if you are still doing ${topic} the hard way.`,
            visual: "Fast camera punch-in while snapping fingers or holding up phone",
            textOverlay: "STOP DOING THIS ⚠️"
          },
          {
            type: "Contrarian / Shock Fact",
            spoken: `Almost 95% of people are completely wrong about ${topic}.`,
            visual: "Shaking head in disbelief, pointing down at screen with evidence",
            textOverlay: "YOU WERE LIED TO 🤯"
          },
          {
            type: "Direct Problem / Pain Point",
            spoken: `Here is the one secret shortcut for ${topic} nobody talks about.`,
            visual: "Leaning into the camera lens with intense eye contact",
            textOverlay: "STEAL THIS SHORTCUT 🤫"
          }
        ],
        scriptBeats: [
          {
            timestamp: "0:00 - 0:03",
            phase: "Hook",
            visual: "Fast camera push-in, intense eye contact",
            voiceover: `Stop scrolling if you are still struggling with ${topic}.`
          },
          {
            timestamp: "0:03 - 0:12",
            phase: "The Agitation",
            visual: "Cut to screen recording or relatable B-roll frustration",
            voiceover: `Most creators waste dozens of hours trying to figure this out, while the top 1% use one simple framework.`
          },
          {
            timestamp: "0:12 - 0:28",
            phase: "The Solution & Proof",
            visual: "Fast B-roll demonstration with kinetic typography on screen",
            voiceover: `Here is the exact 3-step breakdown: First, identify the constraint. Second, automate the workflow. Third, verify the output.`
          },
          {
            timestamp: "0:28 - 0:35",
            phase: "Call To Action & Loop",
            visual: "Direct gaze, gesture pointing to the save icon",
            voiceover: `Save this post so you have it ready when creating, and comment 'GUIDE' so I can send you the exact template.`
          }
        ],
        caption: `Most people are still sleeping on this... 🤯 Save this reel so you don't lose it!\n\nDrop a comment below with your biggest takeaway and I'll reply to everyone in the first hour. 👇`,
        hashtags: ["#contentcreator", "#viraltips", "#tiktokstrategy", "#reelsgrowth", "#creatoreconomy", "#aitools"],
        callToAction: "Save this video and comment 'TEMPLATE' below for the exact resource!",
        audioRecommendation: "Upbeat electronic synthwave or mysterious low-bass phonk at 125 BPM with voice ducking.",
        retentionHacks: [
          "Include a visual pattern interrupt every 3.5 seconds",
          "Place bold sticker text inside TikTok's safe margins",
          "Seamlessly loop the closing sentence back into the first word"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomTopic = () => {
    const random = VIRAL_SCRIPT_TOPICS[Math.floor(Math.random() * VIRAL_SCRIPT_TOPICS.length)];
    setTopic(random);
  };

  const handleReset = () => {
    setTopic('');
    setResult(null);
    setCopiedScript(false);
    setCopiedCaption(false);
    setSaved(false);
    onCopy('', 'Script Generator reset');
  };

  const copyFullScript = () => {
    if (!result) return;
    const fullText = `TITLE: ${result.title}
DURATION: ${result.targetDuration}

--- HOOKS ---
${result.hooks.map((h, i) => `Hook ${i + 1} (${h.type}):\nSPOKEN: "${h.spoken}"\nVISUAL: ${h.visual}\nTEXT OVERLAY: ${h.textOverlay}`).join('\n\n')}

--- SCRIPT TIMELINE ---
${result.scriptBeats.map((b) => `[${b.timestamp}] (${b.phase})\nVisual: ${b.visual}\nVoiceover: ${b.voiceover}`).join('\n\n')}

--- CALL TO ACTION ---
${result.callToAction}

--- CAPTION ---
${result.caption}

--- HASHTAGS ---
${result.hashtags.join(' ')}`;

    onCopy(fullText, 'Complete Viral Script');
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyCaptionOnly = () => {
    if (!result) return;
    const text = `${result.caption}\n\n${result.hashtags.join(' ')}`;
    onCopy(text, 'Social Media Caption');
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

  const handleSave = () => {
    if (!result) return;
    onSave({
      type: 'script',
      title: result.title || topic.slice(0, 45),
      content: result.scriptBeats.map(b => `[${b.timestamp}] ${b.voiceover}`).join('\n'),
      tags: [platform.split(' ')[0], niche.split(' ')[0], 'Viral Script'],
      metadata: {
        hooks: result.hooks,
        caption: result.caption,
        hashtags: result.hashtags,
        callToAction: result.callToAction,
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Tool Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-3">
          <Flame className="w-3.5 h-3.5" />
          <span>Viral Retention Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          TikTok & Reels Script Generator
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Generate scroll-stopping opening hooks, visual B-roll cues, line-by-line voiceover beats, engaging captions, and viral hashtags for short-form video.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f172a]/80 border border-rose-500/20 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/30 backdrop-blur-md">
            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Topic / Idea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Clapperboard className="w-3.5 h-3.5 text-rose-400" />
                    Video Topic or Hook Idea
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
                      Random Topic
                    </button>
                  </div>
                </div>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. 3 AI websites that feel illegal to know about..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0f17] border border-white/10 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-slate-100 placeholder-slate-500 text-sm leading-relaxed resize-none transition-all outline-none"
                  required
                />
              </div>

              {/* Quick Topic Chips */}
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-2">
                  Viral Concept Starters:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {VIRAL_SCRIPT_TOPICS.slice(0, 3).map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(item)}
                      className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-white/5 hover:bg-rose-950/40 border border-white/5 hover:border-rose-500/30 text-slate-300 hover:text-white transition-all truncate max-w-full"
                    >
                      {item.slice(0, 32)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Platform */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Video className="w-3.5 h-3.5 text-rose-400" />
                  Primary Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-rose-500 outline-none transition-all cursor-pointer"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p} className="bg-[#0f172a]">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone of Voice */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                  Tone & Energy
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-rose-500 outline-none transition-all cursor-pointer"
                >
                  {TONES.map((t) => (
                    <option key={t} value={t} className="bg-[#0f172a]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration & Niche */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    Target Length
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-rose-500 outline-none truncate"
                  >
                    {DURATIONS.map((d) => (
                      <option key={d} value={d} className="bg-[#0f172a]">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Hash className="w-3.5 h-3.5 text-rose-400" />
                    Content Niche
                  </label>
                  <select
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-rose-500 outline-none truncate"
                  >
                    {NICHES.map((n) => (
                      <option key={n} value={n} className="bg-[#0f172a]">
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons: Generate & Reset */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="submit"
                  disabled={isLoading || !topic.trim()}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-950/60 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Writing Viral Retention Script...</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4 text-rose-200" />
                      <span>Generate Viral Script</span>
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

        {/* Right Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {result ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Header Overview Card */}
              <div className="bg-[#0f172a]/90 border border-rose-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-rose-950/20 backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 mr-2">
                      Viral Script Plan
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {result.targetDuration}
                    </span>
                    <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                      {result.title}
                    </h2>
                  </div>

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
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-rose-400" />
                      <span>{saved ? 'Saved!' : 'Save'}</span>
                    </button>

                    <button
                      onClick={copyFullScript}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copiedScript
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950'
                      }`}
                    >
                      {copiedScript ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied Script!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Everything</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 3 Opening Hooks */}
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      3 High-Retention Opening Hook Options (First 3 Seconds)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {result.hooks.map((hook, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 hover:border-rose-500/30 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-rose-300">
                            Option {idx + 1}: {hook.type}
                          </span>
                          <button
                            onClick={() => {
                              onCopy(`SPOKEN: "${hook.spoken}"\nVISUAL: ${hook.visual}\nOVERLAY: ${hook.textOverlay}`, `Hook Option ${idx + 1}`);
                            }}
                            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copy Hook</span>
                          </button>
                        </div>

                        <div className="space-y-1.5 text-xs">
                          <p className="text-white font-medium">
                            <span className="text-slate-400 font-normal">🗣️ Spoken: </span>
                            "{hook.spoken}"
                          </p>
                          <p className="text-slate-300">
                            <span className="text-slate-400">🎬 Visual Action: </span>
                            {hook.visual}
                          </p>
                          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-[11px] font-semibold">
                            <span>📱 On Screen: </span>
                            <span>{hook.textOverlay}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Beat-by-Beat Timeline Script */}
              <div className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-rose-400" />
                    Beat-by-Beat Video Script
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {result.scriptBeats.length} Timeline Beats
                  </span>
                </div>

                <div className="space-y-3">
                  {result.scriptBeats.map((beat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white/10 text-cyan-300">
                            {beat.timestamp}
                          </span>
                          <span className="text-xs font-semibold text-slate-300">
                            {beat.phase}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="text-slate-400">
                          <span className="text-slate-400 font-semibold">Visual / B-Roll: </span>
                          <span className="text-slate-300 italic">{beat.visual}</span>
                        </div>
                        <div className="text-slate-200 bg-white/[0.02] p-2.5 rounded-lg border border-white/5 font-mono">
                          <span className="text-rose-400 font-semibold">Spoken: </span>
                          <span>"{beat.voiceover}"</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caption & Viral Hashtags */}
              <div className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                    Ready-To-Post Caption & Hashtags
                  </span>
                  <button
                    onClick={copyCaptionOnly}
                    className="text-xs text-slate-300 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {copiedCaption ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCaption ? 'Copied' : 'Copy Caption'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 text-xs text-slate-200 whitespace-pre-line font-mono select-all leading-relaxed">
                  {result.caption}
                </div>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.hashtags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call to Action & Audio Recommendation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#0f172a] border border-white/10 text-xs">
                  <span className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1">
                    <Share2 className="w-3.5 h-3.5" />
                    High-Converting CTA
                  </span>
                  <p className="text-slate-300 leading-relaxed font-mono">
                    "{result.callToAction}"
                  </p>
                </div>

                {result.audioRecommendation && (
                  <div className="p-4 rounded-xl bg-[#0f172a] border border-white/10 text-xs">
                    <span className="font-semibold text-cyan-300 flex items-center gap-1.5 mb-1">
                      <Music className="w-3.5 h-3.5" />
                      Audio & Sound Suggestion
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {result.audioRecommendation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="h-full min-h-[380px] bg-[#0f172a]/40 border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-600/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Viral Short-Form Blueprint</h3>
              <p className="text-sm text-slate-400 max-w-sm mb-6">
                Enter your topic to generate 3 psychological opening hooks, beat-by-beat B-roll directions, voiceovers, ready-to-post captions, and viral hashtags.
              </p>
              <div className="grid grid-cols-2 gap-2 text-left max-w-sm w-full text-xs text-slate-400">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-200 font-medium block">🎯 3-Second Hooks</span>
                  <span>Curiosity gaps & on-screen stickers</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-200 font-medium block">⏱️ Beat Timeline</span>
                  <span>Visual actions paired with spoken lines</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
