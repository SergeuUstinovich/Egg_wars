import style from "./CardTask.module.scss";
import iconTask from "../../assets/img/iconYouTube.png";
import iconCoin from "../../assets/img/iconCoin.png";
import iconArrow from "../../assets/img/iconArrowTask.png";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import ModalTasks from "./ModalTasks";
import { TaskType } from "../../types/TaskType";

interface CardTaskProps {
  task: TaskType;
}

export function formatNumberString(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function CardTask({ task }: CardTaskProps) {
  const [isVision, setIsVision] = useState(false);
  const onOpen = () => {
    setIsVision(true);
  };

  const onClose = () => {
    setIsVision(false);
  };
  // console.log(`https://eggswar.com/${task.task.picture.image}`);
  return (
    <li className={style.container} onClick={onOpen}>
      <img
        className={style.imgTask}
        src={task.task.picture ? task.task.picture.image : iconTask}
      />
      <div className={style.box_info_task}>
        <p className={style.title_task}>{task.task.name}</p>
        <div className={style.box_prize}>
          <img className={style.iconCoin} src={iconCoin} />
          <p className={style.text_prize}>
            {formatNumberString(task.task.reward_currency)}
          </p>
        </div>
      </div>
      <img className={style.iconArrow} src={iconArrow} />
      <Modal isOpen={isVision} onClose={onClose} hiddenClose>
        <ModalTasks task={task} />
      </Modal>
    </li>
  );
}
