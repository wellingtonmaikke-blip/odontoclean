import type { Config } from "tailwindcss";

// Paleta de cores da marca Método Fluxo.
// Edite aqui para alterar a identidade visual em todo o sistema.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          white: "#FFFFFF",
          lightBlue: "#E0F2FE",
          darkBlue: "#0F766E",
          darkBlueDark: "#0B5B54",
          mint: "#34D399",
          mintDark: "#10B981",
          gray: {
            50: "#F9FAFB",
            100: "#F3F4F6",
            200: "#E5E7EB",
            300: "#D1D5DB",
            600: "#4B5563",
            700: "#374151",
            900: "#111827",
          },
          gold: "#D4AF37",
          silver: "#9CA3AF",
          bronze: "#B08D57",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        premium: "0 10px 40px -10px rgba(15, 118, 110, 0.25)",
        card: "0 4px 20px rgba(17, 24, 39, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
