import type { TextFieldProps, ButtonProps, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const color = 'white';
const buttonColor = "	rgb(187, 159, 3)";
const buttonHoverColor = "rgb(113, 102, 40)";
const inactiveButtonColor = 'rgb(105, 101, 104)';
const borderColor = 'white';
const font = "monospace, Arial, sans-serif";

export function formContainerStyle(marginTop = '1em') {
  return {
    marginTop: marginTop,
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    width: '40%',
    maxWidth: '30em',
    padding: '2em',
    backgroundColor: 'rgba(154, 136, 136, 0.195)',
    borderRadius: '0.75em',
    boxShadow: '0 8px 24px rgb(0, 0, 0)'
  };
}

export function paginationContainerStyle(marginTop = '1em') {
  return {
    marginTop: marginTop,
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    marginBottom: '3em', 
    alignItems: 'center',
    justifyContent: 'flex-top',
    width: '100%',
    maxWidth: '55em',
    minHeight: '25em',
    padding: '2em',
    backgroundColor: 'rgba(154, 136, 136, 0.195)',
    borderRadius: '0.75em',
    boxShadow: '0 8px 24px rgb(0, 0, 0)',
  };
}


export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: font,
          color: color,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: font,
          fontWeight: 700,
          color: color,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: font,
          color: color,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: font,
          fontWeight: 700,
          color: color,
        },
      },
    },
    
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor,
            borderWidth: "0.1em",
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor,
            borderWidth: "0.1em"
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor,
            borderWidth: "0.1em"
          },
        },
        input: {
          color: color,
        },
      },
    },
  },
});

export const fieldStructure: TextFieldProps = {
  variant: 'outlined',
  sx: { 
    mb: 1,
    ml: '4em',
    width: "70%",
    top: '10%',
    '& .MuiInputBase-input': {
      fontSize: '0.75rem',
      fontWeight: 10,
      padding: '0.6em 1em',  
    },
    '& .MuiInputLabel-root': {
      fontSize: '0.75rem',
    }
  },
  className: 'field',
  size: 'small',
}

import type { CSSProperties } from 'react';

export const verifyFieldStructure = {
  sx: {
    backgroundColor: 'rgba(226, 207, 207, 0.32)',
    width: '4.5em',
    height: '4.5em',
    '& .MuiInputBase-input': {
      fontSize: '3em',
      textAlign: 'center' as CSSProperties['textAlign'],
      padding: 0
    }
  },
  inputProps: {
    maxLength: 1,
    style: {
      textAlign: 'center' as CSSProperties['textAlign'],
      color: 'rgb(3, 27, 45)'
    }
  }
}

export const buttonStructure: ButtonProps = {
  sx: {
    backgroundColor: buttonColor,
    width: "40%",
    height: '2.3em',
    left: "8em",
    marginTop: "1em",
    '&:hover': {
      backgroundColor: buttonHoverColor,
      cursor: "pointer"
    },
    '&:focus': {
      outline: 'none',
      border: 'none'
    }
  },
}

export function toggleGroupStructure(mode: boolean): ToggleButtonGroupProps {
  return {
    value: mode,
    exclusive: true,
    sx: {
      position: 'absolute',
      height: '3em',
      width: '25em',
      left: '20em',
      top: '4%',
      backgroundColor: 'rgba(225, 224, 224, 0.1)',
    }
  }
}

export function toggleButtonStructure(value: boolean): ToggleButtonProps {
  return {
    value: value,
    sx: {
      fontFamily: font,
      width: '16em',
      backgroundColor: buttonColor, 
      color: 'white',
      fontSize: '0.8em',
      fontWeight: 700,
      textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
      '&.Mui-selected': {
        backgroundColor: inactiveButtonColor,
        color: 'white',
        outline: 'none',
        border: 'none'
      },
      '&:hover': {
        backgroundColor: buttonHoverColor, 
        cursor: 'pointer'
      }
    },
  }
}

export const infoStructure = {
    whiteSpace: 'pre-line',
    fontFamily: 'Georgia, Arial',
    fontSize: '1em',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
}

export const textStructure = {
  fontFamily: font,
  fontSize: '0.8em',
  fontWeight: 700,
  color: '#f1e6ff',
  textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
}

export const cardStructure = {
  sx: {
    gap: 3,
    width: '19em',
    maxHeight: '5em',
    padding: '0.4em',
    background: 'linear-gradient(135deg, rgba(215, 184, 5, 0.6), rgba(255, 235, 100, 0.15))',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '1em',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left-start',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(235, 200, 20, 0.8), rgba(255, 245, 160, 0.25))',
      transform: 'translateY(-3px)',
      boxShadow: '0 14px 35px rgba(0, 0, 0, 0.45)',
    }
  }
}

export const dividerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)', 
  mx: 1                  
}

export const landingPageBackgroundStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '2em',
  backgroundImage: 'url("/path/to/your/background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: color,
};

export const landingPageButtonSetStructure = {
  sx: {
    display: 'flex',
    gap: '1em',
    position: 'absolute',
    top: '0.2em',
    right: '15%'
  }
}

export const landingPageButtonStyle: ButtonProps = {
  ...buttonStructure,
  sx: {
    ...buttonStructure.sx,
    width: '120px',
    fontSize: '0.8em',
    fontWeight: 800,
  }
};

export const pagingArrowsStructure = {
  sx: {
    backgroundColor: buttonColor,
    width: '1.5em',
    height: '1.5em',
    '&:hover': {
      backgroundColor: buttonHoverColor
    },
    '&:disabled': {
      backgroundColor: 'gray'
    }
  }
}