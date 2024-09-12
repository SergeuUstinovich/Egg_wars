import style from "./ArmyList.module.scss";
import { ArmyType } from "../../types/ArmyType";
import { Button } from "../../ui/Button";
import upgradeIcon from "../../assets/img/upgradeTitle.png";

interface ArmyList {
  army?: ArmyType[];
}

function ArmyList({ army }: ArmyList) {
  return (
    <div className={style.upgradeBlock}>
      <h2 className={style.upgradeTitle}>
        <img src={upgradeIcon} alt="upgradeIcon" />
        <span>Upgrades</span>
      </h2>
      <ul className={style.upgradeList}>
        {army &&
          army.map((item) => (
            <li key={item.id_warrior}>
              <Button className={style.upgradeLink}>
                <img src={item.image} alt={item.name} />
              </Button>
            </li>
          ))}
      </ul>
    </div>
  );
}
export default ArmyList;
