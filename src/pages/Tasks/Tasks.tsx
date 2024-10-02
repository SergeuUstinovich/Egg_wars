import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Tasks.module.scss";
import tasksIcon from "../../assets/img/tasksTitle.png";

function Tasks() {
  return (
    <ModalRoute>
      <div className={style.tasksBlock}>
        <h2 className={style.tasksTitle}>
          <img src={tasksIcon} alt="tasksIcon" />
          <span>Tasks</span>
        </h2>
        <div className="tasksInf"></div>
      </div>
    </ModalRoute>
  );
}

export default Tasks;
