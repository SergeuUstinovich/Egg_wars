import style from "./Layout.module.scss";
import CoinsDiamond from "../CoinsDiamond/CoinsDiamond";
import GameField from "../GameField/GameField";


function Layout() {
  return (
    <>
      <header>
        <CoinsDiamond />
      </header>
      <main className={style.main}>
        {/* <p>{useTelegram().userName}</p> */}
        <GameField />
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;
