import { useCallback, useState } from "react";
import Canvas from "../Canvas/Canvas";
import style from "./Layout.module.scss";
import { generateRandomPosition } from "../../utils/getRandomCoordinate";
import { drawCircle, drawSquare, isCircleReachedSquare } from "../../utils/drawCanvas";

interface circlePositionProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

function Layout() {
  const [score, setScore] = useState(0);
  const [numCircles, setNumCircles] = useState(50);
  const [circlePosition, setCirclePosition] = useState<circlePositionProps[]>(
    []
  );

  const addCircle = useCallback((speedRun: number) => {
    const position = generateRandomPosition(50, 320, 300, 400);
    const dx = (360 / 2 - position.x) / speedRun;
    const dy = (480 / 2.5 - position.y) / speedRun;
    setCirclePosition((prevPositions) => [
      ...prevPositions,
      { ...position, dx, dy },
    ]);
  }, []);

  function draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2.5;
    const size = 100;
    const squareX = ctx.canvas.width / 3.9 - size / 2;
    const squareY = ctx.canvas.height / 5 - size;
    drawSquare(ctx, squareX, squareY, size, "blue");//создаём квадрат

    circlePosition.map((position, index) => {
      position.x += position.dx;
      position.y += position.dy;

      // Проверяем, достиг ли круг квадрата
      if (isCircleReachedSquare(position, centerX, centerY, size)) {
        setScore((prevScore) => prevScore + 1);
        setCirclePosition((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
      } else {
        drawCircle(ctx, position.x, position.y, 10, "red");//создаём круг
      }
    });
  }

  const handleCircle = useCallback(() => {
    if (numCircles > 0) {
      addCircle(100);
      setNumCircles((prev) => prev - 1);
    }
  }, [numCircles, addCircle]);

  return (
    <>
      <header></header>
      <main className={style.main}>
        <div>{score} Монеты</div>
        <Canvas draw={draw} />
        <button className={style.btnUnit} onClick={handleCircle}>
          Клик {numCircles}
        </button>
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
