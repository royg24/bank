import React from 'react';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { toggleButtonStructure, toggleGroupStructure } from './Style.js';

type ToggleProps = {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  leftText: string;
  rightText: string
};

function Toggle({ mode, setMode ,leftText, rightText}: ToggleProps) {
    const pointerStyle = {
    fontSize: '1em',
    marginLeft: '0.6em',
    marginRight: '0.6em'
    };

    const leftPointer = <Typography sx={pointerStyle}>👉🏼</Typography>;
    const rightPointer = <Typography sx={pointerStyle}>👈🏼</Typography>;

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: boolean | null
  ) => {
    if (newValue !== null) {
      setMode(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      exclusive
      value={mode}
      onChange={handleModeChange}
      {...toggleGroupStructure(mode)}
    >
      <ToggleButton disabled={mode} {...toggleButtonStructure(true)} value={true}>
        {mode ? leftPointer : null} {leftText}
      </ToggleButton>
      <ToggleButton disabled={!mode} {...toggleButtonStructure(false)} value={false}>
        {rightText} {!mode ? rightPointer : null}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default Toggle;
