import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
      '$ts': 'src/ts/',
			'$utils': 'src/utils/',
			'$components': 'src/lib/components/',
			'$icons':'src/lib/icons'
    },
		adapter: adapter()
	},
};

export default config;
