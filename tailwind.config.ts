import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta reaproveitada da landing page (app/page.tsx) pro admin ficar
        // visualmente consistente com a loja.
        brand: {
          cream: "#f3efe3",
          darker: "#0a0d0a",
          dark: "#10150f",
          forest: "#1f2b23",
          forestLight: "#2c4a37",
          green: "#4caf6d",
          greenLight: "#5fc47f",
          sage: "#8ea395",
          sageDark: "#5f7767",
        },
      },
    },
  },
  plugins: [],
};

export default config;
