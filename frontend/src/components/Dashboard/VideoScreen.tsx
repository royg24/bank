import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SCRIPT_ID = 'jitsi-script';
let scriptPromise: Promise<void> | null = null;

const loadJitsi = (): Promise<void> => {
  if (document.getElementById(SCRIPT_ID)) {
    return Promise.resolve()
  };

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://8x8.vc/vpaas-magic-cookie-e40425a2cbf64723ad178eb4aad8c75e/external_api.js';
      script.async = true;
      script.id = SCRIPT_ID;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
};

function VideoScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const navigate = useNavigate();
  const email = localStorage.getItem('email') || 'Guest';
  const room = `Room ${Cookies.get('room')}`;

  useEffect(() => {
    loadJitsi().then(() => {
      if (!containerRef.current || apiRef.current) {
        return
      };

      const api = new (window as any).JitsiMeetExternalAPI('8x8.vc', {
        roomName: `vpaas-magic-cookie-e40425a2cbf64723ad178eb4aad8c75e/${room}`,
        parentNode: containerRef.current,
        userInfo: { displayName: email },
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        },
      });

      api.addEventListener('readyToClose', () => {
        api.dispose();
        navigate('/dashboard');
      });

      apiRef.current = api;
    });

    return () => {
      apiRef.current?.dispose();
      apiRef.current = null;
    };
  }, [email, navigate]);

  return <div ref={containerRef} style={{ height: '100vh' }} />;
}

export default VideoScreen;
