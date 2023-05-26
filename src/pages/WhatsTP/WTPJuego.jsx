// Pagina juego WTP
// Axel Hdz, Lau Hdz y Ricardo Rdz 25/05/2023
import React from 'react'
import { Container } from '@mui/material';

// Se importan documentos de componentes
import JuegoAppBar from '../WhatsTP/components/JuegoAppBar'
import Pistas from '../WhatsTP/components/Pistas'

const WTPJuego = () => {
  return (
    <Container>
      <JuegoAppBar/>
      <Pistas/>
    </Container>
  )
}

export default WTPJuego