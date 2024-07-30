import CategoriesTitle from "../CategoriesTitle/CategoriesTitle";
import style from "./CollectCoins.module.scss";
import CardFriend from "../CardFriend/CardFriend";
import { FriendsType } from "../../types/FriendsType";

interface FriendsList {
  friends?: FriendsType[];
}

function CollectCoins({ friends }: FriendsList) {
  return (
    <div className={style.coinsCollect}>
      <CategoriesTitle title="Collect Coins" />
      {friends &&
        friends.map((item) => (
          <li key={item.person_id}>
            <CardFriend 
                name={item.name} 
                lvl={item.lvl} 
                person_id={item.person_id} 
                referral_system_id={item.referral_system_id}
            />
          </li>
        ))}
    </div>
  );
}

export default CollectCoins;
