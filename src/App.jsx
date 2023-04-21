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
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>}></Route>
          <Route path="/SignIn" element={<SignIn/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </Router> 
    );

  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);