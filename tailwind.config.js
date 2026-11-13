/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#070B14',
          surface: '#0B1220',
          card: '#0F182A',
          cardHover: '#14223C',
          border: '#1E2D4A',
          borderGlow: '#00D8F6',
          primary: '#00F0FF',
          blue: '#2563EB',
          accent: '#38BDF8',
          emerald: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
          purple: '#8B5CF6',
          muted: '#94A3B8',
          text: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.25)',
        'glow-blue': '0 0 20px -3px rgba(37, 99, 235, 0.3)',
        'glow-danger': '0 0 20px -3px rgba(239, 68, 68, 0.3)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.3)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scan 8s linear infinite',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}

