import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import style from "./GameField.module.scss";
import Canvas from "../Canvas/Canvas";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";
import { ElementRef, useEffect, useRef, useState } from "react";
import useImage from "../../utils/useImage";
import imageCasltes from "../../assets/img/casle-lvl-1.png";
import useCanvas from "../../utils/useCanvas";
import { variable } from "../../utils/variable";
import { drawCircle, isCircleReachedSquare } from "../../utils/drawCanvas";
import { addUnitPerson } from "../../utils/hpcSpawn";
import { getArmy } from "../../provider/StoreProvider/selectors/getArmy";
import { useMutation } from "@tanstack/react-query";
import { tapTap } from "../../api/userInfo";
import { queryClient } from "../../api/queryClient";
import { useTelegram } from "../../provider/telegram/telegram";
import { coinActions } from "../../provider/StoreProvider";
import { ArmyType } from "../../types/ArmyType";
import { coinUp } from "../../utils/drawImages";

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
  x: number;
  y: number;
  value: number;
  time: number;
}

function GameField() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const armyUser = useSelector(getArmy);
  const { tg_id } = useTelegram();

  const [scoreHpHelper, setScoreHpHelper] = useState<number | null>(null);
  const [storeMoney, setStoreMoney] = useState(0);
  const [scoreMoney, setScoreMoney] = useState(0);
  const [scoreHp, setScoreHp] = useState(0);
  const [scoreEnergy, setScoreEnergy] = useState(0);

  const [dataLoad, setDataLoad] = useState(false);
  const [intervalCoin, setIntervalCoin] = useState(0);
  const [coinJump, setCoinJump] = useState<coinJumpProps[]>([]);

  const [army, setArmy] = useState<ArmyType | undefined>(armyUser);
  const [energyMax, setEnergyMax] = useState(infoUser?.energy_start || 0);
  const [hpMax, setHpMax] = useState(infoUser?.hp_castle_start || 0);
  const percentage = (scoreEnergy / energyMax) * 100;
  const [circlePosition, setCirclePosition] = useState<circlePositionProps[]>(
    []
  );

  const imageCastle = useImage(imageCasltes);
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
        setScoreMoney(0);
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

  const increaseScoreHp = (increment: number) => {
    if (infoUser) {
      setScoreHp((prevScoreHp) => {
        const newScoreHp = prevScoreHp + increment;
        return newScoreHp > infoUser?.hp_castle_start
          ? infoUser?.hp_castle_start
          : newScoreHp;
      });
    }
  };

  //загрузка актуальных данных
  useEffect(() => {
    if (infoUser) {
      setStoreMoney(infoUser.money);
      setScoreEnergy(infoUser.energy_now);
      setScoreHp(infoUser.hp_castle_now);
      setEnergyMax(infoUser.energy_start);
      setHpMax(infoUser.hp_castle_start);
    }
  }, [dataLoad]);
  //загрузка актуальных данных
  useEffect(() => {
    if (infoUser) {
      setDataLoad(true);
      setEnergyMax(infoUser.energy_start);
      setHpMax(infoUser.hp_castle_start);
    }
  }, [infoUser]);

  useEffect(() => {
    if (infoUser) {
      setScoreHp(infoUser.hp_castle_now);
      setScoreEnergy(infoUser.energy_now);
    }
  }, [infoUser?.lvl]);
  //отправка после кликов
  useEffect(() => {
    
    if (infoUser) {
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

  useEffect(() => {
    if (scoreHpHelper) {
      tapTapMutation.mutate({
        tg_id,
        money: scoreMoney,
        energy: scoreEnergy,
        hp: scoreHp,
      });
    }
  }, [scoreHpHelper]);

  useEffect(() => {
    if (infoUser) {
      if (scoreHp >= infoUser.hp_castle_start) {
        setScoreHpHelper(scoreHp);
      }
    }
  }, [scoreHp]);

  //таймер регена энергии
  useEffect(() => {
    if (infoUser) {
      if (energyMax) {
        const interval = setTimeout(() => {
          if (scoreEnergy < energyMax) {
            setScoreEnergy(
              (prevEnergy) => prevEnergy + infoUser.recharge_energy
            );
          }
        }, 1000);
        if (scoreEnergy > energyMax) {
          setScoreEnergy(energyMax);
        }
        return () => clearTimeout(interval);
      }
    }
  }, [scoreEnergy]);

  useEffect(() => {
    if (intervalCoin) {
      clearInterval(intervalCoin);
    }
    const interval = setInterval(() => {
      dispatch(coinActions.updateCoinSumm(storeMoney));
      setStoreMoney(0);
      clearInterval(interval);
      setIntervalCoin(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [scoreMoney]);

  //рисуем на холсте
  function draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const { sizeCastle, squareX, squareY } = variable(ctx);

    circlePosition.map((item, index) => {
      item.x += item.dx;
      item.y += item.dy;

      const newObjCoin = {
        x: item.x,
        y: item.y,
        value: item.damage,
        time: Date.now(),
      };

      // Проверяем, достиг ли круг квадрата
      if (isCircleReachedSquare(item, squareX, squareY, sizeCastle)) {
        increaseScoreHp(item.damage);
        setScoreMoney((prev: any) => prev + item.damage);
        setStoreMoney((prev: any) => prev + item.damage);
        setCoinJump((prevCoins) => [...prevCoins, newObjCoin]);
        setCirclePosition((prevPositions) =>
          prevPositions.filter((_, i) => i !== index)
        );
      } else {
        drawCircle(ctx, item.x, item.y, 7, item.color);
      }
    });
    //замок
    if (imageCastle) {
      ctx.drawImage(imageCastle, squareX, squareY, sizeCastle, sizeCastle);
    }
    //прыгающие монеты
    coinJump.forEach((coin, index) => {
      const elapsedTime = Date.now() - coin.time;
      const rise = (50 * elapsedTime) / 500;
      coinUp(ctx, coin, rise)
      if (elapsedTime > 500) {
        setCoinJump((prevCoins) => prevCoins.filter((_, i) => i !== index));
      }
    });
  }

  const handleTouchStart = () => {
    if (ctx) {
      const { centerX, centerY } = variable(ctx);
      const canvas = ctx?.canvas;
      if (canvas) {
        if (scoreEnergy > 0) {
          const newCircle = addUnitPerson(centerX, centerY, army);
          setCirclePosition((prevPositions) => [...prevPositions, newCircle]);
          setScoreEnergy((prev: any) => prev - 1);
        }
      }
    }
  };

  return (
    <div className={style.blockField}>
      <div className={style.infoLvlHp}>
        <p className={style.lvl}>Level {infoUser?.lvl}</p>
        <p className={style.hpCastle}>
          {scoreHp.toLocaleString("ru-RU")} / {hpMax?.toLocaleString("ru-RU")}
        </p>
      </div>
      <Canvas ref={canvasRef} />
      <button onTouchStart={handleTouchStart} className={style.btnTap}>
        <CircularProgressbar
          className={style.progress}
          value={percentage}
          strokeWidth={5}
          counterClockwise
          styles={buildStyles({
            pathColor: "#1fbcff",
          })}
        />
        <p className={style.textEnergy}>{`${scoreEnergy.toLocaleString(
          "ru-RU"
        )} / ${energyMax?.toLocaleString("ru-RU")}`}</p>
      </button>
    </div>
  );
}

export default GameField;
