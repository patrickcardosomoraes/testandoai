/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // caso use /app
  ],
  theme: {
    extend: {
      colors: {
        azulTestando: '#2F6BB0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.azulTestando'),
              '&:hover': {
                color: theme('colors.azulTestando'),
                textDecoration: 'underline',
              },
            },
            h1: { color: theme('colors.azulTestando') },
            h2: { color: theme('colors.azulTestando') },
            h3: { color: theme('colors.azulTestando') },
            strong: { color: theme('colors.gray.800') },
            blockquote: {
              borderLeftColor: theme('colors.azulTestando'),
              color: theme('colors.gray.600'),
              fontStyle: 'italic',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}