import { socket } from "./socket";
import { resizeCanvas, map } from "./util";
import { Ball } from "./ball";
import { Paddle, paddleSize } from "./paddle";
import { MiddleLine } from './middleLine';
import { PointsCounter } from './pointsCounter';
import { GameStatus } from "./gameStatus";

// Crea canvas e context
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
const leftPaddle = new Paddle(50, gameScreen.height / 2);
const rightPaddle = new Paddle(gameScreen.width - 50, gameScreen.height / 2);
const ball = new Ball(gameScreen.width / 2, gameScreen.height / 2);
const middleLine = new MiddleLine();

const gameStatus = new GameStatus();
const counter = new PointsCounter();

function cancelGame() {
  gameStatus.gameRuninng = false;
  leftPaddle.y = gameScreen.height / 2;
  rightPaddle.y = gameScreen.height / 2;

  ball.reset();
  counter.reset();
}

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

  const winData = counter.checkWin();
  if (winData) {
    gameStatus.endGame(winData);
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

  if (socket.disconnected) {
    ctx.fillStyle = '#D00';
    ctx.fillText('NON CONNESSO!', gameScreen.width / 2, gameScreen.height / 2);
  } else if (!gameStatus.gameRuninng) {
    ctx.fillStyle = '#0DD';
    ctx.fillText('Attendo giocatori', gameScreen.width / 2, gameScreen.height / 2);

    if (gameStatus.lastWinner) {
      const side = gameStatus.lastWinner === 'left' ? 'sinistra' : 'destra';
      ctx.font = '45px Monospace';
      ctx.fillStyle = '#0D0'
      ctx.fillText(`Ha vinto il giocatore a ${side}`, gameScreen.width / 2, gameScreen.height / 2 - 100);
    }
  }
}

socket.on('movePaddle', ({ side, position }) => {
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

socket.on('endGame', () => {
  gameStatus.lastWinner = ''; // cancella la scritta piccola
  cancelGame();
});

function gameLoop(time = 0) {
  requestAnimationFrame(gameLoop);
  if (gameStatus.gameRuninng)
    update();
  render();
}
requestAnimationFrame(gameLoop);
