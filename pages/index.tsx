import React, { FunctionComponent } from 'react'
	import Example from './Example'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'


const App: FunctionComponent = () => {
	return (
		<div className="App">
			<DndProvider backend={HTML5Backend}>
				<Example />
			</DndProvider>
		</div>
	)
}

export default App;