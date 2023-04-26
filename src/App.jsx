
import React, { useState } from 'react'
import ReactDOM from "react-dom/client"
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Log from './pages/Login/Login'
import Lista from './pages/Lista/AppLista'
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
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<Log/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/lista" element={<Lista/>}></Route>
        </Routes>
      </Router> 
    );

  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);