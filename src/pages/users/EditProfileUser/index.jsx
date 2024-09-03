import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { changeUserPassword } from "@/hooks/userUtils";
import api from "@/api";
import DeleteUserButton from "@/components/DeleteUserButton";
import { useStock } from "@/context/useStock";

export default function EditProfileUser() {
  const { id } = useParams();
  const { user } = useStock();
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState({
    email: "",
    name: "",
    role: "",
  });
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

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

  if (user.role !== "admin") {
    return (
      <div className="text-red-500 text-center mt-4">
        Você não tem permissão para acessar esta página.
      </div>
    );
  }

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Editar Perfil do Usuário</h1>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          value={updatedUser.name}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, name: e.target.value })
          }
          placeholder="Nome"
          className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={updatedUser.email}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, email: e.target.value })
          }
          placeholder="Email"
          className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
        <input
          type="text"
          value={updatedUser.role}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, role: e.target.value })
          }
          placeholder="Role"
          className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          onClick={handleEditProfile}
        >
          Salvar Alterações
        </button>
      </div>
      <div className="mt-6 space-y-4">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nova Senha"
          className="w-full p-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleChangePassword}
        >
          Alterar Senha
        </button>
        <DeleteUserButton userId={id} onDelete={handleUserDeleted} />
      </div>
      {notification && (
        <p className="text-green-500 text-center mt-4">{notification}</p>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}
