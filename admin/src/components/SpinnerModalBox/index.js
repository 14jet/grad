import styles from "./ModalSpinnerBox.module.css";

function SpinnerModalBox() {
  return (
    <div className={styles.spinnerOverlay}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default SpinnerModalBox;
