import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|modal).js'

  ],
  darkMode: "class",

  theme: {
    animation: {
      scale: 'scale 0.3s ease-in-out 1',
    },
    keyframes: {
      scale: {
        '0%': {  opacity: '0' },
        '100%': {  opacity: '1' }, // Scale up a little
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem', // Extra padding for `sm` screens
          lg: '0rem',
          xl: '1rem',
          '2xl': '1rem',
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
