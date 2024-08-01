export function variable(ctx: CanvasRenderingContext2D) {
  const centerX = ctx.canvas.width / 2;
  const centerY = ctx.canvas.height / 2;

  const sizeCastle = centerX * 0.5;
  const squareX = centerX / 2 - sizeCastle / 2;
  const squareY = centerY / 2.4 - sizeCastle;

  const sizeCoinJump = centerX * 0.06;
  
  return {
    centerX,
    centerY,
    sizeCastle,
    squareX,
    squareY,
    sizeCoinJump,
  };
}
