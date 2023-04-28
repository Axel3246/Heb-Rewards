import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import LocalCafeOutlinedIcon from '@mui/icons-material/LocalCafeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { images } from '../../../constants'

//Queda ajustar los botones para que no queden ovalados

//Search bar
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '32px',
    backgroundColor: alpha(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.85),
    },
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'action',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
}));

export default function ButtonAppBar() {
    return (
        <AppBar position="fixed" sx={{ bgcolor: '#FE231F' }}>  
            <Toolbar disableGutters>    
                <Box
                    sx={{
                    display: 'flex',
                    p: 1,
                    flexGrow: 1
                    }}
                >
                    
                    <IconButton
                        size="large"
                        color="inherit"
                    >
                    <MenuIcon />
                    </IconButton>
                    
                    
                
                    <IconButton sx={{ml:'auto', mr:'auto'}} href='/'>
                        <Box component="img" src={images.heb_svg} sx={{maxHeight: 120, height: 1, width: 1}}/>
                    </IconButton>
                    
                    
                    <IconButton
                        size="large"
                        color="inherit"
                        
                    >
                        <LocalCafeOutlinedIcon />
                    </IconButton>

                    <IconButton
                        size="large"
                        color="inherit"
                        href='/lista'
                    >
                    <ShoppingCartOutlinedIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            
            <Box sx={{px:2}}>
                <Button variant="text" color="inherit" size="small" startIcon={<LocationOnOutlinedIcon />}>
                    Nombre de sucursal
                </Button>
            </Box>

            <Box sx={{px:2, py:1, marginTop: '102px'}}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon color="action"/>
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Buscar en heb.com.mx"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            </Box>

            

            

        </AppBar>
    );
}