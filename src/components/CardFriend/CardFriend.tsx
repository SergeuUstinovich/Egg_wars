import { Button } from "../../ui/Button";
import style from "./CardFriend.module.scss";
import avatar from "../../assets/img/no_name_avatar.png";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import coinFr from "../../assets/img/coin_friends.png";
import { useEffect, useState } from "react";
import { classNames } from "../../utils/classNames";
import { FriendsType } from "../../types/FriendsType";
import { useMutation } from "@tanstack/react-query";
import { useTelegram } from "../../provider/telegram/telegram";
import { queryClient } from "../../api/queryClient";
import { bonusTake } from "../../api/friendApi";
import toast from "react-hot-toast";

function CardFriend({ name, referral_system_id, flag }: FriendsType) {
  const { tg_id } = useTelegram();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnClassFr, setBtnClassFr] = useState(false);
  const [nowMax, setNowMax] = useState("NOW");
  const value = 5;
  const max = 10;

  const mutateBonusTake = useMutation(
    {
      mutationFn: (data: { tg_id: string; referral_system_id: number }) =>
        bonusTake(data.tg_id, data.referral_system_id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["info", tg_id] });
        queryClient.invalidateQueries({ queryKey: ["listFr"] });
      },
      onError: (data) => {
        toast.error(data.message);
      },
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
      setNowMax("MAX");
      setBtnClassFr(true);
    } else {
      setNowMax("NOW");
      setBtnClassFr(false);
    }
  }, [value]);

  const mods = {
    [style.btnClassFr]: btnClassFr,
  };
  const mod = {
    [style.btnClaim]: true,
  };

  return (
    <div className={style.blockFriend}>
      <img className={style.img} src={avatar} alt="" />
      <div className={style.progress}>
        <p className={style.nameFr}>{name}</p>
        {!flag && (
          <>
            <p className={style.coinBar}>20 000 / 30 000</p>
            <ProgressBar
              value={value}
              max={max}
              className={style.cardFrBar}
              classNamefill={style.cardFrBarFill}
              colorFill="#f7a31a"
            />
          </>
        )}
      </div>
      {flag ? (
        <Button
          onClick={handleBonusTake}
          className={classNames(style.btnFriend, mod, [])}
          isLoading={mutateBonusTake.isPending}
        >
          <p className={style.btnDescrClaim}>Claim bonus</p>
        </Button>
      ) : (
        <Button
          // onClick={handleBonusTake}
          className={classNames(style.btnFriend, mods, [])}
          isDisabled={btnDisabled}
          // isLoading={mutateBonusTake.isPending}
        >
          <p className={style.btnDescr}>Collect {nowMax}</p>
          <div className={style.coinTake}>
            <img src={coinFr} alt="" />
            <p className={style.coin}>10 000</p>
          </div>
        </Button>
      )}
    </div>
  );
}

export default CardFriend;
