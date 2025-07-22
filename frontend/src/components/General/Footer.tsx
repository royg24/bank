
import { Box, Typography } from '@mui/material';
import { textStructure } from '../../css/Style';
import '../../css/style.css'

function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '0.4em' ,
        padding: '1em 0',
        backgroundColor: 'rgba(49, 48, 14, 0.43)',
        borderTop: '0.em solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        gap: '1.5em'
      }}
    >
      <Typography sx={{
        ...textStructure,
        fontSize: '0.9em',
        color: 'rgba(255, 215, 0, 0.8)' 
         }}>
        © {new Date().getFullYear()} GoldBank. All rights reserved.
      </Typography>

      <div className="footer-icon">
        <i className="fa-brands fa-facebook"></i>
      </div>

      <div className="footer-icon">
        <i className="fa-brands fa-linkedin"></i>
      </div>

      <div className="footer-icon">
        <i className="fa-brands fa-github"></i>
      </div>
      
      <div className="footer-icon">
        <i className="fa-brands fa-instagram"></i>
      </div>

      <div className="footer-icon">
        <i className="fa-brands fa-twitter"></i>
      </div>

    </Box>
  );
}

export default Footer;
