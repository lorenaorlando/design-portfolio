import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base so the build works on the custom domain and in previews.
  base: './',
  plugins: [react()],
});
