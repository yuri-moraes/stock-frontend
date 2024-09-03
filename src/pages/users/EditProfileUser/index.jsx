import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { changeUserPassword } from "@/hooks/userUtils";
import api from "@/api";
import DeleteUserButton from "@/components/DeleteUserButton";
import { useStock } from "@/context/useStock";
import EditProfileForm from "../EditProfileUser/EditProfileForm";
import ChangePasswordForm from "../EditProfileUser//ChangePasswordForm";
import Notification from "../../../components/Notification";

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

  const handleUserDeleted = () => {
    alert("Usuário deletado com sucesso.");
    navigate("/users");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 rounded-lg shadow-lg text-white">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Editar Perfil do Usuário</h1>
      </div>
      <EditProfileForm
        updatedUser={updatedUser}
        setUpdatedUser={setUpdatedUser}
        handleEditProfile={handleEditProfile}
      />
      <div className="grid gap-4">
        <ChangePasswordForm
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          handleChangePassword={handleChangePassword}
        />
        <DeleteUserButton userId={id} onDelete={handleUserDeleted} />
      </div>
      <Notification message={notification} type="success" />
      <Notification message={error} type="error" />
    </div>
  );
}
