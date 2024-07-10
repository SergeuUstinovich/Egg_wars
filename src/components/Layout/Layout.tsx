import { useEffect, useState } from "react";
import Canvas from "../Canvas/Canvas";
import style from "./Layout.module.scss";
import { addCircle, drawCircle, drawProgressBar, drawText, isCircleReachedSquare } from "../../utils/drawCanvas";
import imageCasltes from "../../assets/img/casle-lvl-1.png";
import imageBtns from "../../assets/img/btn-tap.png";
import useImage from "../../utils/useImage";
import { resizeCanvas } from "../../utils/resizeCanvas";

export interface circlePositionProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

function Layout() {
  const [score, setScore] = useState(0);
  const [energyMax, setEnergyMax] = useState(50);
  const [circlePosition, setCirclePosition] = useState<circlePositionProps[]>(
    []
  );
  const [speedRun, setSpeedRun] = useState(100);
  const [btnScale, setBtnScale] = useState(1);
  const imageCastle = useImage(imageCasltes);
  const imageBtn = useImage(imageBtns);
  

  function draw(ctx: CanvasRenderingContext2D, frameCount: number) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const centerX = ctx.canvas.width;
    const centerY = ctx.canvas.height;
    resizeCanvas(ctx.canvas);
    const sizeCastle = ctx.canvas.width * 0.6;
    const squareX = ctx.canvas.width / 1.9 - sizeCastle / 2;
    const squareY = ctx.canvas.height / 2.1 - sizeCastle;

    const sizeBtn = ctx.canvas.width * 0.5;
    const buttonX = ctx.canvas.width / 1.9 - sizeBtn / 2;
    const buttonY = ctx.canvas.height / 1.14 - sizeBtn;

    const sizeText = ctx.canvas.width * 0.04;
    const textX = ctx.canvas.width / 1.29 - sizeBtn / 2;
    const textY = ctx.canvas.height / 1.05 - sizeBtn;
    circlePosition.map((position, index) => {
  
      position.x += position.dx 
      position.y += position.dy;

      // Проверяем, достиг ли круг квадрата
      if (isCircleReachedSquare(position, centerX, centerY, sizeCastle)) {
        setScore((prevScore) => prevScore + 1);
        setCirclePosition((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
         
      } else {
      drawCircle(ctx, position.x, position.y, 10, "red");
      
      }
    });

    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, sizeCastle, sizeCastle);
    }
    
    if (imageBtn) {
      const progress = energyMax / 50; //сюда передавать максс энергию
      ctx.save();
      ctx.translate(buttonX + sizeBtn / 2, buttonY + sizeBtn / 2);
      ctx.scale(btnScale, btnScale);
      ctx.drawImage(imageBtn, -sizeBtn / 2, -sizeBtn / 2, sizeBtn, sizeBtn);
      ctx.restore();
      ctx.save();
      ctx.translate(buttonX + sizeBtn / 2, buttonY + sizeBtn / 2);
      ctx.scale(btnScale, btnScale);
      drawProgressBar(ctx, 0, 0, sizeBtn / 2.33, progress);
      ctx.restore();
    }
    drawText(ctx, sizeText, textX, textY, energyMax, '50') //макссЭнерегнию пока текст
    
  
  }

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const handleTouchStart = (e: TouchEvent) => {
        const centerX = canvas.width;
        const centerY = canvas.height;
        const rect = canvas.getBoundingClientRect();
        for (let i = 0; i < e.touches.length; i++) {
          const x = e.touches[i].clientX - rect.left;
          const y = e.touches[i].clientY - rect.top;
          const sizeBtn = canvas.width * 0.5;
          const buttonX = canvas.width / 1.9 - sizeBtn / 2;
          const buttonY = canvas.height / 1.14 - sizeBtn;
          if (
            x >= buttonX &&
            x <= buttonX + sizeBtn &&
            y >= buttonY &&
            y <= buttonY + sizeBtn
          ) {
            if (energyMax > 0) {
              const newCircle = addCircle(speedRun, centerX, centerY);
              setCirclePosition((prevPositions) => [...prevPositions, newCircle]);
              setEnergyMax((prev) => prev - 1);
              setBtnScale(0.9);
              const timerId = setTimeout(() => setBtnScale(1), 50);
              return () => clearTimeout(timerId)
            }
          }
        }
      };
      canvas.addEventListener("touchstart", handleTouchStart);
      return () => {
        canvas.removeEventListener("touchstart", handleTouchStart);
      };
    }
  }, [energyMax, addCircle]);

  return (
    <>
      <header></header>
      <main className={style.main}>
        <div className={style.divs}>{score} Монеты</div>
        <Canvas draw={draw} />
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
