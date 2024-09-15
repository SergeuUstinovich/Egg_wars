import style from "./Upgrade.module.scss";
import { UpgradeBar } from "../../components/UpgradeBar/UpgradeBar";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
// import style from "./Upgrage.module.scss";
import { Link, Outlet } from "react-router-dom";
import upgradeIcon from "../../assets/img/upgradeTitle.png";
import upgradeBack from "../../assets/img/upgradeBack.png";

function Upgrade() {
  return (
    <ModalRoute
      classNameModal={style.upgradeModal}
      classNameOverlay={style.upgradeOverlay}
      classNameContent={style.upgradeContent}
    >
      <div className={style.upgradeBlock}>
        <h2 className={style.upgradeTitle}>
          <img src={upgradeIcon} alt="upgradeIcon" />
          <span>Upgrades</span>
        </h2>
        <UpgradeBar />
        <div className={style.upgradeInf}>
          <p>
            Total army count:
            <span className={style.upgradeNumbers}>35 000</span>
          </p>
          <p>
            Total army damage:
            <span className={style.upgradeNumbers}>35 000</span>
          </p>
        </div>
        <Outlet />
        <Link className={style.upgradeBack} to={"/"}>
          <img src={upgradeBack} alt="домой" />
        </Link>
      </div>
    </ModalRoute>
  );
}
export default Upgrade;
