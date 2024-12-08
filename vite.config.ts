import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import { visualizer } from 'rollup-plugin-visualizer';
// import removeConsole from 'vite-plugin-remove-console';

export default defineConfig({
	plugins: [
		sveltekit()
		// removeConsole()
		// visualizer({
		// 	emitFile: true,
		// 	filename: 'stats.html'
		// })
	],
	server: {
		port: process.env.PORT || 3000
	},
	ssr: {
		noExternal: ['@yaireo/tagify']
	},
	resolve: {
		alias: {
			'.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js'
		}
	},

	optimizeDeps: { exclude: ['@node-rs'] }
});
