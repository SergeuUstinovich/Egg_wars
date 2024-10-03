import style from "./Awards.module.scss";
import Modal from "../../ui/Modal/Modal";
import awardsCalendar from "../../assets/img/awardsCalendar.png";
import { Button } from "../../ui/Button";
import { AwardsCheckbox } from "../../assets/svg/AwardsCheckbox";

interface AwardsProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const awardsArr = [
  {
    id: 1,
    title: "day 1",
    money: "50.000",
    diamonds: "500",
  },
  {
    id: 2,
    title: "day 2",
    money: "50.000",
    diamonds: "500",
  },
  {
    id: 3,
    title: "day 3",
    money: "50.000",
    diamonds: "500",
  },
  {
    id: 4,
    title: "day 4",
    money: "50.000",
    diamonds: "500",
  },
  {
    id: 5,
    title: "day 5",
    money: "50.000",
    diamonds: "500",
  },
  {
    id: 6,
    title: "day 6",
    money: "50.000",
    diamonds: "500",
  },
  {
    id: 7,
    title: "day 7",
    money: "50.000",
    diamonds: "500",
  },
];

const Awards = ({ isOpen, onClose }: AwardsProps) => {
  return (
    <Modal onClose={onClose} hiddenClose isOpen={isOpen}>
      <div className={style.awardsBlock}>
        <img
          className={style.awardsImg}
          src={awardsCalendar}
          alt="awardsCalendar"
        />
        <div className={style.awardsJewel}>
          <div className={style.awardsLine}>
            <AwardsCheckbox />
            <Button>8</Button>
            <Button>12</Button>
            <Button>22</Button>
            <Button>30</Button>
          </div>
        </div>
        <ul className={style.awardsGrid}>
          {awardsArr.map((item) => (
            <li className={style.awardsElement} key={item.id}>
              <Button className={style.awardsButton}>
                <h3 className={style.awardsTitle}>{item.title}</h3>
                <div className={style.awardsDown}>
                  <p>{item.money}</p>
                  <p>{item.diamonds}</p>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default Awards;
