import { useDispatch, useSelector } from "react-redux";
import style from "./ArmyList.module.scss";
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin";
import { useTelegram } from "../../provider/telegram/telegram";
import { useMutation } from "@tanstack/react-query";
import { upDamage, upSpeed } from "../../api/userInfo";
import { coinActions } from "../../provider/StoreProvider";
import { queryClient } from "../../api/queryClient";
import { getArmy } from "../../provider/StoreProvider/selectors/getArmy";
import { useNavigate, useParams } from "react-router-dom";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import { CloseArmyItemSvg } from "../../assets/svg/CloseArmyItemSvg";
import { Button } from "../../ui/Button";

export const ArmyItem = () => {
  // const [unitArr, setUnitArr] = useState<ArmyType[]>();
  // const [unit, setUnit] = useState<ArmyType>();
  const infoUser = useSelector(getCoin);
  const { tg_id } = useTelegram();
  const dispatch = useDispatch();
  const armyUser = useSelector(getArmy);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  if (armyUser === undefined) {
    return null;
  }
  const unit = armyUser.find((item) => item.id_warrior === Number(id));

  // useEffect(() => {
  //   if (armyUser) {
  //     setUnitArr(armyUser);
  //   }
  // }, [armyUser]);

  // useEffect(() => {
  //   if (unitArr) {
  //     setUnit(unitArr.find((item) => item.id_warrior === Number(id)));
  //   }
  // }, [unitArr]);

  const upDamageMutate = useMutation(
    {
      mutationFn: (data: { tg_id: string; id_warrior: number }) =>
        upDamage(data.tg_id, data.id_warrior),
      onSuccess: (data) => {
        const moneyCoin: number = data.money;
        dispatch(coinActions.updateCoinMinus(moneyCoin));
        queryClient.invalidateQueries({ queryKey: ["army", tg_id] });
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
        queryClient.invalidateQueries({ queryKey: ["army", tg_id] });
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
    <ModalRoute
      classNameModal={style.modalItem}
      classNameOverlay={style.modalOverlay}
    >
      <div className={style.upgradeItem}>
        {unit && (
          <div className={style.itemBlock}>
            <img src={unit.image} alt="" />
            <div className={style.itemCharacter}>
              <h2>{unit.name} warrior</h2>
              <ul className={style.itemList}>
                <li>
                  <p>{unit.lvl_speed} speed lvl</p>
                  <p>{unit.speed} sec</p>
                  {infoUser && (
                    <button
                      onClick={() => handleUpSpeed(unit.id_warrior)}
                      disabled={unit.price_speed > infoUser.money}
                    >
                      {unit.price_speed} coin
                    </button>
                  )}
                </li>
                <li>
                  <p>{unit.lvl_damage} damage lvl</p>
                  <p>{unit.damage} damage</p>
                  {infoUser && (
                    <button
                      className={style.itemButton}
                      onClick={() => handleUpDamage(unit.id_warrior)}
                      disabled={unit.price_damage > infoUser?.money}
                    >
                      {unit.price_damage} coin
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
        )}
        <Button onClick={handleBack} className={style.closeItem}>
          <CloseArmyItemSvg />
        </Button>
      </div>
    </ModalRoute>
  );
};
