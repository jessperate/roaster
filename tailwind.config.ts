import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Helvetica Neue", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      colors: {
        ao: {
          "near-black": "#000d05",
          forest: "#002910",
          "mid-green": "#008c44",
          interaction: "#00ff64",
          "super-light": "#CCFFE0",
          "green-100": "#dfeae3",
          "off-white": "#F8FFFA",
          white: "#ffffff",
          "label-yellow": "#EEFF8C",
          stroke: "#d4e8da",
          "text-primary": "#09090b",
          "text-secondary": "#676c79",
          "text-tertiary": "#a5aab6",
        },
      },
    },
  },
  plugins: [],
};
export default config;
