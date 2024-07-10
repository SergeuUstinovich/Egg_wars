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
  const [energyMax, setEnergyMax] = useState(150);
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
    const squareX = ctx.canvas.width / 2 - sizeCastle / 2;
    const squareY = ctx.canvas.height / 1.8 - sizeCastle;

    const sizeBtn = ctx.canvas.width * 0.5;
    const buttonX = ctx.canvas.width / 2 - sizeBtn / 2;
    const buttonY = ctx.canvas.height / 1.05 - sizeBtn;

    const sizeText = ctx.canvas.width * 0.04;
    const textX = ctx.canvas.width / 1.34 - sizeBtn / 2;
    const textY = ctx.canvas.height / 0.96 - sizeBtn;
    circlePosition.map((position, index) => {
  
      // position.x += position.dx 
      // position.y += position.dy;

      // Проверяем, достиг ли круг квадрата
      // if (isCircleReachedSquare(position, centerX, centerY, sizeCastle)) {
      //   setScore((prevScore) => prevScore + 1);
      //   setCirclePosition((prevPositions) =>
      //     prevPositions.filter((_, i) => i !== index)
      //   );
         
      // } else {
      drawCircle(ctx, position.x, position.y, 20, "red");
      
      // }
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
      const handleClick = (e: MouseEvent) => {
        const centerX = canvas.width;
        const centerY = canvas.height;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const sizeBtn = canvas.width * 0.25;
        const buttonX = canvas.width / 4 - sizeBtn / 2;
        const buttonY = canvas.height / 2.36 - sizeBtn;
        if (
          x >= buttonX &&
          x <= buttonX + sizeBtn &&
          y >= buttonY &&
          y <= buttonY + sizeBtn
        ) {
          
          if (energyMax > 0) {
            const newCircle = addCircle(speedRun, centerX, centerY);
            // setSpeedRun(prev=> prev - (prev * 0.1)) //скорость будет изменяться в зависимости от прокачки пересмотреть
            setCirclePosition((prevPositions) => [...prevPositions, newCircle]);
            setEnergyMax((prev) => prev - 1);
            setBtnScale(0.9);
            const timerId = setTimeout(() => setBtnScale(1), 100);
            return () => clearTimeout(timerId)
          }
           
        }
      };
      canvas.addEventListener("click", handleClick);
      return () => {
        canvas.removeEventListener("click", handleClick);
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
