import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {toast} from 'react-toastify';
import * as jwt_decode from 'jwt-decode';

type GoogleButtonProps = {
  textContent: boolean;
  onGoogleSubmit: (data: any, type: string) => void;
};

type GoogleJWT = {
  sub: string;
  email: string;
  name?: string;
}

const GoogleButton = ({ textContent, onGoogleSubmit }: GoogleButtonProps) => {
  const [buttonWidth, setButtonWidth] = useState(280);

  useEffect(() => {
    function handleResize() {
      const vw = window.innerWidth;
      const width = Math.min(300, Math.max(200, vw * 0.4));
      setButtonWidth(width);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <GoogleLogin
        width={Math.floor(buttonWidth)}
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
          console.error('Login Failed');
          toast.error('An error occurred while logging in with Google. Please try again.');
        }}
        useOneTap
      />
    </div>
  );
};

export default GoogleButton;
