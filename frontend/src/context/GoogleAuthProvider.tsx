import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
