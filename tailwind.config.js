/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ─── BRAND PALETTE ───────────────────────────────────────────────────
      // Taken from the live texas180dc.org. Change a hex here and it updates
      // everywhere on the site.
      colors: {
        leaf: {
          DEFAULT: "#8DC63F", // 180DC brand green — buttons, accents, links
          dark: "#76A833", // hover state
          light: "#A8D65F",
        },
        ink: "#141414", // near-black, dark section backgrounds
        slate: "#2A2A2A", // slightly lifted dark, for cards on ink
        paper: "#FFFFFF",
        fog: "#F5F5F7", // Apple-style light grey section background
        graphite: "#6E6E73", // secondary body text
        hairline: "#D8D8DC", // 1px rules and borders
      },
      fontFamily: {
        // System font stack — renders as SF Pro on Apple devices and Segoe UI
        // on Windows. No web font download, so nothing to fetch at build time.
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em", // Apple-style tight display headings
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      transitionTimingFunction: {
        // Apple's signature easing curve
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
