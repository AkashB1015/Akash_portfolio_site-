/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables HTML class-based theme switching
  theme: {
    extend: {
      colors: {
        base: {
          950: 'rgb(var(--color-base-950) / <alpha-value>)',
          900: 'rgb(var(--color-base-900) / <alpha-value>)',
          800: 'rgb(var(--color-base-800) / <alpha-value>)',
        },
        line: 'rgb(var(--color-line) / <alpha-value>)',
        ink: {
          100: 'rgb(var(--color-ink-100) / <alpha-value>)',
          400: 'rgb(var(--color-ink-400) / <alpha-value>)',
        },
        accent: {
          ember: 'rgb(var(--color-accent-ember) / <alpha-value>)',
          gold: 'rgb(var(--color-accent-gold) / <alpha-value>)',
          teal: 'rgb(var(--color-accent-teal) / <alpha-value>)',
          blue: '#3B82F6',
          cyan: '#38BDF8',
          purple: '#8B5CF6',
        },
        // Chatbot theme tokens
        'bg-base': '#080810',
        'panel': '#0F1420',
        'panel-border': '#1E2433',
        'accent-blue': '#3B82F6',
        'accent-cyan': '#38BDF8',
        'accent-purple': '#8B5CF6',
        'text-muted': '#9CA3AF',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59,130,246,0.35)',
      },
      fontFamily: {
        display: ['Outfit', 'Clash Display', 'General Sans', 'sans-serif'],
        body: ['Inter', 'Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'scroll-marquee': 'marquee 25s linear infinite',
        'shine-sweep': 'shine 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '20%': { left: '100%' },
          '100%': { left: '100%' },
        }
      }
    },
  },
  plugins: [],
}
