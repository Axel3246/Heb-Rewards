// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXjxHpSkQdyOA1YiyDHrSvvDN73uQWsjI",
  authDomain: "koopasheb.firebaseapp.com",
  projectId: "koopasheb",
  storageBucket: "koopasheb.appspot.com",
  messagingSenderId: "639422265150",
  appId: "1:639422265150:web:91c14d6fa3283a15b45e6f"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const database = getFirestore(app);

export { database, auth };