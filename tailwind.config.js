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
        primary: '#9BC99F',
        secondary: '#D2DEF4',
        sub: '#FFF9F1',
      },
    },
  },
  plugins: [],
};
