/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
        serif: ['Gowun Batang', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#9BC99F',
          dark: '#6CA973',
          light: '#CDE5CD',
          lightblue: '#EEF2FA',
          verylight: '#E6F2E6',
        },
        secondary: '#D2DEF4',
        background: {
          DEFAULT: '#F9F7F0',
          input: '#FFFFFF',
          sub: '#FFF9F1',
        },
        state: {
          error: '#F56767',
          success: '#9BC99F',
          disabled: '#D9D9D9',
        },
        gray: {
          900: '#2A2A2A',
          700: '#6B6B6B',
          500: '#A0A0A0',
          300: '#D9D9D9',
          200: '#F0F0F0',
          100: '#fafafa',
        },
      },
    },
  },
  plugins: [],
};
