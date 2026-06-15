/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1916',
        'ink-deep': '#100F0C',
        cream: '#EAE3D1',
        'cream-dim': '#BBB3A0',
        taupe: '#807A6C',
        line: 'rgba(234, 227, 209, 0.12)',
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        widelabel: '0.18em',
      },
    },
  },
  plugins: [],
}
