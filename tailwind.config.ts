import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        uta: {
          navy: {
            950: "#060a17",
            900: "#0b132b",
            800: "#1c2541",
            700: "#3a506b",
            600: "#4f6d7a",
            100: "#e0e7ff",
          },
          gold: {
            50: "#fffbeb",
            100: "#fef3c7",
            200: "#fde68a",
            300: "#fcd34d",
            400: "#fbbf24",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
            800: "#92400e",
          },
          crimson: {
            50: "#fff1f2",
            100: "#ffe4e6",
            500: "#e11d48",
            600: "#be123c",
            700: "#9f1239",
            800: "#881337",
          },
          emerald: {
            50: "#ecfdf5",
            100: "#d1fae5",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
          },
          saffron: {
            500: "#ff6f00",
            600: "#e65100",
          },
          mountain: {
            100: "#f1f5f9",
            200: "#e2e8f0",
            500: "#64748b",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
          }
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        telugu: ["var(--font-telugu)", "Gautami", "Vani", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
