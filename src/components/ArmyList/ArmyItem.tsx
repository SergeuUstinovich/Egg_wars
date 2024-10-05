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
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import level from "../../assets/img/level.png";
import { ArmyCloseSvg } from "../../assets/svg/ArmyCloseSvg";

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
    navigate("/upgrades/army");
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

  const lvlInBar = () => {
    if (unit?.cards && unit.max_cards) {
      return (unit.cards * 100) / unit.max_cards;
    }
  };

  return (
    <ModalRoute
      classNameModal={style.modal}
      classNameContent={style.modalContent}
      classNameOverlay={style.modalOverlay}
    >
      <div className={style.upgradeItem}>
        {unit && (
          <div style={{ height: "100%", overflow: "hidden" }}>
            <p className={style.upgradeCP}>CP 253</p>
            <ProgressBar className={style.progressUnit} value={30} max={100} />
            <div className={style.upgradeDown}>
              <h1 className={style.upgradeTitle}>{unit.name}</h1>
              <ProgressBar
                className={style.upgradeProgressCards}
                value={30}
                max={1000}
              >
                <img src={level} alt="" />
              </ProgressBar>
              <Button className={style.upgradeEvolve}>Evolve</Button>
              <div>
                <ul className={style.upgradeListEvolve}>
                  <li className={style.upgradeListItem}>
                    <strong>{unit.lvl_speed} speed lvl</strong>
                    <Button onClick={() => handleUpSpeed(unit.id_warrior)}>
                      {unit.price_speed}
                    </Button>
                  </li>
                  <li className={style.upgradeListItem}>
                    <strong>{unit.lvl_damage} damage lvl</strong>
                    <Button onClick={() => handleUpDamage(unit.id_warrior)}>
                      {unit.price_damage}
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <Button onClick={handleBack} className={style.closeItem}>
          <ArmyCloseSvg />
        </Button>
      </div>
    </ModalRoute>
  );
};
