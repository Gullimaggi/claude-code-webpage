import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pine: { 950: '#0B1B17', 900: '#112A23', 800: '#1A3A32', 700: '#234E43' },
        'amber-warm': '#D97706',
        'amber-light': '#F59E0B',
        'fog-slate': '#F8FAFC',
        'border-soft': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
} satisfies Config;
