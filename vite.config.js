import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: 'https://s-allina.github.io/theapp/',
  plugins: [react()],
  https: true,
  server: {
    proxy: {
      '/api': {
        target: 'http://theapp.somee.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
