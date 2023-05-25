import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app';
import LoginComponent from './LoginComponent'
import Home from '../Home/Home'

import { auth} from '../../FirebaseConfig'

import { useNavigate } from 'react-router-dom';


function SignIn() {

  const [user, setUser] = useState(null);
  
const history = useNavigate();

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user);
        history('/', { state: user  } )
      }
    })

    return unsubscribe
  }, [user])

  console.log(user);

    return (
      <div className="SignIn">
        {user ? <Home user={user}/> : <LoginComponent/>}
      </div>
    );
  }
  
  export default SignIn



  