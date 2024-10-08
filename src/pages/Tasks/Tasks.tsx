import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Tasks.module.scss";
import tasksIcon from "../../assets/img/tasksTitle.png";
import CardTask from "../../components/CardTask/CardTask";

function Tasks() {
  return (
    <ModalRoute>
      <div className={style.tasksBlock}>
        <h2 className={style.tasksTitle}>
          <img src={tasksIcon} alt="tasksIcon" />
          <span>Tasks</span>
        </h2>
      </div>
      <div className={style.tasksInf}>
        <CardTask />
      </div>
    </ModalRoute>
  );
}

export default Tasks;
