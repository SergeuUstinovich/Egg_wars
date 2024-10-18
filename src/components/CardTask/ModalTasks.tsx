import { Button } from "../../ui/Button";
import iconCoin from "../../assets/img/iconCoin.png";
import style from "./CardTask.module.scss";
import { TaskType } from "../../types/TaskType";
import { formatNumberString } from "./CardTask";
import { useEffect, useState } from "react";
import { getImgTask } from "../../helpers/returnImageTask";
import { useTelegram } from "../../provider/telegram/telegram";
import { useMutation } from "@tanstack/react-query";
import { checkTask } from "../../api/tasksApi";
import { queryClient } from "../../api/queryClient";

export interface ModalTasksProps {
  onClose: () => void;
  task: TaskType;
}

export default function ModalTasks({ task, onClose }: ModalTasksProps) {
  const { tg_id } = useTelegram();
  const [icon, setIcon] = useState<string>();
  useEffect(() => {
    getImgTask(task.task.dop_name, setIcon);
  }, [task]);

  const checkCompletTask = useMutation(
    {
      mutationFn: (data: { tg_id: string; dop_name: string }) =>
        checkTask(data.tg_id, data.dop_name),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["taskList"] });
        onClose();
      },
    },
    queryClient
  );

  const onClick = () => {
    checkCompletTask.mutate({ tg_id, dop_name: task.task.dop_name });
  };

  return (
    <div className={style.modal_content}>
      <img className={style.imgTask_modal} src={icon} />
      <p className={style.task_title_modal}>{task.task.name}</p>
      <Button className={style.btn_join}>Join</Button>
      <div className={style.box_prize}>
        <img className={style.iconCoin} src={iconCoin} />
        <p className={style.text_prize_modal}>
          {formatNumberString(task.task.reward_currency)}
        </p>
      </div>
      <Button onClick={onClick} className={style.btn_check}>
        Check
      </Button>
    </div>
  );
}
