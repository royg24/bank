import Countdown from 'react-countdown';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const renderer = ({ minutes, seconds, completed }: any) => {
  if (completed) {
    return (
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '3rem',
          '@media (max-width: 1400px)': { fontSize: '2.5rem' },
          '@media (max-width: 800px)': { fontSize: '2rem' },
          '@media (max-width: 400px)': { fontSize: '1.5rem' },
        }}
      >
        Time's up!
      </Typography>
    );
  } else {
    return (
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          color: 'white',
          '@media (max-width: 1400px)': { fontSize: '3rem' },
          '@media (max-width: 800px)': { fontSize: '2rem' },
          '@media (max-width: 400px)': { fontSize: '2rem' },
        }}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    );
  }
};

export default function Timer({ expiryTimestamp }: { expiryTimestamp: number }) {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Countdown
        date={expiryTimestamp}
        renderer={renderer}
        onComplete={() => {
          toast.info('Please sign up again');
          setTimeout(() => {
            navigate('/access', { state: { mode: true } });
          }, 1000);
        }}
      />
    </Box>
  );
}
