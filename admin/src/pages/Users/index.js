import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import usePageTitle from "../../hooks/usePageTitle";
import TopBar from "../../components/TopBar";
import useAxios from "../../hooks/useAxios";
import SpinnerModal from "../../components/SpinnerModal";
import { changeRole, deleteUser, fetchUsers } from "../../services/apis";
import { Table, TBody, TCell, THead } from "../../components/table";
import { selectIsAdmin } from "../../store/user.slice";
import UserItem from "./UserItem";

function Users() {
  const [sendRequest, isLoading, data] = useAxios();
  const [goChangeRole, isChangingRole, changedRole] = useAxios();
  const [goDeleteUser, isDeleting, deleted] = useAxios();
  const { user: auth } = useSelector((state) => state.user);
  const isAdmin = useSelector(selectIsAdmin);

  const onChangeRole = (newRole, user) => {
    goChangeRole(changeRole({ username: user.username, role: newRole }));
  };

  const onDelete = (user) => {
    if (window.confirm("Bạn có chắc không?")) {
      goDeleteUser(deleteUser(user.username));
    }
  };

  const goFetchUsers = () => {
    sendRequest(fetchUsers());
  };

  useEffect(() => {
    goFetchUsers();
  }, []);

  useEffect(() => {
    if (changedRole) {
      goFetchUsers();
    }
  }, [changedRole]);

  useEffect(() => {
    if (deleted) {
      goFetchUsers();
    }
  }, [deleted]);

  const users = data ? data.data : null;

  usePageTitle("Quản lý user");

  return (
    <>
      <SpinnerModal show={isLoading || isChangingRole || isDeleting} />
      <TopBar title="Quản lý user">
        {isAdmin && (
          <Link className="btn btn-primary" to="/users/them-user">
            Tạo user
          </Link>
        )}
      </TopBar>

      <div className="p-2">
        <div className="p-2 shadow rounded bg-light">
          <div className="auth mb-3 bg-white rounded  p-2 border">
            <p className="fs-5 mb-2 fw-bold">Tài khoản của bạn</p>
            <p className="mb-1">
              <span className="fw-bold">Email:</span> {auth.username}
            </p>
            <p className="mb-1">
              <span className="fw-bold">Role:</span> {auth.role}
            </p>
            <Link className="btn btn-warning" to={`/users/doi-mat-khau`}>
              Đổi mật khẩu
            </Link>
          </div>

          {users && (
            <Table>
              <THead>
                <tr>
                  <TCell w="120px">STT</TCell>
                  <TCell>Username</TCell>
                  <TCell w="180px">Role</TCell>
                  {isAdmin && <TCell>Công cụ</TCell>}
                </tr>
              </THead>

              <TBody>
                {users.map((user, index) => (
                  <UserItem
                    order={index + 1}
                    user={user}
                    onDelete={onDelete}
                    onChangeRole={onChangeRole}
                    key={user.username}
                  />
                ))}
              </TBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export default Users;
