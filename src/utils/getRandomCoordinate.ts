export function getRandomCoordinate(max: number) {
    return Math.random() * max;
}

export function generateRandomPosition(minX:number, maxX:number, minY:number, maxY:number) {
    const randomX = getRandomCoordinate(maxX - minX) + minX;
    const randomY = getRandomCoordinate(maxY - minY) + minY;
      return { x: randomX, y: randomY };
}