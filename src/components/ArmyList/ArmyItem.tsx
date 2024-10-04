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
import SlidingPanel from "../../ui/SlidingPanel/SlidingPanel";
import { useState } from "react";
import iconLevel from "../../assets/img/level.png";
import imgCards from "../../assets/img/card icon.png";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";

interface ArmyItemProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArmyItem = ({ isOpen, onClose }: ArmyItemProps) => {
  // const [unitArr, setUnitArr] = useState<ArmyType[]>();
  // const [unit, setUnit] = useState<ArmyType>();
  const infoUser = useSelector(getCoin);
  const { tg_id } = useTelegram();
  const dispatch = useDispatch();
  const armyUser = useSelector(getArmy);
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

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
      classNameModal={style.modalItem}
      classNameOverlay={style.modalOverlay}
    >
      <SlidingPanel
        className={style.slidingPanel}
        onClose={onClose}
        isOpen={open}
        initialHeight="40%"
        fullHeight="100%"
      >
        <div className={style.upgradeItem}>
          {unit && (
            <div className={style.itemBlock}>
              <div
                className={style.itemElement}
                style={{ padding: "10px", position: "relative" }}
              >
                <img
                  className={style.upgradeListImg}
                  src={unit.image}
                  alt={unit.name}
                />
                <div className={style.box_lvl}>
                  <img className={style.shield} src={iconLevel} />
                  <p className={style.title_lvl}>{unit.lvl}</p>
                </div>
                <div className={style.box_progress_lvl}>
                  <img className={style.imgCards} src={imgCards} />
                  <div
                    className={style.progress_lvl}
                    style={{ width: `${lvlInBar()}%` }}
                  ></div>
                  <span
                    className={style.text_progress_lvl}
                  >{`${unit.cards}/${unit.max_cards}`}</span>
                </div>
                <Button className={style.evolveButton}>Evolve</Button>
              </div>
              <div className={style.itemCharacter}>
                <h2 className={style.unitTitle}>{unit.name} warrior</h2>
                <p className={style.unitCP}>CP 234</p>
                <ProgressBar className={style.progress} value={10} max={100} />
                <ul className={style.itemList}>
                  <li className={style.unitItem}>
                    <p className={style.unitCharacter}>
                      {unit.lvl_speed} speed lvl
                    </p>
                    <p className={style.unitUtil}>{unit.speed} sec</p>
                    {infoUser && (
                      <button
                        className={style.itemButton}
                        onClick={() => handleUpSpeed(unit.id_warrior)}
                        disabled={unit.price_speed > infoUser.money}
                      >
                        {unit.price_speed} coin
                      </button>
                    )}
                  </li>
                  <li className={style.unitItem}>
                    <p className={style.unitCharacter}>
                      {unit.lvl_damage} damage lvl
                    </p>
                    <p className={style.unitUtil}>{unit.damage} damage</p>
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
      </SlidingPanel>
    </ModalRoute>
  );
};
