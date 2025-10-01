import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  https: true,
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7237',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
