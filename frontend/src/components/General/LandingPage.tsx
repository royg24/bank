import { Box, Button, Typography, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Info from './Info';
import {
  landingPageBackgroundStyle,
  landingPageButtonStyle,
  textStructure,
  cardStructure,
  landingPageButtonSetStructure,
  landingPageCardsBoxStyle
} from '../../css/Style';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Gold Bank';
  }, []);

  return (
    <Box
      sx={{...landingPageBackgroundStyle,}}
    >

      <Box sx={{ width: '100%', textAlign: 'center', flexShrink: 0, 
        '@media (max-width: 800px)': {
          marginTop: '5rem'
        }
       }}>
        <Typography
          variant="h2"
          sx={{
            ...textStructure,
            fontSize: '4.5em',
            '@media (max-width: 1400px)': {
              fontSize: '3.5em',
            },
            '@media (max-width: 800px)': {
              fontSize: '3em'
            },
          }}
        >
          Welcome to{' '}
          <Box
            component="br"
            sx={{
              display: 'none',
              '@media (max-width: 800px)': {
                display: 'inline',
              },
            }}
          />
          <Box
            component="span"
            sx={{
              ...textStructure,
              color: 'gold',
              fontSize: 'inherit',
              '@media (max-width: 1400px)': {
                fontSize: 'inherit',
              },
              '@media (max-width: 800px)': {
                fontSize: 'inherit',
              },
            }}
          >
            GoldBank
          </Box>
        </Typography>
      </Box>

      <Box {...landingPageCardsBoxStyle}>
        <Card sx={{ ...cardStructure.sx, marginLeft: 0 }}>
          <Info
            labelContent="🔐⚡Fast & Secure"
            infoContent="Fast transactions with top-level security to keep your data safe."
          />
        </Card>

        <Card sx={{
          ...cardStructure.sx,
          marginLeft: '30%',
          '@media (max-width: 1400px)': {
            marginLeft: 0
          }
        }}>
          <Info
            labelContent="🌐 Reliable Service"
            infoContent="Always here for you, providing seamless and consistent access."
          />
        </Card>

        <Card sx={{
          ...cardStructure.sx,
          marginLeft: '60%',
          '@media (max-width: 1400px)': {
            marginLeft: 0
          } 
        }}>
          <Info
            labelContent="💳 Easy Payments"
            infoContent="Make payments quickly and effortlessly anytime, anywhere."
          />
        </Card>
      </Box>

      <Box
        {...landingPageButtonSetStructure}
      >
        <Button
          {...landingPageButtonStyle}
          onClick={() => navigate('/access', { state: { mode: true } })}
        >
          Sign Up
        </Button>

        <Button
          {...landingPageButtonStyle}
          onClick={() => navigate('/access', { state: { mode: false } })}
        >
          Log In
        </Button>
      </Box>
    </Box>
  );
}

export default LandingPage;
