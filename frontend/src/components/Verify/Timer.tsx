import Countdown from 'react-countdown';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const renderer = ({ minutes, seconds, completed }: any) => {
  if (completed) {
    return <Typography sx={{
      fontSize: '3rem',
      fontFamily: 'monospace'
    }}>Time's up!</Typography>;

  } else {
    return (
      <Typography
        variant="h5"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 'bold',
          fontSize: '2.5rem',
          color: 'white'
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
            navigate('/access', {state: {mode: true}})
          }, 1000);
        }}
      />
    </Box>
  );
}
