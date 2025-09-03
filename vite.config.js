import { defineConfig } from 'vite'

// When running tests, Vitest sets process.env.VITEST. Avoid importing
// @vitejs/plugin-react in that case to prevent optional native rollup
// modules from being required during test runs in some Windows/npm setups.
let plugins = []
if (!process.env.VITEST) {
  // dynamic import so the module is only loaded in dev/build scenarios
  const plugin = await import('@vitejs/plugin-react')
  plugins = [plugin.default()]
}

export default defineConfig({
  plugins
})
