import { shadcnPlugin } from "./lib/shadcn-plugin";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	theme: {
		extend: {
			keyframes: {
				slide_in: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				slide_out: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-100%)" },
				},
			},
		},
	},
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	plugins: [shadcnPlugin],
};

export default config;
