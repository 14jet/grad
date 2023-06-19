import { xMark as closeSVG } from "../../../../assets/svgs";
import styles from "./UpdateItinerary.module.css";

function DeleteDayButton({ onClick, id, disabled }) {
  const clickHandler = (e) => {
    e.stopPropagation();
    if (disabled) return;
    onClick(id);
  };

  let classes = styles.removeDayBtn;
  if (disabled) {
    classes += " " + styles.disabled;
  }

  let title;
  if (disabled) {
    title = "Không thể xóa";
  }

  if (!disabled) {
    title = "Xóa";
  }
  return (
    <span title={title} className={classes} onClick={clickHandler}>
      {closeSVG}
    </span>
  );
}

export default DeleteDayButton;
