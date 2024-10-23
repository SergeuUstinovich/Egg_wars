import style from './Awards.module.scss'
import Modal from '../../ui/Modal/Modal'
import awardsCalendar from '../../assets/img/awardsCalendar.png'
import { Button } from '../../ui/Button'
import { ProgressBarAwards } from '../../components/ProgressBarAwards/ProgressBarAwards'
import coinMoney from '../../assets/img/coinMoney.png'
import diamondMoney from '../../assets/img/diamondMoney.png'
import { useEffect, useState } from 'react'
import { AwardsItem } from './AwardsItem.tsx'
import { useTelegram } from '../../provider/telegram/telegram.ts'
import { awardsChests } from '../../api/awardsApi.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient.ts'
import { getUrlParams } from '../../helpers/searchParthners.ts'

interface AwardsProps {
  isOpen?: boolean
  onClose?: () => void
}

const Awards = () => {
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const awardsShown = localStorage.getItem('awardsShown')
    const { u, v, p } = getUrlParams()
    if (u && v && p) {
      localStorage.setItem('awardsShown', 'true')
    } else {
      if (!awardsShown) {
        setOpenModal(true)
      }
    }
  }, [])

  const handleStartClick = () => {
    localStorage.setItem('awardsShown', 'true')
    setOpenModal(false)
  }

  const { tg_id } = useTelegram()

  const { data } = useSuspenseQuery(
    {
      queryFn: () => awardsChests(tg_id),
      queryKey: ['awardsChests'],
    },
    queryClient
  )

  useEffect(() => {
    if (data) {
      // setAwardsArray(Array.from(Object.entries(awards)))
      console.log(data.daily_bonuses)
    }
  }, [data])

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
          {data.daily_bonuses.map((item: any) => (
            <li key={item.id} className={style.awardsElement}>
              <Button className={`${style.awardsButton} ${style.checked}`}>
                <h3 className={style.awardsTitle}></h3>
                <div className={style.awardsDown}>
                  <p>
                    <img src={coinMoney} alt="" />
                    <span>{item.money}</span>
                  </p>
                  <p>
                    <img src={diamondMoney} alt="" />
                    <span></span>
                  </p>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      {/* <AwardsItem isOpen={isOpenModal} onClose={handleCloseModal}/> */}
    </Modal>
  )
}

export default Awards
