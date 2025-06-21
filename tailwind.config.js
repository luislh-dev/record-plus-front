import { heroui } from '@heroui/react';

/** @type {import('tailwindcss').Config} */
export const content = [
  './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  './node_modules/@zeitui-org/**/*.{js,jsx,ts,tsx}',
  './src/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    fontFamily: {
      sans: ['RobotoVariable', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    },
  },
};
export const darkMode = 'class';
export const plugins = [heroui()];
