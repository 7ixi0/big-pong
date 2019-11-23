const io = require('socket.io')();

let gameRunning = false;

io.on('connect', socket => {
  console.log('Socket connesso!');

  // Role è uno di: display, waiting, player
  // display: il display del gioco
  // waiting: controller in attesa di giocare
  // player: controller in partitata 
  let role = '';

  socket.on('join', data => {
    console.log('join', data);
    switch (data.role) {
      case 'display':
        console.log('Display registrato!');
        role = 'display';
        break;

      case 'controller':
        console.log('Giocatore connesso!');
        role = gameRunning ? 'wating' : 'player';
        break;
    }

    socket.join(role);
  });

  // pacchetto per spostare una paletta
  // formato: { side: 'left', position: 0.35 }
  // side: è 'left' o 'right' e si riferisce alla paletta da spostare
  // position è la posizione a cui spostare il paletto, normalizzata (da 0 a 1)
  socket.on('movePaddle', (data) => {
    console.log(role, data);
    if (role !== 'player') return;

    console.log(data);
    io.to('display').volatile.emit('movePaddle', data);
  });
});

io.listen(3000);
