import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import StepCreator from './components/step_creator'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <StepCreator />
        </div>
    )
}

export default App
