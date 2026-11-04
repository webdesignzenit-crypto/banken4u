import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tanne: { DEFAULT: "#0E2B28", 2: "#16403B", 3: "#1F5550" },
        papier: { DEFAULT: "#F3EEE4", 2: "#E9E2D3" },
        messing: { DEFAULT: "#BF9A5E", tief: "#7B5B2A" },
        tinte: "#13201E",
        grau: "#56635F",
      },
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      borderRadius: { none: "0", DEFAULT: "0" },
    },
  },
  plugins: [],
};
export default config;
