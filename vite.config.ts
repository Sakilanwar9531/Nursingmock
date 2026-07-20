import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { execSync } from 'child_process';

// Custom Enterprise Pre-Rendering Plugin
function prerenderPlugin() {
  return {
    name: 'vite-plugin-prerender',
    closeBundle() {
      console.log('\n📦 [vite-plugin-prerender] Triggering static page generation...');
      try {
        execSync('npx tsx prerender.ts', { stdio: 'inherit' });
      } catch (err) {
        console.error('❌ [vite-plugin-prerender] Pre-rendering failed:', err);
      }
    }
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss(), prerenderPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
