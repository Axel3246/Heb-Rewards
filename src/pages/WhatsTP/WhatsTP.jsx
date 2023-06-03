// Pagina principal WTP
// Axel Hdz, Lau Hdz Y Ricardo Rdz 25/05/2023
import React from 'react'
import { Container } from '@mui/material';

// Se importan documentos de componentes
import WTPAppBar from '../WhatsTP/components/WTPAppBar'
import SwiperWelcome from '../WhatsTP/components/SwipeBarAbajo'

import { Block, OpenInBrowserOutlined } from '@mui/icons-material';

const WhatsTP = () => {
  return (
    <Container>
      <WTPAppBar/>
      <SwiperWelcome/>
    </Container>
  )
}

export default WhatsTP