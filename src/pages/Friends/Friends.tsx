import { useQuery } from "@tanstack/react-query";
import CopySvg from "../../assets/svg/CopySvg/CopySvg";
import CollectCoins from "../../components/CollectCoinds/CollectCoins";
import { useTelegram } from "../../provider/telegram/telegram";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Friends.module.scss";
import { queryClient } from "../../api/queryClient";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { infoBonus, listFriends, referalLink } from "../../api/friendApi";
import CollectFriend from "../../components/CollectFriend/CollectFriend";

function Friends() {
  const { tg_id, tg } = useTelegram();
  const [refLink, setRefLink] = useState();
  const [friendList, setFriendList] = useState([]);

  const referalQuery = useQuery(
    {
      queryFn: () => referalLink(tg_id),
      queryKey: ["refLink"],
      enabled: !!tg_id,
    },
    queryClient
  );

  useEffect(() => {
    setRefLink(referalQuery.data);
  }, [referalQuery]);

  const handleRefLink = () => {
    const link =
      //?url= тут присваиваем нашу реферальную ссылку
      `https://t.me/share/url?url=${refLink}`;
    //можно после ссылки вставить &text={опциональный_текст}
    tg.openTelegramLink(link);
  };

  const copyToRefLink = async () => {
    try {
      if (refLink) {
        await navigator.clipboard.writeText(refLink);
        toast.success('Ссылка скопирована в буфер обмена')
      }
    } catch (err) {
      toast.error('Ошибка при копировании')
    }
  };
  const queruListFriend = useQuery(
    {
      queryFn: () => listFriends(tg_id),
      queryKey: ["listFr"],
      enabled: !!tg_id,
    },
    queryClient
  );

  useEffect(() => {
    if(queruListFriend.data) {
      setFriendList(queruListFriend.data);
    }
  }, [queruListFriend.data]);

  const queryInfoBonus = useQuery(
    {
      queryKey: ["infoBonus"],
      queryFn: () => infoBonus(tg_id),
    },
    queryClient
  );

  return (
    <ModalRoute>
      <div className={style.friend}>
        <CollectFriend bonuses={queryInfoBonus.data} />
        <CollectCoins friends={friendList} />
        <div className={style.btnForward}>
          <Button onClick={handleRefLink} className={style.infiteFr}>
            Invite Friend
          </Button>
          <Button onClick={copyToRefLink} className={style.copy}>
            <CopySvg />
          </Button>
        </div>
      </div>
    </ModalRoute>
  );
}

export default Friends;
