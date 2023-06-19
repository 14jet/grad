import Modal from "react-bootstrap/Modal";
import Spinner from "../Spinner";
import styles from "./SpinnerModal.module.css";

function SpinnerModal({ small, ...other }) {
  return (
    <Modal
      {...other}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName={styles.modalContent}
    >
      <Spinner small={small} />
    </Modal>
  );
}

export default SpinnerModal;
