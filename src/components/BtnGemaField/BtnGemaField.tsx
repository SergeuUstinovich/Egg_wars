import { Link } from "react-router-dom";
import style from "./BtnGemaField.module.scss";

interface BtnGemaField {
  img: string;
  text: string;
  path: string;
  bottonP: string;
  left?: string;
  right?: string;
}

function BtnGemaField({ img, text, path, bottonP, left, right }: BtnGemaField) {
  let positionStyle: React.CSSProperties = { bottom: `${bottonP}%` };

  if (left) {
    positionStyle = { ...positionStyle, left: `${left}%` };
  }

  if (right) {
    positionStyle = { ...positionStyle, right: `${right}%` };
  }

  return (
    <div className={style.BtnField} style={positionStyle}>
      <Link className={style.link} to={path}>
        <img className={style.img} src={img} alt={text} />
        <p className={style.text}>{text}</p>
      </Link>
    </div>
  );
}

export default BtnGemaField;
