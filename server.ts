import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Enable CORS for all environments & iFrames
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to safely extract JSON from Gemini text response
function extractJSON<T>(text: string, fallback: T): T {
  try {
    // If enclosed in markdown code fences
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    const cleaned = jsonMatch ? jsonMatch[1].trim() : text.trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('Failed to parse Gemini JSON output, attempting relaxed parsing:', err);
    try {
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return JSON.parse(text.slice(firstBrace, lastBrace + 1));
      }
    } catch {
      // ignore
    }
    return fallback;
  }
}

async function callWithTimeout<T>(promise: Promise<T>, timeoutMs = 15000): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('AI generation timed out')), timeoutMs);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

// ----------------------------------------------------
// 1. AI Image Prompt Generator Endpoint
// ----------------------------------------------------
app.post('/api/generate-image-prompt', async (req, res) => {
  const { idea, style, aspectRatio, lighting, camera, engine } = req.body;

  if (!idea || typeof idea !== 'string') {
    return res.status(400).json({ error: 'Please provide an image idea or description.' });
  }

  const selectedEngine = engine || 'Midjourney v6 / Flux';
  const selectedStyle = style || 'Photorealistic Cinematic';
  const selectedAr = aspectRatio || '16:9';
  const selectedLighting = lighting || 'Dramatic Volumetric Chiaroscuro';
  const selectedCamera = camera || '35mm anamorphic lens, f/1.4';

  const systemInstruction = `You are a world-class AI art prompt engineer specializing in Midjourney v6, Flux.1, Stable Diffusion XL, and DALL-E 3.
Given an idea and optional aesthetic constraints, craft an extremely vivid, evocative, and photochemically precise prompt that yields ultra-high quality, award-winning visuals.
Always return strictly valid JSON matching this schema:
{
  "masterPrompt": "The primary detailed master prompt including subject nuances, textures, medium, framing, lighting, color palette, rendering engine tags",
  "shortPrompt": "A punchy, concise 1-2 sentence core prompt",
  "negativePrompt": "Comprehensive negative prompt string (e.g. deformed, bad anatomy, blur, extra limbs, low quality watermark, cartoonish skin texture)",
  "parameters": "Engine specific parameters like --ar 16:9 --style raw --v 6.1 --s 250",
  "variations": [
    {
      "title": "Variation Title (e.g. Dramatic Macro Close-up)",
      "prompt": "Full variation prompt"
    },
    {
      "title": "Variation Title (e.g. Wide Environmental Epic)",
      "prompt": "Full variation prompt"
    },
    {
      "title": "Variation Title (e.g. Stylized Surreal Neo-Noir)",
      "prompt": "Full variation prompt"
    }
  ],
  "styleBreakdown": [
    {"label": "Lighting", "value": "..."},
    {"label": "Composition", "value": "..."},
    {"label": "Color Grade", "value": "..."},
    {"label": "Texture & Details", "value": "..."}
  ],
  "proTip": "An insider tip for best results with this particular style and engine"
}`;

  const userPrompt = `Generate a master AI image prompt for:
- User Idea: "${idea}"
- Target Engine: ${selectedEngine}
- Artistic Style: ${selectedStyle}
- Aspect Ratio: ${selectedAr}
- Lighting: ${selectedLighting}
- Camera / Optics: ${selectedCamera}`;

  // Fallback data in case of missing key or API failure
  const fallbackData = {
    masterPrompt: `Award-winning master photography of ${idea}, rendered in immaculate ${selectedStyle}. Captured on ${selectedCamera}, featuring ${selectedLighting}. Inimitable depth of field, hyper-detailed skin pores and atmospheric micro-particles, dynamic color grading, cinematic composition, Octane 8K render clarity, masterwork. --ar ${selectedAr.replace(':', ':')} --v 6.1 --style raw`,
    shortPrompt: `Cinematic ${selectedStyle} portrait of ${idea}, illuminated by ${selectedLighting},shot on ${selectedCamera}, photorealistic 8k.`,
    negativePrompt: `blurry, deformed fingers, extra limbs, low resolution, jpeg artifacts, plastic skin, distorted proportions, overexposed, bad anatomy, watermark, signature`,
    parameters: `--ar ${selectedAr} --v 6.1 --style raw --q 2 --s 250`,
    variations: [
      {
        title: "Intimate Cinematic Close-Up",
        prompt: `Extreme close-up shot of ${idea}, raw film grain, ${selectedLighting}, shallow depth of field, emotional intensity, 8k resolution, Hasselblad H6D-100c.`
      },
      {
        title: "Epic Wide Environmental Composition",
        prompt: `Expansive establishing wide shot showing ${idea} embedded in a vast, atmospheric scenery, misty horizon, volumetric god rays, majestic scale, 35mm anamorphic.`
      },
      {
        title: "Moody Neo-Noir Color Palette",
        prompt: `Dark moody atmospheric depiction of ${idea}, heavy shadows, subtle rim highlights, damp reflective surfaces, cinematic color grade, Blade Runner aesthetic.`
      }
    ],
    styleBreakdown: [
      { label: "Lighting", value: selectedLighting },
      { label: "Optics", value: selectedCamera },
      { label: "Aspect Ratio", value: selectedAr },
      { label: "Engine Tuning", value: `${selectedEngine} with raw styling` }
    ],
    proTip: `For ${selectedEngine}, place the core subject in the first 8 words and use sensory adjectives rather than empty buzzwords like "hyper-detailed".`
  };

  if (!apiKey) {
    return res.json(fallbackData);
  }

  try {
    const response = await callWithTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      }),
      8000
    );

    const outputText = response.text || '';
    const parsed = extractJSON(outputText, fallbackData);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error generating image prompt with Gemini:', err?.message || err);
    // Return high quality fallback instead of failing
    return res.json(fallbackData);
  }
});

