import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import iconCoin from "../../assets/img/coinMoney.png";
import iconBoxSilver from "../../assets/img/ironChest.png";
import iconBoxGold from "../../assets/img/goldChest.png";
import style from "./ProgressBox.module.scss";
import { useEffect, useState } from "react";
import { AwardsItem } from "../../pages/Awards/AwardsItem";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBoxes, openBox } from "../../api/awardsApi";
import { queryClient } from "../../api/queryClient";
import { useTelegram } from "../../provider/telegram/telegram";

interface ProgressBoxProps {
  currentCoins: number;
  max_coins: number;
  lvl: number;
}

export default function ProgressBox({
  currentCoins,
  max_coins,
  lvl,
}: ProgressBoxProps) {
  const { tg_id } = useTelegram();
  // const [chestOpened, setChestOpened] = useState({
  //   silver30: false,
  //   silver60: false,
  //   gold100: false,
  // });
  const [s30, setS30] = useState<boolean>(false);
  const [s60, setS60] = useState<boolean>(false);
  const [g100, setG100] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const onClose = () => {
    setIsModal(false);
  };

  const { data } = useQuery(
    {
      queryKey: ["allBoxesList"],
      queryFn: () => getBoxes(),
    },
    queryClient
  );

  useEffect(() => {
    if (data) {
      // console.log(data);
    }
  }, [data]);

  //     const openBoxLvl = useMutation(
  //     {
  //       mutationFn: (data: { tg_id: string }) => openBox(data.tg_id),
  //       onSuccess: (data) => {
  //         console.log(data);
  //       },
  //     },
  //     queryClient
  //   );

  const percentageBox = (currentCoins / max_coins) * 100;

  useEffect(() => {
    if (percentageBox >= 100 && !g100) {
      console.log("Gold box");
      // setChestOpened((prev) => ({ ...prev, gold100: true }));
      setG100(true);
      setIsModal(true);
    } else if (percentageBox >= 60 && !s60) {
      console.log("Silver box");
      // setChestOpened((prev) => ({ ...prev, silver60: true }));
      setS60(true);
      setIsModal(true);
    } else if (percentageBox >= 30 && !s30) {
      console.log("Silver box");
      // setChestOpened((prev) => ({ ...prev, silver30: true }));
      setS30(true);
      setIsModal(true);
    }
  }, [percentageBox]);

  useEffect(() => {
    setG100(false);
    setS60(false);
    setS30(false);
  }, [lvl]);

  return (
    <ProgressBar
      value={currentCoins}
      max={max_coins}
      colorFill="#FFCE1F"
      classNamefill="#FFCE1F"
      className={style.progress_box}
    >
      <img className={style.progress_coin} src={iconCoin} />
      <img className={style.progress_box_silver1} src={iconBoxSilver} />
      <img className={style.progress_box_silver2} src={iconBoxSilver} />
      <img className={style.progress_box_gold} src={iconBoxGold} />
      <AwardsItem isOpen={isModal} onClose={onClose} />
    </ProgressBar>
  );
}
