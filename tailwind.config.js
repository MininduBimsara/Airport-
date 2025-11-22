/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // SriLankan Airlines Inspired Sky-Blue Theme
        primary: "#2a658a",      // Navy Blue - Main CTAs
        secondary: "#518494",    // Cyan - Secondary actions
        accent: "#4d8e7b",       // Teal - Highlights
        success: "#04a51b",      // Green - Success states
        warning: "#ef6c1a",      // Orange - Warnings
        sky: "#87CEEB",          // Sky Blue - Backgrounds
        "sky-light": "#E0F4FF",  // Light Blue - Soft backgrounds
        "sky-dark": "#4A90B8",   // Dark Sky Blue - Gradients
      },
    },
  },
  plugins: [],
};
