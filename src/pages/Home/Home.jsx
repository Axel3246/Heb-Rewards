import { images } from '../../constants'
import './Home.css'
import AppBarHome from './components/AppBarHome.jsx'
import { auth, } from '../../FirebaseConfig'
import { Box, Container, Typography, Divider } from '@mui/material'
import { styled } from '@mui/material/styles';
// import Swiper core and required modules
import Swipe from './components/Swipe'
import MenuBox from './components/MenuBox'
import SucSelec from './components/SucSelec'
import Footer from './components/Footer'
import ReactDom from 'react-dom';
import { useLocation } from "react-router-dom";

function Home({ user }) {

    const location = useLocation();
    let data = location.state;

    return (
        <>
        <Container>
            <AppBarHome />
            <Container maxWidth="sm" sx={{ mt: 13 }}>
                <Box> {/* all  */}
                    <Box> {/* swip   */}
                        <Swipe/>
                    </Box>
                    <br></br>
                    <Divider></Divider>
                    <Box sx={{ mt: 3 }}> {/* suc   */}
                        <SucSelec/>
                    </Box>
                    <br></br>
                    <Divider></Divider>
                    <Box sx={{ m: 1, p: 1 }}> {/* grid  */}
                    <Typography variant='h4' sx={{ fontWeight: 'bold', fontSize: '30px', mb: 2 }}>🎮 ¡<span>Juega</span> y Explora! 🛒</Typography>
                        <MenuBox/>
                    </Box>
                </Box>
            </Container>
        </Container>
        <Footer/>
        </>
    )
}

export default Home
