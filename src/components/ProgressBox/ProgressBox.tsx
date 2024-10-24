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
import { BoxType } from "../../types/BoxesType";
import { CoinType } from "../../types/CoinType";

interface ProgressBoxProps {
  currentCoins: number;
  max_coins: number;
  dataUser: CoinType;
}

export default function ProgressBox({
  currentCoins,
  max_coins,
  dataUser,
}: ProgressBoxProps) {
  const { tg_id } = useTelegram();
  const [s30, setS30] = useState<boolean>(false);
  const [s60, setS60] = useState<boolean>(false);
  const [g100, setG100] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const onClose = () => {
    setIsModal(false);
  };

  const [boxesList, setBoxesList] = useState<BoxType[]>();

  const { data } = useQuery(
    {
      queryKey: ["allBoxesList"],
      queryFn: () => getBoxes(),
    },
    queryClient
  );

  useEffect(() => {
    if (data) {
      setBoxesList(data);
    }
  }, [data]);

  const openBoxLvl = useMutation(
    {
      mutationFn: (data: { tg_id: string; tg_box: number }) =>
        openBox(data.tg_id, data.tg_box),
      onSuccess: (data) => {},
    },
    queryClient
  );

  const percentageBox = (currentCoins / max_coins) * 100;

  useEffect(() => {
    if (boxesList) {
      if (percentageBox >= 100 && !g100 && !dataUser.box_gold) {
        setG100(true);
        openBoxLvl.mutate({ tg_id: tg_id, tg_box: boxesList[2].id });
        setIsModal(true);
      } else if (percentageBox >= 60 && !s60 && !dataUser.box_silver) {
        setS60(true);
        openBoxLvl.mutate({ tg_id: tg_id, tg_box: boxesList[1].id });
        setIsModal(true);
      } else if (percentageBox >= 30 && !s30 && !dataUser.box_bronze) {
        setS30(true);
        openBoxLvl.mutate({ tg_id: tg_id, tg_box: boxesList[0].id });
        setIsModal(true);
      }
    }
  }, [percentageBox, boxesList]);

  useEffect(() => {
    setG100(false);
    setS60(false);
    setS30(false);
  }, [dataUser.lvl]);

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
