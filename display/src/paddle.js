import { limit } from "./util";
import { gameScreen } from "./main";

const paddleSize = {
  w: 50,
  h: 300,
};

export class Paddle {
  constructor(x, y) {
    // punto di riferimento centrale
    this.x = x;
    this.y = y;
    this.w = paddleSize.w;
    this.h = paddleSize.h;
  }

  setPosition(y) {
    this.y = limit(y, 0 + this.h / 2, gameScreen.height - this.h / 2);
  }

  render(ctx) {
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
  }
}
