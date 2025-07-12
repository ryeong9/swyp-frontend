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
        // primary color
        primary: '#9BC99F',
        primaryDark: '#6FA974',
        secondary: '#D2DEF4',
        bgColor: '#F9F7F0',

        // state color
        error: '#F56767',
        success: '#9BC99F', // primary랑 동일
        disabled: '#D9D9D9',

        inputBgWhite: '#FCFCFC',
        sub: '#FFF9F1',

        // gray system
        gray: {
          900: '#2A2A2A',
          700: '#6B6B6B',
          500: '#A0A0A0',
          300: '#D9D9D9',
          200: '#F0F0F0',
        },
      },
    },
  },
  plugins: [],
};
