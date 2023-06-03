import { Typography } from "@mui/material";
import { images } from "../../../constants";

const Footer = () => {
  return (
    <footer>
      <img className="footimg" src={images.heb} alt="HEB Logo" style={{marginBottom: '0.7rem'}} />
      <Typography>
        <a href="/login" style={{color:'white', textDecoration: 'none', fontSize: 14}}>Inicia Sesión</a> | <a href="/signup" style={{color:'white', textDecoration: 'none', fontSize: 14}}>Registrate</a>
      </Typography>
      <p>© 2023 H-E-B México - Koopas</p>
    </footer>
  );
};

export default Footer;
