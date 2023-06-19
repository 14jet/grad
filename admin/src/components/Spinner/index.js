import styles from "./Spinner.module.css";

function Spinner({ small, dark }) {
  let classes = styles["lds-ring"];
  if (small) {
    classes += " " + styles.small;
  }

  if (dark) {
    classes += " " + styles.dark;
  }
  return (
    <div className={classes}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
