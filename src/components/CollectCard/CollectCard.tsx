import CategoriesTitle from "../CategoriesTitle/CategoriesTitle";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import style from "./CollectCatr.module.scss";

import imgValue2 from "../../assets/img/cards_value2.png";
import { Button } from "../../ui/Button";
import { Bonuses } from "../../types/BonusFriend";

function CollectCard({ My_Bonus_Card }: Bonuses) {
  return (
    <div className={style.CardBlock}>
      <CategoriesTitle title="Collect Card" />
      <div className={style.bgBar}>
        <Button className={style.info}>i</Button>
        <div className={style.infoName}>
          <p className={style.nameUnit}>{My_Bonus_Card?.name}</p>
        </div>
        <div className={style.progressBar}>
          <img className={style.value} src={imgValue2} alt="" />
          {My_Bonus_Card && (
            <ProgressBar
              max={My_Bonus_Card.max_cards}
              value={My_Bonus_Card.now_cards}
              textProg
            />
          )}
          <div className={style.king}>
            <img className={style.card} src={My_Bonus_Card?.image} alt="" />
            <div className={style.cardLvl}>{My_Bonus_Card?.evolve_lvl}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectCard;
