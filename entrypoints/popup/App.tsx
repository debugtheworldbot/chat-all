import './App.css'

function App() {
	return (
		<>
			<h1>WXT + React</h1>
			<div className='card'>
				<button
					onClick={() => {
						chrome.tabs.create({ url: chrome.runtime.getURL('home.html') })
					}}
				>
					home
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the WXT and React logos to learn more
			</p>
		</>
	)
}

export default App
