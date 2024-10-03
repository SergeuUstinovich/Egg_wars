import style from "./ArmyList.module.scss";
import { ArmyType } from "../../types/ArmyType";
import iconLevel from "../../assets/img/level.png";
import { Link, Outlet } from "react-router-dom";
import imgCards from "../../assets/img/card icon.png";

interface ArmyList {
  army?: ArmyType[];
}

function ArmyList({ army }: ArmyList) {
  return (
    <div className={style.upgradeBlock}>
      <ul className={style.upgradeList}>
        {army &&
          army.map((item) => (
            <li className={style.upgradeListItem} key={item.id_warrior}>
              <Link
                to={`unit/${item.id_warrior}`}
                className={style.upgradeLink}
              >
                <img
                  className={style.upgradeListImg}
                  src={item.image}
                  alt={item.name}
                />
                <div className={style.box_lvl}>
                  {" "}
                  <img className={style.shield} src={iconLevel} />
                  <p className={style.title_lvl}>8</p>
                </div>
                <div className={style.box_progress_lvl}>
                  <img className={style.imgCards} src={imgCards} />
                  <div className={style.progress_lvl}></div>
                  <span className={style.text_progress_lvl}>8/14</span>
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <Outlet />
    </div>
  );
}
export default ArmyList;
