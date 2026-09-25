import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F0',
        sand: '#F4EFEB',
        white: '#FFFFFF',
        sage: {
          DEFAULT: '#A8BFA3',
          light: '#EBF1EA',
          border: '#D3DFCF',
          dark: '#87A082',
        },
        olive: {
          DEFAULT: '#384238',
          hover: '#2A332A',
          muted: '#6C776B',
          light: '#8E9A8D',
        },
        peach: {
          DEFAULT: '#E8B7A5',
          light: '#FAF1ED',
          border: '#E8C7BC',
          dark: '#D99882',
        },
        green: {
          DEFAULT: '#8DB596',
        },
        red: {
          DEFAULT: '#C97373',
          light: '#FBF2F2',
        },
        border: {
          subtle: '#E8E2D6',
          DEFAULT: '#DDD6C9',
          focus: '#384238',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        control: '9px',
        card: '16px',
        panel: '20px',
      },
      boxShadow: {
        subtle: '0 2px 12px -2px rgba(56, 66, 56, 0.04)',
        hover: '0 6px 20px -4px rgba(56, 66, 56, 0.07)',
      },
    },
  },
  plugins: [],
};

export default config;
