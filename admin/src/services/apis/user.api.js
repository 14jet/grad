export const login = (username, password) => ({
  url: "/admin/user/login",
  method: "POST",
  data: { username, password },
});

export const changeRole = ({ username, role }) => ({
  url: "/admin/user/change-role",
  method: "PUT",
  data: { username, role },
});

export const deleteUser = (username) => ({
  url: "/admin/user",
  method: "DELETE",
  data: { username },
});

export const fetchUsers = () => ({
  url: "/admin/user",
  method: "GET",
});

export const createUser = ({ username, password, re_password, role }) => ({
  url: "/admin/user/register",
  method: "POST",
  data: {
    username,
    password,
    re_password,
    role,
  },
});

export const changePassword = ({
  username,
  password,
  new_password,
  re_new_password,
}) => ({
  url: `/admin/user/change-password`,
  method: "POST",
  data: {
    username,
    password,
    new_password,
    re_new_password,
  },
});

export const resetPassword = (email) => ({
  url: `/admin/user/reset-password`,
  method: "PUT",
  data: {
    email,
  },
});
