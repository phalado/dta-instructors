import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import federation from '@originjs/vite-plugin-federation';
import { withZephyr } from 'vite-plugin-zephyr';

const mfConfig = {
  name: 'dta_instructors_remote',
  filename: 'remoteEntry.js',
  exposes: {
    './Instructors': './src/pages/Instructors/index.tsx',
    './InstructorProfile': './src/pages/InstructorProfile/index.tsx',
    './SchedulePage': './src/pages/SchedulePage/index.tsx',
  },
  shared: {
    react: { singleton: true, eager: true, requiredVersion: '^19.2.0' },
    'react-dom': { singleton: true, eager: true, requiredVersion: '^19.2.0' },
    'react-router-dom': { singleton: true, eager: true, requiredVersion: '^7.13.1' },
    'react-toastify': { singleton: true, eager: true, requiredVersion: '^11.0.5' },
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), federation({ ...mfConfig }), withZephyr()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    assetsDir: '',
  },
  server: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5001,
    strictPort: true,
    cors: true,
  },
});
