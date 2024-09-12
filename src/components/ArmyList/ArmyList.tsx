import { useDispatch, useSelector } from "react-redux";
import { useTelegram } from "../../provider/telegram/telegram";
import { ArmyScheme } from "../../types/ArmyType";
import style from "./ArmyList.module.scss";
import { upDamage, upSpeed } from "../../api/userInfo";
import { useMutation } from "@tanstack/react-query";
import { coinActions } from "../../provider/StoreProvider";
import { queryClient } from "../../api/queryClient";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";


function ArmyList({ armyUser }: ArmyScheme) {
  const { tg_id } = useTelegram();
  const dispatch = useDispatch();
  const infoUser = useSelector(getCoin);

  const upDamageMutate = useMutation(
    {
      mutationFn: (data: { tg_id: string; id_warrior: number }) =>
        upDamage(data.tg_id, data.id_warrior),
      onSuccess: (data) => {
        const moneyCoin: number = data.money;
        dispatch(coinActions.updateCoinMinus(moneyCoin));
        queryClient.invalidateQueries({queryKey: ["army", tg_id]})
      },
    },
    queryClient
  );

  const upSpeedMutate = useMutation(
    {
      mutationFn: (data: { tg_id: string; id_warrior: number }) =>
        upSpeed(data.tg_id, data.id_warrior),
      onSuccess: (data) => {
        const moneyCoin: number = data.money;
        dispatch(coinActions.updateCoinMinus(moneyCoin));
        queryClient.invalidateQueries({queryKey: ["army", tg_id]})
      },
    },
    queryClient
  );

  const handleUpDamage = (id_warrior: number) => {
    upDamageMutate.mutate({ tg_id, id_warrior });
  };

  const handleUpSpeed = (id_warrior: number) => {
    upSpeedMutate.mutate({ tg_id, id_warrior });
  };

  return (
    <div className={style.upgradeBlock}>
      <ul>
        {armyUser &&
          armyUser.map((item) => (
            <li key={item.id_warrior}>
                <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name} warrior</p>
                <div>
                  <p>{item.lvl_speed} speed lvl</p>
                  <p>{item.speed} sec</p>
                  {infoUser && (
                    <button
                        onClick={() => handleUpSpeed(item.id_warrior)}
                        disabled={item.price_speed > infoUser.money}
                    >
                        {item.price_speed} coin
                    </button>
                  )}
                </div>
                <div>
                  <p>{item.lvl_damage} damage lvl</p>
                  <p>{item.damage} damage</p>
                  {infoUser && (
                    <button
                      onClick={() => handleUpDamage(item.id_warrior)}
                      disabled={item.price_damage > infoUser?.money}
                    >
                      {item.price_damage} coin
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ArmyList;
