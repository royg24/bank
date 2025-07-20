import { Card, TextField } from '@mui/material';
import { verifyFieldStructure } from '../../css/Style';
import React from 'react';

function VerifyDigit({ inputRef, onChange, onKeyDown, onFocus, value }: {
  inputRef?: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
}) {
  return (
    <Card>
      <TextField
        {...verifyFieldStructure}
        inputRef={inputRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        value={value}
      />
    </Card>
  );
}

export default VerifyDigit;
