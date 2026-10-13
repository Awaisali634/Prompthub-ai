/**
 * PromptHub AI - Google AdMob Android & Web Advertising Configuration
 * 
 * Uses Google's official AdMob Test Ad IDs during development/testing
 * to comply with Google AdMob policies and prevent account suspension.
 * 
 * Official Google Sample IDs reference:
 * https://developers.google.com/admob/android/test-ads
 */

export const GOOGLE_ADMOB_OFFICIAL_TEST_IDS = {
  // Google's official sample App ID for Android
  appId: 'ca-app-pub-3940256099942544~3347511713',
  // Google's official sample Interstitial Ad Unit ID for Android
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  // Google's official sample Adaptive Banner Ad Unit ID for Android
  banner: 'ca-app-pub-3940256099942544/6300978111',
  // Google's official sample Rewarded Video Ad Unit ID for Android
  rewarded: 'ca-app-pub-3940256099942544/5224354917',
};

// Check if test mode is active (default is true unless explicitly set to production)
const isTestMode = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMOB_ENV !== 'production') ||
  process.env.NODE_ENV !== 'production';

export const ADMOB_CONFIG = {
  // Toggle ads globally
  enabled: true,

  // Test mode flag
  isTestMode,

  // Google AdMob App ID
  appId: isTestMode
    ? GOOGLE_ADMOB_OFFICIAL_TEST_IDS.appId
    : ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMOB_APP_ID) || GOOGLE_ADMOB_OFFICIAL_TEST_IDS.appId),

  // Google AdMob Interstitial Ad Unit ID
  interstitialAdUnitId: isTestMode
    ? GOOGLE_ADMOB_OFFICIAL_TEST_IDS.interstitial
    : ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMOB_INTERSTITIAL_SLOT_ID) || GOOGLE_ADMOB_OFFICIAL_TEST_IDS.interstitial),

  // Google AdMob Banner Ad Unit ID
  bannerAdUnitId: isTestMode
    ? GOOGLE_ADMOB_OFFICIAL_TEST_IDS.banner
    : ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMOB_BANNER_SLOT_ID) || GOOGLE_ADMOB_OFFICIAL_TEST_IDS.banner),

  // Web fallback publisher ID (for web ad banners)
  publisherId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMOB_PUBLISHER_ID) || 'ca-app-pub-3940256099942544',

  slots: {
    homeBanner: {
      slotId: 'prompthub-home-banner',
      adUnitId: isTestMode
        ? GOOGLE_ADMOB_OFFICIAL_TEST_IDS.banner
        : ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMOB_BANNER_SLOT_ID) || GOOGLE_ADMOB_OFFICIAL_TEST_IDS.banner),
      format: 'horizontal' as const,
      description: 'Homepage Responsive Banner'
    },
    studioResultsBanner: {
      slotId: 'prompthub-studio-results-banner',
      adUnitId: isTestMode
        ? GOOGLE_ADMOB_OFFICIAL_TEST_IDS.banner
        : ((typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMOB_BANNER_SLOT_ID) || GOOGLE_ADMOB_OFFICIAL_TEST_IDS.banner),
      format: 'auto' as const,
      description: 'Studio Prompt & Script Results Placement'
    }
  }
};
