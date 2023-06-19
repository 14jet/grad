import { format } from "date-fns";
import { TCell } from "../../components/table";
import styles from "./OrderItem.module.css";

const phoneNumberFormater = (phoneNumber) => {
  return (
    phoneNumber.slice(0, 3) +
    "." +
    phoneNumber.slice(3, 6) +
    "." +
    phoneNumber.slice(6)
  );
};

function OrderItem({ order, orderNumber, onDelete, onShowModal }) {
  const clickDeleteHandler = (e) => {
    e.stopPropagation();
    onDelete(order);
  };

  const onClickRow = () => {
    onShowModal(order);
  };

  return (
    <tr className={styles.VisaorderItem} onClick={onClickRow}>
      <TCell>{orderNumber}</TCell>
      <TCell>{order.type}</TCell>
      <TCell>{order.fullname}</TCell>
      <TCell>{phoneNumberFormater(order.phone)}</TCell>
      <TCell>{format(new Date(order.updatedAt), "hh:mm dd/MM/yyyy")}</TCell>
      <TCell>{order.solved ? "Đã giải quyết" : "Chưa giải quyết"}</TCell>
      <TCell>
        <button className="btn btn-danger" onClick={clickDeleteHandler}>
          Xóa
        </button>
      </TCell>
    </tr>
  );
}

export default OrderItem;
