import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Tasks.module.scss";
import tasksIcon from "../../assets/img/tasksTitle.png";
import CardTask from "../../components/CardTask/CardTask";
import { Button } from "../../ui/Button";
import upgradeBack from "../../assets/img/upgradeBack.png";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { listTasks } from "../../api/tasksApi";
import { useTelegram } from "../../provider/telegram/telegram";
import { queryClient } from "../../api/queryClient";
import { useEffect, useState } from "react";
import { TaskType } from "../../types/TaskType";

function Tasks() {
  const { tg_id } = useTelegram();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const [tasksOneTimeList, setTasksOneTimeList] = useState<TaskType[]>();
  const [tasksAccumulativeList, setTasksAccumulativeList] =
    useState<TaskType[]>();

  const { data } = useQuery(
    {
      queryKey: ["taskList"],
      queryFn: () => listTasks(tg_id),
    },
    queryClient
  );

  useEffect(() => {
    if (data) {
      const result: TaskType[] = [];
      const resultAcc: TaskType[] = [];
      data.map((item: TaskType) => {
        if (item.task.task_type === "one_time") {
          result.push(item);
        } else {
          resultAcc.push(item);
        }
      });
      setTasksAccumulativeList(resultAcc);
      setTasksOneTimeList(result);
    }
  }, [data]);

  return (
    <ModalRoute classNameModal={style.modalRoute} classNameOverlay={style.modalOverlay} classNameContent={style.modalContent}>
      <div className={style.tasksBlock}>
        <h2 className={style.tasksTitle}>
          <img src={tasksIcon} alt="tasksIcon" />
          <span>Tasks</span>
        </h2>
      </div>
      <ul className={style.tasksInf}>
        {data &&
          tasksOneTimeList?.map((item) => (
            <CardTask task={item} key={item.id} />
          ))}
        <div className={style.dividing_line_box}>
          <div className={style.dividing_line} />
          <p className={style.dividing_title}>Daily Tasks</p>
          <div className={style.dividing_line} />
        </div>
        {data &&
          tasksAccumulativeList?.map((item) => (
            <CardTask task={item} key={item.id} />
          ))}
      </ul>
      <Button onClick={handleBack} className={style.closeItem}>
        <img src={upgradeBack} alt="домой" />
      </Button>
    </ModalRoute>
  );
}

export default Tasks;
