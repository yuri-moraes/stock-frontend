import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStock } from "@/context/useStock";
import { changeUserPassword, performLogout } from "@/hooks/userUtils";
import api from "@/api";
import UserProfileDetails from "../UserProfile/UserProfileDetails";
import UserProfileForm from "../UserProfile/UserProfileForm";
import PasswordChangeForm from "../UserProfile/PasswordChangeForm";
import Notification from "@/components/Notification";

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
      <UserProfileDetails currentUser={currentUser} />
      {user.role === "admin" && (
        <UserProfileForm
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          handleEditProfile={handleEditProfile}
        />
      )}
      <PasswordChangeForm
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        handleChangePassword={handleChangePassword}
        handleLogout={handleLogout}
      />
      <Notification message={notification} type="success" />
      <Notification message={error} type="error" />
    </div>
  );
}
