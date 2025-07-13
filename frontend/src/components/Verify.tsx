import { Box, Typography, Button } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import VerifyDigit from './VerifyDigit';
import { textStructure, buttonStructure } from './Style';

function Verify() {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [values, setValues] = useState(Array(6).fill(''));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    document.title = 'Verify';
    const input = inputsRef.current[currentIndex];
    if (input) input.focus();
  }, [currentIndex]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) {
      return;
    }

    const newValues = [...values];
    newValues[idx] = val;
    setValues(newValues);

    if (val && idx < values.length - 1) {
      setCurrentIndex(idx + 1);
    }
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
    <>
      <Typography variant='h1' sx={{ ...textStructure, fontSize: '3em', fontFamily: 'monospace' }}>
        Enter the 6-digit code sent to your device
      </Typography>
      <Box sx={{ display: 'flex', gap: '2em', marginTop: '1em' }}>
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

      <Box sx={{ marginRight: '5em', marginTop: '1em', minWidth: '16em' }}>
        <Button {...buttonStructure}>Submit</Button>
      </Box>
    </>
  );
}

export default Verify;
