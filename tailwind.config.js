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
              authTitle: ['48px', { lineHeight: '110%', fontWeight: '600' }],
              headPrimary: ['32px', { lineHeight: '120%', fontWeight: '600' }],
              dataMetric: ['28px', { lineHeight: '120%', fontWeight: '600' }],
              modalHead: ['24px', { lineHeight: '120%', fontWeight: '600' }],
              intro: ['24px', { lineHeight: '120%', fontWeight: '500' }],
              headingCard: ['20px', { lineHeight: '120%', fontWeight: '600' }],
              displayName: ['20px', { lineHeight: '120%', fontWeight: '500' }],
              bodyIntro: ['20px', { lineHeight: '130%', fontWeight: '400' }],
              uiHead: ['16px', { lineHeight: '110%', fontWeight: '600' }],
              uiBtn: ['16px', { lineHeight: '110%', fontWeight: '500' }],
              bodyL: ['16px', { lineHeight: '130%', fontWeight: '400' }],
              bodyEmphasis: ['14px', { lineHeight: '120%', fontWeight: '600' }],
              uiLabel: ['14px', { lineHeight: '120%', fontWeight: '500' }],
              bodyM: ['14px', { lineHeight: '130%', fontWeight: '400' }],
              dataBody: ['12px', { lineHeight: '120%', fontWeight: '500' }],
              uiCaption: ['12px', { lineHeight: '120%', fontWeight: '400' }],
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
                innerOutline: 'inset 0 0 0 2px var(--color-primary)',
                innerOutlineDangerous: 'inset 0 0 0 2px var(--color-dangerous)',
            },
            
            dropShadow: {
                themeSvgShadow: [ // shadow for themeSwitch Svg
                    '0 0 1.26px rgba(255, 255, 255, 1)',
                    '0 0 2.52px rgba(255, 255, 255, 1)'
                ],
                primary: '1px 0px 2px rgba(62, 79, 255, 1)',
                dangerous: '1px 0px 2px rgba(220, 38, 38, 1)',
                
            },
            backgroundImage: {
              sidebarHoverGradient: 'linear-gradient(to bottom, rgba(0, 8, 232, 0.2) 0%, transparent 100%)',
              themeSwitchGradient: 'linear-gradient(to bottom, var(--color-gradientFrom), var(--color-gradientTo))',
              headerBorder: 'linear-gradient(90deg, rgba(62, 13, 168, 1) 0%, rgba(95, 134, 239, 1) 100%)',
              authBg: 'url(@/shared/assets/images/auth-bg.png)',
              authForm: 'linear-gradient(180deg, rgba(30, 0, 76, 0.4) 0%, rgba(0, 12, 240, 0.4) 100%)',
            }
        },
    },
    plugins: [
      createThemes({
        light: {
        background: '#F9FAFB',
        secondaryBg: '#FFFFFF',
        secondaryBgDark: '#11162A',
        txtPrimary: '#0F172A',
        txtPrimaryDark: '#E6E9F5',
        txtSecondaryDark: '#A6ADCF',
        txtDisabledDark: '#767D9B',
        txtMutedDark: '#6E76A3',
        txtMutedLight: '#94A3B8',
        muted: '#94A3B8',
        disabledBtn: '#CBD5E1',
        primary: '#476FFF',
        secondary: '#475569',
        activePrimary: '#4B5BFF',
        dangerous: '#EF4444',
        activeDangerous: '#B91C1C',
        dangerousErrMsg: '#F08A8A',
        authBorder: '#6C7CFF',
        borderDefault: '#D3E0FC',
        listCardBorder: '#C6D3F4',
        borderHover: '#A9BEFE',
        borderDefaultDark: '#2B3D8A',
        disabledBorder: '#F0F1F3',
      
        sidebarHoverLink: '#232A4A',
        sidebarActiveLink: '#11162A',
        sidebarBorder: 'rgba(11, 0, 80, 0.5)',
        //theme switch
        gradientFrom: '#422CD0',
        gradientTo: '#7592FF',
        themeSwitchBorder: '#B7C7F8',
        thumb: 'rgba(11, 0, 80, 0.2)',
      },
      dark: {
        background: '#0B0F1A',
        secondaryBg: '#ffffff',
        secondaryBgDark: '#11162A',
        txtPrimary: '#0F172A',
        txtPrimaryDark: '#E6E9F5',
        txtSecondaryDark: '#A6ADCF',
        txtDisabledDark: '#767D9B',
        txtMutedDark: '#6E76A3',
        txtMutedLight: '#94A3B8',
        muted: '#94A3B8',
        disabledBtn: '#CBD5E1',
        primary: '#6C7CFF',
        secondary: '#475569',
        activePrimary: '#4B5BFF',
        dangerous: '#EF4444',
        activeDangerous: '#B91C1C',
        dangerousErrMsg: '#F08A8A',
        authBorder: '#6C7CFF',
        borderDefault: '#D3E0FC',
        listCardBorder: '#C6D3F4',
        borderHover: '#A9BEFE',
        borderDefaultDark: '#2B3D8A',
        disabledBorder: '#F0F1F3',

        sidebarHoverLink: '#232A4A',
        sidebarActive: '#11162A',
        sidebarBorder: 'rgba(11, 0, 80, 0.5)',
        //theme switch
        gradientFrom: '#161C33',
        gradientTo: '#183BC4',
        themeSwitchBorder: '#2C345A',
        thumb: 'rgba(11, 0, 80, 0.2)',
      },
      }),
  ],
}
