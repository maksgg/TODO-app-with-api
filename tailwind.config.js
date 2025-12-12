import { createThemes } from "./src/features/theme/utils/createThemes";

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            fontSize: {
              login: '6vh',
              auth: '1.5vh',
              'auth-btn': '2vh',
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
        'primary': '#ffffff',
        'main': '#012e43',
        'secondary': '#64748b',
        'text-color': '#1f2937',
        'bg-color': '#ffffff',
        'auth-form-bg': '#f3f4f6',
        'line-color': '#272727',
        'gradient-from': '#001E32',
        'gradient-to': '#0968AC',
        'grid-color': '#000000',
      },
      dark: {
        'primary': '#000000',
        'main': '#7f1917',
        'secondary': '#94a3b8',
        'text-color': '#f9fafb',
        'bg-color': '#111827',
        'auth-form-bg': '#1f2937',
        'line-color': '#ffffff',
        'gradient-from': '#A62023',
        'gradient-to': '#510D00',
        'grid-color': '#ffffff',
      },
      }),
  ],
}
