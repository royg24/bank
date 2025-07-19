import {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={String(import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '')}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
