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
              login: '32px',
              auth: '1.5vh',
              'auth-btn': '16px',
            },
            spacing: {
                18: '4.5rem',
                88: '22rem',
            },
            boxShadow: {
                'soft': '0 0 12px -6px var(--color-shadow-color)', 
                'taught': '0 0 14px -2px var(--color-shadow-color)',
                'themeSwitchShadow': 'var(--color-themeSwitchShadow)',
            },
            backgroundImage: {
              'theme-bg': 'var(--color-bg-image)',
              'profileImg': 'var(--color-profileImg)',
            }
        },
    },
    plugins: [
      createThemes({
        light: {
        background: '#F9FAFB',
        btnBg: '#6C7CFF',
        primary: '#ffffff',
        main: '#012e43',
        sidebar: '#F2F3F3',
        secondary: '#64748b',
        'text-color': '#1f2937',
        'bg-color': '#ffffff',
        'auth-form-bg': '#f3f4f6',
        'line-color': '#272727',
        'gradient-from': '#4D9FFF',
        'gradient-to': '#6AAFFF',
        'grid-color': '#000000',
        'shadow-color': '#1B0021',
        'table-head': '#F1F5F9',
        themeSwitch: '#FFFFFF',
        themeSwitchShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.35)',
        themeSwitchBg: '#6C7CFF',
        themeSwitchBorder: 'none',
      },
      dark: {
        background: '#0B0F1A',
        btnBg: '#6C7CFF',
        primary: '#2F2F61',
        main: '#7f1917',
        sidebar: '#A9B1B1',
        secondary: '#94a3b8',
        'text-color': '#f9fafb',
        'bg-color': '#111827',
        'auth-form-bg': '#1f2937',
        'line-color': '#ffffff',
        'gradient-from': '#A62023',
        'gradient-to': '#510D00',
        'grid-color': '#ffffff',
        'shadow-color': '#f3f4f6',
        'table-head': '#6868BA',
        themeSwitch: '#F9FAFB',
        themeSwitchShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.35)',
        themeSwitchBg: '#161C33',
        themeSwitchBorder: '#E0E9FB',
      },
      }),
  ],
}
