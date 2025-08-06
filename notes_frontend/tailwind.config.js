module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#22d3ee",
        primary: "#2563eb",
        secondary: "#6b7280",
        background: "#ffffff",
        foreground: "#171717",
      },
    },
    fontFamily: {
      sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
      mono: ["var(--font-geist-mono)", "Menlo", "monospace"],
    },
  },
  plugins: [],
};
