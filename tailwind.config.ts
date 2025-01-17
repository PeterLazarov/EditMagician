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
        contrast: '#fff',
        primary: {
          50:  '#FFFBE8',
          100: '#FFF2C2',
          200: '#FFE894',
          300: '#FFDD66',
          400: '#FFD33B',
          500: '#FFC800',
          600: '#C1A102',
          700: '#998302',
          800: '#726302',
          900: '#4C4301',
        },
      },
    },
  },

  plugins: [flowbitePlugin],
} as Config;
