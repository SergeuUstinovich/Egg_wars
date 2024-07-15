import style from "./Header.module.scss";
import imageCoin from "../../assets/img/coin.png";
import imageDiamond from "../../assets/img/diamond.png";
import { IconBtnBuying } from "../../assets/svg/IconBtnBuying/IconBtnBuying";

export function Header() {
  return (
    <div className={style.top_bar}>
      <div className={style.content_box}>
        <div className={style.title_level}>
          {" "}
          <div className={style.text_level}>LVL </div>
          <div className={style.text_level_value}>146</div>
        </div>
        <div className={style.current_window}>
          {<img className={style.imageCoin} src={imageCoin} />}
          <div className={style.current_coins_window_value}>5 000 000</div>
          <IconBtnBuying className={style.imageBtnBuying} />
        </div>
        <div className={style.current_window}>
          <img className={style.imageDiamond} src={imageDiamond} />
          <div className={style.current_coins_window_value}>5 000 000</div>
          <IconBtnBuying className={style.imageBtnBuying} />
        </div>
      </div>
    </div>
  );
}
