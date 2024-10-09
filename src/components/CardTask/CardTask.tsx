import style from "./CardTask.module.scss";
import iconTask from "../../assets/img/iconYouTube.png";
import iconCoin from "../../assets/img/iconCoin.png";
import iconArrow from "../../assets/img/iconArrowTask.png";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import ModalTasks from "./ModalTasks";

export default function CardTask() {
  const [isVision, setIsVision] = useState(false);
  const onOpen = () => {
    setIsVision(true);
  };

  const onClose = () => {
    setIsVision(false);
  };
  return (
    <li className={style.container} onClick={onOpen}>
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
      <Modal isOpen={isVision} onClose={onClose} hiddenClose>
        <ModalTasks />
      </Modal>
    </li>
  );
}
