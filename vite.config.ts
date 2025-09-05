import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Weather Pro',
        short_name: 'WeatherPro',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#111111',
        icons: []
      },
      workbox: {
        runtimeCaching: [
          { urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i, handler: 'NetworkFirst', options: { cacheName: 'open-meteo', expiration:{maxEntries:50, maxAgeSeconds: 3600} } },
          { urlPattern: /^https:\/\/air-quality-api\.open-meteo\.com\/.*/i, handler: 'NetworkFirst', options: { cacheName: 'open-meteo-aqi', expiration:{maxEntries:50, maxAgeSeconds: 3600} } },
          { urlPattern: /^https:\/\/api\.rainviewer\.com\/.*/i, handler: 'StaleWhileRevalidate', options: { cacheName: 'rainviewer' } },
          { urlPattern: /^https:\/\/tilecache\.rainviewer\.com\/.*/i, handler: 'CacheFirst', options: { cacheName:'rain-tiles', expiration:{maxEntries:100} } },
          { urlPattern: ({url}) => url.origin===self.location.origin, handler: 'StaleWhileRevalidate' }
        ]
      }
    })
  ]
});
