// Lista con division
// Lau Hdz 15/05/2023
import { React, useState } from 'react'
import { useTheme } from '@mui/material/styles';

// Se importan librerias de mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import { ListItemSecondaryAction } from '@mui/material';


// Se importan iconos para botones
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Se importan archivos 
import './ListaDiv.css'
import { Margin } from '@mui/icons-material';
import CustomizedSnackbars from './AlertaEliminar';

// Se importa la base de datos


export default function InsetDividers() {
  const theme = useTheme();
  const [counter, setCounter] = useState(1);
 
  // Counter menos
  const decrease = () => {
  setCounter(count => count - 1);
  };

  // Counter menos
  const increase = () => {
    setCounter(count => count + 1);
  };

  return (
    <div className="Content">
        
        <List
            sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            alignItems:'center',
            marginLeft: '10px'
        }}
        >
            <ListItem >
                <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Precio: $00.00" />
                <ListItemSecondaryAction>
                    <IconButton aria-label="menos" onClick={decrease}>
                        {theme.direction === 'rtl' ? <RemoveCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                    </IconButton>
                    <IconButton aria-label="cantidad">
                        <span className="counter__output">{counter}</span>
                    </IconButton>

                    <IconButton aria-label="mas" onClick={increase}>
                        {theme.direction === 'rtl' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                    </IconButton>

                    <IconButton edge="end" aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                    
                    
                </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />

            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <WorkIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Work" secondary="Precio: $00.00" />
                <ListItemSecondaryAction>
                    <IconButton aria-label="menos" onClick={decrease}>
                        {theme.direction === 'rtl' ? <RemoveCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                    </IconButton>
                    <IconButton aria-label="cantidad">
                        <span className="counter__output">{counter}</span>
                    </IconButton>

                    <IconButton aria-label="mas" onClick={increase}>
                        {theme.direction === 'rtl' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                    </IconButton>

                    <IconButton edge="end" aria-label="delete" >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                    
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Vacation" secondary="Precio: $00.00" />
                <ListItemSecondaryAction>
                    <IconButton aria-label="menos" onClick={decrease}>
                        {theme.direction === 'rtl' ? <RemoveCircleOutlineIcon /> : <RemoveCircleOutlineIcon />}
                    </IconButton>
                    <IconButton aria-label="cantidad">
                        <span className="counter__output">{counter}</span>
                    </IconButton>

                    <IconButton aria-label="mas" onClick={increase}>
                        {theme.direction === 'rtl' ? <AddCircleOutlineIcon /> : <AddCircleOutlineIcon />}
                    </IconButton>

                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
                    
            </ListItem>
            
        </List>
    </div>
  );
}