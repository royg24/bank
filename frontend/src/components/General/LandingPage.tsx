import { Box, Button, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Info from './Info'
import { landingPageBackgroundStyle, landingPageButtonStyle, textStructure,
     cardStructure, landingPageButtonSetStructure } from '../../css/Style';
import img from '../../assets/landing.png';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gold Bank';
  });

  return (
    <Box sx={landingPageBackgroundStyle}>

        <Box {...landingPageButtonSetStructure}>

            <Button {...landingPageButtonStyle} onClick={
                () => navigate('/access', {state: {mode: true}})
                }>Sign Up
            </Button>

            <Button {...landingPageButtonStyle} onClick={
                () => navigate('/access', {state: {mode: false}})
                }>Log In
            </Button>

        </Box>

        <Box sx={{ width: '100%', textAlign: 'center', mb: 2, marginTop: '3em', maxHeight: '1em' }}>

            <Typography variant="h2" sx={{ ...textStructure, fontSize: '3.5em' }}>
                Welcome to{' '}

                <Box component="span" sx={{ ...textStructure, color: 'gold' }}>
                GoldBank
                </Box>

            </Typography>

        </Box>

        <Box sx={{ position: 'relative', width: '100%' }}>

          <Box sx={{ display: 'flex', gap: '1.5em', alignItems: 'flex-start' }}>

              <Card sx={{ ...cardStructure.sx, marginTop: '0%' }}>

                  <Info labelContent='🔐⚡Fast & Secure'
                  infoContent={'Fast transactions with top-level\nsecurity to keep your data safe.'} >
                  </Info>


              </Card>

              <Card sx={{ ...cardStructure.sx, marginTop: '8%' }}>

                  <Info labelContent='🌐 Reliable Service'
                  infoContent={'Always here for you, providing\nseamless and consistent access.'} >
                  </Info>

              </Card>

              <Card  sx={{ ...cardStructure.sx, marginTop: '16%' }}>

                  <Info labelContent='💳 Easy Payments'
                  infoContent={'Make payments quickly and\neffortlessly anytime, anywhere.'} >
                  </Info>

              </Card>

          </Box>

          <Box
            component="img"
            src={img}
            alt="Decorative"
            sx={{
              position: 'absolute',
              top: { xs: '1em', md: '7em' },
              left: { xs: '0', md: '-4em' },
              width: { xs: '60%', sm: '40%', md: '35%' },
              height: 'auto',
              borderRadius: '1em',
              objectFit: 'cover',
              userSelect: 'none',
              boxShadow: '0 10px 30px rgba(8, 7, 2, 0.13)'
            }}
          />

        </Box>

    </Box>
  );
}

export default LandingPage;
