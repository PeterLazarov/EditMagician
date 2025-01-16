import flowbitePlugin from "flowbite/plugin";

import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        background: '#2E294E',
        text: '#F7F7FF',
        primary: {
          50:  '#FFFBE6',
          100: '#FFF4BF',
          200: '#FFEB80',
          300: '#FFE240',
          400: '#FFDA1A',
          500: '#FFD000',
          600: '#FFD400',
          700: '#CCAA00',
          800: '#997F00',
          900: '#665500',
        },
      },
    },
  },

  plugins: [flowbitePlugin],
} as Config;
