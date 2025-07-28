import { useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function VideoScreen() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const apiRef = useRef<any>(null);
  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    const loadJitsiScript = () => {
      const existingScript = document.getElementById('jitsi-script');
      if (existingScript) return Promise.resolve();

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'http://localhost:8000/external_api.js';
        script.async = true;
        script.id = 'jitsi-script';
        script.onload = () => resolve();
        script.onerror = () => reject('Failed to load Jitsi script');
        document.body.appendChild(script);
      });
    };

    loadJitsiScript()
      .then(() => {
        if (containerRef.current && (window as any).JitsiMeetExternalAPI) {
          const domain = 'localhost:8000';
          const options = {
            roomName: 'banker-call',
            parentNode: containerRef.current,
            width: '100%',
            height: '100%',
            userInfo: {
              displayName: email,
            },
          };

          apiRef.current = new (window as any).JitsiMeetExternalAPI(domain, options);

          apiRef.current.addEventListener('readyToClose', () => {
            navigate('/dashboard');
          });
        }
      })
      .catch(console.error);

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
      }
    };
  }, [email, navigate]);

  const handleEndCall = () => {
    if (apiRef.current) {
      apiRef.current.dispose();
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
      <Button
        onClick={handleEndCall}
        variant="contained"
        color="error"
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        End Call
      </Button>
    </div>
  );
}

export default VideoScreen;
