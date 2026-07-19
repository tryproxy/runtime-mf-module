import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', { target: '19' }]],
      },
    }),
    tailwindcss(),
    viteTsconfigPaths(),
    svgr({
      include: '**/*.svg?react',
    }),
    federation({
      name: 'runtime_mf_module',
      filename: 'remoteEntry.js',
      exposes: {
        './mount': './src/entry/mount.tsx',
      },
      shared: {
        react: { requiredVersion: '^19.1.1' },
        'react-dom': { requiredVersion: '^19.1.1' },
      },
    }),
  ],
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
  build: {
    target: 'esnext',
  },
});
