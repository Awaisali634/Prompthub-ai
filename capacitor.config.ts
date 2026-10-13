import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prompthub.ai',
  appName: 'PromptHub AI',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  plugins: {
    // Capacitor Community AdMob configuration
  },
};

export default config;
