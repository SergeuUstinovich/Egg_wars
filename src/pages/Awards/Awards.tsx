import style from "./Awards.module.scss";
import Modal from "../../ui/Modal/Modal";
import awardsCalendar from "../../assets/img/awardsCalendar.png";
import { Button } from "../../ui/Button";
import { ProgressBarAwards } from "../../components/ProgressBarAwards/ProgressBarAwards";
import coinMoney from "../../assets/img/coinMoney.png";
import diamondMoney from "../../assets/img/diamondMoney.png";
import {useState} from "react";
import {AwardsItem} from "./AwardsItem.tsx";
import {useQuery } from "@tanstack/react-query";
import { awardsChestsGet } from "../../api/awardsApi.ts";
import { useTelegram } from "../../provider/telegram/telegram.ts";
import { queryClient } from "../../api/queryClient.ts";

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [receivedAwards, setReceivedAwards] = useState<boolean[]>(new Array(7).fill(false));
  
  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  const handleCloseModal = () => {
    setIsOpenModal(false);
  }

  const { tg_id, tg } = useTelegram();

  const queryAwards = useQuery({
    queryFn: () => awardsChestsGet(tg_id),
    queryKey: ['test'],
  }, queryClient)

  const test = () => {
    console.log(queryAwards.data)
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
              <Button onClick={test} className={style.awardsButton}>
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
