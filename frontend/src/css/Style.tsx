import type { TextFieldProps, ButtonProps, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const color = 'white';
const buttonColor = "rgb(187, 159, 3)";
const buttonHoverColor = "rgb(113, 102, 40)";
const inactiveButtonColor = 'rgb(105, 101, 104)';
const borderColor = 'white';
const font = "monospace, Arial, sans-serif";

export const theme = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: font,
          color: color,
          fontSize: '1.25rem',
          '@media (max-width:1400px)': {
            fontSize: '1.1rem',
          },
          '@media (max-width:800px)': {
            fontSize: '1rem',
          },
          '@media (max-width:400px)': {
            fontSize: '0.9rem',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: font,
          fontWeight: 700,
          color: color,
          fontSize: '0.9375rem',
          '@media (max-width:1400px)': {
            fontSize: '0.85rem',
          },
          '@media (max-width:800px)': {
            fontSize: '0.75rem',
          },
          '@media (max-width:400px)': {
            fontSize: '0.65rem',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: font,
          color: color,
          fontSize: '0.9375rem',
          '@media (max-width:1400px)': {
            fontSize: '0.85rem',
          },
          '@media (max-width:800px)': {
            fontSize: '0.75rem',
          },
          '@media (max-width:400px)': {
            fontSize: '0.6rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: font,
          fontWeight: 700,
          color: color,
          fontSize: '1rem',
          '@media (max-width:1400px)': {
            fontSize: '0.9rem',
          },
          '@media (max-width:800px)': {
            fontSize: '0.8rem',
          },
          '@media (max-width:400px)': {
            fontSize: '0.7rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor,
            borderWidth: "0.125em",
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor,
            borderWidth: "0.125em"
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: borderColor,
            borderWidth: "0.125em"
          },
        },
        input: {
          color: color,
          fontSize: '0.9375rem',
          '@media (max-width:1400px)': {
            fontSize: '0.85rem',
          },
          '@media (max-width:800px)': {
            fontSize: '0.75rem',
          },
          '@media (max-width:400px)': {
            fontSize: '0.65rem',
          },
        },
      },
    },
  },
});

export function formContainerStyle(marginTop = '1em') {
  return {
    marginTop,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.25em',
    width: '50em',
    maxWidth: '37.5em',
    padding: '2.5em',
    backgroundColor: 'rgba(154, 136, 136, 0.195)',
    borderRadius: '0.9375em',
    boxShadow: '0 8px 24px rgb(0, 0, 0)',

    '@media (max-width:1400px)': {
      width: '90%',
      maxWidth: 'none',
      padding: '2em',
    },
    '@media (max-width:800px)': {
      width: '100%',
      padding: '1.25em',
      gap: '1em',
    },
    '@media (max-width:400px)': {
      padding: '1em',
      gap: '0.75em',
    },
  };
}

export function paginationContainerStyle(marginTop = '1em') {
  return {
    marginTop,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25em',
    marginBottom: '3.75em',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '50em',
    maxWidth: '68.75em',
    minHeight: '31.25em',
    padding: '2.5em',
    backgroundColor: 'rgba(154, 136, 136, 0.195)',
    borderRadius: '0.9375em',
    boxShadow: '0 8px 24px rgb(0, 0, 0)',

    '@media (max-width:1400px)': {
      width: '90%',
      maxWidth: 'none',
      padding: '2em',
    },
    '@media (max-width:800px)': {
      width: '100%',
      padding: '1.25em',
      gap: '1em',
    },
    '@media (max-width:400px)': {
      padding: '1em',
      gap: '0.75em',
    },
  };
}

export const fieldStructure: TextFieldProps = {
  variant: 'outlined',
  sx: {
    mb: 1.25,
    width: "70%",
    maxHeight: '2.5em',
    top: '12.5%',
    '& .MuiInputBase-input': {
      fontSize: '0.9375rem',
      fontWeight: 10,
      padding: '0.75em 1.25em',
      '@media (max-width:1400px)': {
        fontSize: '0.85rem',
        padding: '0.6em 1em',
      },
      '@media (max-width:800px)': {
        fontSize: '0.75rem',
        padding: '0.5em 0.75em',
      },
      '@media (max-width:400px)': {
        fontSize: '0.6rem',
        padding: '0.4em 0.5em',
      },
    },
    '& .MuiInputLabel-root': {
      fontSize: '1.1rem',
      '@media (max-width:1400px)': {
        fontSize: '1rem',
      },
      '@media (max-width:800px)': {
        fontSize: '0.9rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.75rem',
      },
    },
  },
  className: 'field',
  size: 'small',
};

import type { CSSProperties } from 'react';

