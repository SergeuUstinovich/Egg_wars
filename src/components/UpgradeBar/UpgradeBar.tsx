import style from "./UpgradeBar.module.scss";
import { Link, useLocation } from "react-router-dom";

interface upgradeBarProp {
  key: number;
  path: string;
  label: string;
}

const upgradeBarArr: upgradeBarProp[] = [
  {
    key: 1,
    path: "/upgrades/army",
    label: "Army",
  },
  {
    key: 2,
    path: "/upgrades/passive",
    label: "Passive",
  },
  {
    key: 3,
    path: "/upgrades/special",
    label: "Special",
  },
];

export const UpgradeBar = () => {
  const location = useLocation();

  return (
    <ul className={style.upgradeList}>
      {upgradeBarArr.map((item) => (
        <li key={item.key}>
          <Link
            className={
              location.pathname === item.path
                ? style.upgradeLinkActive
                : style.upgradeLink
            }
            to={item.path}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
