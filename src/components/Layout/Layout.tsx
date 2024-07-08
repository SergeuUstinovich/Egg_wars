import { useState } from "react";
import Canvas from "../Canvas/Canvas";
import style from "./Layout.module.scss";
import useCanvas from "../../utils/useCanvas";

interface circlePositionProps {
    x: number,
    y: number
}

function Layout() {
    const [score, setScore] = useState(0);
    const [numCircles, setNumCircles] = useState(0);
    const [circlePosition, setCirclePosition] = useState<circlePositionProps[]>([]);
    // const canvasRef = useCanvas(draw)
    // const canvas = canvasRef.current;
    // const width = canvas?.width;
    // const height = canvas?.height;
    // console.log(width, height) //undefined
    function getRandomCoordinate(max: number) {
        return Math.random() * max;
    }

    

    // function addCircle() {
    //     setCirclePosition((prevPositions) => [...prevPositions, generateRandomPosition()]);
    // }

    function draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    // const sizes = resizeCanvas(ctx.canvas);
    // console.log(sizes)
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

    function generateRandomPosition() {
        const randomX = getRandomCoordinate(canvas.width);
        const randomY = getRandomCoordinate(canvas.height);
        return { x: randomX, y: randomY };
    }

    circlePosition.map((position) => {
        drawCircle(position.x, position.y);
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
        // addCircle()
        setNumCircles(prev => prev + 1)
    }

  return (
    <>
      <header></header>
      <main className={style.main}>
        <Canvas draw={draw} />
        <button className={style.btnUnit} onClick={handleCircle}>Клик</button>
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
