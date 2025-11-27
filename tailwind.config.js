import { createThemes } from "./src/features/theme/utils/createThemes";

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            spacing: {
                18: '4.5rem',
                88: '22rem',
            },
        },
    },
    plugins: [
      createThemes({
        light: {
          'primary': '#38bdf8', // todo palitre of colors
        },
        dark: {
          'primary': '#0ea5e9',
        }
      }),
  ],
}
