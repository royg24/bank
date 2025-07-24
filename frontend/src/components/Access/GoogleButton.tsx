import { Box } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import * as jwt_decode from 'jwt-decode';

type GoogleButtonProps = {
  textContent: boolean;
  onGoogleSubmit: (data: any, type: string) => void;
};

type GoogleJWT = {
  sub: string;
  email: string;
  name?: string;
};

const GoogleButton = ({ textContent, onGoogleSubmit }: GoogleButtonProps) => {
  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        mt: '1em',
        '@media (max-width: 1400px)': {
          width: '100%',
        },
        '@media (max-width: 800px)': {
          width: '100%',
        },
        '@media (max-width: 400px)': {
          width: '100%',
        },
        '& > div': {
          width: '100% !important',
          display: 'flex',
          justifyContent: 'center',
        },
        '& iframe': {
          width: '100% !important',
          minWidth: '100% !important',
          maxWidth: '100% !important',
        },
      }}
    >
      <GoogleLogin
        theme="filled_black"
        text={textContent ? 'signup_with' : 'continue_with'}
        onSuccess={(credentialResponse) => {
          const token = credentialResponse.credential;
          if (token) {
            const user = jwt_decode.jwtDecode<GoogleJWT>(token);
            onGoogleSubmit(user, 'google');
          }
        }}
        onError={() => {
          toast.error('An error occurred while logging in with Google. Please try again.');
        }}
        useOneTap
      />
    </Box>

  );
};

export default GoogleButton;
