import { Navigate, Outlet } from "react-router-dom";
import { useStock } from "../../context/useStock";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user } = useStock();

  if (!user) {
    return <Navigate to="/users/login" />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute;
