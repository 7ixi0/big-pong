import { gameScreen } from "./main";

export const paddleSize = {
  w: 50,
  h: 300,
};

export class MiddleLine {
  constructor() { }

  render(ctx) {
    ctx.beginPath();
    ctx.setLineDash([17, 30]);
    ctx.moveTo(gameScreen.width / 2, 0);
    ctx.lineTo(gameScreen.width / 2, gameScreen.height);
    ctx.stroke();

    // resetta la linea
    ctx.setLineDash([]);
  }
}
