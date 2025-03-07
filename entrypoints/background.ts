export default defineBackground(() => {
	const urls = [
		'https://chatgpt.com/*',
		'https://claude.ai/*',
		'https://grok.com/*',
	]

	browser.runtime.onInstalled.addListener(() => {
		browser.declarativeNetRequest.updateDynamicRules({
			addRules: urls.map((url, index) => ({
				id: index + 1,
				priority: 1,
				action: {
					type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
					responseHeaders: [
						{
							header: 'content-security-policy',
							operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
						},
						{
							header: 'x-frame-options',
							operation: chrome.declarativeNetRequest.HeaderOperation.REMOVE,
						},
					],
				},
				condition: {
					urlFilter: url,
					resourceTypes: [
						chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
						chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
					],
				},
			})),
			removeRuleIds: urls.map((_, index) => index + 1),
		})
	})
})
