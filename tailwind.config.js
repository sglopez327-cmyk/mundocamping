/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './iluminacion/**/*.html',
    './js/**/*.js',
    './partials/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        premium: { accent: '#deff9a', night: '#020403' },
      },
      boxShadow: {
        glass: '0 12px 40px rgba(0, 0, 0, 0.35)',
        'glass-lg': '0 20px 50px rgba(0, 0, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
