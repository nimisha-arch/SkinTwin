import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F0',
        white: '#FFFFFF',
        sage: {
          DEFAULT: '#A8BFA3',
          light: '#C7D7C3',
          dark: '#8DA687',
        },
        olive: {
          DEFAULT: '#384238',
          hover: '#2A322A',
          muted: '#5A675A',
        },
        peach: {
          DEFAULT: '#E8B7A5',
          light: '#F4D4C8',
          dark: '#D99C88',
        },
        green: {
          DEFAULT: '#8DB596',
        },
        yellow: {
          DEFAULT: '#E2C66D',
        },
        red: {
          DEFAULT: '#D88B8B',
          light: '#F8E8E8',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
