// Pagina principal WTP
// Axel Hdz, Lau Hdz Y Ricardo Rdz 25/05/2023
import React from 'react'
import { Container } from '@mui/material';

// Se importan documentos de componentes
import WTPAppBar from '../WhatsTP/components/WTPAppBar'
import SwiperWelcome from '../WhatsTP/components/SwipeBarAbajo'
import backgroundImg from '../WhatsTP/components/wtpimagen.png'

const WhatsTP = () => {
  const background = {
    backgroundImage:`url(${backgroundImg})`,
    width: '100vw',
    height: '50vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <Container style={background}>
      <WTPAppBar/>
      <SwiperWelcome/>
    </Container>
  )
}

export default WhatsTP