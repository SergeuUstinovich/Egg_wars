export function drawCastle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  img: HTMLImageElement
) {
  ctx.drawImage(img, x, y, size, size);
}

// export function drawBtn(
//   ctx: CanvasRenderingContext2D,
//   x: number,
//   y: number,
//   size: number,
//   img: HTMLImageElement,
//   scale: number,
//   progress: number
// ) {
//   // ctx.drawImage(img, x, y, size, size);
//   ctx.save();
//   ctx.translate(x + size / 2, y + size / 2);
//   ctx.scale(scale, scale);
//   ctx.drawImage(img, -size / 2, -size / 2, size, size);
//   ctx.restore();
//   ctx.save();
//   ctx.translate(x + size / 2, y + size / 2);
//   ctx.scale(scale, scale);
//   drawProgressBar(ctx, 0, 0, size / 2.33, progress);
//   ctx.restore();
// }

export function drawTape(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  BgX: number,
  BgY: number,
  sizeBgX: number,
  sizeBgY: number,
  x: number,
  y: number,
  sizeX: number,
  sizeY: number
) {
    // Создаем градиент
    let gradient = ctx.createLinearGradient(
        BgX,
        BgY,
        BgX,
        BgY + sizeBgY
      );
      gradient.addColorStop(0, "#000");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      // Применяем градиент поверх изображения
      ctx.fillStyle = gradient;
      ctx.fillRect(BgX, BgY, sizeBgX, sizeBgX);
      ctx.drawImage(img, x, y, sizeX, sizeY);
}
