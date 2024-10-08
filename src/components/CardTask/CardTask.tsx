import style from "./CardTask.module.scss";
import iconTask from "../../assets/img/iconYouTube.png";
import iconCoin from "../../assets/img/iconCoin.png";
import iconArrow from "../../assets/img/iconArrowTask.png";

export default function CardTask() {
  return (
    <div className={style.container}>
      <img className={style.imgTask} src={iconTask} />
      <div className={style.box_info_task}>
        <p className={style.title_task}>
          FTX’s $12.7 billions settelements. Billions to be paid!
        </p>
        <div className={style.box_prize}>
          <img className={style.iconCoin} src={iconCoin} />
          <p className={style.text_prize}>30 000</p>
        </div>
      </div>
      <img className={style.iconArrow} src={iconArrow} />
    </div>
  );
}
