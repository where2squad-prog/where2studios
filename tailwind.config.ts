import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: 'calc(var(--spacing) * 4)',
      screens: {
        sm: '40rem',
        md: '48rem', 
        lg: '64rem',
        xl: '80rem',
        '2xl': '96rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Fredoka', 'Inter', 'sans-serif'],
        fredoka: ['Fredoka', 'sans-serif'],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // M3 Color System
        'm3-primary': "hsl(var(--m3-primary))",
        'm3-on-primary': "hsl(var(--m3-on-primary))",
        'm3-secondary': "hsl(var(--m3-secondary))",
        'm3-on-secondary': "hsl(var(--m3-on-secondary))",
        'm3-background': "hsl(var(--m3-background))",
        'm3-on-background': "hsl(var(--m3-on-background))",
        'm3-surface': "hsl(var(--m3-surface))",
        'm3-surface-variant': "hsl(var(--m3-surface-variant))",
        'm3-on-surface': "hsl(var(--m3-on-surface))",
        'm3-surface-dark': "hsl(var(--m3-surface-dark))",
        'm3-on-dark': "hsl(var(--m3-on-dark))",
        'm3-outline': "hsl(var(--m3-outline))",
        
        // Semantic colors
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        
        // Legacy brand colors (for compatibility)
        'brick-red': "var(--brick-red)",
        'golden-yellow': "var(--golden-yellow)",
        'near-black': "var(--near-black)",
        'cream-highlight': "var(--cream-highlight)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        full: "9999px",
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "fade-in": "fade-in 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
