import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // mirrors the CSS custom properties in src/index.css
        brand: '#000f9d',
        'brand-dark': '#000a73',
        beige: '#f2e9db',
        'beige-2': '#f8f3ea',
        ink: '#15151c',
        body: '#3b3b46',
        muted: '#63636f',
      },
      fontFamily: {
        serif: ['Tinos', 'Georgia', 'serif'],
        sans: ['Figtree', 'Commissioner', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: { wrap: '1220px' },
    },
    screens: {
      sm: '640px',
      md: '768px',
      // custom breakpoint: full nav appears >=901px, hamburger <=900px
      nav: '901px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
} satisfies Config
