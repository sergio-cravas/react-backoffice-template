import path from 'path';
import { fileURLToPath } from 'url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  server: {
    port: 3000,
  },
  define: {
    'import.meta.env.USE_MOCKS': mode === 'mock',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@config': path.resolve(__dirname, './config'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [react(), tsconfigPaths()],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
}));
