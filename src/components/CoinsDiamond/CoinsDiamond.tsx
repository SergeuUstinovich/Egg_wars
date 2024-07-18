import { Button } from "../../ui/Button";
import style from "./CoinsDiamond.module.scss";
import imgCoin from "../../assets/img/coinMoney.png";
import imgDiamond from "../../assets/img/diamondMoney.png";
import imgPlus from "../../assets/img/btn_plus.png";
import { useDispatch, useSelector } from "react-redux";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";
import { useTelegram } from "../../provider/telegram/telegram";
import { useMutation } from "@tanstack/react-query";
import { infoArmy, userInfo } from "../../api/userInfo";
import { coinActions } from "../../provider/StoreProvider";
import { queryClient } from "../../api/queryClient";
import { useEffect } from "react";
import { armyActions } from "../../provider/StoreProvider/slice/armySlice";

function CoinsDiamond() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const { tg_id, userName } = useTelegram();

  const infoValueMutation = useMutation(
    {
      mutationFn: (data: { tg_id: string; userName: string }) =>
        userInfo(data.tg_id, data.userName),
      onSuccess: (data) => {
        dispatch(coinActions.addCoinStore(data));
      },
    },
    queryClient
  );

  useEffect(() => {
    if(infoUser?.energy_now !== infoUser?.energy_start) {
      const inter = setInterval(() => {
        infoValueMutation.mutate({ tg_id, userName });
      }, 5000)
      return () => clearInterval(inter)
    }
  }, [infoUser])

  const armyMutation = useMutation(
    {
      mutationFn: (data: { tg_id: string; userName: string }) =>
        infoArmy(data.tg_id, data.userName),
      onSuccess: (data) => {
        dispatch(armyActions.addArmyStore(data))
      },
    },
    queryClient
  );

  useEffect(() => {
    infoValueMutation.mutate({ tg_id, userName });
    armyMutation.mutate({ tg_id, userName });
  }, [tg_id]);

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