// ----------------------------------------------------
// 2. AI Video Prompt Generator Endpoint
// ----------------------------------------------------
app.post('/api/generate-video-prompt', async (req, res) => {
  const { idea, targetEngine, shotType, motionSpeed, lighting, atmosphere } = req.body;

  if (!idea || typeof idea !== 'string') {
    return res.status(400).json({ error: 'Please provide a video concept or idea.' });
  }

  const engine = targetEngine || 'Runway Gen-3 / Sora';
  const shot = shotType || 'Cinematic Dolly-In Tracking Shot';
  const speed = motionSpeed || 'Fluid Smooth Motion';
  const light = lighting || 'Golden hour warm rim lighting';
  const atmos = atmosphere || 'Epic cinematic haze with airborne particles';

  const systemInstruction = `You are an elite cinematic AI film director and video prompting expert for models like Sora, Runway Gen-3 Alpha, Luma Dream Machine, Kling AI, and Pika Labs.
Transform the user's idea into a bulletproof video generation prompt that avoids visual morphing, warping, and jittery camera movements.
Break down every physical axis of movement clearly.
Return strictly valid JSON matching this schema:
{
  "masterPrompt": "Complete continuous prompt formatted for the target engine, harmonizing subject action, camera movement, and lighting",
  "cameraMovement": "Specific camera instructions: e.g. Smooth 35mm steadicam pushing forward at eye level, gradual 15-degree tilt up, steady gimbal stabilization, slow rack focus",
  "subjectMovement": "Clear physical dynamics: e.g. Subject walks with measured strides from left to center, natural clothing flutter in the breeze, subtle head turn toward camera",
  "lighting": "Detailed lighting direction: e.g. Diffused amber sidelight, soft shadows, anamorphic lens flares, wet floor reflections",
  "environment": "Atmospheric elements: e.g. Rain-soaked asphalt reflecting neon glow, drifting mist, background traffic bokeh",
  "negativeInstructions": "Crucial negative constraints: e.g. no sudden morphing, no jerky speed shifts, no extra limbs, no frame tearing, no distorted faces, no abrupt camera cuts",
  "engineSettings": {
    "engine": "${engine}",
    "motionScore": "Recommended motion intensity (e.g. 4/10 or camera speed 2.5)",
    "recommendedFps": "24fps or 30fps",
    "promptFormatTip": "Specific tip for this video model"
  },
  "directorNotes": "Creative guidance on pacing, sound design pairing, or transition ideas"
}`;

  const userPrompt = `Create a cinematic video generation prompt for:
- Concept: "${idea}"
- Target AI Video Engine: ${engine}
- Shot Framing / Camera Type: ${shot}
- Motion Pace: ${speed}
- Lighting: ${light}
- Atmosphere: ${atmos}`;

  const fallbackData = {
    masterPrompt: `Cinematic ${shot.toLowerCase()} of ${idea}. ${speed}. ${light}, casting rich cinematic contrast across ${atmos}. Camera glides forward steadily with fluid gimbal stability, keeping the subject in sharp focus while background reveals subtle parallax depth. Photorealistic 4k resolution, natural physical weight, realistic motion blur, shot on Arri Alexa 35.`,
    cameraMovement: `${shot}. Smooth continuous motion gliding forward at eye level with zero jitter, slight gradual parallax tracking.`,
    subjectMovement: `Organic, lifelike motion with realistic momentum and gravity. Realistic breathing and clothing dynamics without glitching.`,
    lighting: `${light}, soft diffused rim lighting highlighting silhouette edges, gentle ambient bounce light.`,
    environment: `${atmos}. Deep layered background with cinematic depth of field and soft focal falloff.`,
    negativeInstructions: `morphing faces, erratic fast cuts, floating limbs, stuttering framerate, rubbery motion, blurry lowres textures, text watermark, sudden zoom jumps.`,
    engineSettings: {
      engine: engine,
      motionScore: "Motion slider: 4-5 (keep moderate to prevent limb morphing)",
      recommendedFps: "24fps cinematic film cadence",
      promptFormatTip: `Keep camera movement specified at the start of the prompt for ${engine}.`
    },
    directorNotes: `Pair this with a deep bass sub-rumble and subtle atmospheric wind foley for maximum emotional resonance.`
  };

  if (!apiKey) {
    return res.json(fallbackData);
  }

  try {
    const response = await callWithTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      }),
      8000
    );

    const parsed = extractJSON(response.text || '', fallbackData);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error generating video prompt with Gemini:', err?.message || err);
    return res.json(fallbackData);
  }
});

