import { Button } from "../../ui/Button"
import style from './CoinsDiamond.module.scss'
import imgCoin from '../../assets/img/coinMoney.png'
import imgDiamond from '../../assets/img/diamondMoney.png'
import imgPlus from '../../assets/img/btn_plus.png'
import { useSelector } from "react-redux"
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin"

function CoinsDiamond() {

    const coin = useSelector(getCoin)

    return (
        <div className={style.coinBlock}>
            <p className={style.descrLvl}>LVL 1</p>
            <div className={style.coinBlockMoney}>
                <img className={style.imgCoin} src={imgCoin} alt="" />
                <div className={style.bgValue}>
                    <p className={style.descr}>{coin}</p>
                </div>
                <Button className={style.btnDonatMoney}>
                    <img src={imgPlus} alt="" />
                </Button>
            </div>
            <div className={style.coinBlockMoney}>
                <img className={style.imgCoin} src={imgDiamond} alt="" />
                <div className={style.bgValue}>
                    <p className={style.descr}>0</p>
                </div>
                <Button className={style.btnDonatMoney}>
                    <img src={imgPlus} alt="" />
                </Button>
            </div>
        </div>
    )
}

export default CoinsDiamond