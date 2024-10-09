import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Tasks.module.scss";
import tasksIcon from "../../assets/img/tasksTitle.png";
import CardTask from "../../components/CardTask/CardTask";
import { Button } from "../../ui/Button";
import upgradeBack from "../../assets/img/upgradeBack.png";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/tasks");
  };
  return (
    <ModalRoute>
      <div className={style.tasksBlock}>
        <h2 className={style.tasksTitle}>
          <img src={tasksIcon} alt="tasksIcon" />
          <span>Tasks</span>
        </h2>
      </div>
      <ul className={style.tasksInf}>
        <CardTask />
        <CardTask />
        <div className={style.dividing_line_box}>
          <div className={style.dividing_line} />
          <p className={style.dividing_title}>Daily Tasks</p>
          <div className={style.dividing_line} />
        </div>
      </ul>
      <Button onClick={handleBack} className={style.closeItem}>
        <img src={upgradeBack} alt="домой" />
      </Button>
    </ModalRoute>
  );
}

export default Tasks;
