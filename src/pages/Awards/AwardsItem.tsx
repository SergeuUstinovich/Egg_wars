import style from './Awards.module.scss'
import Modal from "../../ui/Modal/Modal.tsx";
import {Button} from "../../ui/Button";
import coinMoney from "../../assets/img/coinMoney.png";
import diamondMoney from "../../assets/img/diamondMoney.png";
import yourReward from '../../assets/img/yourReward.png'

interface AwardsProps {
  isOpen: boolean
  onClose: () => void
}

export const AwardsItem = ({isOpen, onClose} : AwardsProps) => {
  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      <div className={style.awardsItemBlock}>
        <img src={yourReward} alt=""/>
        <div className={style.awardsItems}>
          <div className={style.awardsGridItem}>
            <img src={coinMoney} alt=""/>
            <p>50.000</p>
          </div>
          <div className={style.awardsGridItem}>
            <img src={diamondMoney} alt=""/>
            <p>500</p>
          </div>
        </div>
        <Button className={style.awardsItemButton}>Claim</Button>
      </div>
    </Modal>
  )
}