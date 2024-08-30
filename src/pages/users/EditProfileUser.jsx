import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { changeUserPassword } from "../../hooks/userUtils";
import api from "../../api";
import DeleteUserButton from "../../components/DeleteUserButton";

export default function EditProfileUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // Estado para notificação

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
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token não encontrado. Usuário não está autenticado.");
      }

      const response = await api.put(`/users/edit/${id}`, updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUpdatedUser({
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

  // Função para lidar com a alteração de senha
  const handleChangePassword = async () => {
    try {
      await changeUserPassword(id, newPassword, setUpdatedUser);
      setNewPassword("");
      setNotification("Senha alterada com sucesso!");
      setError(null);
    } catch (error) {
      setError("Erro ao alterar a senha.");
      setNotification("Erro ao alterar a senha.");
    }
  };

  // Função de callback após a exclusão do usuário
  const handleUserDeleted = () => {
    alert("Usuário deletado com sucesso.");
    navigate("/users");
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h1>Editar Perfil do Usuário</h1>
      </div>
      <div className="profile-details">
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
        <DeleteUserButton userId={id} onDelete={handleUserDeleted} />
      </div>
      {notification && <p className="notification-message">{notification}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
