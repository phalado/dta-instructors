import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_BASE_URL || 'http://localhost:5001/',
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'dta_instructors_remote',
        filename: 'remoteEntry.js',
        exposes: {
          './InstructorsPage': './src/pages/Instructors/index.tsx',
          './InstructorProfile': './src/pages/Instructors/InstructorProfile.tsx',
          './SchedulePage': './src/pages/Instructors/SchedulePage.tsx',
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
      }),
    ],
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
  };
});
