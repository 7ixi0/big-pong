import io from 'socket.io-client';

export const socket = io('localhost:3000');
socket.on('connect', () => {
  socket.emit('join', {
    role: 'display',
  });
  console.log('Connesso al server!');
});
