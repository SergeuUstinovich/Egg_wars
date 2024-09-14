import style from "./ArmyList.module.scss";
import { ArmyType } from "../../types/ArmyType";
import { Link, Outlet } from "react-router-dom";

interface ArmyList {
  army?: ArmyType[];
}

function ArmyList({ army }: ArmyList) {
  return (
    <div className={style.upgradeBlock}>
      <ul className={style.upgradeList}>
        {army &&
          army.map((item) => (
            <li key={item.id_warrior}>
              <Link
                to={`unit/${item.id_warrior}`}
                className={style.upgradeLink}
              >
                <img src={item.image} alt={item.name} />
              </Link>
            </li>
          ))}
      </ul>
      <Outlet />
    </div>
  );
}
export default ArmyList;
