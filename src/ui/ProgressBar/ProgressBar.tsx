import { ReactNode } from "react";
import { classNames } from "../../utils/classNames";
import style from "./ProgressBar.module.scss";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  textProg?: boolean;
  classNamefill?: string;
  colorFill?: string;
  children?: ReactNode;
}

function ProgressBar({
  value,
  max,
  className = "",
  textProg,
  classNamefill = "",
  colorFill = "#8aca27",
  children,
}: ProgressBarProps) {
  const width = (value / max) * 100;
  const color = value !== max ? colorFill : "#8aca27";
  return (
    <div className={classNames(style.progressbar, {}, [className])}>
      <div
        className={classNames(style.progressbar__fill, {}, [classNamefill])}
        style={{ width: `${width}%`, backgroundColor: color }}
      >
        {children}
      </div>
      {textProg && (
        <div className={style.progressbar__text}>{`${value}/${max}`}</div>
      )}
    </div>
  );
}

export default ProgressBar;
