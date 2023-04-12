import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import koop from './img/repo/logokoop2.png'
import heb from './img/landing/heb.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://github.com/Axel3246/HebRew" target="_blank">
          <img src={koop} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={heb} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Koopas + React</h1>
    </div>
  )
}

export default App
