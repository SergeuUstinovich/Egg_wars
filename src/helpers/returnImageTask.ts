import iconX from "../assets/img/iconX.png";
import iconYoutube from "../assets/img/iconYouTube.png";
import iconTg from "../assets/img/iconTelegram.png";
import iconGift from "../assets/img/iconGift.png";

export const getImgTask = (name: string, setIcon: (icon: string) => void) => {
  switch (name) {
    case "twitter":
      return setIcon(iconX);
    case "youtube":
      return setIcon(iconYoutube);
    case "telegram":
      return setIcon(iconTg);
    default:
      return setIcon(iconGift);
  }
};
