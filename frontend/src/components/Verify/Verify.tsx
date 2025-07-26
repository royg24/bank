import { Box, Typography, Button, useMediaQuery, useTheme } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import VerifyDigit from './VerifyDigit';
import { textStructure, buttonStructure } from '../../css/Style';
import { validateCode } from '../BackendCalls';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Timer from './Timer';

function Verify() {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState(Array(6).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expiryTimestamp] = useState(() => Date.now() + 3 * 60 * 1000);
  const isComplete = values.every((v) => v !== '');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    document.title = 'Verify';
    const input = inputsRef.current[currentIndex];
    if (input) input.focus();
  }, [currentIndex]);

  const verifyCode = async () => {
    const code = parseInt(values.join(''));
    const email = localStorage.getItem('email');

    const result = await validateCode({ email: email || '', code: code });
    if (result.success) {
      toast.success(result.message);
      navigate('/access', { state: { mode: false } });
    } else {
      toast.error(result.error);
    }
  };

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const newValues = [...values];
    newValues[idx] = val;
    setValues(newValues);
    if (val && idx < values.length - 1) setCurrentIndex(idx + 1);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const isDigit = e.key >= '0' && e.key <= '9';
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];
      if (values[idx]) {
        newValues[idx] = '';
        setCurrentIndex(idx);
      } else if (idx > 0) {
        newValues[idx - 1] = '';
        setCurrentIndex(idx - 1);
      }
      setValues(newValues);
    } else if (e.key.length === 1 && !isDigit) {
      e.preventDefault();
    }
  };

  const handleFocus = (idx: number, e: React.FocusEvent<HTMLInputElement>) => {
    if (idx !== currentIndex) {
      e.preventDefault();
      inputsRef.current[currentIndex]?.focus();
    }
  };

  return (
    <Box
      sx={{
        gap: '3em',
        width: '90%',
        height: '30em',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '7rem',
        '@media (max-width: 1200px)': {
          gap: '5em',
          height: 'auto',
          marginTop: '5rem',
        },
        '@media (max-width: 800px)': {
          gap: '5em',
          marginTop: '5.6rem',
          width: '95%',
          height: 'auto',
        },
        '@media (max-width: 400px)': {
          gap: '5em',
          marginTop: '6rem',
          width: '100%',
          paddingX: '1rem',
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          ...textStructure,
          fontSize: '3em',
          fontFamily: 'monospace',
          textAlign: 'center',
          '@media (max-width: 1200px)': { fontSize: '2.5em' },
          '@media (max-width: 800px)': { fontSize: '2em' },
          '@media (max-width: 400px)': { fontSize: '1.5em' },
        }}
      >
        Enter the 6-digit code sent to your email
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: isMobile ? '1em' : '4em',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          overflowX: isMobile ? 'auto' : 'visible',
          paddingX: isMobile ? '0.5em' : 0,
          '@media (max-width: 1200px)': { gap: '3em' },
          '@media (max-width: 400px)': { gap: '0.5em' },
        }}
      >
        {values.map((val, idx) => (
          <VerifyDigit
            key={idx}
            inputRef={(el) => {
              inputsRef.current[idx] = el;
            }}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            onFocus={(e) => handleFocus(idx, e)}
            value={val}
          />
        ))}
      </Box>

      <Box sx={{ mt: '1em' }}>
        <Timer expiryTimestamp={expiryTimestamp} />
      </Box>

      <Box
        sx={{
          minWidth: '16em',
          display: 'flex',
          justifyContent: 'center',
          mt: '2em',
          width: 'auto',
          '@media (max-width: 400px)': { paddingX: '1rem' },
        }}
      >
        <Button {...buttonStructure} onClick={verifyCode} disabled={!isComplete}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Verify;
