const io = require('socket.io')();

const clients = io.of('/client');
const display = io.of('/display');

display.on('connection', socket => {
  console.log('Display connesso!');
});

clients.on('connect', socket => {
  console.log('Client connesso!');

  // pacchetto per spostare una paletta
  // formato: { side: 'left', position: 0.35 }
  // side: è 'left' o 'right' e si riferisce alla paletta da spostare
  // position è la posizione a cui spostare il paletto, normalizzata (da 0 a 1)
  socket.on('movePaddle', (data) => display.emit('movePaddle', data));
});

io.listen(3000);

/*
Invia pacchetti di prova per controllare il funzionamento movimento lato display
*/
setInterval(() => {
  const position = (Math.sin(Date.now() * 0.005) + 1) / 2;
  display.emit('movePaddle', {
    side: 'left',
    position,
  })
}, 50);

setInterval(() => {
  const position = (Math.cos(Date.now() * 0.005) + 1) / 2;
  display.emit('movePaddle', {
    side: 'right',
    position,
  })
}, 50);
