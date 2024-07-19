import { Button } from "../../ui/Button";
import style from "./CoinsDiamond.module.scss";
import imgCoin from "../../assets/img/coinMoney.png";
import imgDiamond from "../../assets/img/diamondMoney.png";
import imgPlus from "../../assets/img/btn_plus.png";
import { useDispatch, useSelector } from "react-redux";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";
import { useTelegram } from "../../provider/telegram/telegram";
import {  useQuery } from "@tanstack/react-query";
import { infoArmy, userInfo } from "../../api/userInfo";
import { coinActions } from "../../provider/StoreProvider";
import { queryClient } from "../../api/queryClient";
import { useEffect } from "react";
import { armyActions } from "../../provider/StoreProvider/slice/armySlice";

function CoinsDiamond() {
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);
  const { tg_id, userName } = useTelegram();
  
  // const [hasFetched, setHasFetched] = useState(false);
  const infoQuery = useQuery(
    {
      queryFn: () => userInfo(tg_id, userName),
      queryKey: ["info", tg_id],
      enabled: !!tg_id,  //&& (hasFetched ? infoUser?.energy_now !== infoUser?.energy_start : true)
      retry: 0,
      // refetchInterval: 5000,
    },
    queryClient
  );

  useEffect(() => {
    dispatch(coinActions.addCoinStore(infoQuery.data));
      // setHasFetched(true);
  }, [infoQuery.data])


  const armyQuery = useQuery(
    {
      queryFn: () => infoArmy(tg_id),
      queryKey: ["army", tg_id],
      enabled: !!tg_id,
      retry: 0
    },
    queryClient
  );

  useEffect(() => {
    dispatch(armyActions.addArmyStore(armyQuery.data))
  }, [armyQuery.data])
  const savedMoney = localStorage.getItem('score')

  return (
    <div className={style.coinBlock}>
      <p className={style.descrLvl}>LVL {infoUser?.lvl}</p>
      <div className={style.coinBar}>
        <div className={style.coinBlockMoney}>
          <img className={style.imgCoin} src={imgCoin} alt="" />
          <div className={style.bgValue}>
            <p className={style.descr}>
              {savedMoney && (
                JSON.parse(savedMoney).toLocaleString("ru-RU")
              )}
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
