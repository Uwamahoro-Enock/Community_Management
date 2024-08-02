import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/Community_Management/",
  plugins: [react()],
  server: {
    port: 3001, 
  },
});
