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

  // Limpa notificações e erros após 8 segundos
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
    if (user.role !== "admin") return; // Impede usuários comuns de editar o perfil

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
    return <div>Carregando...</div>;
  }

  if (!currentUser.email) {
    return (
      <div className="user-profile error-message">
        <p>
          Perfil não encontrado ou você não tem permissão para acessar esta
          página.
        </p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>Perfil do Usuário</h1>
      </div>
      <div className="profile-details">
        <p>
          <strong>Nome:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
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
              className="input-field"
            />
            <input
              type="email"
              value={currentUser.email}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, email: e.target.value })
              }
              placeholder="Email"
              className="input-field"
              disabled
            />
            <input
              type="text"
              value={currentUser.role}
              onChange={(e) =>
                setCurrentUser({ ...currentUser, role: e.target.value })
              }
              placeholder="Role"
              className="input-field"
            />
            <button className="button is-small" onClick={handleEditProfile}>
              Salvar Alterações
            </button>
          </>
        )}
      </div>
      <div className="profile-actions">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nova Senha"
          className="input-field"
        />
        <button className="button is-small" onClick={handleChangePassword}>
          Alterar Senha
        </button>
        <button className="button is-small" onClick={handleLogout}>
          Sair
        </button>
      </div>
      {notification && <p className="notification-message">{notification}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
