import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStock } from "../../context/useStock";
import {
  editUserProfile,
  changeUserPassword,
  performLogout,
} from "../../hooks/userUtils";
import api from "../../api";

export default function UserProfile() {
  const { id } = useParams(); // Pega o ID da URL
  const { user, logoutUser } = useStock();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); // Estado para o usuário carregado
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);

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

        setCurrentUser(response.data);
        setUpdatedUser({
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
        });
      } catch (error) {
        setError("Erro ao carregar perfil do usuário.");
      }
    };

    fetchUser();
  }, [id]);

  // Função para lidar com a edição do perfil
  const handleEditProfile = async () => {
    try {
      const updatedData = await editUserProfile(id, updatedUser);
      setCurrentUser(updatedData); // Atualiza o estado local
      setEditMode(false);
      setError(null);
    } catch (error) {
      setError("Erro ao atualizar o perfil.");
    }
  };

  // Função para lidar com a alteração de senha
  const handleChangePassword = async () => {
    try {
      await changeUserPassword(id, newPassword);
      setNewPassword("");
      setError(null);
      alert("Senha alterada com sucesso.");
    } catch (error) {
      setError("Erro ao alterar a senha.");
    }
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    performLogout(logoutUser);
    navigate("/users/login");
  };

  if (!currentUser) {
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
        {editMode ? (
          <>
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, name: e.target.value })
              }
              placeholder="Nome"
              className="input-field"
            />
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
              placeholder="Email"
              className="input-field"
              disabled
            />
            <input
              type="text"
              value={updatedUser.role}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, role: e.target.value })
              }
              placeholder="Role"
              className="input-field"
            />
            <button className="button is-small" onClick={handleEditProfile}>
              Salvar Alterações
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              {user.role === "admin" ? "Administrador" : "Comum"}
            </p>
            <button
              className="button is-small"
              onClick={() => setEditMode(true)}
            >
              Editar Perfil
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
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
