
import { BonusFr } from "../../types/BonusFriend";
import CollectCard from "../CollectCard/CollectCard";
import InviteFriend from "../InviteFriend/InviteFriend";


function CollectFriend({bonuses}: BonusFr) {
  
  return (
    <>
      <InviteFriend
        Info_ordinary_bonus={bonuses?.Info_ordinary_bonus}
        Info_prime_bonus={bonuses?.Info_prime_bonus}
       />
      <CollectCard
        My_Bonus_Card={bonuses?.My_Bonus_Card}
      />
    </>
  );
}

export default CollectFriend;
