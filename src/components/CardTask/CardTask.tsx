import style from "./CardTask.module.scss";
import iconCoin from "../../assets/img/iconCoin.png";
import iconArrow from "../../assets/img/iconArrowTask.png";
import iconDone from "../../assets/img/iconDoneTask.png";
import Modal from "../../ui/Modal/Modal";
import { useEffect, useState } from "react";
import ModalTasks from "./ModalTasks";
import { TaskType } from "../../types/TaskType";
import { getImgTask } from "../../helpers/returnImageTask";
import ModalAccumTask from "./ModalAccumTask";

interface CardTaskProps {
  task: TaskType;
}

export function formatNumberString(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function CardTask({ task }: CardTaskProps) {
  const [isVision, setIsVision] = useState(false);
  const [icon, setIcon] = useState<string>();
  const onOpen = () => {
    setIsVision(true);
  };

  const onClose = () => {
    setIsVision(false);
  };

  useEffect(() => {
    getImgTask(task.task.dop_name, setIcon);
  }, [task]);
  return (
    <li className={style.container} onClick={onOpen}>
      <img className={style.imgTask} src={icon} />
      <div className={style.box_info_task}>
        <p className={style.title_task}>{task.task.name}</p>
        <div className={style.box_prize}>
          <img className={style.iconCoin} src={iconCoin} />
          <p className={style.text_prize}>
            {formatNumberString(task.task.reward_currency)}
          </p>
        </div>
      </div>
      {task.completed ? (
        <img className={style.iconDone} src={iconDone} />
      ) : (
        <img className={style.iconArrow} src={iconArrow} />
      )}

      <Modal isOpen={isVision} onClose={onClose} hiddenClose>
        {task.task.task_type === "one_time" && <ModalTasks task={task} />}
        {task.task.task_type === "accumulative" && (
          <ModalAccumTask task={task} />
        )}
      </Modal>
    </li>
  );
}
