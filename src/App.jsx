import React, { useState } from 'react'
import ReactDOM from "react-dom/client"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import koop from './assets/img/repo/logokoop2.png'
import heb from './assets/img/landing/heb.png'
import SignUp from './SignUp'
import Home from './pages/Home/Home'
import Log from './pages/Login/Login'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  const [count, setCount] = useState(0)
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignUp/>}></Route>
          <Route path="/login" element={<Log/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
        </Routes>
      </Router> 
    );

  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);