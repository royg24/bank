import { Button } from '@mui/material';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { googleButtonStructure } from '../../css/Style';
import { useMode } from '../../context/ModeProvider.js';

const GoogleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG paths omitted for brevity */}
    <path fill="#4285F4" d="M9 3.48c1.69 0 2.89.73 3.57 1.34l2.62-2.52C13.98.89 12.11 0 9 0 5.48 0 2.44 2.03 1.33 4.93l3.05 2.37C5.32 5.05 7 3.48 9 3.48z"/>
    <path fill="#34A853" d="M17.64 9.2c0-.63-.06-1.25-.18-1.84H9v3.48h4.84a4.15 4.15 0 01-1.8 2.73v2.26h2.9c1.7-1.56 2.68-3.87 2.68-6.63z"/>
    <path fill="#FBBC05" d="M4.38 10.65a5.41 5.41 0 010-3.3V4.99H1.33a8.99 8.99 0 000 8.04l3.05-2.38z"/>
    <path fill="#EA4335" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.31 0-4.27-1.56-4.97-3.67H1.33v2.3A8.99 8.99 0 009 18z"/>
  </svg>
);

type GoogleJWT = {
  sub: string;
  email: string;
  name?: string;
};

type GoogleButtonProps = {
  onGoogleSubmit: (data: GoogleJWT, type: string) => void;
};

declare global {
  interface Window {
    google?: any;
  }
}

const GoogleButton = ({ onGoogleSubmit }: GoogleButtonProps) => {
  const clientRef = useRef<any>(null);
  const { mode } = useMode();

  const googleText = mode ? 'Sign up with Google' : 'Continue with Google';

  useEffect(() => {
    if (window.google) {
      clientRef.current = window.google.accounts.oauth2.initTokenClient({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        callback: async (response: any) => {
          try {
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
              },
            }).then(res => res.json());

            onGoogleSubmit(userInfo, 'google');
          } catch (e) {
            toast.error('Failed to fetch Google user info');
          }
        },
      });
    }
  }, [mode]);

  const handleGoogleClick = () => {
    if (clientRef.current) {
      clientRef.current.requestAccessToken();
    } else {
      toast.error('Google login not initialized');
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={handleGoogleClick}
      sx={googleButtonStructure}
      startIcon={<GoogleIcon />}
    >
      {googleText}
    </Button>
  );
};

export default GoogleButton;
