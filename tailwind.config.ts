import type { Config } from "tailwindcss";

const withAlpha = (variable: string) => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: withAlpha("--color-dark-rgb"),
        brand: {
          50: withAlpha("--color-brand-50-rgb"),
          100: withAlpha("--color-brand-100-rgb"),
          200: withAlpha("--color-brand-200-rgb"),
          300: withAlpha("--color-brand-300-rgb"),
          400: withAlpha("--color-brand-400-rgb"),
          500: withAlpha("--color-brand-500-rgb"),
          600: withAlpha("--color-brand-600-rgb"),
          700: withAlpha("--color-brand-700-rgb"),
          800: withAlpha("--color-brand-800-rgb"),
          900: withAlpha("--color-brand-900-rgb"),
          950: withAlpha("--color-brand-950-rgb"),
        },
        primary: {
          DEFAULT: withAlpha("--color-dark-rgb"),
          foreground: withAlpha("--color-light-rgb"),
        },
        secondary: {
          DEFAULT: withAlpha("--color-brand-500-rgb"),
          foreground: withAlpha("--color-dark-rgb"),
        },
        zinc: {
          50: withAlpha("--color-neutral-50-rgb"),
          100: withAlpha("--color-neutral-100-rgb"),
          200: withAlpha("--color-neutral-200-rgb"),
          300: withAlpha("--color-neutral-300-rgb"),
          400: withAlpha("--color-neutral-400-rgb"),
          500: withAlpha("--color-neutral-500-rgb"),
          600: withAlpha("--color-neutral-600-rgb"),
          700: withAlpha("--color-neutral-700-rgb"),
          800: withAlpha("--color-neutral-800-rgb"),
          900: withAlpha("--color-neutral-900-rgb"),
          950: withAlpha("--color-neutral-950-rgb"),
        },
        neutral: {
          0: withAlpha("--color-neutral-0-rgb"),
          50: withAlpha("--color-neutral-50-rgb"),
          100: withAlpha("--color-neutral-100-rgb"),
          200: withAlpha("--color-neutral-200-rgb"),
          300: withAlpha("--color-neutral-300-rgb"),
          400: withAlpha("--color-neutral-400-rgb"),
          500: withAlpha("--color-neutral-500-rgb"),
          600: withAlpha("--color-neutral-600-rgb"),
          700: withAlpha("--color-neutral-700-rgb"),
          800: withAlpha("--color-neutral-800-rgb"),
          900: withAlpha("--color-neutral-900-rgb"),
          950: withAlpha("--color-neutral-950-rgb"),
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
        soft: "0 8px 24px rgba(13,29,48,0.12)",
        card: "0 12px 32px rgba(13,29,48,0.16)",
        glass: "0 8px 30px rgba(13,29,48,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
