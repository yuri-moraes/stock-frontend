import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useStock } from "@/context/useStock";

export default function Nav() {
  const { user, loginUser, logoutUser } = useStock();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null); // Referência para o elemento de navegação

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false); // Fecha o menu se o clique for fora do menu
      }
    };

    const handleTouchStart = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false); // Fecha o menu se o toque for fora do menu
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleTouchStart);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isMobileMenuOpen]);

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
    <nav
      ref={navRef}
      className="flex items-center justify-between w-full py-4 px-4 bg-gray-600"
    >
      <Link to={"/"}>
        <span className="text-white text-lg">React Stock</span>
      </Link>
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div
        className={`flex-col md:flex md:flex-row gap-4 mx-4 ${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex`}
      >
        {user ? (
          <>
            <Link to={"/"}>
              <button className="text-white mx-0.5">Início</button>
            </Link>
            <Link to={"/items"}>
              <button className="text-white mx-0.5">Itens</button>
            </Link>
            <Link to={"/logs"}>
              <button className="text-white mx-0.5">Logs</button>
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