// ----------------------------------------------------
// 3. Script Studio Generator Endpoint
// ----------------------------------------------------
app.post('/api/generate-script', async (req, res) => {
  const { topic, contentType, platform, tone, language, targetDuration, niche } = req.body;

  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'Please provide a topic or idea for the script.' });
  }

  const selectedContentType = contentType || platform || 'TikTok/Reels';
  const selectedTone = tone || 'Professional';
  const selectedLanguage = language || 'English';
  
  // Default durations based on content type
  let defaultDuration = '45-60 seconds';
  if (selectedContentType === 'YouTube') defaultDuration = '3-5 minutes';
  else if (selectedContentType === 'Advertisement') defaultDuration = '30-45 seconds';
  else if (selectedContentType === 'Story') defaultDuration = '2-3 minutes';
  else if (selectedContentType === 'Instagram') defaultDuration = '30-60 seconds';

  const selectedDuration = targetDuration || defaultDuration;

  const systemInstruction = `You are an elite screenwriter and viral media director who crafts masterclass scripts for top YouTube creators, Hollywood storytellers, Madison Avenue advertising agencies, and viral short-form icons.
Given a topic, content type (${selectedContentType}), language (${selectedLanguage}), and tone (${selectedTone}):
Write a complete, gripping, high-retention production script.
CRITICAL REQUIREMENT: All spoken voiceovers, dialogues, titles, hooks, and captions MUST be written natively and fluently in the requested language: "${selectedLanguage}".

Adapt the format precisely to the Content Type:
- YouTube: Structured with a magnetic 5-second hook, intro tease, 3-4 deep content chapters with B-roll visual cues, and an engaging outro CTA.
- TikTok/Reels: Ultra fast-paced, high retention vertical pacing, 3 distinct hook variations (curiosity gap, contrarian shock, immediate value), kinetic visual pattern interrupts, and a seamless loop CTA.
- Instagram: Aesthetic visual storytelling, relatable narrative or carousel narration, punchy relatable points, community question CTA.
- Advertisement: High-converting commercial direct-response framework (Pattern Interrupt Hook -> Agitation -> Solution Introduction -> Key Benefits -> Social Proof -> Compelling Offer & Urgent CTA).
- Story: Cinematic narrative arc with a compelling logline, atmospheric scene setting, inciting incident, rising dramatic tension, climax, and emotional/philosophical payoff.

The Tone MUST be strictly "${selectedTone}":
- Professional: Polished, authoritative, articulate, insightful, credible.
- Funny: Humorous, witty, clever punchlines, comedic timing, playful.
- Emotional: Heartfelt, deeply poignant, vulnerable, inspiring, moving.
- Cinematic: Epic, visual, poetic, dramatic, moody, sensory atmosphere.

Return strictly valid JSON matching this schema:
{
  "title": "Title of the script in ${selectedLanguage}",
  "contentType": "${selectedContentType}",
  "language": "${selectedLanguage}",
  "tone": "${selectedTone}",
  "targetDuration": "${selectedDuration}",
  "estimatedWordCount": 120,
  "logline": "A compelling 1-sentence premise or core message",
  "hooks": [
    {
      "type": "Primary Hook",
      "spoken": "Opening spoken line",
      "visual": "Action / camera movement / prop",
      "textOverlay": "TEXT ON SCREEN"
    },
    {
      "type": "Alternative Hook",
      "spoken": "Alternative verbal hook",
      "visual": "Alternative visual action",
      "textOverlay": "TEXT ON SCREEN"
    }
  ],
  "scriptBeats": [
    {
      "timestamp": "0:00 - 0:10",
      "phase": "Scene 1: Opening Hook",
      "visual": "Detailed visual directions, camera shot, lighting, actor action",
      "voiceover": "Exact spoken dialogue or voiceover narration"
    },
    {
      "timestamp": "0:10 - 0:30",
      "phase": "Scene 2: Core Revelation",
      "visual": "B-roll, kinetic typography, or key scene progression",
      "voiceover": "Dialogue or narration continuation"
    },
    {
      "timestamp": "0:30 - 0:45",
      "phase": "Scene 3: Climax & Resolution",
      "visual": "Dynamic visual peak, transition to final scene",
      "voiceover": "Climactic spoken line leading to conclusion"
    },
    {
      "timestamp": "0:45 - 0:55",
      "phase": "Scene 4: Call to Action / Final Thought",
      "visual": "Direct address, closing visual mark",
      "voiceover": "Final impactful line and audience action"
    }
  ],
  "fullScript": "The complete, uninterrupted reading script formatted with scene headers and lines, ready to paste directly into a teleprompter or script reader...",
  "callToAction": "Clear closing action or hook",
  "caption": "Post description or video description with emojis and paragraphs",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "productionNotes": [
    "Audio / music track recommendation",
    "Pacing and delivery guidance",
    "Lighting / aesthetic note"
  ]
}`;

  const userPrompt = `Generate a complete ${selectedTone} script for ${selectedContentType} in ${selectedLanguage}.
Topic / Concept: "${topic}"
Duration: ${selectedDuration}`;

  const fallbackData = {
    title: `${topic} - Complete ${selectedTone} Script`,
    contentType: selectedContentType,
    language: selectedLanguage,
    tone: selectedTone,
    targetDuration: selectedDuration,
    estimatedWordCount: 110,
    logline: `An exploration of ${topic} told through a ${selectedTone.toLowerCase()} narrative designed for ${selectedContentType}.`,
    hooks: [
      {
        type: "Opening Hook",
        spoken: `If you want to understand ${topic}, you need to look at what everyone else is ignoring.`,
        visual: "Camera pushes in slowly on subject looking directly into lens with dramatic framing",
        textOverlay: `THE TRUTH ABOUT ${topic.toUpperCase().slice(0, 20)}`
      },
      {
        type: "Alternative Hook",
        spoken: `What if everything you thought about ${topic} was missing one crucial piece?`,
        visual: "Quick smash cut to high-contrast cinematic visual demonstration",
        textOverlay: `WATCH THIS CAREFULLY`
      }
    ],
    scriptBeats: [
      {
        timestamp: "0:00 - 0:10",
        phase: "Scene 1: The Inciting Hook",
        visual: "Fast camera motion tracking toward the subject. High-contrast lighting with vivid atmospheric rim light.",
        voiceover: `Most people approaching ${topic} focus on the symptoms, not the underlying cause.`
      },
      {
        timestamp: "0:10 - 0:25",
        phase: "Scene 2: The Core Insight",
        visual: "Dynamic B-roll sequence illustrating the problem in motion with kinetic text highlights.",
        voiceover: `When you break it down step-by-step, the entire landscape changes. Here is what actually moves the needle.`
      },
      {
        timestamp: "0:25 - 0:42",
        phase: "Scene 3: The Breakthrough Action",
        visual: "Clear, crisp demonstration of the solution. Screen transition with sound effect accent.",
        voiceover: `Notice how this shift immediately removes friction and produces undeniable results.`
      },
      {
        timestamp: "0:42 - 0:50",
        phase: "Scene 4: Outro & Takeaway",
        visual: "Direct camera address, warm natural lighting, subtle graphic watermark on screen.",
        voiceover: `Remember: consistency beats complexity every single time. Save this, put it into practice today, and follow for more.`
      }
    ],
    fullScript: `[SCENE 1 - OPENING HOOK]\n(Visual: Camera pushes in with dramatic framing)\nVOICEOVER: Most people approaching ${topic} focus on the symptoms, not the underlying cause.\n\n[SCENE 2 - THE CORE INSIGHT]\n(Visual: Dynamic B-roll illustrating the shift in motion)\nVOICEOVER: When you break it down step-by-step, the entire landscape changes. Here is what actually moves the needle.\n\n[SCENE 3 - THE BREAKTHROUGH ACTION]\n(Visual: Clear demonstration of the breakthrough)\nVOICEOVER: Notice how this shift immediately removes friction and produces undeniable results.\n\n[SCENE 4 - CONCLUSION & CTA]\n(Visual: Direct eye contact, warm rim lighting)\nVOICEOVER: Remember: consistency beats complexity every single time. Save this, put it into practice today, and let me know your thoughts below!`,
    callToAction: "Save this script for reference and share your thoughts in the comments below!",
    caption: `Everything you need to know about ${topic}. ✨\n\nDrop a comment with your favorite takeaway and make sure to save this post for later reference! 👇`,
    hashtags: ["#contentcreation", "#scriptwriting", "#filmmaking", "#creatorstrategy", "#viralscripts"],
    productionNotes: [
      `Music Cue: Atmospheric low-tempo build matching a ${selectedTone.toLowerCase()} cadence`,
      "Vocal Delivery: Confident pacing with slight pauses before pivotal points",
      "Camera Optics: 35mm focal length with soft bokeh depth of field"
    ]
  };

  if (!apiKey) {
    return res.json(fallbackData);
  }

  try {
    const response = await callWithTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
        },
      }),
      15000
    );

    const parsed = extractJSON(response.text || '', fallbackData);
    return res.json({ ...fallbackData, ...parsed });
  } catch (err: any) {
    console.error('Error generating script with Gemini:', err?.message || err);
    return res.json(fallbackData);
  }
});

