// @ts-ignore
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        white: "#FFFFFF",
        dark_blue: "#05073C",
        orange: "#EB662B",
        light_orange: "#E2AD64",
        transparent_orange: "rgba(235, 102, 43, 0.15)",
        gray: "#717171",
        light_gray: "#E7E6E6",
        light_gray2: "#DDDDDD",
        light_green: "#63B06F",
        light_red: "#E24D4D",
      },
    },
  },
  plugins: [],
};
export default config;
