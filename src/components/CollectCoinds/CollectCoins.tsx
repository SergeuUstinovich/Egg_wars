import CategoriesTitle from "../CategoriesTitle/CategoriesTitle";
import style from "./CollectCoins.module.scss";
import CardFriend from "../CardFriend/CardFriend";
import { FriendsScheme } from "../../types/FriendsType";


function CollectCoins({ friends }: FriendsScheme) {
  return (
    <div className={style.coinsCollect}>
      <CategoriesTitle title="Collect Coins" />
      <ul>
      {friends && 
        friends.map((item) => 
          <li key={item.person_id}>
            <CardFriend 
                name={item.name} 
                lvl={item.lvl} 
                person_id={item.person_id}
                referral_system_id={item.referral_system_id}
                flag={item.flag}   
            />
          </li>
        )
      }
      </ul>
    </div>
  );
}

export default CollectCoins;
