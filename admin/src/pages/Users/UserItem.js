import { useSelector } from "react-redux";
import { TCell } from "../../components/table";
import { selectIsAdmin } from "../../store/user.slice";

function UserItem({ order, user, onDelete, onChangeRole }) {
  const isAdmin = useSelector(selectIsAdmin);

  const onClickDelete = () => {
    onDelete(user);
  };

  const onChange = (e) => {
    onChangeRole(e.target.value, user);
  };
  return (
    <tr>
      <TCell> {order}</TCell>
      <TCell>{user.username}</TCell>
      <TCell>
        {isAdmin && (
          <select className="form-select" value={user.role} onChange={onChange}>
            <option value="admin">Admin</option>
            <option value="client">Client</option>
            <option value="moderator">Moderator</option>
          </select>
        )}
        {!isAdmin && user.role}
      </TCell>
      {isAdmin && (
        <TCell>
          <button onClick={onClickDelete} className="btn btn-danger ms-2">
            Xóa
          </button>
        </TCell>
      )}
    </tr>
  );
}

export default UserItem;
