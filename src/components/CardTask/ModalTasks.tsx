import iconTask from "../../assets/img/iconYouTube.png";
import { Button } from "../../ui/Button";
import iconCoin from "../../assets/img/iconCoin.png";
import style from "./CardTask.module.scss";
import { TaskType } from "../../types/TaskType";
import { formatNumberString } from "./CardTask";

interface ModalTasksProps {
  task: TaskType;
}

export default function ModalTasks({ task }: ModalTasksProps) {
  return (
    <div className={style.modal_content}>
      <img className={style.imgTask_modal} src={iconTask} />
      <p className={style.task_title_modal}>{task.task.name}</p>
      <Button className={style.btn_join}>Join</Button>
      <div className={style.box_prize}>
        <img className={style.iconCoin} src={iconCoin} />
        <p className={style.text_prize_modal}>
          {formatNumberString(task.task.reward_currency)}
        </p>
      </div>
      <Button className={style.btn_check}>Check</Button>
    </div>
  );
}
