import Modal from "react-bootstrap/Modal";
import { format } from "date-fns";
import styles from "./PaymentModal.module.css";

const STATUS_SUCCEEDED = "Đã thanh toán";
const STATUS_FAILED_TO_CREATE_ORDER = "Lỗi khi tạo PayPal order";
const STATUS_FAILED_TO_CAPTURE = "Lỗi khi capture PayPal order";
const STATUS_IDLE = "Đã nhập thông tin order";
const STATUS_IS_CREATING_ORDER = "Đang tạo PayPal order";
const STATUS_CREATED_ORDER = "Đã tạo PayPal order";
const STATUS_IS_CAPTURING = "Đang capturing PayPal order";

const statusMap = new Map([
  ["succeeded", STATUS_SUCCEEDED],
  ["failed_to_create_order", STATUS_FAILED_TO_CREATE_ORDER],
  ["failed_to_capture", STATUS_FAILED_TO_CAPTURE],
  ["idle", STATUS_IDLE],
  ["is_creating_order", STATUS_IS_CREATING_ORDER],
  ["created_order", STATUS_CREATED_ORDER],
  ["is_capturing", STATUS_IS_CAPTURING],
]);

const RowItem = ({ name, children }) => (
  <div className={styles.rowItem}>
    <span>{name}:</span>
    <span>{children}</span>
  </div>
);

function PaymentModal({ payment, ...props }) {
  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h5>Thông tin đơn hàng</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.body}>
        <RowItem name="ID thanh toán PayPal">
          {payment.paypaypalTransactionId || "-"}
        </RowItem>

        <RowItem name="Tên visa">{payment.visaName}</RowItem>
        <RowItem name="Họ tên">{payment.fullname}</RowItem>
        <RowItem name="SĐT">
          {payment.phone.slice(0, 3) +
            "." +
            payment.phone.slice(3, 6) +
            "." +
            payment.phone.slice(6)}
        </RowItem>
        <RowItem name="Email">{payment.email}</RowItem>
        <RowItem name="Ngày khởi hành">
          {format(new Date(payment.date), "dd/MM/yyyy")}
        </RowItem>
        <RowItem name="Số hành khách">{payment.passengers}</RowItem>
        <RowItem name="Đơn giá">{payment.price.toLocaleString()} USD</RowItem>
        <RowItem name="Tổng tiền">
          {(payment.price * payment.passengers).toLocaleString()} USD
        </RowItem>
        <RowItem name="Cập nhật lúc">
          {format(new Date(payment.updatedAt), "HH:mm dd/MM/yyyy")}
        </RowItem>
        <RowItem name="Lỗi">{payment.error || "-"}</RowItem>
        <RowItem name="Trạng thái">{statusMap.get(payment.status)}</RowItem>
      </Modal.Body>
    </Modal>
  );
}

export default PaymentModal;
