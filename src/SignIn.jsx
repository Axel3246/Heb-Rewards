import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app';
import { database, auth, signInWithGoogle } from './FirebaseConfig'
import SignInComponent from './SignInComponent'
import Home from './Home'

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
        {user ? <Home user={user}/> : <SignInComponent/>}
      </div>
    );
  }
  
  export default SignIn



  