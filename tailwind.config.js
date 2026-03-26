/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        term: {
          bg: "#050505",
          panel: "#101012",
          prim: "#00ff41",
          acc: "#00d4ff",
          text: "#e5e7eb",
          mut: "#71717a",
          warn: "#f59e0b",
          err: "#fb7185",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "monospace"],
      },
      boxShadow: {
        glow: "0 0 16px rgba(0,255,65,0.22)",
      },
    },
  },
  plugins: [],
};
