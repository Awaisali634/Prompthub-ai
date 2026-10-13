export type ActiveTab = 'home' | 'image-tool' | 'video-tool' | 'script-tool' | 'trending' | 'library' | 'saved' | 'privacy' | 'about';

export interface ImagePromptResult {
  masterPrompt: string;
  shortPrompt?: string;
  negativePrompt?: string;
  parameters?: string;
  variations?: Array<{
    title: string;
    prompt: string;
  }>;
  styleBreakdown?: Array<{
    label: string;
    value: string;
  }>;
  proTip?: string;
}

export interface VideoPromptResult {
  masterPrompt: string;
  cameraMovement: string;
  subjectMovement: string;
  lighting: string;
  environment: string;
  negativeInstructions: string;
  engineSettings?: {
    engine: string;
    motionScore: string;
    recommendedFps: string;
    promptFormatTip?: string;
  };
  directorNotes?: string;
}

export interface ScriptBeat {
  timestamp: string;
  phase: string;
  visual: string;
  voiceover: string;
}

export interface HookOption {
  type: string;
  spoken: string;
  visual: string;
  textOverlay: string;
}

export type ScriptContentType = 'YouTube' | 'TikTok/Reels' | 'Instagram' | 'Advertisement' | 'Story';
export type ScriptTone = 'Professional' | 'Funny' | 'Emotional' | 'Cinematic';

export interface ScriptResult {
  title: string;
  contentType?: ScriptContentType | string;
  language?: string;
  tone?: ScriptTone | string;
  targetDuration: string;
  estimatedWordCount?: number;
  logline?: string;
  hooks: HookOption[];
  scriptBeats: ScriptBeat[];
  fullScript?: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  audioRecommendation?: string;
  retentionHacks?: string[];
  productionNotes?: string[];
}

export interface SavedPromptItem {
  id: string;
  type: 'image' | 'video' | 'script';
  title: string;
  content: string;
  tags: string[];
  createdAt: number;
  metadata?: Record<string, any>;
}

export interface PromptLibraryItem {
  id: string;
  title: string;
  category: 'image' | 'video' | 'script' | 'hook';
  prompt: string;
  tags: string[];
  engine: string;
  author: string;
  copies: number;
  featured?: boolean;
  notes?: string;
}

export interface TrendingItem {
  id: string;
  title: string;
  category: 'Image Gen' | 'Video AI' | 'Shorts Script' | 'Midjourney v6' | 'Sora / Luma';
  preview: string;
  fullPrompt: string;
  tag: string;
  copiesCount: string;
  growth: string;
  badge: string;
  engine: string;
  toolType: 'image' | 'video' | 'script';
}
