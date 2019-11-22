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
  socket.on('movePaddle', (data) => {
    console.log(data);
    display.emit('movePaddle', data)
  });
});

io.listen(3000);
