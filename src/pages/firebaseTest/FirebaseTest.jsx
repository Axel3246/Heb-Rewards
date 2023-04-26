import * as React from 'react';
import { initializeApp } from "firebase/app";
//import { getDatabase, ref, set, onValue } from "firebase/database";
import { getFirestore, addDoc, collection, getDocs } from "firebase/firestore";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';



function FirebaseTest() {

    const firebaseConfig = {
        // ...
        // The value of `databaseURL` depends on the location of the database
        apiKey: "AIzaSyAXjxHpSkQdyOA1YiyDHrSvvDN73uQWsjI",
        authDomain: "koopasheb.firebaseapp.com",
        databaseURL: "https://koopasheb-default-rtdb.firebaseio.com",
        projectId: "koopasheb",
        storageBucket: "koopasheb.appspot.com",
        messagingSenderId: "639422265150",
        appId: "1:639422265150:web:91c14d6fa3283a15b45e6f"
    
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Realtime Database and get a reference to the service
    //const database = getDatabase(app);
    const db = getFirestore(app);

    async function writeUserData(){
        try {
            const docRef = await addDoc(collection(db, "users"), {
              first: "Ada",
              last: "Lovelace",
              born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    async function readUserData(){
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
        });
    }
    
      
      

    /*function writeUserData(userId, name, email) {
        set(ref(database, 'users/' + userId), {
          username: name,
          email: email
        });
    }

    function readUserData(userId) {
        const dbRef = ref(database, 'users/' + userId);
        onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        //updateLabel(data);
        //console.log(data);
        
        });
    }*/

    
    /*
    <ThemeProvider theme={loginTheme}>
        <Container component="main" maxWidth="sm">
            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, background: '#ff3232'}}
                onclick="writeUserData(1, Alfonso, test@firebase.com)"
            >
                Test
            </Button>
        </Container>
    </ThemeProvider>
    */
    return(
        <Container component="main" maxWidth="sm">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: '#ff3232'}}
                        onClick={async () => {await writeUserData();} }
                        
                    >
                        picame
                    </Button>
                    <h1> hola </h1>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, background: '#ff3232'}}
                        onClick={async () => {await readUserData();} }
                        
                    >
                        get
                    </Button>
                    <h1 id='si'>get</h1>
        </Container>
        
    )
}

export default FirebaseTest