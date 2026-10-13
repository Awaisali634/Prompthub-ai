import { PromptLibraryItem } from '../types';

export const LIBRARY_PROMPTS: PromptLibraryItem[] = [
  {
    id: 'lib-1',
    title: 'Vintage 35mm Tokyo Street Photography',
    category: 'image',
    engine: 'Midjourney v6.1',
    author: 'FilmMaster',
    copies: 8420,
    tags: ['Street Photography', 'Analog Film', '35mm', 'Tokyo'],
    prompt: 'Candid 35mm street photography shot on Kodak Portra 400, rainy night in Shinjuku, glowing ramen stall lantern illuminating steam and rain droplets on umbrella, natural film grain, unposed, nostalgic analog tones, deep shadows and muted highlights --ar 3:2 --v 6.1 --style raw',
    notes: 'Use --style raw to prevent over-polished digital rendering.'
  },
  {
    id: 'lib-2',
    title: 'Minimalist Architectural Villa in Desert',
    category: 'image',
    engine: 'Flux.1 / Midjourney',
    author: 'ArchDesign',
    copies: 6150,
    tags: ['Architecture', 'Minimalism', 'Interior', 'Desert'],
    prompt: 'Ultra-minimalist brutalist concrete villa set against sand dunes in Joshua Tree at sunset, floor-to-ceiling glass walls, infinity reflection pool reflecting orange twilight sky, olive tree in atrium courtyard, warm interior recessed lighting, Architectural Digest editorial, 8k --ar 16:9',
    notes: 'Highlights clean lines and geometric shadows.'
  },
  {
    id: 'lib-3',
    title: 'Macro Cybernetic Mechanical Eye',
    category: 'image',
    engine: 'Midjourney v6.1',
    author: 'NeoArtist',
    copies: 5210,
    tags: ['Cyberpunk', 'Macro', 'Sci-Fi', 'Detail'],
    prompt: 'Extreme macro photographic portrait of a human iris seamlessly integrated with intricate brass clockwork gears and microscopic fiber optic circuitry, glowing teal aperture ring, realistic moist cornea reflections, clinical studio lighting, Hasselblad macro lens --ar 1:1 --v 6.1',
    notes: 'Excels at ultra-fine micro details.'
  },
  {
    id: 'lib-4',
    title: 'Isometric 3D Cozy Coffee Shop Diorama',
    category: 'image',
    engine: 'DALL-E 3 / Flux',
    author: 'PolyArt',
    copies: 7300,
    tags: ['3D Render', 'Isometric', 'Cozy', 'Blender'],
    prompt: 'Charming miniature isometric 3D render of a cozy corner coffee shop, barista pouring espresso, tiny wooden stools, warm amber fairy lights, outdoor patio with tiny potted ferns, cute tilt-shift clay render aesthetic, Octane Render, soft ambient occlusion, clean pastel backdrop --ar 1:1',
    notes: 'Perfect for app icons and landing page illustrations.'
  },
  {
    id: 'lib-5',
    title: 'Slow Dolly Push-in on High Fashion Model',
    category: 'video',
    engine: 'Runway Gen-3',
    author: 'DirectorCine',
    copies: 4890,
    tags: ['Fashion', 'Camera Movement', 'Studio', 'Dolly'],
    prompt: 'Cinematic slow-motion dolly-in at 60fps toward an editorial fashion model wearing an iridescent metallic silver coat. Model maintains steady piercing gaze into lens as high-contrast studio softbox lights sweep across cheekbones. Flawless gimbal stabilization, seamless continuous focus, no facial distortion.',
    notes: 'Specify camera speed to avoid sudden acceleration.'
  },
  {
    id: 'lib-6',
    title: 'Low-Altitude Forest Stream Flight',
    category: 'video',
    engine: 'Sora / Luma',
    author: 'WildCine',
    copies: 5930,
    tags: ['Nature', 'FPV', 'Water', 'Cinematic'],
    prompt: 'Smooth aerial forward glide 50cm above a crystal-clear mountain creek weaving through ancient pine forest. Sunlight cutting through canopy mist creating shimmering god rays on mossy river stones. Realistic water flow physics, zero frame jitter, natural woodland breeze moving needles.',
    notes: 'Keep height specified to maintain ground tracking stability.'
  },
  {
    id: 'lib-7',
    title: 'Neon Motorcycle Night Cruise with Panning',
    category: 'video',
    engine: 'Kling AI / Runway',
    author: 'SpeedCutter',
    copies: 4120,
    tags: ['Action', 'Vehicles', 'Night', 'Neon'],
    prompt: 'Dynamic side-panning tracking shot keeping pace with a sleek electric motorcycle speeding across a futuristic suspension bridge at dusk. Rear taillight streaks blur horizontally into vibrant red ribbons against deep blue cityscape skyline. Consistent wheel rotation and realistic asphalt reflection.',
    notes: 'Great for high-octane promo reels.'
  },
  {
    id: 'lib-8',
    title: '3-Step Product Teaser Micro-Script',
    category: 'script',
    engine: 'Reels / TikTok',
    author: 'GrowthHacker',
    copies: 9240,
    tags: ['E-Commerce', 'Product', 'Viral', 'Shorts'],
    prompt: `[HOOK]: "I tested 15 different productivity tools this year, and only ONE actually doubled my output."
[DEMO BEAT]: Quick screen cuts showing the interface, 3 speed comparisons, clean text overlay.
[VALUE PUNCH]: "Instead of juggling 5 apps, it automates the entire workflow in 2 clicks."
[CTA]: "Comment 'TOOL' below and I'll DM you the private early-access link!"`,
    notes: 'The comment trigger boosts the algorithm engagement score within the first hour.'
  },
  {
    id: 'lib-9',
    title: 'Contrarian Career Advice Reel Script',
    category: 'script',
    engine: 'Instagram Reels',
    author: 'CareerPro',
    copies: 8120,
    tags: ['Career', 'Business', 'Contrarian', 'Retention'],
    prompt: `[HOOK 0-3s]: "Do NOT send another standard resume in 2026. Hiring managers throw 95% into the trash."
[PROBLEM 3-10s]: "Everyone is applying through the same button, competing with 800 people."
[SOLUTION 10-25s]: "Instead, send a 60-second personalized Loom audit addressing their public bottleneck."
[CTA 25-30s]: "Save this strategy and share with a friend actively hunting for a role!"`,
    notes: 'High save rate because viewers treat it as a reference bookmark.'
  },
  {
    id: 'lib-10',
    title: 'Curiosity Gap Hook: "Nobody is talking about this..."',
    category: 'hook',
    engine: 'Universal Short-Form',
    author: 'ViralLab',
    copies: 14200,
    tags: ['Hook', 'Shorts', 'Viral', 'Psychology'],
    prompt: `[VISUAL]: Hold a physical object up to camera lens, then pull it back quickly to reveal face.
[TEXT ON SCREEN]: WHY IS NO ONE TALKING ABOUT THIS? 🤯
[SPOKEN]: "Everyone is obsessing over ChatGPT, but literally nobody is talking about what happened yesterday in AI video..."`,
    notes: 'Creates an immediate open loop in the viewer brain within 1.8 seconds.'
  },
  {
    id: 'lib-11',
    title: 'High-Converting Negative Prompt Master String',
    category: 'image',
    engine: 'Stable Diffusion / Flux',
    author: 'PromptMaster',
    copies: 11400,
    tags: ['Negative Prompt', 'Quality', 'Flux', 'SDXL'],
    prompt: 'blurry, out of focus, distorted facial features, poorly drawn hands, missing fingers, extra digits, fused fingers, mutated anatomy, unnatural skin texture, airbrushed plastic sheen, overexposed, blown highlights, jpeg artifacts, watermark, signature, banner, cropped head, cross-eyed',
    notes: 'Universal negative prompt string for photorealistic character renders.'
  },
  {
    id: 'lib-12',
    title: 'The "Before vs After" Pain Point Script',
    category: 'script',
    engine: 'TikTok',
    author: 'ViralFlow',
    copies: 6730,
    tags: ['Before After', 'Fitness', 'Routine', 'Script'],
    prompt: `[HOOK]: "Look at my schedule 6 months ago vs my schedule today. The difference is insane."
[SPLIT SCREEN]: Chaos vs calm organized routine.
[LESSON]: "I stopped relying on willpower and implemented the 3-2-1 rule."
[BREAKDOWN]: Quick bullet points on screen with punchy narration.
[CTA]: "Double tap if you're fixing your habits this month!"`,
    notes: 'Visual contrast triggers immediate interest.'
  }
];
