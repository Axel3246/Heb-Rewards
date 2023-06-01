// Modal Nueva pista
// Lau Hdz 25/05/2023
import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Librerias Icono
import { yellow } from '@mui/material/colors';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Declaracion de estilos del modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
  borderRadius: '10px'
};

{/* Funcion para cambiar detalles de un icono */}
function IconoLuz(props) {
    return (
      <LightbulbIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </LightbulbIcon>
    );
}

export default function BasicModal(pistas) {
  console.log('MODALLL', pistas);

  const [open, setOpen] = React.useState(false);
  const [clickOne, setClickOne] = useState(false);
  const [clickTwo, setClickTwo] = useState(false);
  const [clickThree, setClickThree] = useState(false);
  const [clickFour, setClickFour] = useState(false);
  const [data, setData] = useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  


  return (
    <div>
      {/* Declaracion de botones que despliegan las pistas */}
      <Button variant="contained" color="error" onClick={() => {setData(pistas.props[0]); setClickOne(true);  setOpen(true);}}> 
        Pista 1
      </Button>
      {clickOne === true ?
      <Button variant="outlined"  color="error" onClick={() => {setData(pistas.props[1]); setClickTwo(true);  setOpen(true);}}> 
        Pista 2
      </Button>
      :
      <Button variant="outlined" disabled color="error"> 
        Pista 2
      </Button>
      }
      {clickTwo === true ?
      <Button variant="contained"  color="error" onClick={() => {setData(pistas.props[2]); setClickThree(true);  setOpen(true);}}> 
        Pista 3
      </Button>
      :
      <Button variant="outlined" disabled color="error"> 
        Pista 3
      </Button>
      }
      {clickThree === true ?
      <Button variant="outlined"  color="error" onClick={() => {setData(pistas.props[3]); setClickFour(true);  setOpen(true);}}> 
        Pista 4
      </Button>
      :
      <Button variant="outlined" disabled color="error"> 
        Pista 4
      </Button>
      }

      {/* Declaracion de Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <IconoLuz fontSize="large" sx={{ color: yellow[500] }} />
          
            <Typography id="modal-modal-title" variant="h8" component="h2">
              ¡Nueva Pista!
            </Typography>
            <Typography id="modal-modal-description" sx={{fontWeight: 'bold', mt: 2, color: 'text.secondary'}}>
              {data}
            </Typography>
        </Box>
      </Modal>
    </div>
  );
}