import path from 'node:path';
/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          heroui: ['@heroui/react', '@heroui/use-infinite-scroll', '@heroui/use-disclosure'],
          tanstack: ['@tanstack/react-query', '@tanstack/react-query-persist-client'],
          zod: ['zod'],
          axios: ['axios'],
          framer: ['framer-motion'],
          zustand: ['zustand'],
        },
      },
    },
  },
});
