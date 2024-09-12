import style from "./UpgradeBar.module.scss";
import { Link } from "react-router-dom";

export const UpgradeBar = () => {
  return (
    <nav>
      <ul className={style.upgradeBarList}>
        <li>
          <Link className={style.upgradeBarItem} to={"army"}>
            Army
          </Link>
        </li>
        <li>
          <Link className={style.upgradeBarItem} to={"passive"}>
            Passive
          </Link>
        </li>
        <li>
          <Link className={style.upgradeBarItem} to={"special"}>
            Special
          </Link>
        </li>
      </ul>
    </nav>
  );
};
