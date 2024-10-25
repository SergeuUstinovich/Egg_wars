import style from './Awards.module.scss'
import Modal from '../../ui/Modal/Modal.tsx'
import { Button } from '../../ui/Button'
import coinMoney from '../../assets/img/coinMoney.png'
import diamondMoney from '../../assets/img/diamondMoney.png'
import yourReward from '../../assets/img/yourReward.png'
import treeChest from '../../assets/img/bigChest.png'
import rotateLuis from '../../assets/img/rotateLuis.png'

interface AwardsProps {
  isOpen: boolean
  onClose?: () => void
  boxBonus: any
}

export const AwardsItem = ({ boxBonus, isOpen, onClose }: AwardsProps) => {
  return (
    <Modal hiddenClose lazy isOpen={isOpen} onClose={onClose}>
      {boxBonus.map((item: any) => (
        <div className={style.awardsItemBlock}>
          <div className={style.yourRewardBlock}>
            <img className={style.chestAwards} src={treeChest} alt="" />
            <div className={style.rotateBlock}>
              <img className={style.rotate} src={rotateLuis} alt="" />
            </div>
            <img style={{ zIndex: '5' }} src={yourReward} alt="" />
          </div>
          <div className={style.awardsItems}>
            <div className={style.awardsGridItem}>
              <img src={coinMoney} alt="" />
              <p>{item.money}</p>
            </div>
            <div className={style.awardsGridItem}>
              <img src={diamondMoney} alt="" />
              <p>{item.crystal}</p>
            </div>
          </div>
          <Button onClick={onClose} className={style.awardsItemButton}>
            Claim
          </Button>
        </div>
      ))}
    </Modal>
  )
}
