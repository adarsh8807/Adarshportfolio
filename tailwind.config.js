/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#020403',
          raised: '#081209',
          card: '#0b1810',
        },
        ink: {
          DEFAULT: '#eafff2',
          muted: '#8fae9b',
          dim: '#4d6b57',
        },
        accent: {
          blue: '#22ff8c',
          violet: '#00b374',
          cyan: '#7dffb3',
        },
        line: 'rgba(57,255,140,0.12)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'glow-gradient': 'linear-gradient(135deg, #22ff8c 0%, #00b374 100%)',
        'glow-radial': 'radial-gradient(circle at center, rgba(34,255,140,0.25), transparent 70%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(34,255,140,0.25)',
        'glow-violet': '0 0 40px rgba(0,179,116,0.25)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        blink: 'blink 1s step-start infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        blink: {
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
