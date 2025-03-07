export default defineBackground(() => {
	browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
		if (changeInfo.status === 'complete') {
			browser.tabs.sendMessage(tabId, { action: 'onLoadComplete' })
			console.log('load complete')
		}
	})
	browser.runtime.onMessage.addListener((message) => {
		if (message.action === 'openPopup') {
			browser.action.openPopup()
		}
	})
	browser.declarativeNetRequest.updateDynamicRules({
		removeRuleIds: [1],
		addRules: [
			{
				id: 1,
				priority: 1,
				action: {
					type: 'modifyHeaders',
					requestHeaders: [
						{
							header: 'Referer',
							operation: 'set',
							value: 'https://chatgpt.com',
						},
						{ header: 'content-security-policy', operation: 'remove' },
						{
							header: 'referrer-policy',
							operation: 'remove',
						},
						{ header: 'X-Frame-Options', operation: 'remove' },
						{ header: 'Content-Security-Policy', operation: 'remove' },
						{ header: 'Frame-Options', operation: 'remove' },
					],
				},
				condition: {
					urlFilter: 'https://chatgpt.com/',
					resourceTypes: [
						'main_frame',
						'sub_frame',
						'xmlhttprequest',
						'websocket',
					],
				},
			},

			{
				id: 2,
				priority: 2,
				action: {
					type: 'modifyHeaders',
					requestHeaders: [
						{ header: 'Sec-Fetch-Dest', operation: 'set', value: 'document' },
						{ header: 'Sec-Fetch-Mode', operation: 'set', value: 'navigate' },
						{ header: 'Sec-Fetch-Site', operation: 'set', value: 'none' },
						{ header: 'Sec-Fetch-User', operation: 'set', value: '?1' },
					],
				},
				condition: {
					urlFilter: '*://chat.openai.com/*',
					resourceTypes: ['main_frame', 'sub_frame'],
				},
			},
		],
	})
})
