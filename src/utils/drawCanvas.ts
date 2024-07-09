// Функция для получения размера канваса
export function getCanvasSize(canvas: HTMLCanvasElement): { width: number, height: number } {
    return { width: canvas.width, height: canvas.height };
}

// Функция для рисования круга
export function drawCircle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string): void {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
}

// Функция для рисования квадрата
export function drawCastle(context: CanvasRenderingContext2D, x: number, y: number, size: number, imageUrl1: string): void {
    const img = new Image()
    img.src = imageUrl1;
    img.onload = () => {
        context.drawImage(img, x, y, size, size)
    }
}

interface Position {
    x: number;
    y: number;
}

export function isCircleReachedSquare(
    position: Position,
    centerX: number,
    centerY: number,
    size: number): boolean {
    const inXRange = position.x >= centerX / 2 - size / 2 && position.x <= centerX / 2 + size / 2;
    const inYRange = position.y >= centerY / 2 - size && position.y <= centerY / 2;
    return inXRange && inYRange;
};
