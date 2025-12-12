import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      // Connect to socket server
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const socketUrl = apiUrl.replace('/api', '').replace('/api/', '');
      const newSocket = io(socketUrl, {
        auth: {
          token: token
        }
      });

      setSocket(newSocket);

      // Emit user connected event when socket connects
      newSocket.on('connect', () => {
        console.log('Connected to socket server with ID:', newSocket.id);
        newSocket.emit('user:connected', user._id);
      });

      // Cleanup on unmount
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user, token]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};