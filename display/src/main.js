import { resizeCanvas } from "./util";
import { Ball } from "./ball";
import { Paddle } from "./paddle";

// Creao canvas e context
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Lo schermo ideale sul quale il gioco viene renderizzato
// il canvas viene poi ridimensionato in base allo schermo dove viene poi visualizzato
export const gameScreen = {
  width: 1280,
  height: 720,
};

// Ridimensiona il canvas prima di iniziare il gioco
window.addEventListener('resize', () => resizeCanvas(ctx, gameScreen));
resizeCanvas(ctx, gameScreen);

// oggetti di gioco
const leftPaddle = new Paddle(50, 50);
const rightPaddle = new Paddle(gameScreen.width - 50, 50);
const ball = new Ball(gameScreen.width / 2, gameScreen.height / 2);

// loop per aggiornare lo stato di gioco
function update() {
  ball.checkLeftPaddle(leftPaddle);
  ball.checkRightPaddle(rightPaddle);
  ball.update();
  ball.checkBounds();
}

// loop per renderizzare il gioco nello statao corrente
function render() {
  // Pulisci lo schermo
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);

  // Rendring
  ctx.fillStyle = '#fff';
  leftPaddle.render(ctx);
  rightPaddle.render(ctx);
  ball.render(ctx);
}

// muove palette in base al mouse
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const pos = e.clientY - rect.top;
  leftPaddle.setPosition(pos);
  rightPaddle.setPosition(pos);
});

function gameLoop(time = 0) {
  requestAnimationFrame(gameLoop);
  update();
  render();
}
requestAnimationFrame(gameLoop);
