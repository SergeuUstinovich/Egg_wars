import style from "./CategoriesTitle.module.scss";
interface CategoriesTitleProps {
  title: string;
}
function CategoriesTitle({ title }: CategoriesTitleProps) {
  return (
    <div className={style.inviteBlock}>
      <div className={style.line} />
      <h2 className={style.category}>{title}</h2>
      <div className={style.line} />
    </div>
  );
}

export default CategoriesTitle;
