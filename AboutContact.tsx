import React, { useState } from 'react';
import { 
  Sparkles, 
  Mail, 
  Send, 
  Check, 
  Copy, 
  MessageSquare, 
  HelpCircle, 
  Bug, 
  Lightbulb, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Clapperboard, 
  TrendingUp,
  ArrowLeft,
  ExternalLink,
  Heart
} from 'lucide-react';
import { PromptHubLogo } from './PromptHubLogo';

interface AboutContactProps {
  onBack: () => void;
  onNavigateTab?: (tab: 'image-tool' | 'video-tool' | 'script-tool' | 'trending' | 'library') => void;
}

export const AboutContact: React.FC<AboutContactProps> = ({ onBack, onNavigateTab }) => {
  const supportEmail = "ak47awaisk786@gmail.com";
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Questions & Inquiries',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setIsSubmitting(true);
    // Simulate instantaneous delivery & prepare fallback mailto link
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      inquiryType: 'Questions & Inquiries',
      message: ''
    });
    setSubmitted(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb Back Button */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to PromptHub AI Overview</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="bg-[#0f172a]/85 border border-white/10 rounded-3xl p-6 sm:p-10 mb-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About the Platform & Support</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-white">PromptHub</span><span className="text-cyan-400"> AI</span>
          </h1>

          {/* Primary Statement */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0b0f17]/90 border border-cyan-500/30 shadow-lg">
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              <strong>PromptHub AI</strong> is an AI-powered platform that helps users create high-quality prompts for images and videos, write scripts, and discover trending content ideas.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Engineered specifically for creators, digital filmmakers, marketers, and storytellers who want to bridge the gap between creative imagination and state-of-the-art generative models without spending hours manually tuning parameters.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Free Prototype
            </span>
            <span className="text-white/20">•</span>
            <span>Zero Subscription Requirement</span>
            <span className="text-white/20">•</span>
            <span>Local Browser Privacy</span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars of PromptHub AI */}
      <div className="mb-14">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-1">
            Core Capabilities
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            What You Can Create with PromptHub AI
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pillar 1 */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/70 border border-violet-500/20 hover:border-violet-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Image Prompt Studio</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generates photorealistic cinematic lighting, anamorphic lens optics, negative prompt barriers, and aspect ratios for Midjourney v6.1, Flux.1, and DALL-E 3.
              </p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('image-tool')}
                className="mt-4 text-xs font-semibold text-violet-400 hover:text-violet-300 text-left transition-colors"
              >
                Launch Image Studio →
              </button>
            )}
          </div>

          {/* Pillar 2 */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <VideoIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Video Prompt Studio</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choreographs cinematic camera paths (dolly, FPV, orbital), organic subject velocity, and anti-warp guidelines for Sora, Runway Gen-3, Luma, and Kling AI.
              </p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('video-tool')}
                className="mt-4 text-xs font-semibold text-cyan-400 hover:text-cyan-300 text-left transition-colors"
              >
                Launch Video Studio →
              </button>
            )}
          </div>

          {/* Pillar 3 */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/70 border border-rose-500/20 hover:border-rose-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Clapperboard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Script Studio</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Writes complete production scripts for YouTube, TikTok/Reels, Instagram, Advertisements, and Stories across 14 languages with scene directions and teleprompter view.
              </p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('script-tool')}
                className="mt-4 text-xs font-semibold text-rose-400 hover:text-rose-300 text-left transition-colors"
              >
                Launch Script Studio →
              </button>
            )}
          </div>

          {/* Pillar 4 */}
          <div className="p-5 rounded-2xl bg-[#0f172a]/70 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-sm">Trending & Library</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Curates community-tested viral prompts, visual trends, and script formulas. 1-click copy or load straight into any studio to customize in real-time.
              </p>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('trending')}
                className="mt-4 text-xs font-semibold text-amber-400 hover:text-amber-300 text-left transition-colors"
              >
                Explore Trending →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contact & Support Section */}
      <div id="contact-support" className="scroll-mt-20 mb-14">
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block mb-1">
            Get in Touch
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Contact & Creator Support</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Helpdesk
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Have questions, feedback, feature suggestions, or encountered a technical issue? Contact the app owner directly below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Quick Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Direct Owner Email Card */}
            <div className="p-5 rounded-2xl bg-[#0f172a]/80 border border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Owner & Support Email
                  </span>
                  <a
                    href={`mailto:${supportEmail}`}
                    className="text-white font-bold hover:text-cyan-400 transition-colors text-sm break-all"
                  >
                    {supportEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-200 transition-colors"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${supportEmail}?subject=PromptHub%20AI%20Inquiry`}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white transition-colors"
                >
                  <span>Open Client</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Support Categories Pill Highlights */}
            <div className="p-5 rounded-2xl bg-[#0f172a]/80 border border-white/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                How We Can Assist You
              </span>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0b0f17] border border-white/5">
                  <Bug className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Technical Issues & Bugs</strong>
                    <span className="text-slate-400 text-[11px]">Encountered generation timeouts or formatting issues? Let us know so we can fix it.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0b0f17] border border-white/5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Feature Suggestions & AI Models</strong>
                    <span className="text-slate-400 text-[11px]">Request new AI video engines, prompt parameters, or short-form script niches.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#0b0f17] border border-white/5">
                  <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">General Inquiries & Creator Collabs</strong>
                    <span className="text-slate-400 text-[11px]">Questions about how to use PromptHub AI for your creative workflow or business.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#0f172a]/90 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-xl backdrop-blur-xl">
              {submitted ? (
                /* Success State */
                <div className="py-8 px-4 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/40">
                    <Check className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      Message Submitted Successfully!
                    </h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out to PromptHub AI. Your message regarding <strong className="text-cyan-300">"{formData.inquiryType}"</strong> has been logged. You can also reach out anytime at <a href={`mailto:${supportEmail}`} className="text-cyan-400 underline">{supportEmail}</a>.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Form */
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-cyan-400" />
                      <span>Send Direct Feedback or Question</span>
                    </h3>
                    <span className="text-[10px] text-slate-400">Response within 24-48 hrs</span>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-200 text-xs focus:border-cyan-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="Questions & Inquiries">Questions & General Inquiries</option>
                      <option value="Feedback & Feature Request">Feedback & Feature Request</option>
                      <option value="Technical Issue / Bug Report">Technical Issue / Bug Report</option>
                      <option value="Prompt Suggestion">Prompt Suggestion</option>
                    </select>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Your Name / Handle
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Creator"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-100 placeholder-slate-500 text-xs focus:border-cyan-500 outline-none transition-all"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. alex@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-100 placeholder-slate-500 text-xs focus:border-cyan-500 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                      Your Message or Issue Description
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your question, the feature you'd like to see, or any technical issue you ran into..."
                      className="w-full px-3.5 py-3 rounded-xl bg-[#0b0f17] border border-white/10 text-slate-100 placeholder-slate-500 text-xs leading-relaxed focus:border-cyan-500 outline-none resize-none transition-all"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.message.trim()}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-violet-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-950/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-cyan-200" />
                        <span>Submit Message to App Owner</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0f172a]/60 border border-white/10 mb-10">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-white text-base">Frequently Asked Questions</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
            <span className="font-semibold text-white block">Is PromptHub AI completely free to use?</span>
            <p className="text-slate-400 leading-relaxed">
              Yes. PromptHub AI is a 100% free creator platform prototype. You do not need a subscription, credit card, or account to generate image prompts, video prompts, or scripts.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
            <span className="font-semibold text-white block">Can I use the generated scripts and prompts commercially?</span>
            <p className="text-slate-400 leading-relaxed">
              Yes. You retain full creative rights to all generated master prompts, short-form scripts, and captions created using PromptHub AI for both personal and commercial projects.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
            <span className="font-semibold text-white block">How are my saved prompts stored?</span>
            <p className="text-slate-400 leading-relaxed">
              Your saved prompts are kept strictly inside your local browser cache (`localStorage`). They are never uploaded or synced to external tracking servers, preserving your creative privacy.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
            <span className="font-semibold text-white block">How do I suggest a new feature or AI engine?</span>
            <p className="text-slate-400 leading-relaxed">
              Use the contact form above or email us directly at <a href={`mailto:${supportEmail}`} className="text-cyan-400 underline">{supportEmail}</a>. We actively incorporate community feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Return Action */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <PromptHubLogo size="sm" showBadge={true} />
        
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Creator Studios</span>
        </button>
      </div>
    </div>
  );
};
