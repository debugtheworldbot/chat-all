export default defineBackground(() => {
	browser.runtime.onInstalled.addListener(() => {
		browser.declarativeNetRequest.updateDynamicRules({
			addRules: [
				{
					id: 1,
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
						urlFilter: 'https://**',
						resourceTypes: [
							chrome.declarativeNetRequest.ResourceType.MAIN_FRAME,
							chrome.declarativeNetRequest.ResourceType.SUB_FRAME,
						],
					},
				},
			],
			removeRuleIds: [1],
		})
	})
})
