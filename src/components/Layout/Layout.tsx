import { ElementRef, useEffect, useRef, useState } from "react";
import Canvas from "../Canvas/Canvas";
import style from "./Layout.module.scss";
import {
  addCircle,
  drawCircle,
  drawText,
  isCircleReachedSquare,
} from "../../utils/drawCanvas";
import imageCasltes from "../../assets/img/casle-lvl-1.png";
import imageBtns from "../../assets/img/btn-tap.png";
import useImage from "../../utils/useImage";
import useCanvas from "../../utils/useCanvas";
import { variable } from "../../utils/variable";
import { drawBtn } from "../../utils/drawImages";
import { useTelegram } from "../../provider/telegram/telegram";

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

  const [speedRun, setSpeedRun] = useState(200);
  const [btnScale, setBtnScale] = useState(1);
  const imageCastle = useImage(imageCasltes);
  const imageBtn = useImage(imageBtns);

  const canvasRef = useRef<ElementRef<"canvas">>(null);
  let ctx = canvasRef.current?.getContext("2d");
  useCanvas(draw, canvasRef.current);

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const {
      centerX,
      centerY,
      sizeCastle,
      sizeBtn,
      sizeText,
      squareX,
      squareY,
      buttonX,
      buttonY,
      textX,
      textY,
    } = variable(ctx);
    circlePosition.map((item, index) => {
      item.x += item.dx;
      item.y += item.dy;

      // Проверяем, достиг ли круг квадрата
      if (isCircleReachedSquare(item, centerX, centerY, sizeCastle)) {
        setScore((prevScore) => prevScore + 1);
        setCirclePosition((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
      } else {
        drawCircle(ctx, item.x, item.y, 10, "red");
      }
    });
    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, sizeCastle, sizeCastle);
    }
    if (imageBtn) {
      const progress = energyMax / 50; //сюда передавать максс энергию
      drawBtn(ctx, buttonX, buttonY, sizeBtn, imageBtn, btnScale, progress);
    }
    drawText(ctx, sizeText, textX, textY, energyMax, "50"); //макссЭнерегнию пока текст
  }

  useEffect(() => {
    if (ctx) {
      const { centerX, centerY, sizeBtn, buttonX, buttonY } = variable(ctx);
      const canvas = ctx?.canvas;
      if (canvas) {
        const handleTouchStart = (e: TouchEvent) => {
          const rect = canvas.getBoundingClientRect();
          for (let i = 0; i < e.touches.length; i++) {
            const x = e.touches[i].clientX - rect.left;
            const y = e.touches[i].clientY - rect.top;
            if (x >= buttonX && x <= buttonX + sizeBtn && y >= buttonY && y <= buttonY + sizeBtn) {
              if (energyMax > 0) {
                const newCircle = addCircle(speedRun, centerX, centerY);
                setCirclePosition((prevPositions) => [
                  ...prevPositions,
                  newCircle,
                ]);
                setEnergyMax((prev) => prev - 1);
                setBtnScale(0.9);
                const timerId = setTimeout(() => setBtnScale(1), 50);
                return () => clearTimeout(timerId);
              }
            }
          }
        };
        canvas.addEventListener("touchstart", handleTouchStart);
        return () => {
          canvas.removeEventListener("touchstart", handleTouchStart);
        };
      }
    }
  }, [energyMax, addCircle, ctx]);

  return (
    <>
      <header></header>
      <main className={style.main}>
        <div className={style.divs}>{score} Монеты</div>
        <p>{useTelegram().userName}</p>
        <Canvas ref={canvasRef} />
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
