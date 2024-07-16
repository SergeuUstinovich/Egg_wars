import style from "./Layout.module.scss";
import CoinsDiamond from "../CoinsDiamond/CoinsDiamond";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <>
    {/* <p>{useTelegram().userName}</p> */}
      <header className={style.headers}>
        <CoinsDiamond />
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
      <footer className={style.footers}>
        <NavBar />
      </footer>
    </>
  );
}

export default Layout;
