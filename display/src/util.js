// Ridimensiona il canvas per riempiere più spazio possibile sullo schermo
export function resizeCanvas(ctx, gameScreen) {
  const scale = Math.min(window.innerWidth / gameScreen.width, window.innerHeight / gameScreen.height);
  ctx.canvas.width = gameScreen.width * scale;
  ctx.canvas.height = gameScreen.height * scale;
  ctx.scale(scale, scale);
}

export const radians = (deg) => Math.PI / 180 * deg;
export const degrees = (rad) => 180 / Math.PI * rad;

export const map = (n, in_min, in_max, out_min, out_max) =>
  (n - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;

export function limit(n, min, max) {
  if (n < min)
    return min;
  if (n > max)
    return max;
  return n;
}
