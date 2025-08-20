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
    /* Minimum coverage percentage */
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['lcov', 'text-lcov', 'text', 'json', 'html'],
      reportsDirectory: './coverage',
      all: true,
      include: ['src/**/*.{ts,tsx,js,jsx}'],
      exclude: ['**/*.test.{ts,tsx,js,jsx}'],
      thresholds: {
        global: {
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
