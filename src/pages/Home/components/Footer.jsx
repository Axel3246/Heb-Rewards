import { images } from "../../../constants";

const Footer = () => {
  return (
    <footer>
      <img className="footimg" src={images.heb} alt="HEB Logo" />
      <p>© 2023 H-E-B México - Koopas</p>
    </footer>
  );
};

export default Footer;
