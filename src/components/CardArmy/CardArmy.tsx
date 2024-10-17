import { Link, useParams } from "react-router-dom";
import { ArmyType } from "../../types/ArmyType";
import iconLevel from "../../assets/img/level.png";
import imgCards from "../../assets/img/card icon.png";
import style from "./CardArmy.module.scss";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import { useSelector } from "react-redux";
import { getArmy } from "../../provider/StoreProvider/selectors/getArmy";

interface ArmyCardProps {
  army: ArmyType;
}

export default function CardArmy({ army }: ArmyCardProps) {
  const armyUser = useSelector(getArmy);
  const { id } = useParams();
  if (armyUser === undefined) {
    return null;
  }
  const unit = armyUser.find((item) => item.id_warrior === Number(id));

  return (
    <li className={style.upgradeListItem}>
      <Link
        to={`unit/${army.id_warrior}`}
        className={unit?.lvl === 0 ? style.disable : style.upgradeLink}
      >
        <img
          className={style.upgradeListImg}
          src={army.image}
          alt={army.name}
        />
        <div className={style.box_lvl}>
          <img className={style.shield} src={iconLevel} />
          <p className={style.title_lvl}>{army.lvl}</p>
        </div>
        <ProgressBar
          colorFill="#F7A31A"
          value={army.cards}
          max={army.max_cards}
          className={style.box_progress_lvl}
        >
          <img className={style.imgCards} src={imgCards} />
          <span
            className={style.text_progress_lvl}
          >{`${army.cards}/${army.max_cards}`}</span>
        </ProgressBar>
      </Link>
    </li>
  );
}
