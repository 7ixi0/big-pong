import io from 'socket.io-client';
import { resizeCanvas, map } from "./util";
import { Ball } from "./ball";
import { Paddle, paddleSize } from "./paddle";
import { MiddleLine } from './middleLine';
import { PointsCounter } from './pointsCounter';

const socket = io('localhost:3000');
socket.on('connect', () => {
  socket.emit('join', {
    role: 'display',
  });
  console.log('Connesso al server!');
});

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
const middleLine = new MiddleLine();
const counter = new PointsCounter();

// loop per aggiornare lo stato di gioco
function update() {
  ball.checkLeftPaddle(leftPaddle);
  ball.checkRightPaddle(rightPaddle);
  ball.update();
  // ball.checkBounds();
  ball.checkTopBottomWalls();

  if (ball.checkRightWall())
    counter.scoreLeft();

  if (ball.checkLeftWall())
    counter.scoreRight();

  const winner = counter.checkWin();
  if (winner !== null) {
    console.log(`Ha vinto: ${winner} `);
  }
}

// loop per renderizzare il gioco nello statao corrente
function render() {
  // Pulisci lo schermo
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, gameScreen.width, gameScreen.height);

  // Rendring
  ctx.fillStyle = '#fff';
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 10;
  ctx.font = '100px Monospace';
  ctx.textAlign = "center";

  middleLine.render(ctx);
  leftPaddle.render(ctx);
  rightPaddle.render(ctx);
  ball.render(ctx);
  counter.render(ctx);
}

socket.on('movePaddle', ({ side, position }) => {
  console.log('ricevuta posizione', side, position);
  const pos = map(position, 0, 1, paddleSize.h / 2, gameScreen.height - paddleSize.h / 2);
  switch (side) {
    case 'left':
      leftPaddle.setPosition(pos);
      break;

    case 'right':
      rightPaddle.setPosition(pos);
      break;
  }
});

function gameLoop(time = 0) {
  requestAnimationFrame(gameLoop);
  update();
  render();
}
requestAnimationFrame(gameLoop);
