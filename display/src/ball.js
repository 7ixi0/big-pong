import { radians, map, limit } from "./util";
import { gameScreen } from "./main";

export class Ball {
  constructor(x = 0, y = 0, angle = radians(30)) {
    // Punto di riferimento centrale
    this.x = x;
    this.y = y;
    this.r = 25;
    this.speed = 5;

    this.setAngle(angle);
  }

  setAngle(angle) {
    this.xSpeed = this.speed * Math.cos(angle);
    this.ySpeed = this.speed * Math.sin(angle);
  }

  checkLeftPaddle(p) {
    if (this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x - this.r < p.x + p.w / 2) {

      if (this.x > p.x) {
        const diff = this.y - (p.y - p.h / 2);
        const rad = radians(45);
        const angle = map(diff, 0, p.h, -rad, rad);
        this.setAngle(angle);
        this.x = p.x + p.w / 2 + this.r;
      }

    }
  }

  checkRightPaddle(p) {
    if (this.y - this.r < p.y + p.h / 2 &&
      this.y + this.r > p.y - p.h / 2 &&
      this.x + this.r > p.x - p.w / 2) {

      if (this.x < p.x) {
        const diff = this.y - (p.y - p.h / 2);
        const angle = map(diff, 0, p.h, radians(225), radians(135));
        this.setAngle(angle);
        this.x = p.x - p.w / 2 - this.r;
      }
    }
  }

  reset() {
    this.x = gameScreen.width / 2;
    this.y = gameScreen.height / 2;
  }

  checkBounds() {
    if (this.y < 0 + this.r || this.y > gameScreen.height - this.r) {
      this.ySpeed = -this.ySpeed;
      console.log(this.ySFpeed);
    }

    if (this.x - this.r > gameScreen.width) {
      this.reset();
      console.log('punto left!');
    }

    if (this.x + this.r < 0) {
      this.reset();
      console.log('punto right!');
    }
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.fillRect(this.x, this.y, this.r, this.r);
  }
}
