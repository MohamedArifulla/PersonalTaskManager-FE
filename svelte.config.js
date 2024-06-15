import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  preprocess: preprocess({
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
        // other PostCSS plugins as needed
      ],
    },
  }),

  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '' : ''
    }
  }
};
