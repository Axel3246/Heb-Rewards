import { images } from '../../constants'
import './Home.css'
import { Button, Alert, Stack } from '@mui/material'
import { ReactDOM } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate();

    const navigateToContacts = () => {
        // to login
        navigate('/login');
    };


    return (
        <>
            <h1>This is the homepage</h1>
            <div>
                <a href="https://github.com/Axel3246/HebRew" target="_blank">
                    <img src={images.koop} className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={images.heb} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Koopas + HEB</h1>

            <a href=""><Button variant='contained'> BRANDON SI ESTO JALA PICAME</Button></a>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="error" sx={{ mt: 2 }}>This is an error alert — check it out!</Alert>
                <Alert severity="warning">This is a warning alert — check it out!</Alert>
                <Alert severity="info">This is an info alert — check it out!</Alert>
                <Alert severity="success">This is a success alert — check it out!</Alert>
            </Stack>


            <Router>
                
            </Router>

        </>
    )
}

export default Home

