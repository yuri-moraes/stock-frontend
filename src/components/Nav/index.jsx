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
    <nav className="flex items-center justify-between w-full py-4">
      <Link to={"/"}>
        <span className="text-white text-lg mx-4">React Stock</span>
      </Link>
      <div className="flex gap-8 mx-4">
        {user ? (
          <>
            <Link to={"/"}>
              <button className="text-white mx-0.5">Início</button>
            </Link>
            <Link to={"/items"}>
              <button className="text-white mx-0.5">Itens</button>
            </Link>
            <button className="text-white mx-0.5" onClick={handleProfileClick}>
              Meu Perfil
            </button>
            {user.role === "admin" && (
              <Link to={"/users"}>
                <button className="text-white mx-0.5">Dashboard</button>
              </Link>
            )}
            <button className="text-white mx-0.5" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/users/login"}>
              <button className="text-white mx-0.5">Login</button>
            </Link>
            <Link to={"/users/register"}>
              <button className="text-white mx-0.5">Cadastro</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
