import io from 'socket.io-client';
import { map } from './util';

const socket = io('localhost:3000/client');
socket.on('connect', () => console.log('Connesso al server!'));

const slider = document.querySelector('input');
let lastPos = 0;

setInterval(() => {
  const position = map(slider.value, 0, 1000, 1, 0);
  if (position === lastPos) return;
  lastPos = position;

  console.log('invio posizione', position);
  socket.emit('movePaddle', {
    side: 'left',
    position,
  });
}, 100);
