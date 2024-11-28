import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['**/__tests__/**/(*.)+(spec|test).js', '**/?(*.)+(spec|test).js'],
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      server: {
        deps: {
          inline: [/^(?!.*vitest).*$/]
        }
      },
      setupFiles: ['vuetify.config.js'],
      coverage: {
        all: true,
        reporter: ['text', 'lcov'],
        include: ['**/src/**'],
        exclude: ['**/src/plugins/**', '**/src/App.vue', '**/src/main.js', '**/src/router/index.js', '**/src/components/icons/**', '**/src/router/index.js'],
      },
    }
  })
)
