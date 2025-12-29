import React, { createContext, useContext, useEffect, useState } from 'react';
import { socketService } from '../services/socketService';

type PresenceContextType = {
  onlineUsers: string[];
  typingUsers: string[];
};

const PresenceContext = createContext<PresenceContextType>({
  onlineUsers: [],
  typingUsers: [],
});

export const PresenceProvider: React.FC<{
  userId: string;
  children: React.ReactNode;
}> = ({ userId, children }) => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    socketService.connect(userId);

    socketService.on('user-online', ({ userId }) => {
      setOnlineUsers(prev => [...new Set([...prev, userId])]);
    });

    socketService.on('user-offline', ({ userId }) => {
      setOnlineUsers(prev => prev.filter(id => id !== userId));
    });

    socketService.on('typing-start', ({ from }) => {
      setTypingUsers(prev => [...new Set([...prev, from])]);
    });

    socketService.on('typing-stop', ({ from }) => {
      setTypingUsers(prev => prev.filter(id => id !== from));
    });

    return () => {
      socketService.disconnect();
    };
  }, [userId]);

  return (
    <PresenceContext.Provider value={{ onlineUsers, typingUsers }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresenceContext = () => useContext(PresenceContext);