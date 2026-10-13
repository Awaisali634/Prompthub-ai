import React, { useState } from 'react';
import { 
  Video as VideoIcon, 
  Sparkles, 
  Copy, 
  Check, 
  Bookmark, 
  Film, 
  Camera, 
  Move, 
  Sun, 
  Compass, 
  Ban, 
  Sliders, 
  Volume2, 
  Shuffle,
  Info,
  RotateCcw,
  Trash2
} from 'lucide-react';
import { VideoPromptResult, SavedPromptItem } from '../types';
import { getApiUrl } from '../config/api';
import { admobService } from '../services/admobService';

interface VideoPromptToolProps {
  onCopy: (text: string, label: string) => void;
  onSave: (item: Omit<SavedPromptItem, 'id' | 'createdAt'>) => void;
  initialPrompt?: string;
}

const VIDEO_STARTER_PRESETS = [
  "Continuous FPV drone dive down emerald volcanic cliffs into crashing turquoise ocean waves",
  "Cyberpunk motorcycle speeding across a suspension bridge at night with neon taillight streaks",
  "High-speed tracking shot of a matte-black hypercar carving through desert salt flats",
  "Cinematic slow-motion dolly-in on a high-fashion model wearing reflective metallic silver",
  "Astronaut walking through an orbital zero-gravity botanical garden surrounded by earth backdrop"
];

const ENGINES = [
  "Runway Gen-3 Alpha",
  "OpenAI Sora",
  "Luma Dream Machine",
  "Kling AI",
  "Pika Labs 2.0"
];

const SHOT_TYPES = [
  "Cinematic Dolly-In Tracking Shot",
  "High-Speed Continuous FPV Drone Dive",
  "Low-Angle Hero Tracking Walk",
  "360-Degree Orbital Arc Shot",
  "Slow Rack Focus (Foreground to Subject)",
  "Aerial Birds-Eye Establishing View"
];

const MOTION_SPEEDS = [
  "Fluid Smooth Cinematic Motion (24fps)",
  "Ultra Slow-Motion 120fps Drama",
  "Dynamic High-Speed Action Glide",
  "Steadicam Eye-Level Stride",
  "Gentle Ambient Breathing Movement"
];

const LIGHTING_OPTIONS = [
  "Golden Hour Warm Rim Lighting",
  "Deep Cyberpunk Neon Cyan & Amber Reflections",
  "Soft Diffused Overcast Morning Mist",
  "Dramatic High-Contrast Chiaroscuro",
  "Anamorphic Lens Flares with Wet Highlights"
];

const ATMOSPHERES = [
  "Rain-soaked asphalt with shimmering reflections",
  "Atmospheric cinematic haze with floating embers",
  "Sun-dappled coastal morning sea mist",
  "Pristine hyper-clean futuristic architectural interior",
  "Dense mountain pine fog with volumetric light shafts"
];

