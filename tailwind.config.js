
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a365d', // Deep Blue - Trust
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#f59e0b', // Amber - Progress
          foreground: '#1e293b',
        },
        success: {
          DEFAULT: '#059669', // Emerald - Completion
        },
        accent: {
          DEFAULT: '#7c3aed', // Violet - Intelligence
        },
        slate: {
          50: '#f8fafc',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
        '96': '96px',
      },
    },
  },
  plugins: [],
}
