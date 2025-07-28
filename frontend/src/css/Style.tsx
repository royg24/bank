import type { TextFieldProps, ButtonProps, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';

const color = 'white';
const buttonColor = "rgba(156, 133, 3, 1)";
const buttonHoverColor = "rgba(93, 84, 33, 1)";
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
          '@media (max-width:1200px)': {
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
          '@media (max-width:1200px)': {
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
          '@media (max-width:1200px)': {
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
          '@media (max-width:1200px)': {
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
          '@media (max-width:1200px)': {
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
    justifySelf: 'center',
    gap: '0.8em',
    width: '30%',
    maxWidth: '37.5em',
    padding: '2.5em',
    backgroundColor: 'rgba(154, 136, 136, 0.195)',
    borderRadius: '0.9375em',
    boxShadow: '0 8px 24px rgb(0, 0, 0)',

    '@media (max-width:1200px)': {
      width: '40%',
      maxWidth: 'none',
      padding: '2em',
    },
    '@media (max-width:800px)': {
      width: '70%',
      padding: '1.25em',
      gap: '1em',
    },
    '@media (max-width:400px)': {
      width: '80%',
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

    '@media (max-width:1200px)': {
      width: '80%',
      maxWidth: 'none',
      padding: '2em',
    },
    '@media (max-width:800px)': {
      width: '50%',
      padding: '1.25em',
      gap: '1em',
    },
    '@media (max-width:400px)': {
      padding: '1em',
      gap: '0.75em',
    },
  };
}

export const fieldStructure : TextFieldProps = {
  variant: 'outlined',
  margin: 'normal',
  fullWidth: true,
  size: 'small',
  sx: {
    fontSize: '1.1rem',
    '@media (max-width: 1200px)': {
      fontSize: '1rem',
    },
    '@media (max-width: 800px)': {
      fontSize: '0.9rem',
    },
    '@media (max-width: 400px)': {
      fontSize: '0.8rem',
    },
  },
};

export const verifyFieldStructure = {
  sx: {
    backgroundColor: 'rgba(226, 207, 207, 0.32)',
    width: '4.5em',
    height: '4.5em',
    '& .MuiInputBase-input': {
      fontSize: '3.75em',
      textAlign: 'center' as CSSProperties['textAlign'],
      color: 'rgb(3, 27, 45)',
      padding: 0,
      '@media (max-width: 1200px)': {
        fontSize: '3em',
      },
      '@media (max-width: 800px)': {
        fontSize: '2.2em',
      },
      '@media (max-width: 400px)': {
        fontSize: '1.8em',
      },
    },
    '@media (max-width: 1200px)': {
      width: '4em',
      height: '4em',
    },
    '@media (max-width: 800px)': {
      width: '3em',
      height: '3em',
    },
    '@media (max-width: 400px)': {
      width: '2.5em',
      height: '2.5em',
    },
  },
  inputProps: {
    maxLength: 1,
    inputMode: 'numeric' as const,
    pattern: '[0-9]*',
    'aria-label': 'Verification digit',
  },
};

export const buttonStructure : ButtonProps = {
  variant: 'contained',
  sx: {
    backgroundColor: buttonColor,
    color: 'white',
    width: '50%',
    fontSize: '1rem',
    marginTop: '1em',
    '&:hover': {
      backgroundColor: buttonHoverColor,
    },
    '@media (max-width: 1200px)': {
      width: '60%',
      fontSize: '0.9rem',
    },
    '@media (max-width: 800px)': {
      width: 'inherit',
      fontSize: '0.85rem',
    },
    '@media (max-width: 400px)': {
      width: '50%',
      fontSize: '0.75rem',
    },
  },
};

export const googleButtonStructure: ButtonProps['sx'] = {
  backgroundColor: 'rgb(32, 33, 36)',
  color: 'white',
  fontWeight: 700,
  fontSize: '0.7rem',
  fontFamily: 'Arial',
  width: '50%',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'rgba(64, 65, 68, 1)',
  },
  '@media (max-width: 1200px)': {
    width: 'inherit',
    fontSize: '0.5rem',
  },
  '@media (max-width: 800px)': {
    width: 'inherit',
    fontSize: '0.75rem',
  },
  '@media (max-width: 400px)': {
    width: '50%',
    fontSize: '0.4rem',
  },
};

export function toggleGroupStructure(mode: boolean): ToggleButtonGroupProps {
  return {
    value: mode,
    exclusive: true,
    sx: {
      height: '3em',
      width: '31.25em',
      margin: '0 auto',
      position: 'relative',
      top: '5%',
      backgroundColor: 'rgba(225, 224, 224, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width:1200px)': {
        width: '90%',
        height: '3.25em',
        top: '3%',
      },
      '@media (max-width:800px)': {
        width: '20rem',
        height: '3em',
        top: '2%',
      },
      '@media (max-width:400px)': {
        width: '20rem',
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
      '@media (max-width:1200px)': {
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
  fontSize: '1.1em',
  color: 'white',

  '@media (max-width:1200px)': {
    fontSize: '0.9em',
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
  fontSize: '0.95em',
  fontWeight: 700,
  color: '#f1e6ff',
  '@media (max-width:1200px)': {
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
  '@media (max-width: 1200px)': {
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
  }
}

export const dashboardCardStrucutre = {
  sx: {
    ... cardStructure.sx,
    gap: 3,
    width: '150%',
    height: '20%',
    padding: '0.2em',
    justifySelf: 'center',

      '@media (max-width:1200px)': {
      flexDirection: 'row',
      height: '12%',
      width: '100%',
      padding: '1em',
      gap: 2,
    },
    '@media (max-width:800px)': {
      flexDirection: 'column',
      marginTop: '4em',
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
  }, 
}

export const landingCardStructure = {
  sx: {
    ... cardStructure.sx,
    gap: 3,
    width: '30%',
    height: '20%',
    padding: '0.3em',

      '@media (max-width:1200px)': {
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
  }, 
}

export const transactionCardStructure = {
  sx: {
    ...cardStructure.sx,
    width: '60em',
    height: 'auto',
    gap: '1em',
    fontSize: '0.8em',
    padding: '0.7em',

    '@media (max-width:1200px)': {
      width: '90%',
      height: 'auto',
      gap: '0.8em',
      padding: '1em',
      fontSize: '0.75em',
    },
    '@media (max-width:800px)': {
      width: '70%',
      padding: '0.8em',
      gap: '0.6em',
      fontSize: '0.7em',
      flexDirection: 'column',
    },
    '@media (max-width:400px)': {
      padding: '0.5em',
      gap: '0.4em',
      fontSize: '0.65em',
    },
  },
};

export const cardsContainerStructure = {
  sx: {
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    paddingTop: '0.3em',
    backgroundColor: 'transparent',
    alignItems: 'center',

    '@media (max-width:1200px)': {
      gap: '0.8em',
      paddingTop: '0.4em',
      width: '90%',
      backgroundColor: 'transparent',
    },
    '@media (max-width:800px)': {
      gap: '0.6em',
      paddingTop: '0.5em',
      width: '100%',
      backgroundColor: 'transparent',
      alignItems: 'center',
    },
    '@media (max-width:400px)': {
      gap: '0.4em',
      paddingTop: '0.6em',
      backgroundColor: 'transparent',
    },
  },
};

export const logoutStyle = {
  sx: {
    position: 'absolute',
    top: '1em',
    right: '-4em',
    width: '18em',

    '@media (max-width:1200px)': {
      right: '3em',
      width: '8em',
    },
    '@media (max-width:800px)': {
      right: '1em',
      width: '6em',
    },
    '@media (max-width:400px)': {
      right: '3em',
      width: '4em',
    },
  },
};


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

    '@media (max-width: 1200px)': {
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
      width: '100%',
      gap: 3,
    },
  }
}

export const dividerStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  mx: 1,
  '@media (max-width:800px)': {
    mx: 0,
    my: 1,
    height: '1px',
    width: '100%',
  },
  '@media (min-width:801px)': {
    my: 0,
    height: 'auto',
    width: '1px',
  },
};

export const landingPageBackgroundStyle = {
  height: '85%',
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
    justifyContent: 'center',
    flexShrink: 0,

    '@media (max-width:1200px)': {
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
    '@media (max-width:1200px)': {
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
    '@media (max-width:1200px)': {
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
