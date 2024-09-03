import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStock } from "../../../context/useStock";
import { changeUserPassword, performLogout } from "../../../hooks/userUtils";
import api from "../../../api";

export default function UserProfile() {
  const { id } = useParams();
  const { user, logoutUser } = useStock();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Token não encontrado. Usuário não está autenticado."
          );
        }

        const response = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCurrentUser({
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
        });
      } catch (error) {
        setError("Erro ao carregar perfil do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    if (notification || error) {
      const timer = setTimeout(() => {
        setNotification(null);
        setError(null);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [notification, error]);

  const handleEditProfile = async () => {
    if (user.role !== "admin") return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encontrado. Usuário não está autenticado.");
      }

      const response = await api.put(`/users/edit/${id}`, currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUser({
        email: response.data.email,
        name: response.data.name,
        role: response.data.role,
      });

      setNotification("Perfil atualizado com sucesso!");
      setError(null);
    } catch (error) {
      setError("Erro ao atualizar o perfil.");
      setNotification("Erro ao atualizar o perfil.");
    }
  };

  const handleChangePassword = async () => {
    try {
      await changeUserPassword(id, newPassword);
      setNewPassword("");
      setNotification("Senha alterada com sucesso!");
      setError(null);
    } catch (error) {
      setError("Erro ao alterar a senha.");
      setNotification("Erro ao alterar a senha.");
    }
  };

  const handleLogout = () => {
    performLogout(logoutUser);
    navigate("/users/login");
  };

  if (loading) {
    return <div className="text-white">Carregando...</div>;
  }

  if (!currentUser.email) {
    return (
      <div className="bg-red-500 text-white p-4 rounded">
        <p>
          Perfil não encontrado ou você não tem permissão para acessar esta
          página.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-lg mx-auto text-white">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-semibold">Perfil do Usuário</h1>
      </div>
      <div className="mb-6">
        <p className="mb-2">
          <strong>Nome:</strong> {currentUser.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p className="mb-4">
          <strong>Role:</strong> {currentUser.role}
        </p>
        {user.role === "admin" && (
          <>
            <input
              type="text"
              value={currentUser.name}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, name: e.target.value })
              }
              placeholder="Nome"
              className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              placeholder="Email"
              className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
            />
            <input
              type="text"
              value={currentUser.role}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
              placeholder="Role"
              className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="w-full p-2 bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
              onClick={handleEditProfile}
            >
              Salvar Alterações
            </button>
          </>
        )}
      </div>
      <div className="mb-6">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nova Senha"
          className="w-full px-3 mb-4 py-2 bg-gray-600 border border-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full p-2 bg-gray-900 rounded hover:bg-gray-500 transition duration-300 mb-2"
          onClick={handleChangePassword}
        >
          Alterar Senha
        </button>
        <button
          className="w-full p-2 bg-gray-700 rounded hover:bg-gray-600 transition duration-300"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
      {notification && (
        <p className="text-green-500 text-center font-semibold">
          {notification}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      )}
    </div>
  );
}
