const io = require('socket.io')();
const GameQueue = require('./gameQueue');

const gameQueue = new GameQueue(io);
gameQueue.on('newPlayer', () => console.log(`${gameQueue.lenght} giocatori in coda`));

// se la partita è terminata con un vincitore, data ha questa forma
// { winner: 'right', leftPoints: 2, rightPoints: 3 }
// se la partita è stata cancellata data ha questa forma: {}
const endGame = (data) => {
  io.to('playing').emit('endGame', data);
  gameQueue.endGame();
};

io.on('connect', socket => {
  console.log('Socket connesso!');

  const registerDisplay = () => {
    console.log('Display registrato!');
    socket.join('display');

    socket.on('endGame', data => {
      console.log('> endGame', data);
      endGame(data);
    });
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

  /*
  pacchetto per spostare una paletta
  formato: { side: 'left', position: 0.35 }
  side: è 'left' o 'right' e si riferisce alla paletta da spostare
  position è la posizione a cui spostare il paletto, normalizzata (da 0 a 1)
  */

  // inoltra i pacchetti dai controller al display
  const fowardPackets = (socket, side) =>
    socket.on('movePaddle', ({ position }) => {
      io.to('display').volatile.emit('movePaddle', { side, position });
    });

  const abort = () => {
    endGame();
    gameQueue.endGame();
    io.to('display').emit('endGame');
  };

  const setup = (player, side) => {
    join(player);
    fowardPackets(player, side);
    player.emit('startGame', { side });
    player.on('disconnect', () => {
      console.log('Un giocatore ha abbandonato. Termino partita.');
      abort();
    });
  }

  setup(player1, 'left');
  setup(player2, 'right');
  io.to('display').emit('startGame');
});

io.listen(3000);
