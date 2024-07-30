import { Button } from "../../ui/Button";
import style from "./CardFriend.module.scss";
import avatar from "../../assets/img/no_name_avatar.png";
import ProgressBar from "../ProgressBar/ProgressBar";
import coinFr from "../../assets/img/coin_friends.png";
import { useEffect, useState } from "react";
import { classNames } from "../../utils/classNames";
import { FriendsType } from "../../types/FriendsType";
import { useMutation } from "@tanstack/react-query";
import { bonusTake } from "../../api/userInfo";
import { useTelegram } from "../../provider/telegram/telegram";
import { queryClient } from "../../api/queryClient";

function CardFriend({ name, referral_system_id }: FriendsType) {
  const { tg_id } = useTelegram();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnClassFr, setBtnClassFr] = useState(false);
  const value = 4;
  const max = 10;

  const mutateBonusTake = useMutation(
    {
      mutationFn: (data: { tg_id: string; referral_system_id: number }) =>
        bonusTake(data.tg_id, data.referral_system_id),
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ["info", tg_id]})
      }
    },
    queryClient
  );

  const handleBonusTake = () => {
    mutateBonusTake.mutate({ tg_id, referral_system_id });
  };

  useEffect(() => {
    if (value <= 0) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
    if (value >= max) {
      setBtnClassFr(true);
    } else {
      setBtnClassFr(false);
    }
  }, [value]);

  const mods = {
    [style.btnClassFr]: btnClassFr,
  };

  return (
    <div className={style.blockFriend}>
      <img className={style.img} src={avatar} alt="" />
      <div className={style.progress}>
        <p className={style.nameFr}>{name}</p>
        <p className={style.coinBar}>20 000 / 30 000</p>
        <ProgressBar
          value={value}
          max={max}
          className={style.cardFrBar}
          classNamefill={style.cardFrBarFill}
          colorFill="#f7a31a"
        />
      </div>
      <Button
        onClick={handleBonusTake}
        className={classNames(style.btnFriend, mods, [])}
        isDisabled={btnDisabled}
      >
        <p className={style.btnDescr}>Collect NOW</p>
        <div className={style.coinTake}>
          <img src={coinFr} alt="" />
          <p className={style.coin}>0</p>
        </div>
      </Button>
    </div>
  );
}

export default CardFriend;
