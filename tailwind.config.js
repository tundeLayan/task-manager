/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2DC86D',
        secondary: '#00963D',
        accent: '#161616',
        tertiary: '#252525',
        tertiary2: '#212121',
        title: '#6A6A6A',
      },
    },
  },
  plugins: [],
};
