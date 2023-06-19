import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TCell } from "../../components/table";
import { selectIsAdmin } from "../../store/user.slice";

function GuideItem({ order, guide, onDelete }) {
  const isAdmin = useSelector(selectIsAdmin);

  const onClickDelete = () => {
    onDelete(guide);
  };
  return (
    <tr>
      <TCell> {order}</TCell>
      <TCell>
        <Link
          to={`/guides/cap-nhat/${guide.slug}`}
          className="text-dark hover-underline"
        >
          {guide.title}
        </Link>
      </TCell>
      <TCell> {guide.category.name}</TCell>
      {isAdmin && (
        <TCell>
          <button className="btn btn-danger me-2" onClick={onClickDelete}>
            Xóa
          </button>
        </TCell>
      )}
    </tr>
  );
}

export default GuideItem;
