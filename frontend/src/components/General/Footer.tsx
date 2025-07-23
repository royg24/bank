import { Box, Typography } from '@mui/material';
import { textStructure } from '../../css/Style';
import '../../css/style.css';

function Footer() {
  return (
    <Box className="footer">
      <Typography
        component="span"
        sx={{
          ...textStructure,
          fontSize: '0.9em',
          color: 'rgba(255, 215, 0, 0.8)',
        }}
      >
        © {new Date().getFullYear()} GoldBank. All rights reserved.
      </Typography>

      <Box className="footer-icons">
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
    </Box>
  );
}

export default Footer;
