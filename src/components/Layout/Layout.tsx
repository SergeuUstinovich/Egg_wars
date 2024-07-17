import style from "./Layout.module.scss";
import CoinsDiamond from "../CoinsDiamond/CoinsDiamond";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { useTelegram } from "../../provider/telegram/telegram";


function Layout() {
  return (
    <>
    
      <header className={style.headers}>
        <CoinsDiamond />
      </header>
      <main className={style.main}>
      <p>{useTelegram().tg_id}</p>
        <Outlet />
      </main>
      <footer className={style.footers}>
        <NavBar />
      </footer>
    </>
  );
}

export default Layout;
