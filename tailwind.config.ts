import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}",
    // "./styles/**/*.{css}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "dark",
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
