const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  colors: {
    'custom-dark': 'rgb(11, 11, 11)',
    'danger': '#fca5a5',
    'success': '#86efac',
    'sky': '#7dd3fc'
  },
  theme: {

    container: {
      center: true,
      padding: "15px",
      
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px"
    },
    extend: {
      colors: {
        primary: '#1c1c22',
        accent: {
          DEFAULT: "#1976d2",
          hover: "#0991ff"
        },
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'],
        },
        customdark: 'rgb(11, 11, 11)',
        danger: '#fca5a5',
        success: '#86efac',
        sky: '#7dd3fc',
        clearsky: '#62ccfc55'
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), 
    addVariablesForColors,
  ],
};
 
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
