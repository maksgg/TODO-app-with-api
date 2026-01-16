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
            borderColor: {
              themeSwitchB: 'var(--color-themeSwitchBorder)',
            },
            boxShadow: {
                soft: '0 0 12px -6px var(--color-shadow-color)', 
                taught: '0 0 14px -2px var(--color-shadow-color)',
                themeSwitchShadow: 'var(--color-themeSwitchShadow)',
                sidebarHover: 'inset 0px 4px 8px -4px rgba(0, 8, 232, 0.2)',
                sidebarActive: '0px 0 8px 0px rgba(0, 0, 0, 0.35)',
                sidebarBgShadow: '0px 0px 15px 0px rgba(49, 33, 191, 0.4)',
                themeMorph: 'inset 1px -1px 1px -1px rgba(255, 255, 255), inset -1px 1px 1px -1px #fff',
            },
            dropShadow: {
                themeSvgShadow: [ // shadow for themeSwitch Svg
                    '0 0 1.26px rgba(255, 255, 255, 1)',
                    '0 0 2.52px rgba(255, 255, 255, 1)'
                ],
            },
            backgroundImage: {
              sidebarHoverGradient: 'linear-gradient(to bottom, rgba(0, 8, 232, 0.2) 0%, transparent 100%)',
              themeSwitchGradient: 'linear-gradient(to bottom, var(--color-gradientFrom), var(--color-gradientTo))',
            }
        },
    },
    plugins: [
      createThemes({
        light: {
        background: '#F9FAFB',
        btnBg: '#6C7CFF',
        // sidebarBg: '#232A4A',
        sidebarText: '#A6ADCF',
        sidebarHoverLink: '#232A4A',
        sidebarActiveLink: '#11162A',

        gradientFrom: '#422CD0',
        gradientTo: '#7592FF',
        themeSwitchBorder: '#B7C7F8',
        thumb: 'rgba(11, 0, 80, 0.2)',


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
      },
      dark: {
        background: '#0B0F1A',
        btnBg: '#6C7CFF',
        // sidebarBg: '#232A4A',
        sidebarText: '#A6ADCF',
        sidebarHoverLink: '#232A4A',
        sidebarActive: '#11162A',

        gradientFrom: '#161C33',
        gradientTo: '#183BC4',
        themeSwitchBorder: '#2C345A',
        thumb: 'rgba(11, 0, 80, 0.2)',

        
        primary: '#2d2d91',
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
      },
      }),
  ],
}