export const verifyFieldStructure = {
  sx: {
    backgroundColor: 'rgba(226, 207, 207, 0.32)',
    width: '4.5em',
    height: '4.5em',
    '& .MuiInputBase-input': {
      fontSize: '3.75em',
      textAlign: 'center' as CSSProperties['textAlign'],
      padding: 0,
      '@media (max-width:1400px)': {
        fontSize: '3em',
      },
      '@media (max-width:800px)': {
        fontSize: '2.2em',
      },
      '@media (max-width:400px)': {
        fontSize: '1.8em',
      },
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
    width: '50%',
    height: '2.875em',
    '&:hover': {
      backgroundColor: buttonHoverColor,
      cursor: "pointer"
    },
    '&:focus': {
      outline: 'none',
      border: 'none'
    },
    '@media (max-width:1400px)': {
      width: '70%',
      height: '2.5em',
    },
    '@media (max-width:800px)': {
      width: '100%',
      height: '2.25em',
    },
    '@media (max-width:400px)': {
      height: '2em',
    },
  },
};

export function toggleGroupStructure(mode: boolean): ToggleButtonGroupProps {
  return {
    value: mode,
    exclusive: true,
    sx: {
      height: '3.75em',
      width: '31.25em',
      margin: '0 auto',
      position: 'relative',
      top: '5%',
      backgroundColor: 'rgba(225, 224, 224, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width:1400px)': {
        width: '90%',
        height: '3.25em',
        top: '3%',
      },
      '@media (max-width:800px)': {
        width: '100%',
        height: '3em',
        top: '2%',
      },
      '@media (max-width:400px)': {
        height: '2.5em',
        top: '1%',
      },
    }
  }
}

export function toggleButtonStructure(value: boolean): ToggleButtonProps {
  return {
    value,
    sx: {
      fontFamily: font,
      width: '20em',
      backgroundColor: buttonColor,
      color: 'white',
      fontSize: '1em',
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
      },
      '@media (max-width:1400px)': {
        width: '14em',
        fontSize: '0.9rem',
      },
      '@media (max-width:800px)': {
        width: '100%',
        fontSize: '0.85rem',
      },
      '@media (max-width:400px)': {
        fontSize: '0.75rem',
      },
    },
  }
}

export const infoStructure = {
  whiteSpace: 'pre-line',
  fontFamily: 'Georgia, Arial',
  fontSize: '1.25em',
  color: 'white',
  textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
  '@media (max-width:1400px)': {
    fontSize: '1.25em',
  },
  '@media (max-width:800px)': {
    fontSize: '1em',
  },
  '@media (max-width:400px)': {
    fontSize: '0.85em'
  },
};

export const textStructure = {
  fontFamily: font,
  fontSize: '1em',
  fontWeight: 700,
  color: '#f1e6ff',
  textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
  '@media (max-width:1400px)': {
    fontSize: '0.9rem',
  },
  '@media (max-width:800px)': {
    fontSize: '0.85rem',
  },
  '@media (max-width:400px)': {
    fontSize: '0.7rem'
  },
};

export const headLineStructure = {
  fontSize: '4.5em',
  lineHeight: 1.1,
  '@media (max-width: 1400px)': {
    fontSize: '3.5em',
  },
  '@media (max-width: 800px)': {
    fontSize: '3em',
  },
  '@media (max-width: 400px)': {
    fontSize: '2.5em',
  },
}

export const cardStructure = {
  sx: {
    gap: 3,
    width: '30%',
    height: '20%',
    padding: '0.5em',
    background: 'linear-gradient(135deg, rgba(215, 184, 5, 0.6), rgba(255, 235, 100, 0.15))',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: '1.25em',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'linear-gradient(135deg, rgba(235, 200, 20, 0.8), rgba(255, 245, 160, 0.25))',
      transform: 'translateY(-3px)',
      boxShadow: '0 14px 35px rgba(0, 0, 0, 0.45)',
    },
    '@media (max-width:1400px)': {
      flexDirection: 'column',
      height: '12%',
      width: '90%',
      padding: '1em',
      gap: 2,
    },
    '@media (max-width:800px)': {
      width: '100%',
      height: '15%',
      padding: '0.75em',
      gap: 1,
    },
    '@media (max-width:400px)': {
      padding: '0.3em',
      gap: 0.5,
      height: '20%',
      width: '90%',
    },
  }
}

export const dividerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  mx: 1,
}

export const landingPageCardsBoxStyle = {
  sx: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-start',
    width: '150%',

    '@media (max-width: 1400px)': {
      flexDirection: 'column',
      alignItems: 'center',
      width: '120%',
      gap: 9,
    },

    '@media (max-width: 800px)' : {
      flexDirection: 'column',
      alignItems: 'center',
      width: '70%',
      gap: 5,
    },

    '@media (max-width: 400px)' : {
      width: '100%'
    },
  }
}

export const landingPageBackgroundStyle = {
  height: '85vh',
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1em',
  px: 2,
  boxSizing: 'border-box'
}

export const landingPageButtonSetStructure = {
  sx: {
    display: 'flex',
    gap: '4em',
    mt: 1,
    justifyContent: 'center',
    flexShrink: 0,

    '@media (max-width:1400px)': {
      flexDirection: 'column',
      gap: '2em',
    },
    '@media (max-width:800px)': {
      gap: '1.25em',
      width: 'auto',
      marginBottom: '2rem'
    },
    '@media (max-width:400px)': {
      gap: '1em',
      marginBottom: '1.5rem',
    },
  }
}

export const landingPageButtonStyle: ButtonProps = {
  ...buttonStructure,
  sx: {
    ...buttonStructure.sx,
    width: '15em',
    fontSize: '1em',
    fontWeight: 800,
    '@media (max-width:1400px)': {
      width: '12rem',
      fontSize: '0.9rem',
    },
    '@media (max-width:800px)': {
      fontSize: '0.85rem'
    },
    '@media (max-width:400px)': {
      fontSize: '0.75rem',
      width: '10rem',
      height: '2em',
    },
  },
};

export const pagingArrowsStructure = {
  sx: {
    backgroundColor: buttonColor,
    width: '1.875em',
    height: '1.875em',
    '&:hover': {
      backgroundColor: buttonHoverColor
    },
    '&:disabled': {
      backgroundColor: 'gray'
    },
    '@media (max-width:1400px)': {
      width: '1.5em',
      height: '1.5em',
    },
    '@media (max-width:800px)': {
      width: '1.25em',
      height: '1.25em',
    },
    '@media (max-width:400px)': {
      width: '1em',
      height: '1em',
    },
  }
}
