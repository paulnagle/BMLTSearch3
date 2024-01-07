import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ie.nasouth.bmltsearch',
  appName: 'BMLT Search',
  webDir: 'www',
  ios: {
    scheme: 'BMLT Search'
  },
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  }
};

export default config;
