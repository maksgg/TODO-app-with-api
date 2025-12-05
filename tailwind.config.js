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
              login: '90px'
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
        'primary': '#F5F9FF',
        'secondary': '#64748b',
        'text-color': '#1f2937',
        'bg-color': '#ffffff',
        'auth-form-bg': '#f3f4f6',

        'line-color': '#272727',
        'gradient-from': '#001E32',
        'gradient-to': '#0968AC'
      },
      dark: {
        'primary': '#60a5fa',
        'secondary': '#94a3b8',
        'text-color': '#f9fafb',
        'bg-color': '#111827',
        'auth-form-bg': '#1f2937',

        'line-color': '#ffffff',
        'gradient-from': '#001E32',
        'gradient-to': '#0968AC'
      },
      }),
  ],
}