export const VideoPromptTool: React.FC<VideoPromptToolProps> = ({
  onCopy,
  onSave,
  initialPrompt = ""
}) => {
  const [idea, setIdea] = useState(initialPrompt);
  const [engine, setEngine] = useState(ENGINES[0]);
  const [shotType, setShotType] = useState(SHOT_TYPES[0]);
  const [motionSpeed, setMotionSpeed] = useState(MOTION_SPEEDS[0]);
  const [lighting, setLighting] = useState(LIGHTING_OPTIONS[0]);
  const [atmosphere, setAtmosphere] = useState(ATMOSPHERES[0]);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VideoPromptResult | null>(null);
  const [copiedMaster, setCopiedMaster] = useState(false);
  const [copiedNeg, setCopiedNeg] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!idea.trim()) return;

    setIsLoading(true);
    setCopiedMaster(false);
    setCopiedNeg(false);
    setSaved(false);

    try {
      const res = await fetch(getApiUrl('/api/generate-video-prompt'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea,
          targetEngine: engine,
          shotType,
          motionSpeed,
          lighting,
          atmosphere,
        }),
      });

      if (!res.ok) throw new Error('Video prompt generation failed');
      const data: VideoPromptResult = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setResult({
        masterPrompt: `Cinematic ${shotType.toLowerCase()} of ${idea}. ${motionSpeed}. ${lighting}, illuminating ${atmosphere}. Camera glides forward with pristine gimbal stabilization and optical parallax depth. Photorealistic 4k video, realistic physical momentum, natural motion blur, shot on Arri Alexa 35.`,
        cameraMovement: `${shotType}. Continuous forward tracking at eye level with zero stutter or abrupt focal shifts.`,
        subjectMovement: `Natural fluid human kinetics, organic weight distribution, authentic fabric movement without morphing limbs.`,
        lighting: `${lighting}, warm rim lighting emphasizing edge geometry, soft shadow fill.`,
        environment: `${atmosphere}, deep visual layering with natural horizon falloff and volumetric particles.`,
        negativeInstructions: `morphing limbs, face warping, sudden camera cuts, jittery stutter, glitching frames, rubbery physics, text overlay, lowres artifacting.`,
        engineSettings: {
          engine: engine,
          motionScore: "Motion Score: 4/10 (prevents warping)",
          recommendedFps: "24fps cinematic film cadence",
          promptFormatTip: `Keep camera movement instructions at the beginning of the prompt for ${engine}.`
        },
        directorNotes: `Pair with subtle low-frequency atmospheric wind and soft organic footsteps for maximum immersion.`
      });
    } finally {
      setIsLoading(false);
      admobService.onGenerationCompleted();
    }
  };

  const handleRandomIdea = () => {
    const random = VIDEO_STARTER_PRESETS[Math.floor(Math.random() * VIDEO_STARTER_PRESETS.length)];
    setIdea(random);
  };

  const handleReset = () => {
    setIdea('');
    setResult(null);
    setCopiedMaster(false);
    setCopiedNeg(false);
    setSaved(false);
    onCopy('', 'Video Studio reset');
  };

  const copyPrompt = (text: string, type: 'master' | 'neg') => {
    if (type === 'master') {
      setCopiedMaster(true);
      setTimeout(() => setCopiedMaster(false), 2000);
      onCopy(text, 'Master Video Prompt');
    } else {
      setCopiedNeg(true);
      setTimeout(() => setCopiedNeg(false), 2000);
      onCopy(text, 'Negative Instructions');
    }
  };

  const handleSave = () => {
    if (!result) return;
    onSave({
      type: 'video',
      title: idea.slice(0, 45) + (idea.length > 45 ? '...' : ''),
      content: result.masterPrompt,
      tags: [engine, shotType.split(' ')[0], '4K Video'],
      metadata: {
        cameraMovement: result.cameraMovement,
        negativeInstructions: result.negativeInstructions,
        engine,
      }
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Tool Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 mb-3">
          <Film className="w-3.5 h-3.5" />
          <span>Cinematic Video Director</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Video Prompt Generator
        </h1>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Direct professional cinematic video prompts for Sora, Runway Gen-3, and Luma with precise camera trajectories, subject physics, and anti-warp negative commands.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0f172a]/80 border border-cyan-500/20 rounded-2xl p-5 sm:p-6 shadow-xl shadow-black/30 backdrop-blur-md">
            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Concept Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <VideoIcon className="w-3.5 h-3.5 text-cyan-400" />
                    Video Scene Concept
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
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <Shuffle className="w-3 h-3" />
                      Random Scene
                    </button>
                  </div>
                </div>
                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="e.g. FPV drone dive down mist-covered Nordic fjords into crystal waters..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[#0b0f17] border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 placeholder-slate-500 text-sm leading-relaxed resize-none transition-all outline-none"
                  required
                />
              </div>

              {/* Presets */}
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-2">
                  Quick Scene Starters:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {VIDEO_STARTER_PRESETS.slice(0, 3).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setIdea(preset)}
                      className="text-[11px] text-left px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-950/40 border border-white/5 hover:border-cyan-500/30 text-slate-300 hover:text-white transition-all truncate max-w-full"
                    >
                      {preset.slice(0, 30)}...
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Video Model */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  Target Video Model
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ENGINES.slice(0, 4).map((eng) => (
                    <button
                      key={eng}
                      type="button"
                      onClick={() => setEngine(eng)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all ${
                        engine === eng
                          ? 'bg-cyan-600/20 border-cyan-500 text-white shadow-sm shadow-cyan-950'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
                      }`}
                    >
                      {eng}
                    </button>
                  ))}
                </div>
              </div>

              {/* Camera Movement / Shot Type */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Camera className="w-3.5 h-3.5 text-cyan-400" />
                  Camera Trajectory
                </label>
                <select
                  value={shotType}
                  onChange={(e) => setShotType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-cyan-500 outline-none transition-all cursor-pointer"
                >
                  {SHOT_TYPES.map((st) => (
                    <option key={st} value={st} className="bg-[#0f172a]">
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Motion Pace */}
              <div>
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                  <Move className="w-3.5 h-3.5 text-cyan-400" />
                  Motion Cadence & Physics
                </label>
                <select
                  value={motionSpeed}
                  onChange={(e) => setMotionSpeed(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-cyan-500 outline-none transition-all cursor-pointer"
                >
                  {MOTION_SPEEDS.map((sp) => (
                    <option key={sp} value={sp} className="bg-[#0f172a]">
                      {sp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Lighting & Environment Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    Lighting
                  </label>
                  <select
                    value={lighting}
                    onChange={(e) => setLighting(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-cyan-500 outline-none truncate"
                  >
                    {LIGHTING_OPTIONS.map((lo) => (
                      <option key={lo} value={lo} className="bg-[#0f172a]">
                        {lo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    Atmosphere
                  </label>
                  <select
                    value={atmosphere}
                    onChange={(e) => setAtmosphere(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-cyan-500 outline-none truncate"
                  >
                    {ATMOSPHERES.map((at) => (
                      <option key={at} value={at} className="bg-[#0f172a]">
                        {at}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons: Generate & Reset */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="submit"
                  disabled={isLoading || !idea.trim()}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-950/60 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Choreographing Scene Physics...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-cyan-200" />
                      <span>Generate Video Prompt</span>
                    </>
                  )}
                </button>

                {(idea || result) && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
                    title="Clear input and reset generated video prompt"
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
              {/* Master Video Prompt Card */}
              <div className="bg-[#0f172a]/90 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl relative">
                <div className="flex flex-wrap items-center justify-between mb-3 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Master Video Prompt
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {engine}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
                      title="Clear and start new video prompt"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>Clear</span>
                    </button>

                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 hover:text-white transition-all"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{saved ? 'Saved!' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() => copyPrompt(result.masterPrompt, 'master')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        copiedMaster
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-950'
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
                          <span>Copy Video Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#0b0f17] border border-white/5 text-slate-200 text-sm leading-relaxed font-mono select-all break-words mb-4">
                  {result.masterPrompt}
                </div>

                {/* Engine Settings Badge */}
                {result.engineSettings && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-white/5 text-slate-300">
                    <div>
                      <span className="text-slate-400">Settings: </span>
                      <span className="text-cyan-300">{result.engineSettings.motionScore}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Cadence: </span>
                      <span className="text-cyan-300">{result.engineSettings.recommendedFps}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Granular Breakdown: Camera, Subject, Lighting, Environment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Camera Movement */}
                <div className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    Camera Movement
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-[#0b0f17] p-3 rounded-xl border border-white/5">
                    {result.cameraMovement}
                  </p>
                </div>

                {/* Subject Movement */}
                <div className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                    <Move className="w-4 h-4 text-cyan-400" />
                    Subject Movement
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-[#0b0f17] p-3 rounded-xl border border-white/5">
                    {result.subjectMovement}
                  </p>
                </div>

                {/* Lighting */}
                <div className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                    <Sun className="w-4 h-4 text-amber-400" />
                    Lighting & Shadows
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-[#0b0f17] p-3 rounded-xl border border-white/5">
                    {result.lighting}
                  </p>
                </div>

                {/* Environment */}
                <div className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    Environment & Atmosphere
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono bg-[#0b0f17] p-3 rounded-xl border border-white/5">
                    {result.environment}
                  </p>
                </div>
              </div>

              {/* Negative Instructions (Crucial for Video AI) */}
              <div className="bg-[#0f172a]/70 border border-rose-500/20 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                    <Ban className="w-4 h-4 text-rose-400" />
                    Negative Instructions (Anti-Morphing & Anti-Glitch)
                  </span>
                  <button
                    onClick={() => copyPrompt(result.negativeInstructions, 'neg')}
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {copiedNeg ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedNeg ? 'Copied' : 'Copy Negatives'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-[#0b0f17] p-3 rounded-xl border border-white/5 select-all leading-relaxed">
                  {result.negativeInstructions}
                </p>
              </div>

              {/* Director Notes */}
              {result.directorNotes && (
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-3 text-xs text-slate-300">
                  <Volume2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cyan-200 block mb-0.5">Director Sound & Pacing Note</span>
                    <p className="text-slate-400 leading-relaxed">{result.directorNotes}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="h-full min-h-[380px] bg-[#0f172a]/40 border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cinematic Video Blueprint</h3>
              <p className="text-sm text-slate-400 max-w-sm mb-6">
                Describe a video scene to generate precise camera directions, subject physics, and negative prompts that eliminate face morphing and jitter.
              </p>
              <div className="grid grid-cols-2 gap-2 text-left max-w-sm w-full text-xs text-slate-400">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-200 font-medium block">🎬 Camera Axes</span>
                  <span>Dolly, orbital, FPV & tracking paths</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-200 font-medium block">🚫 Anti-Morphing</span>
                  <span>Negative prompts tuned for Sora & Runway</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
