import { gameScreen } from "./main";
import { socket } from "./socket";

export class PointsCounter {
  constructor(winPoins = 3) {
    this.winPoins = winPoins;
    this.reset();
  }

  reset() {
    this.leftPoints = 0;
    this.rightPoints = 0;
  }

  scoreLeft() {
    console.log('punto left!');
    this.leftPoints++;
  }

  scoreRight() {
    console.log('punto right!');
    this.rightPoints++;
  }

  checkWin() {
    let winner = '';
    if (this.leftPoints >= this.winPoins)
      winner = 'left';
    if (this.rightPoints >= this.winPoins)
      winner = 'right';
    if (!winner) return;

    console.log('vittoria', winner);
    socket.emit('endGame', {
      winner,
      points: {
        left: this.leftPoints,
        right: this.rightPoints,
      },
    });
    this.reset();
  }

  render(ctx) {
    ctx.fillText(this.leftPoints, gameScreen.width / 4, 100);
    ctx.fillText(this.rightPoints, gameScreen.width * (3 / 4), 100);
  }
}
