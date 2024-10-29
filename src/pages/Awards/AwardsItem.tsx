import style from './Awards.module.scss'
import Modal from '../../ui/Modal/Modal.tsx'
import { Button } from '../../ui/Button'
import coinMoney from '../../assets/img/coinMoney.png'
import diamondMoney from '../../assets/img/diamondMoney.png'
import yourReward from '../../assets/img/yourReward.png'
import treeBigChest from '../../assets/img/bigChest.png'
import treeChest from '../../assets/img/treeChest.png'
import ironChest from '../../assets/img/ironChest.png'
import goldChest from '../../assets/img/goldChest.png'
import rotateLuis from '../../assets/img/rotateLuis.png'

interface AwardsProps {
  isOpen: boolean
  onClose?: () => void
  boxBonus: any
}

const arr = [
  {
    chest: treeChest
  },
  {
    chest: treeChest
  },
  {
    chest: ironChest
  },
  {
    chest: goldChest
  }
]

export const AwardsItem = ({ boxBonus, isOpen, onClose }: AwardsProps) => {
  const chestArr = arr[0].chest
  const newArray = boxBonus.map((item: any) => (
    {...item, chestArr}
  ))

  return (
    <Modal hiddenClose lazy isOpen={isOpen} onClose={onClose}>
      {newArray.map((item: any) => (
        <div key={item.day} className={style.awardsItemBlock}>
          <div className={style.yourRewardBlock}>
            <img className={style.chestAwards} src={treeBigChest} alt="" />
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
