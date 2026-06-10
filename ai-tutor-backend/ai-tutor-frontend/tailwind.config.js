/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        academic: {
          blue: "#1e40af",    // Deep royal blue for headers & primary branding
          sky: "#f0f4ff",     // Soft, clean blue-tinted background for sidebars
          yellow: "#fbc02d",  // Vibrant gold/yellow for premium triggers & locks
          darkText: "#1e293b" // Crisp dark charcoal for high-contrast reading
        }
      }
    },
  },
  plugins: [],
};