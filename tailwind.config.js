/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ocean': {
          50: '#EAEAEA',   // Light gray
          100: '#CBC5EA',  // Light purple/lavender
          400: '#73628A',  // Medium purple
          600: '#313D5A',  // Dark blue-gray
          800: '#183642',  // Very dark blue-gray
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};