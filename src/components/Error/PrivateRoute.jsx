import { Navigate, Outlet } from "react-router-dom";
import { useStock } from "../../context/useStock";
import PropTypes from "prop-types";

const PrivateRoute = ({ children, role }) => {
  const { user } = useStock();

  if (!user) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return <Navigate to="/users/login" />;
  }

  if (role && user.role !== role) {
    // Se o usuário estiver autenticado mas não tem a role apropriada, redireciona para a página de acesso negado
    return <Navigate to="/forbidden" />;
  }

  // Se o usuário estiver autenticado e tem a role apropriada (ou não é necessário verificar role), renderiza os filhos
  return children ? children : <Outlet />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};

export default PrivateRoute;
