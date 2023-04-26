import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app';
import LoginComponent from './LoginComponent'
import Home from '../Home/Home'


function SignIn() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  console.log(user);

    return (
      <div className="SignIn">
        {user ? <Home user={user}/> : <LoginComponent/>}
      </div>
    );
  }
  
  export default SignIn



  