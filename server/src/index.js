const io = require('socket.io')();
const GameQueue = require('./gameQueue');

const gameQueue = new GameQueue(io);
gameQueue.on('newPlayer', () => console.log(`${gameQueue.lenght} giocatori connessi`));

io.on('connect', socket => {
  console.log('Socket connesso!');

  const registerDisplay = () => {
    console.log('Display registrato!');
    socket.join('display');
  };

  const registerPlayer = () => {
    console.log('Giocatore registato!');
    socket.join('waiting');
    gameQueue.addToQueue(socket.id);
    socket.on('disconnect', () => gameQueue.removeId(socket.id));
  };

  socket.on('join', ({ role }) => {
    console.log('> join', role);
    switch (role) {
      case 'display':
        registerDisplay();
        break;
      case 'controller':
        registerPlayer();
        break;
    }
  });
});

gameQueue.on('gameReady', ([player1, player2]) => {
  console.log('Inizio gioco!');

  const join = (player) => {
    player.leave('waiting');
    player.join('playing');
  };

  const leave = player => player.disconnect(true);

  /*
  pacchetto per spostare una paletta
  formato: { side: 'left', position: 0.35 }
  side: è 'left' o 'right' e si riferisce alla paletta da spostare
  position è la posizione a cui spostare il paletto, normalizzata (da 0 a 1)
  */

  // inoltra i pacchetti dai controller al display
  const fowardPackets = socket =>
    socket.on('movePaddle', (data) => {
      io.to('display').volatile.emit('movePaddle', data);
    });

  const abort = () => {
    leave(player1);
    leave(player2);
    gameQueue.abortGame();
  };

  const setup = player => {
    join(player);
    fowardPackets(player);
    player.on('disconnect', () => {
      console.log('Un giocatore ha abbandonato. Termino partita.');
      abort();
    });
  }

  setup(player1);
  setup(player2);
});

io.listen(3000);
