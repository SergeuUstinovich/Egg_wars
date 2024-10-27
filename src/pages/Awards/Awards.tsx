import style from "./Awards.module.scss";
import Modal from "../../ui/Modal/Modal";
import awardsCalendar from "../../assets/img/awardsCalendar.png";
import { Button } from "../../ui/Button";
import { ProgressBarAwards } from "../../components/ProgressBarAwards/ProgressBarAwards";
import coinMoney from "../../assets/img/coinMoney.png";
import diamondMoney from "../../assets/img/diamondMoney.png";
import energyMoney from "../../assets/img/energy.png";
import { useEffect, useState } from "react";
import { AwardsItem } from "./AwardsItem.tsx";
import { useTelegram } from "../../provider/telegram/telegram.ts";
import { awardsChests, awardsDay } from "../../api/awardsApi.ts";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient.ts";
import { coinActions } from "../../provider/StoreProvider/index.ts";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { classNames } from "../../utils/classNames.ts";
import { formatNumberString } from "../../components/CardTask/CardTask.tsx";

const Awards = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openItemModal, setOpenItemModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen === false) {
      setOpenModal(true);
    }
  }, []);

  const handleStartClick = () => {
    setOpenModal(false);
  };

  const { tg_id } = useTelegram();

  const { data } = useSuspenseQuery(
    {
      queryFn: () => awardsChests(tg_id),
      queryKey: ["awardsChests"],
    },
    queryClient
  );

  const mutateBonusDate = useMutation(
    {
      mutationFn: (data: { tg_id: string }) => awardsDay(data.tg_id),
      onSuccess: (data) => {
        const moneyCoin: number = data.money;
        dispatch(coinActions.updateCoinMinus(moneyCoin));
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
    queryClient
  );

  const handleOpenDay = () => {
    mutateBonusDate.mutate({ tg_id });
  };

  const handleCloseModal = () => {
    setOpenItemModal(true);
  };

  const isOpen = data.has_taken_bonus_today;
  const lastDay = data.last_bonus_day;
  const boxBonuses = data.box_bonuses;

  return (
    <Modal lazy hiddenClose onClose={handleStartClick} isOpen={openModal}>
      <div className={style.awardsBlock}>
        <Toaster />
        <img
          className={style.awardsImg}
          src={awardsCalendar}
          alt="awardsCalendar"
        />
        <ProgressBarAwards boxBonuses={boxBonuses} value={0} max={100} />
        <ul className={style.awardsGrid}>
          {data.daily_bonuses.map((item: any) => (
            <li key={item.day} className={style.awardsElement}>
              <Button
                isDisabled={lastDay > item.day}
                onClick={() => handleOpenDay()}
                className={classNames(style.awardsButton, {}, [
                  isOpen === false && lastDay >= item.day ? style.active : "",
                ])}
              >
                <h3 className={style.awardsTitle}>day {item.day}</h3>
                <div className={style.awardsDown}>
                  <p>
                    <img src={coinMoney} alt="" />
                    <span>{formatNumberString(item.money)}</span>
                  </p>
                  {item.crystal && (
                    <p>
                      <img src={diamondMoney} alt="" />
                      <span>{item.crystal}</span>
                    </p>
                  )}
                  {item.energy && (
                    <p>
                      <img src={energyMoney} alt="" />
                      <span>{item.energy}</span>
                    </p>
                  )}
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <AwardsItem
        boxBonus={data.box_bonuses}
        isOpen={openItemModal}
        onClose={handleCloseModal}
      />
    </Modal>
  );
};

export default Awards;
