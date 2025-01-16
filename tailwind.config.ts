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
        background: {
          "50": "#F0EFF3",
          "100": "#D6D4DD",
          "200": "#BBB9C8",
          "300": "#A19FB3",
          "400": "#86849D",
          "500": "#3A335A",
          "600": "#2E294E",
          "700": "#272342",
          "800": "#201C37",
          "900": "#19162B"
        },
        text: '#F7F7FF',
        border: '#4B5563',
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
