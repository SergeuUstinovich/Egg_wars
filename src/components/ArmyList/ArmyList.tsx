import style from "./ArmyList.module.scss";
import { ArmyType } from "../../types/ArmyType";
import { Outlet } from "react-router-dom";
import CardArmy from "../CardArmy/CardArmy";

interface ArmyList {
  army?: ArmyType[];
}

function ArmyList({ army }: ArmyList) {
  return (
    <div className={style.upgradeBlock}>
      <ul className={style.upgradeList}>
        {army &&
          army.map((item: ArmyType) => (
            <CardArmy army={item} key={item.id_warrior} />
          ))}
      </ul>
      <Outlet />
    </div>
  );
}
export default ArmyList;
