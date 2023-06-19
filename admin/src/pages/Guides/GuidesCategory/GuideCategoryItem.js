import { useSelector } from "react-redux";
import { TCell } from "../../../components/table";
import { selectIsAdmin } from "../../../store/user.slice";

function GuideCategoryItem({ onUpdate, onDelete, categoryItem, order }) {
  const isAdmin = useSelector(selectIsAdmin);

  const onClickDelete = () => {
    onDelete(categoryItem);
  };

  const onClickUpdate = () => {
    onUpdate(categoryItem);
  };
  return (
    <tr key={categoryItem._id}>
      <TCell>{order}</TCell>
      <TCell>{categoryItem.name}</TCell>
      <TCell>{categoryItem.en.name}</TCell>
      {isAdmin && (
        <TCell>
          <button className="btn btn-warning me-2" onClick={onClickUpdate}>
            Sửa
          </button>
          <button className="btn btn-danger" onClick={onClickDelete}>
            Xóa
          </button>
        </TCell>
      )}
    </tr>
  );
}

export default GuideCategoryItem;
