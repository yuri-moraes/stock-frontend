import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStock } from "../context/useStock";

export default function Nav() {
  const { user, loginUser, logoutUser } = useStock();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const loggedInUser = JSON.parse(storedUser);
        if (loggedInUser) {
          loginUser(loggedInUser);
        }
      } catch (error) {
        console.error(
          "Erro ao analisar os dados do usuário do localStorage:",
          error
        );
      }
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/users/login");
  };

  return (
    <nav>
      <Link to={"/"}>
        <span>React Stock</span>
      </Link>
      <div className="buttons">
        <Link to={"/"}>
          <button>Início</button>
        </Link>
        <Link to={"/items"}>
          <button>Itens</button>
        </Link>
        {user ? (
          <>
            <button onClick={() => navigate(`/user/${user.id}`)}>
              Meu Perfil
            </button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to={"/users/login"}>
            <button>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
