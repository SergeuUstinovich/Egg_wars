import style from './ProgressBarAwards.module.scss'
import { AwardsCheckbox } from '../../assets/svg/AwardsCheckbox'
import { Button } from '../../ui/Button'
import ProgressBar from '../../ui/ProgressBar/ProgressBar'
import treeChest from '../../assets/img/treeChest.png'
import ironChest from '../../assets/img/ironChest.png'
import goldChest from '../../assets/img/goldChest.png'

interface ProgressBarProps {
  value: number
  max: number
}

export const ProgressBarAwards = ({ value, max }: ProgressBarProps) => {
  return (
    <div className={style.awardsJewel}>
      <ProgressBar className={style.awardsProgress} value={value} max={max}>
        <AwardsCheckbox />
        <div className={`${style.progressChest} ${style.one}`}>
          <Button>
            <img src={treeChest} alt="" />
            <span>8</span>
          </Button>
        </div>
        <div className={`${style.progressChest} ${style.two}`}>
          <Button>
            <img src={treeChest} alt="" />
            <span>12</span>
          </Button>
        </div>
        <div className={`${style.progressChest} ${style.three}`}>
          <Button>
            <img src={ironChest} alt="" />
            <span>22</span>
          </Button>
        </div>
        <div className={`${style.progressChest} ${style.four}`}>
          <Button>
            <img src={goldChest} alt="" />
            <span>30</span>
          </Button>
        </div>
      </ProgressBar>
    </div>
  )
}
