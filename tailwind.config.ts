import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-syne)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        bg: '#0a0a0f',
        surface: {
          1: '#111118',
          2: '#16161f',
          3: '#1c1c28',
        },
        border: {
          1: 'rgba(255,255,255,0.06)',
          2: 'rgba(255,255,255,0.11)',
          3: 'rgba(255,255,255,0.18)',
        },
        accent: {
          blue: '#4f7dff',
          purple: '#9b6fff',
          cyan: '#0dd9c4',
          pink: '#ff4f9b',
          green: '#4ade80',
        },
      },
      backgroundImage: {
        'gradient-blue-purple': 'linear-gradient(135deg, #4f7dff, #9b6fff)',
        'gradient-text': 'linear-gradient(90deg, #4f7dff, #9b6fff)',
      },
      animation: {
        'bounce-dot': 'bounceDot 0.9s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        bounceDot: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-5px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
