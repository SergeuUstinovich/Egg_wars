import { Button } from "../../ui/Button"
import style from './CoinsDiamond.module.scss'
import imgCoin from '../../assets/img/coinMoney.png'
import imgDiamond from '../../assets/img/diamondMoney.png'
import imgPlus from '../../assets/img/btn_plus.png'
import { useSelector } from "react-redux"
import { getCoin } from "../../provider/StoreProvider/selectors/getCoin"
import { useEffect, useState } from "react"
import { userInfo } from "../../api/userInfo"

function CoinsDiamond() {

    const coin = useSelector(getCoin)
    const [img, setImage] = useState()
    
    const handleClick = async () => {
        const img = await userInfo()
        // img.map((item:any) => {
        //     const person = item.person
        //     const img = person.army
        //     img.map((item: any) => {
        //         const img = item.image
        //         setImage(img)
        //         console.log(img)
        //     })
        // })
        // tapTap()
    }
    useEffect(() => {
        console.log(img)
    }, [img])
    
    return (
        <div className={style.coinBlock}>
            <p onClick={handleClick} className={style.descrLvl}>LVL 1</p>
            <div className={style.coinBar}>
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
        </div>
    )
}

export default CoinsDiamond