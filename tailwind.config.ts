import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{tsx,ts}",
    "./src/components/**/*.{tsx,ts}",
    // "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['MesloLGS', 'Menlo', 'monospace'],
      },
    },
  },
  daisyui: {
    themes: [
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
