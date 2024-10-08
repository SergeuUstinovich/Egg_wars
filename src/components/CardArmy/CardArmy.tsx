import { Link } from "react-router-dom";
import { ArmyType } from "../../types/ArmyType";
import iconLevel from "../../assets/img/level.png";
import imgCards from "../../assets/img/card icon.png";
import style from "./CardArmy.module.scss";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";

interface ArmyCard {
  army: ArmyType;
}

export default function CardArmy({ army }: ArmyCard) {
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
