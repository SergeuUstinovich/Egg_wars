import style from "./Layout.module.scss";
import CoinsDiamond from "../CoinsDiamond/CoinsDiamond";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
// import { useTelegram } from "../../provider/telegram/telegram";
import GameField from "../GameField/GameField";


function Layout() {
  // const {tg_id, userName} = useTelegram()
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
