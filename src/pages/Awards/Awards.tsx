import style from "./Awards.module.scss";
import Modal from "../../ui/Modal/Modal";
import awardsCalendar from "../../assets/img/awardsCalendar.png";
import { Button } from "../../ui/Button";
import { ProgressBarAwards } from "../../components/ProgressBarAwards/ProgressBarAwards";
import coinMoney from "../../assets/img/coinMoney.png";
import diamondMoney from "../../assets/img/diamondMoney.png";
import {useEffect, useState} from "react";
import {AwardsItem} from "./AwardsItem.tsx";
import { useTelegram } from "../../provider/telegram/telegram.ts";
import { awardsChests } from "../../api/awardsApi.ts";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient.ts";
import { getUrlParams } from "../../helpers/searchParthners.ts";

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

const Awards = () => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const awardsShown = localStorage.getItem("awardsShown");
    const { u, v, p } = getUrlParams();
    if (u && v && p) {
      localStorage.setItem("awardsShown", "true");
    } else {
      if (!awardsShown) {
        setOpenModal(true);
      }
    }
  }, []);

  const handleStartClick = () => {
    localStorage.setItem("awardsShown", "true");
    setOpenModal(false);
  };

  const { tg_id } = useTelegram();
  
  const awardsQuery = useQuery({
    queryFn: () => awardsChests(tg_id),
    queryKey: ["awardsChests"],
    enabled: !!tg_id,
  }, queryClient);

  useEffect(() => {
    if (awardsQuery.data) {
      console.log(awardsQuery.data);
    }
  }, [awardsQuery]);

  const handleTest = () => {
    console.log(awardsQuery.data);
  };


  return (
    <Modal lazy hiddenClose onClose={handleStartClick} isOpen={openModal}>
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
              <Button onClick={handleTest} className={style.awardsButton}>
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
      {/* <AwardsItem isOpen={isOpenModal} onClose={handleCloseModal}/> */}
    </Modal>
  );
};

export default Awards;
