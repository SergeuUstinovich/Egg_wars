import style from "./Layout.module.scss";
import CoinsDiamond from "../../components/CoinsDiamond/CoinsDiamond";
import NavBar from "../../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import GameField from "../../components/GameField/GameField";


function Layout() {
  return (
    <>
      <header className={style.headers}>
        <CoinsDiamond />
      </header>
      <main className={style.main}>
        <GameField />
        <Outlet />
      </main>
      <footer className={style.footers}>
        <NavBar />
      </footer>
    </>
  );
}

export default Layout;
