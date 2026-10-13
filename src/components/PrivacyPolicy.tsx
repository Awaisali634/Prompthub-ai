import React from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Share2, 
  UserCheck, 
  Mail, 
  RefreshCw, 
  ArrowLeft, 
  CheckCircle2, 
  FileText,
  Terminal,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { PromptHubLogo } from './PromptHubLogo';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const lastUpdated = "October 8, 2026";

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Navigation Breadcrumb */}
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
      <div className="bg-[#0f172a]/80 border border-white/10 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Transparency & Trust</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            At <strong className="text-white">PromptHub AI</strong>, your creative ideas belong to you. We believe in total transparency regarding how your prompt data is processed, stored, and protected.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Effective Date: {lastUpdated}
            </span>
            <span className="text-white/20">•</span>
            <span>Version 1.0</span>
            <span className="text-white/20">•</span>
            <span>Zero Data Selling Policy</span>
          </div>
        </div>
      </div>

      {/* Summary Highlights Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
        <div className="p-4 rounded-2xl bg-[#0f172a]/60 border border-white/10 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white mb-0.5">Local-First Storage</h2>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Your saved prompts stay inside your browser's private local cache. We don't maintain personal prompt databases.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f172a]/60 border border-white/10 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white mb-0.5">Encrypted Transit</h2>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              All communications between your device and server proxies use secure HTTPS/TLS encryption.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0f172a]/60 border border-white/10 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white mb-0.5">Zero Third-Party Ads</h2>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We never sell, rent, or trade your creative text or personal usage data to advertisers or data brokers.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <div className="bg-[#0f172a]/40 border border-white/5 rounded-2xl p-4 mb-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
          Quick Navigation
        </span>
        <div className="flex flex-wrap gap-2 text-xs">
          {[
            { id: 'info-collection', label: '1. Information We Collect' },
            { id: 'prompt-handling', label: '2. Handling of Prompts' },
            { id: 'how-we-use', label: '3. How Information is Used' },
            { id: 'third-parties', label: '4. Third-Party Sharing' },
            { id: 'data-security', label: '5. Data Security' },
            { id: 'user-rights', label: '6. User Choices & Rights' },
            { id: 'contact', label: '7. Contact & Support' },
            { id: 'policy-changes', label: '8. Policy Updates' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors text-[11px]"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Policy Sections */}
      <div className="space-y-8 text-slate-300 text-sm leading-relaxed">
        {/* Section 1 */}
        <section id="info-collection" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">1</span>
            <h2>What Information the App May Collect</h2>
          </div>

          <p>
            PromptHub AI is engineered to minimize data collection while providing high-quality creative prompt synthesis. Depending on how you interact with our studios, we may process:
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
              <h3 className="font-semibold text-white text-xs flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                User-Provided Content & Ideas
              </h3>
              <p className="text-xs text-slate-400">
                The concept text, keywords, and parameters you manually enter into the text inputs of the Image Studio, Video Studio, or Script Studio (e.g. style tags, camera angles, tones, aspect ratios, or languages).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
              <h3 className="font-semibold text-white text-xs flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Local Browser Storage Data
              </h3>
              <p className="text-xs text-slate-400">
                When you click "Save" on a prompt or script, it is stored in your web browser's <code className="text-cyan-300 bg-white/5 px-1 py-0.5 rounded text-[11px]">localStorage</code>. This data never leaves your device and is not synced to our servers.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
              <h3 className="font-semibold text-white text-xs flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Technical & Diagnostic Data
              </h3>
              <p className="text-xs text-slate-400">
                Standard, non-personally identifiable diagnostic headers (such as browser user-agent, operating system, and request status) necessary to maintain server uptime, proxy stability, and error debugging.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
            <strong>Note on Payments & Accounts:</strong> PromptHub AI is a 100% free prototype application. We do not require account registration, passwords, credit cards, or billing information.
          </div>
        </section>

        {/* Section 2 */}
        <section id="prompt-handling" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">2</span>
            <h2>How User-Provided Prompts and Content Are Handled</h2>
          </div>

          <p>
            When you type a creative idea and click <strong className="text-white">Generate</strong>, here is the exact lifecycle of your content:
          </p>

          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 pl-1">
            <li>
              <strong className="text-white">Transient Transmission:</strong> Your input string and parameter options are transmitted securely over TLS to our server API route (<code className="text-cyan-300 bg-white/5 px-1 rounded">/api/generate-*</code>).
            </li>
            <li>
              <strong className="text-white">Generative Processing:</strong> The server forwards the instruction to our underlying AI inference model (Google Gemini) with specialized engineering rules.
            </li>
            <li>
              <strong className="text-white">Instant Response & Discard:</strong> The structured prompt result (master prompt, camera moves, hooks, or scenes) is returned directly to your screen. We do not permanently log, catalogue, or sell your input prompts.
            </li>
            <li>
              <strong className="text-white">Full Intellectual Ownership:</strong> You retain complete creative ownership of the prompts, scripts, and video concepts you construct using PromptHub AI.
            </li>
          </ol>
        </section>

        {/* Section 3 */}
        <section id="how-we-use" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">3</span>
            <h2>How Information Is Used</h2>
          </div>

          <p>
            We use the minimal information processed strictly for the following operational purposes:
          </p>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Delivering Core Studio Features:</strong> Synthesizing high-yield prompts for Midjourney v6, Flux, Sora, Runway Gen-3, Kling, and video production scripts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Maintaining Technical Reliability:</strong> Preventing system abuse, mitigating server overload, and ensuring rapid response speeds.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span><strong>Improving Generator Pacing:</strong> Refining system prompts and fallbacks to ensure rich outputs even in low-connectivity conditions.</span>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section id="third-parties" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">4</span>
            <h2>Whether Information Is Shared with Third Parties</h2>
          </div>

          <p>
            We adhere to a strict policy regarding third-party disclosure:
          </p>

          <div className="space-y-2 text-xs text-slate-300">
            <p>
              <strong className="text-emerald-400">We DO NOT Sell Your Data:</strong> We never sell, monetize, rent, or lease your prompts, scripts, or usage statistics to data brokers or advertising agencies.
            </p>
            <p>
              <strong className="text-white">AI Service Provider (Google Gemini API):</strong> To generate prompt extensions and scripts, prompt queries are processed via Google's secure API infrastructure in accordance with Google's API Privacy policies and terms.
            </p>
            <p>
              <strong className="text-white">Display Advertising Partners (Google AdMob / AdSense):</strong> To support free access to PromptHub AI, non-intrusive banner ad placements may be served via Google AdMob/AdSense in designated zones, subject to Google's advertising standards and privacy guidelines.
            </p>
            <p>
              <strong className="text-white">Legal Disclosures:</strong> We will only disclose information if compelled by law, subpoena, or valid legal regulation to protect the rights, property, or safety of our users or the public.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section id="data-security" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">5</span>
            <h2>Data Security</h2>
          </div>

          <p>
            We deploy multiple defense-in-depth measures to safeguard your interactions:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
              <span className="font-semibold text-white">SSL/TLS Encryption</span>
              <p className="text-slate-400">All data transferred between your browser and our backend is encrypted using modern cryptographic protocols.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
              <span className="font-semibold text-white">Zero-Database Footprint</span>
              <p className="text-slate-400">Because prompts are stored client-side, your library is immune to centralized server database breaches.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
              <span className="font-semibold text-white">Isolated Server Proxy</span>
              <p className="text-slate-400">API credentials and generative keys are protected server-side and never exposed to the client browser.</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0b0f17] border border-white/5 space-y-1">
              <span className="font-semibold text-white">CORS & Frame Sandboxing</span>
              <p className="text-slate-400">Protected origin boundaries restrict malicious unauthorized cross-origin requests.</p>
            </div>
          </div>
        </section>

        {/* Section 6 */}
        <section id="user-rights" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">6</span>
            <h2>User Choices and Rights</h2>
          </div>

          <p>
            You maintain full autonomy over your data and usage:
          </p>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Export Your Data:</strong> You can download all your stored prompts at any time in structured JSON format using the "Export JSON" button in the Saved Prompts modal.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Delete Stored Prompts:</strong> You can individually remove any prompt or wipe your entire collection using the "Clear All" button in the Saved Prompts modal.
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Clear Browser Cache:</strong> You can completely erase all PromptHub AI history at any time by clearing your browser's cookies and local storage.
              </div>
            </div>
          </div>
        </section>

        {/* Section 7 */}
        <section id="contact" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">7</span>
            <h2>Contact & Support Information</h2>
          </div>

          <p>
            If you have questions, feedback, or inquiries regarding this Privacy Policy or your data, please contact our team directly:
          </p>

          <div className="p-4 rounded-xl bg-[#0b0f17] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Support & Privacy Email
                </span>
                <a 
                  href="mailto:ak47awaisk786@gmail.com" 
                  className="text-white font-semibold hover:text-cyan-400 transition-colors text-sm"
                >
                  ak47awaisk786@gmail.com
                </a>
              </div>
            </div>

            <a
              href="mailto:ak47awaisk786@gmail.com?subject=PromptHub%20AI%20Privacy%20Inquiry"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors"
            >
              <span>Send Message</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Section 8 */}
        <section id="policy-changes" className="bg-[#0f172a]/70 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-lg sm:text-xl">
            <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-mono">8</span>
            <h2>Changes to This Privacy Policy</h2>
          </div>

          <p>
            We may update our Privacy Policy periodically to reflect enhancements in technology, model capabilities, or regulatory standards. When changes occur:
          </p>

          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>The revised version will be published directly on this page with an updated <strong>Effective Date</strong>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold">•</span>
              <span>Your continued use of PromptHub AI after changes are posted constitutes acceptance of the modified terms.</span>
            </li>
          </ul>
        </section>
      </div>

      {/* Footer Return Action */}
      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
