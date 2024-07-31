import { Button } from "../../ui/Button";
import style from "./CoinsDiamond.module.scss";
import imgCoin from "../../assets/img/coinMoney.png";
import imgDiamond from "../../assets/img/diamondMoney.png";
import imgPlus from "../../assets/img/btn_plus.png";
import { useDispatch, useSelector } from "react-redux";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";
import { useTelegram } from "../../provider/telegram/telegram";
import { useQuery } from "@tanstack/react-query";
import { addFriends, infoArmy, userInfo } from "../../api/userInfo";
import { coinActions } from "../../provider/StoreProvider";
import { queryClient } from "../../api/queryClient";
import { useEffect, useState } from "react";
import { armyActions } from "../../provider/StoreProvider/slice/armySlice";
import { useLocation } from "react-router-dom";

function CoinsDiamond() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const { tg_id, userName } = useTelegram();
  const [success, setSuccess] = useState(false)

  const infoQuery = useQuery(
    {
      queryFn: () => userInfo(tg_id, userName),
      queryKey: ["info", tg_id],
      enabled: !!tg_id,
      retry: 1,
    },
    queryClient
  );

  useEffect(() => {
    if(infoQuery.data) {
      setSuccess(true)
    }
    dispatch(coinActions.addCoinStore(infoQuery.data));
  }, [infoQuery.data]);

  const armyQuery = useQuery(
    {
      queryFn: () => infoArmy(tg_id),
      queryKey: ["army", tg_id],
      enabled: !!tg_id && success,
      retry: 2,
    },
    queryClient
  );

  useEffect(() => {
    dispatch(armyActions.addArmyStore(armyQuery.data));
  }, [armyQuery.data]);

  const query = new URLSearchParams(useLocation().search);
  const startParam = query.get("id");
  const [idRef, setIdRef] = useState<string>();

  useQuery(
    {
      queryKey: ["friend"],
      queryFn: () => addFriends(tg_id, idRef),
      enabled: !!tg_id && !!idRef,
    },
    queryClient
  );

  useEffect(() => {
    if (startParam) {
      setIdRef(startParam);
    }
  }, [startParam]);

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
