import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/creator-publish-assistant/',
  plugins: [react()],
});
