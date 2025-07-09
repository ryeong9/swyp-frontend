// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["'Pretendard'", 'sans-serif'],
      heading: ["'Archivo Black'", 'sans-serif'],
    },
    colors: {
      primary: '#1e40af', // 예: 파란색 계열
      secondary: '#f43f5e', // 예: 핑크 계열
      'bg-main': '#fefce8', // 밝은 배경색
    },
  },
};
export const plugins = [];
