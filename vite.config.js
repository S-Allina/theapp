import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/theapp/',
  plugins: [react()],
  https: true,
  server: {
    proxy: {
      '/api': {
        target: 'https://theapp.somee.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
