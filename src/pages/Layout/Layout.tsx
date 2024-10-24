import style from "./Layout.module.scss";
import CoinsDiamond from "../../components/CoinsDiamond/CoinsDiamond";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import GameField from "../../components/GameField/GameField";
import BtnGemaField from "../../components/BtnGemaField/BtnGemaField";
import imgTasks from "../../assets/img/tasks.png";
import imgUpgrades from "../../assets/img/upgrades.png";
import imgBoosters from "../../assets/img/boosters.png";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUrlParams } from "../../helpers/searchParthners";
import Awards from "../Awards/Awards";

function Layout() {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const [u, setU] = useState<string>("");
  const [v, setV] = useState<string>("");
  const [p, setP] = useState<string>("");

  useEffect(() => {
    const { u, v, p } = getUrlParams();
    if (u && v && p) {
      setU(u);
      setV(v);
      setP(p);
    }
  }, []);

  return (
    <>
      <header className={style.headers}>
        <Toaster position="top-center" reverseOrder={false} />
        <CoinsDiamond />
      </header>
      <main className={style.main}>
        <GameField />
        <BtnGemaField
          text={"Tasks"}
          img={imgTasks}
          path={"/tasks"}
          bottonP={"35"}
          left={"3"}
        />
        <BtnGemaField
          text={"Upgrades"}
          img={imgUpgrades}
          path={"/upgrades"}
          bottonP={"24"}
          left={"3"}
          onClick={() => handleNavigate("upgrades/army")}
        />
        <BtnGemaField
          text={"Boosters"}
          img={imgBoosters}
          path={"/boosters"}
          bottonP={"24"}
          right={"3"}
        />
        <Outlet />
        {/* <Awards /> */}
      </main>
      <footer className={style.footers}>
        <NavBar />
      </footer>
    </>
  );
}

export default Layout;
