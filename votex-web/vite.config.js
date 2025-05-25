import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': {
        target: 'http://votex-server:5000', // used in development
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
