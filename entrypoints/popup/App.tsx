import './App.css'

function App() {
	return (
		<>
			<h1>ChatGPT, Claude, Grok all in one</h1>
			<div className='card'>
				<button
					onClick={() => {
						chrome.tabs.create({ url: chrome.runtime.getURL('home.html') })
					}}
				>
					OPEN
				</button>
			</div>
		</>
	)
}

export default App
