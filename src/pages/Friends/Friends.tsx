import { useMutation, useQuery } from "@tanstack/react-query";
import CopySvg from "../../assets/svg/CopySvg/CopySvg";
import CollectCard from "../../components/CollectCard/CollectCard";
import CollectCoins from "../../components/CollectCoinds/CollectCoins";
import InviteFriend from "../../components/InviteFriend/InviteFriend";
import { useTelegram } from "../../provider/telegram/telegram";
import { Button } from "../../ui/Button";
import ModalRoute from "../../ui/ModalRoute/ModalRoute";
import style from "./Friends.module.scss";
import { queryClient } from "../../api/queryClient";
import { listFriends, referalLink } from "../../api/userInfo";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FriendsType } from "../../types/FriendsType";

function Friends() {
  const { tg_id, tg } = useTelegram();
  const [refLink, setRefLink] = useState();
  const friend = useLocation();
  const [listFriend, setListFriend] = useState<FriendsType[]>([]);

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
        console.log("Ссылка скопирована");
      }
    } catch (err) {
      console.error("Ошибка при копировании", err);
    }
  };

  const listFrieds = useMutation(
    {
      mutationFn: (data: { tg_id: string }) => listFriends(data.tg_id),
      onSuccess: (data) => {
        setListFriend(data);
      },
    },
    queryClient
  );

  useEffect(() => {
    if (friend.pathname === "/friends") {
      listFrieds.mutate({ tg_id });
    }
  }, []);

  return (
    <ModalRoute>
      <div className={style.friend}>
        <InviteFriend />
        <CollectCard />
        <CollectCoins friends={listFriend} />
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
