import React, { useState } from 'react'
import ReactDOM from "react-dom/client"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import koop from './img/repo/logokoop2.png'
import heb from './img/landing/heb.png'
import SignIn from './SignIn'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import { Button, Alert, Stack } from '@mui/material'
import { database, auth, signInWithGoogle } from './FirebaseConfig'
import GoogleButton from 'react-google-button'



function Home({user}) {
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
        <h1>Koopas + HEB</h1>
        <a href=""><Button variant='contained'> BRANDON SI ESTO JALA PICAME</Button></a>
        <Stack sx={{ width: '100%'}} spacing={2}>
        <Alert severity="error" sx={{mt: 2}}>This is an error alert — check it out!</Alert>
        <Alert severity="warning">This is a warning alert — check it out!</Alert>
        <Alert severity="info">This is an info alert — check it out!</Alert>
        <Alert severity="success">This is a success alert — check it out!</Alert>
      </Stack>

      <h1>Hello, <span></span>{user.displayName}</h1>
      <img src={user.photoURL} alt="" />
      <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
      </div>
    )
  }
  
  export default Home
  