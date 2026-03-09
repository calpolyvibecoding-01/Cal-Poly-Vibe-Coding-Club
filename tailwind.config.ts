import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f7f8",
          100: "#e4edf0",
          200: "#c9d9dc",
          300: "#adc5ca",
          400: "#90b0b8",
          500: "#71999e",
          600: "#5d8087",
          700: "#49686f",
          800: "#355057",
          900: "#194148",
          950: "#102c31",
        },
        primary: {
          DEFAULT: "#194148",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#71999e",
          foreground: "#102c31",
        },
        zinc: {
          50: "#f3f7f8",
          100: "#e4edf0",
          200: "#c9d9dc",
          300: "#adc5ca",
          400: "#90b0b8",
          500: "#71999e",
          600: "#5d8087",
          700: "#49686f",
          800: "#355057",
          900: "#194148",
          950: "#102c31",
        },
        neutral: {
          0: "#ffffff",
          50: "#f3f7f8",
          100: "#e4edf0",
          200: "#c9d9dc",
          300: "#adc5ca",
          400: "#90b0b8",
          500: "#71999e",
          600: "#5d8087",
          700: "#49686f",
          800: "#355057",
          900: "#194148",
          950: "#102c31",
        },
        success: "#22c55e",
        warning: "#f59e0b",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        sm: "0.375rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(25,65,72,0.12)",
        card: "0 12px 32px rgba(25,65,72,0.16)",
        glass: "0 8px 30px rgba(25,65,72,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
