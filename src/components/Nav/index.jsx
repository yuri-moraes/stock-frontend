import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStock } from "@/context/useStock";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Nav() {
  const { user, loginUser, logoutUser } = useStock();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleProfileClick = () => {
    if (user && user.id) {
      navigate(`/users/${user.id}`);
    } else {
      console.error("ID do usuário não está definido.");
    }
  };

  const menuItems = (
    <>
      <Link to={"/"}>
        <span className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors">
          Início
        </span>
      </Link>
      <Link to={"/items"}>
        <span className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors">
          Itens
        </span>
      </Link>
      <Link to={"/logs"}>
        <span className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors">
          Logs
        </span>
      </Link>
      <button
        className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors text-left w-full"
        onClick={handleProfileClick}
      >
        Perfil
      </button>
      {user?.role === "admin" && (
        <Link to={"/users"}>
          <span className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors">
            Dashboard
          </span>
        </Link>
      )}
      <button
        className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors text-left w-full"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  );

  const guestMenuItems = (
    <>
      <Link to={"/users/login"}>
        <span className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors">
          Login
        </span>
      </Link>
      <Link to={"/users/register"}>
        <span className="block px-3 py-2 rounded-md text-base font-medium hover:text-blue-400 transition-colors">
          Cadastro
        </span>
      </Link>
    </>
  );

  return (
    <nav className="bg-gray-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/"}>
              <span className="text-2xl font-bold">React Stock</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? menuItems : guestMenuItems}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? menuItems : guestMenuItems}
          </div>
        </div>
      )}
    </nav>
  );
}
