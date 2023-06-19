import { useSelector } from "react-redux";
import { TCell } from "../../components/table";
import { selectIsAdmin } from "../../store/user.slice";

const continentsMap = new Map([
  ["chau-au", "Châu Âu"],
  ["chau-a", "Châu Á"],
  ["chau-my", "Châu Mỹ"],
  ["chau-phi", "Châu Phi"],
  ["chau-dai-duong", "Châu Đại Dương"],
]);

const regionsMap = new Map([
  ["mien-bac", "Miền Bắc"],
  ["bac-trung-bo", "Bắc Trung Bộ"],
  ["nam-trung-bo", "Nam Trung Bộ"],
  ["tay-nguyen", "Tây Nguyên"],
  ["dong-nam-bo", "Đông Nam Bộ"],
  ["mien-tay", "Miền Tây"],
  ["", ""],
]);

const typesMap = new Map([
  ["continent", "Châu lục"],
  ["province", "Tỉnh"],
]);

function PlaceRow({ place, onEdit, onConfirmDelete, order }) {
  const isAdmin = useSelector(selectIsAdmin);

  const onClickEdit = () => {
    onEdit(place);
  };

  const onClickDelete = () => {
    onConfirmDelete(place);
  };
  return (
    <tr>
      <TCell> {order}</TCell>
      <TCell>{place.name}</TCell>
      <TCell>{place.en.name}</TCell>
      <TCell>{regionsMap.get(place.region)}</TCell>
      <TCell>{continentsMap.get(continentsMap)}</TCell>
      <TCell>{typesMap.get(place.type)}</TCell>
      {isAdmin && (
        <TCell>
          <button className="btn btn-warning me-2 " onClick={onClickEdit}>
            Sửa
          </button>
          <button className="btn btn-danger " onClick={onClickDelete}>
            Xóa
          </button>
        </TCell>
      )}
    </tr>
  );
}

export default PlaceRow;
