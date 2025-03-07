import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
	extensionApi: 'chrome',
	modules: ['@wxt-dev/module-react'],
	manifest: {
		permissions: ['declarativeNetRequest', 'webRequest'],
		host_permissions: ['https://chatgpt.com/*', 'https://claude.ai/*', 'https://grok.com/*'],
	},
})
