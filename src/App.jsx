import { useState } from 'react'
import {Home, Login, firebaseTest} from './pages'
import { Button, Alert, Stack } from '@mui/material'
import FirebaseTest from './pages/firebaseTest/FirebaseTest'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {/* <Home/> */}
      <FirebaseTest/>
    </div>
  )
}

export default App
