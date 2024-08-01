export function drawCastle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  img: HTMLImageElement
) {
  ctx.drawImage(img, x, y, size, size);
}


