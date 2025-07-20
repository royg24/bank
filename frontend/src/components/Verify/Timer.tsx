import Countdown from 'react-countdown';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';

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
          fontSize: '3rem',
          color: 'white',
          padding: '0.5em 1em',
        }}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Typography>
    );
  }
};

export default function Timer({ expiryTimestamp }: { expiryTimestamp: number }) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Countdown
        date={expiryTimestamp}
        renderer={renderer}
        onComplete={() => toast.info('Please sign up again')}
      />
    </Box>
  );
}
