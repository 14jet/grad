import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ForbiddenPage from "../ForbiddenPage";

function RequireAuth({ role = "client" }) {
  const rolesMap = new Map([
    ["admin", 10],
    ["moderator", 5],
    ["client", 1],
  ]);

  const { user, isExpiredSession } = useSelector((state) => state.user);
  const location = useLocation();
  console.log(role);
  console.log(rolesMap.get(role));
  if (user && rolesMap.get(user.role) >= rolesMap.get(role)) {
    console.log("matches");
    return <Outlet />;
  }

  if (user && rolesMap.get(user.role) < rolesMap.get(role)) {
    return <ForbiddenPage />;
  }

  if (!user && isExpiredSession) {
    return (
      <Navigate
        to="/login"
        state={{ isExpired: true, from: location.pathname }}
      />
    );
  }

  if (!user && !isExpiredSession) {
    return (
      <Navigate
        to="/login"
        state={{ isExpired: false, from: location.pathname }}
      />
    );
  }
}

export default RequireAuth;
