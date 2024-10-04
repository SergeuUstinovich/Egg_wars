import { Link } from "react-router-dom";
import { ArmyType } from "../../types/ArmyType";
import iconLevel from "../../assets/img/level.png";
import imgCards from "../../assets/img/card icon.png";
import style from "./CardArmy.module.scss";

interface ArmyCard {
  army: ArmyType;
}

export default function CardArmy({ army }: ArmyCard) {
  const lvlInBar = () => {
    if (army.cards && army.max_cards) {
      return (army.cards * 100) / army.max_cards;
    }
  };

  return (
    <li className={style.upgradeListItem}>
      <Link to={`unit/${army.id_warrior}`} className={style.upgradeLink}>
        <img
          className={style.upgradeListImg}
          src={army.image}
          alt={army.name}
        />
        <div className={style.box_lvl}>
          <img className={style.shield} src={iconLevel} />
          <p className={style.title_lvl}>{army.lvl}</p>
        </div>
        <div className={style.box_progress_lvl}>
          <img className={style.imgCards} src={imgCards} />
          <div
            className={style.progress_lvl}
            style={{ width: `${lvlInBar()}%` }}
          ></div>
          <span
            className={style.text_progress_lvl}
          >{`${army.cards}/${army.max_cards}`}</span>
        </div>
      </Link>
    </li>
  );
}
