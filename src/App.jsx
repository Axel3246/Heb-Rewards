import React, { useState } from 'react'
import ReactDOM from "react-dom/client"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import koop from './img/repo/logokoop2.png'
import heb from './img/landing/heb.png'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Home from './Home'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'



export default function App() {
  const [count, setCount] = useState(0)
  return (
<<<<<<< Updated upstream
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
    </div>
  )
}
=======
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>}></Route>
          <Route path="/SignIn" element={<SignIn/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </Router> 
    );
>>>>>>> Stashed changes

  }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);