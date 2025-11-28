import type { Config } from "tailwindcss";

const config: Config = {
  // Add an empty string as the second element to satisfy TypeScript
  darkMode: ["class", ""], 
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // token colors mapped to Tailwind
        background: "var(--background)",
        foreground: "var(--foreground)",

        primary: "#030213",
        "primary-foreground": "oklch(1 0 0)",

        secondary: "oklch(0.95 0.0058 264.53)",
        "secondary-foreground": "#030213",

        muted: "#ececf0",
        "muted-foreground": "#717182",

        accent: "#e9ebef",
        "accent-foreground": "#030213",

        destructive: "#d4183d",
        "destructive-foreground": "#ffffff",

        border: "rgba(0,0,0,0.1)",
        input: "transparent",

        ring: "oklch(0.708 0 0)",

        sidebar: "oklch(0.985 0 0)",
        "sidebar-foreground": "oklch(0.145 0 0)",
        "sidebar-primary": "#030213",
        "sidebar-primary-foreground": "oklch(0.985 0 0)",
        "sidebar-accent": "oklch(0.97 0 0)",
        "sidebar-accent-foreground": "oklch(0.205 0 0)",
        "sidebar-border": "oklch(0.922 0 0)",
        "sidebar-ring": "oklch(0.708 0 0)",
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
