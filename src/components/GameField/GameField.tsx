import { useDispatch, useSelector } from "react-redux";
import Canvas from "../Canvas/Canvas";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";
import { ElementRef, useEffect, useRef, useState } from "react";
import useImage from "../../utils/useImage";
import imageCasltes from "../../assets/img/casle-lvl-1.png";
import imageBtns from "../../assets/img/btn-tap.png";
import imageTapes from "../../assets/img/level_tape.png";
import useCanvas from "../../utils/useCanvas";
import { variable } from "../../utils/variable";
import {
  drawCircle,
  drawText,
  drawTextTape,
  isCircleReachedSquare,
} from "../../utils/drawCanvas";
import { drawBtn, drawTape } from "../../utils/drawImages";
import { coinActions } from "../../provider/StoreProvider";
import { addUnitPerson } from "../../utils/hpcSpawn";

export interface circlePositionProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  damage: number;
  color: string;
}

function GameField() {
  const dispatch = useDispatch();
  const coin = useSelector(getCoin);
  const [coinMax, setCoinMax] = useState(0);
  const [energyMax, setEnergyMax] = useState(50);
  const [energy, setEnergy] = useState(energyMax);
  const [circlePosition, setCirclePosition] = useState<circlePositionProps[]>(
    []
  );
  const [btnScale, setBtnScale] = useState(1);

  const imageCastle = useImage(imageCasltes);
  const imageBtn = useImage(imageBtns);
  const imageTape = useImage(imageTapes);

  const canvasRef = useRef<ElementRef<"canvas">>(null);
  let ctx = canvasRef.current?.getContext("2d");
  useCanvas(draw, canvasRef.current);

  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const {
      sizeCastle,
      sizeBtn,
      sizeText,
      squareX,
      squareY,
      buttonX,
      buttonY,
      textX,
      textY,
      sizeTapeX,
      sizeTapeY,
      tapeX,
      tapeY,
      sizeBgTypeX,
      sizeBgTypeY,
      BgTypeX,
      BgTypeY,
      sizeTextLvl,
      textLvlX,
      textLvlY,
      sizeTexеHp,
      textLvlHpY,
    } = variable(ctx);
    circlePosition.map((item, index) => {
      item.x += item.dx;
      item.y += item.dy;
      // Проверяем, достиг ли круг квадрата
      if (isCircleReachedSquare(item, squareX, squareY, sizeCastle)) {
        setCoinMax((prev) => prev + item.damage);
        setCirclePosition((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
      } else {
        drawCircle(ctx, item.x, item.y, 10, item.color);
      }
    });

    if (imageTape) {
      drawTape(
        ctx,
        imageTape,
        BgTypeX,
        BgTypeY,
        sizeBgTypeX,
        sizeBgTypeY,
        tapeX,
        tapeY,
        sizeTapeX,
        sizeTapeY
      );
      drawTextTape(ctx, sizeTextLvl, textLvlX, textLvlY, `Level 1`, "white");
      drawTextTape(
        ctx,
        sizeTexеHp,
        textLvlX,
        textLvlHpY,
        `${coin} / 10 000`,
        "white"
      );
    }
    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, sizeCastle, sizeCastle);
    }
    if (imageBtn) {
      const progress = energy / energyMax; //сюда передавать максс энергию
      drawBtn(ctx, buttonX, buttonY, sizeBtn, imageBtn, btnScale, progress);
    }
    drawText(ctx, sizeText, textX, textY, `${energy} / ${energyMax}`, "black"); //макссЭнерегнию пока текст
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(coinActions.addCoinStore(coinMax));
      setCoinMax(0);
    }, 300); // Значение передается каждую секунду

    return () => {
      clearInterval(interval); // Очищаем интервал при размонтировании компонента
    };
  }, [dispatch, coinMax]);

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
            if (
              x >= buttonX &&
              x <= buttonX + sizeBtn &&
              y >= buttonY &&
              y <= buttonY + sizeBtn
            ) {
              if (energy > 0) {
                const newCircle = addUnitPerson(centerX, centerY);
                setCirclePosition((prevPositions) => [
                  ...prevPositions,
                  newCircle,
                ]);
                setEnergy((prev) => prev - 1);
                setBtnScale(0.9);
                const timerId = setTimeout(() => setBtnScale(1), 50);
                return () => clearTimeout(timerId);
              }
            }
          }
        };
        canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
        return () => {
          canvas.removeEventListener("touchstart", handleTouchStart);
        };
      }
    }
  }, [energy, addUnitPerson, ctx]);

  return <Canvas ref={canvasRef} />;
}

export default GameField;
