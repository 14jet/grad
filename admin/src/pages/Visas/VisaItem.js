import { useSelector } from "react-redux";
import { TCell } from "../../components/table";
import { Link } from "react-router-dom";
import { selectIsAdmin } from "../../store/user.slice";

function VisaItem({ order, visa, onDelete }) {
  const isAdmin = useSelector(selectIsAdmin);

  const onClickDelete = () => {
    onDelete(visa);
  };
  return (
    <tr>
      <TCell>{order}</TCell>
      <TCell>
        <Link
          className="hover-underline text-dark"
          to={`/visas/cap-nhat-visa/${visa.slug}`}
        >
          {visa.name}
        </Link>
      </TCell>
      <TCell>{visa.country.name}</TCell>
      {isAdmin && (
        <TCell>
          <button className="btn btn-danger" onClick={onClickDelete}>
            Xóa
          </button>
        </TCell>
      )}
    </tr>
  );
}

export default VisaItem;
