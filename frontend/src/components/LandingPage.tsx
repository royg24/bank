import { Box, Button, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Info from './Info'
import { landingPageBackgroundStyle, landingPageButtonStyle, textStructure,
     cardStructure, landingPageButtonSetStructure } from './Style';

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

            <Typography variant="h2" sx={{ ...textStructure, fontSize: '3em' }}>
                Welcome to{' '}

                <Box component="span" sx={{ ...textStructure, color: 'gold' }}>
                GoldBank
                </Box>

            </Typography>

        </Box>

        <Box sx={{ display: 'flex', gap: '1.5em', alignItems: 'flex-start' }}>

            <Card sx={{ ...cardStructure.sx, marginTop: '0em' }}>

                <Info labelContent='🔐⚡Fast & Secure'
                infoContent={'Fast transactions with top-level\nsecurity to keep your data safe.'} >
                </Info>


            </Card>

            <Card sx={{ ...cardStructure.sx, marginTop: '4em' }}>

                <Info labelContent='🌐 Reliable Service'
                infoContent={'Always here for you, providing\nseamless and consistent access anytime.'} >
                </Info>

            </Card>

            <Card  sx={{ ...cardStructure.sx, marginTop: '8em' }}>

                <Info labelContent='💳 Easy Payments'
                infoContent={'Make payments quickly and\neffortlessly anytime, anywhere.'} >
                </Info>

            </Card>

        </Box>

    </Box>
  );
}

export default LandingPage;
