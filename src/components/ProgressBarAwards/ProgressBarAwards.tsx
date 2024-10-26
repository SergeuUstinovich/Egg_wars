import style from './ProgressBarAwards.module.scss'
import { AwardsCheckbox } from '../../assets/svg/AwardsCheckbox'
import { Button } from '../../ui/Button'
import ProgressBar from '../../ui/ProgressBar/ProgressBar'
import treeChest from '../../assets/img/treeChest.png'
import { classNames } from '../../utils/classNames'

interface ProgressBarProps {
  value: number
  max: number
  boxBonuses: any[]
}

export const ProgressBarAwards = ({ value, max, boxBonuses }: ProgressBarProps) => {
  return (
    <div className={style.awardsJewel}>
      <ProgressBar className={style.awardsProgress} value={value} max={max}>
        <AwardsCheckbox />
        <div className={classNames(style.progressChest, {}, [style.one])}>
          {
            boxBonuses.map((item: any) => (
              <Button>
                <img src={treeChest} alt="" />
                <span>{item.day}</span>
              </Button>
            ))
          }
        </div>
      </ProgressBar>
    </div>
  )
}
