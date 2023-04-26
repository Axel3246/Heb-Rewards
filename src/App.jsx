import { useState } from 'react'
import {Home, Login} from './pages'
import { Button, Alert, Stack } from '@mui/material'


function App() {
  const [count, setCount] = useState(0)

  return (
    /*<div className="App">
      <Home/>
      {/*<Login/>*///}
    /*</div>*/
    <Home/>
  )
}

export default App
