import { Grid, Typography, Card, CardContent, CardMedia, CardActionArea } from '@mui/material'
import { images } from "../../../constants"

const MenuBox = () => {
    return (
        <Grid container spacing={1} direction="row" sx={{ alignItems: 'center' }}>
            {/* ================================================= */}
            <Grid item xs={6} align="center">
            <a className="menulink" href='#'>
                <Card sx={{ width: 140}}>
                    <CardActionArea>
                        <CardMedia component="img" image={images.pollo} alt="Minijuegos" sx={{ height: 90 }} />
                        <CardContent sx={{ p: 0 }}>
                            <Typography variant="subtitle2" component="div"> Dine n' <span className='red'>Dash 🏃🏼‍♀️</span> </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>
            </Grid>
            <Grid item xs={6} align="center">
            <a className="menulink" href='/productos'>
                <Card sx={{ width: 140 }}>
                    <CardActionArea>
                        <CardMedia component="img" image={images.all} alt="Minijuegos" sx={{ height: 90 }} />
                        <CardContent sx={{ p: 0 }}>
                        <Typography variant="subtitle2" component="div"> Explora <span className='red_two'>HEB 📍</span> </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>
            </Grid>
            <Grid item xs={12} align="center">
            <a className="menulink" href='#'>
                <Card sx={{ width: 285}}>
                    <CardActionArea>
                        <CardMedia component="img" image={images.wtp} alt="Minijuegos" sx={{ height: 120 }} />
                        <CardContent sx={{ p: 0 }}>
                        <Typography variant="subtitle2" component="div"><span className='red'>What's </span>the Product? 🕵🏻‍♀️</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </a>
            </Grid>

            {/* ================================================= */}

            {/* ================================================= */}
        </Grid>
    )
}

export default MenuBox


