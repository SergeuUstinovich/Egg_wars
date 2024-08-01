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
    position.x >= centerX + 40 &&
    position.x <= centerX + size - 40;
  const inYRange =
    position.y >= centerY &&
    position.y <= centerY + size - 30;
  return inXRange && inYRange;
}




  
  

