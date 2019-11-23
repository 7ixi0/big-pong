import io from 'socket.io-client';

export const socket = io('localhost:3000/client');
socket.on('connect', () => console.log('Connesso al server!'));
