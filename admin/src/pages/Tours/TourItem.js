import { useSelector } from "react-redux";
import { TCell } from "../../components/table";
import { Link } from "react-router-dom";
import { selectIsAdmin } from "../../store/user.slice";

function TourItem({ tour, order, onDelete }) {
  const isAdmin = useSelector(selectIsAdmin);

  const getCategoryText = (tour) => {
    return tour.is_vn_tour ? "Trong nước" : tour.is_eu_tour ? "Châu Âu" : "";
  };

  const onClickDelete = () => {
    onDelete(tour);
  };
  return (
    <tr>
      <TCell> {order}</TCell>
      <TCell>{tour.code}</TCell>
      <TCell>
        <div id={tour.code}>
          <Link
            to={`/tours/cap-nhat/${tour.code}`}
            className="text-dark hover-underline"
          >
            {tour.name}
          </Link>
        </div>
      </TCell>
      <TCell>{getCategoryText(tour)}</TCell>
      {isAdmin && (
        <TCell>
          <button className="btn btn-danger " onClick={onClickDelete}>
            Xóa
          </button>
        </TCell>
      )}
    </tr>
  );
}

export default TourItem;
