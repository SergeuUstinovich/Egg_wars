import style from "./Awards.module.scss";
import Modal from "../../ui/Modal/Modal";
import awardsCalendar from "../../assets/img/awardsCalendar.png";
import { Button } from "../../ui/Button";
import { ProgressBarAwards } from "../../components/ProgressBarAwards/ProgressBarAwards";
import coinMoney from "../../assets/img/coinMoney.png";
import diamondMoney from "../../assets/img/diamondMoney.png";
import {useState} from "react";
import {AwardsItem} from "./AwardsItem.tsx";

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
    disabled: true,
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
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [onCloseModal, setOnCloseModal] = useState(true)
  const handleOpenModal = () => {
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setOnCloseModal(false)
  }

  return (
    <Modal lazy onClose={onClose} hiddenClose isOpen={isOpen}>
      <div className={style.awardsBlock}>
        <img
          className={style.awardsImg}
          src={awardsCalendar}
          alt="awardsCalendar"
        />
        <ProgressBarAwards value={0} max={100} />
        <ul className={style.awardsGrid}>
          {awardsArr.map((item) => (
            <li className={style.awardsElement} key={item.id}>
              <Button onClick={handleOpenModal} isDisabled={item.disabled} className={style.awardsButton}>
                <h3 className={style.awardsTitle}>{item.title}</h3>
                <div className={style.awardsDown}>
                  <p>
                    <img src={coinMoney} alt="" />
                    <span>{item.money}</span>
                  </p>
                  <p>
                    <img src={diamondMoney} alt="" />
                    <span>{item.diamonds}</span>
                  </p>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <AwardsItem isOpen={isOpenModal} onClose={handleCloseModal}/>
    </Modal>
  );
};

export default Awards;
