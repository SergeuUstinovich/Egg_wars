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
import { addUnitPerson } from "../../utils/hpcSpawn";
import { getArmy } from "../../provider/StoreProvider/selectors/getArmy";
import { useMutation } from "@tanstack/react-query";
import { tapTap } from "../../api/userInfo";
import { queryClient } from "../../api/queryClient";
import { useTelegram } from "../../provider/telegram/telegram";
import { coinActions } from "../../provider/StoreProvider";
import { ArmyType } from "../../types/ArmyType";

export interface circlePositionProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  damage: number;
  color: string;
  img: string;
}

export interface coinJumpProps {
  x: number,
  y: number,
  value: number,
  time: number
}

function GameField() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const armyUser = useSelector(getArmy);
  const { tg_id } = useTelegram();

  const [scoreMoney, setScoreMoney] = useState(0);
  const [scoreHp, setScoreHp] = useState(0);
  const [scoreEnergy, setScoreEnergy] = useState(0);


  const [dataLoad, setDataLoad] = useState(false);
  const [intervalCoin, setIntervalCoin] = useState(0);
  const [coinJump, setCoinJump] = useState<coinJumpProps[]>([]);

  const [army, setArmy] = useState<ArmyType | undefined>(armyUser);
  const [energyMax, setEnergyMax] = useState(infoUser?.energy_start);

  const [circlePosition, setCirclePosition] = useState<circlePositionProps[]>(
    []
  );

  const [btnScale, setBtnScale] = useState(1);
  const imageCastle = useImage(imageCasltes);
  const imageBtn = useImage(imageBtns);
  const imageTape = useImage(imageTapes);
  //отрисовка в канвасе
  const canvasRef = useRef<ElementRef<"canvas">>(null);
  let ctx = canvasRef.current?.getContext("2d");
  useCanvas(draw, canvasRef.current);
  //таптап запрос
  const tapTapMutation = useMutation(
    {
      mutationFn: (data: {
        tg_id: string;
        money: number;
        energy: number;
        hp: number;
      }) => tapTap(data.tg_id, data.money, data.energy, data.hp),
      onSuccess: (data) => {
        if (infoUser) {
          if (scoreHp >= infoUser?.hp_castle_start) {
            queryClient.invalidateQueries({ queryKey: ["info", tg_id] });
          }
        }
        dispatch(coinActions.updateCoinStore(data));
      },
    },
    queryClient
  );
  //загрузка актуальных данных
  useEffect(() => {
    if (armyUser) {
      setArmy(armyUser);
    }
    if(infoUser) {
      setScoreMoney(infoUser?.money)
      tapTapMutation.mutate({
        tg_id,
        money: infoUser.money,
        energy: scoreEnergy,
        hp: scoreHp,
      });
    }
  }, [armyUser]);
  //загрузка актуальных данных
  useEffect(() => {
    if (infoUser) {
      setScoreMoney(infoUser.money);
      setScoreEnergy(infoUser.energy_now);
      setScoreHp(infoUser.hp_castle_now);
      setEnergyMax(infoUser.energy_start);
    }
  }, [dataLoad]);
  //загрузка актуальных данных
  useEffect(() => {
    if (infoUser) {
      setDataLoad(true);
    }
  }, [infoUser]);
  //отправка после кликов
  useEffect(() => {
    if(infoUser) {
      const newTimeoutId = setTimeout(() => {
        tapTapMutation.mutate({
          tg_id,
          money: scoreMoney,
          energy: scoreEnergy,
          hp: scoreHp,
        });
      }, 2000);
      return () => clearTimeout(newTimeoutId);
    }
  }, [scoreHp, scoreMoney]);
  //для запуска таймера на серваке
  useEffect(() => {
    if(infoUser) {
      const newTimeoutId = setTimeout(() => {
        tapTapMutation.mutate({
          tg_id,
          money: scoreMoney,
          energy: scoreEnergy,
          hp: scoreHp,
        });
      }, 10000);
      return () => clearTimeout(newTimeoutId);
    }
  }, [scoreEnergy]);

  //таймер регена энергии
  useEffect(() => {
    if (energyMax) {
      const interval = setTimeout(() => {
        if (scoreEnergy < energyMax) {
          setScoreEnergy((prevEnergy) => prevEnergy + 1);
        }
      }, 3000);
      if (scoreEnergy > energyMax) {
        setScoreEnergy(energyMax);
      }
      return () => clearTimeout(interval);
    }
  }, [scoreEnergy]);

  

  useEffect(() => {
    if (intervalCoin) {
      clearInterval(intervalCoin);
    }
    const interval = setInterval(() => {
      dispatch(coinActions.updateCoin(scoreMoney));
      clearInterval(interval);
      setIntervalCoin(interval);
    }, 500);
    return () => clearInterval(interval);
  }, [scoreMoney]);

  //рисуем на холсте
  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const { sizeCastle, sizeBtn, sizeText, squareX, squareY, buttonX, buttonY, textX, textY, sizeTapeX, sizeTapeY, tapeX, tapeY, sizeBgTypeX, sizeBgTypeY, BgTypeX, BgTypeY, sizeTextLvl, textLvlX, textLvlY, sizeTexеHp, textLvlHpY, sizeCoinJump,
    } = variable(ctx);

    circlePosition.map((item, index) => {
      item.x += item.dx;
      item.y += item.dy;

      const newObjCoin = { x: squareX * 2.4, y: squareY * 3.5, value: item.damage, time: Date.now() }

      // Проверяем, достиг ли круг квадрата
      if (isCircleReachedSquare(item, squareX, squareY, sizeCastle)) {
        setScoreHp((prev: any) => prev + item.damage);
        setScoreMoney((prev: any) => prev + item.damage);
        setCoinJump((prevCoins) => [
          ...prevCoins,
          newObjCoin,
        ]);
        setCirclePosition((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
      } else {
        drawCircle(ctx, item.x, item.y, 10, item.color);
      }
    });
    
    //ленточка лвл
    if (imageTape) {
      drawTape(ctx, imageTape, BgTypeX, BgTypeY, sizeBgTypeX, sizeBgTypeY, tapeX, tapeY, sizeTapeX, sizeTapeY
      );
      drawTextTape(ctx, sizeTextLvl, textLvlX, textLvlY, `Level ${infoUser?.lvl}`, "white");
      drawTextTape(ctx, sizeTexеHp, textLvlX, textLvlHpY, `${scoreHp.toLocaleString("ru-RU")} / ${infoUser?.hp_castle_start.toLocaleString("ru-RU")}`, "white");
    }
    //замок
    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, sizeCastle, sizeCastle);
    }
    coinJump.forEach((coin, index) => {
      const elapsedTime = Date.now() - coin.time;
      const rise = (50 * elapsedTime) / 500;
      ctx.font = `${sizeCoinJump}px PassionOne`;
      ctx.strokeStyle = 'black'; 
      ctx.lineWidth = 2; 
      ctx.fillStyle = 'Yellow';
      ctx.strokeText(`+ ${coin.value}`, coin.x, coin.y - rise);
      ctx.fillText(`+ ${coin.value}`, coin.x, coin.y - rise);
      if (elapsedTime > 500) {
        setCoinJump((prevCoins) => prevCoins.filter((_, i) => i !== index));
      }
    });
    //кнопка + прогрессбар
    if (imageBtn) {
      const progressEnergyMax = energyMax ? energyMax : 0;
      const progress = scoreEnergy / progressEnergyMax;
      drawBtn(ctx, buttonX, buttonY, sizeBtn, imageBtn, btnScale, progress);
    }
    drawText(ctx, sizeText, textX, textY, `${scoreEnergy.toLocaleString("ru-RU")} / ${energyMax?.toLocaleString("ru-RU")}`, "black");
  }
  //клик кнопки на поле(мультитап)
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
              if (scoreEnergy > 0) {
                const newCircle = addUnitPerson(centerX, centerY, army);
                setCirclePosition((prevPositions) => [
                  ...prevPositions,
                  newCircle,
                ]);
                setScoreEnergy((prev: any) => prev - 1);
                setBtnScale(0.9);
                const timerId = setTimeout(() => setBtnScale(1), 50);
                return () => clearTimeout(timerId);
              }
            }
          }
        };
        canvas.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        return () => {
          canvas.removeEventListener("touchstart", handleTouchStart);
        };
      }
    }
  }, [addUnitPerson, ctx, scoreEnergy, army]);

  return (
    <>
      <Canvas ref={canvasRef} />
    </>
  );
}

export default GameField;
