import io from 'socket.io-client';

export const socket = io(window.location.hostname + ":3000");
socket.on('connect', () => {
  socket.emit('join', {
    role: 'display',
  });
  console.log('Connesso al server!');
});
