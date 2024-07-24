import CopySvg from "../../assets/svg/CopySvg/CopySvg";
import CollectCard from "../../components/CollectCard/CollectCard";
import CollectCoins from "../../components/CollectCoinds/CollectCoinds";
import InviteFriend from "../../components/InviteFriend/InviteFriend";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Friends.module.scss";

function Friends() {
  return (
    <ModalRoute>
      <div className={style.friend}>
        <InviteFriend />
        <CollectCard />
        <CollectCoins />
        <div className={style.btnForward}>
          <Button className={style.infiteFr}>Invite Friend</Button>
          <Button className={style.copy}>
            <CopySvg />
          </Button>
        </div>
      </div>
    </ModalRoute>
  );
}

export default Friends;
