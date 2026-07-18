import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    // CRITICAL: For Vercel root domain deployment (ncbt.in), ALWAYS use base: '/'
    // DO NOT change to './' unless deploying to a subdirectory
    // Relative paths break asset loading on root domains
    base: '/',
    plugins: [react(), tailwindcss()],
    build: {
      cssCodeSplit: true,
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
