import style from "./ProgressBarAwards.module.scss";
import { AwardsCheckbox } from "../../assets/svg/AwardsCheckbox";
import { Button } from "../../ui/Button";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";
import treeChest from "../../assets/img/treeChest.png";
import ironChest from "../../assets/img/ironChest.png";
import goldChest from "../../assets/img/goldChest.png";
import { classNames } from "../../utils/classNames";

interface ProgressBarProps {
  value: number;
  max: number;
  boxBonuses: any[];
}

const arr = [
  {
    chest: treeChest,
  },
  {
    chest: treeChest,
  },
  {
    chest: treeChest,
  },
  {
    chest: ironChest,
  },
  {
    chest: goldChest,
  },
];

export const ProgressBarAwards = ({
  value,
  max,
  boxBonuses,
}: ProgressBarProps) => {
  const newArray = boxBonuses.map((item: any, index: number) => ({
    ...item,
    chest: arr[index % arr.length].chest,
  }));
  console.log(newArray);

  return (
    <div className={style.awardsJewel}>
      <ProgressBar className={style.awardsProgress} value={value} max={max}>
        <AwardsCheckbox />
        <div className={classNames(style.progressChest, {}, [style.one])}>
          {newArray.map((item: any) => (
            <Button key={item.day}>
              <img src={item.chest} alt="" />
              <span>{item.day}</span>
            </Button>
          ))}
        </div>
      </ProgressBar>
    </div>
  );
};
