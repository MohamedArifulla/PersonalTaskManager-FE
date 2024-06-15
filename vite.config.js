import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

export default defineConfig(({ mode }) => {
  dotenv.config({ path: `.env.${mode}` });

  return {
    plugins: [sveltekit()],
    css: {
      postcss: './postcss.config.js'
    },
    server: {
      proxy: {
        '/api': process.env.VITE_API_URL
      }
    },
    define: {
      'process.env': process.env
    }
  };
});
