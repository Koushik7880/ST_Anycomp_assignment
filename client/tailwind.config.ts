// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Proxima Nova"', '"Red Hat Display"', "system-ui", "sans-serif"],
    },
    colors: {
      textMain: "#222222",
    },
  },
  plugins: [],
} satisfies Config;
