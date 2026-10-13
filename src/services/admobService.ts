import { Capacitor } from '@capacitor/core';
import { 
  AdMob, 
  AdOptions, 
  InterstitialAdPluginEvents, 
  AdMobError 
} from '@capacitor-community/admob';
import { ADMOB_CONFIG } from '../config/admob';

class AdMobService {
  private isInitialized = false;
  private isInterstitialReady = false;
  private generationCounter = 0;
  private readonly INTERSTITIAL_FREQUENCY = 3; // Show interstitial every 3 generations

  /**
   * Initialize Google AdMob SDK on native Android / iOS
   */
  async initialize(): Promise<void> {
    try {
      if (!Capacitor?.isNativePlatform?.() || !Capacitor?.isPluginAvailable?.('AdMob')) {
        // In web browser runtime, native AdMob is skipped gracefully
        return;
      }

      if (this.isInitialized) {
        return;
      }

      await AdMob.initialize({
        initializeForTesting: ADMOB_CONFIG.isTestMode,
      });

      this.isInitialized = true;

      // Setup interstitial event listeners
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, () => {
        this.isInterstitialReady = true;
      });

      AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        this.isInterstitialReady = false;
        // Automatically preload the next interstitial ad
        this.prepareInterstitial();
      });

      AdMob.addListener(InterstitialAdPluginEvents.FailedToLoad, (error: AdMobError) => {
        console.warn('[AdMob Service] Interstitial failed to load:', error);
        this.isInterstitialReady = false;
      });

      // Preload the first interstitial ad
      await this.prepareInterstitial();
    } catch (err) {
      console.warn('[AdMob Service] Initialization error:', err);
    }
  }

  /**
   * Preload an Interstitial Ad Unit
   */
  async prepareInterstitial(): Promise<void> {
    if (!Capacitor?.isNativePlatform?.() || !this.isInitialized) {
      return;
    }

    try {
      const options: AdOptions = {
        adId: ADMOB_CONFIG.interstitialAdUnitId,
        isTesting: ADMOB_CONFIG.isTestMode,
      };

      await AdMob.prepareInterstitial(options);
    } catch (err) {
      console.warn('[AdMob Service] Failed to prepare interstitial:', err);
    }
  }

  /**
   * Show Interstitial Ad if ready
   */
  async showInterstitial(): Promise<boolean> {
    if (!Capacitor?.isNativePlatform?.() || !this.isInitialized) {
      return false;
    }

    if (!this.isInterstitialReady) {
      // Try to prepare for next time
      this.prepareInterstitial();
      return false;
    }

    try {
      await AdMob.showInterstitial();
      return true;
    } catch (err) {
      console.warn('[AdMob Service] Failed to show interstitial:', err);
      return false;
    }
  }

  /**
   * Called after a successful creative generation (Image, Video, Script).
   * Triggers an interstitial after every N generations to balance monetization and UX.
   */
  async onGenerationCompleted(): Promise<void> {
    this.generationCounter += 1;
    if (this.generationCounter >= this.INTERSTITIAL_FREQUENCY) {
      this.generationCounter = 0;
      await this.showInterstitial();
    }
  }
}

export const admobService = new AdMobService();
