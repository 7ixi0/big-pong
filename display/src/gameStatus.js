import { socket } from './socket';

export class GameStatus {
  constructor() {
    this.gameRuninng = false;

    socket.on('startGame', () => {
      console.log('Gioco iniziato');
      this.startGame()
    });
  }

  startGame() {
    this.gameRuninng = true;
  }

  endGame({ winner, leftPoints, rightPoints }) {
    this.gameRuninng = false;

    socket.emit('endGame', {
      winner,
      points: {
        left: leftPoints,
        right: rightPoints,
      },
    });
  }
}
