/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        sans: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "Apple Color Emoji", "Segoe UI Emoji"],
      },
      colors: {
        board: {
          bg: "#0b0f14",
          panel: "#0f1620",
          panel2: "#111b26",
          line: "#213244",
          glow: "#7dd3fc"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35)",
      }
    },
  },
  plugins: [],
};
