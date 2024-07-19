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

function GameField() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const armyUser = useSelector(getArmy);
  const { tg_id } = useTelegram();

  const [scoreMoney, setScoreMoney] = useState(0);
  const [scoreHp, setScoreHp] = useState(0);
  const [scoreEnergy, setScoreEnergy] = useState(0);
  
  const [dataLoad, setDataLoad] = useState(false);

  const [army, setArmy] = useState<ArmyType | undefined>(armyUser);
  const [hp, setHp] = useState(infoUser?.hp_castle_now);
  const [money, setMoney] = useState(infoUser?.money);
  const [energyMax, setEnergyMax] = useState(infoUser?.energy_start);
  const [energy, setEnergy] = useState(infoUser?.energy_now);

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
        if (scoreMoney === 0 && scoreHp === 0 && scoreEnergy === 0) {
          if (infoUser) {
            localStorage.setItem("score", JSON.stringify(infoUser?.money));
            localStorage.setItem(
              "hpCastle",
              JSON.stringify(infoUser?.hp_castle_now)
            );
          } else {
            localStorage.setItem("score", JSON.stringify(scoreMoney));
            localStorage.setItem("hpCastle", JSON.stringify(scoreHp));
          }
        }
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
  }, [armyUser]);
  //загрузка актуальных данных
  useEffect(() => {
    if(infoUser) {
      setScoreEnergy(infoUser?.energy_now)
    }
  }, [dataLoad])
  //загрузка актуальных данных
  useEffect(() => {
    if (infoUser) {
      setDataLoad(true)
      setHp(infoUser.hp_castle_now);
      setMoney(infoUser.money);
      setEnergy(infoUser.energy_now);
      setEnergyMax(infoUser.energy_start);
    }
  }, [infoUser]);
  //отправка после кликов
  useEffect(() => {
    if (
      hp !== null &&
      hp !== undefined &&
      money !== null &&
      money !== undefined &&
      energy !== null &&
      energy !== undefined
    ) {
      const newTimeoutId = setTimeout(() => {
        tapTapMutation.mutate({ tg_id, money, energy, hp });
      }, 500);

      return () => clearTimeout(newTimeoutId);
    }
  }, [energy, money, hp]);
  //для запуска таймера на серваке
  useEffect(() => {
    if (
      hp !== null &&
      hp !== undefined &&
      money !== null &&
      money !== undefined &&
      energy !== null &&
      energy !== undefined
    ) {
      const newTimeoutId = setTimeout(() => {
        tapTapMutation.mutate({ tg_id, money, energy: scoreEnergy, hp });
      }, 10000);

      return () => clearTimeout(newTimeoutId);
    }
  }, [scoreEnergy]);
  //подгоняем актуальные значение которые перезатирает(если не успели отправиться)
  useEffect(() => {
    if (
      money !== null &&
      money !== undefined &&
      hp !== null &&
      hp !== undefined
    ) {
      const differenceMoney = scoreMoney - money;
      const differenceHp = scoreHp - hp;
      if (differenceMoney > 0) {
        setMoney((prev: any) => prev + differenceMoney);
        setHp((prev: any) => prev + differenceHp);
      } else {
        setScoreMoney(money);
        setScoreHp(hp);
      }
    }
  }, [scoreMoney, money, infoUser, scoreHp, hp]);

  //таймер регена энергии
  useEffect(() => {
    if (energyMax) {
      const interval = setTimeout(() => {
        if (scoreEnergy < energyMax) {
          setScoreEnergy((prevEnergy) => prevEnergy + 3);
        }
      }, 1000);
        if(scoreEnergy > energyMax) {
          setScoreEnergy(energyMax)
        }
      return () => clearTimeout(interval);
    }
  }, [scoreEnergy]);

  //актуальные данные в значения
  useEffect(() => {
    if (infoUser) {
      localStorage.setItem("score", JSON.stringify(infoUser?.money));
      localStorage.setItem("hpCastle", JSON.stringify(infoUser?.hp_castle_now));
      setScoreMoney(infoUser?.money);
      setScoreHp(infoUser?.hp_castle_now);
    }
  }, [infoUser]);
  //выгрузка данных из локала
  useEffect(() => {
    const savedScore = localStorage.getItem("score");
    const savedHp = localStorage.getItem("hpCastle");
    // const savedEnergy = localStorage.getItem('energy');
    if (savedScore && savedHp) {
      //&& savedEnergy
      setScoreMoney(JSON.parse(savedScore));
      setScoreHp(JSON.parse(savedHp));
      // setScoreEnergy(JSON.parse(savedEnergy));
    }
  }, [infoUser]);
  //сохраняем актуальные значение в стор
  useEffect(() => {
    localStorage.setItem("energy", JSON.stringify(scoreEnergy));
  }, [scoreEnergy]);
  //рисуем на холсте
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
        setScoreMoney((prev: any) => prev + item.damage);
        setCirclePosition((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
      } else {
        drawCircle(ctx, item.x, item.y, 10, item.color);
      }
    });
    //ленточка лвл
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
      drawTextTape(
        ctx,
        sizeTextLvl,
        textLvlX,
        textLvlY,
        `Level ${infoUser?.lvl}`,
        "white"
      );
      drawTextTape(
        ctx,
        sizeTexеHp,
        textLvlX,
        textLvlHpY,
        `${infoUser?.hp_castle_now.toLocaleString(
          "ru-RU"
        )} / ${infoUser?.hp_castle_start.toLocaleString("ru-RU")}`,
        "white"
      );
    }
    //замок
    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, sizeCastle, sizeCastle);
    }
    //кнопка + прогрессбар
    if (imageBtn) {
      const progressEnergyMax = energyMax ? energyMax : 0;
      const progress = scoreEnergy / progressEnergyMax;
      drawBtn(ctx, buttonX, buttonY, sizeBtn, imageBtn, btnScale, progress);
    }
    drawText(
      ctx,
      sizeText,
      textX,
      textY,
      `${scoreEnergy.toLocaleString("ru-RU")} / ${energyMax?.toLocaleString(
        "ru-RU"
      )}`,
      "black"
    ); //макссЭнерегнию пока текст
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
