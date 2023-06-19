import styles from "./SpinnerModal.module.css";

function SpinnerModal() {
  return (
    <div className={styles.container}>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default SpinnerModal;
