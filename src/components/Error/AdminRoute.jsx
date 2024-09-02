import { Navigate, Outlet } from "react-router-dom";
import { useStock } from "../../context/useStock";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user } = useStock();

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/forbidden" />;
  }

  return children ? children : <Outlet />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
