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
import { Outlet } from "react-router-dom";
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

function GameField() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const armyUser = useSelector(getArmy);
  const { tg_id } = useTelegram();

  const [scoreMoney, setScoreMoney] = useState(0);
  const [scoreHp, setScoreHp] = useState(0);

  const [army, setArmy] = useState<ArmyType | undefined>(armyUser);
  const [hp, setHp] = useState(infoUser?.hp_castle_now);
  const [money, setMoney] = useState(infoUser?.money);
  const [energyMax, setEnergyMax] = useState(infoUser?.energy_start);
  const [energy, setEnergy] = useState(infoUser?.energy_now);
  const [energyHelp, setEnergyHelp] = useState(infoUser?.energy_now || 1);

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

  const tapTapMutation = useMutation({
    mutationFn: (data: { tg_id: string; money: number, energy: number, hp: number }) =>
      tapTap(data.tg_id, data.money, data.energy, data.hp),
    onSuccess: (data) => {
      if(scoreMoney === 0 && scoreHp === 0) {
        if(infoUser) {
          localStorage.setItem('score', JSON.stringify(infoUser?.money));
          localStorage.setItem('hpCastle', JSON.stringify(infoUser?.hp_castle_now));
        }
      }
      dispatch(coinActions.updateCoinStore(data));
    },
  }, queryClient)

  useEffect(() => {
    if (armyUser) {
      setArmy(armyUser)
    }
  }, [armyUser]);

  useEffect(()=> {
    if(infoUser) {
      setEnergyHelp(infoUser.energy_now)
      setHp(infoUser.hp_castle_now)
      setMoney(infoUser.money)
      setEnergy(infoUser.energy_now)
      setEnergyMax(infoUser.energy_start)
    }
  }, [infoUser])


useEffect(() => {
  if(
    hp !== null && hp !== undefined &&
    money !== null && money !== undefined &&
    energy !== null && energy !== undefined 
  ) {
    const currentMoney = money
    const currentEnergy = energy
    const currentHp = hp
    const newTimeoutId = setTimeout(() => {
      tapTapMutation.mutate({tg_id, money: currentMoney, energy: currentEnergy, hp: currentHp});
    }, 500);

    return () => clearTimeout(newTimeoutId);
  }
}, [energy, money, hp, scoreMoney]);

useEffect(() => {
  if(money !== null && money !== undefined && hp !== null && hp !== undefined) {
    const differenceMoney = scoreMoney - money;
    const differenceHp = scoreHp - hp;
    if (differenceMoney > 0 ) {
      setMoney((prev: any) => prev + differenceMoney);
      setHp((prev: any) => prev + differenceHp);
    } else {
      setScoreMoney(money)
      setScoreHp(hp)
    }
  }
}, [scoreMoney, money, infoUser, scoreHp, hp]);

useEffect(() => {
  if(infoUser) {
    localStorage.setItem('score', JSON.stringify(infoUser?.money));
    localStorage.setItem('hpCastle', JSON.stringify(infoUser?.hp_castle_now));
    setScoreMoney(infoUser?.money);
    setScoreHp(infoUser?.hp_castle_now)
  } 
}, [infoUser]);

useEffect(() => {
  const savedScore = localStorage.getItem('score');
  const savedHp = localStorage.getItem('hpCastle');
  if (savedScore && savedHp) {
    setScoreMoney(JSON.parse(savedScore));
    setScoreHp(JSON.parse(savedHp));
  }
}, [infoUser])


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
        setScoreHp((prev: any) => prev + item.damage);
        setScoreMoney((prev: any) => prev + item.damage)
          // setMoney((prev: any) => prev + item.damage);
        
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
      drawTextTape(ctx, sizeTextLvl, textLvlX, textLvlY, `Level ${infoUser?.lvl}`, "white");
      drawTextTape(
        ctx,
        sizeTexеHp,
        textLvlX,
        textLvlHpY, 
        `${infoUser?.hp_castle_now.toLocaleString('ru-RU')} / ${infoUser?.hp_castle_start.toLocaleString('ru-RU')}`,
        "white"
      );
    }
    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, sizeCastle, sizeCastle);
    }
    if (imageBtn) {
        const progressEnergy = energyHelp ? energyHelp : 0
        const progressEnergyMax = energyMax ? energyMax : 0
        const progress = progressEnergy / progressEnergyMax; //сюда передавать максс энергию
        drawBtn(ctx, buttonX, buttonY, sizeBtn, imageBtn, btnScale, progress);
    }
    drawText(ctx, sizeText, textX, textY, `${energyHelp} / ${energyMax}`, "black"); //макссЭнерегнию пока текст
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
            if (
              x >= buttonX &&
              x <= buttonX + sizeBtn &&
              y >= buttonY &&
              y <= buttonY + sizeBtn
            ) {
                if (energyHelp > 0) {
                  const newCircle = addUnitPerson(centerX, centerY, army);
                  setCirclePosition((prevPositions) => [
                    ...prevPositions,
                    newCircle,
                  ]);
                  setEnergy((prev: any) => prev - 1);
                  setEnergyHelp((prev: any) => prev - 1);
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
  }, [addUnitPerson, ctx, energyHelp, army]);

  return (
    <>
      <Canvas ref={canvasRef} />
    </>
    
  );
}

export default GameField;
