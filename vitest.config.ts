import { defineConfig, mergeConfig } from 'vitest/config';

import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      include: ['src/lib/**/*.test.ts'],
      coverage: {
        provider: 'v8',
        include: ['src/lib/math.ts'],
        exclude: ['src/lib/bad-examples.ts', 'src/lib/**/*.test.ts'],
        thresholds: {
          lines: 80,
          branches: 70,
          functions: 80,
          statements: 80,
        },
      },
    },
  }),
);
