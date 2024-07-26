import { Button } from "../../ui/Button";
import style from "./CoinsDiamond.module.scss";
import imgCoin from "../../assets/img/coinMoney.png";
import imgDiamond from "../../assets/img/diamondMoney.png";
import imgPlus from "../../assets/img/btn_plus.png";
import { useDispatch, useSelector } from "react-redux";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";
import { useTelegram } from "../../provider/telegram/telegram";
import { useQuery } from "@tanstack/react-query";
import { infoArmy, referalLink, userInfo } from "../../api/userInfo";
import { coinActions } from "../../provider/StoreProvider";
import { queryClient } from "../../api/queryClient";
import { useEffect } from "react";
import { armyActions } from "../../provider/StoreProvider/slice/armySlice";

function CoinsDiamond() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const { tg_id, userName, tg } = useTelegram();

  const habdle = () => { //перессылка
    const link = //?url= тут присваиваем нашу реферальную ссылку
      "https://t.me/share/url?url=https://t.me/EggWarsTest_bot&text={опциональный_текст}";
    tg.openTelegramLink(link);
  };
  // referalLink(tg_id)

  const infoQuery = useQuery(
    {
      queryFn: () => userInfo(tg_id, userName),
      queryKey: ["info", tg_id],
      enabled: !!tg_id, //&& (hasFetched ? infoUser?._now !== infoUser?.energy_start : true)
      retry: 1,
      // refetchInterval: 5000,
    },
    queryClient
  );


// Используем useEffect для отслеживания изменений в HP замка
// useEffect(() => {
//   if (infoUser && infoUser.hp_castle_now >= infoUser.hp_castle_start) {
//     infoQuery.refetch();
//   }
// }, [infoUser]);

  useEffect(() => {
    dispatch(coinActions.addCoinStore(infoQuery.data));
  }, [infoQuery.data]);

  const armyQuery = useQuery(
    {
      queryFn: () => infoArmy(tg_id),
      queryKey: ["army", tg_id],
      enabled: !!tg_id,
      retry: 0,
    },
    queryClient
  );

  useEffect(() => {
    dispatch(armyActions.addArmyStore(armyQuery.data));
  }, [armyQuery.data]);

  return (
    <div className={style.coinBlock}>
      <p className={style.descrLvl}>LVL {infoUser?.lvl}</p>
      <div className={style.coinBar}>
        <div className={style.coinBlockMoney}>
          <img className={style.imgCoin} src={imgCoin} alt="" />
          <div className={style.bgValue}>
            <p className={style.descr}>
              {infoUser?.money.toLocaleString("ru-RU")}
            </p>
          </div>
          <Button className={style.btnDonatMoney}>
            <img src={imgPlus} alt="" />
          </Button>
        </div>
        <div className={style.coinBlockMoney}>
          <img className={style.imgCoin} src={imgDiamond} alt="" />
          <div className={style.bgValue}>
            <p className={style.descr}>0</p>
          </div>
          <Button className={style.btnDonatMoney}>
            <img src={imgPlus} alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CoinsDiamond;
