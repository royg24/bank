import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

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
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (!token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io('http://localhost:3000', {
      auth: { token },
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [token]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
