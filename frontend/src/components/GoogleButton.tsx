import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

type GoogleButtonProps = {
  textContent: boolean;
};

const GoogleButton = ({ textContent }: GoogleButtonProps) => {
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GoogleLogin
        width={Math.floor(buttonWidth)}
        theme="filled_black"
        text={textContent ? 'signup_with' : 'continue_with'}
        onSuccess={(credentialResponse) => {
          console.log('Google token:', credentialResponse.credential);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </div>
  );
};

export default GoogleButton;
