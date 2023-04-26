import { useState } from 'react'
import {Home, Login} from './pages'
import { Button, Alert, Stack } from '@mui/material'
import Lista from './pages/Lista/AppLista'



function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Home/> */}
      <Lista/>
    </div>
  )
}

export default App