// ----------------------------------------------------
// 4. Quick Enhance Prompt Endpoint
// ----------------------------------------------------
app.post('/api/enhance-prompt', async (req, res) => {
  const { prompt, type } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Please provide a prompt to enhance.' });
  }

  const promptType = type || 'image';

  if (!apiKey) {
    return res.json({
      original: prompt,
      enhanced: `${prompt}, masterwork quality, cinematic lighting, 8k resolution, photorealistic, intricate textures, shot on Hasselblad, award-winning composition`,
      improvements: [
        'Added photographic lens & camera specification',
        'Specified volumetric lighting and dynamic contrast',
        'Enriched texture depth and tactile realism'
      ]
    });
  }

  try {
    const systemInstruction = `You are a prompt optimization specialist. Given a user's raw prompt for an ${promptType}, enhance it to professional production-grade quality while preserving their core creative intent. Return JSON with:
{
  "original": "${prompt.replace(/"/g, '\\"')}",
  "enhanced": "The significantly enhanced prompt with sensory depth, styling, and technical markers",
  "improvements": ["Key change 1", "Key change 2", "Key change 3"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Enhance this ${promptType} prompt: "${prompt}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
      }
    });

    const parsed = extractJSON(response.text || '', {
      original: prompt,
      enhanced: `${prompt}, cinematic 8k, photorealistic lighting`,
      improvements: ['Added cinematic lighting']
    });
    return res.json(parsed);
  } catch (err) {
    return res.json({
      original: prompt,
      enhanced: `${prompt}, award-winning composition, cinematic 8k volumetric lighting, intricate details`,
      improvements: ['Enriched visual fidelity and atmosphere']
    });
  }
});

// Vite Middleware for Development / Static for Production
async function setupViteOrStatic() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PromptHub AI Server active on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic().catch((err) => {
  console.error('Failed to start PromptHub server:', err);
});
