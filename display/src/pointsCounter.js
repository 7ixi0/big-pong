import { gameScreen } from "./main";

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
    if (this.leftPoints >= this.winPoins) {
      this.reset();
      return 'left';
    }
    if (this.rightPoints >= this.winPoins) {
      this.reset();
      return 'right';
    }

    return null;
  }

  render(ctx) {
    ctx.fillText(this.leftPoints, gameScreen.width / 4, 100);
    ctx.fillText(this.rightPoints, gameScreen.width * (3 / 4), 100);
  }
}
