import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';


// Se importa el archivo de estilo
import '../../pages/Lista/Modal.css'

const Modal = props => {

    if(!props.show){
        return null
    }

    const hStyle = { color: 'black' , textAlign: "center"};

    return (
        <div className='modal' onClick={props.onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <IconButton
                        size="large"
                        color="black"
                        onClick={props.onClose} className='button'
                    >
                        <CancelTwoToneIcon />
                    </IconButton>
                    <h3 style={ hStyle } className='modal-title'>Escanear producto</h3>
                </div>
                <div className='modal-body'> 
                    <TextField id="filled-basic" label="Código" variant="filled" sx={{p:1}}/>
                </div>
                <div className='modal-footer'>
                    <Button variant="contained" color="success" onClick={props.onClose}>
                        Agregar
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Modal