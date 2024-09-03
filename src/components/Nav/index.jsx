import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStock } from "@/context/useStock";

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
  }, []); // Certifique-se de que o efeito só roda uma vez ao montar o componente

  const handleLogout = () => {
    logoutUser();
    navigate("/users/login");
  };

  const handleProfileClick = () => {
    if (user && user.id) {
      navigate(`/users/${user.id}`);
    } else {
      console.error("ID do usuário não está definido.");
    }
  };

  return (
    <nav>
      <Link to={"/"}>
        <span>React Stock</span>
      </Link>
      <div className="buttons">
        {user ? (
          <>
            <Link to={"/"}>
              <button>Início</button>
            </Link>
            <Link to={"/items"}>
              <button>Itens</button>
            </Link>
            <button onClick={handleProfileClick}>Meu Perfil</button>
            {user.role === "admin" && (
              <Link to={"/users"}>
                <button>Dashboard</button>
              </Link>
            )}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to={"/users/login"}>
              <button>Login</button>
            </Link>
            <Link to={"/users/register"}>
              <button>Cadastro</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
