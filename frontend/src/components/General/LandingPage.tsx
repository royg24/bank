import { Box, Button, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Info from './Info'
import { landingPageBackgroundStyle, landingPageButtonStyle, textStructure,
     cardStructure, landingPageButtonSetStructure } from '../../css/Style';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gold Bank';
  });

  return (
    <Box sx={landingPageBackgroundStyle}>

        <Box sx={{
          width: '100%',
          textAlign: 'center',
          mb: 4,
          marginTop: '3em',
          maxHeight: '1em' 
        }}>

            <Typography variant="h2" sx={{ ...textStructure, fontSize: '4.5em' }}>
                Welcome to{' '}

                <Box component="span" sx={{ ...textStructure, color: 'gold' }}>
                GoldBank
                </Box>

            </Typography>

        </Box>

          <Box sx={{ display: 'flex', gap: '2em', alignItems: 'flex-start', width: '90%' }}>

              <Card sx={{ ...cardStructure.sx, marginTop: '0%' }}>

                  <Info labelContent='🔐⚡Fast & Secure'
                  infoContent={'Fast transactions with top-level security to keep your data safe.'} >
                  </Info>


              </Card>

              <Card sx={{ ...cardStructure.sx, marginTop: '8%' }}>

                  <Info labelContent='🌐 Reliable Service'
                  infoContent={'Always here for you, providing seamless and consistent access.'} >
                  </Info>

              </Card>

              <Card  sx={{ ...cardStructure.sx, marginTop: '16%' }}>

                  <Info labelContent='💳 Easy Payments'
                  infoContent={'Make payments quickly and effortlessly anytime, anywhere.'} >
                  </Info>

              </Card>

          </Box>

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

    </Box>
  );
}

export default LandingPage;
