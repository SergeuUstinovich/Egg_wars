import style from "./InviteFriend.module.scss";
import crown from "../../assets/img/crown.png";
import cards_king from "../../assets/img/Cards_king.png";
import cards_value from "../../assets/img/cards_value.png";
import cards_gold from "../../assets/img/Cards_gold.png";
import CategoriesTitle from "../CategoriesTitle/CategoriesTitle";
import { Bonuses } from "../../types/BonusFriend";

function InviteFriend({Info_prime_bonus, Info_ordinary_bonus}:Bonuses) {
  return (
    <div className={style.friendInv}>
      <CategoriesTitle title="Invite Friends" />
      <div className={style.invite}>
        <div className={style.invitePrem}>
          <img className={style.crown} src={crown} alt="crown" />
          <p className={style.descr}>Invite Premium Friend</p>
          <div className={style.card}>
            <div className={style.card_unit}>
              <img className={style.imgCard} src={cards_king} alt="" />
              <div className={style.card_value}>
                <img src={cards_value} alt="" />
                <span className={`${style.descr} ${style.span}`}>{Info_prime_bonus?.cards}</span>
              </div>
            </div>
            <div className={style.cardCoin}>
              <img className={style.imgCard} src={cards_gold} alt="" />
              <p className={`${style.descr} ${style.span}`}>+{Info_prime_bonus?.money.toLocaleString('ru-RU')}</p>
            </div>
          </div>
        </div>
        <div className={style.inviteFr}>
          <p className={style.descr}>Invite Friend</p>
          <div>
            <div className={style.card}>
              <div className={style.card_unit}>
                <img className={style.imgCard} src={cards_king} alt="" />
                <div className={style.card_value}>
                  <img src={cards_value} alt="" />
                  <span className={`${style.descr} ${style.span}`}>{Info_ordinary_bonus?.cards}</span>
                </div>
              </div>
              <div className={style.cardCoin}>
                <img className={style.imgCard} src={cards_gold} alt="" />
                <p className={`${style.descr} ${style.span}`}>+{Info_ordinary_bonus?.money.toLocaleString('ru-RU')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteFriend;
