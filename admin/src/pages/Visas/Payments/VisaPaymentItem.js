import { format } from "date-fns";
import { TCell } from "../../../components/table";
import styles from "./VisaPaymentItem.module.css";

const phoneNumberFormater = (phoneNumber) => {
  return (
    phoneNumber.slice(0, 3) +
    "." +
    phoneNumber.slice(3, 6) +
    "." +
    phoneNumber.slice(6)
  );
};

const STATUS_PAID = "Đã thanh toán";
const STATUS_ERROR = "Lỗi";
const STATUS_PENDING = "Đang thanh toán";

const statusMap = new Map([
  ["succeeded", STATUS_PAID],
  ["failed_to_create_order", STATUS_ERROR],
  ["failed_to_capture", STATUS_ERROR],
  ["idle", STATUS_PENDING],
  ["is_creating_order", STATUS_PENDING],
  ["created_order", STATUS_PENDING],
  ["is_capturing", STATUS_PENDING],
]);

function VisaPaymentItem({ payment, order, onDelete, onShowModal }) {
  const clickDeleteHandler = (e) => {
    e.stopPropagation();
    onDelete(payment);
  };

  const onClickRow = () => {
    onShowModal(payment);
  };

  return (
    <tr className={styles.VisaPaymentItem} onClick={onClickRow}>
      <TCell>{order}</TCell>
      <TCell>{payment.paypalTransactionId || "-"}</TCell>
      <TCell>{payment.fullname}</TCell>
      <TCell>{phoneNumberFormater(payment.phone)}</TCell>
      <TCell>{payment.passengers}</TCell>
      <TCell>{payment.price.toLocaleString()}</TCell>
      <TCell>{(payment.passengers * payment.price).toLocaleString()}</TCell>
      <TCell>{format(new Date(payment.updatedAt), "hh:mm dd/MM/yyyy")}</TCell>
      <TCell>
        <div
          className={`${styles.status} ${
            statusMap.get(payment.status) === STATUS_PAID
              ? styles.paidSuccess
              : statusMap.get(payment.status) === STATUS_ERROR
              ? styles.paidError
              : ""
          }`}
        >
          <span>{statusMap.get(payment.status)}</span>
        </div>
      </TCell>
      <TCell>
        <button className="btn btn-danger" onClick={clickDeleteHandler}>
          Xóa
        </button>
      </TCell>
    </tr>
  );
}

export default VisaPaymentItem;
