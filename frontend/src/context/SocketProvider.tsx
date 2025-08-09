import React, { createContext, useContext, useEffect, useState } from 'react';

interface SocketContextType {
  socket: any | null; 
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<any | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('accessToken');
    setToken(savedToken);
  }, []);

  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === 'accessToken') {
        setToken(e.newValue);
      }
    }

    window.addEventListener('storage', handleStorage);
    return (
      () => window.removeEventListener('storage', handleStorage)
    );
  }, []);

  useEffect(() => {
    if (!token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    let isMounted = true;
    let newSocket: any;

    (async () => {
      const { io } = await import('socket.io-client');

      if (!isMounted) {
        return
      };

      newSocket = io(import.meta.env.VITE_SOCKET_URI, {
        auth: { token },
        transports: ['websocket'],     
        reconnectionAttempts: 3,          
        timeout: 5000,                    
      });

      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Socket connected:', newSocket.id);
      });

      newSocket.on('connect_error', (err: Error) => {
        console.error('Socket connection error:', err);
      });

      newSocket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    })();

    return () => {
      isMounted = false;
      if (newSocket) {
        newSocket.disconnect();
      }
      setSocket(null);
    };
  }, [token]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
