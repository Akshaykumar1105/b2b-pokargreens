
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Pokar Greens custom colors
				"harvest-green": {
					50: "#f2f9ed",
					100: "#e2f1d9",
					200: "#c5e3b6",
					300: "#a2d189",
					400: "#81bd60",
					500: "#4CAF50", // primary green
					600: "#4a8e41",
					700: "#3b6e35",
					800: "#32582e",
					900: "#2a4a28",
					950: "#15291a",
				},
				"harvest-yellow": {
					50: "#fefbea",
					100: "#fcf6c8",
					200: "#f9eb8d",
					300: "#f7dc51",
					400: "#f5ce23",
					500: "#FFC107", // primary yellow
					600: "#d29600",
					700: "#a46e05",
					800: "#87560b",
					900: "#72470d",
					950: "#432504",
				},
				"harvest-orange": {
					50: "#fff7ed",
					100: "#ffecd3",
					200: "#fdd7a7",
					300: "#fbbc71",
					400: "#f89638",
					500: "#FF9800", // primary orange
					600: "#e06910",
					700: "#ba4e0d",
					800: "#973d11",
					900: "#7c3412",
					950: "#431805",
				},
				"harvest-light": "#f8f9fa",
				"harvest-dark": "#1a2e05",
				"harvest-accent": "#8BC34A", // lighter green accent
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				"slide-in-right": {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				"slide-out-right": {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				"fade-in": {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				"scale-in": {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"slide-in-right": "slide-in-right 0.3s ease-out",
				"slide-out-right": "slide-out-right 0.3s ease-out",
				"fade-in": "fade-in 0.4s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
			},
			fontFamily: {
				'sans': ['Inter', 'sans-serif'],
				'display': ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
