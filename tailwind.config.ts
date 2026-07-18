import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Editorial cream register: Playfair Display carries every heading,
        // Work Sans carries body/UI. Distinct from the black/yellow IBM Plex system.
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Work Sans"', 'sans-serif'],
      },
      colors: {
        cream: 'oklch(97% 0.01 75)',
        creamHi: 'oklch(99% 0.005 75)',
        creamDim: 'oklch(96% 0.035 95)',
        accent: '#FFD400',
        ink: '#000000',
      },
    },
  },
  plugins: [],
} satisfies Config
