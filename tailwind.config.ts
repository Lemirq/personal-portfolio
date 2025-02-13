import type { Config } from 'tailwindcss';
const svgToDataUri = require('mini-svg-data-uri');

const colors = require('tailwindcss/colors');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

const config: Config = {
	content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			rotate: {
				'x-0': '0deg',
				'x-1': '15deg',
				'x-2': '30deg',
				'x-3': '45deg',
				'x-4': '60deg',
				'x-5': '75deg',
				'x-6': '90deg',
			},
			fontFamily: {
				// dm sans
				dm: ['DM_Sans', 'sans-serif'],
			},
			animation: {
				spotlight: 'spotlight 2s ease .75s 1 forwards',
				shimmer: 'shimmer 2s linear infinite',
			},
			keyframes: {
				shimmer: {
					from: {
						backgroundPosition: '0 0',
					},
					to: {
						backgroundPosition: '-200% 0',
					},
				},
				spotlight: {
					'0%': {
						opacity: '0',
						transform: 'translate(-72%, -62%) scale(0.5)',
					},
					'100%': {
						opacity: '1',
						transform: 'translate(-50%,-40%) scale(1)',
					},
				},
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [
		addVariablesForColors,
		function ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) {
			matchUtilities(
				{
					'bg-grid': (value: string) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					'bg-grid-small': (value: string) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
						)}")`,
					}),
					'bg-dot': (value: string) => ({
						backgroundImage: `url("${svgToDataUri(
							`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
						)}")`,
					}),
				},
				{ values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
			);
		},
	],
};

function addVariablesForColors({ addBase, theme }: { addBase: (styles: Record<string, any>) => void; theme: (path: string) => any }) {
	let allColors = flattenColorPalette(theme('colors'));
	let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

	addBase({
		':root': newVars,
	});
}

export default config;
