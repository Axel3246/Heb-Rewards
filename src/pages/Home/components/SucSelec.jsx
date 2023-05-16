import { Box, Typography } from "@mui/material"
import { images } from '../../../constants'

const SucSelec = () => {
    const text = "";
    return (
        <a className='maplink' href='/sucursales'>
            <Box>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>¡Busca tu <span>Sucursal!</span></Typography>
                <img className='mapp' src={images.mapp}></img>
                <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '16px',mb: 1 }}>{text === "" ? "✨ Aquí aparecerá tu sucursal ✨" : 'Tu Sucursal es: ' + text}</Typography>
            </Box>
        </a>
    )
}

export default SucSelec