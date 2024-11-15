import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  resolve: {
    alias: {
      '@ai-kit': path.resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
