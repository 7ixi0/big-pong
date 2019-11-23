import io from 'socket.io-client';

export const socket = io('localhost:3000');
socket.on('connect', () => {
  socket.emit('join', {
    role: 'controller',
  });
  console.log('Connesso al server!');
});
