import style from "./ModalBoxes.module.scss";
import Modal from "../Modal/Modal";

import coinMoney from "../../assets/img/coinMoney.png";
import iconCard from "../../assets/img/card icon.png";
import yourReward from "../../assets/img/yourReward.png";
import silverChest from "../../assets/img/ironChest.png";
import rotateLuis from "../../assets/img/rotateLuis.png";
import { Button } from "../Button";
import { BoxPrizeType } from "../../types/BoxesType";

interface ModalBoxesProps {
  isOpen: boolean;
  onClose: () => void;
  box_prize: BoxPrizeType;
}

export const ModalBoxes = ({ isOpen, onClose, box_prize }: ModalBoxesProps) => {
  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <div className={style.awardsItemBlock}>
        <div className={style.yourRewardBlock}>
          <img className={style.chestAwards} src={silverChest} alt="" />
          <div className={style.rotateBlock}>
            <img className={style.rotate} src={rotateLuis} alt="" />
          </div>
          <img style={{ zIndex: "5" }} src={yourReward} alt="" />
        </div>
        <div className={style.awardsItems}>
          <div className={style.awardsGridItem}>
            <img src={coinMoney} alt="" />
            <p>{box_prize.currency_received}</p>
          </div>
          <div className={style.awardsGridItem}>
            <img src={iconCard} alt="" />
            <p>{box_prize.card_count}</p>
          </div>
        </div>
        <Button onClick={onClose} className={style.awardsItemButton}>
          Claim
        </Button>
      </div>
    </Modal>
  );
};
