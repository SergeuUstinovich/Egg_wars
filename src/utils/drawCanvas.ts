import { generateRandomPosition } from "./getRandomCoordinate";


export function getCanvasSize(canvas: HTMLCanvasElement): {
  width: number;
  height: number;
} {
  return { width: canvas.width, height: canvas.height };
}


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

export function addCircle(speedRun: number, canvasW: number, canvasH: number) {
  const randomSide = Math.random();

  // Если число меньше 0.5, генерируем позицию по левой стороне экрана, иначе - по правой
  // первый варик
  const position =
    randomSide < 0.5
      ? generateRandomPosition(30, 90, canvasH / 0.9, canvasH / 1.25 + 300)
      : generateRandomPosition(
          canvasW - 30,
          canvasW - 90,
          canvasH / 0.9,
          canvasH / 1.25 + 300
        );
  // второй варик с высотой
  // const position =
  //   randomSide < 0.5
  //     ? generateRandomPosition(
  //         30,
  //         90,
  //         canvasH / 7,
  //         canvasH / 2 + 300
  //       )
  //     : generateRandomPosition(
  //         canvasW - 30,
  //         canvasW - 90,
  //         canvasH / 7,
  //         canvasH / 2 + 300
  //       );
  // третий варик
  // const position = generateRandomPosition(30, canvasW - 30, canvasH / 1.6, canvasH - 100);

  const dx = (canvasW / 1 - position.x) / speedRun;
  const dy = (canvasH / 1.25 - position.y) / speedRun;

  return { ...position, dx, dy };
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
    position.x >= centerX / 1 - size / 1 &&
    position.x <= centerX / 2.5 + size / 2.5;
  const inYRange =
    position.y >= centerY / 2 - size && position.y <= centerY / 2;
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
  energy: number,
  maxEnergy: string
) {
  ctx.textAlign = "center";
  ctx.font = `${sizeText}px PassionOne`;
  ctx.fillStyle = "black";
  ctx.fillText(`${energy} / ${maxEnergy}`, textX, textY);
}
