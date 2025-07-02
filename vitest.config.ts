import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@clients': path.resolve(__dirname, './src/clients'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    include: ['**/*.test.tsx', '**/*.test.ts', '**/*.test.js', '**/*.test.jsx'],
    globals: true,
  },
});
