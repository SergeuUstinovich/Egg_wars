import CategoriesTitle from "../CategoriesTitle/CategoriesTitle";
import ProgressBar from "../ProgressBar/ProgressBar";
import style from "./CollectCatr.module.scss";
import imgKing from '../../assets/img/Cards_king.png'
import imgValue2 from '../../assets/img/cards_value2.png'
import { Button } from "../../ui/Button";

function CollectCard() {
    
  return (
    <div className={style.CardBlock}>
        <CategoriesTitle title="Collect Card" />
        <div className={style.bgBar}>
        <Button className={style.info}>i</Button>
            <div className={style.infoName}>
                <p className={style.nameUnit}>King</p>
            </div>
            <div className={style.progressBar}>
                <img className={style.value} src={imgValue2} alt="" />
                <ProgressBar max={10} value={5} textProg />
                <img className={style.king} src={imgKing} alt="" />
            </div>
            
        </div>
        
    </div>
    
  );
}

export default CollectCard;
