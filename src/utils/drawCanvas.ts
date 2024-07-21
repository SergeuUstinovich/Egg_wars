export function drawCircle(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
): void {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fillStyle = color;
  context.fill();
}

interface Position {
  x: number;
  y: number;
}

export function isCircleReachedSquare(
  position: Position,
  centerX: number,
  centerY: number,
  size: number
): boolean {
  const inXRange =
    position.x >= centerX &&
    position.x <= centerX - 20 + size;
  const inYRange =
    position.y >= centerY &&
    position.y <= centerY - 20 + size;
  return inXRange && inYRange;
}

export function drawProgressBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  progress: number
) {
  const startAngle = 1.5 * Math.PI; // начало с верхней части круга
  const progressEndAngle = startAngle - 2 * Math.PI * progress; // конец в зависимости от прогресса

  ctx.beginPath();
  ctx.arc(x, y, size, startAngle, progressEndAngle, true);
  ctx.lineWidth = 10; // ширина полосы
  ctx.strokeStyle = "#1fbcff"; // цвет полосы
  ctx.stroke();
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  sizeText: number,
  textX: number,
  textY: number,
  text: string,
  color: string,
) {
  ctx.textAlign = "center";
  ctx.font = `${sizeText}px PassionOne`;
  ctx.fillStyle = color;
  ctx.fillText(text, textX, textY);
}

export function drawTextTape(
  ctx: CanvasRenderingContext2D,
  sizeText: number,
  textX: number,
  textY: number,
  text: string,
  color: string
) {
  ctx.textAlign = "center";
  ctx.font = `${sizeText}px PassionOne`;
  ctx.strokeStyle = 'black'; 
  ctx.lineWidth = 2; 
  ctx.fillStyle = color;
  ctx.strokeText(text, textX, textY);
  ctx.fillText(text, textX, textY);
}

// export function drawTextCoin(
//   ctx: CanvasRenderingContext2D,
//   sizeText: number,
//   textX: number,
//   textY: number,
//   text: string,
//   color: string,
//   arr: coinJumpProps[]
// ) {
//   arr.forEach((coin, index) => {
//     const elapsedTime = Date.now() - coin.time;
//     const rise = (50 * elapsedTime) / 500;
//     ctx.font = `${sizeText}px PassionOne`;
//     ctx.strokeStyle = 'black'; 
//     ctx.lineWidth = 2; 
//     ctx.fillStyle = color;
//     ctx.strokeText(text, textX, textY - rise);
//     ctx.fillText(text, textX, textY - rise);
//     if (elapsedTime > 500) {
//       setCoinJump((prevCoins) => prevCoins.filter((_, i) => i !== index));
//     }
//   })
// }


  
  

