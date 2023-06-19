import { format } from "date-fns";

function DateItem({ timestamp, onRemoveDate }) {
  const clickHandler = () => {
    onRemoveDate(timestamp);
  };
  return (
    <p className="btn btn-sm btn-secondary me-1 mt-2" title="xóa">
      {format(new Date(timestamp), "dd/MM/yyyy")}
      <span className="ms-2" onClick={clickHandler}>
        x
      </span>
    </p>
  );
}

export default DateItem;
