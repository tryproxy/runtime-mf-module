import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import federation from '@originjs/vite-plugin-federation';
import { rmfNavJson } from './vite-plugin-rmf-nav-json';
import { rmfRemoteCssLayer } from './vite-plugin-rmf-remote-css-layer';

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
        './mount': './src/app/entry/mount.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
    rmfNavJson(),
    rmfRemoteCssLayer(),
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
