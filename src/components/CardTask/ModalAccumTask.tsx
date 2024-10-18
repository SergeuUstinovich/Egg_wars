import { useEffect, useState } from "react";
import { formatNumberString } from "./CardTask";
import iconCoin from "../../assets/img/iconCoin.png";
import style from "./CardTask.module.scss";
import { ModalTasksProps } from "./ModalTasks";
import { getImgTask } from "../../helpers/returnImageTask";
import { Button } from "../../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { checkAccumTask, checkTask } from "../../api/tasksApi";
import { queryClient } from "../../api/queryClient";
import { useTelegram } from "../../provider/telegram/telegram";

export default function ModalAccumTask({ task }: ModalTasksProps) {
  const { tg_id } = useTelegram();
  const [icon, setIcon] = useState<string>();
  useEffect(() => {
    getImgTask(task.task.dop_name, setIcon);
  }, [task]);

  const checkCompletTask = useMutation(
    {
      mutationFn: (data: { tg_id: string; dop_name: string }) =>
        checkAccumTask(data.tg_id, data.dop_name),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["taskList"] });
      },
    },
    queryClient
  );

  const onClick = () => {
    checkCompletTask.mutate({ tg_id, dop_name: task.task.dop_name });
  };

  return (
    <div>
      <div className={style.modal_content}>
        <img className={style.imgTask_modal} src={icon} />
        <p className={style.task_title_modal}>{task.task.name}</p>

        <div className={style.box_prize}>
          <img className={style.iconCoin} src={iconCoin} />
          <p className={style.text_prize_modal}>
            {formatNumberString(task.task.reward_currency)}
          </p>
        </div>
        <Button onClick={onClick} className={style.btn_check}>
          Claim
        </Button>
      </div>
    </div>
  );
}
