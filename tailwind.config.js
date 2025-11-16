/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#134686",      // Deep blue
        accent: "#ED3F27",       // Vibrant red
        highlight: "#FEB21A",    // Warm yellow
        cream: "#FDF4E3",        // Soft beige background
        ink: "#1a1a1a",          // Dark text
        sky: "#d7e3ff",
        sand: "#f8f7f4"
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 25px rgba(19, 70, 134, 0.08)',
        'lift': '0 20px 40px rgba(19, 70, 134, 0.15)',
        'glow-blue': '0 0 20px rgba(19, 70, 134, 0.3)',
        'glow-red': '0 0 20px rgba(237, 63, 39, 0.3)',
        'glow-yellow': '0 0 20px rgba(254, 178, 26, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
