import { useCallback, useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import style from "./Layout.module.scss";
import { generateRandomPosition } from "../../utils/getRandomCoordinate";
import { drawCircle, drawCastle, isCircleReachedSquare } from "../../utils/drawCanvas";
import imageUrl1 from '../../assets/img/casle-lvl-1.png'
import imageUrl2 from '../../assets/img/btn-tap.png'
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

  const [imageCastle, setImageCastle] = useState<HTMLImageElement | null>(null);
  const [imageBtn, setImageBtn] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const imgCastle = new Image();
    const imgBtn = new Image();
    imgCastle.src = imageUrl1;
    imgBtn.src = imageUrl2;
    imgCastle.onload = () => {
      setImageCastle(imgCastle);
    };
    imgBtn.onload = () => {
      setImageBtn(imageBtn);
    };
  }, []);

  const addCircle = useCallback((speedRun: number) => {
    const position = generateRandomPosition(100, 420, 600, 750);
    const dx = (513 / 2 - position.x) / speedRun;
    const dy = (963 / 2.5 - position.y) / speedRun;
    setCirclePosition((prevPositions) => [
      ...prevPositions,
      { ...position, dx, dy },
    ]);
  }, []);

  function draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2.5;
    const size = ctx.canvas.width * 0.2;
    const squareX = ctx.canvas.width / 3.9 - size / 2;
    const squareY = ctx.canvas.height / 5 - size;

    const buttonX = ctx.canvas.width / 2 - size;;
    const buttonY = ctx.canvas.height / 3 - size;
    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, size, size);
      
    }
    if(imageBtn) {
      ctx.drawImage(imageBtn, buttonX, buttonY, size, size);
    }

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
