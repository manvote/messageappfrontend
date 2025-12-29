import { usePresenceContext } from '../context/PresenceContext';
import { socketService } from '../services/socketService';

export const usePresence = () => {
  const { onlineUsers, typingUsers } = usePresenceContext();

  const isOnline = (userId: string) => onlineUsers.includes(userId);
  const isTyping = (userId: string) => typingUsers.includes(userId);

  const startTyping = (toUserId: string) => {
    socketService.emit('typing', { to: toUserId });
  };

  const stopTyping = (toUserId: string) => {
    socketService.emit('stop-typing', { to: toUserId });
  };

  return {
    onlineUsers,
    typingUsers,
    isOnline,
    isTyping,
    startTyping,
    stopTyping,
  };
};