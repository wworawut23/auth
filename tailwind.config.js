module.exports = {
  content: [
    './pages//*.{js,ts,jsx,tsx}',
    './components//*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edf9f7',
          100: '#caede7',
          300: '#93dbcf',
          500: '#34c5b2',
          700: '#388a7c',
          900: '#183b35',
        },
        secondary: {
          50: '#f7f9ff',
          100: '#d1d7e7',
          300: '#6878ab',
          500: '#2b3674',
          700: '#232c62',
          900: '#21284f',
        },
        error: {
          300: '#ff4d4f',
          500: '#f5222d',
          900: '#a8071a',
        },
        link: {
          300: '#7dbffc',
          500: '#1890ff',
          900: '#0072db',
        },
        success: {
          300: '#d9f7be',
          500: '#52c41a',
          900: '#237804',
        },
        warning: {
          300: '#ffd666',
          500: '#faad14',
          900: '#ad6800',
        },
      },
    },
    boxShadow: {
      base: '0px 4px 5px rgba(104, 120, 171, 0.14), 0px 1px 10px rgba(104, 120, 171, 0.12)',
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar-hide'),
  ],
};