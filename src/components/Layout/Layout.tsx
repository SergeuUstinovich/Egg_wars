import { useState } from "react";
import Canvas from "../Canvas/Canvas";
import style from "./Layout.module.scss";

interface circlePositionProps {
  x: number,
  y: number,
  dx: number,
  dy: number
}

function Layout() {
    const [score, setScore] = useState(0);
    const [numCircles, setNumCircles] = useState(50);
    const [circlePosition, setCirclePosition] = useState<circlePositionProps[]>([]);
    function getRandomCoordinate(max: number) {
        return Math.random() * max;
    }
    const speedRun = 100
    
    function generateRandomPosition() {
      const minX = 50; // Начало области по X
      const maxX = 320; // Конец области по X
      const minY = 300;  // Начало области по Y
      const maxY = 400; // Конец области по Y

    const randomX = getRandomCoordinate(maxX - minX) + minX;
    const randomY = getRandomCoordinate(maxY - minY) + minY;
      return { x: randomX, y: randomY };
    }

    function addCircle() {
      const position = generateRandomPosition();
      const dx = (360 / 2 - position.x) / speedRun;
      const dy = (480 / 2.5 - position.y) / speedRun;
      setCirclePosition((prevPositions) => [...prevPositions, { ...position, dx, dy }]);
    }

    function draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const rectWidth = 100;
    const rectHeight = 100;

    ctx.fillStyle = "blue";

    ctx.fillRect(
      centerX / 2 - rectWidth / 2,
      centerY / 2.5 - rectHeight,
      rectWidth,
      rectHeight
    );

    circlePosition.map((position, index) => {
      position.x += position.dx;
      position.y += position.dy;

      // Проверяем, достиг ли круг квадрата
      if (position.x >= centerX / 2 - rectWidth / 2 && position.x <= centerX / 2 + rectWidth / 2 &&
          position.y >= centerY / 2.5 - rectHeight && position.y <= centerY / 2.5) {
          setScore(prevScore => prevScore + 1);
          setCirclePosition(prevPositions => prevPositions.filter((_, i) => i !== index));
      } else {
          drawCircle(position.x, position.y);
      }
  });

    // Генерируем случайные координаты для кружков
    function drawCircle(x: number, y: number) {
        const circleRadius = 10;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, circleRadius, 0, 2 * Math.PI);
        ctx.fill();
    }
    }

    const handleCircle = () => {
      if (numCircles > 0) {
        addCircle();
        setNumCircles(prev => prev - 1);
    }
    }

  return (
    <>
      <header></header>
      <main className={style.main}>
        <div>{score} Монеты</div>
        <Canvas draw={draw} />
        <button className={style.btnUnit} onClick={handleCircle}>Клик {numCircles}</button>
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
