import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useStock } from "@/context/useStock";
import DeleteUserButton from "@/components/DeleteUserButton";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const { user } = useStock();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error(
            "Token não encontrado. Usuário não está autenticado."
          );
        }

        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  const handleUserClick = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <div className="user-dashboard">
      <h1>Dashboard de Usuários</h1>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id} className="user-list-item">
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
            <div className="div-buttons">
              <button
                className="edit-button"
                onClick={() => handleUserClick(user.id)}
              >
                Editar
              </button>
              <DeleteUserButton userId={user.id} onDelete={handleDelete} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
