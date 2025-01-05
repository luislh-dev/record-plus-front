/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          nextui: [
            '@nextui-org/react',
            '@nextui-org/use-infinite-scroll',
            '@nextui-org/use-disclosure'
          ],
          tanstack: ['@tanstack/react-query', '@tanstack/react-query-persist-client'],
          zod: ['zod'],
          axios: ['axios'],
          framer: ['framer-motion'],
          zustand: ['zustand']
        }
      }
    }
  }
});
