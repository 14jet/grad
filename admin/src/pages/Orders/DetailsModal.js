import Modal from "react-bootstrap/Modal";
import { format } from "date-fns";
import styles from "./DetailsModal.module.css";

const RowItem = ({ name, children }) => (
  <div className={styles.rowItem}>
    <span>{name}:</span>
    <span>{children}</span>
  </div>
);

function OrderModal({ order, ...props }) {
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Thông tin đơn hàng</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        <RowItem name="Họ tên">{order.fullname}</RowItem>
        <RowItem name="SĐT">
          {order.phone.slice(0, 3) +
            "." +
            order.phone.slice(3, 6) +
            "." +
            order.phone.slice(6)}
        </RowItem>
        <RowItem name="Cập nhật lúc">
          {format(new Date(order.updatedAt), "HH:mm dd/MM/yyyy")}
        </RowItem>
        <RowItem name="Trạng thái">
          {order.solved ? "Đã giải quyết" : "Chưa giải quyết"}
        </RowItem>
        {Object.entries(order.otherDetails).map(([key, value]) => (
          <RowItem name={key}>
            {key == "departureDate"
              ? format(new Date(value), "dd/MM/yyyy")
              : value}
          </RowItem>
        ))}
      </Modal.Body>
    </Modal>
  );
}

export default OrderModal;
