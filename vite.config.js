import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import urls from './url';

export default defineConfig({
  base: '/theapp/',
  plugins: [react()],
  https: true,
  server: {
    proxy: {
      '/api': {
        target: urls.AUTH,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
